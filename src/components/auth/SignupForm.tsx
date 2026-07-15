"use client";

import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signInWithGoogleAction,
  signupAction,
} from "@/lib/actions/auth-action";
import { signUpSchema, type signUpInput } from "@/lib/validation/auth";
import { useOAuthErrorMessage } from "@/lib/auth/use-oauth-error-message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupForm({ oauthError }: { oauthError?: string }) {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(oauthError ?? null);
  const [hideOAuthError, setHideOAuthError] = useState(false);
  const currentOAuthError = useOAuthErrorMessage(oauthError);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<signUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      termsAccepted: false,
    },
  });

  async function onSubmit(values: signUpInput) {
    setHideOAuthError(true);
    setFormError(null);

    const response = await signupAction(values);

    if (!response.success) {
      if (response.errors) {
        Object.entries(response.errors).forEach(([field, messages]) => {
          setError(field as keyof signUpInput, {
            type: "server",
            message: messages?.[0],
          });
        });
      }

      if (response.message) {
        setFormError(response.message);
      }

      return;
    }

    if (response.data?.redirectTo) {
      router.push(response.data.redirectTo);
    }
  }

  return (
    <div className="space-y-5">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {(formError || (!hideOAuthError && currentOAuthError)) && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 ring-1 ring-red-100">
            {formError ?? currentOAuthError}
          </p>
        )}

        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-xs font-semibold text-app-neutral">
            Full Name
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-app-neutral/35" />
            <Input
              id="fullName"
              placeholder="Alex Rivera"
              className="h-10 border-app-neutral/15 bg-white pl-9 pr-3 text-sm focus-visible:border-app-primary focus-visible:ring-app-primary/20"
              {...register("fullName")}
            />
          </div>
          {errors.fullName && (
            <p className="text-sm text-red-600">{errors.fullName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-xs font-semibold text-app-neutral">
            Work Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-app-neutral/35" />
            <Input
              id="email"
              type="email"
              placeholder="name@company.com"
              className="h-10 border-app-neutral/15 bg-white pl-9 pr-3 text-sm focus-visible:border-app-primary focus-visible:ring-app-primary/20"
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-xs font-semibold text-app-neutral">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-app-neutral/35" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Min. 8 characters"
              className="h-10 border-app-neutral/15 bg-white pl-9 pr-10 text-sm focus-visible:border-app-primary focus-visible:ring-app-primary/20"
              {...register("password")}
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((value) => !value)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-app-neutral/55 hover:text-app-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-primary/30"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        <label
          htmlFor="termsAccepted"
          className="flex items-center gap-2 text-[11px] font-semibold leading-5 text-app-neutral/60"
        >
          <input
            id="termsAccepted"
            type="checkbox"
            className="size-3.5 rounded border-app-neutral/20 accent-app-primary"
            {...register("termsAccepted")}
          />
          <span>
            I agree to the Terms of Service and Privacy Policy.
          </span>
        </label>
        {errors.termsAccepted && (
          <p className="text-sm text-red-600">{errors.termsAccepted.message}</p>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-11 w-full cursor-pointer bg-app-primary text-sm font-semibold text-white hover:bg-app-primary/90"
        >
          {isSubmitting ? "Creating account..." : "Create Account"}
        </Button>
      </form>

      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-app-neutral/10" />
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-app-neutral/45">
          Or continue with
        </span>
        <div className="h-px flex-1 bg-app-neutral/10" />
      </div>

      <form action={signInWithGoogleAction}>
        <Button
          type="submit"
          variant="outline"
          className="h-10 w-full cursor-pointer border-app-neutral/15 bg-white text-sm font-medium text-app-neutral hover:bg-app-tertiary"
        >
          <Image
            src="/images/auth/Google icon.png"
            alt=""
            width={16}
            height={16}
            className="size-4"
          />
          Google
        </Button>
      </form>

      <p className="text-center text-sm text-app-neutral/65">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-app-secondary hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
