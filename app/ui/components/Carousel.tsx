'use client'

// components/Carousel.tsx
import React, { useState, useEffect, useRef } from 'react';

type CarouselButton = {
  text: string;
  image: string;
  description: string;
  link?: string;
  linkName?: string;
};

type CarouselProps = {
  buttons: CarouselButton[];
  autoPlay?: boolean;
  mouseHoverSwitch?: boolean;
  intervalTime?: number;
  showButtons?: boolean;
  showDescription?: boolean;
  showLinks?: boolean;
  showArrows?: boolean;
  showDots?: boolean;
  canvasWidth?: number;
  canvasHeight?: number;
  borderRadius?: string; // 支持自定义圆角的 prop
  className?: string;
  buttonClassName?: string;
  descriptionClassName?: string;
  linkClassName?: string;
  arrowClassName?: string;
  dotClassName?: string;
};

const Carousel: React.FC<CarouselProps> = ({
  buttons,
  autoPlay = false,
  mouseHoverSwitch = false,
  intervalTime = 3000,
  showButtons = true,
  showDescription = true,
  showLinks = false,
  showArrows = false,
  showDots = false,
  canvasWidth = 500,
  canvasHeight = 300,
  borderRadius = '', // 默认圆角
  className = '',
  buttonClassName = '',
  descriptionClassName = '',
  linkClassName = '',
  arrowClassName = '',
  dotClassName = '',
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

  // 点击按钮切换幻灯片
  const handleButtonClick = (index: number) => {
    setCurrentIndex(index);
    if (autoPlay && intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
  };

  // 间隔一定时间，自动播放幻灯片
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

  // 鼠标移入时切换下一页
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

// 点击箭头，切换前一页
  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + buttons.length) % buttons.length;
    setCurrentIndex(prevIndex);
  };

// 点击箭头，切换下一页
  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % buttons.length;
    setCurrentIndex(nextIndex);
  };

  return (
    <div className={`${className}`}>
      <canvas
        id="myCanvas"
        ref={canvasRef}
        className={`${borderRadius}`}
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
        {showLinks && (
              <a
                  href={buttons[currentIndex].link || '#'}
                  className={`${linkClassName }`}
              >
                  {buttons[currentIndex].linkName}
              </a>
        )}
    </div>
  );
};

export default Carousel;