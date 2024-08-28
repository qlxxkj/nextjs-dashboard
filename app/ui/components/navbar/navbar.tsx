'use client'

import Link from "next/link";
import NavbarLinks from "./navbar-links";
import TitansLogo from "../../titans-logo";
import React, {useState, useEffect} from "react";
import { Button } from "../button";

const Navbar: React.FC = () => {
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        // 根据滚动位置设置isSticky状态
        setIsSticky(window.scrollY > 0);
      };
  
      // 添加滚动监听器
      window.addEventListener('scroll', handleScroll);
  
      // 组件卸载时移除监听器
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []); // 空依赖数组表示只在组件挂载时执行

      return (
        <nav className={`flex fixed w-full z-10 top-0 transition-all duration-300 ease-in-out 
            ${isSticky ? 'bg-black-400 bg-opacity-50' : 'bg-transparent'} backdrop-blur-lg`}>
                 <div className=" mx-auto p-4 sm:px-10">
                    <div className="flex justify-center justify-between text-white font-sans">
                        
                        <div className="flex h-[48px] w-[48px] mr-5">
                            <TitansLogo />
                         </div>

                         <div className="flex">
                            <NavbarLinks />
                         </div>
                        
                         {/* <Link
                            href='/login' 
                            className="flex h-[48px] mx-5 px-5 items-center justify-center rounded-full bg-white/[.15] border border-slate-50/[.15] hover:bg-white hover:text-black-600"
                        >
                            <span>Launch App</span>
                        </Link> */}
                        <Link href="/login" className="flex h-[48px] mx-5 justify-center ">
                          <Button className='w-full rounded-full px-4 text-sm font-medium text-white transition-colors hover:bg-white/[0] hover:text-black-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:bg-white aria-disabled:cursor-not-allowed aria-disabled:opacity-50'>
                            Launch App
                          </Button>
                        </Link>

                    </div>
                </div>
            </nav>
      );
};

export default Navbar;