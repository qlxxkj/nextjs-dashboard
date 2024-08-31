import Navbar from './ui/components/navbar/navbar';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/components/button';
import Carousel from './ui/components/Carousel';


export default function Page() {

  const buttons1 = [
    {
      text: 'Image',
      image: '/t1.png',
      description: 'Design and refine contents with your team, in one shared design file.',
    },
    {
      text: 'Video',
      image: '/t2.png',
      description: 'Give developers the details they need to build efficiently.',
    },
    {
      text: 'Vioce',
      image: '/t3.png',
      description: 'Brainstorm, diagram, and visualize your ideas in a shared online whiteboard.',
    },
    // {
    //   text: 'Avatar',
    //   image: '/t3.png',
    //   description: 'Co-create and design presentations with advanced editing tools and built-in interactivity.',
    // },
    // 可以继续添加更多按钮
  ];
  const buttons2 = [
    {
      text: 'Image',
      image: '/r1.png',
      description: 'Design and refine contents with your team, in one shared design file.',
    },
    {
      text: 'Video',
      image: '/r2.png',
      description: 'Give developers the details they need to build efficiently.',
    },
    {
      text: 'Vioce',
      image: '/r3.png',
      description: 'Brainstorm, diagram, and visualize your ideas in a shared online whiteboard.',
    },
    {
      text: 'Avatar',
      image: '/r4.png',
      description: 'Co-create and design presentations with advanced editing tools and built-in interactivity.',
    },
    // 可以继续添加更多按钮
  ];


  return (
    <main className="flex min-h-screen flex-col">

      <Navbar />

      <section className='flex flex-col h-auto py-20 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>

        <div className='flex'>
            <div className='flex w-full mt-16 mx-48'>
              <div className="flex flex-col gap-8 py-12">
                <div className="flex flex-col font-sans text-xl text-white md:text-5xl">
                  <strong>Imagination Unleashed</strong>
                  <br /><strong>Productivity Focused</strong>
                  <br /><span className='flex text-2xl'>Titans helps design and market teams build great content, together.</span>
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
            </div>
            <div className='right-0'>
              <Carousel
                buttons={buttons1}
                autoPlay={false}
                mouseHoverSwitch={true}
                canvasWidth={600}
                canvasHeight={825}
                showButtons = {false}
                showDescription = {false}
              />
            </div>
        </div>

        <div className='mx-auto p-4 -mt-80'>
          <Carousel
            buttons={buttons2}
            autoPlay={false}
            mouseHoverSwitch={false}
            canvasWidth={1540}
            canvasHeight={809}
            borderRadius='2xl'
           />
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
