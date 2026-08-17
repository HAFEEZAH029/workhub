import { render, screen, waitFor } from "@testing-library/react";
import DayBooking from "@/components/booking/day/DayBooking";

jest.mock("@/components/booking/day/DayCalendar", () => ({
  __esModule: true,
  default: ({
    bookedDates,
  }: {
    bookedDates: string[];
  }) => (
    <div data-testid="day-calendar">
      {bookedDates.map((date) => (
        <span key={date}>{date}</span>
      ))}
    </div>
  ),
}));

const workspace = {
  id: "workspace-1",
  name: "Zenith",
  daily_base_price: 500,
  capacity_min: 1,
  capacity_max: 6,
} as any;

const renderComponent = () => {
  return render(
    <DayBooking
      selectedWorkspace={workspace}
      onLoadingChange={jest.fn()}
      selected={undefined}
      onSelect={jest.fn()}
    />
  );
};

describe("Day Booking", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("loads booked dates and passes them to the calendar", async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({
        bookedDates: ["2026-08-20", "2026-08-22"],
      }),
    } as Response);

    renderComponent();

    await waitFor(() => {
      expect(screen.getByTestId("day-calendar")).toBeInTheDocument();
    });

    expect(screen.getByText("2026-08-20")).toBeInTheDocument();
    expect(screen.getByText("2026-08-22")).toBeInTheDocument();

    expect(
      screen.queryByText("2026-08-21")
    ).not.toBeInTheDocument();
  });

  it("shows an error when fetching day-booking availability fails", async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
    } as Response);

    renderComponent();

    await waitFor(() => {
      expect(
        screen.getByText(
          /Could not load booking availability\. Please try again\./i
        )
      ).toBeInTheDocument();
    });
  });
});