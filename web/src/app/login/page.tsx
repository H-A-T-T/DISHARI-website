'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, Phone, Mail } from 'lucide-react'

export default function LoginPage() {
  const [mode, setMode] = useState<'phone' | 'email'>('phone')
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex min-h-screen">
      {/* Left Brand Panel — Desktop Only */}
      <div className="hidden lg:flex w-1/2 bg-green-700 flex-col justify-center items-center p-12">
        <h1 className="text-5xl font-extrabold text-white">দিশারী</h1>
        <p className="text-green-200 mt-4 text-center text-lg leading-relaxed max-w-sm">
          সরকারি সেবা পাওয়ার সবচেয়ে সহজ মাধ্যম। কাগজপত্র সেভ করুন, ফর্ম স্বয়ংক্রিয়ভাবে পূরণ হোক।
        </p>
        <div className="mt-12 bg-green-600/50 rounded-2xl px-6 py-4 max-w-xs">
          <p className="text-green-100 text-sm italic">
            &ldquo;এখন আর কম্পিউটার দোকানে যেতে হয় না। নিজেই ঘরে বসে সব কাজ করতে পারি।&rdquo;
          </p>
          <p className="text-green-300 text-xs mt-3">— একজন দিশারী ব্যবহারকারী</p>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          {/* Mobile Logo */}
          <Link href="/" className="lg:hidden block text-center mb-8">
            <span className="text-green-700 font-bold text-2xl">দিশারী</span>
          </Link>

          <h2 className="text-2xl font-bold text-stone-900">স্বাগতম</h2>
          <p className="text-stone-500 mt-2">আপনার অ্যাকাউন্টে লগইন করুন</p>

          {/* Mode Toggle */}
          <div className="flex mt-6 bg-stone-100 rounded-xl p-1">
            <button
              onClick={() => setMode('phone')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                mode === 'phone' ? 'bg-white shadow-sm text-stone-900' : 'text-stone-500'
              }`}
            >
              <Phone className="w-4 h-4" />
              মোবাইল নম্বর
            </button>
            <button
              onClick={() => setMode('email')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                mode === 'email' ? 'bg-white shadow-sm text-stone-900' : 'text-stone-500'
              }`}
            >
              <Mail className="w-4 h-4" />
              ইমেইল
            </button>
          </div>

          <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
            {mode === 'phone' ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">মোবাইল নম্বর</label>
                  <input
                    type="tel"
                    placeholder="01XXXXXXXXX"
                    className="h-14 w-full border-2 border-stone-200 rounded-xl px-4 text-base focus:border-green-500 outline-none transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl h-12 font-semibold transition-colors cursor-pointer"
                >
                  OTP পাঠান
                </button>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">ইমেইল</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="h-14 w-full border-2 border-stone-200 rounded-xl px-4 text-base focus:border-green-500 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">পাসওয়ার্ড</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="h-14 w-full border-2 border-stone-200 rounded-xl px-4 pr-12 text-base focus:border-green-500 outline-none transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <div className="flex justify-end mt-2">
                    <button type="button" className="text-green-600 text-sm hover:underline cursor-pointer">
                      পাসওয়ার্ড ভুলে গেছেন?
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl h-12 font-semibold transition-colors cursor-pointer"
                >
                  লগইন করুন
                </button>
              </>
            )}
          </form>

          <p className="text-center text-stone-500 text-sm mt-8">
            নতুন ব্যবহারকারী?{' '}
            <Link href="/register" className="text-green-600 font-medium hover:underline">
              নিবন্ধন করুন
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
