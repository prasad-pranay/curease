import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
// replace icons with your own if needed
import { FiCircle, FiCode, FiFileText, FiLayers, FiLayout } from 'react-icons/fi';
import { Copy } from 'lucide-react';
import toast from 'react-hot-toast';

const DEFAULT_ITEMS = [
  {
    title: 'Flat 20% Off on All Medicines',
    description: 'Get instant 20% off on prescription and OTC medicines. Stay healthy while saving more on your monthly healthcare needs.',
    id: 1,
    code:"FLAT20",
    icon: <FiFileText className="h-[16px] w-[16px] text-white" />
  },
  {
    title: 'Free Doctor Consultation on Orders Above ₹999',
    description: 'Book your medicine and get a free online doctor consultation. Valid for new users once per month.',
    id: 2,
    code: "LUCKY",
    icon: <FiCircle className="h-[16px] w-[16px] text-white" />
  },
  {
    title: '15% Off on Health Checkup Packages',
    description: 'Choose from full body, sugar, or thyroid tests. Book a lab test at home and get reports online.',
    id: 3,
    code:"HEALTH15",
    icon: <FiLayers className="h-[16px] w-[16px] text-white" />
  },
  {
    title: 'Buy 2 Get 1 Free on Personal Care Essentials',
    description: 'Stock up on skincare, hygiene, and wellness products. Free item auto-added to your cart.',
    id: 4,
    code:"BUY2GET1",
    icon: <FiLayout className="h-[16px] w-[16px] text-white" />
  },
  {
    title: '₹150 Cashback on First Medicine Order',
    description: 'New users get instant cashback on their first purchase. Apply code FIRST150 at checkout.',
    id: 5,
    code:"FIRST150",
    icon: <FiCode className="h-[16px] w-[16px] text-white" />
  }
];

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: 'spring', stiffness: 300, damping: 30 };

export default function Carousel({
  items = DEFAULT_ITEMS,
  baseWidth = 300,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false
}) {
  const containerPadding = 16;
  const itemWidth = baseWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;

  const carouselItems = loop ? [...items, items[0]] : items;
  const [currentIndex, setCurrentIndex] = useState(0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const containerRef = useRef(null);
  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered)) {
      const timer = setInterval(() => {
        setCurrentIndex(prev => {
          if (prev === items.length - 1 && loop) {
            return prev + 1;
          }
          if (prev === carouselItems.length - 1) {
            return loop ? 0 : prev;
          }
          return prev + 1;
        });
      }, autoplayDelay);
      return () => clearInterval(timer);
    }
  }, [autoplay, autoplayDelay, isHovered, loop, items.length, carouselItems.length, pauseOnHover]);

  const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationComplete = () => {
    if (loop && currentIndex === carouselItems.length - 1) {
      setIsResetting(true);
      x.set(0);
      setCurrentIndex(0);
      setTimeout(() => setIsResetting(false), 50);
    }
  };

  const handleDragEnd = (_, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      if (loop && currentIndex === items.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(prev => Math.min(prev + 1, carouselItems.length - 1));
      }
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      if (loop && currentIndex === 0) {
        setCurrentIndex(items.length - 1);
      } else {
        setCurrentIndex(prev => Math.max(prev - 1, 0));
      }
    }
  };

  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * (carouselItems.length - 1),
          right: 0
        }
      };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden p-4 shadow transition-bg duration-400 bg-[var(--card)] ${
        round ? 'rounded-full ' : 'rounded-[24px]'
      }`}
      style={{
        width: `${baseWidth}px`,
        ...(round && { height: `${baseWidth}px` })
      }}
    >
      <motion.div
        className="flex"
        drag="x"
        {...dragProps}
        style={{
          width: itemWidth,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${currentIndex * trackItemOffset + itemWidth / 2}px 50%`,
          x
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(currentIndex * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationComplete={handleAnimationComplete}
      >
        {carouselItems.map((item, index) => {
          const range = [-(index + 1) * trackItemOffset, -index * trackItemOffset, -(index - 1) * trackItemOffset];
          const outputRange = [90, 0, -90];
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const rotateY = useTransform(x, range, outputRange, { clamp: false });
          return (
            <motion.div
              key={index}
              className={`relative shrink-0 flex flex-col ${
                round
                  ? 'items-center justify-center text-center border-0'
                  : 'items-start justify-between rounded-[12px]'
              } overflow-hidden cursor-grab active:cursor-grabbing`}
              style={{
                width: itemWidth,
                height: round ? itemWidth : '100%',
                rotateY: rotateY,
                ...(round && { borderRadius: '50%' })
              }}
              transition={effectiveTransition}
            >
              <div className={`flex justify-between w-full ${round ? 'p-0 m-0' : 'px-5 pt-5 pb-2'}`}>
                <span className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[#FF6F61]">
                  {item.icon}
                </span>
                <span className='text-green-500 border-1 border-dashed border-green-500 text-xs h-max py-1 px-3 rounded-sm flex gap-2 cursor-pointer transition-all duraiton-500 hover:bg-green-500 hover:text-white' onClick={()=>{navigator.clipboard.writeText(item.code);toast.success(`Code ${item.code.toUpperCase()} Coppied Successfully`)}}>{item.code} <Copy size={15}/></span>
              </div>
              <div className="p-5">
                <h1 className="mb-1 font-black text-lg font-semibold">{item.title}</h1>
                <p className="text-xs">{item.description}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
      <div className={`flex w-full justify-center ${round ? 'absolute z-20 bottom-12 left-1/2 -translate-x-1/2' : ''}`}>
        <div className="mt-4 flex w-[150px] justify-between px-8">
          {items.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 w-2 rounded-full cursor-pointer transition-colors duration-150 ${
                currentIndex % items.length === index
                  ? "bg-[var(--text)]"
                  : "bg-gray-400"
              }`}
              animate={{
                scale: currentIndex % items.length === index ? 1.2 : 1
              }}
              onClick={() => setCurrentIndex(index)}
              transition={{ duration: 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}