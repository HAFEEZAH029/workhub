import { Clock3, DollarSign } from "lucide-react";
import { useMemo } from "react";
import { totalMinutes } from "@/lib/booking/availability";

type PriceDisplayProps = {
  selectedStartTime: string | null;
  selectedEndTime: string;
  hourlyRate: number;
};

const PriceDisplay = ({
  selectedStartTime,
  selectedEndTime,
  hourlyRate,
}: PriceDisplayProps) => {
  const durationHours = useMemo(() => {
    if (!selectedStartTime || !selectedEndTime || selectedEndTime === "select end time") {
      return 0;
    }

    const startMinutes = totalMinutes(selectedStartTime);
    const endMinutes = totalMinutes(selectedEndTime);

    if (endMinutes <= startMinutes) {
      return 0;
    }

    return (endMinutes - startMinutes) / 60;
  }, [selectedEndTime, selectedStartTime]);

  const totalPrice = useMemo(() => durationHours * hourlyRate, [durationHours, hourlyRate]);

  const durationLabel = `${durationHours.toFixed(1)} Hour${durationHours === 1 ? "" : "s"}`;

  const formattedRate = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(hourlyRate);

  const formattedTotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(totalPrice);

  return (
    <div className="mt-5 space-y-3 rounded-xl bg-app-secondary/10 p-4 sm:p-5">
      <div className="flex items-center justify-between gap-4">
        <p className="flex items-center gap-1.5 text-sm text-app-neutral/60">
          <DollarSign className="size-4 text-app-primary" />
          Rate:
        </p>
        <p className="text-sm font-medium text-app-neutral sm:text-base">
          {formattedRate} <span className="text-app-neutral/60">/ hr</span>
        </p>
      </div>

      <div className="flex items-center justify-between gap-4">
        <p className="flex items-center gap-1.5 text-sm text-app-neutral/60">
          <Clock3 className="size-4 text-app-primary" />
          Duration:
        </p>
        <p className="text-sm font-medium text-app-neutral sm:text-base">
          {durationLabel}
        </p>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-app-neutral/10 pt-3">
        <p className="text-base font-bold text-app-neutral">Total Price:</p>
        <p className="text-lg font-bold text-app-primary sm:text-xl">
          {formattedTotal}
        </p>
      </div>
    </div>
  );
};

export default PriceDisplay;
