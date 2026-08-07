'use client';

import { DayPicker, getDefaultClassNames } from "@daypicker/react";

type Prop = {
  bookedDates: string[];
  selected?: Date;
  onSelect: (date: Date | undefined) => void;
};

const DayCalendar = ({ bookedDates, selected, onSelect }: Prop) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const defaultClassNames = getDefaultClassNames();

  const bookedDateObjects = bookedDates
    .filter(Boolean)
    .map((item) => {
      const nextDate = new Date(`${item}T00:00:00`);
      nextDate.setHours(0, 0, 0, 0);
      return nextDate;
    });

  const disabledRules: Array<Date | { before: Date }> = [{ before: today }];
  if (bookedDateObjects.length > 0) {
    disabledRules.push(...bookedDateObjects);
  }

   const baseDayStyle = "w-full aspect-square max-w-[40px] flex items-center justify-center rounded-full text-xs sm:text-sm transition-all";

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-app-primary/10 bg-white p-2 shadow-sm sm:p-4">
      <DayPicker
        mode="single"
        modifiers={{
          booked: bookedDateObjects,
        }}
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
        modifiersClassNames={{
          booked:  `${baseDayStyle} bg-red-200 text-red-600 cursor-not-allowed font-medium`,
        }}
        selected={selected}
        onSelect={onSelect}
        disabled={disabledRules}
        footer={selected ? `Selected: ${selected.toLocaleDateString()}` : "Pick a day to continue"}
      />
    </div>
  );
}

export default DayCalendar;
