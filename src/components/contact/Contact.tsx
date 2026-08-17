"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle2, AlertCircle} from "lucide-react";
import { contactSchema, contactInput } from "@/lib/validation/contact";
import { SUBJECT_OPTIONS } from "@/util/faq";
import FaqAccordion from "./FaqAccordion";
import ContactMenu from "./ContactMenu";
import { createContactMessage } from "@/lib/actions/contact-action";


function SuccessToast({ show }: { show: boolean }) {
  return (
    <div
      aria-live="polite"
      className={`pointer-events-none absolute inset-x-4 top-4 z-20 flex items-center gap-2 rounded-lg bg-app-primary px-4 py-3 text-sm font-semibold text-app-tertiary shadow-lg transition-all duration-300 sm:inset-x-6 ${
        show ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
      }`}
    >
      <CheckCircle2 className="size-4 shrink-0" />
      Message sent successfully! We&apos;ll get back to you soon.
    </div>
  );
}

const Contact = () => {
  const [showToast, setShowToast] = useState(false);
  const [showContactError, setShowContactError] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<contactInput>({
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {
    if (!showToast) return;
    const timer = setTimeout(() => setShowToast(false), 4000);
    return () => clearTimeout(timer);
  }, [showToast]);

  useEffect(() => {
    if (!showContactError) return;
    const timer = setTimeout(() => setShowContactError(false), 5000);
    return () => clearTimeout(timer);
  }, [showContactError]);

  const onSubmit = async (data: contactInput) => {
    const result = await createContactMessage(data);

    if (!result.success) {
      setShowContactError(true)
      return;
    }

    reset();
    setShowToast(true);
  };

  return (
    <main>
      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
        <div className="mx-auto max-w-2xl space-y-4 text-center">
          <h1 className="text-3xl font-bold text-app-neutral sm:text-4xl">
            Get in touch
          </h1>
          <p className="leading-7 text-app-primary">
            We&apos;re here to help you find the perfect space for your
            team&apos;s next breakthrough. Our FAQs below could be of help.
          </p>
        </div>

        <div className="mt-12">
          <FaqAccordion />
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 sm:pb-24 lg:px-10">
        <h2 className="text-center text-2xl font-bold text-app-primary sm:text-3xl">
          Reach out for any further assistance
        </h2>

        <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-6 md:flex-row md:items-start">
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="relative w-full space-y-5 rounded-xl bg-white p-6 shadow-sm ring-1 ring-app-neutral/10 sm:p-8 md:flex-1"
          >
            <SuccessToast show={showToast} />

            {showContactError && (
              <div className="flex items-center gap-2">
                <AlertCircle className="size-4 text-red-500"/>
                <p className="inline-block text-red-600 mr-1.5 text-base">Unable to submit message,please try again</p>
              </div>
            )}

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="full-name" className="text-sm font-bold text-app-primary">
                  Full Name
                </label>
                <input
                  id="full-name"
                  aria-invalid={!!errors.fullName}
                  aria-describedby="full-name-error"
                  type="text"
                  placeholder="John Doe"
                  {...register("fullName")}
                  className="w-full rounded-lg border border-app-neutral/20 bg-app-neutral/5 p-3.5 text-sm text-app-neutral placeholder:text-app-neutral/40 focus:border-app-primary focus:outline-none"
                />
                {errors.fullName && (
                  <p id="full-name-error" className="text-sm text-red-600">
                    {errors.fullName.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-bold text-app-primary">
                  Work Email
                </label>
                <input
                  id="email"
                  aria-invalid={!!errors.workEmail}
                  aria-describedby="email-error"
                  type="text"
                  placeholder="john@company.com"
                  {...register("workEmail")}
                  className="w-full rounded-lg border border-app-neutral/20 bg-app-neutral/5 p-3.5 text-sm text-app-neutral placeholder:text-app-neutral/40 focus:border-app-primary focus:outline-none"
                />
                {errors.workEmail && (
                  <p id="email-error" className="text-sm text-red-600">
                    {errors.workEmail.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-subject" className="text-sm font-bold text-app-primary">
                Subject
              </label>
              <select
                defaultValue="Select an option"
                {...register("subject")}
                id="contact-subject"
                aria-invalid={!!errors.subject}
                aria-describedby="contact-subject-error"
                className="w-full rounded-lg border border-app-neutral/20 bg-app-neutral/5 p-3.5 text-sm text-app-neutral focus:border-app-primary focus:outline-none"
              >
                {SUBJECT_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.subject && (
                <p id="contact-subject-error" className="text-sm text-red-600">
                  {errors.subject.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-message" className="text-sm font-bold text-app-primary">
                Message
              </label>
              <textarea
                aria-invalid={!!errors.message}
                aria-describedby="contact-message-error"
                id="contact-message"
                rows={5}
                placeholder="How can we assist you today?"
                {...register("message")}
                className="w-full rounded-lg border border-app-neutral/20 bg-app-neutral/5 p-3.5 text-sm text-app-neutral placeholder:text-app-neutral/40 focus:border-app-primary focus:outline-none"
              />
              {errors.message && (
                <p id="contact-message-error" className="text-sm text-red-600">
                  {errors.message.message}
                </p>
              )}
            </div>

            <button
            role="submit"
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-lg bg-app-primary px-6 py-3 text-sm font-semibold text-app-tertiary transition duration-200 hover:bg-app-primary/85 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Sending message..." : "Send Message"}
              <Send className="size-4" />
            </button>
          </form>

          <ContactMenu />
        </div>
      </section>
    </main>
  );
};

export default Contact;
