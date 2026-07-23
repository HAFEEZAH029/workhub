import { ComponentLayoutProps } from "@/types/workspace";
import MeetingRoomSvg from "../svg/MeetingRoomSvg";
import WorkNode from "./WorkNode";

const POSITIONS = {
  "creative-room": {
    x: 142,
    y: 130,
    width: 145,
    height: 82,
  },
  "huddle-room": {
    x: 116,
    y: 420,
    width: 195,
    height: 92,
  },
  "board-room": {
    x: 732,
    y: 170,
    width: 120,
    height: 185,
  },
} as const;

const MeetingRooms = ({
  workspaces,
  selectedWorkspace,
  onWorkspaceSelect,
  onViewDetails,
  onBookNow,
}: ComponentLayoutProps) => {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-[#FBFAF6]">
      <MeetingRoomSvg />
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

export default MeetingRooms;
