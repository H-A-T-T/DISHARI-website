import type { Transition, Variants } from 'framer-motion'

/**
 * Windows 10 Fluent Design System Motion Guidelines & Tokens
 *
 * Windows 10 animations feature snappy, decelerating entrances,
 * accelerated exits, tactile button press depressions,
 * and fluid spring/connected transitions for indicators and pivots.
 */

// Decelerate curve: fast out, slow in (Win10 Entrance/Pivot)
export const WIN10_EASE_ENTRANCE = [0.1, 0.9, 0.2, 1] as const

// Accelerate curve: elements leave quickly (Win10 Exit)
export const WIN10_EASE_EXIT = [0.7, 0, 1, 0.5] as const

// Standard easing
export const WIN10_EASE_STANDARD = [0.8, 0, 0.2, 1] as const

// Windows 10 Fluid Spring for active tab indicators & segment sliders
export const WIN10_INDICATOR_SPRING: Transition = {
  type: 'spring',
  stiffness: 520,
  damping: 38,
  mass: 0.8,
}

// Windows 10 Pivot / Tab Switch Entrance & Exit
export const win10TabMotion: Variants = {
  initial: {
    opacity: 0,
    y: 10,
    filter: 'blur(2px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.26,
      ease: WIN10_EASE_ENTRANCE,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    filter: 'blur(1px)',
    transition: {
      duration: 0.14,
      ease: WIN10_EASE_EXIT,
    },
  },
}

// Windows 10 Drill-In / Step Navigation (Forward / Backward)
export const win10DrillInMotion: Variants = {
  initial: {
    opacity: 0,
    x: 18,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.25,
      ease: WIN10_EASE_ENTRANCE,
    },
  },
  exit: {
    opacity: 0,
    x: -18,
    transition: {
      duration: 0.14,
      ease: WIN10_EASE_EXIT,
    },
  },
}

// Windows 10 ContentDialog / Modal Animation
export const win10DialogBackdropMotion: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.15, ease: 'easeIn' } },
}

export const win10DialogMotion: Variants = {
  initial: {
    opacity: 0,
    scale: 0.95,
    y: 10,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.24,
      ease: WIN10_EASE_ENTRANCE,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: 6,
    transition: {
      duration: 0.15,
      ease: WIN10_EASE_EXIT,
    },
  },
}

// Windows 10 Flyout / Dropdown Menu Animation
export const win10FlyoutMotion: Variants = {
  initial: {
    opacity: 0,
    scale: 0.96,
    y: -8,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: WIN10_EASE_ENTRANCE,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: -4,
    transition: {
      duration: 0.12,
      ease: WIN10_EASE_EXIT,
    },
  },
}

// Windows 10 Staggered / Cascading List Entrance
export const win10CascadeContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.035,
      delayChildren: 0.01,
    },
  },
}

export const win10CascadeItem: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.22,
      ease: WIN10_EASE_ENTRANCE,
    },
  },
}
