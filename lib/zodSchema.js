import { z } from "zod";

export const zSchema = z.object({
  email: z
    .string()
    .email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(100, "Password must be at most 100 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).*$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),

  name: z
    .string()
    .min(2,{message: "Name must be at lest 2 character"})
    .max(50,{message: "Name must be at most 50 character"})
    .regex(/^[A-Za-z\s]+$/, 'Name must contain only letters and spaces'),

});
