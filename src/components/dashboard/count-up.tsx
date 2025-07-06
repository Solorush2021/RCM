'use client';
import { useEffect, useState, useRef } from 'react';

type CountUpProps = {
  start?: number;
  end: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
};

export function CountUp({ start = 0, end, duration = 1500, className, prefix = '', suffix = '' }: CountUpProps) {
  const [count, setCount] = useState(start);
  const ref = useRef<HTMLSpanElement>(null);
  const animationFrameId = useRef<number>();

  const animateCount = (startTime: number) => {
    const now = Date.now();
    const progress = Math.min(1, (now - startTime) / duration);
    const current = progress * (end - start) + start;
    setCount(current);

    if (progress < 1) {
      animationFrameId.current = requestAnimationFrame(() => animateCount(startTime));
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const startTime = Date.now();
          animationFrameId.current = requestAnimationFrame(() => animateCount(startTime));
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if(animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      observer.disconnect();
    };
  }, [end, start, duration]);

  const formatNumber = (num: number) => {
    if (Number.isInteger(num)) {
      return num.toLocaleString();
    }
    return num.toFixed(1);
  }

  return (
    <span ref={ref} className={className}>
      {prefix}{formatNumber(count)}{suffix}
    </span>
  );
}
