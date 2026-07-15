'use client';

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQS} from "@/util/faq";

export default function FaqAccordion() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="mx-auto w-full max-w-3xl space-y-3">
      {FAQS.map((faq, index) => {
        const isOpen = openId === index;

        return (
          <div
            key={faq.question}
            className="overflow-hidden rounded-xl bg-white ring-1 ring-app-neutral/10"
          >
            <button
              type="button"
              onClick={() => toggleFaq(index)}
              aria-expanded={isOpen}
              className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-app-neutral"
            >
              <span>{faq.question}</span>
              <ChevronDown
                className={`size-5 shrink-0 text-app-primary transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen && (
              <p className="px-5 pb-4 text-sm font-semibold leading-6 text-app-primary">
                {faq.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}