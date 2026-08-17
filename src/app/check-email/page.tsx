import { MailCheck } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";

type CheckEmailPageProps = {
  searchParams: Promise<{ email?: string }>;
};

async function CheckEmailContent({
  searchParams,
}: CheckEmailPageProps) {
  const { email } = await searchParams;

  return (
    <main className="flex min-h-svh items-center justify-center bg-app-tertiary px-5 py-10 text-app-neutral sm:px-8">
      <section className="w-full max-w-[480px] rounded-lg bg-white px-6 py-8 text-center shadow-[0_18px_55px_rgba(17,24,39,0.12)] ring-1 ring-app-neutral/5 sm:px-9 sm:py-10">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-green-50 text-green-700 ring-1 ring-green-100">
          <MailCheck className="size-7" />
        </div>

        <div className="mt-6 space-y-3">
          <h1 className="text-2xl font-semibold leading-tight text-app-neutral">
            Check your email
          </h1>
          <p className="text-sm leading-6 text-app-neutral/65">
            We sent a confirmation link
            {email ? (
              <>
                {" "}
                to <span className="font-semibold text-app-neutral">{email}</span>
              </>
            ) : null}
            . Open it to activate your WorkHub account.
          </p>
        </div>

        <Button
          asChild
          className="mt-7 h-11 w-full bg-app-primary text-sm font-semibold text-white hover:bg-app-primary/90"
        >
          <Link href="/login">Back to sign in</Link>
        </Button>
      </section>
    </main>
  );
}

export default function CheckEmailPage({ searchParams }: CheckEmailPageProps) {
  return (
    <Suspense fallback={null}>
      <CheckEmailContent searchParams={searchParams} />
    </Suspense>
  );
}
