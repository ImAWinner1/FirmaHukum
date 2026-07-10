"use server";

import nodemailer from "nodemailer";
import { z } from "zod";
import dns from "dns";

/**
 * Skema validasi Zod untuk data formulir kontak.
 * Memastikan setiap field memenuhi aturan minimum sebelum diproses ke server.
 */
const contactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(9),
  service: z.string().min(1),
  message: z.string().min(10),
});

/**
 * Memverifikasi keberadaan domain email melalui pencarian DNS MX Record.
 * Digunakan sebagai lapisan validasi tambahan untuk memastikan domain email
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
 * Memverifikasi validitas alamat email menggunakan Abstract Email Validation API.
 * Memeriksa deliverability (kemampuan pengiriman) dan mendeteksi email disposable (sekali pakai).
 *
 * Strategi fallback berlapis:
 * 1. Jika API Key tidak tersedia: validasi melalui regex + DNS MX Record.
 * 2. Jika API mengembalikan error: kembali ke validasi regex + DNS MX Record.
 * 3. Jika API merespons normal: gunakan hasil deliverability dan deteksi disposable.
 *
 * @param email - Alamat email yang akan diverifikasi.
 * @returns Objek `{ valid, reason? }` yang menunjukkan status validitas beserta alasan penolakan.
 */
async function verifyEmailAbstract(
  email: string
): Promise<{ valid: boolean; reason?: string }> {
  const apiKey = process.env.ABSTRACT_EMAIL_API_KEY;

  /** Fallback: validasi regex dasar diikuti pemeriksaan DNS MX Record */
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
      /** Fallback otomatis jika API Key tidak valid atau rate limit tercapai */
      return isRegexValid
        ? { valid: true }
        : {
            valid: false,
            reason: "Alamat email tidak valid atau domain tidak terdaftar.",
          };
    }

    /** Evaluasi deliverability: DELIVERABLE, UNDELIVERABLE, RISKY, atau UNKNOWN */
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

/**
 * Memverifikasi validitas nomor telepon menggunakan Abstract Phone Validation API.
 * Memeriksa apakah nomor telepon terdaftar dan memiliki format yang benar.
 *
 * Strategi fallback:
 * 1. Jika API Key tidak tersedia: validasi melalui pola regex (minimal 8 digit, mendukung format internasional).
 * 2. Jika API mengembalikan error: kembali ke validasi regex.
 *
 * @param phone - Nomor telepon yang akan diverifikasi.
 * @returns Objek `{ valid, reason? }` yang menunjukkan status validitas beserta alasan penolakan.
 */
async function verifyPhoneAbstract(
  phone: string
): Promise<{ valid: boolean; reason?: string }> {
  const apiKey = process.env.ABSTRACT_PHONE_API_KEY;

  /** Fallback: pola regex untuk nomor telepon (minimal 8 digit, opsional +, spasi, tanda hubung) */
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
      /** Fallback otomatis jika API Key tidak valid */
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

/**
 * Server Action utama untuk memproses pengiriman formulir kontak.
 *
 * Alur pemrosesan:
 * 1. Validasi data masuk menggunakan skema Zod.
 * 2. Verifikasi alamat email melalui Abstract API (dengan fallback DNS MX Record).
 * 3. Verifikasi nomor telepon melalui Abstract API (dengan fallback regex).
 * 4. Ambil kredensial SMTP dari environment variables.
 * 5. Buat transporter Nodemailer dengan konfigurasi Gmail SMTP.
 * 6. Susun konten email dalam format teks dan HTML.
 * 7. Kirim email ke alamat penerima yang ditentukan di environment variable `EMAIL_RECEIVER`.
 *
 * @param formData - Data formulir yang telah divalidasi sesuai skema `contactFormSchema`.
 * @returns Objek `{ success, message? }` yang menunjukkan hasil pengiriman.
 */
export async function sendContactEmail(
  formData: z.infer<typeof contactFormSchema>
) {
  try {
    /** Langkah 1: Validasi data masuk menggunakan skema Zod */
    const validatedData = contactFormSchema.parse(formData);

    /** Langkah 2: Verifikasi alamat email melalui Abstract API */
    const emailCheck = await verifyEmailAbstract(validatedData.email);
    if (!emailCheck.valid) {
      return {
        success: false,
        message: emailCheck.reason || "Alamat email tidak valid.",
      };
    }

    /** Langkah 3: Verifikasi nomor telepon melalui Abstract API */
    const phoneCheck = await verifyPhoneAbstract(validatedData.phone);
    if (!phoneCheck.valid) {
      return {
        success: false,
        message: phoneCheck.reason || "Nomor telepon tidak valid.",
      };
    }

    /** Langkah 4: Ambil kredensial SMTP dari environment variables */
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

    /** Langkah 5: Buat transporter Nodemailer dengan konfigurasi Gmail SMTP */
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    /** Langkah 6: Susun konten email dalam format teks biasa dan HTML */
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

    /** Langkah 7: Kirim email melalui transporter */
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
