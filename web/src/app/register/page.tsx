'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  return (
    <div className="flex min-h-screen">
      {/* Left Brand Panel — Desktop Only */}
      <div className="hidden lg:flex w-1/2 bg-green-700 flex-col justify-center items-center p-12">
        <h1 className="text-5xl font-extrabold text-white">দিশারী</h1>
        <p className="text-green-200 mt-4 text-center text-lg leading-relaxed max-w-sm">
          একটি অ্যাকাউন্ট তৈরি করুন এবং আপনার সকল সরকারি কাজ সহজ করুন।
        </p>
        <div className="mt-8 space-y-3 text-green-200 text-sm">
          <p>✅ কাগজপত্র সেভ করুন, বারবার খুঁজতে হবে না</p>
          <p>✅ সরকারি ফর্ম স্বয়ংক্রিয়ভাবে পূরণ হোক</p>
          <p>✅ গুরুত্বপূর্ণ ডেডলাইনের আগে নোটিফিকেশন পান</p>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          {/* Mobile Logo */}
          <Link href="/" className="lg:hidden block text-center mb-8">
            <span className="text-green-700 font-bold text-2xl">দিশারী</span>
          </Link>

          <h2 className="text-2xl font-bold text-stone-900">নতুন অ্যাকাউন্ট তৈরি করুন</h2>
          <p className="text-stone-500 mt-2">কয়েকটি ধাপেই রেজিস্ট্রেশন সম্পন্ন করুন</p>

          <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">পূর্ণ নাম</label>
              <input
                type="text"
                placeholder="আপনার পূর্ণ নাম লিখুন"
                className="h-14 w-full border-2 border-stone-200 rounded-xl px-4 text-base focus:border-green-500 outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">মোবাইল নম্বর</label>
              <input
                type="tel"
                placeholder="01XXXXXXXXX"
                className="h-14 w-full border-2 border-stone-200 rounded-xl px-4 text-base focus:border-green-500 outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                ইমেইল <span className="text-stone-400 font-normal">(ঐচ্ছিক)</span>
              </label>
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
                  placeholder="কমপক্ষে ৬ অক্ষর"
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
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">পাসওয়ার্ড নিশ্চিত করুন</label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="আবার পাসওয়ার্ড লিখুন"
                  className="h-14 w-full border-2 border-stone-200 rounded-xl px-4 pr-12 text-base focus:border-green-500 outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer"
                >
                  {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl h-12 font-semibold transition-colors cursor-pointer mt-2"
            >
              নিবন্ধন করুন
            </button>
          </form>

          <p className="text-center text-stone-500 text-sm mt-8">
            ইতিমধ্যে অ্যাকাউন্ট আছে?{' '}
            <Link href="/login" className="text-green-600 font-medium hover:underline">
              লগইন করুন
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
