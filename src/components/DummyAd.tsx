"use client";

import React from 'react';
import { useTheme } from './ThemeContext';

type AdVariant = 'sticky' | 'in-feed' | 'interstitial' | 'sidebar';

interface DummyAdProps {
  variant: AdVariant;
  className?: string;
}

export default function DummyAd({ variant, className = '' }: DummyAdProps) {
  const { isDark } = useTheme();
  
  // Tampilan mockup estetis yang menyesuaikan dengan Dark/Light Mode
  const bgClass = isDark 
    ? 'bg-zinc-800/80 border-zinc-700 text-zinc-500 backdrop-blur-sm' 
    : 'bg-slate-100/80 border-slate-300 text-slate-400 backdrop-blur-sm';

  // Khusus untuk sticky dan in-feed banner, kita render 2 kotak bersinggungan di layar besar
  if (variant === 'sticky' || variant === 'in-feed') {
    const isSticky = variant === 'sticky';
    const wrapperClass = isSticky 
      ? `fixed bottom-0 left-0 right-0 z-[100] flex justify-center items-end gap-2 md:gap-4 pointer-events-none mb-0 md:mb-2 px-2 ${className}`
      : `w-full flex justify-center items-center gap-2 md:gap-4 my-4 px-2 ${className}`;
      
    const adClassBase = `flex flex-col items-center justify-center border-2 border-dashed ${bgClass} shadow-sm`;

    // Sticky: 320x50 (Mobile), In-Feed: 320x100 (Mobile). Keduanya 728x90 / 2x 468x90 di Desktop.
    const leftBoxSize = isSticky
      ? 'w-full max-w-[320px] h-[50px] md:max-w-[728px] md:h-[90px] lg:max-w-[468px] xl:max-w-[600px]'
      : 'w-full max-w-[320px] h-[100px] md:max-w-[728px] md:h-[90px] lg:max-w-[468px] xl:max-w-[600px]';

    return (
      <div className={wrapperClass}>
        {/* Kotak Iklan Kiri (Tampil di semua ukuran) */}
        <div 
          className={`${adClassBase} pointer-events-auto flex-shrink-0 ${
            isSticky ? 'rounded-t-lg md:rounded-lg' : 'rounded-lg'
          } ${leftBoxSize}`}
          aria-label="Advertisement Placeholder 1"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-50 mb-0.5 hidden md:block">Advertisement 1</span>
          <span className="text-[10px] md:text-sm font-medium">{isSticky ? 'Ad: Sticky Banner 1' : 'Ad: In-Feed 1'}</span>
        </div>
        
        {/* Kotak Iklan Kanan (Hanya tampil di layar Desktop / lg ke atas) */}
        <div 
          className={`hidden lg:flex ${adClassBase} rounded-lg pointer-events-auto flex-shrink-0 lg:w-[468px] xl:w-[600px] lg:h-[90px]`}
          aria-label="Advertisement Placeholder 2"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-50 mb-0.5">Advertisement 2</span>
          <span className="text-sm font-medium">{isSticky ? 'Ad: Sticky Banner 2' : 'Ad: In-Feed 2'}</span>
        </div>
      </div>
    );
  }

  // Menerapkan ukuran standar IAB (Interactive Advertising Bureau)
  let sizeClasses = '';
  let labelText = '';

  switch (variant) {
    case 'interstitial':
      // Medium Rectangle (300x250) atau Large Rectangle (336x280)
      sizeClasses = 'w-[300px] h-[250px] sm:w-[336px] sm:h-[280px] mx-auto mt-6';
      labelText = 'Ad: Interstitial (300x250)';
      break;
    case 'sidebar':
      // Half-Page/Large Skyscraper (300x600)
      sizeClasses = 'hidden xl:flex w-[300px] h-[600px] flex-shrink-0';
      labelText = 'Ad: Sidebar (300x600)';
      break;
  }

  return (
    <div 
      className={`flex flex-col items-center justify-center border-2 border-dashed ${bgClass} overflow-hidden ${sizeClasses} ${className}`}
      aria-label="Advertisement Placeholder"
    >
      <span className="text-[10px] font-bold uppercase tracking-widest opacity-50 mb-1">
        Advertisement
      </span>
      <span className="text-sm font-medium text-center px-2">
        {labelText}
      </span>
    </div>
  );
}
