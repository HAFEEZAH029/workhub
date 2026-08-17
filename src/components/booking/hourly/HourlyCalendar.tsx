'use client';

import { DayPicker, getDefaultClassNames } from "@daypicker/react";
import { useEffect, useState } from "react";

type HourlyCalendarProps = {
  selected?: Date;
  onSelect: (date: Date | undefined) => void;
};

const HourlyCalendar = ({ selected, onSelect }: HourlyCalendarProps) => {
  const [today, setToday] = useState<Date | undefined>(undefined);
  const defaultClassNames = getDefaultClassNames();
  const baseDayStyle = "w-full aspect-square max-w-[40px] flex items-center justify-center rounded-full text-xs sm:text-sm transition-all";

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const nextToday = new Date();
      nextToday.setHours(0, 0, 0, 0);
      setToday(nextToday);
    }, 0);

    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-app-primary/10 bg-white p-2 shadow-sm sm:p-4">
      <DayPicker
        mode="single"
        classNames={{
          today: `${baseDayStyle} border border-gray-300 bg-app-secondary/15 text-app-neutral font-semibold`,
          selected: `${baseDayStyle} bg-app-primary text-white font-semibold shadow-sm`,
          root: `${defaultClassNames.root} w-full p-3 sm:p-5`,
          chevron: `${defaultClassNames.chevron} fill-[#4A6B5D] cursor-pointer`,
          disabled:`${baseDayStyle} bg-slate-100 text-gray-400 cursor-not-allowed`,
          month_grid: "w-full",
          month_caption: "text-app-primary",
          weekdays: "w-full flex justify-between mb-2",
          weekday: "w-full text-center text-xs font-semibold text-gray-500 aspect-square max-w-[40px] flex items-center justify-center",
          week: "w-full flex justify-between mt-1",
          day: `${baseDayStyle} mb-2`,
          nav: "flex items-center justify-between",
        }}
        selected={selected}
        onSelect={onSelect}
        disabled={today ? { before: today } : undefined}
        footer={selected ? `Selected: ${selected.toLocaleDateString()}` : "Pick a day to continue"}
      />
    </div>
  );
};

export default HourlyCalendar;
