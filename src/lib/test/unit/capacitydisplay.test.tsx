import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CapacityAndPriceDisplay from '@/components/booking/day/CapacityAndPriceDisplay';

const workspace = {
  id: "1",
  capacity_min: 5,
  capacity_max: 7,
} as any;

describe ("select and display capacities in right order", () => {
    it("displays workspace capacity in ascending order", () => {
        render (
            <CapacityAndPriceDisplay
            selectedWorkspace = {workspace}
            selectedTeamSize={workspace.capacity_max}
            onCapacitySelect={jest.fn()}
            />
        );

        expect(screen.getAllByRole("button", {name: "5 people"})).toBeInTheDocument;
        expect(screen.getAllByRole("button", {name: "6 people"})).toBeInTheDocument;
        expect(screen.getAllByRole("button", {name: "7 people"})).toBeInTheDocument;
    });

    it("calls onCapacitySelect when a team size is clicked", async () => {
        const user = userEvent.setup();
        const onSelect = jest.fn();
        render (
            <CapacityAndPriceDisplay
            selectedWorkspace = {workspace}
            selectedTeamSize={workspace.capacity_max}
            onCapacitySelect={onSelect}
            />
        );

        await user.click(
          screen.getByRole("button", {name: "5 people"})
        )

        expect(onSelect).toHaveBeenCalledWith(5);
    });

    it("displays workspace capacity in ascending order", () => {
        const container = render (
            <CapacityAndPriceDisplay
            selectedWorkspace = {null}
            selectedTeamSize={null}
            onCapacitySelect={jest.fn()}
            />
        );

        expect(container).toBeEmptyDOMElement
    });
});