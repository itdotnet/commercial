"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { productFormSchema } from "@/lib/validation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FormField, FormItem, FormControl, FormMessage, Form } from "@/components/ui/form"
import Dropdown from "./Dropdown"
import { Textarea } from "@/components/ui/textarea"
import { FileUploader } from "@/components/shared/FileUploader"
import { useRef, useState } from "react"
import { Label } from "@/components/ui/label"
import { useUploadThing } from "@/lib/uploadthing"
import { useRouter } from "next/navigation"
import toast, { Toaster } from 'react-hot-toast';
import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce';
import { IProduct } from "@/lib/database/models/product.model"
import { createProduct, updateProduct } from "@/lib/actions/product.actions"
import { productDefaultValues } from "@/constants"
import Image from "next/image"

type ProductFormProps = {
    userId: string,
    type: "Create" | "Update",
    product?: IProduct,
    productId?: string
}

type AddProductInputType = z.infer<typeof productFormSchema>;
const ProductForm = ({ userId, type, product, productId }: ProductFormProps) => {
    const editorRef = useRef<TinyMCEEditor | null>(null);
    const [files, setFiles] = useState<File[]>([]);
    const initialValues = product && type === 'Update' ?
        {
            ...product,
            createdAt: new Date(product.createdAt),
            updatedAt: new Date(product.updatedAt),
            categoryId: product.category?._id
        } : productDefaultValues;
    const router = useRouter();
    const { startUpload } = useUploadThing('imageUploader');

    const form = useForm<AddProductInputType>({
        resolver: zodResolver(productFormSchema),
        defaultValues: initialValues
    })

    async function onSubmit(values: z.infer<typeof productFormSchema>) {
        let uploadedImageUrl = values.imageUrl;

        if (files.length > 0) {
            const uploadedImages = await startUpload(files);

            if (!uploadedImages)
                return;

            uploadedImageUrl = uploadedImages[0].url;
        }

        if (type === 'Create') {
            try {
                const newProduct = await createProduct({
                    product: { ...values, createdAt: new Date(), imageUrl: uploadedImageUrl },
                    userId,
                    path: '/profile'
                });

                if (newProduct) {
                    form.reset();
                    toast.success('The product has been successfully created!', {
                        duration: 4000,
                        className: 'text-center'
                    });
                    router.push(`/dashboard/product/${newProduct._id}/update`);
                }
            } catch (error) {
                console.log(error);
            }
        }
        else {
            if (!productId) {
                router.back();
                return;
            }

            try {
                const updatedProduct = await updateProduct({
                    userId,
                    product: { ...values, updatedAt: new Date(), _id: productId!, imageUrl: uploadedImageUrl },
                    path: `/dashboard/product/${productId}/update`
                });

                if (updatedProduct) {
                    toast.success('The product has been successfully updated!', {
                        duration: 4000,
                        className: 'text-center'
                    });
                }

            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div className="px-5">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-5 md:flex-row">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Input placeholder="Title" {...field} className="input-field" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl className="h-72">
                                        <Dropdown onChangeHandler={field.onChange} value={field.value} type="productCategory" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-col gap-5 md:flex-row">
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl className="h-72">
                                        <Editor
                                            apiKey='k6phizol048u0brh9q5tx0xp2wcs0sxfp7vp160roa9s3odb'
                                            onInit={(_evt, editor) => editorRef.current = editor}
                                            value={field.value}
                                            onEditorChange={field.onChange}
                                            init={{
                                                height: 500,
                                                plugins: [
                                                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                                ],
                                                toolbar: 'undo redo | blocks | ' +
                                                    'bold italic forecolor | alignleft aligncenter ' +
                                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                                    'removeformat | help',
                                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; }'
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-col gap-5 md:flex-row">
                        <FormField
                            control={form.control}
                            name="metaDescription"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl className="h-72">
                                        <Textarea placeholder="Seo Description" {...field} className="textarea rounded-2xl" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl className="h-72">
                                        <FileUploader onFieldChange={field.onChange} imageUrl={field.value} setFiles={setFiles} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex flex-col gap-5 md:flex-row">
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl className="h-72">
                                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full
                                        bg-grey-50 px-4 py-2">
                                            <Image
                                                src='/assets/icons/dollar.svg'
                                                alt='dollar'
                                                width={24}
                                                height={24}
                                                className="filter-grey"
                                            />

                                            <Input type="number" placeholder="Price" {...field} className="input-field" />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="count"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl className="h-72">
                                        <Input type="number" placeholder="Quantity" {...field} className="input-field" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex flex-col gap-5 md:flex-row">
                        <FormField
                            control={form.control}
                            name="isActive"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Label className="inline-flex items-center mb-5 cursor-pointer">
                                            <span className="me-3 text-sm font-medium text-gray-900 dark:text-gray-300">Active</span>
                                            <input type="checkbox" onChange={field.onChange} checked={field.value} className="sr-only peer" />
                                            <div className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-blue-300 dark:peer-focus:bg-primary-500 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-primary-500"></div>
                                        </Label>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit" size="lg" disabled={form.formState.isSubmitting} className="button col-span-2 w-full">{form.formState.isSubmitting ? 'Submitting...' : `${type} Product`}</Button>
                    <Toaster />
                </form>
            </Form>
        </div >
    )
}

export default ProductForm