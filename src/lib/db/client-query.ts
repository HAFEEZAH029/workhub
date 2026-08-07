import { createClient } from "@/lib/supabase/client";
import { Booking } from "@/types/booking";

export type WorkspaceBookingSlot = {
  id: string;
  start_time: string;
  end_time: string;
};

export type bookingType = Omit <Booking, "id">;

export const getWorkspaceBookingsByIDAndDate = async (
  workspaceId: string | number,
  bookingDate: string
): Promise<WorkspaceBookingSlot[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("bookings")
    .select("id, start_time, end_time")
    .eq("workspace_id", workspaceId)
    .eq("booking_date", bookingDate)
    .in("status", ["active", "upcoming"]);

  if (error) {
    throw new Error(`Could not fetch booked time slots: ${error.message}`);
  }

  return data;
};


export const createBooking = async (bookingData: bookingType): Promise<void> => {
  const supabase = createClient();

  const { error } = await supabase
    .from("bookings")
    .insert(bookingData);

  if (error) {
    throw new Error(error.message);
  }
};