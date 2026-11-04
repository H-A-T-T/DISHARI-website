import type { Metadata } from 'next'
import Link from 'next/link'
import { DishariLogo } from '@/components/shared/DishariLogo'
import { ShieldCheck, ArrowRight, BookOpen, Users, Compass, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'আমাদের সম্পর্কে ও জাতীয় ভিশন | দিশারী',
  description:
    'সরকারি সেবা সহজ ভাষায় দেশের প্রতিটি নাগরিকের কাছে পৌঁছে দেওয়াই দিশারীর একমাত্র লক্ষ্য ও অঙ্গীকার।',
}

const PERSONAS = [
  {
    serial: '০১',
    name: 'রহিম মিয়া',
    tag: 'ভূমি সেবা ও উত্তরাধিকার',
    location: 'নেত্রকোনা',
    story:
      'বাবার মৃত্যুর পর পৈতৃক জমির নামজারি ও খতিয়ান ঠিক করতে হবে। কিন্তু তহশিল অফিস আর ইউনিয়ন ডিজিটাল সেন্টারে কোন কাগজ লাগবে এবং সরকারি ফি কত—তা না জানায় বারবার দালালদের শরণাপন্ন হতে হচ্ছিল।',
  },
  {
    serial: '০২',
    name: 'মোসাম্মৎ রাবেয়া',
    tag: 'শিক্ষা ও উপবৃত্তি',
    location: 'কুড়িগ্রাম',
    story:
      'মেধাবী ছাত্রী হিসেবে প্রধানমন্ত্রীর শিক্ষা সহায়তা ট্রাস্টের উপবৃত্তির জন্য আবেদন করতে চায়। কিন্তু কী কী প্রত্যয়ন লাগবে আর অনলাইন পোর্টালের আবেদনের শেষ সময় কখন—তা আগে থেকে নিশ্চিত হতে পারছিল না।',
  },
  {
    serial: '০৩',
    name: 'সবুজ আহমেদ',
    tag: 'ব্যবসা ও ট্রেড লাইসেন্স',
    location: 'বগুড়া',
    story:
      'নিজের তৈরি কুটির শিল্পজাত পণ্য অনলাইনে বিক্রির জন্য প্রথমবারের মতো ই-ট্রেড লাইসেন্স করতে চান। কিন্তু ইউনিয়ন পরিষদ নাকি পৌরসভায় যেতে হবে আর কত টাকা ফি লাগবে তা নিয়ে বিভ্রান্তিতে ছিলেন।',
  },
  {
    serial: '০৪',
    name: 'ফারুক হোসেন',
    tag: 'প্রবাসী কল্যাণ ও স্মার্ট কার্ড',
    location: 'কুমিল্লা',
    story:
      'সৌদি আরব যাওয়ার ভিসা পেয়েছেন। বিএমইটি (BMET) ইমিগ্রেশন ক্লিয়ারেন্স ও স্মার্ট কার্ডের জন্য বায়োমেট্রিক ও পিডিও সনদের কোনটির পর কোনটি লাগবে তা বুঝতে জেলা কর্মসংস্থান অফিসে ঘুরছিলেন।',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] text-stone-900 font-sans pb-24">
      {/* ─── Editorial Header / Gazette Banner ─────────────────────────────── */}
      <section className="border-b-2 border-stone-900 bg-white pt-10 pb-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Logo & Official Stamp */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-stone-200">
            <Link href="/" className="inline-block group">
              <DishariLogo
                theme="light"
                className="h-11 sm:h-12 w-auto transition-transform group-hover:scale-105"
              />
            </Link>

            <div className="flex items-center gap-2 font-mono text-xs text-stone-600">
              <ShieldCheck className="w-4 h-4 text-green-700" />
              <span>দিশারী ইশতেহার ও নাগরিক অঙ্গীকার ২০২৬</span>
            </div>
          </div>

          <div className="max-w-3xl">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-green-800 block mb-2">
              [ নাগরিক ঘোষণা ও উদ্দেশ্য ]
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-stone-950 tracking-tight leading-tight">
              সরকারি সেবা হবে <span className="text-green-700 underline decoration-green-600/40 decoration-4 underline-offset-8">সহজ, স্বচ্ছ ও মধ্যস্বত্বভোগীহীন</span>
            </h1>
            <p className="text-base sm:text-xl text-stone-700 mt-5 leading-relaxed font-normal">
              দেশের ১৭ কোটি নাগরিকের কারও জন্যই যেন সরকারি সেবা লাভ কোনো জটিল বা ভীতিকর অভিজ্ঞতা না হয়—সেই লক্ষ্যেই দিশারীর সৃষ্টি।
            </p>
          </div>
        </div>
      </section>

      {/* ─── Main Content ─────────────────────────────────────────────────── */}
      <main className="max-w-5xl mx-auto px-4 py-12 space-y-16">
        {/* The Core Manifesto Quote */}
        <section className="border-2 border-stone-900 bg-white p-6 sm:p-10 shadow-[6px_6px_0_0_#059669]">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-stone-500 block mb-3">
            [ দিশারীর মূল দর্শন ]
          </span>
          <blockquote className="text-xl sm:text-2xl lg:text-3xl font-black text-stone-950 leading-snug">
            &ldquo;সরকারি সেবা পাওয়ার জন্য মানুষকে সরকারি ব্যবস্থার জটিল ভাষা বুঝতে হবে না; বরং আধুনিক প্রযুক্তি মানুষের সহজ ভাষায় সরকারি সেবাকে বুঝিয়ে দেবে।&rdquo;
          </blockquote>
          <div className="mt-4 pt-4 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500 font-mono">
            <span>জাতীয় ডিজিটাল সিটিজেন ইনিশিয়েটিভ</span>
            <span>ঢাকা, বাংলাদেশ</span>
          </div>
        </section>

        {/* Problem & Solution (Editorial Broadside Split) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Problem */}
          <div className="border-2 border-stone-900 bg-stone-100 p-6 sm:p-8 shadow-[4px_4px_0_0_#1c1917]">
            <div className="flex items-center gap-2 pb-3 mb-3 border-b-2 border-stone-900">
              <span className="font-mono text-xs font-bold uppercase text-red-700">[ বর্তমান বাস্তবতা ]</span>
              <h2 className="text-xl sm:text-2xl font-black text-stone-950">বিদ্যমান সংকট ও হয়রানি</h2>
            </div>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              বাংলাদেশে এখনো বহু নাগরিক NID সংশোধন, জন্মনিবন্ধন, পাসপোর্ট কিংবা ভাতা আবেদনের জন্য ঘণ্টার পর ঘণ্টা ইউনিয়ন বা উপজেলা বাজারের কম্পিউটার দোকানে গিয়ে বসে থাকেন। তথ্যের অভাবে জানা থাকে না কোন কাজের জন্য মূল কাগজ লাগবে আর কোনটির ফটোকপি। একটি কাগজের জন্য মানুষ গ্রাম থেকে শহরে গিয়ে ফিরে আসেন। এতে প্রতিদিন নষ্ট হয় হাজার হাজার কর্মঘণ্টা ও শ্রমিকের কষ্টার্জিত অর্থ।
            </p>
          </div>

          {/* Solution */}
          <div className="border-2 border-stone-900 bg-white p-6 sm:p-8 shadow-[4px_4px_0_0_#059669]">
            <div className="flex items-center gap-2 pb-3 mb-3 border-b-2 border-stone-900">
              <span className="font-mono text-xs font-bold uppercase text-green-700">[ দিশারীর সমাধান ]</span>
              <h2 className="text-xl sm:text-2xl font-black text-stone-950">স্বচ্ছ তথ্য ও স্মার্ট অটোমেশন</h2>
            </div>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              দিশারী এমন এক উন্মুক্ত প্ল্যাটফর্ম যেখানে একজন সাধারণ মানুষ শুধু তার কাঙ্ক্ষিত সেবাটি নির্বাচন করলেই জানতে পারেন—সঠিক সরকারি ফি কত, কয়টি কাগজ লাগবে, কোন অফিসে যেতে হবে এবং ধাপে ধাপে কীভাবে আবেদন করতে হবে। একবার নিজের নথিপত্র দিশারী নিরাপদ লকারে সংরক্ষণ করলে যেকোনো সরকারি ফরম এক ক্লিকে স্বয়ংক্রিয়ভাবে পূরণ হয়ে যায়।
            </p>
          </div>
        </section>

        {/* ─── Case Dossiers / বাস্তব জীবনের চার নাগরিকের গল্প ──────────────── */}
        <section>
          <div className="border-b-2 border-stone-900 pb-3 mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-stone-500">
                [ নাগরিক কেস স্টাডি ]
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-950">
                যাদের বাস্তব প্রয়োজনে দিশারীর সৃষ্টি
              </h2>
            </div>
            <span className="font-mono text-xs font-bold text-stone-500">
              ৪টি প্রধান নাগরিক প্রেক্ষিত
            </span>
          </div>

          {/* Civic Ledger Rows (NO AI Cards!) */}
          <div className="border-y-2 border-stone-900 divide-y-2 divide-stone-200 bg-white">
            {PERSONAS.map((persona) => (
              <div key={persona.name} className="p-5 sm:p-7 hover:bg-stone-50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                  {/* Serial Flag */}
                  <div className="font-mono text-lg sm:text-xl font-black text-stone-400 shrink-0 w-8">
                    {persona.serial}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-xs font-mono font-bold text-stone-950 uppercase bg-stone-100 px-2 py-0.5 border border-stone-300">
                        [{persona.tag}]
                      </span>
                      <span className="text-xs text-stone-500 font-semibold">
                        অঞ্চল: {persona.location}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-stone-950">
                      {persona.name}
                    </h3>

                    <p className="text-sm sm:text-base text-stone-700 leading-relaxed mt-2">
                      &ldquo;{persona.story}&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── The National Vision Charter ──────────────────────────────────── */}
        <section className="border-2 border-stone-900 bg-stone-950 text-white p-8 sm:p-12 shadow-[8px_8px_0_0_#059669]">
          <span className="font-mono text-xs text-green-400 font-bold uppercase tracking-widest block mb-2">
            [ ভবিষ্যৎ রূপরেখা ]
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            আমাদের চূড়ান্ত ভিশন
          </h2>
          <p className="text-stone-300 text-base sm:text-xl mt-4 leading-relaxed max-w-3xl">
            একটি সমন্বিত প্ল্যাটফর্ম, যেখানে একজন নাগরিক বাংলায় শুধু বলবেন —{' '}
            <strong className="text-white underline decoration-green-500 underline-offset-4">&ldquo;আমি কী করতে চাই?&rdquo;</strong>
            <br />
            আর দিশারী এআই তাকে সরাসরি দেখিয়ে দেবে —{' '}
            <strong className="text-green-400">&ldquo;কী কী কাগজ লাগবে, কোথায় যেতে হবে, সরকারি ফি কত এবং কীভাবে আবেদন করতে হবে।&rdquo;</strong>
          </p>

          <div className="mt-8 pt-6 border-t border-stone-800 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-mono text-stone-400">
              দিশারী কোর টিম · উন্নত বাংলাদেশ বিনির্মাণে প্রযুক্তি
            </span>
            <Link
              href="/services"
              className="border-2 border-white bg-green-700 hover:bg-green-600 text-white font-bold px-6 py-3 text-sm transition-colors inline-flex items-center gap-2"
            >
              <span>সকল সরকারি সেবা দেখুন</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
