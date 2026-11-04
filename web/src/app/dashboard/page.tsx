'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FileText, ClipboardList, Search, ArrowRight, ShieldCheck, FolderLock } from 'lucide-react'

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
    <div className="min-h-screen bg-[#FAFAF8] text-stone-900 font-sans pb-24">
      {/* ─── Top Docket Header ─────────────────────────────────────────────── */}
      <section className="border-b-2 border-stone-900 bg-white pt-8 pb-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-stone-200">
            <Link href="/" className="inline-block bg-white p-2 border-2 border-stone-900 shadow-[3px_3px_0_0_#1c1917]">
              <Image
                src="/dishari_logo.svg"
                alt="দিশারী"
                width={130}
                height={52}
                className="h-9 w-auto object-contain"
                priority
              />
            </Link>

            <div className="flex items-center gap-2 font-mono text-xs text-stone-600">
              <ShieldCheck className="w-4 h-4 text-green-700" />
              <span>নাগরিক প্রোফাইল কার্যপত্র · আইডি: BD-USER-782</span>
            </div>
          </div>

          <div className="border-2 border-stone-900 bg-stone-950 text-white p-6 sm:p-8 shadow-[6px_6px_0_0_#059669]">
            <span className="font-mono text-xs text-green-400 font-bold uppercase tracking-wider block mb-1">
              [ নাগরিক ড্যাশবোর্ড ]
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-white">
              {greeting}, নাগরিক 👋
            </h1>
            <p className="text-stone-300 mt-2 text-sm sm:text-base leading-relaxed">
              আপনার সংরক্ষিত নথিপত্র, চলমান আবেদন ও প্রয়োজনীয় সরকারি সেবা নির্দেশিকা এক জায়গায় নিয়ন্ত্রিত।
            </p>
          </div>
        </div>
      </section>

      {/* ─── Workbench Grid (NO AI Cards, Structural Civic Broadside) ──────── */}
      <main className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Document Locker */}
          <div className="border-2 border-stone-900 bg-white p-6 sm:p-7 shadow-[4px_4px_0_0_#1c1917] flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-2 pb-3 mb-4 border-b border-stone-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 border border-stone-900 bg-stone-100 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-stone-950">আমার নথিপত্র</h3>
                    <p className="text-xs text-stone-500">এনআইডি, জন্ম সনদ ও সনদপত্র</p>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 border border-amber-300">
                  [ শীঘ্রই আসছে ]
                </span>
              </div>
              <p className="text-sm text-stone-600 leading-relaxed">
                আপনার কাগজপত্র এখানে সুরক্ষিত ভল্টে সেভ করে রাখলে ভবিষ্যতে যেকোনো সরকারি ফর্মে এক ক্লিকে স্বয়ংক্রিয়ভাবে পূরণ হয়ে যাবে।
              </p>
            </div>

            <button
              disabled
              className="mt-6 w-full border-2 border-dashed border-stone-300 bg-stone-50 h-12 text-sm text-stone-400 font-bold cursor-not-allowed flex items-center justify-center gap-2"
            >
              <FolderLock className="w-4 h-4" />
              <span>নথি আপলোড করুন (লকার সক্রিয় হচ্ছে)</span>
            </button>
          </div>

          {/* Active Applications */}
          <div className="border-2 border-stone-900 bg-white p-6 sm:p-7 shadow-[4px_4px_0_0_#1c1917] flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-2 pb-3 mb-4 border-b border-stone-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 border border-stone-900 bg-stone-100 flex items-center justify-center">
                    <ClipboardList className="w-5 h-5 text-purple-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-stone-950">আমার আবেদনসমূহ</h3>
                    <p className="text-xs text-stone-500">চলমান ও সম্পন্ন আবেদন ট্র্যাকিং</p>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 border border-amber-300">
                  [ শীঘ্রই আসছে ]
                </span>
              </div>
              <p className="text-sm text-stone-600 leading-relaxed">
                পাসপোর্ট, জমির নামজারি বা ভাতার জন্য আপনি যেসব আবেদন করেছেন তার বর্তমান অগ্রগতি ও পরবর্তী করণীয় ধাপ এখানে প্রদর্শিত হবে।
              </p>
            </div>

            <div className="mt-6 border-2 border-stone-200 bg-stone-50 h-12 text-xs text-stone-500 font-bold flex items-center justify-center">
              বর্তমানে কোনো সক্রিয় সরকারি আবেদন প্রক্রিয়াধীন নেই
            </div>
          </div>

          {/* Service Directory Callout */}
          <div className="lg:col-span-2 border-2 border-stone-900 bg-stone-100 p-6 sm:p-8 shadow-[4px_4px_0_0_#1c1917]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 border-2 border-stone-900 bg-white flex items-center justify-center shrink-0">
                  <Search className="w-6 h-6 text-green-700" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-stone-950">কোন সরকারি সেবাটি আপনার প্রয়োজন?</h3>
                  <p className="text-sm text-stone-600 mt-1 leading-relaxed max-w-xl">
                    পাসপোর্ট, এনআইডি সংশোধন, ভূমি নামজারি, উপবৃত্তি, ট্রেড লাইসেন্স ও ভাতাসহ সকল সরকারি সেবার নির্দেশিকা ও সঠিক ফি দেখে নিন।
                  </p>
                </div>
              </div>

              <Link
                href="/services"
                className="border-2 border-stone-900 bg-green-700 hover:bg-green-800 text-white px-6 py-3 font-bold text-sm shrink-0 transition-colors shadow-[3px_3px_0_0_#1c1917] inline-flex items-center justify-center gap-2"
              >
                <span>সকল সেবা তালিকা দেখুন</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
