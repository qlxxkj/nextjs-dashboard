'use client'

// components/Carousel.tsx
import React, { useState, useEffect, useRef } from 'react';

type CarouselButton = {
  text: string;
  image: string;
  description: string;
  link?: string;
  linkName?: string;
  subDescription?: string;
  subLink?: string;
  subLinkName?: string;
};

type CarouselProps = {
  buttons: CarouselButton[];
  autoPlay?: boolean;
  mouseHoverSwitch?: boolean;
  intervalTime?: number;
  showButtons?: boolean;
  showDescription?: boolean;
  showSubDescription?: boolean;
  showSubLink?: boolean;
  showLinks?: boolean;
  showArrows?: boolean;
  showDots?: boolean;
  canvasWidth?: number;
  canvasHeight?: number;
  borderRadius?: string; // 支持自定义圆角的 prop
  className?: string;
  canvasClassName?: string;
  canvasLayout?: string;
  buttonClassName?: string;
  buttonLayout?: string;
  buttonSelected?:string;
  buttonHover?:string;
  descriptionClassName?: string;
  descriptionLayout?: string;
  descriptionSelected?: string;
  descriptionHover?: string;
  linkClassName?: string;
  arrowClassName?: string;
  dotClassName?: string;
  subDescriptionStyle?: string;
  subDescriptionClass?: string;
  subLinkClass?: string;
  
};

const Carousel: React.FC<CarouselProps> = ({
  buttons,
  autoPlay = false,
  mouseHoverSwitch = false,
  intervalTime = 3000,
  showButtons = true,
  showDescription = true,
  showLinks = false,
  showSubDescription = false,
  showSubLink = false,
  showArrows = false,
  showDots = false,
  canvasWidth = 500,
  canvasHeight = 300,
  borderRadius = '', // 默认圆角
  className = '',
  canvasClassName = '',
  canvasLayout = '',
  buttonClassName = '',
  buttonLayout = '',
  buttonSelected = '',
  buttonHover = '',
  descriptionClassName = '',
  descriptionLayout = '',
  descriptionSelected = '',
  descriptionHover = '',
  linkClassName = '',
  arrowClassName = '',
  dotClassName = '',
  subDescriptionStyle = '',
  subDescriptionClass = '',
  subLinkClass = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const canvasRefs = useRef<Array<HTMLCanvasElement | null>>(buttons.map(() => null));
  const intervalId = useRef<NodeJS.Timeout | null>(null);
  const delayRef = useRef<number | null>(null);

  // 初始化 canvas 元素的宽度和高度
  useEffect(() => {
    canvasRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.width = canvasWidth;
        ref.height = canvasHeight;
      }
    });
  }, [canvasWidth, canvasHeight]);

  // 点击按钮切换幻灯片
  const handleButtonClick = (index: number) => {
    setCurrentIndex(index);
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
    startAutoPlay();
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

  const drawCanvas = (imageSrc: string, index: number) => {
    const ctx = canvasRefs.current[index]?.getContext('2d');
    if (ctx) {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
      img.src = imageSrc;
    }
  };

  useEffect(() => {
    buttons.forEach((button, index) => {
      drawCanvas(button.image, index);
    });
  }, [buttons, canvasWidth, canvasHeight]);

  useEffect(() => {
    drawCanvas(buttons[currentIndex].image, currentIndex);
  }, [buttons, currentIndex, canvasWidth, canvasHeight]);


  // 鼠标移入时切换下一页
  const handleMouseEnter = () => {
    if (mouseHoverSwitch) {
      if (delayRef.current) {
        clearTimeout(delayRef.current);
        delayRef.current = null;
      }
      delayRef.current = window.setTimeout(() => {
        const nextIndex = (currentIndex + 1) % buttons.length;
        setCurrentIndex(nextIndex);
      }, 500); // 延迟500毫秒
    }
  };

  // useEffect(() => {
  //   const canvas = canvasRefs.current;
  //   if (mouseHoverSwitch && canvas) {
  //     canvas.addEventListener('mouseenter', handleMouseEnter);
  //     return () => {
  //       canvas.removeEventListener('mouseenter', handleMouseEnter);
  //     };
  //   }
  // }, [mouseHoverSwitch, currentIndex, buttons.length]);

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
      <div className={`${canvasLayout}`}>
      {buttons.map((button, index) => (
        <canvas
          key={index}
          ref={el => { canvasRefs.current[index] = el; }}
          className={`${canvasClassName} ${borderRadius} ${currentIndex === index ? 'block' : 'hidden'}`}
          width={canvasWidth}
          height={canvasHeight}
          onMouseEnter={handleMouseEnter}
        />
      ))}
      </div>
      
      {showButtons && (
        <div className={`${buttonLayout}`}>
          {buttons.map((button, index) => (
            <div
              key={index}
              className={`
                ${buttonClassName}
                ${
                    index === currentIndex ? buttonSelected :
                    buttonHover
                }
              `}
              onClick={() => handleButtonClick(index)}
            >
              {button.text}
              { showSubDescription && 
                (index === currentIndex) && (
                  <div className={`${subDescriptionStyle}`}>
                    <div>
                      <p className={`${subDescriptionClass}`}>
                        {button.subDescription}
                      </p>
                    </div>
                    <div>
                      <a href={button.subLink}
                        className={`${subLinkClass}`}
                      >
                        {button.subLinkName}
                      </a>
                    </div>
                  </div>
                )}
            </div>
          ))}
        </div>
      )}
      {showDescription && (
        <div className={`
          ${ descriptionLayout }
          ${
            buttons[currentIndex] ? descriptionSelected :
            descriptionClassName
          }
          `} >
          <p>{buttons[currentIndex].description}</p>
        </div>
        )}
        {showLinks && (
          <div className={`${linkClassName }`}>
              <a
                  href={buttons[currentIndex].link || '#'}
              >
                  {buttons[currentIndex].linkName}
              </a>
          </div>

        )}
    </div>
  );
};

export default Carousel;