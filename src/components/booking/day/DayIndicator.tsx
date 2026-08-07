

const DayIndicator = () => {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-app-neutral">
        <p className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-red-600" />
          Booked
        </p>
        <p className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-slate-300" />
          Unavailable
        </p>
        <p className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-app-secondary/25" />
          Today
        </p>
      </div>
  )
}

export default DayIndicator;
