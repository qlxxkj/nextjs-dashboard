'use client'

// components/Carousel.tsx
import React, { useState, useEffect, useRef } from 'react';

type CarouselButton = {
  text: string;
  image: string;
  description: string;
};

type CarouselProps = {
  buttons: CarouselButton[];
  autoPlay?: boolean;
  mouseHoverSwitch?: boolean;
  intervalTime?: number;
  showButtons?: boolean;
  showDescription?: boolean;
  canvasWidth?: number;
  canvasHeight?: number;
  borderRadius?: string; // 支持自定义圆角的 prop
};

const Carousel: React.FC<CarouselProps> = ({
  buttons,
  autoPlay = false,
  mouseHoverSwitch = false,
  intervalTime = 3000,
  showButtons = true,
  showDescription = true,
  canvasWidth = 500,
  canvasHeight = 300,
  borderRadius = '', // 默认圆角
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  // 初始化 canvas 元素的宽度和高度
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = canvasWidth;
      canvasRef.current.height = canvasHeight;
    }
  }, [canvasWidth, canvasHeight]);

  const handleButtonClick = (index: number) => {
    setCurrentIndex(index);
    if (autoPlay && intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
  };

  const startAutoPlay = () =>{
    if (autoPlay) {
      intervalId.current = setInterval(() => {
          const nextIndex = (currentIndex + 1) % buttons.length;
          setCurrentIndex(nextIndex);
      }, intervalTime);
    }
  };

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
        intervalId.current =null;
      }
    };
  }, [autoPlay, intervalTime, buttons.length, currentIndex]);

  const drawCanvas = (imageSrc: string) => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
      img.src = imageSrc;
    }
  };

  useEffect(() => {
    drawCanvas(buttons[currentIndex].image);
  }, [buttons, currentIndex, canvasWidth, canvasHeight]);

  const handleMouseEnter = () => {
    if (mouseHoverSwitch) {
      const nextIndex = (currentIndex + 1) % buttons.length;
      setCurrentIndex(nextIndex);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (mouseHoverSwitch && canvas) {
      canvas.addEventListener('mouseenter', handleMouseEnter);
      return () => {
        canvas.removeEventListener('mouseenter', handleMouseEnter);
      };
    }
  }, [mouseHoverSwitch, currentIndex, buttons.length]);

  return (
    <div className="relative">
      <canvas
        id="myCanvas"
        ref={canvasRef}
        className={`rounded-${borderRadius} w-full h-full bg-slate-50/[0] shadow-[0_0_9.697px_0_rgba(0, 0, 0, 0.16)] transition-all duration-300 delay-150 easy-in-out`}
        style={{ width: canvasWidth, height: canvasHeight }}
      />
      {showButtons && (
        <div className="flex justify-center my-10 gap-3 text-white transition-all duration-300">
          {buttons.map((button, index) => (
            <button
              key={index}
              className={`
                px-5 py-3 rounded-full
                ${
                    index === currentIndex ? 'bg-slate-50/[.3] text-black-400' :
                    'hover:bg-slate-50/[.3] hover:rounded-md hover:transition-all hover:duration-500'
                }
              `}
              onClick={() => handleButtonClick(index)}
            >
              {button.text}
            </button>
          ))}
        </div>
      )}
      {showDescription && (
        <p className="flex justify-center text-white text-2xl" >
          {buttons[currentIndex].description}
        </p>
      )}
    </div>
  );
};

export default Carousel;