"use client";

import { useQuery } from "@tanstack/react-query";
import { getBookingsByStatus } from "@/lib/db/client-query";
import { useAuth } from "@/util/hooks/useAuth";
import Image from "next/image";
import CancelledCard from "./CancelledCard";

const CancelledBookings = () => {
  const { user } = useAuth();
  const userID = user?.id;

  const {
    data: cancelledBookings,
    isLoading,
    isError: fetchError,
  } = useQuery({
    queryKey: ["bookings/cancelled", userID],
    queryFn: () => getBookingsByStatus("cancelled", userID as string),
    enabled: Boolean(userID),
  });

  if (isLoading) {
    return (
      <p className="mt-6 text-center text-lg font-semibold text-app-neutral/60">
        Loading cancelled bookings...
      </p>
    );
  }

  if (fetchError) {
    return (
      <p className="mx-auto mt-6 max-w-md rounded-md bg-red-50 p-3 text-center font-semibold text-red-600">
        Error fetching cancelled bookings
      </p>
    );
  }

  if (!cancelledBookings || cancelledBookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2.5 py-16">
        <Image src="/empty2.png" alt="empty workspace" width={180} height={180} />
        <p className="text-xl font-semibold text-app-primary">
          No cancelled bookings yet
        </p>
      </div>
    );
  }

  if (!userID) return null;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {cancelledBookings.map((booking) => (
        <CancelledCard key={booking.id} booking={booking} />
      ))}
    </div>
  );
};

export default CancelledBookings;

