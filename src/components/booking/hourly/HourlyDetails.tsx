'use client';
import {useQuery} from "@tanstack/react-query";
import { useEffect, useMemo, useState} from "react";
import { getWorkspaceBookingsByIDAndDate } from "@/lib/db/client-query";
import { Workspace } from "@/types/workspace";
import { getConsecutiveTimeSlots, totalMinutes, minutesToString } from "@/lib/booking/availability";
import { sameDayCheck } from "@/lib/booking/availability";
import EndTimesDisplay from "./EndTimesDisplay";
import PriceDisplay from "./PriceDisplay";
import ConfirmButton from "../ConfirmButton";

type HourlyDetailsProps = {
  selectedDate?: Date;
  selectedWorkspace?: Workspace;
  selectedStartTime?: string | null;
  selectedEndTime: string;
  onSelectStartTime: (time: string | null) => void;
  onSelectEndTime: (time: string) => void;
  totalPrice?: number | null;
  onSetTotalPrice: (price: number | null) => void;
  onConfirm: () => void;
};

const DefaultStartTimes = getConsecutiveTimeSlots("8:00", "16:00");
const MainBookableTimes = getConsecutiveTimeSlots("8:00", "17:00");

const HourlyDetails = ({
  selectedDate,
  selectedWorkspace,
  selectedStartTime,
  selectedEndTime,
  onSelectStartTime,
  onSelectEndTime,
  onSetTotalPrice,
  onConfirm,
}: HourlyDetailsProps) => {

    const [isEndTimeOpen, setIsEndTimeOpen] = useState(false);
    const [currentTime, setCurrentTime] = useState<Date | null>(null);

    useEffect(() => {
      const timeout = window.setTimeout(() => {
        onSelectStartTime(null);
        onSelectEndTime("select end time");
        setIsEndTimeOpen(false);
      }, 0);

      return () => window.clearTimeout(timeout);
    }, [selectedDate, selectedWorkspace?.id, onSelectEndTime, onSelectStartTime]);

  useEffect(() => {
    const updateCurrentTime = () => setCurrentTime(new Date());
    const timeout = window.setTimeout(updateCurrentTime, 0);
    const interval = window.setInterval(updateCurrentTime, 60_000);

    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!selectedStartTime || !selectedEndTime || selectedEndTime === "select end time") {
      onSetTotalPrice(null);
      return;
    }

    const startMinutes = totalMinutes(selectedStartTime);
    const endMinutes = totalMinutes(selectedEndTime);
    if (endMinutes <= startMinutes) {
      onSetTotalPrice(null);
      return;
    }

    const durationHours = (endMinutes - startMinutes) / 60;
    onSetTotalPrice(durationHours * (selectedWorkspace?.hourly_rate ?? 0));
  }, [selectedEndTime, selectedStartTime, selectedWorkspace?.hourly_rate, onSetTotalPrice]);

    const bookingDate = selectedDate?.toISOString().split('T')[0];
    const workspaceId = selectedWorkspace?.id;
    const {data:fetchedSlots, isLoading:isDataLoading, isError} = useQuery({
        queryKey: ["workspace-bookings", bookingDate, workspaceId],
        queryFn: () => getWorkspaceBookingsByIDAndDate(workspaceId as string | number, bookingDate as string),
        enabled: !!bookingDate && !!workspaceId,
    });
    const bookedTimeBlocks = fetchedSlots?.map((item) => {
        return getConsecutiveTimeSlots(item.start_time, item.end_time);
    })|| [];
    const isSameDay = currentTime
      ? selectedDate?.toDateString() === currentTime.toDateString()
      : false;
    const BookedSlots = bookedTimeBlocks?.flat();
    const unBookedSlots = MainBookableTimes.filter((time) => !BookedSlots?.includes(time));
    const filteredSlots = currentTime
      ? sameDayCheck(DefaultStartTimes, currentTime)
      : DefaultStartTimes;

    const validStartTimes = useMemo(() => {
         if (fetchedSlots?.length === 0 && !isSameDay) {
             return DefaultStartTimes;
         }

         if (fetchedSlots?.length === 0 && isSameDay) {
            return filteredSlots;
         }

          return forwardCheck(unBookedSlots, isSameDay) ?? [];
    }, [filteredSlots, fetchedSlots, unBookedSlots, isSameDay]);

    function forwardCheck(arr: string[], isSameDay: boolean) {
      const source = isSameDay && currentTime ? sameDayCheck(arr, currentTime) : arr;

      return source?.filter((time) => {
        const mins = totalMinutes(time);

      return (
        source.includes(minutesToString(mins + 30)) &&
        source.includes(minutesToString(mins + 60))
      );
      });
    }

    function handleEndTimeToggle() {
      setIsEndTimeOpen((prev) => !prev);
    }

  if (!selectedDate) {
    return <p className="text-app-primary font-bold text-center text-base mt-3">Select a date to view valid start times</p>;
  }

  if(isDataLoading) {
    return (
        <div className="rounded-xl border border-dashed border-app-primary/20 bg-app-secondary/10 p-4 sm:p-6">
          <div className="space-y-3">
            <div className="h-4 w-28 animate-pulse rounded bg-app-primary/20" />
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="h-9 animate-pulse rounded bg-app-primary/10" />
              <div className="h-9 animate-pulse rounded bg-app-primary/10" />
            </div>
            <div className="h-40 animate-pulse rounded bg-app-primary/10" />
          </div>
        </div>
    );
  }

  if (isError) {
    return <p className="bg-red-300 p-2 rounded-md text-red-500 font-semibold text-center text-xl">Error fetching data</p>;
  }

  return (
    <div>
      <div className="space-y-3 mt-3">
        <h1 className="text-app-primary font-bold text-xl">Start Times</h1>
        <div className="flex items-center flex-wrap gap-3 mt-2">
          {validStartTimes?.map((item) => {
            const isSelected = selectedStartTime === item;
            return (
              <button
              key={item}
              role="button"
              aria-checked={isSelected}
              className={`cursor-pointer font-semibold py-2 px-6 rounded-lg transition-colors duration-300 ${
                isSelected
              ? "bg-app-primary text-app-tertiary"
              : "bg-app-secondary/5 text-app-primary hover:bg-app-secondary/35"
              }`}

              onClick={() => {
                onSelectStartTime(item);
                onSelectEndTime("select end time");
                setIsEndTimeOpen(false);
              }}
              >
                {item}
              </button>
            )
          })}
        </div>
      </div>

      {selectedStartTime && (
        <>
          <EndTimesDisplay 
            selectedStartTime={selectedStartTime}
            selectedEndTime={selectedEndTime}
            onSelectEndTime={onSelectEndTime}
            fetchedSlots={fetchedSlots ?? []}
            isSameDay={isSameDay}
            validStartTimes={validStartTimes ?? []}
            isEndTimeOpen={isEndTimeOpen}
            onEndTimeToggle={handleEndTimeToggle}
            unBookedHours={unBookedSlots ?? []}
            currentTime={currentTime}
          />

          <PriceDisplay
            selectedStartTime={selectedStartTime}
            selectedEndTime={selectedEndTime}
            hourlyRate={selectedWorkspace?.hourly_rate ?? 0}
          />

          <ConfirmButton
            selectedDate={selectedDate}
            teamSize={selectedWorkspace?.capacity_max}
            startTime={selectedStartTime ?? ""}
            endTime={selectedEndTime ?? "select end time"}
            bookingType="hourly"
            onConfirm={onConfirm}
          />
        </>
      )}
    </div>
  );
};

export default HourlyDetails;
