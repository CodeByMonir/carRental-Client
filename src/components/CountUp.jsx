'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

/**
 * CountUp — animates a number from 0 to `end` once the element enters the viewport.
 * @param {string|number} end   — target number (can be float like 99.8)
 * @param {number}        duration — seconds to complete animation
 * @param {string}        suffix   — e.g. "+", "%", "★"
 * @param {string}        prefix   — e.g. "$"
 * @param {number}        decimals — decimal places (default 0)
 */
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
      // Cubic ease-out
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
