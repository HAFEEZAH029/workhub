"use client";

import { childVariants, ContainerVariants } from "../../lib/animation/animation";
import { motion } from "framer-motion";

type Step = {
  number: number;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    number: 1,
    title: "Discover",
    description:
      "Find the perfect location through our curated collection of premium spaces.",
  },
  {
    number: 2,
    title: "Book",
    description:
      "Instant booking with secure payment and flexible cancellation policies.",
  },
  {
    number: 3,
    title: "Work",
    description:
      "Check-in via the app and enjoy all premium amenities and services.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="px-5 sm:px-8 mb-20 mt-25 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-app-neutral sm:text-5xl">
            How it Works
          </h2>
          <p className="mt-3 text-xl text-app-primary">
            Get started in minutes
          </p>
        </div>

        <motion.div
        variants={ContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="mt-14 grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8"
        >
          {steps.map(({ number, title, description }) => (
            <motion.div
            variants={childVariants}
            key={number}
            className="flex flex-col items-center text-center">
              <span className="grid size-11 place-items-center rounded-full bg-app-primary text-base font-bold text-app-tertiary">
                {number}
              </span>
              <h3 className="mt-5 text-xl font-bold text-app-neutral">
                {title}
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-6 text-app-neutral/65">
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}