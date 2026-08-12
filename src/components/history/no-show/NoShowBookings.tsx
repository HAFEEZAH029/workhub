"use client";

import { useQuery } from "@tanstack/react-query";
import { getBookingsByStatus } from "@/lib/db/client-query";
import { useAuth } from "@/util/hooks/useAuth";
import Image from "next/image";
import NoShowCard from "./NoShowCard";

const NoShowBookings = () => {
  const { user } = useAuth();
  const userID = user?.id;

  const {
    data: noShowBookings,
    isLoading,
    isError: fetchError,
  } = useQuery({
    queryKey: ["bookings/no-show", userID],
    queryFn: () => getBookingsByStatus("no_show", userID as string),
    enabled: Boolean(userID),
  });

  if (isLoading) {
    return (
      <p className="mt-6 text-center text-lg font-semibold text-app-neutral/60">
        Loading no-show bookings...
      </p>
    );
  }

  if (fetchError) {
    return (
      <p className="mx-auto mt-6 max-w-md rounded-md bg-red-50 p-3 text-center font-semibold text-red-600">
        Error fetching no-show bookings
      </p>
    );
  }

  if (!noShowBookings || noShowBookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2.5 py-16">
        <Image src="/empty2.png" alt="empty workspace" width={180} height={180} />
        <p className="text-xl font-semibold text-app-primary">
          No no-show bookings yet
        </p>
      </div>
    );
  }

  if (!userID) return null;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {noShowBookings.map((booking) => (
        <NoShowCard key={booking.id} booking={booking} />
      ))}
    </div>
  );
};

export default NoShowBookings;
