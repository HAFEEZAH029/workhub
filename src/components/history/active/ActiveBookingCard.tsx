"use client";

import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { MapPin, Loader2 } from "lucide-react";
import { checkInUser } from "@/lib/db/client-query";
import { combineDateAndTime } from "@/lib/booking/history";
import type { BookingCardData } from "@/lib/db/client-query";

type ActiveBookingCardProps = {
  booking: BookingCardData;
  now: Date;
  userID: string;
};

const ActiveBookingCard = ({ booking, now, userID }: ActiveBookingCardProps) => {
  const alreadyCheckedIn = Boolean(booking.checkedInAt);

  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ bookingID, userID }: { bookingID: string; userID: string }) =>
      checkInUser(bookingID, userID),
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ["bookings/active", userID]})
        setIsSuccess(true)
    },
    onError: () => setIsError(true),
  });

  useEffect(() => {
    if (!isSuccess) return;
    const timer = setTimeout(() => setIsSuccess(false), 5000);
    return () => clearTimeout(timer);
  }, [isSuccess]);

  useEffect(() => {
    if (!isError) return;
    const timer = setTimeout(() => setIsError(false), 10_000);
    return () => clearTimeout(timer);
  }, [isError]);

  const isChecked = alreadyCheckedIn || isSuccess;
  const isLocked = isChecked || isPending;

  const handleCheckIn = () => {
    if (isLocked) return;
    setIsError(false);
    mutate({ bookingID: booking.id, userID });
  };

  const start = combineDateAndTime(booking.bookingDate, booking.startTime);
  const end = combineDateAndTime(booking.bookingDate, booking.endTime);

  const totalMs = end.getTime() - start.getTime();
  const elapsedMs = Math.min(Math.max(now.getTime() - start.getTime(), 0), totalMs);
  const elapsedPercent = totalMs > 0 ? Math.round((elapsedMs / totalMs) * 100) : 0;
  const remainingMinutes = Math.max(Math.round((totalMs - elapsedMs) / 60_000), 0);
  const remainingLabel =
    remainingMinutes >= 60
      ? `${Math.floor(remainingMinutes / 60)}h ${remainingMinutes % 60}m left`
      : `${remainingMinutes}m left`;

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

  return (
    <div className="flex overflow-hidden rounded-2xl border border-app-neutral/10 bg-white shadow-sm">

      <div className="relative w-28 shrink-0 sm:w-36">
        <span className="absolute left-2 top-2 z-10 inline-flex items-center gap-1 rounded-full bg-app-secondary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-app-neutral">
          <span className="size-1.5 rounded-full bg-app-primary" />
          Live
        </span>
        {booking.imagePath ? (
          <Image
            src={booking.imagePath}
            alt={booking.imageAlt}
            fill
            sizes="(min-width: 640px) 144px, 112px"
            className="object-cover"
          />
        ) : (
          <div className="h-full w-full bg-app-primary/5" />
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between gap-3 p-4">
        <div className="space-y-1">
          <h3 className="font-bold text-app-neutral">{booking.workspaceName}</h3>
          <p className="flex flex-wrap items-center gap-1.5 text-xs text-app-neutral/60">
            <MapPin className="size-3.5 shrink-0 text-app-primary" />
            <span>{booking.locationLabel}</span>
            {booking.workspaceCode && (
              <>
                <span className="text-app-neutral/30">•</span>
                <span>{booking.workspaceCode}</span>
              </>
            )}
          </p>
        </div>

        <div className="space-y-1.5">
          <p className="flex items-center justify-between text-xs font-medium text-app-neutral/60">
            <span>Progress</span>
            <span className="font-semibold text-app-neutral">{remainingLabel}</span>
          </p>
          <div className="h-2 w-full rounded-full bg-app-primary/10">
            <div
              className="h-full rounded-full bg-app-primary transition-all"
              style={{ width: `${elapsedPercent}%` }}
            />
          </div>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-app-neutral/50">
              Session Time
            </p>
            <p className="text-sm font-bold text-app-neutral">
              {formatTime(start)} - {formatTime(end)}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {isPending && (
              <Loader2 className="size-4 animate-spin text-app-primary" />
            )}
            <span className="text-xs font-semibold text-app-neutral/60">
              {isChecked ? "On" : "Off"}
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={isChecked}
              aria-label="Check in to this session"
              disabled={isLocked}
              onClick={handleCheckIn}
              className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors duration-200 disabled:cursor-not-allowed ${
                isChecked ? "bg-app-primary" : "bg-app-neutral/20"
              } ${isPending ? "opacity-70" : ""}`}
            >
              <span
                className={`inline-block size-5 transform rounded-full bg-white shadow transition-transform duration-200 ${
                  isChecked ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        {isSuccess && (
          <p className="text-right text-xs font-medium text-green-600">
            Check-in successful!
          </p>
        )}
        {isError && (
          <p className="rounded-md bg-red-200 px-2 py-1 text-right text-xs font-medium text-red-600">
            Unable to check in
          </p>
        )}
      </div>
    </div>
  );
};

export default ActiveBookingCard;