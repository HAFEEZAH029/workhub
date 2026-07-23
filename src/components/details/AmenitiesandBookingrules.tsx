import { workspace } from "@/types/workspace";
import {
  Snowflake,
  Plug,
  Armchair,
  Sparkles,
  Info,
  XCircle,
  ShieldCheck,
  VolumeX, Projector, Printer, Wifi, Lock, Monitor, MoveVertical, Coffee, Video, Sun, Presentation,
  type LucideIcon,
} from "lucide-react";


const AMENITY_ICON_MAP: Record<string, LucideIcon> = {
  snowflake: Snowflake,
  projector: Projector,
  plug: Plug,
  armchair: Armchair,
  printer: Printer,
  wifi: Wifi,
  "move-vertical": MoveVertical,
  lock: Lock,
  monitor: Monitor,
  coffee: Coffee,
  video: Video,
  sun: Sun,
  presentation: Presentation,
  "volume-x": VolumeX
};

function getAmenityIcon(key: string): LucideIcon {
  return AMENITY_ICON_MAP[key?.toLowerCase().trim()] ?? Sparkles;
}


const BOOKING_RULES = [
  {
    icon: Info,
    iconClassName: "text-sky-600",
    title: "Cancellation Policy",
    description:
      "Only upcoming bookings can be cancelled",
  },
  {
    icon: XCircle,
    iconClassName: "text-red-600",
    title: "No-Show Policy",
    description:
      "100% no refund for not showing up without prior notification.",
  },
  {
    icon: ShieldCheck,
    iconClassName: "text-app-secondary",
    title: "Check-in Required",
    description:
      "Important: Check-in via the app is required at start or through-out the booking session, to prevent no shows",
  },
];

const AmenitiesAndBookingRules = ({ workspace }: { workspace: workspace }) => {
  const amenities = workspace.workspace_amenities ?? [];

  return (
    <section className="space-y-8 mb-20">

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-app-neutral">Amenities</h2>
        <div className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
          
          {amenities.map((amenity) => {
            const AmenityIcon = getAmenityIcon(amenity.icon);

            return (
              <div key={amenity.id} className="flex items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-app-primary/20">
                  <AmenityIcon className="size-4.5 text-app-primary" />
                </span>
                <p className="text-sm font-medium text-app-neutral">
                  {amenity.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-4 rounded-xl bg-app-secondary/10 mt-18 p-6">
        <h2 className="text-xl font-bold text-app-neutral">Booking Rules</h2>
        <ul className="space-y-4">
          {BOOKING_RULES.map(
            ({ icon: RuleIcon, iconClassName, title, description }) => (
              <li key={title} className="flex gap-3">
                <RuleIcon className={`size-5 shrink-0 ${iconClassName}`} />
                <p className="leading-6 text-app-neutral/75">
                  <span className="font-bold text-app-neutral">{title}</span>
                  <br />
                  {description}
                </p>
              </li>
            )
          )}
        </ul>
      </div>
    </section>
  );
};

export default AmenitiesAndBookingRules;