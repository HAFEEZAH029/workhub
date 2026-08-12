"use client";

import Image from "next/image";
import type { BookingCardData } from "@/lib/db/client-query";
import { Calendar, Timer, MapPin } from "lucide-react";
import { combineDateAndTime } from "@/lib/booking/history";

type NoShowCardProps = {
  booking: BookingCardData;
};

const NoShowCard = ({ booking }: NoShowCardProps) => {
  const start = combineDateAndTime(booking.bookingDate, booking.startTime);
  const end = combineDateAndTime(booking.bookingDate, booking.endTime);

  const formattedDate = start.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex overflow-hidden rounded-2xl border border-app-neutral/10 bg-white shadow-sm relative">

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
                {booking.startTime} - {booking.endTime}
              </span>
            </p>
          </div>
        </div>
      </div>

      <span className="absolute top-3 right-3 rounded-md bg-red-100 px-2 py-1 text-xs font-semibold text-red-600">
        No Check-in Detected
      </span>
    </div>
  );
};

export default NoShowCard;
