import { Workspace } from "@/types/workspace";

type Prop = {
  selectedWorkspace: Workspace | null;
  selectedTeamSize: number | null;
  onCapacitySelect: (capacity:number) => void;
  totalPrice?: number | null;
};

const getCapacityArray = (min:number, max:number) => {
        return Array.from(
            {length: max - min + 1},
            (_, index) => min + index
        );
};

const CapacityAndPriceDisplay = ({selectedWorkspace, selectedTeamSize, onCapacitySelect, totalPrice}: Prop) => {

    if (!selectedWorkspace) return null;

    const workspace = selectedWorkspace;
    const capacityArray = getCapacityArray(
        workspace.capacity_min, workspace.capacity_max
    );

    const defaultTime = "8:00 - 17:00";


  return (
    <>
      <div className="mt-5">
       <h1 className="font-bold text-xl text-app-neutral mb-2">Team Size</h1>
       <div className="flex items-center justify-between flex-wrap gap-4">
        {capacityArray.map((item) => {
        const  isSelected = item === selectedTeamSize;
        return (
            <button
            key={item}
            className={`border border-app-primary rounded-2xl min-w-28 px-6 py-3 cursor-pointer font-semibold hover:bg-app-primary/15 hover:text-app-neutral transition-all duration-200 ${isSelected ? `text-app-tertiary bg-app-primary shadow-md` : `text-app-primary`}`}
            onClick={() => {
              onCapacitySelect(item);
            }}
            >
                 {item === 1 ? `${item} person` : `${item} people`}
            </button>
        )
        })}
       </div>
      </div>
      <div className="mt-5 space-y-2 bg-app-secondary/5 rounded-md p-3">
        <div className="flex items-center justify-between text-[14px]">
          <p>Default Time</p>
          <p>{defaultTime}</p>
        </div>
        <div className="flex items-center justify-between text-lg text-app-primary font-bold">
          <p>Total</p>
          <p>${totalPrice ?? 0}</p>
        </div>
      </div>
    </>
  )
}

export default CapacityAndPriceDisplay;
