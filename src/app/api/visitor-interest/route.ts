import { NextResponse } from "next/server";

type InterestPayload = {
  companyName: string;
  mobileNumber: string;
  showTitle: string;
};

function getEnv(name: string) {
  const value = process.env[name];
  return value && value.trim().length ? value.trim() : undefined;
}

export async function POST(req: Request) {
  let body: InterestPayload;

  try {
    body = (await req.json()) as InterestPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const companyName = body.companyName?.trim();
  const mobileNumber = body.mobileNumber?.trim();
  const showTitle = body.showTitle?.trim();

  if (!companyName || companyName.length < 2) {
    return NextResponse.json({ ok: false, error: "Please enter a valid company name." }, { status: 400 });
  }

  if (!mobileNumber || mobileNumber.length < 8) {
    return NextResponse.json({ ok: false, error: "Please enter a valid mobile number." }, { status: 400 });
  }

  if (!showTitle) {
    return NextResponse.json({ ok: false, error: "Show selection is missing." }, { status: 400 });
  }

  const webhookUrl = getEnv("GOOGLE_SHEET_WEBHOOK_URL");

  if (!webhookUrl) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Sheet submission is not configured yet. Add GOOGLE_SHEET_WEBHOOK_URL to connect this form to your spreadsheet.",
      },
      { status: 500 },
    );
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        companyName,
        mobileNumber,
        showTitle,
        submittedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || "Failed to submit to sheet.");
    }
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Failed to submit to sheet.",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
