"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../providers";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import styles from "./page.module.scss";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormValues, loginSchema } from "@/lib/validation/auth";

export default function AuthPage() {
  const { login, user, isReady, logout } = useAuth();
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async () => {
    setFormError(null);
    try {
      setIsRedirecting(true);
      await login();
      router.replace("/dashboard");
    } catch (err) {
      setFormError((err as Error).message || "Login failed");
      setIsRedirecting(false);
    }
  };

  if (!isReady) return <Spinner fullscreen />;
  if (isRedirecting) return <Spinner fullscreen />;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {user ? (
          <div className={styles.actions}>
            <h1 className={styles.title}>You&apos;re already logged in</h1>
            <p className={styles.subtitle}>Proceed to your dashboard or switch account.</p>
            <div>
              <Button onClick={() => router.push("/dashboard")}>Go to Dashboard</Button>
            </div>
            <div>
              <Button
                variant="link"
                onClick={() => {
                  logout();
                }}
              >
                Login using another account
              </Button>
            </div>
          </div>
        ) : (
          <>
            <h1 className={styles.title}>Welcome back</h1>
            <p className={styles.subtitle}>Sign in to continue</p>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.actions} noValidate>
              <Input
                label="Mobile Number"
                placeholder="09xxxxxxxxx"
                inputMode="numeric"
                maxLength={11}
                {...register("phone")}
                error={errors.phone?.message}
              />
              {formError ? <div className={styles.error}>{formError}</div> : null}
              <Button type="submit" disabled={isSubmitting || !isReady}>
                {isSubmitting ? "Signing in..." : "Login"}
              </Button>
              <Button type="button" variant="secondary" onClick={() => router.push("/")}>Back to Home</Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}


