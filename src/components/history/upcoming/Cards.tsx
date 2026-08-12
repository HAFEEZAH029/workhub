"use client";

import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { updateCancelStatus, autoCheckIn } from "@/lib/db/client-query";
import type { BookingCardData } from "@/lib/db/client-query";
import type { AutoBooking } from "@/types/booking";
import { combineDateAndTime } from "@/lib/booking/history";
import { Calendar, Timer, Loader2, X,MapPin } from "lucide-react";

type UpcomingBookingCardProps = {
  booking: BookingCardData;
  userID: string;
};

const Cards = ({ booking, userID }: UpcomingBookingCardProps) => {

  const queryClient = useQueryClient();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isCancelSuccess, setIsCancelSuccess] = useState(false);
  const [isCancelError, setIsCancelError] = useState(false);
  const alreadyAutoChecked = Boolean(booking.auto_check_in);
  const [autoEnabled, setAutoEnabled] = useState<boolean>(Boolean(booking.auto_check_in));
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const { mutate, isPending } = useMutation<
    AutoBooking,
    Error,
    { bookingID: string; userID: string }
  >({
    mutationFn: ({ bookingID, userID }) => autoCheckIn(bookingID, userID),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["bookings/upcoming", userID] });
      setAutoEnabled(Boolean(data?.auto_check_in));
      setIsSuccess(true);
    },
    onError: () => setIsError(true),
  });

  const { mutate: mutateCancel, isPending: isCancelPending } = useMutation({
    mutationFn: ({ bookingID, userID }: { bookingID: string; userID: string }) =>
      updateCancelStatus(bookingID, userID),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings/upcoming", userID] });
      setIsCancelSuccess(true);
    },
    onError: () => setIsCancelError(true),
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

  useEffect(() => {
    if (!isCancelSuccess) return;
    const timer = setTimeout(() => setIsCancelSuccess(false), 5000);
    return () => clearTimeout(timer);
  }, [isCancelSuccess]);

  useEffect(() => {
    if (!isCancelError) return;
    const timer = setTimeout(() => setIsCancelError(false), 10_000);
    return () => clearTimeout(timer);
  }, [isCancelError]);

  function handleAutoCheckinUser() {
    if (isPending || autoEnabled) return;
    setIsError(false);
    mutate({ bookingID: booking.id, userID });
  }

  function handleConfirmCancel() {
    setIsCancelError(false);
    mutateCancel({ bookingID: booking.id, userID });
    setIsCancelModalOpen(false);
  }

  const start = combineDateAndTime(booking.bookingDate, booking.startTime);
  const end = combineDateAndTime(booking.bookingDate, booking.endTime);
  const durationHours = Math.round(
    ((end.getTime() - start.getTime()) / (60 * 60 * 1000)) * 10
  ) / 10;

  const formattedDate = start.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex overflow-hidden rounded-2xl border border-app-neutral/10 bg-white shadow-sm">

      <div className="relative w-28 shrink-0 sm:w-36">
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
        <div className="space-y-3">
          <h3 className="font-bold text-app-neutral">{booking.workspaceName}</h3>
          <p className="flex items-center gap-1.5 text-xs text-app-neutral/60">
              <MapPin className="size-3 shrink-0 text-app-primary" />
              <span>{booking.locationLabel} || {booking.workspaceCode}</span>
            </p>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <p className="flex items-center gap-1.5 text-xs text-app-neutral/60">
              <Calendar className="size-3.5 shrink-0 text-app-primary" />
              <span>{formattedDate}</span>
            </p>
            <p className="flex items-center gap-1.5 text-xs text-app-neutral/60">
              <Timer className="size-3.5 shrink-0 text-app-primary" />
              <span>
                {durationHours} {durationHours === 1 ? "hour" : "hours"} (
                {booking.startTime} - {booking.endTime})
              </span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleAutoCheckinUser}
            disabled={autoEnabled || isPending || alreadyAutoChecked}
            className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
              autoEnabled
                ? "cursor-not-allowed bg-app-primary/10 text-app-primary/50"
                : isPending
                  ? "cursor-not-allowed border border-app-primary/50 text-app-primary/50"
                  : "cursor-pointer border border-app-primary text-app-primary hover:bg-app-primary/5"
            }`}
          >
            {isPending && <Loader2 className="size-4 animate-spin" />}
            {autoEnabled ? "Auto Enabled Check-in" : isPending ? "Processing…" : "Auto Check In"}
          </button>

          <button
            type="button"
            onClick={() => setIsCancelModalOpen(true)}
            disabled={isCancelPending}
            className={`inline-flex items-center gap-1.5 rounded-lg bg-app-primary px-4 py-2.5 text-sm font-semibold text-app-tertiary transition ${
              isCancelPending
                ? "cursor-not-allowed opacity-55"
                : "cursor-pointer hover:bg-app-primary/85"
            }`}
          >
            {isCancelPending && <Loader2 className="size-4 animate-spin" />}
            {isCancelPending ? "Cancelling…" : "Cancel"}
          </button>
        </div>

        {isSuccess && (
          <p className="text-xs font-medium text-green-600">
            Auto check-in enabled!
          </p>
        )}
        {isError && (
          <p className="rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-600">
            Failed to enable auto check-in
          </p>
        )}
        {isCancelSuccess && (
          <p className="text-right text-xs font-medium text-green-600">
            Booking cancelled!
          </p>
        )}
        {isCancelError && (
          <p className="rounded-md bg-red-50 px-2 py-1 text-right text-xs font-medium text-red-600">
            Failed to cancel booking
          </p>
        )}
      </div>

    
      {isCancelModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setIsCancelModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-2xl bg-app-tertiary p-6 shadow-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-lg font-bold text-app-neutral">
                Cancel booking?
              </h2>
              <button
                type="button"
                onClick={() => setIsCancelModalOpen(false)}
                className="shrink-0 rounded-full p-1 text-app-neutral/50 transition hover:bg-app-neutral/5 hover:text-app-neutral"
                aria-label="Close"
              >
                <X className="size-5" />
              </button>
            </div>

            <p className="mt-2 text-sm text-app-neutral/65">
              Are you sure you want to cancel this booking? This action cannot
              be undone.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setIsCancelModalOpen(false)}
                className="rounded-lg px-4 py-2.5 text-sm font-semibold text-app-neutral/70 transition hover:bg-app-neutral/5"
              >
                Keep Booking
              </button>
              <button
                type="button"
                onClick={handleConfirmCancel}
                className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cards;
