import { z } from "zod";

export const loginSchema = {
  body: z.object({
    email: z.string({
      required_error: "email is required",
    }).email("Not a valid email"),
    password: z.string({
      required_error: "password is required",
    })
      .min(6, "password must be at least 6 characters")
      .max(64, "password must not be longer than 64 charcters"),
  }),
};

export type LoginBody = z.infer<typeof loginSchema.body>;