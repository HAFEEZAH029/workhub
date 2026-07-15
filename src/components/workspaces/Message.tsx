import Image from "next/image";
import Link from "next/link";

const Message = () => {
  return (
    <section className="relative overflow-hidden bg-app-primary mb-20 text-app-tertiary text-center py-20 flex flex-col items-center justify-center gap-5">
      <Image src="/BG.svg" alt="" aria-hidden width={380} height={380} className="absolute left-1/2 top-0 z-0 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/3 object-cover sm:left-0 sm:translate-x-0" />
      <h1 className="relative z-10 text-3xl sm:text-5xl">Workspaces designed for your <i className="font-bold text-app-secondary">comfort</i></h1>
      <p className="relative z-10 w-[80%] sm:w-[50%] sm:text-xl">Let&apos;s take the burden off your shoulders and create a space where you can focus on what matters most.</p>
      <Link href="/workspaces" className="relative z-10">
        <button className="cursor-pointer rounded-lg bg-app-secondary p-2.5 font-semibold text-app-tertiary transition-all duration-300 hover:bg-app-secondary/50">
          Book a desk today
        </button>
      </Link>
      <Image src="/BG.svg" alt="" aria-hidden width={200} height={200} className="absolute right-0 bottom-0 z-0 h-50 w-50 object-cover opacity-0 sm:opacity-100" />
    </section>
  )
}

export default Message
