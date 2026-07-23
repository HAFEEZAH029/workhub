import { ChevronRight, Clock, Users } from "lucide-react";
import Link from "next/link";
import {slugCategory } from "@/types/category";

 type categoryType = {
  data:slugCategory,
  price_range:string,
  capacity: string,
}

const TopInfo = ({data, price_range, capacity }: categoryType) => {
  return (
    <section className="mt-10 mx-auto max-w-304 px-5 sm:px-8 lg:px-5">
      <p className="space-x-2 flex items-center">
        <span className="text-app-primary font-semibold cursor-pointer"><Link href="/workspaces">Workspaces</Link></span>
        <ChevronRight/>
        <span className="text-app-neutral font-bold">{data?.name}</span>
      </p>
      <div className="mt-8 flex flex-col md:flex-row md:items-center justify-center md:justify-between gap-6 md:gap-0">
        <div>
            <h1 className="text-app-primary font-bold text-2xl md:text-3xl">{data?.name}</h1>
            <p className="w-full md:w-[90%] text-app-neutral text-[14px] mt-2"><i>{data?.alt_description}</i></p>
        </div>
        <div className="flex items-center justify-between gap-10">
            <div className="flex items-center justify-between gap-4">
                <Clock />
                <div>
                    <h2 className="mb-1 text-app-neutral font-bold capitalize">{data?.booking_type} Booking</h2>
                    <h3 className="text-app-primary">{price_range}</h3>
                </div>
            </div>
            <div className="flex items-center justify-between gap-4">
                <Users />
                <div>
                    <h2 className="mb-1 text-app-neutral font-bold capitalize">Capacity</h2>
                    <h3 className="text-app-primary">{capacity}</h3>
                </div>
            </div>
        </div>
      </div>
    </section>
  )
}

export default TopInfo
