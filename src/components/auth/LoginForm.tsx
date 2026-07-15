"use client";

import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { login, signInWithGoogleAction } from "@/lib/actions/auth-action";
import { loginSchema, loginInput } from "@/lib/validation/auth";
import { useOAuthErrorMessage } from "@/lib/auth/use-oauth-error-message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm({ oauthError }: { oauthError?: string }) {
  const [formMessage, setFormMessage] = useState<string | null>(
    oauthError ?? null,
  );
  const [hideOAuthError, setHideOAuthError] = useState(false);
  const currentOAuthError = useOAuthErrorMessage(oauthError);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<loginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: loginInput) {
    setHideOAuthError(true);
    setFormMessage(null);

    const response = await login(values);

    if (!response.success) {
      if (response.errors) {
        Object.entries(response.errors).forEach(([field, messages]) => {
          setError(field as keyof loginInput, {
            type: "server",
            message: messages?.[0],
          });
        });
      }

      if (response.message) {
        setFormMessage(response.message);
      }
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {(formMessage || (!hideOAuthError && currentOAuthError)) && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 ring-1 ring-red-100">
            {formMessage ?? currentOAuthError}
          </p>
        )}

        <div className="space-y-4">
          <Label
            htmlFor="email"
            className="flex items-center gap-1.5 text-app-neutral"
          >
            <Mail className="size-4" />
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="name@company.com"
            className="h-12 border-app-neutral/15 bg-white px-4 focus-visible:border-app-primary focus-visible:ring-app-primary/20"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-4">
          <Label
              htmlFor="password"
              className="flex items-center gap-1.5 text-app-neutral"
          >
              <Lock className="size-4" />
              Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="h-12 border-app-neutral/15 bg-white px-4 pr-11 focus-visible:border-app-primary focus-visible:ring-app-primary/20"
              {...register("password")}
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((value) => !value)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-app-neutral/65 hover:text-app-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-primary/30"
            >
              {showPassword ? (
                <EyeOff className="size-5" />
              ) : (
                <Eye className="size-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-12 w-full cursor-pointer bg-app-primary text-white hover:bg-app-primary/90"
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-app-neutral/12" />
        <span className="text-sm text-app-neutral/60">Or continue with</span>
        <div className="h-px flex-1 bg-app-neutral/12" />
      </div>

      <form action={signInWithGoogleAction}>
        <Button
          type="submit"
          variant="outline"
          className="h-12 w-full cursor-pointer border-app-neutral/15 bg-white text-app-neutral hover:bg-app-tertiary"
        >
          <Image
            src="/images/auth/Google icon.png"
            alt=""
            width={20}
            height={20}
            className="size-5"
          />
          <span className="text-sm font-medium">Google</span>
        </Button>
      </form>

      <p className="text-center text-sm text-app-neutral/65">
        Dont have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-app-primary hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
