import { sameDayCheck, getEndTimes, getConsecutiveTimeSlots } from "@/lib/booking/availability";
import { Clock, ChevronDown } from "lucide-react";
import {useMemo} from "react";

type EndTimesDisplayProps = {
    selectedStartTime: string | null;
    selectedEndTime: string;
    onSelectEndTime: (time: string) => void;
    fetchedSlots: any[];
    isSameDay: boolean;
    validStartTimes: string[];
    isEndTimeOpen: boolean;
    onEndTimeToggle: () => void;
    unBookedHours: string[];
};

const DefaultEndTimes = getConsecutiveTimeSlots("9:00", "17:00");

const EndTimesDisplay = ({
    selectedStartTime,
    selectedEndTime,
    onSelectEndTime,
    fetchedSlots,
    isSameDay,
    validStartTimes,
    isEndTimeOpen,
    onEndTimeToggle,
    unBookedHours,
}: EndTimesDisplayProps) => {

    const filteredEndSlots = sameDayCheck(DefaultEndTimes);

    const validEndTimes = useMemo(() => {
            if (!selectedStartTime) return [];

            if (fetchedSlots?.length === 0 && !isSameDay) {
                return getEndTimes(selectedStartTime, DefaultEndTimes);
            }

            if (fetchedSlots?.length === 0 && isSameDay) {
                return getEndTimes(selectedStartTime, filteredEndSlots ?? []);
            }

            return getEndTimes(selectedStartTime, unBookedHours ?? []);
      }, [selectedStartTime, validStartTimes, filteredEndSlots, isSameDay, fetchedSlots]);

  return (
    <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 mt-5">
        <div className="space-y-2 flex-1">
          <h1 className="text-app-primary font-semibold text-sm text-left">Start Time</h1>
          <div className="bg-app-secondary/20 rounded-lg px-3 py-1.5 w-full flex items-center justify-between gap-5 text-app-primary font-bold text-lg">
            <p>{selectedStartTime}</p>
            <Clock className="size-4" />
          </div>
        </div>
        <div className="space-y-2 flex-1">
          <h1 className="text-app-primary font-semibold text-sm text-left">End Times Available</h1>
          <div className="relative">
            <button
              type="button"
              onClick={onEndTimeToggle}
              className="flex h-10 w-full cursor-pointer items-center justify-between gap-2 rounded-md border border-app-neutral/15 bg-app-secondary/8 px-3 text-sm font-bold text-app-neutral shadow-sm transition hover:border-app-primary/40"
            >
              <span>{selectedEndTime}</span>
              <ChevronDown className={`size-4 transition ${isEndTimeOpen ? "rotate-180" : "rotate-0"}`} />
            </button>
            {isEndTimeOpen && selectedStartTime && (
              <div className="absolute right-0 z-20 mt-2 w-full max-h-44 overflow-y-scroll rounded-md border border-app-primary/10 bg-app-tertiary py-1 shadow-xl scrollbar-thin scrollbar-track-app-primary/10 scrollbar-thumb-app-primary/60">
                {validEndTimes.length > 0 ? (
                  validEndTimes.map((option) => {
                    const isActive = selectedEndTime === option;

                    return (
                      <button
                        key={option}
                        onClick={() => {
                          onSelectEndTime(option);
                          onEndTimeToggle();
                        }}
                        className={`block w-full px-4 py-2 text-left text-sm font-semibold transition hover:bg-app-primary/10 ${
                          isActive ? "bg-app-primary text-app-tertiary hover:bg-app-primary" : "text-black"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })
                ) : (
                  <div className="px-4 py-2 text-sm font-semibold text-app-neutral/70">
                    No end times available
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
    </div>
)}

export default EndTimesDisplay
