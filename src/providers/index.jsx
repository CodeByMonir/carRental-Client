'use client';

import { Toast } from '@heroui/react';
import { ThemeProvider } from './ThemeProvider';

export function Providers({ children }) {
  return (
    <ThemeProvider>
      <Toast.Provider
        placement="top-right"
        toastProps={{
          classNames: {
            base: [
              'bg-[#111111] border border-zinc-800',
              'shadow-[0_8px_32px_rgba(0,0,0,0.5)]',
              'rounded-2xl backdrop-blur-xl',
              'data-[type=success]:border-emerald-500/30',
              'data-[type=warning]:border-yellow-500/30',
              'data-[type=error]:border-red-500/30',
            ].join(' '),
            title: 'text-white font-bold text-sm',
            description: 'text-zinc-400 text-xs mt-0.5',
            icon: 'text-orange-500',
          },
        }}
      />
      {children}
    </ThemeProvider>
  );
}
