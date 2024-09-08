import { boolean, z } from "zod"

export const blogFormSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z.string().min(10, 'Description must be at least 3 characters'),
    imageUrl: z.string(),
    metaDescription: z.string().min(3, 'Meta description must be at least 3 characters').max(160, 'Meta description must be less than 160 characters'),
    categoryId: z.string(),
    isActive: boolean(),
    createdAt:z.date().optional(),
    updatedAt:z.date().optional()
})

export const serviceFormSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z.string().min(3, 'Description must be at least 3 characters'),
    imageUrl: z.string(),
    metaDescription: z.string().min(3, 'Meta description must be at least 3 characters').max(160, 'Meta description must be less than 160 characters'),
    isActive: boolean(),
    createdAt:z.date().optional(),
    updatedAt:z.date().optional()
})

export const productFormSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z.string().min(3, 'Description must be at least 3 characters'),
    imageUrl: z.string(),
    metaDescription: z.string().min(3, 'Meta description must be at least 3 characters').max(160, 'Meta description must be less than 160 characters'),
    categoryId: z.string(),
    price:z.number().min(1,'Price must be at least 1$'),
    count:z.number().min(0,'Count must be at least 0'),
    isActive: boolean(),
    createdAt:z.date().optional(),
    updatedAt:z.date().optional()
})