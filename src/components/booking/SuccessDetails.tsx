import Link from "next/link";
import {
  CheckCircle2,
  Building2,
  Calendar,
  Clock,
  Users,
  MapPin,
} from "lucide-react";
import { Workspace } from "@/types/workspace";

type SuccessDetailsProps = {
  selectedWorkspace: Workspace;
  selectedDate: Date;
  startTime: string;
  endTime: string;
  booking_type: "hourly" | "day_pass";
  team_size?: number | null;
  totalPrice: number;
};

const SuccessDetails = ({
  selectedWorkspace,
  selectedDate,
  startTime,
  endTime,
  booking_type,
  team_size,
  totalPrice,
}: SuccessDetailsProps) => {
  const formattedDate = selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const formattedTotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(totalPrice);

  return (
    <div className="mx-auto w-full max-w-md space-y-6 text-center">
      
      <div className="mx-auto grid size-20 place-items-center rounded-full bg-app-primary/10">
        <div className="grid size-12 place-items-center rounded-full bg-app-primary">
          <CheckCircle2 className="size-6 text-app-tertiary" strokeWidth={2.5} />
        </div>
      </div>

      <div className="space-y-1.5">
        <h1 className="text-3xl font-bold text-app-neutral">
          Booking Confirmed!
        </h1>
        <p className="text-app-neutral/60">Your workspace is ready for you.</p>
      </div>

      <div className="space-y-4 rounded-2xl border  p-5 text-left sm:p-6">
        <div className="flex items-center gap-3 border-b border-app-neutral/10 pb-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-app-primary/10">
            <Building2 className="size-5 text-app-primary" />
          </span>
          <div>
            <p className="font-bold text-app-neutral">
              {selectedWorkspace.name}
            </p>
            <p className="text-sm text-app-neutral/60">
              {selectedWorkspace.code}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Calendar className="size-4.5 shrink-0 text-app-neutral/50" />
            <p className="text-sm text-app-neutral">{formattedDate}</p>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="size-4.5 shrink-0 text-app-neutral/50" />
            <p className="text-sm text-app-neutral">
              {startTime} - {endTime}
            </p>
          </div>

          {booking_type === "day_pass" && (
            <div className="flex items-center gap-3">
              <Users className="size-4.5 shrink-0 text-app-neutral/50" />
              <p className="text-sm text-app-neutral">
                {team_size ? `${team_size} People` : "-"}
              </p>
            </div>
          )}

          <div className="flex items-center gap-3">
            <MapPin className="size-4.5 shrink-0 text-app-neutral/50" />
            <p className="text-sm text-app-neutral">
              {selectedWorkspace.location_label}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-app-neutral/10 pt-4">
          <p className="font-medium text-app-neutral">Total Price</p>
          <p className="text-lg font-bold text-app-neutral">
            {formattedTotal}
          </p>
        </div>

        <div className="flex text-[12px] items-center justify-between pt-4 -mt-6">
          <p className="font-medium text-app-neutral">Status</p>
          <p className="font-bold text-green-500">
            Paid
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <Link
          href="/history"
          className="block w-full rounded-lg border border-app-primary px-4 py-3 text-sm font-semibold text-app-primary transition hover:bg-app-primary hover:text-app-tertiary duration-500"
        >
          View My Bookings
        </Link>
        <Link
          href="/"
          className="block text-sm font-semibold text-app-neutral/70 transition hover:text-app-neutral"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default SuccessDetails;
