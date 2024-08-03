"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { blogFormSchema } from "@/lib/validation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { blogDefaultValues } from "@/constants"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, Form } from "@/components/ui/form"

const BlogForm = () => {
    const initialValues = blogDefaultValues;

    const form = useForm<z.infer<typeof blogFormSchema>>({
        resolver: zodResolver(blogFormSchema),
        defaultValues: initialValues
    })

    function onSubmit(values: z.infer<typeof blogFormSchema>) {
        console.log(values)
    }

    return (
        <div className="px-5">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}

export default BlogForm