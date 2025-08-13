import { z } from "zod";

export const iranPhoneRegex = /^09\d{9}$/;

export const loginSchema = z.object({
  phone: z
    .string()
    .trim()
    .min(1, "Phone is required")
    .regex(iranPhoneRegex, "Invalid mobile number. Use 11 digits starting with 09."),
});

export type LoginFormValues = z.infer<typeof loginSchema>;


