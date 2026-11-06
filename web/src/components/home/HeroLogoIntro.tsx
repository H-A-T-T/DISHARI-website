'use client'

import React from 'react'
import { useLanguage } from '@/lib/language-context'

export function HeroLogoIntro() {
  const { lang } = useLanguage()
  const isBn = lang === 'bn'

  return (
    <div className="w-full flex items-center justify-center lg:justify-end select-none">
      <div className="w-full max-w-[360px] sm:max-w-[420px] lg:max-w-[450px]">
        {/* Scoped CSS Styles for Seamless Choreographed SVG Animation */}
        <style dangerouslySetInnerHTML={{ __html: `
          /* ── Stage 1: Outer Mint Ring Stroke Draw (strictly concentric at cx=90, cy=90) ── */
          .dishari-intro-ring {
            stroke-dasharray: 520;
            stroke-dashoffset: 520;
            animation: introRingDraw 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards;
          }
          @keyframes introRingDraw {
            0% {
              stroke-dashoffset: 520;
              opacity: 0;
            }
            20% {
              opacity: 0.6;
            }
            100% {
              stroke-dashoffset: 0;
              opacity: 0.5;
            }
          }

          /* ── Stage 2: Emerald Base Scale In (Pivoted strictly via coordinate translation) ── */
          .dishari-intro-base-anim {
            animation: introBasePop 0.85s cubic-bezier(0.34, 1.56, 0.64, 1) 0.25s forwards;
            opacity: 0;
          }
          @keyframes introBasePop {
            0% {
              opacity: 0;
              transform: scale(0.65);
            }
            70% {
              opacity: 1;
              transform: scale(1.04);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }

          /* ── Stage 2b: Inner Crescent Layer ── */
          .dishari-intro-crescent {
            animation: introCrescentIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards;
            opacity: 0;
          }
          @keyframes introCrescentIn {
            0% {
              opacity: 0;
              transform: translateX(10px);
            }
            100% {
              opacity: 0.4;
              transform: translateX(0);
            }
          }

          /* ── Stage 3: Document Lines Staggered Vector Slide ── */
          .dishari-intro-doc-1 {
            animation: introDocSlide 0.45s cubic-bezier(0.16, 1, 0.3, 1) 0.65s forwards;
            opacity: 0;
          }
          .dishari-intro-doc-2 {
            animation: introDocSlide 0.45s cubic-bezier(0.16, 1, 0.3, 1) 0.75s forwards;
            opacity: 0;
          }
          .dishari-intro-doc-3 {
            animation: introDocSlide 0.45s cubic-bezier(0.16, 1, 0.3, 1) 0.85s forwards;
            opacity: 0;
          }
          @keyframes introDocSlide {
            0% {
              opacity: 0;
              transform: translateX(-14px);
            }
            100% {
              opacity: 0.9;
              transform: translateX(0);
            }
          }

          /* ── Stage 4: Guiding Compass Needle Kinetic Swing (pivoted strictly at (90, 90)) ── */
          .dishari-intro-needle-anim {
            animation: introNeedleSweep 1.05s cubic-bezier(0.2, 0.9, 0.3, 1) 0.75s forwards;
            opacity: 0;
          }
          @keyframes introNeedleSweep {
            0% {
              opacity: 0;
              transform: rotate(-65deg) scale(0.75);
            }
            25% {
              opacity: 1;
            }
            65% {
              transform: rotate(10deg) scale(1.03);
            }
            82% {
              transform: rotate(-3.5deg) scale(0.99);
            }
            92% {
              transform: rotate(1deg) scale(1);
            }
            100% {
              opacity: 1;
              transform: rotate(0deg) scale(1);
            }
          }

          /* ── Stage 5: Guiding Crimson Star Flare & Radial Pulse ── */
          .dishari-intro-star-anim {
            animation: introStarPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 1.35s forwards;
            opacity: 0;
          }
          @keyframes introStarPop {
            0% {
              opacity: 0;
              transform: scale(0);
            }
            70% {
              opacity: 1;
              transform: scale(1.35);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }

          .dishari-intro-star-pulse {
            animation: introStarPulse 0.85s cubic-bezier(0.1, 0.8, 0.2, 1) 1.4s forwards;
            opacity: 0;
          }
          @keyframes introStarPulse {
            0% {
              r: 8.5;
              opacity: 0.95;
              stroke-width: 3;
            }
            100% {
              r: 25;
              opacity: 0;
              stroke-width: 0.5;
            }
          }

          /* ── Stage 6: Typography Entrance (Kalpurush) ── */
          .dishari-intro-title {
            animation: introTitleIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) 1.1s forwards;
            opacity: 0;
          }
          @keyframes introTitleIn {
            0% {
              opacity: 0;
              transform: translateY(18px);
              filter: blur(3px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
              filter: blur(0);
            }
          }

          /* ── Stage 6b: Red & Green Accent Dots Drop In ── */
          .dishari-intro-dot-red {
            animation: introDotDrop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 1.45s forwards;
            opacity: 0;
          }
          .dishari-intro-dot-green {
            animation: introDotDrop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 1.55s forwards;
            opacity: 0;
          }
          @keyframes introDotDrop {
            0% {
              opacity: 0;
              transform: translateY(-16px);
            }
            70% {
              opacity: 1;
              transform: translateY(2px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* ── Stage 7: Tri-Color Divider Bars Expansion ── */
          .dishari-intro-bar-1 {
            animation: introBarSlide 0.45s cubic-bezier(0.16, 1, 0.3, 1) 1.4s forwards;
            opacity: 0;
          }
          .dishari-intro-bar-2 {
            animation: introBarSlide 0.4s cubic-bezier(0.16, 1, 0.3, 1) 1.5s forwards;
            opacity: 0;
          }
          .dishari-intro-bar-3 {
            animation: introBarSlide 0.35s cubic-bezier(0.16, 1, 0.3, 1) 1.6s forwards;
            opacity: 0;
          }
          @keyframes introBarSlide {
            0% {
              opacity: 0;
              transform: translateX(-12px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }

          /* ── Stage 8: Subtitle Slide In ── */
          .dishari-intro-subtitle {
            animation: introSubtitleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) 1.65s forwards;
            opacity: 0;
          }
          @keyframes introSubtitleIn {
            0% {
              opacity: 0;
              transform: translateX(-14px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }

          /* ── Stage 9: Specular Glint Pass ── */
          .dishari-intro-glint {
            animation: introGlintSweep 0.85s cubic-bezier(0.4, 0, 0.2, 1) 1.9s forwards;
            opacity: 0;
          }
          @keyframes introGlintSweep {
            0% {
              transform: translateX(-140px);
              opacity: 0;
            }
            30% {
              opacity: 0.75;
            }
            70% {
              opacity: 0.75;
            }
            100% {
              transform: translateX(450px);
              opacity: 0;
            }
          }
        `}} />

        {/* Seamless Animated Vector SVG (Exact viewBox 8 8 444 168 from DishariLogo) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="8 8 444 168"
          className="w-full h-auto overflow-visible"
          fill="none"
          aria-label="Dishari Official Animated Logo"
        >
          <defs>
            {/* Emerald Gradient (Bangladesh Forest Green) */}
            <linearGradient id="heroEmeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#059669" />
              <stop offset="50%" stopColor="#006A4E" />
              <stop offset="100%" stopColor="#064E3B" />
            </linearGradient>

            {/* Mint Gradient */}
            <linearGradient id="heroMintGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#6EE7B7" />
            </linearGradient>

            {/* Crimson Gradient (Bangladesh Flag Red) */}
            <linearGradient id="heroCrimsonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF4D5E" />
              <stop offset="55%" stopColor="#C8102E" />
              <stop offset="100%" stopColor="#991B1B" />
            </linearGradient>

            {/* Coral Gradient */}
            <linearGradient id="heroCoralGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FB7185" />
              <stop offset="100%" stopColor="#E11D48" />
            </linearGradient>

            {/* Specular Glint Linear Gradient */}
            <linearGradient id="heroGlintGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>

            {/* Drop Shadow */}
            <filter id="heroSoftShadow" x="-15%" y="-15%" width="135%" height="135%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#064E3B" floodOpacity="0.10" />
            </filter>

            {/* Clip Path for the Specular Glint */}
            <clipPath id="heroMarkClip">
              <path
                d="M 90 16 
                   C 49.1 16, 16 49.1, 16 90 
                   C 16 108.5, 22.8 125.4, 34 138.4 
                   L 22 164 
                   L 51.5 154.2 
                   C 63.1 160.5, 76.2 164, 90 164 
                   C 130.9 164, 164 130.9, 164 90 
                   C 164 49.1, 130.9 16, 90 16 Z"
              />
            </clipPath>
          </defs>

          {/* ─── LOGO MARK: Compass + Chat Bubble + Guiding Needle ─── */}
          <g transform="translate(4, 4)" filter="url(#heroSoftShadow)">
            {/* Outer Mint Ring: Strictly centered at (90, 90), perfectly encircling the base */}
            <circle
              cx="90"
              cy="90"
              r="82"
              fill="none"
              stroke="url(#heroMintGrad)"
              strokeWidth="3.5"
              className="dishari-intro-ring"
            />

            {/* Main Base: Scale revealed cleanly pivoted around (90, 90) */}
            <g transform="translate(90, 90)">
              <g className="dishari-intro-base-anim">
                <g transform="translate(-90, -90)">
                  <path
                    d="M 90 16 
                       C 49.1 16, 16 49.1, 16 90 
                       C 16 108.5, 22.8 125.4, 34 138.4 
                       L 22 164 
                       L 51.5 154.2 
                       C 63.1 160.5, 76.2 164, 90 164 
                       C 130.9 164, 164 130.9, 164 90 
                       C 164 49.1, 130.9 16, 90 16 Z"
                    fill="url(#heroEmeraldGrad)"
                  />
                </g>
              </g>
            </g>

            {/* Inner Secondary Mint Crescent Layer */}
            <path
              d="M 90 28 
                 C 124.2 28, 152 55.8, 152 90 
                 C 152 118, 133.5 141.6, 108 149.3 
                 C 126 135, 136 114, 136 90 
                 C 136 58, 115 34, 90 28 Z"
              fill="url(#heroMintGrad)"
              className="dishari-intro-crescent"
            />

            {/* Stylized Document Lines (Sequential Citizen Record Lines) */}
            <rect x="52" y="65" width="38" height="6" rx="3" fill="#A7F3D0" className="dishari-intro-doc-1" />
            <rect x="52" y="80" width="28" height="6" rx="3" fill="#A7F3D0" className="dishari-intro-doc-2" />
            <rect x="52" y="95" width="20" height="6" rx="3" fill="#A7F3D0" className="dishari-intro-doc-3" />

            {/* Kinetic Guiding Compass Needle: Pivoted strictly around compass center (90, 90) */}
            <g transform="translate(90, 90)">
              <g className="dishari-intro-needle-anim">
                <g transform="translate(-90, -90)">
                  {/* Left Wing of Check / Needle */}
                  <path d="M 55 112 L 82 136 L 86 116 L 67 100 Z" fill="url(#heroCoralGrad)" />

                  {/* Main Upward Guiding Pointer */}
                  <path d="M 82 136 L 148 38 L 104 118 Z" fill="url(#heroCrimsonGrad)" />
                  <path d="M 82 136 L 148 38 L 86 116 Z" fill="#FF6B7A" opacity="0.85" />
                </g>
              </g>
            </g>

            {/* Rising Sun / Guiding Star at (148, 38) */}
            <g transform="translate(148, 38)">
              {/* Expanding Shockwave Pulse Ring */}
              <circle
                cx="0"
                cy="0"
                r="8.5"
                fill="none"
                stroke="#FF4D5E"
                className="dishari-intro-star-pulse"
              />

              {/* Guiding Star Dot */}
              <g className="dishari-intro-star-anim">
                <circle
                  cx="0"
                  cy="0"
                  r="8.5"
                  fill="url(#heroCrimsonGrad)"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                />
              </g>
            </g>

            {/* Specular Glint Pass (Clipped to Base Shape) */}
            <g clipPath="url(#heroMarkClip)">
              <rect
                x="-60"
                y="0"
                width="45"
                height="180"
                fill="url(#heroGlintGrad)"
                transform="skewX(-25)"
                className="dishari-intro-glint"
              />
            </g>
          </g>

          {/* ─── TYPOGRAPHY SECTION (KALPURUSH) ─── */}
          <g transform="translate(186, 0)">
            {isBn ? (
              <>
                {/* Title: দিশারী (Kalpurush font) */}
                <text
                  x="0"
                  y="108"
                  fontFamily="'Kalpurush', sans-serif"
                  fontSize="78"
                  fontWeight="800"
                  fill="#064E3B"
                  letterSpacing="0.5"
                  className="dishari-intro-title"
                >
                  দিশারী
                </text>

                {/* Red & Green Accent Dots */}
                <circle cx="244" cy="54" r="8.5" fill="url(#heroCrimsonGrad)" className="dishari-intro-dot-red" />
                <circle cx="262" cy="54" r="5.5" fill="#10B981" className="dishari-intro-dot-green" />

                {/* Tri-Color Divider Bars */}
                <rect x="2" y="122" width="85" height="5.5" rx="2.75" fill="url(#heroEmeraldGrad)" className="dishari-intro-bar-1" />
                <rect x="94" y="122" width="45" height="5.5" rx="2.75" fill="url(#heroMintGrad)" className="dishari-intro-bar-2" />
                <rect x="146" y="122" width="35" height="5.5" rx="2.75" fill="url(#heroCrimsonGrad)" className="dishari-intro-bar-3" />

                {/* Tagline: ডিজিটাল নাগরিক সহায়ক */}
                <text
                  x="2"
                  y="150"
                  fontFamily="'Kalpurush', sans-serif"
                  fontSize="21"
                  fontWeight="600"
                  fill="#059669"
                  letterSpacing="0.5"
                  className="dishari-intro-subtitle"
                >
                  ডিজিটাল নাগরিক সহায়ক
                </text>
              </>
            ) : (
              <>
                {/* Title: DISHARI */}
                <text
                  x="0"
                  y="106"
                  fontFamily="'Plus Jakarta Sans', 'Inter', system-ui, sans-serif"
                  fontSize="70"
                  fontWeight="900"
                  fill="#064E3B"
                  letterSpacing="2"
                  className="dishari-intro-title"
                >
                  DISHARI
                </text>

                {/* Red & Green Accent Dots */}
                <circle cx="250" cy="54" r="8.5" fill="url(#heroCrimsonGrad)" className="dishari-intro-dot-red" />
                <circle cx="268" cy="54" r="5.5" fill="#10B981" className="dishari-intro-dot-green" />

                {/* Tri-Color Divider Bars */}
                <rect x="2" y="122" width="90" height="5.5" rx="2.75" fill="url(#heroEmeraldGrad)" className="dishari-intro-bar-1" />
                <rect x="99" y="122" width="48" height="5.5" rx="2.75" fill="url(#heroMintGrad)" className="dishari-intro-bar-2" />
                <rect x="154" y="122" width="38" height="5.5" rx="2.75" fill="url(#heroCrimsonGrad)" className="dishari-intro-bar-3" />

                {/* Tagline: DIGITAL CITIZEN ASSISTANT */}
                <text
                  x="2"
                  y="148"
                  fontFamily="'Plus Jakarta Sans', 'Inter', system-ui, sans-serif"
                  fontSize="16.5"
                  fontWeight="700"
                  fill="#059669"
                  letterSpacing="1"
                  className="dishari-intro-subtitle"
                >
                  DIGITAL CITIZEN ASSISTANT
                </text>
              </>
            )}
          </g>
        </svg>
      </div>
    </div>
  )
}

export default HeroLogoIntro
