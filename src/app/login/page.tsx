import Image from "next/image";
import LoginForm from "@/components/auth/LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; error_description?: string }>;
}) {
  const { error, error_description } = await searchParams;

  return (
    <main className="grid min-h-svh bg-app-tertiary text-app-neutral md:grid-cols-[minmax(340px,0.95fr)_minmax(420px,1.05fr)] lg:grid-cols-[minmax(520px,1fr)_minmax(560px,1fr)]">
      <section className="hidden min-h-svh flex-col items-center justify-start px-8 py-12 md:flex lg:px-12 lg:py-16">
        <div className="flex min-h-full w-full max-w-[520px] flex-col justify-start space-y-6">
          <div className="space-y-4">
            <h1 className="max-w-lg text-4xl font-semibold leading-tight text-app-primary lg:text-5xl">
              The modern rhythm of{" "}
              <span className="text-app-secondary">workcorp bookings.</span>
            </h1>
            <p className="max-w-md text-base leading-7 text-app-primary">
              Experience precision and comfort in every reservation. Efficiency
              meets hospitality for the premium professional.
            </p>
          </div>

          <div className="relative aspect-[1.18] max-h-[420px] overflow-hidden rounded-lg shadow-[0_24px_70px_rgba(17,24,39,0.16)]">
            <Image
              src="/Images/auth/signin.jpg"
              alt="Modern workspace lounge"
              fill
              priority
              sizes="(min-width: 1024px) 520px, 42vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="flex min-h-svh items-start justify-center px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="flex min-h-full w-full max-w-[500px] flex-col justify-start">
          <p className="mb-4 text-4xl font-semibold text-app-primary">
            Hey, there!
          </p>
          <div className="rounded-lg bg-white px-5 py-7 shadow-[0_18px_55px_rgba(17,24,39,0.12)] ring-1 ring-app-neutral/5 sm:px-8 sm:py-9">
            <div className="mb-7 space-y-2">
              <h2 className="text-3xl font-semibold leading-tight text-app-primary">
                Welcome Back
              </h2>
              <p className="text-sm leading-6 text-app-neutral/65">
                Please enter your credentials to access your workspace.
              </p>
            </div>

            <LoginForm oauthError={error_description ?? error} />
          </div>
        </div>
      </section>
    </main>
  );
}
