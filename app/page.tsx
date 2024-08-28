import Navbar from './ui/components/navbar/navbar';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/components/button';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* navgation */}
      <Navbar />
      {/* product brief */}
      <section className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
        <div className="flex grow justify-center items-center px-20 my-20 ">
        {/* product des */}
          <div className="flex flex-col gap-8 py-12">
        
            <div className="flex flex-col font-sans text-xl text-white md:text-5xl">
              <strong>Imagination Unleashed</strong> 
              <br /><strong>Productivity Focused</strong>
              <br /><span className='flex text-2xl'>Titans helps design and market teams build great content smoothly, together.</span>
            </div>

            <div className='flex'>
              <Link
                href="/login"
                className="flex h-[48px]"
              >
                <Button className='w-full px-12 rounded-full border border-slate-50/[.0] hover:bg-transparent'>
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        {/* product images */}
          <div className="flex grow items-center justify-center">
            <Image
              src="/FemaleAdventurer1.png"
              width={1000}
              height={760}
              className="hidden md:block"
              alt="Screenshots of the dashboard project showing desktop version"
            />
            <Image
              src="/FemaleAdventurer1.png"
              width={560}
              height={620}
              className="block md:hidden"
              alt="Screenshot of the dashboard project showing mobile version"
            />
          </div>

        </div>
      </section>

      <section className=''>
        <div className="flex grow flex-col gap-4 md:flex-row">
          <div className="flex flex-col justify-center gap-6 rounded-lg px-6 py-10 md:w-2/5 md:px-20">
            <p className={`font-sans text-xl text-white md:text-3xl md:leading-normal`}>
              <strong>Creativity, Unleashed</strong> 
              <br />AI-Powered Image
              <br />Creation at scale
            </p>
            <Link
              href="/login"
              className="flex items-center gap-5 self-start rounded-full bg-black-400 bg-opactity-50 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-400 hover:text-blue-600 md:text-base"
            >
              <span>Get started</span>
            </Link>
          </div>
          <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
            {/* Add Hero Images Here */}
            <Image
              src="/treeman.png"
              width={1000}
              height={760}
              className="hidden md:block"
              alt="Screenshots of the dashboard project showing desktop version"
            />
            <Image
              src="/treeman.png"
              width={560}
              height={620}
              className="block md:hidden"
              alt="Screenshot of the dashboard project showing mobile version"
            />
          </div>
        </div>
      </section>

      <section className='bg-gray-600'>
      <div className="flex grow flex-col gap-4 md:flex-row">
          <div className="flex flex-col justify-center gap-6 rounded-lg px-6 py-10 md:w-2/5 md:px-20">
            <p className={`font-sans text-xl text-white md:text-3xl md:leading-normal`}>
              <strong>Creativity, Unleashed</strong> 
              <br />AI-Powered Image
              <br />Creation at scale
            </p>
            <Link
              href="/login"
              className="flex items-center gap-5 self-start rounded-full bg-black-400 bg-opactity-50 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-400 hover:text-blue-600 md:text-base"
            >
              <span>Get started</span>
            </Link>
          </div>
          <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
            {/* Add Hero Images Here */}
            <Image
              src="/FemaleAdventurer1.png"
              width={1000}
              height={760}
              className="hidden md:block"
              alt="Screenshots of the dashboard project showing desktop version"
            />
            <Image
              src="/treeman.png"
              width={560}
              height={620}
              className="block md:hidden"
              alt="Screenshot of the dashboard project showing mobile version"
            />
          </div>
        </div>
      </section>

    </main>
  );
}
