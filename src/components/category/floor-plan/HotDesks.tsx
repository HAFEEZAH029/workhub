import { ComponentLayoutProps } from "@/types/workspace";
import HotDeskSvg from "../svg/HotDeskSvg";
import WorkNode from "./WorkNode";

const POSITIONS = {
  clover: {
    x: 96,
    y: 82,
    width: 100,
    height: 70,
  },
  drift: {
    x: 256,
    y: 82,
    width: 108,
    height: 70,
  },
  canyon: {
    x: 66,
    y: 258,
    width: 118,
    height: 78,
  },
  flint: {
    x: 266,
    y: 258,
    width: 126,
    height: 78,
  },
  moss: {
    x: 66,
    y: 516,
    width: 122,
    height: 88,
  },
  quartz: {
    x: 266,
    y: 516,
    width: 126,
    height: 88,
  },
  valley: {
    x: 70,
    y: 720,
    width: 200,
    height: 170,
  },
  tundra: {
    x: 425,
    y: 300,
    width: 155,
    height: 120,
  },
  delta: {
    x: 730,
    y: 108,
    width: 205,
    height: 90,
  },
  archipelago: {
    x: 730,
    y: 305,
    width: 205,
    height: 90,
  },
  ember: {
    x: 600,
    y: 508,
    width: 140,
    height: 70,
  },
  meadow: {
    x: 802,
    y: 790,
    width: 78,
    height: 150,
  },
} as const;

const HotDesks = ({
  workspaces,
  selectedWorkspace,
  onWorkspaceSelect,
  onViewDetails,
  onBookNow,
}: ComponentLayoutProps) => {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-[#FBFAF6]">
      <HotDeskSvg />
      <svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 h-full w-full"
      >
        {workspaces.map((workspace) => {
          const position = POSITIONS[workspace.slug as keyof typeof POSITIONS];

          if (!position) return null;

          return (
            <WorkNode
              key={workspace.id}
              workspace={workspace}
              selected={selectedWorkspace?.id === workspace.id}
              onWorkspaceSelect={onWorkspaceSelect}
              onViewDetails={onViewDetails}
              onBookNow={onBookNow}
              position={position}
            />
          );
        })}
      </svg>
    </div>
  );
};

export default HotDesks;
