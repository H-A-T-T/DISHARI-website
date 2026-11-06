'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import {
  X,
  Send,
  Mic,
  GripHorizontal,
  User,
  Info
} from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

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

  // Civic greeting message
  useEffect(() => {
    const welcomeText = isBn
      ? 'আসসালামু আলাইকুম ও স্বাগতম! আমি দিশারীর ‘জনবন্ধু AI’। সরকারি সেবা, প্রয়োজনীয় কাগজপত্র, ফি কিংবা আবেদন প্রক্রিয়া সম্পর্কে আমাকে যেকোনো প্রশ্ন করতে পারেন।'
      : 'Welcome! I am Dishari\'s "Jonobondhu AI". Ask me anything regarding government services, required documentation, fees, or procedural steps.'

    setMessages([
      {
        id: 'welcome',
        sender: 'ai',
        text: welcomeText,
        time: new Date().toLocaleTimeString(isBn ? 'bn-BD' : 'en-US', {
          hour: '2-digit',
          minute: '2-digit'
        })
      }
    ])
  }, [isBn])

  // Scroll to bottom on new messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen])

  // ─── POINTER CAPTURE BUBBLE DRAG & SNAP PHYSICS ──────────────────────
  const handleBubblePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only primary button
    if (e.button !== 0 && e.pointerType === 'mouse') return

    // Prevent native drag, text selection, and scroll interference
    e.preventDefault()
    e.stopPropagation()

    // Lock all pointer movements directly to this element
    e.currentTarget.setPointerCapture(e.pointerId)

    const vw = window.innerWidth
    const vh = window.innerHeight
    const currentX = bubblePos ? bubblePos.x : vw - BUBBLE_SIZE - EDGE_PADDING
    const currentY = bubblePos ? bubblePos.y : vh - BUBBLE_SIZE - (vw < 768 ? 96 : 48)

    setIsSnappingBubble(false)
    setIsDraggingBubble(true)

    bubbleDragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      initialElemX: currentX,
      initialElemY: currentY,
      currentX: currentX,
      currentY: currentY,
      hasMoved: false,
      lastX: e.clientX,
      lastTime: performance.now(),
      vx: 0
    }
  }

  const handleBubblePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!bubbleDragRef.current || bubbleDragRef.current.pointerId !== e.pointerId) return
    e.preventDefault()

    const dx = e.clientX - bubbleDragRef.current.startX
    const dy = e.clientY - bubbleDragRef.current.startY

    // Only count as moved if threshold exceeded
    if (Math.hypot(dx, dy) > 4) {
      bubbleDragRef.current.hasMoved = true
    }

    // Measure horizontal fling velocity
    const now = performance.now()
    const dt = now - bubbleDragRef.current.lastTime
    if (dt > 10) {
      bubbleDragRef.current.vx = (e.clientX - bubbleDragRef.current.lastX) / dt
      bubbleDragRef.current.lastX = e.clientX
      bubbleDragRef.current.lastTime = now
    }

    const vw = window.innerWidth
    const vh = window.innerHeight

    // Direct 1:1 finger tracking, keeping inside viewport edges during dragging
    const newX = Math.min(Math.max(4, bubbleDragRef.current.initialElemX + dx), vw - BUBBLE_SIZE - 4)
    const newY = Math.min(Math.max(8, bubbleDragRef.current.initialElemY + dy), vh - BUBBLE_SIZE - 8)

    bubbleDragRef.current.currentX = newX
    bubbleDragRef.current.currentY = newY
    setBubblePos({ x: newX, y: newY })
  }

  const handleBubblePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!bubbleDragRef.current || bubbleDragRef.current.pointerId !== e.pointerId) return
    e.preventDefault()

    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {
      // Ignore if already released
    }

    setIsDraggingBubble(false)
    const { hasMoved, currentX, currentY, vx } = bubbleDragRef.current
    bubbleDragRef.current = null

    // If simply tapped/clicked without moving, open the chat window
    if (!hasMoved) {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const wWidth = Math.min(WINDOW_WIDTH, vw - 24)
      const wHeight = Math.min(WINDOW_HEIGHT, vh - 40)

      // Open chat window adjacent to the bubble
      let targetWinX = currentX < vw / 2
        ? Math.min(vw - wWidth - 12, currentX)
        : Math.max(12, currentX + BUBBLE_SIZE - wWidth)

      let targetWinY = Math.min(Math.max(12, currentY - 260), vh - wHeight - 12)

      setWindowPos({ x: targetWinX, y: targetWinY })
      setIsOpen(true)
      return
    }

    // ─── STICK TO CLOSEST SIDE OF SCREEN & PRESERVE RELEASED VERTICAL HEIGHT (Y) ───
    const vw = window.innerWidth
    const vh = window.innerHeight

    // Determine nearest horizontal wall (left or right) taking fling velocity into account
    const centerX = currentX + BUBBLE_SIZE / 2
    let snapToLeft = centerX < vw / 2
    if (vx < -0.35) snapToLeft = true
    if (vx > 0.35) snapToLeft = false

    const targetX = snapToLeft ? EDGE_PADDING : vw - BUBBLE_SIZE - EDGE_PADDING

    // Keep the vertical height (Y) exactly where the user dragged it, only bounded by screen limits
    const bottomNavPadding = vw < 768 ? 84 : 24
    const targetY = Math.min(Math.max(16, currentY), vh - BUBBLE_SIZE - bottomNavPadding)

    // Trigger authentic Messenger spring bounce transition
    setIsSnappingBubble(true)
    setBubblePos({ x: targetX, y: targetY })
  }

  const handleBubblePointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    handleBubblePointerUp(e)
  }

  // ─── WINDOW DRAGGING VIA TITLEBAR (POINTER CAPTURE) ─────────────────
  const handleWindowPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return
    if ((e.target as HTMLElement).closest('button')) return

    e.preventDefault()
    e.stopPropagation()
    e.currentTarget.setPointerCapture(e.pointerId)

    const vw = window.innerWidth
    const vh = window.innerHeight
    const currentX = windowPos ? windowPos.x : vw - WINDOW_WIDTH - EDGE_PADDING
    const currentY = windowPos ? windowPos.y : vh - WINDOW_HEIGHT - 32

    setIsDraggingWindow(true)
    windowDragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      initialElemX: currentX,
      initialElemY: currentY,
      currentX: currentX,
      currentY: currentY
    }
  }

  const handleWindowPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!windowDragRef.current || windowDragRef.current.pointerId !== e.pointerId) return
    e.preventDefault()

    const dx = e.clientX - windowDragRef.current.startX
    const dy = e.clientY - windowDragRef.current.startY

    const vw = window.innerWidth
    const vh = window.innerHeight
    const wWidth = Math.min(WINDOW_WIDTH, vw - 24)
    const wHeight = Math.min(WINDOW_HEIGHT, vh - 40)

    const newX = Math.min(Math.max(8, windowDragRef.current.initialElemX + dx), vw - wWidth - 8)
    const newY = Math.min(Math.max(8, windowDragRef.current.initialElemY + dy), vh - wHeight - 8)

    windowDragRef.current.currentX = newX
    windowDragRef.current.currentY = newY
    setWindowPos({ x: newX, y: newY })
  }

  const handleWindowPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!windowDragRef.current || windowDragRef.current.pointerId !== e.pointerId) return
    e.preventDefault()

    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {}

    setIsDraggingWindow(false)
    windowDragRef.current = null
  }

  // Chat message sending logic
  const quickPrompts = isBn
    ? [
        'পাসপোর্ট করতে কী কাগজপত্র লাগে?',
        'অনলাইনে জন্ম নিবন্ধন যাচাই কীভাবে করব?',
        'NID সংশোধন প্রক্রিয়ায় কত ফি লাগে?',
        'বয়স্ক ভাতার যোগ্যতার নিয়ম কী?'
      ]
    : [
        'Documents required for passport?',
        'How to verify birth registration?',
        'Fee required for NID correction?',
        'Eligibility for old-age allowance?'
      ]

  const handleSendMessage = (textToSend?: string) => {
    const messageText = (textToSend || input).trim()
    if (!messageText) return

    const timeString = new Date().toLocaleTimeString(isBn ? 'bn-BD' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: messageText,
      time: timeString
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')

    // Mock response simulation
    setTimeout(() => {
      let reply = ''
      if (messageText.includes('পাসপোর্ট') || messageText.toLowerCase().includes('passport')) {
        reply = isBn
          ? 'পাসপোর্ট আবেদনের জন্য আপনার অনলাইন ভেরিফায়েড জন্ম নিবন্ধন বা এনআইডি (NID), পূর্বের পাসপোর্ট (যদি থাকে) এবং নাগরিক সনদ প্রয়োজন। সাধারণ ফি ৪,০২৫ টাকা এবং ২১ কার্যদিবসের মধ্যে ডেলিভারি হয়।'
          : 'For passport applications, you need your online verified birth certificate or NID, old passport (if renewing), and citizen certificate. Standard fee is 4,025 BDT with 21 business days delivery.'
      } else if (messageText.includes('জন্ম নিবন্ধন') || messageText.toLowerCase().includes('birth')) {
        reply = isBn
          ? 'অনলাইন জন্ম নিবন্ধনের জন্য bdris.gov.bd পোর্টালে ১৭ ডিজিটের জন্ম নিবন্ধন নম্বর ও জন্মতারিখ প্রদান করে সরাসরি যাচাই বা সংশোধনের আবেদন করতে পারবেন।'
          : 'For online birth registration, submit your 17-digit certificate number and date of birth at bdris.gov.bd to verify or request amendments.'
      } else if (messageText.includes('NID') || messageText.includes('এনআইডি')) {
        reply = isBn
          ? 'এনআইডি সংশোধনের জন্য services.nidw.gov.bd পোর্টালে রক্তের গ্রুপ, শিক্ষাগত সনদ বা জন্ম নিবন্ধনের অনলাইন প্রমাণক জমা দিন। ক্যাটাগরিভেদে ফি ২৩০ থেকে ৩৪৫ টাকা।'
          : 'For NID corrections, upload educational certificates, blood test report, or birth certificate at services.nidw.gov.bd. Fees range from 230 to 345 BDT depending on type.'
      } else {
        reply = isBn
          ? `ধন্যবাদ! আপনি জানতে চেয়েছেন: "${messageText}"। জনবন্ধু AI ইন্টারফেসে সরকারি সেবা ডাটাবেজ সংযুক্ত রয়েছে। বিস্তারিত তথ্যের জন্য আমাদের সেবা তালিকা অনুসন্ধান করুন।`
          : `Thank you for asking about: "${messageText}". The Jonobondhu AI interface is connected to the civic knowledge catalog. Explore our services directory for detailed guidelines.`
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: reply,
          time: new Date().toLocaleTimeString(isBn ? 'bn-BD' : 'en-US', {
            hour: '2-digit',
            minute: '2-digit'
          })
        }
      ])
    }, 380)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Messenger bounce physics spring transition
  // cubic-bezier(0.34, 1.56, 0.64, 1) provides that signature slight rubber bounce against the wall
  const bubbleStyle: React.CSSProperties = {
    position: 'fixed',
    left: bubblePos ? `${bubblePos.x}px` : undefined,
    top: bubblePos ? `${bubblePos.y}px` : undefined,
    right: bubblePos ? undefined : `${EDGE_PADDING}px`,
    bottom: bubblePos ? undefined : '48px',
    zIndex: 50,
    touchAction: 'none',
    userSelect: 'none',
    transition: isSnappingBubble
      ? 'left 0.44s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.44s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.2s ease-out'
      : isDraggingBubble
        ? 'none'
        : 'transform 0.15s ease-out'
  }

  const windowStyle: React.CSSProperties = {
    position: 'fixed',
    left: windowPos ? `${windowPos.x}px` : undefined,
    top: windowPos ? `${windowPos.y}px` : undefined,
    right: windowPos ? undefined : `${EDGE_PADDING}px`,
    bottom: windowPos ? undefined : '32px',
    width: `min(${WINDOW_WIDTH}px, calc(100vw - 24px))`,
    height: `min(${WINDOW_HEIGHT}px, calc(100vh - 40px))`,
    zIndex: 50,
    touchAction: 'none'
  }

  return (
    <>
      {/* ─── MOVABLE FLOATING MESSENGER BUBBLE (FLAT, NO SHADOW, NO DOTS) ─── */}
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
          {/* Bubble Housing (Flat, 0 Shadow, Crisp 2px Green Border, Pure Flat Paper Aesthetic, No Dots) */}
          <div className="relative w-15 h-15 sm:w-16 sm:h-16 rounded-full bg-white border-2 border-[#006A4E] shadow-none flex items-center justify-center overflow-visible pointer-events-none">
            {/* Robot Head Vector Icon (Drop-shadow filter removed, perfectly crisp) */}
            <img
              src="/icons/jonobondhu.svg"
              alt="Jonobondhu AI"
              className="w-11 h-11 sm:w-12 sm:h-12 object-contain pointer-events-none select-none"
              draggable={false}
            />

            {/* Flat Hover Tooltip (No dots, No drop shadow) */}
            <div className="absolute right-full mr-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-neutral-900 text-white text-[11px] font-semibold tracking-wide whitespace-nowrap rounded-none opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity border border-neutral-700 shadow-none">
              {isBn ? 'জনবন্ধু AI' : 'Jonobondhu AI'}
            </div>
          </div>
        </div>
      )}

      {/* ─── MOVABLE POP-UP AI CHAT INTERFACE ─── */}
      {isOpen && (
        <div
          style={windowStyle}
          className="jonobondhu-window flex flex-col bg-white border border-neutral-300 rounded-none select-none overflow-hidden animate-in fade-in zoom-in-95 duration-150 shadow-none"
        >
          {/* Top 3px Bangladesh Green Accent Line */}
          <div className="h-[3px] bg-[#006A4E] w-full shrink-0" />

          {/* ─── MOVABLE TITLEBAR (POINTER CAPTURE DRAG HANDLE — NO DOTS) ─── */}
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
            {/* Title & Avatar (No status dot) */}
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
                className="w-7 h-7 flex items-center justify-center text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200 transition-colors cursor-pointer rounded-none"
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

            {/* Chat Messages */}
            {messages.map((msg) => {
              const isAi = msg.sender === 'ai'
              return (
                <div
                  key={msg.id}
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
                </div>
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
                      className="text-left bg-white hover:bg-neutral-50 border border-neutral-200 hover:border-[#006A4E] text-neutral-800 text-[11px] p-2 transition-colors cursor-pointer rounded-none font-medium"
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
                className="p-1.5 text-neutral-400 hover:text-[#006A4E] transition-colors cursor-pointer rounded-none"
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
                className={`w-8 h-8 flex items-center justify-center transition-colors rounded-none shrink-0 ${
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
        </div>
      )}
    </>
  )
}

export default JonobondhuChat
