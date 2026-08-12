

export type Booking = {
  id: string;
  workspace_id: string;
  user_id: string ;
  booking_date: string;
  booking_type: "hourly" | "day_pass";
  start_time: string | null;
  end_time: string | null;
  team_size: number | null;
  total_price: number;
  status: "active" | "upcoming" | "completed" | "cancelled" | " no_show";
};

export type AutoBooking = {
  id: string;
  workspace_id: string;
  user_id: string ;
  booking_date: string;
  booking_type: "hourly" | "day_pass";
  start_time: string | null;
  end_time: string | null;
  team_size: number | null;
  total_price: number;
  status: "active" | "upcoming" | "completed" | "cancelled" | " no_show";
  auto_check_in: boolean | null;
};

export type BookingDate = {
  "booking_date": string;
}

