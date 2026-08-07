"use client";
import { workspace } from "@/types/workspace";
import { workspacecategory } from "@/types/category";
import { MapPin } from "lucide-react";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { ModalContext } from "@/lib/context/modal-context";
import HourlyModal from "@/components/modal/HourlyModal";
import DayModal from "@/components/modal/DayModal";
import { useAuth } from "@/util/hooks/useAuth";

type HeaderProps = {
  workspace: workspace;
  Category: workspacecategory;
}

const StickyHeader = ({ workspace, Category }: HeaderProps) => {
  const isHourly = Boolean(workspace.hourly_rate);
  const price = isHourly ? workspace.hourly_rate : workspace.daily_base_price;
  const { modalOpen, handleOpenModal } = useContext(ModalContext);
  const {isLoading, isAuthenticated} = useAuth();
  const router = useRouter();

  const handleBookNow = () => {
        if (isLoading) return;

        if (!isAuthenticated) {
            const currentPath = window.location.pathname;
            router.push(`/login?next=${encodeURIComponent(currentPath)}`);
        } else {
           handleOpenModal(Category.booking_type);
        }
  };



  return (
    <section className="sticky top-0 z-30 sm:mx-0 flex flex-col items-center justify-between gap-4 border-b border-app-neutral/10 bg-app-tertiary/95 px-5 py-4 backdrop-blur sm:flex-row sm:gap-0 sm:px-6 sm:py-5">
      <div className="space-y-1.5 text-center sm:text-left">
        <h1 className="text-xl font-bold text-app-neutral sm:text-2xl">
          {workspace.name}
        </h1>
        <p className="inline-flex flex-wrap items-center justify-center gap-1.5 text-sm text-app-neutral/60 sm:justify-start">
          <MapPin className="size-4 text-app-primary" />
          <span>{workspace.location_label}</span>
          {workspace.code && (
            <>
              <span className="text-app-neutral/30">•</span>
              <span>{workspace.code}</span>
            </>
          )}
        </p>
      </div>

      <div className="flex items-center w-full sm:w-fit justify-between gap-4 sm:gap-6">
        <div className="text-center text-app-neutral">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-app-neutral/50">
            {isHourly ? "Hourly Rate" : "Day Pass"}
          </p>
          <p className="text-xl font-bold text-app-primary">
            ${price}
            <span className="text-sm font-medium text-app-neutral/60">
              {" "}
              / {isHourly ? "hr" : "day"}
            </span>
          </p>
        </div>
        <button
          type="button"
          disabled={isLoading}
          className="shrink-0 cursor-pointer rounded-lg bg-app-primary px-6 py-3 text-sm font-semibold text-app-tertiary transition hover:bg-app-primary/85"
          onClick={handleBookNow}
        >
          {isLoading ? 'Checking status....' : 'Book now'}
        </button>
      </div>

      <HourlyModal 
      isOpen={modalOpen === "hourly"} 
      selectedWorkspace={workspace} 
      />
      
      <DayModal 
      isOpen={modalOpen === "day_pass"} 
      selectedWorkspace={workspace} 
      />
    </section>
  );
};

export default StickyHeader;
