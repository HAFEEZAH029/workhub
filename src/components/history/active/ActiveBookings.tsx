"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBookingsByStatus } from "@/lib/db/client-query";
import { useAuth } from "@/util/hooks/useAuth";
import Image from "next/image";
import ActiveBookingCard from "./ActiveBookingCard";

const ActiveBookings = () => {
  const { user } = useAuth();
  const userID = user?.id;

  const {
    data: activeBookings,
    isLoading,
    isError: fetchError,
  } = useQuery({
    queryKey: ["bookings/active", userID],
    queryFn: () => getBookingsByStatus("active", userID as string),
    enabled: Boolean(userID),
  });

  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const updateNow = () => setNow(new Date());
    const timeout = window.setTimeout(updateNow, 0);
    const interval = window.setInterval(updateNow, 60_000);

    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, []);

  if (isLoading) {
    return (
      <p className="mt-6 text-center text-lg font-semibold text-app-neutral/60">
        Loading active bookings...
      </p>
    );
  }

  if (fetchError) {
    return (
      <p className="mx-auto mt-6 max-w-md rounded-md bg-red-50 p-3 text-center font-semibold text-red-600">
        Error fetching active bookings
      </p>
    );
  }

  if (!activeBookings || activeBookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2.5 py-16">
        <Image src="/empty-state.png" alt="empty workspace" width={180} height={180} />
        <p className="text-xl font-semibold text-app-primary">
          No active bookings yet
        </p>
      </div>
    );
  }

  if (!userID || !now) return null;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {activeBookings.map((booking) => (
        <ActiveBookingCard
          key={booking.id}
          booking={booking}
          now={now}
          userID={userID}
        />
      ))}
    </div>
  );
};

export default ActiveBookings;
