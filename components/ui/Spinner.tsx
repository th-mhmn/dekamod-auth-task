"use client";

import React from "react";
import styles from "./Spinner.module.scss";

type SpinnerProps = {
  fullscreen?: boolean;
};

export default function Spinner({ fullscreen = false }: SpinnerProps) {
  return (
    <div className={[styles.wrapper, fullscreen ? styles.fullscreen : ""].filter(Boolean).join(" ")}> 
      <div className={styles.spinner} aria-label="Loading" />
    </div>
  );
}


