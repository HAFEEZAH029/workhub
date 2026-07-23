import { ComponentLayoutProps } from "@/types/workspace";
import PrivateOfficeSvg from "../svg/PrivateOfficeSvg";
import WorkNode from "./WorkNode";

const POSITIONS = {
  apex: {
    x: 95,
    y: 125,
    width: 135,
    height: 85,
  },
  summit: {
    x: 330,
    y: 125,
    width: 135,
    height: 85,
  },
  zenith: {
    x: 545,
    y: 125,
    width: 135,
    height: 85,
  },
  cosmos: {
    x: 775,
    y: 125,
    width: 135,
    height: 85,
  },
  horizon: {
    x: 105,
    y: 455,
    width: 135,
    height: 85,
  },
  nebula: {
    x: 105,
    y: 780,
    width: 145,
    height: 85,
  },
  stratos: {
    x: 775,
    y: 805,
    width: 135,
    height: 85,
  },
} as const;

const PrivateOffices = ({
  workspaces,
  selectedWorkspace,
  onWorkspaceSelect,
  onViewDetails,
  onBookNow,
}: ComponentLayoutProps) => {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-[#FBFAF6]">
      <PrivateOfficeSvg />
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

export default PrivateOffices;
