"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, CheckCircle2 } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { practiceAreas } from "@/lib/data/practice-areas";



export function ContactForm({ dict }: { dict: any }) {
  const contactFormSchema = z.object({
    name: z.string().min(2, { message: dict.contactForm.errors.name }),
    email: z.string().email({ message: dict.contactForm.errors.email }),
    phone: z.string().min(9, { message: dict.contactForm.errors.phone }),
    service: z.string().min(1, { message: dict.contactForm.errors.service }),
    message: z.string().min(10, { message: dict.contactForm.errors.message })
  });
  type ContactFormValues = z.infer<typeof contactFormSchema>;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
    
    // Simulate API call for form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    console.log("Form submitted:", data);
    
    setIsSubmitting(false);
    setIsSuccess(true);
    form.reset();
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSuccess(false);
    }, 5000);
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 rounded-xl border border-green-100 bg-green-50 p-8 text-center shadow-sm">
        <CheckCircle2 className="h-16 w-16 text-green-500" />
        <h3 className="font-heading text-2xl font-bold text-navy-950">
          {dict.contactForm.successTitle}
        </h3>
        <p className="text-gray-600">
          {dict.contactForm.successDesc}
        </p>
        <Button 
          variant="outline" 
          onClick={() => setIsSuccess(false)}
          className="mt-4 border-gold-600 text-gold-600 hover:bg-gold-50"
        >
          {dict.contactForm.sendAnother}
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-navy-900 font-semibold">{dict.contactForm.labels.name}</FormLabel>
                <FormControl>
                  <Input placeholder={dict.contactForm.placeholders.name} {...field} className="bg-white border-gray-200 focus-visible:ring-gold-500" />
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
                <FormLabel className="text-navy-900 font-semibold">{dict.contactForm.labels.email}</FormLabel>
                <FormControl>
                  <Input placeholder={dict.contactForm.placeholders.email} type="email" {...field} className="bg-white border-gray-200 focus-visible:ring-gold-500" />
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
                <FormLabel className="text-navy-900 font-semibold">{dict.contactForm.labels.phone}</FormLabel>
                <FormControl>
                  <Input placeholder={dict.contactForm.placeholders.phone} type="tel" {...field} className="bg-white border-gray-200 focus-visible:ring-gold-500" />
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
                <FormLabel className="text-navy-900 font-semibold">{dict.contactForm.labels.service}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-white border-gray-200 focus-visible:ring-gold-500">
                      <SelectValue placeholder={dict.contactForm.placeholders.service} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {practiceAreas.map((area) => (
                      <SelectItem key={area.id} value={area.id}>
                        {dict.servicesPage?.areas?.[area.id as keyof typeof dict.servicesPage.areas]?.title || area.title}
                      </SelectItem>
                    ))}
                    <SelectItem value="other">{dict.contactForm.otherService}</SelectItem>
                  </SelectContent>
                </Select>
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
              <FormLabel className="text-navy-900 font-semibold">{dict.contactForm.labels.message}</FormLabel>
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
