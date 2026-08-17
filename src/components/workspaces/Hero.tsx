'use client';
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {

    return(
        <section className="relative mt-2 mb-20 flex h-screen w-full flex-col items-center justify-center overflow-hidden px-5 text-center md:justify-start md:py-28">
           <Image
            src="/images/app/Hero-mobile.jpg"
            alt="Hero Image"
            fill
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
            className="object-cover object-center"
           />


            <div className="absolute inset-0 bg-linear-to-t from-app-primary/35 to-transparent" />
            <div className="bg-linear-to-r from-transparent via-app-tertiary/30 to-transparent xsm:-mt-20 msm:-mt-50 sm:mt-0 md:mt-45 lg:mt-19 xl:mt-0 py-6 flex flex-col items-center justify-center gap-2 w-[90%] h-fit rounded-lg ">
              <motion.h1
              initial={{opacity:0, y:-50}}
              animate={{opacity:1, y:0}}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 10,
                delay: 0.4
              }}
              className="relative z-10 text-4xl font-bold text-app-neutral leading-12 md:leading-17 sm:text-5xl md:w-[55%] lg:text-6xl">
                Elevate your <i className="text-app-primary">Workflow</i> in Luxury
              </motion.h1>
              <motion.p
              initial={{opacity:0, y:50}}
              animate={{opacity:1, y:0}}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 10,
                delay: 0.6
              }}
              className="relative z-10 mt-2 text-lg font-semibold leading-8 text-app-neutral sm:text-xl md:w-[70%]">
                Discover a curated selection of workspace environments
                designed for peak productivity and professional excellence.
              </motion.p>
            </div>
        </section>
    )


};
