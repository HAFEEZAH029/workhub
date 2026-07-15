
export default function Hero() {

    return(
        <section className="relative mt-2 mb-20 flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-[url('/images/app/Hero-mobile.jpg')] bg-cover bg-center px-5 text-center sm:bg-[url('/images/app/Hero-tablet.jpg')] md:justify-start md:py-28 lg:bg-[url('/images/app/Hero.jpg')]">
            <div className="absolute inset-0 bg-linear-to-t from-app-primary/35 to-transparent" />
            <div className="bg-linear-to-r from-transparent via-app-tertiary/30 to-transparent -mt-50 sm:mt-0 md:mt-45 lg:mt-10 xl:mt-0 py-6 flex flex-col items-center justify-center gap-2 w-[90%] h-fit rounded-lg ">
              <h1 className="relative z-10 text-4xl font-bold text-app-neutral leading-12 md:leading-17 sm:text-5xl md:w-[55%] lg:text-6xl">
                Elevate your <i className="text-app-primary">Workflow</i> in Luxury
              </h1>
              <p className="relative z-10 mt-2 text-lg font-semibold leading-8 text-app-neutral sm:text-xl md:w-[70%]">
                Discover a curated selection of workspace environments
                designed for peak productivity and professional excellence.
              </p>
            </div>
        </section>
    )


};
