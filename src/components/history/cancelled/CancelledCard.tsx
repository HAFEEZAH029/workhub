"use client";

import Image from "next/image";
import type { BookingCardData } from "@/lib/db/client-query";
import { Calendar, Timer, MapPin, XCircle } from "lucide-react";
import { combineDateAndTime } from "@/lib/booking/history";

type CancelledCardProps = {
  booking: BookingCardData;
};

const CancelledCard = ({ booking }: CancelledCardProps) => {
  const start = combineDateAndTime(booking.bookingDate, booking.startTime);

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
                {booking.startTime} - {booking.endTime}
              </span>
            </p>
          </div>
        </div>

        <div className="rounded-lg w-fit bg-red-100 px-3 py-2 space-y-0.5">
          <p className="text-[11px] text-red-600">REASON</p>
          <p className="flex items-center gap-1.5 text-xs font-medium text-red-600">
            <XCircle className="size-4 shrink-0" />
            <span>User action</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CancelledCard;
