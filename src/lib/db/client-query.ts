import { createClient } from "@/lib/supabase/client";
import { Booking, AutoBooking } from "@/types/booking";

export type WorkspaceBookingSlot = {
  id: string;
  start_time: string;
  end_time: string;
};

export type bookingType = Omit <Booking, "id">;

type BookingRow = {
  id: string;
  workspace_id: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  checked_in_at: string | null;
  auto_check_in: boolean | null;
  workspaces: {
    id: string;
    name: string;
    location_label: string | null;
    code: string;
    workspace_images: {
      id: string;
      image_path: string;
      alt_text: string | null;
      is_primary: boolean;
    }[];
  };
};

export type BookingCardData = {
  id: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  checkedInAt: string | null;
  workspaceId: string;
  workspaceName: string;
  locationLabel: string | null;
  workspaceCode: string;
  imagePath: string | null;
  imageAlt: string;
  auto_check_in: boolean | null;
};

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

export const getBookingsByStatus = async (
  currStatus: string,
  userID: string
): Promise<BookingCardData[]> => {
  const supabase = createClient();
 
  const { data, error } = await supabase
    .from("bookings")
    .select(
      `
      id, workspace_id, booking_date, start_time, end_time, checked_in_at,
      auto_check_in,
      workspaces (
        id, name, location_label, code,
        workspace_images ( id, image_path, alt_text, is_primary )
      )
    `
    )
    .eq("status", currStatus)
    .eq("user_id", userID)
    .order("booking_date", { ascending: true })
    .order("start_time", { ascending: true })
    .returns<BookingRow[]>();
 
  if (error) {
    throw new Error(`Could not fetch ${currStatus} bookings: ${error.message}`);
  }
 
  return (data ?? []).map((booking) => {
    const images = booking.workspaces.workspace_images ?? [];
    const primaryImage = images.find((img) => img.is_primary) ?? images[0];
 
    return {
      id: booking.id,
      bookingDate: booking.booking_date,
      startTime: booking.start_time,
      endTime: booking.end_time,
      checkedInAt: booking.checked_in_at,
      auto_check_in: booking.auto_check_in,
      workspaceId: booking.workspaces.id,
      workspaceName: booking.workspaces.name,
      locationLabel: booking.workspaces.location_label,
      workspaceCode: booking.workspaces.code,
      imagePath: primaryImage?.image_path ?? null,
      imageAlt: primaryImage?.alt_text ?? booking.workspaces.name,
    };
  });
};

export const updateCancelStatus = async (bookingID: string, userID: string) => {
  const supabase = createClient();

  const {error} = await supabase
                        .from("bookings")
                        .update({status: 'cancelled', cancelled_at: new Date().toISOString() })
                        .eq("id", bookingID)
                        .eq("user_id", userID)

    if (error) {
            throw new Error(`Error updating status and cancelling booking: ${error.message}`);
        }

};

export const checkInUser = async (bookingID: string, userID: string) => {
  const supabase = createClient();

  const {error} = await supabase
                        .from("bookings")
                        .update({checked_in_at : new Date().toISOString()})
                        .eq("id", bookingID)
                        .eq("user_id", userID)
                        .select()
                        .single();

      if (error) {
            throw new Error(`Error checking-in user: ${error.message}`);
        }


};

export const autoCheckIn = async (bookingID: string, userID: string): Promise<AutoBooking> => {
  const supabase = createClient();

  const { data, error } = (await supabase
    .from("bookings")
    .update({ auto_check_in: true })
    .eq("id", bookingID)
    .eq("user_id", userID)
    .select()
    .single()) as {
    data: AutoBooking | null;
    error: { message: string } | null;
  };

  if (error || !data) {
    throw new Error(
      `Error enabling auto-check-in: ${error?.message ?? "No booking returned"}`
    );
  }

  return data;
};