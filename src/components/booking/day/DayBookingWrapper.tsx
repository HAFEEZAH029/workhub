import { type ReactNode } from "react";

type Prop = {
  children: ReactNode;
  isWrapperLoading: boolean;
};

const DayBookingWrapper = ({ children, isWrapperLoading }: Prop) => {
  return (
    <div className="w-full">
      {isWrapperLoading ? (
        <div className="rounded-xl border border-dashed border-app-primary/20 bg-app-secondary/10 p-4 sm:p-6">
          <div className="space-y-3">
            <div className="h-4 w-28 animate-pulse rounded bg-app-primary/20" />
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="h-9 animate-pulse rounded bg-app-primary/10" />
              <div className="h-9 animate-pulse rounded bg-app-primary/10" />
            </div>
            <div className="h-40 animate-pulse rounded bg-app-primary/10" />
          </div>
        </div>
      ) : null}

      <div className={isWrapperLoading ? "hidden" : "block"}>{children}</div>
    </div>
  );
};

export default DayBookingWrapper;;
