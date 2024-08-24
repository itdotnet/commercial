import { boolean, z } from "zod"

export const blogFormSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z.string().min(3, 'Description must be at least 3 characters'),
    imageUrl: z.string(),
    metaDescription: z.string().min(3, 'Meta description must be at least 3 characters').max(160, 'Meta description must be less than 160 characters'),
    categoryId: z.string(),
    isActive: boolean(),
    createdAt:z.date().optional(),
    updatedAt:z.date().optional()
})