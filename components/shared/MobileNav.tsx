import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@radix-ui/react-separator"
import Image from "next/image"
import NavItems from "./NavItems"
import { Button } from "../ui/button"
import Link from "next/link"


const MobileNav = () => {
    return (
        <nav className="lg:hidden">
            <Sheet>
                <SheetTrigger className="align-middle">
                    <Image src="/assets/icons/menu.svg" alt="menu"
                        width="24" height="24" className="cursor-pointer" />
                </SheetTrigger>
                <SheetContent className="flex flex-col gap-6 bg-white lg:hidden">
                    <Image src="/assets/images/logo.svg" alt="logo" width="128" height="38" />
                    <Separator className="border border-gray-50" />
                    <Button asChild size="lg" className='rounded-full'>
                        <Link href="/dashboard">Dashboard</Link>
                    </Button>
                    <NavItems />
                </SheetContent>
            </Sheet>
        </nav>
    )
}

export default MobileNav