'use client'

// Swiper.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

type SwiperItem = {
  id: number;
  image: string;
  title: string;
  text: string;
  link: string;
};

type SwiperProps = {
  items: SwiperItem[];
  itemWidth?: number; // 允许自定义每个项目的宽度
};

const Swiper: React.FC<SwiperProps> = ({items, itemWidth=300}) => {
 
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0); // 用于控制轮播的偏移量

  const goToPrevSlide = () => {
    
    if (activeIndex > 0) {
      setActiveIndex((prevIndex) => prevIndex - 1);
      setTranslateX((prevTranslate) => Math.min(0, prevTranslate + itemWidth));
    } 
    if (activeIndex === 2) {
      
      setTranslateX((prevTranslate) => Math.min(0, prevTranslate + itemWidth * 1.25));
    }
  };

  const goToNextSlide = () => {
    
    if (activeIndex < items.length - 1) {
      setActiveIndex((prevIndex) => prevIndex + 1);
      setTranslateX((prevTranslate) => Math.max(-items.length * itemWidth, prevTranslate - itemWidth));
    }
    if (activeIndex === 1) {
      
      setTranslateX((prevTranslate) => Math.max(-items.length * itemWidth, prevTranslate - itemWidth * 1.25));
    }
  };


  return (
    <div className="relative ">

      <div className='flex flex-row justify-between items-center my-5'>
          <div className='text-xl'>
              <p>{activeIndex + 1}/{items.length}</p> 
          </div>
          <div className='flex flex-row gap-3'>
              <button onClick={goToPrevSlide} 
              className={`
                ${
                activeIndex === 0 ? 'disabled: bg-black-600/[0] border border-[rgb(0,0,0,0.08)]':'bg-black-600/[.2] hover:bg-black-600 hover:text-white'
                } 
                flex justify-center items-center rounded-full w-[3rem] h-[3rem]
              `}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M11.478 4.25 4 12l7.478 7.75.733-.709L5.91 12.51H20v-1.02H5.91l6.301-6.531z" clip-rule="evenodd"></path></svg>
              </button>
              <button onClick={goToNextSlide} 
              className={`
                ${
                activeIndex === items.length -1 ? 'bg-black-600/[0] border border-[rgb(0,0,0,0.08)]':'bg-black-600/[.2]  hover:bg-black-600 hover:text-white'
                } 
                flex justify-center items-center rounded-full w-[3rem] h-[3rem]
              `}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M12.522 4.25 20 12l-7.478 7.75-.733-.709 6.302-6.531H4v-1.02h14.09L11.79 4.959z" clip-rule="evenodd"></path></svg>
              </button>
          </div>
      </div>
      <div className="flex gap-8" ref={containerRef}
              style={{
                transition: 'transform 0.5s ease-in-out',
                transform: `translateX(${translateX}px)`,
                width: `${items.length * itemWidth * 2.5}px`, // 设置wrapper的宽度
              }}
      >
        {items.map((item) => (
          <div key={item.id} className='flex flex-col items-center gap-8 w-[700px]' >
              <img src={item.image} alt={item.text} width={700} height={467} />
              <div className='text-2xl'>
                <h3 className='font-semibold'>{item.title}</h3>
                <p className='mb-10'>{item.text}</p>
                <Link href={item.link} className='text-xl'>Read more</Link>
              </div>
          </div> 
        ))}
      </div>
    </div>
  );
};

export default Swiper;