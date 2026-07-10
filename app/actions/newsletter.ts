"use server";

import nodemailer from "nodemailer";
import { z } from "zod";
import dns from "dns";

const newsletterSchema = z.object({
  email: z.string().email(),
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

export async function subscribeNewsletter(
  formData: FormData | { email: string }
) {
  try {
    const rawEmail =
      formData instanceof FormData ? formData.get("email") : formData.email;

    // 1. Validate the incoming data
    const validatedData = newsletterSchema.parse({ email: rawEmail });

    // 2. Verify email domain (MX Record Check)
    const isDomainValid = await verifyEmailDomain(validatedData.email);
    if (!isDomainValid) {
      return {
        success: false,
        message: "Alamat email tidak valid atau domain tidak terdaftar.",
      };
    }

    // 3. Extract credentials from environment variables
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

    // 4. Create the Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    // 5. Send notification to admin
    const mailOptionsAdmin = {
      from: `"Newsletter Subscriber" <${emailUser}>`,
      to: process.env.EMAIL_RECEIVER || "thelawticsa@gmail.com",
      replyTo: validatedData.email,
      subject: `Berlangganan Newsletter Baru: ${validatedData.email}`,
      text: `Anda memiliki pelanggan newsletter baru dengan alamat email: ${validatedData.email}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #0B192C; color: white; padding: 20px; text-align: center;">
            <h2 style="margin: 0;">Pelanggan Newsletter Baru</h2>
          </div>
          <div style="padding: 20px; background-color: #f8fafc;">
            <p><strong>Email:</strong> ${validatedData.email}</p>
          </div>
        </div>
      `,
    };

    // 6. Send welcome email to subscriber
    const mailOptionsSubscriber = {
      from: `"Firma Hukum" <${emailUser}>`,
      to: validatedData.email,
      subject: `Terima Kasih Telah Berlangganan Newsletter Firma Hukum`,
      text: `Halo,\n\nTerima kasih telah berlangganan newsletter kami. Anda akan menerima informasi dan artikel hukum terbaru dari kami.\n\nSalam,\nTim Firma Hukum`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #0B192C; color: white; padding: 20px; text-align: center;">
            <h2 style="margin: 0;">Selamat Datang!</h2>
          </div>
          <div style="padding: 20px; background-color: #f8fafc;">
            <p>Halo,</p>
            <p>Terima kasih telah berlangganan newsletter kami. Anda akan menjadi yang pertama menerima informasi terbaru, wawasan hukum, serta artikel eksklusif dari para pakar kami.</p>
            <p>Salam hangat,<br/><strong>Tim Firma Hukum</strong></p>
          </div>
        </div>
      `,
    };

    await Promise.all([
      transporter.sendMail(mailOptionsAdmin),
      transporter.sendMail(mailOptionsSubscriber),
    ]);

    return { success: true };
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    return {
      success: false,
      message: "Format email tidak valid atau terjadi kesalahan server.",
    };
  }
}
