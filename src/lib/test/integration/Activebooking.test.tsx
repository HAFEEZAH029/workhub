import { render, screen, fireEvent, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ActiveBookingCard from "@/components/history/active/ActiveBookingCard";
import * as clientQuery from "@/lib/db/client-query";
import type { BookingCardData } from "@/lib/db/client-query";

// module-factory mock (not spyOn) - avoids "Cannot redefine property" on
// SWC-compiled ESM exports
jest.mock("@/lib/db/client-query", () => ({
  ...jest.requireActual("@/lib/db/client-query"),
  checkInUser: jest.fn(),
}));

const mockedCheckInUser = clientQuery.checkInUser as jest.Mock;

const booking: BookingCardData = {
  id: "booking-1",
  bookingDate: "2026-08-20",
  startTime: "10:00",
  endTime: "12:00",
  auto_check_in: null,
  checkedInAt: null,
  workspaceId: "workspace-1",
  workspaceName: "Studio One",
  locationLabel: "Innovation Hub, Floor 4",
  workspaceCode: "STU-01",
  imagePath: null,
  imageAlt: "Studio One",
};

const renderCard = (bookingOverrides: Partial<BookingCardData> = {}) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <ActiveBookingCard
        booking={{ ...booking, ...bookingOverrides }}
        now={new Date("2026-08-20T10:30:00")}
        userID="user-1"
      />
    </QueryClientProvider>
  );
};

describe("Check-in system (integration)", () => {
  afterEach(() => {
    mockedCheckInUser.mockReset();
    jest.useRealTimers();
  });

  it("checks in on click, disables permanently, and auto-dismisses the success message", async () => {
    jest.useFakeTimers();
    mockedCheckInUser.mockResolvedValue(undefined);

    renderCard();

    const toggle = screen.getByRole("switch", { name: /Check in to this session/i });
    expect(toggle).not.toBeDisabled();
    expect(toggle).toHaveAttribute("aria-checked", "false");

    fireEvent.click(toggle);

    // flush the mocked mutation's resolved-promise microtasks so onSuccess runs
    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });

    expect(mockedCheckInUser).toHaveBeenCalledWith("booking-1", "user-1");
    expect(toggle).toHaveAttribute("aria-checked", "true");
    expect(toggle).toBeDisabled();
    expect(screen.getByText(/Check-in successful!/i)).toBeInTheDocument();

    // advance past the 4s auto-dismiss timer
    await act(async () => {
      jest.advanceTimersByTime(6000);
    });

    expect(screen.queryByText(/Check-in successful!/i)).not.toBeInTheDocument();

    // the toggle itself must stay checked in + disabled forever, independent
    // of the message disappearing
    expect(toggle).toHaveAttribute("aria-checked", "true");
    expect(toggle).toBeDisabled();
  });

  it("renders pre-checked-in bookings as already toggled on, with no click needed", () => {
    renderCard({ checkedInAt: "2026-08-20T10:05:00" });

    const toggle = screen.getByRole("switch", { name: /Check in to this session/i });
    expect(toggle).toHaveAttribute("aria-checked", "true");
    expect(toggle).toBeDisabled();
    expect(mockedCheckInUser).not.toHaveBeenCalled();
  });

  it("shows an error and allows retry when check-in fails", async () => {
    jest.useFakeTimers();
    mockedCheckInUser.mockRejectedValue(new Error("network error"));

    renderCard();

    const toggle = screen.getByRole("switch", { name: /Check in to this session/i });
    fireEvent.click(toggle);

    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });

    expect(screen.getByText(/Unable to check in/i)).toBeInTheDocument();
    // failure must NOT lock the toggle - user can try again
    expect(toggle).toHaveAttribute("aria-checked", "false");
    expect(toggle).not.toBeDisabled();

    await act(async () => {
      jest.advanceTimersByTime(10_000);
    });

    expect(screen.queryByText(/Unable to check in/i)).not.toBeInTheDocument();
  });
});