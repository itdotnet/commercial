import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type DropDownProps={
    value?:string;
    onChangeHandler?:()=>void;
}

const Dropdown = ({value,onChangeHandler}:DropDownProps) => {
    return (
        <Select onValueChange={onChangeHandler} defaultValue={value}>
            <SelectTrigger className="select-field">
                <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem className="select-item p-regular-14" value="light">Light</SelectItem>
                <SelectItem className="select-item p-regular-14" value="dark">Dark</SelectItem>
                <SelectItem className="select-item p-regular-14" value="system">System</SelectItem>
            </SelectContent>
        </Select>

    )
}

export default Dropdown