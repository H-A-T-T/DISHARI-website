import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 bg-[#FAFAF8] py-16">
      <div className="border-2 border-stone-900 bg-white p-8 sm:p-12 text-center max-w-lg shadow-[6px_6px_0_0_#1c1917]">
        <div className="mb-4 inline-block bg-white p-2 border border-stone-300">
          <Image
            src="/dishari_logo.svg"
            alt="দিশারী"
            width={120}
            height={48}
            className="h-8 w-auto object-contain"
          />
        </div>
        <p className="font-mono text-6xl sm:text-7xl font-black text-stone-300 tracking-wider">
          ৪০৪
        </p>
        <h1 className="text-2xl font-black text-stone-950 mt-2">
          কাঙ্ক্ষিত পৃষ্ঠাটি পাওয়া যায়নি
        </h1>
        <p className="text-stone-600 mt-2 text-sm leading-relaxed">
          আপনি যে লিঙ্ক বা কার্যপত্রটি খুঁজছেন তা স্থানান্তরিত হয়েছে অথবা লিঙ্কটি সঠিক নয়।
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 border-2 border-stone-900 bg-stone-900 hover:bg-green-700 text-white px-6 py-3 font-bold text-sm transition-colors shadow-[3px_3px_0_0_#1c1917]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>
    </div>
  )
}
