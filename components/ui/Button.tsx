"use client";

import React from "react";
import styles from "./Button.module.scss";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "link";
};

export default function Button({ variant = "primary", className, ...props }: ButtonProps) {
  const classes = [
    styles.button,
    variant === "secondary" ? styles.secondary : "",
    variant === "link" ? styles.link : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return <button className={classes} {...props} />;
}


