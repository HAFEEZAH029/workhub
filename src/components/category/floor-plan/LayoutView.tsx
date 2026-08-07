'use client';

import { useEffect, useRef, useState, useContext } from "react";
import PhoneBooth from "./PhoneBooth";
import HotDesks from "./HotDesks";
import PrivateOffices from "./PrivateOffices";
import MeetingRooms from "./MeetingRooms";
import { floorconfig, FloorType, workspacecategory } from "@/types/category";
import { Workspace } from "@/types/workspace";
import { useRouter } from "next/navigation";
import { ModalContext } from "@/lib/context/modal-context";
import HourlyModal from "@/components/modal/HourlyModal";
import DayModal from "@/components/modal/DayModal";
import { useAuth } from "@/util/hooks/useAuth";


type LayoutProps = {
    category: FloorType;
    Workspaces: Workspace[];
    Category: workspacecategory;
}

const floorPlanConfig: floorconfig = {
    "phone-booths": {
        component: PhoneBooth
    },
     "hot-desks": {
        component: HotDesks,
    },
     "meeting-rooms": {
        component: MeetingRooms,
    },
    "private-offices": {
        component: PrivateOffices,
    }
}

const LayoutView = ({category, Workspaces, Category}: LayoutProps) => {

    const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(null);
    const layoutRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();
    const {modalOpen, handleOpenModal} = useContext(ModalContext);
    const {isLoading, isAuthenticated} = useAuth();

    const handleSelect = (workspace: Workspace) => {
        setSelectedWorkspace(workspace);
    }

    const handleViewDetails = (slug:string) => {
        router.push(`/workspaces/${category}/${slug}`);
    }

    const handleBookNow = () => {
        if (isLoading) return;

        if (!isAuthenticated) {
            const currentPath = window.location.pathname;
            router.push(`/login?next=${encodeURIComponent(currentPath)}`);
        } else {
           handleOpenModal(Category.booking_type);
        }
    };

    useEffect(() => {
        const handlePointerDown = (event: MouseEvent) => {
            if (!(event.target instanceof Node)) return;

            const clickedInsideLayout = layoutRef.current?.contains(event.target);
            const clickedInsideModal = document.querySelector("dialog[open]")?.contains(event.target);

            if (clickedInsideLayout || clickedInsideModal) return;

            setSelectedWorkspace(null);
        };

        document.addEventListener("pointerdown", handlePointerDown, true);

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown, true);
        };
    }, []);

    const Layout = floorPlanConfig[category].component;
  return (
     <div ref={layoutRef}>
        <i className="text-app-primary font-semibold">Select a workspace to open quick actions</i>
        <Layout
        workspaces={Workspaces}
        selectedWorkspace={selectedWorkspace}
        onWorkspaceSelect={handleSelect}
        onViewDetails={handleViewDetails}
        onBookNow={handleBookNow}
        isLoading={isLoading}
        />

      <HourlyModal 
      isOpen={modalOpen === "hourly"} 
      selectedWorkspace={selectedWorkspace} 
      />
      
      <DayModal 
      isOpen={modalOpen === "day_pass"} 
      selectedWorkspace={selectedWorkspace} 
      />
     </div>
  )
}

export default LayoutView;
