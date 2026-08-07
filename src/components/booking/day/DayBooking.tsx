"use client";

import { useEffect, useState } from "react";
import DayCalendar from "./DayCalendar";
import { Workspace } from "@/types/workspace";

 type Prop = {
  selectedWorkspace: Workspace | null;
  onLoadingChange: (text:boolean) => void;
  selected?: Date;
  onSelect: (date: Date | undefined) => void;
};


const DayBooking = ({ selectedWorkspace, onLoadingChange, selected, onSelect }: Prop) => {
  const [bookedDates, setBookedDates] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedWorkspace?.id) return;

    const controller = new AbortController();

    const loadBookedDates = async () => {
      setIsLoading(true);
      onLoadingChange(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/bookings/day-pass?workspaceId=${encodeURIComponent(selectedWorkspace.id)}`,
          {
            signal: controller.signal,
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error("Could not load booking availability.");
        }

        const data = (await response.json()) as { bookedDates: string[] };
        setBookedDates(data.bookedDates);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setError("Could not load booking availability. Please try again.");
        setBookedDates([]);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
          onLoadingChange(false);
        }
      }
    };

    loadBookedDates();

    return () => {
      controller.abort();
    };
  }, [selectedWorkspace?.id]);

  if (!selectedWorkspace) return null;

  if (isLoading) {
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

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
        {error}
      </div>
    );
  }

  return (
    <>
      <DayCalendar bookedDates={bookedDates} selected={selected} onSelect={onSelect} />
    </>
  );
};

export default DayBooking;
