import { ComponentLayoutProps } from "@/types/workspace";
import PhoneBoothSvg from "../svg/PhoneBoothSvg";
import WorkNode from "./WorkNode";

const POSITIONS = {
  echo: {
    x: 104,
    y: 126,
    width: 126,
    height: 82,
  },

  whisper: {
    x: 332,
    y: 126,
    width: 126,
    height: 82,
  },

  solace: {
    x: 560,
    y: 126,
    width: 126,
    height: 82,
  },

  clarity: {
    x: 786,
    y: 126,
    width: 126,
    height: 82,
  },
} as const;

const PhoneBooth = ({workspaces, selectedWorkspace, onWorkspaceSelect, onViewDetails, onBookNow, isLoading}: ComponentLayoutProps) => {

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-[#FBFAF6]">
      <PhoneBoothSvg />
      <svg
      viewBox="0 0 1000 1000"
      preserveAspectRatio="xMidYMid meet"
      className="absolute inset-0 h-full w-full">
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
            isLoading={isLoading}
            />
         )
      })}
      </svg>
    </div>
  )
}

export default PhoneBooth;
