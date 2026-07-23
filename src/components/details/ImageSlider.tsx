"use client";
import { workspace } from "@/types/workspace";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function ImageSlider({ workspace }: { workspace: workspace }) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const Images = workspace.workspace_images ?? [];

  const nextSlide = () => {
    if (Images.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % Images.length);
  };

  useEffect(() => {
    if (Images.length <= 1) {
      return;
    }

    const AutoPlay = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(AutoPlay);
  }, [Images.length]);

  if (Images.length === 0) {
    return (
      <section className="relative mx-auto flex h-80 max-w-7xl items-center justify-center rounded-2xl bg-gray-100 sm:h-105 lg:h-130">
        <p className="text-gray-400">No images available</p>
      </section>
    );
  }

  return (
    <section className="relative h-80 w-full overflow-hidden rounded-2xl sm:h-105 lg:h-130">
      {Images.map((img, index) => {

        const imageUrl =img.image_path || "/images/workspaces/hot-desks/clover.jpg";

        return (
          <div key={img.id ?? index}>
            <Image
              src={imageUrl}
              alt={img.alt_text ?? `workspace gallery image ${index + 1}`}
              fill
              sizes="(min-width: 1024px) 1024px, 100vw"
              className={`absolute inset-0 rounded-2xl object-cover transition-opacity duration-700 ease-in-out ${
                index === currentIndex ? "z-10 opacity-100" : "z-0 opacity-0"
              }`}
              priority={index === 0}
            />
          </div>
        );
      })}

      {/* Subtle gradient so dots stay visible regardless of image content */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 rounded-b-2xl bg-linear-to-t from-black/35 to-transparent" />

      <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 space-x-2">
        {Images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 w-3 cursor-pointer rounded-full transition-all duration-300 ${
              currentIndex === index
                ? "scale-125 bg-app-secondary"
                : "bg-app-tertiary/70 hover:bg-app-tertiary"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}