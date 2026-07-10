"use server";

import nodemailer from "nodemailer";
import { z } from "zod";
import dns from "dns";

const contactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(9),
  service: z.string().min(1),
  message: z.string().min(10),
});

async function verifyEmailDomain(email: string): Promise<boolean> {
  const domain = email.split("@")[1];
  if (!domain) return false;

  try {
    const mxRecords = await dns.promises.resolveMx(domain);
    return mxRecords && mxRecords.length > 0;
  } catch (error) {
    return false;
  }
}

async function verifyEmailAbstract(
  email: string
): Promise<{ valid: boolean; reason?: string }> {
  const apiKey = process.env.ABSTRACT_EMAIL_API_KEY;

  // Stronger Fallback: DNS MX Record check
  const fallbackRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let isRegexValid = fallbackRegex.test(email);
  if (isRegexValid) {
    isRegexValid = await verifyEmailDomain(email);
  }

  if (!apiKey) {
    return isRegexValid
      ? { valid: true }
      : {
          valid: false,
          reason: "Alamat email tidak valid atau domain tidak terdaftar.",
        };
  }

  try {
    const res = await fetch(
      `https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${email}`
    );
    const data = await res.json();

    if (data.error) {
      console.error("Abstract Email API Error:", data.error.message);
      // Smart Fallback if API Key is invalid or rate limited
      return isRegexValid
        ? { valid: true }
        : {
            valid: false,
            reason: "Alamat email tidak valid atau domain tidak terdaftar.",
          };
    }

    // Deliverability can be DELIVERABLE, UNDELIVERABLE, RISKY, UNKNOWN
    if (data.deliverability === "UNDELIVERABLE") {
      return {
        valid: false,
        reason:
          "Alamat email tidak dapat menerima pesan. Mohon pastikan email aktif.",
      };
    }

    if (data.is_disposable_email?.value) {
      return {
        valid: false,
        reason:
          "Mohon gunakan email profesional atau personal yang asli, bukan email sementara.",
      };
    }

    return { valid: true };
  } catch (error) {
    console.error("Failed to call Abstract Email API", error);
    return isRegexValid
      ? { valid: true }
      : { valid: false, reason: "Format alamat email tidak valid." };
  }
}

async function verifyPhoneAbstract(
  phone: string
): Promise<{ valid: boolean; reason?: string }> {
  const apiKey = process.env.ABSTRACT_PHONE_API_KEY;

  // Regex Fallback for Phone (at least 8 digits, optional +, spaces, dashes)
  const fallbackRegex = /^\+?[0-9\s\-\(\)]{8,20}$/;
  const isRegexValid = fallbackRegex.test(phone);

  if (!apiKey) {
    return isRegexValid
      ? { valid: true }
      : { valid: false, reason: "Format nomor telepon tidak valid." };
  }

  try {
    const res = await fetch(
      `https://phonevalidation.abstractapi.com/v1/?api_key=${apiKey}&phone=${phone}`
    );
    const data = await res.json();

    if (data.error) {
      console.error("Abstract Phone API Error:", data.error.message);
      // Smart Fallback if API Key is invalid
      return isRegexValid
        ? { valid: true }
        : { valid: false, reason: "Format nomor telepon tidak valid." };
    }

    if (!data.valid) {
      return {
        valid: false,
        reason:
          "Nomor telepon yang Anda masukkan tidak terdaftar atau tidak valid.",
      };
    }

    return { valid: true };
  } catch (error) {
    console.error("Failed to call Abstract Phone API", error);
    return isRegexValid
      ? { valid: true }
      : { valid: false, reason: "Format nomor telepon tidak valid." };
  }
}

export async function sendContactEmail(
  formData: z.infer<typeof contactFormSchema>
) {
  try {
    // 1. Validate the incoming data
    const validatedData = contactFormSchema.parse(formData);

    // 1.5 Verify email via Abstract API
    const emailCheck = await verifyEmailAbstract(validatedData.email);
    if (!emailCheck.valid) {
      return {
        success: false,
        message: emailCheck.reason || "Alamat email tidak valid.",
      };
    }

    // 1.6 Verify phone via Abstract API
    const phoneCheck = await verifyPhoneAbstract(validatedData.phone);
    if (!phoneCheck.valid) {
      return {
        success: false,
        message: phoneCheck.reason || "Nomor telepon tidak valid.",
      };
    }

    // 2. Extract credentials from environment variables
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailUser || !emailPass) {
      console.error("Missing EMAIL_USER or EMAIL_PASS environment variables.");
      return {
        success: false,
        message:
          "Server configuration error. Please contact the administrator.",
      };
    }

    // 3. Create the Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    // 4. Construct the email content
    const mailOptions = {
      from: `"${validatedData.name}" <${emailUser}>`,
      to: process.env.EMAIL_RECEIVER || "thelawticsa@gmail.com",
      replyTo: validatedData.email,
      subject: `Pesan Baru dari Klien Web: ${validatedData.name}`,
      text: `
Nama: ${validatedData.name}
Email: ${validatedData.email}
Telepon: ${validatedData.phone}
Layanan yang dibutuhkan: ${validatedData.service}

Pesan:
${validatedData.message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #0B192C; color: white; padding: 20px; text-align: center;">
            <h2 style="margin: 0;">Pesan Baru dari Website</h2>
          </div>
          <div style="padding: 20px; background-color: #f8fafc;">
            <p><strong>Nama:</strong> ${validatedData.name}</p>
            <p><strong>Email:</strong> ${validatedData.email}</p>
            <p><strong>Telepon:</strong> ${validatedData.phone}</p>
            <p><strong>Layanan:</strong> ${validatedData.service}</p>
            <hr style="border: none; border-top: 1px solid #cbd5e1; margin: 20px 0;" />
            <p><strong>Pesan:</strong></p>
            <p style="white-space: pre-wrap; color: #334155; line-height: 1.6;">${validatedData.message}</p>
          </div>
        </div>
      `,
    };

    // 5. Send the email
    await transporter.sendMail(mailOptions);

    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      message: "Gagal mengirim pesan. Silakan coba lagi nanti.",
    };
  }
}
