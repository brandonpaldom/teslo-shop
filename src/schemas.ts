import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const registerBaseSchema = z.object({
  name: z
    .string()
    .min(3, "Minimum 3 characters")
    .max(50, "Maximum 50 characters")
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Invalid name"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "At least 6 characters"),
  // .regex(/[A-Z]/, "At least one uppercase letter")
  // .regex(/[0-9]/, "At least one number"),
  confirmPassword: z.string(),
});

export const registerSchema = registerBaseSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  },
);

export const addressSchema = z.object({
  firstName: z.string().min(2, "Minimum 2 characters"),
  lastName: z.string().min(2, "Minimum 2 characters"),
  address: z.string().min(5, "Minimum 5 characters"),
  apartment: z.string().optional(),
  zipCode: z.string().min(5, "Minimum 5 characters"),
  city: z.string().min(2, "Minimum 2 characters"),
  state: z.string().min(2, "Minimum 2 characters"),
  country: z.string().min(2, "Minimum 2 characters"),
  phone: z.string().min(10, "Minimum 10 characters"),
  saveAddress: z.boolean(),
});

export const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  name: z.string().min(3, "Minimum 3 characters"),
  slug: z
    .string()
    .min(3, "Minimum 3 characters")
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Invalid slug format")
    .transform((val) => val.toLowerCase()),
  description: z.string().min(10, "Minimum 10 characters"),
  price: z.coerce.number().min(0, "Price cannot be negative"),
  stock: z.coerce.number().min(0, "Stock cannot be negative"),
  tags: z.string().optional(),
  gender: z.enum(["men", "women", "kids"]),
  size: z.coerce.string().transform((val) => val.split(",")),
  categoryId: z.string().min(1, "Category is required"),
  images: z.any().optional(),
});

export type LoginData = z.infer<typeof loginSchema>;
export type RegisterData = z.infer<typeof registerSchema>;
export type AddressData = z.infer<typeof addressSchema>;
export type ProductData = z.infer<typeof productSchema>;
