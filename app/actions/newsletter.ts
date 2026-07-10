"use server";

import nodemailer from "nodemailer";
import { z } from "zod";
import dns from "dns";

/**
 * Skema validasi Zod untuk data langganan newsletter.
 * Hanya memerlukan satu field `email` yang memenuhi format alamat email standar.
 */
const newsletterSchema = z.object({
  email: z.string().email(),
});

/**
 * Memverifikasi keberadaan domain email melalui pencarian DNS MX Record.
 * Digunakan sebagai lapisan validasi untuk memastikan domain email
 * benar-benar memiliki server penerima email yang terdaftar.
 *
 * @param email - Alamat email yang akan diverifikasi domainnya.
 * @returns `true` jika domain memiliki MX Record, `false` jika tidak.
 */
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

/**
 * Server Action utama untuk memproses langganan newsletter.
 *
 * Alur pemrosesan:
 * 1. Validasi data masuk menggunakan skema Zod.
 * 2. Verifikasi domain email melalui DNS MX Record.
 * 3. Ambil kredensial SMTP dari environment variables.
 * 4. Buat transporter Nodemailer dengan konfigurasi Gmail SMTP.
 * 5. Kirim email notifikasi ke admin tentang pelanggan baru.
 * 6. Kirim email selamat datang ke pelanggan yang baru berlangganan.
 *
 * Kedua email (notifikasi admin dan sambutan pelanggan) dikirim secara paralel
 * menggunakan `Promise.all` untuk efisiensi waktu respons.
 *
 * @param formData - Data formulir dalam bentuk `FormData` (dari elemen form HTML) atau objek `{ email }`.
 * @returns Objek `{ success, message? }` yang menunjukkan hasil proses langganan.
 */
export async function subscribeNewsletter(
  formData: FormData | { email: string }
) {
  try {
    const rawEmail =
      formData instanceof FormData ? formData.get("email") : formData.email;

    /** Langkah 1: Validasi data masuk menggunakan skema Zod */
    const validatedData = newsletterSchema.parse({ email: rawEmail });

    /** Langkah 2: Verifikasi domain email melalui DNS MX Record */
    const isDomainValid = await verifyEmailDomain(validatedData.email);
    if (!isDomainValid) {
      return {
        success: false,
        message: "Alamat email tidak valid atau domain tidak terdaftar.",
      };
    }

    /** Langkah 3: Ambil kredensial SMTP dari environment variables */
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

    /** Langkah 4: Buat transporter Nodemailer dengan konfigurasi Gmail SMTP */
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    /** Langkah 5: Susun dan kirim email notifikasi ke admin */
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

    /** Langkah 6: Susun dan kirim email sambutan ke pelanggan baru */
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

    /** Kirim kedua email secara paralel untuk efisiensi */
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
