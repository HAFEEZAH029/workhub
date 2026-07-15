import Image from "next/image";
import { categoryinfo } from "../../types/category";
import Link from "next/link";

const CategoryInfo = ({
  data,
  title,
  label,
  capacity,
  price_range,
  reverse,
}: categoryinfo) => {
  return (
    <section className="mb-25 overflow-hidden px-5 sm:px-8 lg:px-10">
      <h1 className="mb-18 text-center text-3xl font-bold text-app-primary">
        {title}
      </h1>
      <div
        className={`mt-8 flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-8 ${
          reverse ? "lg:flex-row-reverse" : ""
        }`}
      >
        <div className="flex w-full max-w-[24rem] items-center justify-center gap-3 sm:max-w-[28rem] lg:w-[50%] lg:max-w-none">
          <div
            className="relative aspect-3/4 w-[47%] overflow-hidden rounded-xl shadow-lg ring-1 ring-app-neutral/10 lg:max-w-[280px]"
            style={{ transform: "scale(1.04) translateZ(30rem) rotateZ(-5deg)" }}
          >
            <Image
              src={data?.gallery_image_path}
              alt={data?.name}
              fill
              sizes="(min-width: 1024px) 280px, 47vw"
              className="object-cover"
            />
          </div>

          <div
            className="relative aspect-3/4 w-[47%] overflow-hidden rounded-xl shadow-2xl ring-4 ring-app-tertiary lg:max-w-[280px]"
            style={{ transform: "scale(1.04) translateZ(-10rem) rotateZ(5deg)" }}
          >
            <Image
              src={data?.cover_image_path}
              alt={data?.name}
              fill
              sizes="(min-width: 1024px) 280px, 47vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Text content */}
        <div className="w-full space-y-5 lg:w-[50%]">
          <p className="inline-flex items-center gap-2 font-semibold uppercase text-app-secondary">
            <span className="size-2 shrink-0 rounded-full bg-app-secondary" />
            {label}
          </p>
          <p className="leading-7">{data?.description}</p>
          <ul className="space-y-3.5 rounded-lg bg-app-secondary/10 p-4">
            <li className="flex items-center justify-between">
              <p className="text-app-neutral">Capacity</p>
              <p className="font-bold">{capacity}</p>
            </li>
            <li className="flex items-center justify-between">
              <p className="text-app-neutral">Booking Type</p>
              <p>{data?.booking_type}</p>
            </li>
            <li className="flex items-center justify-between">
              <p className="text-app-neutral">Price Range</p>
              <p className="font-bold text-app-primary">{price_range}</p>
            </li>
          </ul>
          <Link href={`/workspaces/${data?.slug}`} className="block">
            <button className="w-full rounded-lg bg-app-primary py-2.5 font-semibold text-app-tertiary transition-all duration-300 hover:bg-app-primary/80">
              View Workspaces
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryInfo;
