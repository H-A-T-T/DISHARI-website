'use client'

import React from 'react'

interface DishariLogoProps extends React.SVGProps<SVGSVGElement> {
  theme?: 'light' | 'dark'
  className?: string
}

export function DishariLogo({
  theme = 'light',
  className = 'h-10 w-auto',
  ...props
}: DishariLogoProps) {
  const isDark = theme === 'dark'
  const titleColor = isDark ? '#FFFFFF' : '#064E3B'
  const subtitleColor = isDark ? '#34D399' : '#059669'
  const shadowColor = isDark ? '#10B981' : '#064E3B'
  const shadowOpacity = isDark ? '0.35' : '0.12'

  // Unique IDs for gradients to avoid collisions if multiple instances are mounted
  const idPrefix = isDark ? 'dishari_dark_' : 'dishari_light_'

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 600 240"
      className={className}
      fill="none"
      {...props}
    >
      <defs>
        {/* Emerald Gradient */}
        <linearGradient id={`${idPrefix}emeraldGrad`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="50%" stopColor="#006A4E" />
          <stop offset="100%" stopColor="#064E3B" />
        </linearGradient>

        {/* Mint Gradient */}
        <linearGradient id={`${idPrefix}mintGrad`} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#6EE7B7" />
        </linearGradient>

        {/* Crimson Gradient */}
        <linearGradient id={`${idPrefix}crimsonGrad`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF4D5E" />
          <stop offset="55%" stopColor="#F42A41" />
          <stop offset="100%" stopColor="#991B1B" />
        </linearGradient>

        {/* Coral Gradient */}
        <linearGradient id={`${idPrefix}coralGrad`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FB7185" />
          <stop offset="100%" stopColor="#E11D48" />
        </linearGradient>

        {/* Filter */}
        <filter id={`${idPrefix}softShadow`} x="-15%" y="-15%" width="135%" height="135%">
          <feDropShadow
            dx="0"
            dy="6"
            stdDeviation="8"
            floodColor={shadowColor}
            floodOpacity={shadowOpacity}
          />
        </filter>
      </defs>

      {/* ─── LOGO MARK: Compass + Chat Bubble + Guiding Needle ─── */}
      <g transform="translate(45, 30)" filter={`url(#${idPrefix}softShadow)`}>
        {/* Outer Mint Ring */}
        <circle
          cx="90"
          cy="90"
          r="82"
          fill="none"
          stroke={`url(#${idPrefix}mintGrad)`}
          strokeWidth="3.5"
          opacity={isDark ? 0.75 : 0.5}
        />

        {/* Main Base */}
        <path
          d="M 90 16 
             C 49.1 16, 16 49.1, 16 90 
             C 16 108.5, 22.8 125.4, 34 138.4 
             L 22 164 
             L 51.5 154.2 
             C 63.1 160.5, 76.2 164, 90 164 
             C 130.9 164, 164 130.9, 164 90 
             C 164 49.1, 130.9 16, 90 16 Z"
          fill={`url(#${idPrefix}emeraldGrad)`}
        />

        {/* Inner Secondary Green Layer */}
        <path
          d="M 90 28 
             C 124.2 28, 152 55.8, 152 90 
             C 152 118, 133.5 141.6, 108 149.3 
             C 126 135, 136 114, 136 90 
             C 136 58, 115 34, 90 28 Z"
          fill={`url(#${idPrefix}mintGrad)`}
          opacity="0.4"
        />

        {/* Stylized Document Lines */}
        <rect x="52" y="65" width="38" height="6" rx="3" fill="#A7F3D0" opacity="0.9" />
        <rect x="52" y="80" width="28" height="6" rx="3" fill="#A7F3D0" opacity="0.75" />
        <rect x="52" y="95" width="20" height="6" rx="3" fill="#A7F3D0" opacity="0.55" />

        {/* Left Wing of Check / Needle */}
        <path d="M 55 112 L 82 136 L 86 116 L 67 100 Z" fill={`url(#${idPrefix}coralGrad)`} />

        {/* Main Upward Guiding Pointer */}
        <path d="M 82 136 L 148 38 L 104 118 Z" fill={`url(#${idPrefix}crimsonGrad)`} />
        <path d="M 82 136 L 148 38 L 86 116 Z" fill="#FF6B7A" opacity="0.85" />

        {/* Rising Sun / Guiding Star */}
        <circle
          cx="148"
          cy="38"
          r="8.5"
          fill={`url(#${idPrefix}crimsonGrad)`}
          stroke="#FFFFFF"
          strokeWidth="2.5"
        />
      </g>

      {/* ─── TYPOGRAPHY SECTION ─── */}
      <g transform="translate(245, 0)">
        {/* Title: দিশারী */}
        <text
          x="0"
          y="122"
          fontFamily="'Kalpurush', 'Noto Sans Bengali', system-ui, sans-serif"
          fontSize="80"
          fontWeight="800"
          fill={titleColor}
          letterSpacing="1"
        >
          দিশারী
        </text>

        {/* Red & Green Accent Dots */}
        <circle cx="250" cy="68" r="8.5" fill={`url(#${idPrefix}crimsonGrad)`} />
        <circle cx="268" cy="68" r="5.5" fill="#10B981" />

        {/* Multi-shade Divider Bar */}
        <rect x="4" y="142" width="85" height="5.5" rx="2.75" fill={`url(#${idPrefix}emeraldGrad)`} />
        <rect x="97" y="142" width="45" height="5.5" rx="2.75" fill={`url(#${idPrefix}mintGrad)`} />
        <rect x="150" y="142" width="35" height="5.5" rx="2.75" fill={`url(#${idPrefix}crimsonGrad)`} />

        {/* Tagline: ডিজিটাল নাগরিক সহায়ক */}
        <text
          x="4"
          y="174"
          fontFamily="'Kalpurush', 'Noto Sans Bengali', system-ui, sans-serif"
          fontSize="22"
          fontWeight="600"
          fill={subtitleColor}
          letterSpacing="0.5"
        >
          ডিজিটাল নাগরিক সহায়ক
        </text>
      </g>
    </svg>
  )
}
export default DishariLogo
