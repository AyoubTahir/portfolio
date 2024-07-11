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

export const registerSchema = {
  body: z.object({
    fname: z.string({
      required_error: "First name is required",
    }).min(3, "First name must be at least 3 characters")
    .max(64, "First name must not be longer than 64 charcters"),
    lname: z.string({
      required_error: "Last name is required",
    }).min(3, "Last name must be at least 3 characters")
    .max(64, "Last name must not be longer than 64 charcters"),
    email: z.string({
      required_error: "Email is required",
    }).email("Not a valid email"),
    password: z.string({
      required_error: "Password is required",
    })
      .min(6, "password must be at least 6 characters")
      .max(64, "password must not be longer than 64 charcters"),
    cpassword: z.string({
      required_error: "Confirm password is required",
    })
  }).refine((data) => data.password === data.cpassword, {
    message: "Passwords don't match",
    path: ["cpassword"],
  }),
};

export type RegisterBody = z.infer<typeof registerSchema.body>;
export type LoginBody = z.infer<typeof loginSchema.body>;