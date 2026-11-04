'use client'

import { useState } from 'react'
import Link from 'next/link'
import { DishariLogo } from '@/components/shared/DishariLogo'
import { Eye, EyeOff, Phone, Mail, ShieldCheck, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const [mode, setMode] = useState<'phone' | 'email'>('phone')
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#FAFAF8] text-stone-900 font-sans">
      {/* ─── Left Brand Panel — Desktop Only (Civic Broadside) ───────────── */}
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
              [ নিরাপদ নাগরিক পোর্টাল ]
            </span>
            <h1 className="text-4xl font-black text-white leading-tight">
              সরকারি সেবা গ্রহণের সবচেয়ে সহজ মাধ্যম
            </h1>
            <p className="text-stone-300 mt-4 text-base leading-relaxed font-normal">
              আপনার গুরুত্বপূর্ণ কাগজপত্র নিরাপদ লকারে সংরক্ষণ করুন। দিশারী আপনার হয়ে ফরম স্বয়ংক্রিয়ভাবে পূরণ করবে।
            </p>
          </div>
        </div>

        {/* Civic Testimonial Box */}
        <div className="border-2 border-stone-700 bg-stone-900 p-6 max-w-md shadow-[4px_4px_0_0_#059669]">
          <div className="flex items-center gap-2 text-green-400 text-xs font-mono font-bold mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>নাগরিকের বাস্তব অভিজ্ঞতা</span>
          </div>
          <p className="text-stone-200 text-sm leading-relaxed italic">
            &ldquo;আগে যে কোনো সরকারি কাজের জন্য কম্পিউটারের দোকানে দাঁড়িয়ে থাকতে হতো। এখন দিশারীতে সব নিয়ম ও ফি দেখে নিজেই নির্ভুলভাবে আবেদন করতে পারি।&rdquo;
          </p>
          <p className="text-stone-400 text-xs mt-3 font-semibold">— একজন দিশারী ব্যবহারকারী, ময়মনসিংহ</p>
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
              [ নাগরিক প্রবেশদ্বার ]
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-950 mt-1">
              লগইন করুন
            </h2>
            <p className="text-stone-600 text-sm mt-1">
              আপনার সংরক্ষিত নথিপত্র ও চলমান আবেদন দেখতে লগইন করুন
            </p>
          </div>

          {/* Mode Toggle (Rectangular Segmented Control, NO Cramped Pills) */}
          <div className="grid grid-cols-2 border-2 border-stone-900 bg-stone-100 p-1 mb-6">
            <button
              type="button"
              onClick={() => setMode('phone')}
              className={`flex items-center justify-center gap-2 py-2.5 text-sm font-bold transition-all cursor-pointer ${
                mode === 'phone'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-950'
              }`}
            >
              <Phone className="w-4 h-4" />
              <span>মোবাইল নম্বর</span>
            </button>
            <button
              type="button"
              onClick={() => setMode('email')}
              className={`flex items-center justify-center gap-2 py-2.5 text-sm font-bold transition-all cursor-pointer ${
                mode === 'email'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-950'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>ইমেইল</span>
            </button>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            {mode === 'phone' ? (
              <>
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                    মোবাইল নম্বর <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="01XXXXXXXXX"
                    className="h-13 w-full border-2 border-stone-900 bg-white px-4 text-base font-medium focus:ring-2 focus:ring-green-700 outline-none transition-all placeholder:text-stone-400"
                  />
                  <p className="text-xs text-stone-500 mt-1 font-mono">
                    আমরা আপনার নম্বরে একটি গোপন ওটিপি (OTP) পাঠাব।
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full border-2 border-stone-900 bg-stone-900 hover:bg-green-700 text-white h-12 font-bold text-base transition-colors cursor-pointer shadow-[4px_4px_0_0_#1c1917] flex items-center justify-center gap-2"
                >
                  <span>ওটিপি (OTP) পাঠান</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                    ইমেইল ঠিকানা <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="h-13 w-full border-2 border-stone-900 bg-white px-4 text-base font-medium focus:ring-2 focus:ring-green-700 outline-none transition-all placeholder:text-stone-400"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-stone-700">
                      পাসওয়ার্ড <span className="text-red-600">*</span>
                    </label>
                    <button type="button" className="text-xs text-green-700 font-bold hover:underline cursor-pointer">
                      পাসওয়ার্ড ভুলে গেছেন?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
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

                <button
                  type="submit"
                  className="w-full border-2 border-stone-900 bg-stone-900 hover:bg-green-700 text-white h-12 font-bold text-base transition-colors cursor-pointer shadow-[4px_4px_0_0_#1c1917] flex items-center justify-center gap-2"
                >
                  <span>লগইন করুন</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}
          </form>

          {/* Registration Link */}
          <div className="mt-8 pt-6 border-t border-stone-200 text-center">
            <p className="text-stone-600 text-sm">
              এখনও অ্যাকাউন্ট নেই?{' '}
              <Link href="/register" className="text-green-800 font-bold underline decoration-2 underline-offset-4 hover:text-green-950">
                নতুন অ্যাকাউন্ট নিবন্ধন করুন →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
