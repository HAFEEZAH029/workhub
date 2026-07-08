import Link from "next/link";

export default async function HomeHeroSection() {
  return (
    <section className="relative -mt-24 min-h-[760px] overflow-hidden bg-app-neutral text-white sm:min-h-[720px] lg:min-h-[790px]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/Images/app/Welcome-Image.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/78 via-black/42 to-black/12" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/38 via-transparent to-black/20" />

      <div className="relative z-10 flex min-h-[760px] flex-col sm:min-h-[720px] lg:min-h-[790px]">
        <div className="mx-auto flex w-full max-w-7xl flex-1 items-center px-5 pb-24 pt-44 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-app-secondary">
              Premium coworking
            </p>
            <h1 className="max-w-2xl text-4xl font-bold leading-[1.05] md:leading-[1.2] text-app-tertiary sm:text-6xl lg:text-7xl">
              Your workspace, reimagined for the hybrid era.
            </h1>
            <p className="mt-4 max-w-xl text-lg md:text-2xl leading-7 sm:leading-8 md:leading-9 text-app-secondary sm:text-lg">
              Effortlessly find and book premium coworking spaces designed for
              peak focus and collaboration.
            </p>
            <Link
              href="/workspaces"
              className="mt-9 inline-flex h-12 items-center justify-center rounded-lg bg-app-primary px-6 text-sm font-semibold text-app-tertiary shadow-lg shadow-black/25 transition hover:bg-app-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              Browse Workspaces
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
