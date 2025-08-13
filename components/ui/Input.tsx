"use client";

import React, { forwardRef } from "react";
import styles from "./Input.module.scss";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: string;
  containerClassName?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, id, containerClassName, ...props }, ref) => {
    const inputId = id ?? (label ? label.replace(/\s+/g, "-").toLowerCase() : undefined);
    return (
      <div className={containerClassName}>
        {label ? (
          <label className={styles.label} htmlFor={inputId}>
            {label}
          </label>
        ) : null}
        <input ref={ref} id={inputId} className={styles.input} aria-invalid={!!error} {...props} />
        {error ? <div className={styles.error}>{error}</div> : null}
        {hint ? <div className={styles.hint}>{hint}</div> : null}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;


