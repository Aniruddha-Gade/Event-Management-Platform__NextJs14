import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"

import Image from 'next/image'
import NavItems from './NavItems'


const MobileNav = () => {
    return (
        <nav className='md:hidden  '>
            <Sheet>
                <SheetTrigger className='align-middle flex items-center justify-between '>
                    <Image
                        src='/assets/icons/menu.svg'
                        alt='menu'
                        width={24}
                        height={24}
                        className='cursor-pointer'
                    />
                </SheetTrigger>
                <SheetContent className='flex flex-col gap-6 bg-white '>
                    <Image
                        src='/assets/images/logo.png'
                        alt='logo'
                        width={45}
                        height={38}
                        className='cursor-pointer'
                    />

                    <Separator className='border border-gray-50' />
                    <NavItems />

                </SheetContent>
            </Sheet>
        </nav>

    )
}

export default MobileNav;