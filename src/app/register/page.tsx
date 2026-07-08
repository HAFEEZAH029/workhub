import { BadgeCheck, Zap } from "lucide-react";
import SignupForm from "@/components/auth/SignupForm";

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; error_description?: string }>;
}) {
  const { error, error_description } = await searchParams;

  return (
    <main className="flex min-h-svh items-center justify-center bg-app-tertiary px-5 py-8 text-app-neutral sm:px-8">
      <div className="grid w-full max-w-[1060px] overflow-hidden rounded-lg bg-white shadow-[0_22px_70px_rgba(17,24,39,0.10)] ring-1 ring-app-neutral/5 md:min-h-[640px] md:grid-cols-[0.92fr_1fr] lg:min-h-[680px]">
        <section className="hidden flex-col justify-between bg-app-primary px-9 py-10 text-white md:flex lg:px-11 lg:py-12">
          <div className="max-w-[360px] space-y-5">
            <h1 className="text-3xl font-semibold leading-tight lg:text-4xl">
              Elevate your workspace experience.
            </h1>
            <p className="text-sm font-semibold leading-6 text-app-secondary">
              Join over 5,000 professionals who use WorkHub to find and book
              premium workspaces with effortless precision.
            </p>
          </div>

          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <BadgeCheck className="mt-0.5 size-5 shrink-0 text-app-secondary" />
              <div>
                <p className="text-sm font-semibold">Verified Workspaces</p>
                <p className="mt-0.5 text-xs font-medium text-white/72">
                  Curated high-end environments only.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Zap className="mt-0.5 size-5 shrink-0 fill-app-secondary text-app-secondary" />
              <div>
                <p className="text-sm font-semibold">Instant Booking</p>
                <p className="mt-0.5 text-xs font-medium text-white/72">
                  Real-time availability, zero lag.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center px-5 py-8 sm:px-8 md:px-10 lg:px-14">
          <div className="w-full max-w-[420px]">
            <div className="mb-6 space-y-1.5">
              <p className="text-4xl font-semibold text-app-primary">
                Welcome to Workcorp!
              </p>
              <h2 className="text-2xl font-semibold leading-tight text-app-neutral">
                Create your account
              </h2>
              <p className="text-xs font-semibold text-app-neutral/50">
                Book verified workspaces faster and manage every reservation
                from one account.
              </p>
            </div>

            <SignupForm oauthError={error_description ?? error} />
          </div>
        </section>
      </div>
    </main>
  );
}
