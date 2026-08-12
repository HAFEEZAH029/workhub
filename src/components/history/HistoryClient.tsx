"use client";

import { useState, useEffect } from "react";
import ActiveBookings from "./active/ActiveBookings";
import UpcomingBookings from "./upcoming/UpcomingBookings";
import CompletedBookings from "./completed/CompletedBookings";
import CancelledBookings from "./cancelled/CancelledBookings";
import NoShowBookings from "./no-show/NoShowBookings";
import { useRouter } from "next/navigation";
import { useAuth } from "@/util/hooks/useAuth";
import {
  PlayCircle,
  Calendar,
  CheckCircle2,
  XCircle,
  CalendarX,
  type LucideIcon,
} from "lucide-react";

type tabType = {
  id: number;
  title: string;
  icon: LucideIcon;
  component: React.ComponentType;
};

const TABS: tabType[] = [
  {
    id: 1,
    title: "Active",
    icon: PlayCircle,
    component: ActiveBookings,
  },
  {
    id: 2,
    title: "Upcoming",
    icon: Calendar,
    component: UpcomingBookings,
  },
  {
    id: 3,
    title: "Completed",
    icon: CheckCircle2,
    component: CompletedBookings,
  },
  {
    id: 4,
    title: "Cancelled",
    icon: XCircle,
    component: CancelledBookings,
  },
  {
    id: 5,
    title: "No-Show",
    icon: CalendarX,
    component: NoShowBookings,
  },
];

const HistoryClient = () => {
  const [selectedTabID, setSelectedTabID] = useState<number>(TABS[0].id);
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [isLoading, user, router]);
 
  if (isLoading) {
    return (
      <p className="mt-16 text-center text-lg font-semibold text-app-neutral/60">
        Loading...
      </p>
    );
  }
 
  if (!user) return null;

  function handleSelectTab(i: number) {
    setSelectedTabID(TABS[i].id);
  }

  return (
    <section className="px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
      <h1 className="text-2xl font-bold text-app-primary sm:text-3xl">
        Bookings History
      </h1>

      <div className="mt-6 flex items-center gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden">
        {TABS.map((tab, index) => {
          const isSelected = selectedTabID === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleSelectTab(index)}
              className={`flex shrink-0 cursor-pointer items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                isSelected
                  ? "bg-app-primary text-app-tertiary shadow-sm"
                  : "bg-app-primary/5 text-app-primary/70 hover:bg-app-primary/10"
              }`}
            >
              <Icon className="size-4 shrink-0" />
              <span>{tab.title}</span>
            </button>
          );
        })}
      </div>

      <section className="mt-6">
        {TABS.map((tab) => {
          const isDisplayed = selectedTabID === tab.id;
          const DisplayedTab = tab.component;

          return isDisplayed && <DisplayedTab key={tab.id} />;
        })}
      </section>
    </section>
  );
};

export default HistoryClient;
