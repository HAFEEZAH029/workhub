import {
  Building2,
  Users,
  Calendar,
  Clock,
  CheckCircle2,
  Coffee,
  ArrowRight,
  Loader2
} from "lucide-react";
import { Workspace } from "@/types/workspace";
import SuccessDetails from "./SuccessDetails";

type ConfirmDetailsProps = {
  selectedWorkspace: Workspace;
  bookingType: "hourly" | "day_pass";
  selectedDate?: Date;
  teamSize?: number | null;
  startTime?: string;
  endTime?: string;
  totalPrice?: number | null;
  onBack: () => void;
  onPay: () => void;
  isPending?: boolean;
  onSuccess?: boolean;
};

const ConfirmDetails = ({
  selectedWorkspace,
  bookingType,
  selectedDate,
  teamSize,
  startTime,
  endTime,
  totalPrice,
  onBack,
  onPay,
  isPending,
  onSuccess
}: ConfirmDetailsProps) => {
  const primaryImage =
    selectedWorkspace.workspace_images?.find((image) => image.is_primary) ??
    selectedWorkspace.workspace_images?.[0];

  const formattedTotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(totalPrice ?? 0);

  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "No date selected";

  return onSuccess ? (
    <SuccessDetails
      selectedWorkspace={selectedWorkspace}
      selectedDate={selectedDate ?? new Date()}
      startTime={startTime ?? ""}
      endTime={endTime ?? ""}
      booking_type={bookingType}
      team_size={teamSize ?? null}
      totalPrice={totalPrice ?? 0}
    />
  ) : (
    <div className="space-y-6">
      <h1 className="text-center text-lg font-bold text-app-primary sm:text-xl">
        Review your Booking
      </h1>

      <div className="overflow-hidden rounded-2xl border border-app-primary/10 bg-white shadow-sm">
        <div className="h-40 w-full overflow-hidden bg-app-primary/5 sm:h-48">
          <img
            src={primaryImage?.image_path ?? ""}
            alt={primaryImage?.alt_text ?? selectedWorkspace.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="space-y-4 bg-app-secondary/5 p-5">
          <div className="flex items-start gap-2.5">
            <Building2 className="mt-0.5 size-5 shrink-0 text-app-primary" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-app-neutral/50">
                Workspace
              </p>
              <p className="text-lg font-bold text-app-neutral">
                {selectedWorkspace.name}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-2.5">
              <Users className="mt-0.5 size-5 shrink-0 text-app-primary" />
              <div>
                <p className="text-xs font-medium text-app-neutral/50">
                  Team Size
                </p>
                <p className="text-sm font-semibold text-app-neutral">
                  {teamSize ? `${teamSize} People` : "-"}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Calendar className="mt-0.5 size-5 shrink-0 text-app-primary" />
              <div>
                <p className="text-xs font-medium text-app-neutral/50">
                  Date
                </p>
                <p className="text-sm font-semibold text-app-neutral">
                  {formattedDate}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Clock className="mt-0.5 size-5 shrink-0 text-app-primary" />
            <div>
              <p className="text-xs font-medium text-app-neutral/50">
                Access
              </p>
              <p className="text-sm font-semibold text-app-neutral">
                {startTime ?? ""} - {endTime ?? ""}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <p className="text-app-neutral/70">
            Booking Type
          </p>
          <p className="font-medium text-app-neutral">{bookingType === "day_pass" ? "Day Pass" : "Hourly Booking"}</p>
        </div>
        <div className="flex items-center justify-between border-t border-app-neutral/10 pt-2">
          <p className="font-bold text-app-neutral">Total</p>
          <p className="text-lg font-bold text-app-primary">
            {formattedTotal}
          </p>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2.5 rounded-xl bg-app-secondary/10 px-4 py-3">
          <Coffee className="size-4 shrink-0 text-app-primary" />
          <p className="text-sm text-app-neutral">
            Includes premium coffee and fast Wi-Fi
          </p>
        </div>
        <div className="flex items-center gap-2.5 rounded-xl bg-app-secondary/10 mt-3 px-4 py-3">
          <CheckCircle2 className="size-4 shrink-0 text-app-primary" />
          <p className="text-sm text-app-neutral">
            Instant confirmation and online check-in
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <button
          type="button"
          disabled={isPending}
          onClick={onPay}
          className={`flex w-full items-center justify-center gap-2 rounded-full bg-app-primary px-4 py-3 text-sm font-bold text-app-tertiary transition hover:bg-app-primary/90 ${isPending ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        >
          {isPending ? (
            <>
               Processing....
               <Loader2 className="w-4 h-4 animate-spin repeat-infinite text-app-tertiary"/>
            </>
          ) : ( "Pay Now") }
          <ArrowRight className="size-4" />
        </button>
        <button
          type="button"
          onClick={onBack}
          className="w-full cursor-pointer px-4 py-1 text-center text-sm font-medium text-app-neutral/60 transition hover:text-app-neutral"
        >
          Cancel and return to booking
        </button>
      </div>
    </div>
  );
};

export default ConfirmDetails;
