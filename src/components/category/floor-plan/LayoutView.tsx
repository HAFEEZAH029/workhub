'use client';

import { useState } from "react";
import PhoneBooth from "./PhoneBooth";
import HotDesks from "./HotDesks";
import PrivateOffices from "./PrivateOffices";
import MeetingRooms from "./MeetingRooms";
import { floorconfig, FloorType } from "@/types/category";
import { Workspace } from "@/types/workspace";
import { useRouter } from "next/navigation";


type LayoutProps = {
    category: FloorType;
    Workspaces: Workspace[]
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

const LayoutView = ({category, Workspaces}: LayoutProps) => {

    const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(null);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [bookingWorkspace, setBookingWorkspace] = useState<Workspace | null>(null);
    const router = useRouter();

    const handleSelect = (workspace: Workspace) => {
        setSelectedWorkspace(workspace);
    }

    const handleViewDetails = (slug:string) => {
        router.push(`/workspaces/${category}/${slug}`);
    }

    const handleBookNow = (workspace: Workspace) => {
        setSelectedWorkspace(workspace);
        setBookingWorkspace(workspace);
        setIsBookingModalOpen(true);
    }

    const handleCloseBookingModal = () => {
        setIsBookingModalOpen(false);
        setBookingWorkspace(null);
    }

    const Layout = floorPlanConfig[category].component;
  return (
     <>
        <i className="text-app-primary font-semibold">Select a workspace to open quick actions</i>
        <Layout
        workspaces={Workspaces}
        selectedWorkspace={selectedWorkspace}
        onWorkspaceSelect={handleSelect}
        onViewDetails={handleViewDetails}
        onBookNow={handleBookNow}
        />

        {isBookingModalOpen && bookingWorkspace ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4">
                <div className="w-full max-w-md rounded-2xl border border-app-neutral/10 bg-white p-6 shadow-2xl">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <h3 className="text-lg font-semibold text-app-neutral">Book {bookingWorkspace.name}</h3>
                            <p className="mt-2 text-sm text-app-neutral/70">
                                The booking experience for this workspace is being prepared. This action is now wired so you can plug in the booking modal later without changing the layout flow.
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={handleCloseBookingModal}
                            className="text-sm font-semibold text-app-neutral/60 transition hover:text-app-primary"
                        >
                            Close
                        </button>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={handleCloseBookingModal}
                            className="rounded-lg border border-app-neutral/15 px-3 py-2 text-sm font-semibold text-app-neutral transition hover:border-app-primary/30 hover:text-app-primary"
                        >
                            Keep browsing
                        </button>
                        <button
                            type="button"
                            onClick={handleCloseBookingModal}
                            className="rounded-lg bg-app-primary px-3 py-2 text-sm font-semibold text-app-tertiary transition hover:bg-app-primary/90"
                        >
                            Continue later
                        </button>
                    </div>
                </div>
            </div>
        ) : null}
     </>
  )
}

export default LayoutView;
