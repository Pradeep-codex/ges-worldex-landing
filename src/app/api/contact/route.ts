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

  const SMTP_HOST = getEnv("SMTP_HOST");
  const SMTP_PORT = Number(getEnv("SMTP_PORT") ?? "587");
  const SMTP_SECURE = (getEnv("SMTP_SECURE") ?? "false").toLowerCase() === "true";
  const SMTP_USER = getEnv("SMTP_USER");
  const SMTP_PASS = getEnv("SMTP_PASS");
  const CONTACT_TO = getEnv("CONTACT_TO") ?? "info@gesindiaexh.com";
  const CONTACT_FROM = getEnv("CONTACT_FROM") ?? SMTP_USER ?? CONTACT_TO;

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
      subject,
      text,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to send email.";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

