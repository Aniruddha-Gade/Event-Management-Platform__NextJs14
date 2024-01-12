'use client'

import React from 'react'
import { headerLinks } from '../../constants/index'
import { usePathname } from 'next/navigation'
import Link from 'next/link'



const NavItems = () => {

    const pathname = usePathname()

    return (
        <ul className='flex flex-col items-start md:flex-row md:items-center md:justify-between gap-5  '>
            {
                headerLinks.map((link) => (
                    <li key={link.label}
                     className={`${pathname === link.route ? 'bg-primary-500 text-white ' : 'hover:text-primary-500' } 
                             px-4 py-2 rounded-xl flex justify-center items-center p-medium-16 whitespace-nowrap `}>
                        <Link href={link.route}>
                            {link.label}
                        </Link>
                    </li>

                ))
            }
        </ul>
    )
}

export default NavItems