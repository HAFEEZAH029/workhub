import { workspace } from "@/types/workspace";
import { Users, ClockArrowUp, Landmark } from "lucide-react";




const AboutWorkspace = ({ workspace }: { workspace: workspace }) => {
  const capacityLabel =
    workspace.capacity_min === workspace.capacity_max
      ? `${workspace.capacity_min}`
      : `${workspace.capacity_min}-${workspace.capacity_max}`;
  const capacityUnit = workspace.capacity_max > 1 ? "People" : "Person";

  return (
    <section className="space-y-6 mt-20 mb-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-1 min-w-37.5 flex-col items-center gap-2 rounded-xl bg-app-secondary/10 px-4 py-5 text-center">
          <Users className="size-5 text-app-primary" />
          <p className="text-[15px] sm:text-xl font-bold text-app-neutral">
            {capacityLabel} {capacityUnit}
          </p>
          <p className="text-[18px] font-semi-bold text-app-neutral/60">capacity</p>
        </div>
        <div className="flex flex-1 min-w-37.5 flex-col items-center gap-2 rounded-xl bg-app-secondary/10 px-4 py-5 text-center">
          <ClockArrowUp className="size-5 text-app-primary" />
          <p className="text-[15px] sm:text-xl  font-bold text-app-neutral">Peak-Productivity</p>
          <p className="text-[18px] font-semi-bold text-app-neutral/60">comfort</p>
        </div>
        <div className="flex flex-1 min-w-37.5 flex-col items-center gap-2 rounded-xl bg-app-secondary/10 px-4 py-5 text-center">
          <Landmark className="size-5 text-app-primary" />
          <p className="text-[15px] sm:text-xl  font-bold text-app-neutral">Serene-Environment</p>
          <p className="text-[18px] font-semi-bold text-app-neutral/60">serenity</p>
        </div>
      </div>

      <div className="space-y-3 mt-8">
        <h2 className="text-xl font-bold text-app-neutral">About the space</h2>
        <p className="leading-7 text-xl text-app-neutral/70">
          {workspace.description}
        </p>
      </div>
    </section>
  );
};

export default AboutWorkspace;
