import { GlobeAltIcon } from '@heroicons/react/24/outline';
import Link from "next/link";
import Image from 'next/image';

export default function TitansLogo() {
  return (
      <Link href='/#' className='flex justify-center items-center'>
          <Image
          className='rounded-full' 
          src="/logo.png" 
          alt="logo" 
          width={1024}
          height={1024}
          />  
      </Link>
  );
}
