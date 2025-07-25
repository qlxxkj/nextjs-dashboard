import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import TitansLogo from '@/app/ui/titans-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 shadow-[5px_0_10px_-2px_rgba(0,0,0,0.1)] md:shadow-[10px_0_15px_-3px_rgba(0,0,0,0.1)]">
      <Link
        className="mb-2 flex h-48 items-end justify-start rounded-md p-4 md:h-24"
        href="/"
      >
        <div className="w-48 text-black md:w-24">
          <TitansLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
