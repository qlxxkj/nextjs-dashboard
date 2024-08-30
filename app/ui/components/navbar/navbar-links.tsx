'use client';

import Link from 'next/link';
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
    {name: 'Products', href: '/'},
    {name: 'Solutions', href: '/'},
    {name: 'Resources', href: '/'},
    {name: 'Community', href: '/'},
    {name: 'Pricing', href: '/'},
    {name: 'Contact', href: '/'},
]

export default function NavbarLinks(){
    const pathname = usePathname();

    return (
        <>
            {links.map((link) => {
                return (
                    <Link
                     key={link.name}
                     href={link.href}
                     className={clsx(
                        'flex h-[48px] grow items-center justify-center gap-2 rounded-md mx-5 p-3 text-sm font-medium hover:bg-slate-50/[.3] hover:rounded-md hover:text-black-600 hover:transition-all hover:duration-300 md:flex-none md:justify-start md:p-2 md:px-3',
                        {
                            'text-white': pathname === link.href,
                        },
                     )}
                    >
                        <p className='hidden md:block'>{link.name}</p>
                    </Link>
                );
            })}
        </>
    );
}