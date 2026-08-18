import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HourlyDetails from "@/components/booking/hourly/HourlyDetails";
import * as clientQuery from "@/lib/db/client-query";

// Mocking the whole module (rather than jest.spyOn on a single export) avoids
// "Cannot redefine property" - next/jest compiles ESM exports via SWC into
// non-configurable getters, which spyOn can't redefine but jest.mock can
// freely replace.
jest.mock("../../db/client-query", () => ({
  ...jest.requireActual("../../db/client-query"),
  getWorkspaceBookingsByIDAndDate: jest.fn(),
}));

const mockedGetWorkspaceBookings =
  clientQuery.getWorkspaceBookingsByIDAndDate as jest.Mock;

const workspace = {
  id: "workspace-1",
  name: "Zenith",
  hourly_rate: 50,
  capacity_min: 1,
  capacity_max: 6,
} as any;

const renderComponent = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <HourlyDetails
        selectedDate={new Date("2026-08-20T00:00:00")}
        selectedWorkspace={workspace}
        selectedStartTime={null}
        selectedEndTime="select end time"
        onSelectStartTime={jest.fn()}
        onSelectEndTime={jest.fn()}
        onSetTotalPrice={jest.fn()}
        onConfirm={jest.fn()}
      />
    </QueryClientProvider>
  );
};

describe("Hourly Details", () => {
  afterEach(() => {
    // jest.restoreAllMocks() only restores jest.spyOn spies - it does nothing
    // for the jest.fn() created inside the jest.mock factory above, so we
    // need to reset that one explicitly between tests.
    mockedGetWorkspaceBookings.mockReset();
  });

  it("displays valid start times after bookings are fetched", async () => {
    mockedGetWorkspaceBookings.mockResolvedValue([
      {
        id: "booking-1",
        start_time: "10:00:00",
        end_time: "12:00:00",
      } as any,
    ]);

    renderComponent();

    expect(
      screen.queryByText(/Select a date to view valid start times/i)
    ).not.toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Start Times")).toBeInTheDocument();
    });

    expect(screen.getByRole("button", { name: "08:30" })).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "10:00" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "10:30" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "11:00" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "11:30" })
    ).not.toBeInTheDocument();
  });

  it("fetches bookings with the local calendar date", async () => {
    mockedGetWorkspaceBookings.mockResolvedValue([]);

    renderComponent();

    await waitFor(() => {
      expect(mockedGetWorkspaceBookings).toHaveBeenCalledWith(
        "workspace-1",
        "2026-08-20"
      );
    });
  });

  it("shows an error when fetching bookings fails", async () => {
    mockedGetWorkspaceBookings.mockRejectedValue(
      new Error("Failed to fetch bookings")
    );

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText(/error fetching data/i)).toBeInTheDocument();
    });
  });
});
