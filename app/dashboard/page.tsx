"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../providers";
import Button from "@/components/ui/Button";
import Image from "next/image";
import styles from "./page.module.scss";
import Spinner from "@/components/ui/Spinner";

export default function DashboardPage() {
  const { user, logout, isReady } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isReady) return;
    if (!user) {
      router.replace("/auth");
    }
  }, [user, router, isReady]);

  if (!isReady) return <Spinner fullscreen />;
  if (!user) return null;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {user.avatarUrl ? (
          <Image className={styles.avatar} src={user.avatarUrl} alt="avatar" width={72} height={72} />
        ) : (
          <div className={styles.avatar} aria-hidden />
        )}
        <div>
          <h1 className={styles.title}>Welcome to the Dashboard</h1>
          <p className={styles.subtitle}>Hello {user.firstName} {user.lastName} — you are logged in as {user.email}</p>
        </div>
        <div className={styles.actions}>
          <Button onClick={() => { logout(); router.push("/auth"); }}>Logout</Button>
        </div>
      </div>
    </div>
  );
}


