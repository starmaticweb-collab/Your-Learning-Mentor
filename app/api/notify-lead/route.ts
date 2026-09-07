import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.ADMIN_NOTIFICATION_EMAIL;

    if (!apiKey) {
      console.warn("⚠️ [Resend] RESEND_API_KEY is not configured in .env. Skipping email dispatch.");
      return NextResponse.json({
        success: false,
        warning: "RESEND_API_KEY is not configured in .env",
      });
    }

    if (!toEmail) {
      console.warn("⚠️ [Resend] ADMIN_NOTIFICATION_EMAIL is not configured in .env. Skipping email dispatch.");
      return NextResponse.json({
        success: false,
        warning: "ADMIN_NOTIFICATION_EMAIL is not configured in .env",
      });
    }

    const resend = new Resend(apiKey);
    const fromAddress = process.env.RESEND_FROM_EMAIL || "YourLearningMentor <onboarding@resend.dev>";

    if (body.type === "counselling") {
      const { name, email, message } = body;
      const subject = `🔔 New Counselling Session Request from ${name || "a student"}`;
      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded: 12px;">
          <h2 style="color: #0f172a; margin-bottom: 8px;">New Counselling Session Request</h2>
          <p style="color: #64748b; font-size: 14px; margin-top: 0;">A student or parent just requested a session on YourLearningMentor.</p>
          
          <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 6px 0;"><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p style="margin: 6px 0;"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
            <p style="margin: 6px 0;"><strong>Submitted:</strong> ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</p>
          </div>

          <div style="margin: 20px 0;">
            <p style="margin-bottom: 6px;"><strong>Message / Academic Goals:</strong></p>
            <div style="background: #ffffff; padding: 12px; border: 1px solid #cbd5e1; border-radius: 6px; white-space: pre-wrap; font-size: 14px; color: #334155;">
              ${escapeHtml(message || "No specific message provided.")}
            </div>
          </div>

          <div style="margin-top: 24px;">
            <a href="mailto:${escapeHtml(email)}?subject=Re: Your Counselling Session Request - YourLearningMentor" style="background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 10px 18px; border-radius: 6px; font-weight: bold; display: inline-block;">
              Reply directly to ${escapeHtml(name)}
            </a>
          </div>
        </div>
      `;

      const result = await resend.emails.send({
        from: fromAddress,
        to: toEmail,
        subject,
        html,
      });

      return NextResponse.json({ success: true, id: result.data?.id });
    }

    // Default: Tutor Lead / Request Contact
    const {
      student_name,
      student_email,
      tutor_name,
      tutor_slug,
      subjects = [],
      mode,
      city,
      area,
    } = body;

    const subject = `🎓 New Tutor Session Lead: ${student_name} for ${tutor_name}`;
    const locationStr = [area, city].filter(Boolean).join(", ");
    const subjectsStr = Array.isArray(subjects) ? subjects.join(", ") : String(subjects || "");

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
        <div style="border-bottom: 2px solid #2563eb; padding-bottom: 12px; margin-bottom: 16px;">
          <h2 style="color: #0f172a; margin: 0 0 4px 0;">New Student Session Request</h2>
          <span style="font-size: 13px; color: #64748b;">YourLearningMentor Lead Alert</span>
        </div>

        <p style="color: #334155; font-size: 15px;">
          A student has just requested contact details to book a session with <strong>${escapeHtml(tutor_name)}</strong>.
        </p>

        <div style="background-color: #f1f5f9; padding: 16px; border-radius: 8px; margin: 18px 0;">
          <h3 style="margin-top: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; color: #475569;">Student Details</h3>
          <p style="margin: 6px 0; font-size: 14px;"><strong>Student Name:</strong> ${escapeHtml(student_name)}</p>
          <p style="margin: 6px 0; font-size: 14px;"><strong>Student Email:</strong> <a href="mailto:${escapeHtml(student_email)}">${escapeHtml(student_email)}</a></p>
          <p style="margin: 6px 0; font-size: 14px;"><strong>Time:</strong> ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</p>
        </div>

        <div style="background-color: #ffffff; border: 1px solid #e2e8f0; padding: 16px; border-radius: 8px; margin: 18px 0;">
          <h3 style="margin-top: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; color: #475569;">Tutor Profile</h3>
          <p style="margin: 6px 0; font-size: 14px;"><strong>Tutor:</strong> ${escapeHtml(tutor_name)}</p>
          ${subjectsStr ? `<p style="margin: 6px 0; font-size: 14px;"><strong>Subjects:</strong> ${escapeHtml(subjectsStr)}</p>` : ""}
          ${mode ? `<p style="margin: 6px 0; font-size: 14px;"><strong>Mode:</strong> ${escapeHtml(mode)}</p>` : ""}
          ${locationStr ? `<p style="margin: 6px 0; font-size: 14px;"><strong>Location:</strong> ${escapeHtml(locationStr)}</p>` : ""}
          ${tutor_slug ? `<p style="margin: 6px 0; font-size: 13px;"><a href="https://yourlearningmentor.com/tutor/${escapeHtml(tutor_slug)}" style="color: #2563eb;">View Tutor Profile</a></p>` : ""}
        </div>

        <div style="margin-top: 24px; text-align: center;">
          <a href="mailto:${escapeHtml(student_email)}?subject=Connecting you with ${escapeHtml(tutor_name)} - YourLearningMentor" style="background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 11px 22px; border-radius: 6px; font-weight: bold; display: inline-block;">
            Contact Student Directly
          </a>
        </div>
      </div>
    `;

    const result = await resend.emails.send({
      from: fromAddress,
      to: toEmail,
      subject,
      html,
    });

    return NextResponse.json({ success: true, id: result.data?.id });
  } catch (error) {
    console.error("❌ [Resend] Failed to send email alert:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string): string {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
