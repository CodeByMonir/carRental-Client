'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';


export default function CountUp({
  end,
  duration = 2,
  suffix = '',
  prefix = '',
  decimals = 0,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [count, setCount] = useState(0);

  const endNum = parseFloat(end);

  useEffect(() => {
    if (!isInView) return;

    let rafId;
    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * endNum;

      setCount(current);

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      } else {
        setCount(endNum);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, endNum, duration]);

  const formatted =
    decimals > 0
      ? count.toFixed(decimals)
      : Math.floor(count).toLocaleString();

  return (
    <span ref={ref}>
      {prefix}{formatted}{suffix}
    </span>
  );
}
