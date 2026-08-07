import { Workspace } from "@/types/workspace";
import {motion} from "framer-motion";

type Position = {
    x: number;
    y: number;
    width: number;
    height: number;
}

type WorkspaceNodeProps = {
    workspace: Workspace;
    position:Position
    selected: boolean;
    onWorkspaceSelect: (workspace: Workspace) => void;
    onViewDetails: (slug: string) => void;
    onBookNow: () => void;
    isLoading: boolean
};

const WorkNode = ({workspace, selected, onWorkspaceSelect, onViewDetails, onBookNow,  position, isLoading}:WorkspaceNodeProps) => {
  const actionMenuWidth = Math.max(position.width, 140);
  const actionMenuX = position.x + (position.width / 2) - (actionMenuWidth / 2);

  return (
    <motion.g
    onClick={(event) => {
            event.stopPropagation();
            onWorkspaceSelect(workspace)}}
    whileHover={{scale: 1.03}}
    className="cursor-pointer relative"
    >

      <rect
      x={position.x}
      y={position.y}
      rx={12}
      ry={12}
      width={position.width}
      height={position.height}
      fill={selected ? "#D4AF37" : "#F8F8F8"}
      stroke={selected ? "#111827" : "#4A6B5D"}
      strokeWidth={2}
      />

      <text
      x={position.x + position.width/2}
      y={position.y + position.height/2}
      textAnchor="middle"
      dominantBaseline="middle"
      fontSize={16}
      fontWeight={600}
      fill="#4A6B5D"
      >
        {workspace.code}
      </text>

      <text
      x={position.x + position.width/2}
      y={position.y + position.height/2 + 22}
      textAnchor="middle"
      dominantBaseline="middle"
      fontSize={12}
      fontWeight={500}
      fill="#111827"
      >
        {workspace.slug}
      </text>

      {selected ? (
        <foreignObject x={actionMenuX} y={position.y - 82} width={actionMenuWidth} height={84}>
          <div className="pointer-events-auto flex flex-col gap-2 rounded-xl border border-app-neutral/15 bg-white/95 p-2 shadow-lg backdrop-blur-sm">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onViewDetails(workspace.slug);
              }}
              className="rounded-md cursor-pointer bg-app-primary px-2.5 py-1.5 text-left text-xs font-semibold text-app-tertiary transition hover:bg-app-primary/90"
            >
              View details
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onBookNow();
              }}
              disabled={isLoading}
              className="rounded-md cursor-pointer border border-app-primary/20 bg-white px-2.5 py-1.5 text-left text-xs font-semibold text-app-primary transition hover:bg-app-primary/10"
            >
              {isLoading ? 'Checking status....' : 'Book now'}
            </button>
          </div>
        </foreignObject>
      ) : null}
    </motion.g>
  )
}

export default WorkNode
