'use client';
import { useState, useMemo } from "react";
import { filterConfig } from "@/util/config";
import { Workspace } from "@/types/workspace";
import { ChevronDown, ListFilter } from "lucide-react";
import CategoryList from "./CategoryList";
import LayoutView from "./floor-plan/LayoutView";
import { FloorType, workspacecategory } from "@/types/category";


type MenuProps = {
    currentFilter: string;
    category:string;
    onSelect: (option:string) => void;
    view: string;
    onSetView: (view:string) => void;
}


type FilterProps = {
    currentFilter: string;
    category:string;
    onSelect: (option:string) => void;
}

type SpaceProps = {
    initialWorkspaces: Workspace[],
    category:string
    Category: workspacecategory
}

function TopMenu ({currentFilter, category, onSelect, view, onSetView}: MenuProps) {

    const Filters = filterConfig[category]?.filters;

    return (
      <div className="mb-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-5 text-sm font-bold text-app-neutral/60">
            <button
            onClick={() => onSetView("grid")}
            className={`pb-2 border-b-2 cursor-pointer transition ${view === "grid" ? "border-app-primary text-app-primary" : "border-transparent hover:text-app-primary"}`}
            >
              Grid view
            </button>
            <button
            onClick={() => onSetView("layout")}
            className={`pb-2 border-b-2 cursor-pointer transition ${view === "layout" ? "border-app-primary text-app-primary" : "border-transparent hover:text-app-primary"}`}
            >
              Layout view
            </button>
        </div>
        <div>
            {view !== "layout" && Filters?.length ? (<FilterDropDown currentFilter={currentFilter} category={category} onSelect={onSelect} />) : null }
        </div>
      </div>
    )
}

function FilterDropDown ({currentFilter, category, onSelect}:FilterProps) {

    const filterOptions = filterConfig[category]?.filters;

    return (
        <details className="group relative">
            <summary className="flex h-10 cursor-pointer list-none items-center gap-2 rounded-md border border-app-neutral/15 bg-white px-3 text-sm font-bold text-app-neutral shadow-sm transition hover:border-app-primary/40 [&::-webkit-details-marker]:hidden">
                <ListFilter className="size-4" />
                <span>{currentFilter}</span>
                <ChevronDown className="size-4 transition group-open:rotate-180" />
            </summary>
            <div className="absolute right-0 z-20 mt-2 w-40 overflow-hidden rounded-md bg-white py-1 shadow-xl ring-1 ring-app-neutral/10">
                {filterOptions?.map((option) => {
                   const isActive = currentFilter.toLowerCase() === option.toLowerCase();

                    return (
                      <button
                        key={option}
                        onClick={() => onSelect(option)}
                        className={`block w-full px-4 py-2 text-left text-sm font-semibold transition hover:bg-app-primary/10 ${
                          isActive ? "bg-app-primary text-app-tertiary hover:bg-app-primary" : "text-app-neutral"
                        }`}
                      >
                        {option}
                      </button>
                    )
                })}
            </div>
        </details>
    )
};

const CategoryDisplay = ({initialWorkspaces, category, Category}: SpaceProps) => {

   const [view, setView] = useState("grid");
   const [currentFilter, setCurrentFilter] = useState<string>("All");
   const filterBase = filterConfig[category]?.filterKey;

   const filteredWorkspaces =  useMemo(() => {

    return initialWorkspaces.filter(
        (workspace) => {
            if (currentFilter === "All" || !filterBase) return true;

            const workspaceValue = String(workspace[filterBase]);

            return workspaceValue.toLowerCase() === currentFilter.toLowerCase()
        });

    }, [initialWorkspaces, currentFilter, filterBase]);

    function handleSelect (option:string) {
        setCurrentFilter(option);
    }

  return (
    <section className="mx-auto mt-10 max-w-304 px-5 sm:px-8 lg:px-5">
      <TopMenu currentFilter={currentFilter} category={category} onSelect={handleSelect} view={view}  onSetView={setView} />
      {
        view === "grid" ?  (
       <>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredWorkspaces.map((workspace) => (
          <CategoryList key={workspace.id} workspace={workspace} category={category} />
        ))}
      </div>

      {filteredWorkspaces.length === 0 ? (
      <p className="rounded-lg bg-white px-5 py-10 text-center font-semibold text-app-neutral/70 ring-1 ring-app-neutral/10">
          No workspaces match this filter yet.
      </p>
      ) : null
      }
     </>
        ) : (<LayoutView category= {category as FloorType} Workspaces={initialWorkspaces} Category={Category}/>)
      }
    </section>
  )
}

export default CategoryDisplay;
