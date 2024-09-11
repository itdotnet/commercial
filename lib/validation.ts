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
    description: z.string().min(10, 'Description must be at least 3 characters'),
    imageUrl: z.string(),
    metaDescription: z.string().min(3, 'Meta description must be at least 3 characters').max(160, 'Meta description must be less than 160 characters'),
    isActive: boolean(),
    createdAt:z.date().optional(),
    updatedAt:z.date().optional()
})

export const productFormSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z.string().min(10, 'Description must be at least 3 characters'),
    imageUrl: z.string(),
    metaDescription: z.string().min(3, 'Meta description must be at least 3 characters').max(160, 'Meta description must be less than 160 characters'),
    categoryId: z.string(),
    price:z.coerce.number({invalid_type_error:"Greater than or equal to 1"}).int().gte(1,"Greater than or equal to 1"),
    count:z.coerce.number({invalid_type_error: 'Greater than or equal to 0'}).int().gte(0,"Greater than or equal to 0"),
    isActive: boolean(),
    createdAt:z.date().optional(),
    updatedAt:z.date().optional()
})