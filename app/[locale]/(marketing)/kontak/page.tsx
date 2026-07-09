import { getDictionary } from '@/lib/dictionary';
import { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { PageHero } from "@/components/shared/page-hero";
import { AnimatedElement } from "@/components/shared/animated-element";
import { ContactForm } from "@/components/forms/contact-form";
import { siteConfig } from "@/lib/data/site-config";

export const metadata: Metadata = {
  title: "Kontak Kami",
  description: "Hubungi kami untuk mendapatkan konsultasi awal terkait kebutuhan hukum bisnis atau personal Anda.",
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale as 'id' | 'en');

  return (
    <>
      <PageHero
        title={dict.kontakPage.heroTitle}
        description={dict.kontakPage.heroDesc}
      />

      <SectionWrapper background="cream">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Form Section */}
            <div className="lg:col-span-7">
              <AnimatedElement variant="fadeRight">
                <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm md:p-10">
                  <h2 className="font-heading text-2xl font-bold text-navy-950 mb-2">
                    {dict.kontakPage.sendMessage}
                  </h2>
                  <p className="text-gray-600 mb-8">
                    {dict.kontakPage.formDesc}
                  </p>
                  
                  <ContactForm dict={dict} />
                </div>
              </AnimatedElement>
            </div>

            {/* Contact Info Section */}
            <div className="lg:col-span-5 space-y-8">
              <AnimatedElement variant="fadeLeft">
                <h2 className="font-heading text-2xl font-bold text-navy-950 mb-6">
                  {dict.kontakPage.contactInfo}
                </h2>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-gold-600">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-navy-900 mb-1">{dict.kontakPage.hq}</h3>
                      <p className="text-gray-600 leading-relaxed">
                        {siteConfig.contact.address}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-gold-600">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-navy-900 mb-1">{dict.kontakPage.phone}</h3>
                      <p className="text-gray-600 mb-1">
                        <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`} className="hover:text-gold-600 transition-colors">
                          {siteConfig.contact.phone}
                        </a>
                      </p>
                      <p className="text-gray-600">
                        <a href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/\+/g, "")}`} target="_blank" rel="noopener noreferrer" className="hover:text-gold-600 transition-colors">
                          {siteConfig.contact.whatsapp} (WhatsApp Only)
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-gold-600">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-navy-900 mb-1">Email</h3>
                      <p className="text-gray-600">
                        <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-gold-600 transition-colors">
                          {siteConfig.contact.email}
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-gold-600">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-navy-900 mb-1">{dict.kontakPage.hours}</h3>
                      <p className="text-gray-600">
                        {siteConfig.contact.businessHours}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedElement>

              <AnimatedElement variant="fadeLeft" delay={0.2} className="h-64 w-full overflow-hidden rounded-2xl bg-gray-200 border border-gray-200">
                {/* Embedded Map Placeholder */}
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126920.24032338245!2d106.76615560505166!3d-6.229740112833132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x100c5e82dd4b820!2sJakarta!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Peta Lokasi Kantor Firma Hukum"
                />
              </AnimatedElement>
            </div>
          </div>
        </Container>
      </SectionWrapper>
    </>
  );
}
