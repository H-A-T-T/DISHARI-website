'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Send,
  Mic,
  GripHorizontal,
  User,
  Info
} from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { WIN10_EASE_ENTRANCE, win10DialogMotion } from '@/lib/motion'

interface Message {
  id: string
  sender: 'ai' | 'user'
  text: string
  time: string
}

export function JonobondhuChat() {
  const { lang } = useLanguage()
  const isBn = lang === 'bn'

  const [isOpen, setIsOpen] = useState(false)

  // Bubble position: x and y in pixels relative to viewport
  const [bubblePos, setBubblePos] = useState<{ x: number; y: number } | null>(null)
  // Window position: x and y in pixels
  const [windowPos, setWindowPos] = useState<{ x: number; y: number } | null>(null)

  // Dragging & bouncing state flags
  const [isDraggingBubble, setIsDraggingBubble] = useState(false)
  const [isSnappingBubble, setIsSnappingBubble] = useState(false)
  const [isDraggingWindow, setIsDraggingWindow] = useState(false)

  // Chat message state
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Bubble DOM ref
  const bubbleRef = useRef<HTMLDivElement>(null)

  // Ref tracking bubble drag state to prevent stale closures and maximize responsiveness
  const bubbleDragRef = useRef<{
    pointerId: number
    startX: number
    startY: number
    initialElemX: number
    initialElemY: number
    currentX: number
    currentY: number
    hasMoved: boolean
    lastX: number
    lastTime: number
    vx: number
  } | null>(null)

  // Ref tracking window drag state
  const windowDragRef = useRef<{
    pointerId: number
    startX: number
    startY: number
    initialElemX: number
    initialElemY: number
    currentX: number
    currentY: number
  } | null>(null)

  // Dimensions
  const BUBBLE_SIZE = 64
  const WINDOW_WIDTH = 380
  const WINDOW_HEIGHT = 520
  const EDGE_PADDING = 16

  // Initialize responsive default positions on mount
  useEffect(() => {
    const initPositions = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight

      // Default: snapped to the right wall, middle-lower viewport
      const defBubbleX = Math.max(EDGE_PADDING, vw - BUBBLE_SIZE - EDGE_PADDING)
      const defBubbleY = Math.max(EDGE_PADDING, vh - BUBBLE_SIZE - (vw < 768 ? 96 : 48))
      setBubblePos((prev) => prev || { x: defBubbleX, y: defBubbleY })

      // Default chat window: bottom-right
      const wWidth = Math.min(WINDOW_WIDTH, vw - 24)
      const wHeight = Math.min(WINDOW_HEIGHT, vh - 40)
      const defWinX = Math.max(EDGE_PADDING, vw - wWidth - EDGE_PADDING)
      const defWinY = Math.max(EDGE_PADDING, vh - wHeight - (vw < 768 ? 84 : 28))
      setWindowPos((prev) => prev || { x: defWinX, y: defWinY })
    }

    initPositions()
    window.addEventListener('resize', initPositions)
    return () => window.removeEventListener('resize', initPositions)
  }, [])

  // Initial welcome message in selected language
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          sender: 'ai',
          text: isBn
            ? 'আসসালামু আলাইকুম! আমি জনবন্ধু — আপনার সরকারি সেবা সহকারী। পাসপোর্ট, NID সংশোধন, জন্ম নিবন্ধন, ভূমি সেবা বা ভাতা সম্পর্কে যে কোনো প্রশ্ন করতে পারেন।'
            : 'Hello! I am Jonobondhu — your citizen service assistant. Ask me anything about Passports, NID corrections, birth certificates, land records, or welfare allowances.',
          time: new Date().toLocaleTimeString(isBn ? 'bn-BD' : 'en-US', {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ])
    }
  }, [isBn, messages.length])

  // Auto scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen])

  // ─── POINTER CAPTURE: BUBBLE DRAG & FLING LOGIC ───
  const handleBubblePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return // Left click or touch only
    e.preventDefault()

    const currentX = bubblePos ? bubblePos.x : 0
    const currentY = bubblePos ? bubblePos.y : 0

    bubbleDragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      initialElemX: currentX,
      initialElemY: currentY,
      currentX,
      currentY,
      hasMoved: false,
      lastX: e.clientX,
      lastTime: performance.now(),
      vx: 0,
    }

    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch {}

    setIsSnappingBubble(false)
  }

  const handleBubblePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = bubbleDragRef.current
    if (!drag || drag.pointerId !== e.pointerId) return

    const dx = e.clientX - drag.startX
    const dy = e.clientY - drag.startY

    // Check if movement exceeds threshold to consider it a drag
    if (!drag.hasMoved && (Math.abs(dx) > 4 || Math.abs(dy) > 4)) {
      drag.hasMoved = true
      setIsDraggingBubble(true)
    }

    if (!drag.hasMoved) return

    const now = performance.now()
    const dt = now - drag.lastTime
    if (dt > 10) {
      drag.vx = (e.clientX - drag.lastX) / dt
      drag.lastX = e.clientX
      drag.lastTime = now
    }

    const vw = window.innerWidth
    const vh = window.innerHeight

    // Bound position inside viewport with edge padding
    const rawX = drag.initialElemX + dx
    const rawY = drag.initialElemY + dy
    const boundedX = Math.min(Math.max(EDGE_PADDING, rawX), vw - BUBBLE_SIZE - EDGE_PADDING)
    const boundedY = Math.min(Math.max(EDGE_PADDING, rawY), vh - BUBBLE_SIZE - EDGE_PADDING)

    drag.currentX = boundedX
    drag.currentY = boundedY

    setBubblePos({ x: boundedX, y: boundedY })
  }

  const handleBubblePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = bubbleDragRef.current
    if (!drag || drag.pointerId !== e.pointerId) return

    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {}

    const hadMoved = drag.hasMoved
    const finalY = drag.currentY
    const vx = drag.vx
    bubbleDragRef.current = null
    setIsDraggingBubble(false)

    if (!hadMoved) {
      // It was a crisp click/tap! Open the chat window.
      setIsOpen(true)
      return
    }

    // SNAP TO CLOSEST SCREEN WALL (Horizontal magnet snap)
    const vw = window.innerWidth
    const midX = vw / 2
    let snapX = EDGE_PADDING

    // If velocity is high, snap in the direction of the flick
    if (Math.abs(vx) > 0.4) {
      snapX = vx > 0 ? vw - BUBBLE_SIZE - EDGE_PADDING : EDGE_PADDING
    } else {
      snapX = drag.currentX + BUBBLE_SIZE / 2 > midX ? vw - BUBBLE_SIZE - EDGE_PADDING : EDGE_PADDING
    }

    setIsSnappingBubble(true)
    setBubblePos({ x: snapX, y: finalY })
  }

  const handleBubblePointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    if (bubbleDragRef.current?.pointerId === e.pointerId) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId)
      } catch {}
      bubbleDragRef.current = null
      setIsDraggingBubble(false)
    }
  }

  // ─── POINTER CAPTURE: CHAT WINDOW DRAGGING ───
  const handleWindowPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return
    e.preventDefault()

    const currentX = windowPos ? windowPos.x : 0
    const currentY = windowPos ? windowPos.y : 0

    windowDragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      initialElemX: currentX,
      initialElemY: currentY,
      currentX,
      currentY,
    }

    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch {}

    setIsDraggingWindow(true)
  }

  const handleWindowPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = windowDragRef.current
    if (!drag || drag.pointerId !== e.pointerId) return

    const dx = e.clientX - drag.startX
    const dy = e.clientY - drag.startY

    const vw = window.innerWidth
    const vh = window.innerHeight
    const wWidth = Math.min(WINDOW_WIDTH, vw - 24)
    const wHeight = Math.min(WINDOW_HEIGHT, vh - 40)

    const rawX = drag.initialElemX + dx
    const rawY = drag.initialElemY + dy

    const boundedX = Math.min(Math.max(8, rawX), vw - wWidth - 8)
    const boundedY = Math.min(Math.max(8, rawY), vh - wHeight - 8)

    drag.currentX = boundedX
    drag.currentY = boundedY

    setWindowPos({ x: boundedX, y: boundedY })
  }

  const handleWindowPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = windowDragRef.current
    if (!drag || drag.pointerId !== e.pointerId) return

    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {}

    windowDragRef.current = null
    setIsDraggingWindow(false)
  }

  // ─── CHAT ENGINE: SEND & AUTOMATED CIVIC RESPONSE ───
  const handleSendMessage = useCallback(
    (textOverride?: string) => {
      const text = (textOverride || input).trim()
      if (!text) return

      const userTime = new Date().toLocaleTimeString(isBn ? 'bn-BD' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit',
      })

      const userMsg: Message = {
        id: `user-${Date.now()}`,
        sender: 'user',
        text,
        time: userTime,
      }

      setMessages((prev) => [...prev, userMsg])
      if (!textOverride) setInput('')

      // Intelligent simulated civic knowledge engine
      setTimeout(() => {
        let reply = ''
        const lower = text.toLowerCase()

        if (lower.includes('পাসপোর্ট') || lower.includes('passport')) {
          reply = isBn
            ? 'ই-পাসপোর্ট পেতে মূল জাতীয় পরিচয়পত্র (NID) অথবা অনলাইন জন্ম নিবন্ধন (১৭ ডিজিট) প্রয়োজন। ৪৮ পৃষ্ঠার ৫ বছর মেয়াদের সাধারণ ফি ৪,০২৫ টাকা এবং জরুরি ফি ৬,৩২৫ টাকা (ভ্যাটসহ)।'
            : 'For E-Passport, you need your original Smart NID or 17-digit verified Birth Certificate. Regular fee for 48 pages (5 yrs) is 4,025 BDT, and express fee is 6,325 BDT.'
        } else if (lower.includes('nid') || lower.includes('পরিচয়পত্র') || lower.includes('সংশোধন')) {
          reply = isBn
            ? 'NID কার্ডে নাম বা জন্মতারিখ সংশোধনের জন্য এসএসসি/সমমান সনদ, জন্ম নিবন্ধন সনদ এবং মা-বাবার NID কপি নির্বাচন কমিশনের পোর্টালে (services.nidw.gov.bd) জমা দিন। প্রথম আবেদনের সরকারি ফি ৩৪৫ টাকা।'
            : 'For NID name or birth date correction, submit your SSC certificate, verified birth certificate, and parents\' NID copies via services.nidw.gov.bd. The official fee is 345 BDT.'
        } else if (lower.includes('নামজারি') || lower.includes('mutation') || lower.includes('জমি') || lower.includes('ভূমি')) {
          reply = isBn
            ? 'ই-নামজারি আবেদন ভূমি মন্ত্রণালয়ের mutation.land.gov.bd থেকে করা যায়। মোট সরকারি ফি ১,১৭০ টাকা (কোর্ট ফি ২০ + নোটিশ জারি ৫০ + রেকর্ড সংশোধন ১,০০০ + ডিসিআর ১০০ টাকা)। কোনো অতিরিক্ত খরচ নেই।'
            : 'E-Mutation can be filed at mutation.land.gov.bd. Total government fee is 1,170 BDT. The legal delivery limit is 28 working days.'
        } else if (lower.includes('ভাতা') || lower.includes('বিধবা') || lower.includes('allowance')) {
          reply = isBn
            ? 'বিধবা ও স্বামী নিগৃহীতা ভাতা সমাজসেবা অধিদপ্তরের মাধ্যমে পরিচালিত হয়। সরকারিভাবে কোনো ফি নেওয়া হয় না (বিনামূল্যে)। ইউনিয়ন পরিষদ বা ওয়ার্ড কার্যালয়ে NID ও ছবিসহ আবেদন করা যায়।'
            : 'Widow Allowance is free of government charge. Eligible citizens can apply at Union Council or Ward offices with NID and passport photo.'
        } else if (lower.includes('ট্রেড') || lower.includes('trade') || lower.includes('লাইসেন্স')) {
          reply = isBn
            ? 'ব্যবসার ই-ট্রেড লাইসেন্স আপনার সংশ্লিষ্ট সিটি কর্পোরেশন বা ইউনিয়ন পরিষদ কার্যালয় থেকে সংগ্রহ করতে পারেন। ভাড়ার চুক্তিপত্র ও ছবি প্রয়োজন হয়।'
            : 'E-Trade License requires business rental agreement, TIN certificate, and photo. Issued by local municipality or union council.'
        } else {
          reply = isBn
            ? 'আপনার প্রশ্নের জন্য ধন্যবাদ। দিশারীর সকল সেবা ডিরেক্টরি ব্রাউজ করে সরকারি ফি, প্রয়োজনীয় কাগজপত্রের তালিকা ও অফিসিয়াল পোর্টাল লিংক দেখে নিতে পারেন।'
            : 'Thank you for your question. You can explore Dishari\'s Services Directory to inspect official government fees, required checklist papers, and portal links.'
        }

        const aiMsg: Message = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: reply,
          time: new Date().toLocaleTimeString(isBn ? 'bn-BD' : 'en-US', {
            hour: '2-digit',
            minute: '2-digit',
          }),
        }

        setMessages((prev) => [...prev, aiMsg])
      }, 450)
    },
    [input, isBn]
  )

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Pre-prepared civic guidance prompt chips
  const quickPrompts = isBn
    ? [
        'ই-পাসপোর্ট করতে কী কাগজপত্র লাগে?',
        'NID নাম সংশোধনের সরকারি ফি কত?',
        'ভূমি নামজারি করতে মোট কত টাকা লাগে?',
      ]
    : [
        'Documents required for E-Passport?',
        'Official fee for NID correction?',
        'Total fee for Land Mutation?',
      ]

  // Dynamic positioning styles
  const bubbleStyle: React.CSSProperties = {
    position: 'fixed',
    left: bubblePos ? `${bubblePos.x}px` : undefined,
    top: bubblePos ? `${bubblePos.y}px` : undefined,
    right: !bubblePos ? `${EDGE_PADDING}px` : undefined,
    bottom: !bubblePos ? '64px' : undefined,
    zIndex: 9999,
    touchAction: 'none',
    transition: isSnappingBubble ? 'left 0.28s cubic-bezier(0.1, 0.9, 0.2, 1), top 0.28s cubic-bezier(0.1, 0.9, 0.2, 1)' : 'none',
  }

  const windowStyle: React.CSSProperties = {
    position: 'fixed',
    left: windowPos ? `${windowPos.x}px` : undefined,
    top: windowPos ? `${windowPos.y}px` : undefined,
    right: !windowPos ? `${EDGE_PADDING}px` : undefined,
    bottom: !windowPos ? '24px' : undefined,
    width: `min(${WINDOW_WIDTH}px, calc(100vw - 24px))`,
    height: `min(${WINDOW_HEIGHT}px, calc(100vh - 40px))`,
    zIndex: 99999,
  }

  return (
    <>
      {/* ─── MOVABLE FLOATING MESSENGER BUBBLE ─── */}
      {!isOpen && (
        <div
          ref={bubbleRef}
          style={bubbleStyle}
          onPointerDown={handleBubblePointerDown}
          onPointerMove={handleBubblePointerMove}
          onPointerUp={handleBubblePointerUp}
          onPointerCancel={handleBubblePointerCancel}
          onTransitionEnd={() => setIsSnappingBubble(false)}
          className={`group flex items-center justify-center select-none shadow-none ${
            isDraggingBubble
              ? 'cursor-grabbing scale-105'
              : 'cursor-grab hover:scale-105 active:scale-95'
          }`}
          role="button"
          tabIndex={0}
          aria-label={isBn ? 'জনবন্ধু AI চ্যাট খুলুন' : 'Open Jonobondhu AI Chat'}
          title={isBn ? 'জনবন্ধু AI (টেনে সরানো যাবে)' : 'Jonobondhu AI (Movable)'}
        >
          {/* Bubble Housing */}
          <div className="relative w-15 h-15 sm:w-16 sm:h-16 rounded-full bg-white border-2 border-[#006A4E] shadow-none flex items-center justify-center overflow-visible pointer-events-none">
            <img
              src="/icons/jonobondhu.svg"
              alt="Jonobondhu AI"
              className="w-11 h-11 sm:w-12 sm:h-12 object-contain pointer-events-none select-none"
              draggable={false}
            />

            {/* Flat Hover Tooltip */}
            <div className="absolute right-full mr-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-neutral-900 text-white text-[11px] font-semibold tracking-wide whitespace-nowrap rounded-none opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity border border-neutral-700 shadow-none">
              {isBn ? 'জনবন্ধু AI' : 'Jonobondhu AI'}
            </div>
          </div>
        </div>
      )}

      {/* ─── MOVABLE POP-UP AI CHAT INTERFACE WITH WINDOWS 10 WINDOW ENTRANCE ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            style={windowStyle}
            variants={win10DialogMotion}
            initial="initial"
            animate="animate"
            exit="exit"
            className="jonobondhu-window flex flex-col bg-white border border-neutral-300 rounded-none select-none overflow-hidden shadow-2xl"
          >
            {/* Top 3px Bangladesh Green Accent Line */}
            <div className="h-[3px] bg-[#006A4E] w-full shrink-0" />

            {/* ─── MOVABLE TITLEBAR ─── */}
            <div
              onPointerDown={handleWindowPointerDown}
              onPointerMove={handleWindowPointerMove}
              onPointerUp={handleWindowPointerUp}
              onPointerCancel={handleWindowPointerUp}
              className={`flex items-center justify-between px-3.5 py-2.5 bg-neutral-100 border-b border-neutral-200 select-none ${
                isDraggingWindow ? 'cursor-grabbing bg-neutral-200' : 'cursor-grab hover:bg-neutral-150'
              }`}
              title={isBn ? 'ড্র্যাগ করে উইন্ডো সরান' : 'Drag to move window'}
            >
              {/* Title & Avatar */}
              <div className="flex items-center gap-2.5 min-w-0 pointer-events-none">
                <div className="w-7 h-7 rounded-full bg-white border border-neutral-300 flex items-center justify-center shrink-0">
                  <img
                    src="/icons/jonobondhu.svg"
                    alt="Jonobondhu"
                    className="w-5 h-5 object-contain pointer-events-none"
                    draggable={false}
                  />
                </div>

                <div className="min-w-0">
                  <h3 className="font-bold text-xs sm:text-sm text-neutral-900 leading-none truncate">
                    {isBn ? 'জনবন্ধু AI' : 'Jonobondhu AI'}
                  </h3>
                  <span className="text-[10px] text-neutral-500 font-medium block mt-1 truncate">
                    {isBn ? 'নাগরিক সেবা সহায়ক' : 'Civic Service Assistant'}
                  </span>
                </div>
              </div>

              {/* Action Buttons: Drag indicator & Close Cross */}
              <div className="flex items-center gap-1.5 shrink-0">
                <span
                  className="p-1 text-neutral-400 hover:text-neutral-600 hidden sm:inline-block cursor-grab pointer-events-none"
                  title={isBn ? 'সরান' : 'Move'}
                >
                  <GripHorizontal className="w-4 h-4" />
                </span>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 flex items-center justify-center text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200 transition-colors cursor-pointer rounded-none win-press"
                  title={isBn ? 'বন্ধ করুন (বাবলে ফিরুন)' : 'Close (Back to bubble)'}
                  aria-label={isBn ? 'চ্যাট বন্ধ করুন' : 'Close chat'}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* ─── CONVERSATION SCROLL AREA ─── */}
            <div className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-[#F5F6F8] text-xs">
              {/* System Context Pill */}
              <div className="flex items-center justify-center">
                <div className="inline-flex items-center gap-1.5 bg-white border border-neutral-200 px-2.5 py-1 text-[10px] text-neutral-600 rounded-none font-mono">
                  <Info className="w-3 h-3 text-[#006A4E] shrink-0" />
                  <span>{isBn ? 'দিশারী স্মার্ট সেবা গাইডেন্স ইন্টারফেস' : 'Dishari Smart Civic Guidance Interface'}</span>
                </div>
              </div>

              {/* Chat Messages with Windows 10 Entrance */}
              {messages.map((msg) => {
                const isAi = msg.sender === 'ai'
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, ease: WIN10_EASE_ENTRANCE }}
                    className={`flex items-start gap-2 ${isAi ? 'justify-start' : 'justify-end'}`}
                  >
                    {isAi && (
                      <div className="w-6 h-6 rounded-full bg-white border border-neutral-300 flex items-center justify-center shrink-0 mt-0.5">
                        <img
                          src="/icons/jonobondhu.svg"
                          alt="AI"
                          className="w-4 h-4 object-contain pointer-events-none"
                        />
                      </div>
                    )}

                    <div className={`max-w-[82%] space-y-1 ${isAi ? 'items-start' : 'items-end'}`}>
                      <div
                        className={`p-3 rounded-none leading-relaxed text-xs sm:text-[13px] ${
                          isAi
                            ? 'bg-white border border-neutral-200 text-neutral-900 border-l-3 border-l-[#006A4E]'
                            : 'bg-[#006A4E] border border-[#004D38] text-white'
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[9px] font-mono text-neutral-400 block px-1">
                        {msg.time}
                      </span>
                    </div>

                    {!isAi && (
                      <div className="w-6 h-6 bg-neutral-200 border border-neutral-300 flex items-center justify-center shrink-0 mt-0.5 text-neutral-700">
                        <User className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </motion.div>
                )
              })}

              {/* Suggestion Chips */}
              {messages.length === 1 && (
                <div className="pt-2">
                  <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wide block mb-1.5">
                    {isBn ? 'সচরাচর জিজ্ঞাসিত প্রশ্ন:' : 'Frequent Questions:'}
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {quickPrompts.map((prompt, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSendMessage(prompt)}
                        className="text-left bg-white hover:bg-neutral-50 border border-neutral-200 hover:border-[#006A4E] text-neutral-800 text-[11px] p-2 transition-colors cursor-pointer rounded-none font-medium win-press"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ─── INPUT TERMINAL FOOTER ─── */}
            <div className="p-2.5 bg-white border-t border-neutral-200 shrink-0">
              <div className="flex items-center gap-1.5 border border-neutral-300 bg-white px-2.5 py-1 focus-within:border-[#006A4E] transition-colors rounded-none">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={isBn ? 'কী সরকারি সেবা প্রয়োজন? লিখুন...' : 'Ask about government services...'}
                  className="flex-1 h-9 bg-transparent text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 outline-none font-medium"
                />

                {/* Mic / Voice (UI only) */}
                <button
                  type="button"
                  className="p-1.5 text-neutral-400 hover:text-[#006A4E] transition-colors cursor-pointer rounded-none win-press"
                  title={isBn ? 'ভয়েস প্রশ্ন (শীঘ্রই আসছে)' : 'Voice input (Coming soon)'}
                  aria-label={isBn ? 'ভয়েস প্রশ্ন' : 'Voice input'}
                >
                  <Mic className="w-4 h-4" />
                </button>

                {/* Send Button */}
                <button
                  type="button"
                  onClick={() => handleSendMessage()}
                  disabled={!input.trim()}
                  className={`w-8 h-8 flex items-center justify-center transition-colors rounded-none shrink-0 win-press ${
                    input.trim()
                      ? 'bg-[#006A4E] hover:bg-[#004D38] text-white cursor-pointer'
                      : 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                  }`}
                  title={isBn ? 'বার্তা পাঠান' : 'Send message'}
                  aria-label={isBn ? 'বার্তা পাঠান' : 'Send message'}
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center justify-between text-[10px] text-neutral-400 mt-1.5 px-0.5">
                <span>{isBn ? 'ইন্টারফেস সংস্করণ ১.০' : 'Interface v1.0'}</span>
                <span>{isBn ? 'দিশারী জনবন্ধু সহায়ক' : 'Dishari Jonobondhu'}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default JonobondhuChat
