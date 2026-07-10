"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { practiceAreas } from "@/lib/data/practice-areas";
import { sendContactEmail } from "@/app/actions/contact";

import { useEffect } from "react";

export function ContactForm({ dict }: { dict: any }) {
  const contactFormSchema = z.object({
    name: z.string().min(2, { message: dict.contactForm.errors.name }),
    email: z.string().email({ message: dict.contactForm.errors.email }),
    phone: z.string().min(9, { message: dict.contactForm.errors.phone }),
    service: z.string().min(1, { message: dict.contactForm.errors.service }),
    message: z.string().min(10, { message: dict.contactForm.errors.message }),
  });
  type ContactFormValues = z.infer<typeof contactFormSchema>;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
  });

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);

    try {
      const response = await sendContactEmail(data);
      if (response.success) {
        toast.success(dict.contactForm.successTitle, {
          description: dict.contactForm.successDesc,
        });
        form.reset();
      } else {
        toast.error("Gagal Mengirim Pesan", {
          description: response.message || "Gagal mengirim pesan.",
        });
      }
    } catch (error) {
      toast.error("Kesalahan Sistem", {
        description: "Terjadi kesalahan sistem. Silakan coba lagi nanti.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  function onError(errors: any) {
    console.log("Validation errors:", errors);
    toast.error("Formulir Tidak Lengkap", {
      description:
        "Mohon periksa kembali isian formulir Anda. Ada kolom yang masih kosong atau salah format.",
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await form.handleSubmit(onSubmit, onError)(e);
          } catch (err) {
            console.error("Form submit error:", err);
          }
        }}
        className="space-y-6"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-navy-900 font-semibold">
                  {dict.contactForm.labels.name}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={dict.contactForm.placeholders.name}
                    {...field}
                    className="bg-white border-gray-200 focus-visible:ring-gold-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-navy-900 font-semibold">
                  {dict.contactForm.labels.email}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={dict.contactForm.placeholders.email}
                    type="email"
                    {...field}
                    className="bg-white border-gray-200 focus-visible:ring-gold-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-navy-900 font-semibold">
                  {dict.contactForm.labels.phone}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={dict.contactForm.placeholders.phone}
                    type="tel"
                    {...field}
                    className="bg-white border-gray-200 focus-visible:ring-gold-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-navy-900 font-semibold">
                  {dict.contactForm.labels.service}
                </FormLabel>
                <div className="relative">
                  <select
                    className="flex h-10 w-full appearance-none items-center justify-between rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-navy-950"
                    {...field}
                  >
                    <option value="" disabled hidden>
                      {dict.contactForm.placeholders.service}
                    </option>
                    {practiceAreas.map((area) => (
                      <option key={area.id} value={area.id}>
                        {dict.servicesPage?.areas?.[
                          area.id as keyof typeof dict.servicesPage.areas
                        ]?.title || area.title}
                      </option>
                    ))}
                    <option value="other">
                      {dict.contactForm.otherService}
                    </option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3 h-4 w-4 opacity-50 pointer-events-none text-gray-500" />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-navy-900 font-semibold">
                {dict.contactForm.labels.message}
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder={dict.contactForm.placeholders.message}
                  className="min-h-[150px] bg-white border-gray-200 focus-visible:ring-gold-500"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gold-600 text-navy-950 hover:bg-gold-500 font-semibold py-6 text-base"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              {dict.contactForm.submitting}
            </>
          ) : (
            dict.contactForm.submit
          )}
        </Button>
      </form>
    </Form>
  );
}
