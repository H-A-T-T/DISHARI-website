'use client'

import { useState } from 'react'
import Link from 'next/link'
import { DishariLogo } from '@/components/shared/DishariLogo'
import { Eye, EyeOff, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react'

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#FAFAF8] text-stone-900 font-sans">
      {/* ─── Left Brand Panel — Desktop Only ─────────────────────────────── */}
      <div className="hidden lg:flex w-1/2 bg-stone-950 text-white flex-col justify-between p-12 lg:p-16 border-r-2 border-stone-900 relative">
        <div>
          {/* Logo directly on dark background — transparent, white typography */}
          <Link href="/" className="inline-block group mb-4">
            <DishariLogo
              theme="dark"
              className="h-14 sm:h-16 w-auto transition-transform group-hover:scale-105"
            />
          </Link>

          <div className="mt-12 max-w-md">
            <span className="font-mono text-xs text-green-400 font-bold uppercase tracking-wider block mb-2">
              [ বিনামূল্যে নাগরিক নিবন্ধন ]
            </span>
            <h1 className="text-4xl font-black text-white leading-tight">
              এক ক্লিকে সকল সরকারি সেবা হাতের মুঠোয়
            </h1>
            <p className="text-stone-300 mt-4 text-base leading-relaxed font-normal">
              একটি অ্যাকাউন্ট তৈরি করুন এবং কম্পিউটার দোকানের দীর্ঘ লাইন ও হয়রানি থেকে মুক্তি পান।
            </p>
          </div>
        </div>

        {/* Feature Highlights Ledger */}
        <div className="border-2 border-stone-700 bg-stone-900 p-6 max-w-md space-y-3.5 shadow-[4px_4px_0_0_#059669]">
          <div className="flex items-start gap-3">
            <span className="font-mono text-xs font-bold text-green-400 pt-0.5">[০১]</span>
            <p className="text-sm text-stone-200">
              <strong className="text-white">স্মার্ট ডকুমেন্ট লকার:</strong> কাগজপত্র একবার সেভ করলে যেকোনো ফর্মে অটো-ফিল।
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="font-mono text-xs font-bold text-green-400 pt-0.5">[০২]</span>
            <p className="text-sm text-stone-200">
              <strong className="text-white">সঠিক ফি নির্দেশিকা:</strong> কোনো বাড়তি দালাল খরচ নেই, সরকারি মূল্যে কাজ।
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="font-mono text-xs font-bold text-green-400 pt-0.5">[০৩]</span>
            <p className="text-sm text-stone-200">
              <strong className="text-white">সময়োপযোগী নোটিফিকেশন:</strong> ডেডলাইন ও আবেদন স্ট্যাটাসের তাৎক্ষণিক আপডেট।
            </p>
          </div>
        </div>

        {/* Bottom gazette note */}
        <div className="font-mono text-xs text-stone-500">
          গণপ্রজাতন্ত্রী বাংলাদেশ সরকার · নাগরিক তথ্য সহায়তা
        </div>
      </div>

      {/* ─── Right Form Panel ─────────────────────────────────────────────── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-12 sm:px-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="inline-block">
              <DishariLogo
                theme="light"
                className="h-11 w-auto"
              />
            </Link>
          </div>

          <div className="border-b-2 border-stone-900 pb-4 mb-6">
            <span className="font-mono text-xs font-bold text-stone-500 uppercase tracking-wider block">
              [ নতুন নাগরিক অ্যাকাউন্ট ]
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-950 mt-1">
              নিবন্ধন সম্পন্ন করুন
            </h2>
            <p className="text-stone-600 text-sm mt-1">
              সঠিক তথ্য প্রদান করে ১ মিনিটে আপনার দিশারী প্রোফাইল তৈরি করুন
            </p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                পূর্ণ নাম (জাতীয় পরিচয়পত্র অনুযায়ী) <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="যেমন: মো: রফিকুল ইসলাম"
                className="h-13 w-full border-2 border-stone-900 bg-white px-4 text-base font-medium focus:ring-2 focus:ring-green-700 outline-none transition-all placeholder:text-stone-400"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                মোবাইল নম্বর <span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                placeholder="01XXXXXXXXX"
                className="h-13 w-full border-2 border-stone-900 bg-white px-4 text-base font-medium focus:ring-2 focus:ring-green-700 outline-none transition-all placeholder:text-stone-400"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                ইমেইল ঠিকানা <span className="text-stone-400 font-normal font-sans">(ঐচ্ছিক)</span>
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                className="h-13 w-full border-2 border-stone-900 bg-white px-4 text-base font-medium focus:ring-2 focus:ring-green-700 outline-none transition-all placeholder:text-stone-400"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                পাসওয়ার্ড নির্ধারণ করুন <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="কমপক্ষে ৬ অক্ষর বা ডিজিট"
                  className="h-13 w-full border-2 border-stone-900 bg-white px-4 pr-12 text-base font-medium focus:ring-2 focus:ring-green-700 outline-none transition-all placeholder:text-stone-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-900 cursor-pointer"
                  title={showPassword ? 'লুকান' : 'দেখুন'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                পাসওয়ার্ড নিশ্চিত করুন <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="পুনরায় একই পাসওয়ার্ড লিখুন"
                  className="h-13 w-full border-2 border-stone-900 bg-white px-4 pr-12 text-base font-medium focus:ring-2 focus:ring-green-700 outline-none transition-all placeholder:text-stone-400"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-900 cursor-pointer"
                  title={showConfirm ? 'লুকান' : 'দেখুন'}
                >
                  {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full border-2 border-stone-900 bg-green-700 hover:bg-green-800 text-white h-12 font-bold text-base transition-colors cursor-pointer shadow-[4px_4px_0_0_#1c1917] flex items-center justify-center gap-2 mt-2"
            >
              <span>নিবন্ধন সম্পন্ন করুন</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-8 pt-6 border-t border-stone-200 text-center">
            <p className="text-stone-600 text-sm">
              ইতিমধ্যে অ্যাকাউন্ট তৈরি করা আছে?{' '}
              <Link href="/login" className="text-green-800 font-bold underline decoration-2 underline-offset-4 hover:text-green-950">
                এখানে লগইন করুন →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
