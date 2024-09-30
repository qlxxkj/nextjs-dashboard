import Navbar from './ui/components/navbar/navbar';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/components/button';
import Carousel from './ui/components/Carousel';
import Swiper from './ui/components/swiper';


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
        link: '/login',
        linkName: 'Explore Image',
    },
    {
        text: 'Video',
        image: '/r2.png',
        description: 'Give developers the details they need to build efficiently.',
        link: '/login',
        linkName: 'Explore Video',
    },
    {
        text: 'Vioce',
        image: '/r3.png',
        description: 'Brainstorm, diagram, and visualize your ideas in a shared online whiteboard.',
        link: '/login',
        linkName: 'Explore Vioce',
    },
    {
        text: 'Avatar',
        image: '/r4.png',
        description: 'Co-create and design presentations with advanced editing tools and built-in interactivity.',
        link: '/login',
        linkName: 'Explore Avatar',
    },
    // 可以继续添加更多按钮
  ];
  const button3 = [
    {
      text: 'Genarate image with AI',
      image: '/f1.png',
      description: 'Instantly create image to explore a bigger option space.',
      link: '/login',
      linkName: 'Explore Image',
      subDescription: 'Instantly create image to explore a bigger option space.',
      subLink : '/login',
      subLinkName: 'Lean More',
  },
  {
      text: 'Genarate Video white AI',
      image: '/f2.png',
      description: 'Give developers the details they need to build efficiently.',
      link: '/login',
      linkName: 'Explore Video',
      subDescription: 'Give developers the details they need to build efficiently.',
      subLink : '/login',
  },
  {
      text: 'Convert your text to vioce with AI ',
      image: '/f3.png',
      description: 'Brainstorm, diagram, and visualize your ideas in a shared online whiteboard.',
      link: '/login',
      linkName: 'Explore Vioce',
      subDescription: 'Brainstorm, diagram, and visualize your ideas in a shared online whiteboard.',
      subLink : '/login',
  },
  {
      text: 'Interact with your Avatar everytime',
      image: '/f4.png',
      description: 'Co-create and design presentations with advanced editing tools and built-in interactivity.',
      link: '/login',
      linkName: 'Explore Avatar',
      subDescription: 'Co-create and design presentations with advanced editing tools and built-in interactivity.',
      subLink : '/login',
  },
  {
      text: 'Scale your edits instantly',
      image: '/f5.png',
      description: 'Co-create and design presentations with advanced editing tools and built-in interactivity.',
      link: '/login',
      linkName: 'Explore Avatar',
      subDescription: 'Co-create and design presentations with advanced editing tools and built-in interactivity.',
      subLink : '/login',
  },
  ];
const items = [
  { 
    id: 1, 
    image: '/L1.png',
    title: 'Design systems that scale. ', 
    text: 'Streamline the product development process with a design system that’s aligned across design and code.',
    link: '/login'
},
  { 
    id: 2, 
    image: '/L2.png',
    title: 'Keep design and code connected. ', 
    text: 'Bring your component code into Dev Mode so developers get the right code, every time.',
    link: '/login'
},
  { 
    id: 3, 
    image: '/L3.png', 
    title: 'Focus on the details in Focus View. ',
    text: 'Select and inspect a specific design in Dev Mode, then dig into the details in Focus View so you know exactly what to build.',
    link: '/login'
},
  {
    id: 4, 
    image: '/L4.png', 
    title: 'Track progress with design statuses. ',
    text: 'Stay informed with clear design status updates on what’s changed, completed, or ready to build—all in Dev Mode.',
    link: '/login'
},
  // Add more items as needed
]

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
                className='relative'
              />
            </div>
        </div>

        <div className='relative mx-auto p-4 -mt-80'>
          <Carousel
            buttons={buttons2}
            autoPlay={false}
            mouseHoverSwitch={false}
            showLinks = {true}
            canvasWidth={1540}
            canvasHeight={809}
            className='bg-slate-50/[0] shadow-[0_0_9.697px_0_rgba(0, 0, 0, 0.16)] transition-all duration-300 delay-150 easy-in-out'
            borderRadius='rounded-2xl'
            buttonLayout='flex flex-row justify-center gap-3 my-8 cursor-pointer'
            buttonClassName='text-white px-5 py-3 rounded-full'
            buttonSelected='text-black bg-slate-50/[.3]'
            buttonHover='hover:bg-slate-50/[.3] hover:rounded-md hover:transition-all hover:duration-500'
            descriptionSelected='flex justify-center text-white text-2xl'
            linkClassName='flex justify-center text-white text-2xl my-16 p-2'
           />
        </div>

      </section>

      <section className="block bg-[#CB9FD2] pt-40">
        <div className="pl-40">
          <div className="md:flex-1 grid grid-cols-2 gap-48">
            <div className="font-sans text-5xl ">
              <h2>Redesign how you design.</h2>
              <p>Explore your ideas freely and iterate quickly.</p>
            </div>
          </div>
          <div className='relative mt-20'>
            <Carousel   
              buttons={button3}
              autoPlay = {false}
              mouseHoverSwitch={false}
              showLinks = {false}
              showButtons = {true}
              showDescription = {false}
              showSubDescription = {true}
              canvasWidth={908}
              canvasHeight={726}
              className='flex transition-opacity delay-700 ease-in-out'
              canvasLayout='absolute right-0 bottom-0'
              buttonLayout='flex flex-col mb-40 w-2/5 font-bold cursor-pointer'
              buttonClassName='text-2xl py-8 border-b border-b-current'
              buttonSelected='flex flex-col h-2/5 gap-2'
              subDescriptionStyle='flex flex-col font-light gap-2 '
              subDescriptionClass = 'text-2xl '
              subLinkClass='text-xl underline decoration-0 underline-offset-8'
            />
          </div>
        </div>



      </section>

      <section className='flex flex-col h-auto py-40 px-40 bg-[#F3FFE3] font-sans overflow-hidden'>
 
        <div className="flex justify-center w-4/6">
          <div className="text-6xl ">
            <h2>Bring design and dev together.</h2>
            <p>Easily translate designs into code with a workflow built for developers.</p>
          </div>
        </div>

        <div className="">
          <Swiper 
           items={items}
          />
        </div>
      </section>

      <section className='flex flex-col h-auto py-40 px-40 bg-[#E4FF97] font-sans'>
        <div className="flex w-2/3">
            <div className="text-6xl leading-tight">
              <h2 className='font-medium'>Build better products, together.</h2>
              <p>Everything your team needs to brainstorm, design, and build.</p>
            </div>
        </div>
        <div className='relative my-20'>
            {/* <Carousel
              buttons={buttons2}
              autoPlay={true}
              mouseHoverSwitch={false}
              showLinks = {false}
              showButtons ={false}
              showDescription ={false}
              canvasWidth={1540}
              canvasHeight={809}
              className='bg-slate-50/[0] shadow-[0_0_9.697px_0_rgba(0, 0, 0, 0.16)] transition-all duration-300 delay-150 easy-in-out'
            /> */}
            <video autoPlay loop muted>
              <source src='/find.mp4' type='video/mp4'/>
              Your browser does not support the video tag.
            </video>
        </div>
        <div className='flex flex-row gap-20 text-2xl '>
          <div className="flex w-2/5">     
              <p>
                <b>Create one source of truth.</b>
                Everyone can collaborate seamlessly in one shared file. Designers, developers, copywriters—even external contractors and clients.
              </p>
          </div>
          <div className="flex w-2/5">
              <p>
                <b>Talk. Chat. Comment.</b>
                Communicate via audio or chat to connect quickly within your file. Gather and keep track of feedback with comments.
              </p>
          </div>
        </div>
      </section>
    </main>
  );
}
