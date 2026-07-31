import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

function isValidEmail(value: string) {
  // Practical validation, not RFC-perfect.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function normalizePhone(value: string) {
  return value.replace(/[^\d+]/g, "").slice(0, 20);
}

function getEnv(name: string) {
  const v = process.env[name];
  return v && v.trim().length ? v.trim() : undefined;
}

function getEnvAny(...names: string[]) {
  for (const name of names) {
    const value = getEnv(name);
    if (value) return value;
  }
  return undefined;
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const { name, email, phone, message } = (body ?? {}) as Partial<ContactPayload>;
  const safeName = (name ?? "").trim();
  const safeEmail = (email ?? "").trim();
  const safeMessage = (message ?? "").trim();
  const safePhone = phone ? normalizePhone(phone) : "";

  if (safeName.length < 2) {
    return NextResponse.json({ ok: false, error: "Please enter your name." }, { status: 400 });
  }
  if (!isValidEmail(safeEmail)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
  }
  if (safeMessage.length < 10) {
    return NextResponse.json({ ok: false, error: "Please enter your query (min 10 characters)." }, { status: 400 });
  }

  const SMTP_HOST = getEnvAny("SMTP_HOST", "MAIL_HOST", "EMAIL_HOST");
  const SMTP_PORT = Number(getEnvAny("SMTP_PORT", "MAIL_PORT", "EMAIL_PORT") ?? "587");
  const SMTP_SECURE =
    (getEnvAny("SMTP_SECURE", "MAIL_SECURE", "EMAIL_SECURE") ?? "false").toLowerCase() ===
    "true";
  const SMTP_USER = getEnvAny("SMTP_USER", "MAIL_USER", "EMAIL_USER");
  const SMTP_PASS = getEnvAny("SMTP_PASS", "MAIL_PASS", "EMAIL_PASS", "SMTP_PASSWORD");
  const CONTACT_TO =
    getEnvAny("CONTACT_TO", "MAIL_TO", "EMAIL_TO", "CONTACT_EMAIL") ?? "support@gesworldex.com";
  const CONTACT_FROM = getEnvAny("CONTACT_FROM", "MAIL_FROM", "EMAIL_FROM") ?? SMTP_USER;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Email service is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS (and optionally CONTACT_TO/CONTACT_FROM).",
      },
      { status: 500 },
    );
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number.isFinite(SMTP_PORT) ? SMTP_PORT : 587,
    secure: SMTP_SECURE,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const subject = `New website inquiry: ${safeName}${safePhone ? ` (${safePhone})` : ""}`;
  const text = [
    `Name: ${safeName}`,
    `Email: ${safeEmail}`,
    safePhone ? `Phone: ${safePhone}` : "Phone: (not provided)",
    "",
    "Message:",
    safeMessage,
  ].join("\n");

  try {
    await transporter.sendMail({
      to: CONTACT_TO,
      from: CONTACT_FROM,
      replyTo: safeEmail,
      sender: SMTP_USER,
      subject,
      text,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to send email.";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
