import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Menggabungkan beberapa class CSS secara kondisional menggunakan `clsx`,
 * kemudian menggabungkan dan menghapus konflik class Tailwind CSS menggunakan `twMerge`.
 *
 * Fungsi ini merupakan utilitas standar yang digunakan di seluruh komponen
 * untuk menyusun class Tailwind secara dinamis tanpa risiko duplikasi atau konflik.
 *
 * @param inputs - Daftar class CSS (string, objek kondisional, atau array).
 * @returns String class CSS yang telah digabungkan dan dioptimasi.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
