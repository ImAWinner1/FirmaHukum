import { getDictionary } from "@/lib/dictionary";
import Link from "next/link";
import { Scale } from "lucide-react";
import { Navbar } from "@/components/layout";
import { Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";

export default async function NotFound() {
  const dict = await getDictionary("id");
  const locale = "id";
  return (
    <div className="flex min-h-screen flex-col bg-navy-950 text-white">
      <Navbar dict={dict} locale={locale} />

      <main className="flex flex-1 items-center justify-center p-6 text-center">
        <div className="max-w-2xl space-y-8">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-navy-900 shadow-inner">
            <Scale className="h-12 w-12 text-gold-500" />
          </div>

          <h1 className="font-heading text-6xl font-bold tracking-tight text-white md:text-8xl lg:text-[10rem]">
            404
          </h1>

          <h2 className="font-heading text-2xl font-semibold text-gold-500 md:text-3xl">
            Halaman Tidak Ditemukan
          </h2>

          <p className="mx-auto max-w-lg text-base leading-relaxed text-gray-400 md:text-lg">
            Maaf, halaman yang Anda cari mungkin telah dihapus, diubah namanya,
            atau sementara tidak tersedia.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row pt-4">
            <Link href="/">
              <Button
                size="lg"
                className="w-full bg-gold-600 px-8 text-navy-950 hover:bg-gold-500 sm:w-auto"
              >
                Kembali ke Beranda
              </Button>
            </Link>
            <Link href="/kontak">
              <Button
                size="lg"
                variant="outline"
                className="w-full border-gray-600 bg-transparent px-8 text-white hover:border-gold-500 hover:bg-gold-600/10 hover:text-gold-400 sm:w-auto"
              >
                Hubungi Kami
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer dict={dict} locale={locale} />
    </div>
  );
}
