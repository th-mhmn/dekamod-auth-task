"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.ctas}>
          <Button onClick={() => router.push("/dashboard")}>Go to Dashboard</Button>
          <Button variant="secondary" onClick={() => router.push("/auth")}>Go to Login</Button>
        </div>
      </main>
    </div>
  );
}
