import { Workspace } from "@/types/workspace";

type ConfirmButtonProps = {
  selectedDate?: Date;
  teamSize?: number | null;
  startTime?: string;
  endTime?: string;
  bookingType?: "hourly" | "day_pass";
  onConfirm?: () => void;
};

const ConfirmButton = ({
  selectedDate,
  teamSize,
  startTime,
  endTime,
  bookingType = "hourly",
  onConfirm,
}: ConfirmButtonProps) => {
  const isDisabled =
    bookingType === "hourly"
      ? !selectedDate || !startTime || !endTime || endTime === "select end time"
      : !selectedDate || !teamSize;

  return (
    <div className="flex justify-center">
      <button
        type="button"
        onClick={() => onConfirm?.()}
        className={`mt-4 w-[80%] rounded-md bg-app-primary px-4 py-2 font-bold text-app-tertiary shadow-md transition duration-200 ${
          isDisabled
            ? "cursor-not-allowed opacity-70"
            : "cursor-pointer hover:bg-app-primary/80"
        }`}
        disabled={isDisabled}
      >
        Confirm Booking
      </button>
    </div>
  );
};

export default ConfirmButton;