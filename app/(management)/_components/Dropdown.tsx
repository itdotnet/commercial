import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { createCategory, getAllCategories } from "@/lib/actions/category.actions";
import { createCategory as createProductCategory, getAllCategories as getAllProductCategories } from "@/lib/actions/productCategory.actions";
import { ICategory } from "@/lib/database/models/category.model";
import { startTransition, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

type DropDownProps = {
    value?: string;
    type: "blogCategory" | "productCategory";
    onChangeHandler?: () => void;
}

const Dropdown = ({ value, type, onChangeHandler }: DropDownProps) => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [newCategory, setNewCategory] = useState('');

    const handleAddCategory = () => {
        if (type === "blogCategory") {
            createCategory({
                categoryName: newCategory.trim()
            })
            .then((category) => {
                setCategories((prevState) => [...prevState, category])
            })
        }
        else{
            createProductCategory({
                categoryName: newCategory.trim()
            })
            .then((category) => {
                setCategories((prevState) => [...prevState, category])
            })
        }
    }

    useEffect(() => {
        const getCategories = async () => {
            let categoryList;
            if(type==="blogCategory")
                categoryList = await getAllCategories();
            else
                categoryList=await getAllProductCategories();

            categoryList && setCategories(categoryList as ICategory[]);
        }

        getCategories();
    }, [])


    return (
        <Select onValueChange={onChangeHandler} defaultValue={value}>
            <SelectTrigger className="select-field">
                <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
                {categories.map((item) =>
                    <SelectItem className="select-item p-regular-14" key={item._id} value={item._id}>{item.name}</SelectItem>
                )}

                <AlertDialog>
                    <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">Add New Category</AlertDialogTrigger>
                    <AlertDialogContent className="bg-white">
                        <AlertDialogHeader>
                            <AlertDialogTitle>New Category</AlertDialogTitle>
                            <AlertDialogDescription>
                                <Input type="text" placeholder="Category name" className="mt-3" onChange={(e) => setNewCategory(e.target.value)} />
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => startTransition(handleAddCategory)}>Add</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </SelectContent>
        </Select>

    )
}

export default Dropdown