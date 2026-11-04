'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FileText, ClipboardList, Search, ArrowRight } from 'lucide-react'

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 6) return 'শুভ রাত্রি'
  if (hour < 12) return 'সুপ্রভাত'
  if (hour < 17) return 'শুভ দুপুর'
  if (hour < 20) return 'শুভ সন্ধ্যা'
  return 'শুভ রাত্রি'
}

export default function DashboardPage() {
  const [greeting, setGreeting] = useState('স্বাগতম')

  useEffect(() => {
    setGreeting(getGreeting())
  }, [])

  return (
    <section className="py-6 lg:py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Greeting Card */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-3xl p-6 lg:p-8">
          <h1 className="text-2xl lg:text-3xl font-bold">
            {greeting} 👋
          </h1>
          <p className="text-green-100 mt-2">আপনার ড্যাশবোর্ডে স্বাগতম</p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
          {/* Documents Card */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-900">আমার নথিপত্র</h3>
                  <p className="text-sm text-stone-500 mt-0.5">আপনার গুরুত্বপূর্ণ নথিপত্র সেভ করুন</p>
                </div>
              </div>
              <span className="bg-amber-100 text-amber-700 rounded-full px-3 py-1 text-xs font-medium">
                শীঘ্রই আসছে
              </span>
            </div>
            <button
              disabled
              className="mt-4 w-full border-2 border-dashed border-stone-200 rounded-xl h-12 text-sm text-stone-400 cursor-not-allowed"
            >
              নথি আপলোড করুন
            </button>
          </div>

          {/* Applications Card */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                  <ClipboardList className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-900">আমার আবেদনসমূহ</h3>
                  <p className="text-sm text-stone-500 mt-0.5">আপনার সকল আবেদনের স্ট্যাটাস দেখুন</p>
                </div>
              </div>
              <span className="bg-amber-100 text-amber-700 rounded-full px-3 py-1 text-xs font-medium">
                শীঘ্রই আসছে
              </span>
            </div>
            <div className="mt-4 flex items-center justify-center h-12 text-sm text-stone-400">
              কোনো সক্রিয় আবেদন নেই
            </div>
          </div>

          {/* Browse Services Card */}
          <div className="lg:col-span-2 bg-green-50 border border-green-200 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <Search className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-900">কোন সেবা দরকার?</h3>
                  <p className="text-sm text-stone-500 mt-0.5">৫০+ সরকারি সেবা এক জায়গায়</p>
                </div>
              </div>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-xl px-5 h-10 font-medium transition-colors text-sm"
              >
                সেবা খুঁজুন
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
