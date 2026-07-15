import { Zap, CalendarClock, Users, type LucideIcon } from "lucide-react";

type Feature = {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: Zap,
    iconBg: "bg-app-primary/10",
    iconColor: "text-app-primary",
    title: "Productivity",
    description:
      "State-of-the-art facilities designed to minimize distractions and maximize output.",
  },
  {
    icon: CalendarClock,
    iconBg: "bg-app-secondary/15",
    iconColor: "text-app-secondary",
    title: "Flexibility",
    description:
      "Book for an hour, a day, or a month. Pay only for the space you actually use.",
  },
  {
    icon: Users,
    iconBg: "bg-app-primary/10",
    iconColor: "text-app-primary",
    title: "Community",
    description:
      "Connect with high-performance professionals and innovative local businesses.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-app-tertiary px-5 my-18 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.28em] text-app-primary">
            Our Value
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-app-neutral sm:text-5xl">
            Designed for Success
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8">
          {features.map(({ icon: Icon, iconBg, iconColor, title, description }) => (
            <div key={title} className="flex flex-col items-center text-center">
              <span
                className={`grid size-14 place-items-center rounded-2xl ${iconBg}`}
              >
                <Icon className={`size-6 ${iconColor}`} strokeWidth={2} />
              </span>
              <h3 className="mt-5 text-xl font-bold text-app-neutral">
                {title}
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-6 text-app-neutral/65">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}