import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters long").trim(),
  username: z.string().min(3, "Full name must be at least 3 characters long").trim(),
  email: z.string().email("Invalid email address").trim(),
  password: z.string().min(6, "Password must be at least 6 characters long").trim(),
});

export const validateSignUp = (data: {fullName:string, username: string, email: string; password: string }) => {
    return signUpSchema.parse(data);
};

export const logInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const validateLoginIn = (data: {email: string; password: string }) => {
  return logInSchema.parse(data);
};