import z from "zod";

export const addProductValidationSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters.")
    .max(32, "Title must be at most 32 characters."),
  description: z
    .string()
    .min(5, "Description must be at least 5 characters.")
    .max(32, "Description must be at most 32 characters."),
  price: z.string(),
  category: z
    .string()
    .min(5, "Category must be at least 5 characters.")
    .max(100, "Category must be at most 100 characters."),
  image: z.url(),
});

export type ProductFormValues = z.infer<typeof addProductValidationSchema>;
