import Image from "next/image";
import { Star } from "lucide-react";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "The only workspace that actually fuels my creativity. The aesthetic is unmatched.",
    name: "Sarah Chen",
    role: "Product Designer",
    avatar: "/images/profile/port-1.jpg",
  },
  {
    quote:
      "WorkCorp has completely changed our team's hybrid flow. Booking is seamless.",
    name: "Marcus Thorne",
    role: "VP of Engineering",
    avatar: "/images/profile/port-2.jpg",
  },
  {
    quote:
      "Ultra-fast fiber and the best coffee in the city. Truly a premium experience.",
    name: "Elena Rodriguez",
    role: "Startup Founder",
    avatar: "/images/profile/port-3.jpg",
  },
  {
    quote:
      "The flexible booking has saved us thousands in overhead costs this year.",
    name: "Jameson Blake",
    role: "Operations Lead",
    avatar: "/images/profile/port-4.jpg",
  },
  {
    quote:
      "Every room I've booked has been spotless, quiet, and exactly as pictured.",
    name: "Priya Nair",
    role: "Freelance Consultant",
    avatar: "/images/profile/port-5.jpg",
  },
  {
    quote:
      "Our clients are consistently impressed when we host meetings here.",
    name: "David Kim",
    role: "Agency Director",
    avatar: "/images/profile/port-6.jpg",
  },
  {
    quote:
      "Switching between hot desks and private offices as our team grows has been effortless.",
    name: "Amara Okafor",
    role: "Head of People",
    avatar: "/images/profile/port-7.jpg",
  },
  {
    quote:
      "Best decision we made this year was moving our team off Zoom and into WorkCorp's meeting rooms.",
    name: "Liam Foster",
    role: "Engineering Manager",
    avatar: "/images/profile/port-8.jpg",
  },
];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex w-[320px] shrink-0 flex-col rounded-xl bg-app-tertiary p-6 shadow-sm ring-1 ring-app-neutral/8 sm:w-90">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className="size-4 fill-app-secondary text-app-secondary"
          />
        ))}
      </div>
      <p className="mt-4 flex-1 text-sm leading-6 text-app-neutral/75">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <div className="mt-5 flex items-center gap-3">
        <Image
          src={testimonial.avatar}
          alt={testimonial.name}
          width={40}
          height={40}
          className="size-10 shrink-0 rounded-full object-cover ring-1 ring-app-neutral/10"
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-app-neutral">
            {testimonial.name}
          </p>
          <p className="truncate text-xs font-medium uppercase tracking-wide text-app-neutral/50">
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const loopedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="overflow-hidden bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <h2 className="text-center text-3xl font-bold tracking-tight text-app-neutral sm:text-4xl">
          Trusted by Leaders
        </h2>
      </div>

      <div className="relative mt-12">
        <div
          className="flex w-max gap-6 px-5 animate-[marquee_44s_linear_infinite] hover:paused sm:px-8"
        >
          {loopedTestimonials.map((testimonial, index) => (
            <TestimonialCard
              key={`${testimonial.name}-${index}`}
              testimonial={testimonial}
            />
          ))}
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-linear-to-r from-slate-50 to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l from-slate-50 to-transparent sm:w-28" />
      </div>

      <style>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}