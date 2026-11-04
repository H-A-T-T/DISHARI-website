import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'আমাদের সম্পর্কে | দিশারী',
  description: 'সরকারি সেবা সহজ ভাষায় মানুষের কাছে পৌঁছে দেওয়াই দিশারীর লক্ষ্য।',
}

export default function AboutPage() {
  const personas = [
    { name: 'রহিম', story: 'বাবার মৃত্যুর পর জমির কাগজপত্র ঠিক করতে হবে, কিন্তু কোথায় কীভাবে করবে বুঝতে পারছে না।' },
    { name: 'রাবেয়া', story: 'উপবৃত্তির জন্য অনলাইনে আবেদন করতে চায়, কিন্তু কোথায় আবেদন করবে এবং কী কী কাগজ লাগবে জানে না।' },
    { name: 'সবুজ', story: 'নিজের বানানো পণ্য বিক্রির জন্য ট্রেড লাইসেন্স করতে চান, কিন্তু প্রক্রিয়া বুঝতে পারছেন না।' },
    { name: 'ফারুক', story: 'সৌদি আরব প্রবাসী। দেশে তার এলাকায় প্রবাসী কল্যাণের কী কী সুযোগ আছে জানেন না।' },
  ]

  return (
    <section className="py-12 lg:py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-stone-900">আমাদের সম্পর্কে</h1>

        {/* Mission Quote */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 lg:p-8 mt-8">
          <p className="text-green-800 text-lg leading-relaxed italic">
            &ldquo;সরকারি সেবা পাওয়ার জন্য মানুষকে সরকারি ব্যবস্থার ভাষা বুঝতে হবে না; বরং প্রযুক্তি মানুষের ভাষায়
            সরকারি সেবাকে বুঝিয়ে দেবে।&rdquo;
          </p>
        </div>

        {/* Problem */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-stone-900">সমস্যা</h2>
          <p className="text-stone-600 leading-relaxed mt-4">
            বাংলাদেশে এখনো অনেক মানুষ NID সংশোধন, জন্মনিবন্ধন, পাসপোর্ট, সরকারি ভাতা, স্কলারশিপসহ বিভিন্ন সরকারি সেবা
            নিতে কম্পিউটার অপারেটরের দোকানে যান। অনেক সময় মানুষ জানেন না কোন কাজের জন্য কোন কাগজ লাগবে, কোন কাগজের মূল
            কপি লাগবে, কোনটার ফটোকপি লাগবে, আবেদন করার শেষ তারিখ কখন, কিংবা তার কোনো সরকারি সুবিধা পাওয়ার সুযোগ আছে কি
            না। ফলে একটি গুরুত্বপূর্ণ ডকুমেন্ট বাসায় রেখে এলে তাকে আবার বাড়িতে ফিরে যেতে হয়। এতে সময়, টাকা এবং
            পরিশ্রম—সবই নষ্ট হয়।
          </p>
        </div>

        {/* Solution */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-stone-900">আমাদের সমাধান</h2>
          <p className="text-stone-600 leading-relaxed mt-4">
            দিশারী এমন একটি প্ল্যাটফর্ম যেখানে একজন সাধারণ মানুষ তার প্রয়োজনীয় সরকারি কাজটি নির্বাচন করলেই জানতে
            পারবেন — কী কী কাগজ লাগবে, কোথায় যেতে হবে, কীভাবে আবেদন করতে হবে এবং কখন করতে হবে। নথিপত্র একবার সেভ করলে
            আমরা স্বয়ংক্রিয়ভাবে ফর্ম পূরণ করে দিই — মানুষকে আর কম্পিউটার দোকানে ছোটাছুটি করতে হয় না।
          </p>
        </div>

        {/* Personas */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-stone-900">যারা এই সেবা থেকে উপকৃত হবেন</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {personas.map((persona) => (
              <div key={persona.name} className="bg-white rounded-2xl p-5 border border-stone-200">
                <p className="font-semibold text-stone-800 text-lg">{persona.name}</p>
                <p className="text-stone-500 mt-2 leading-relaxed text-sm">{persona.story}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Vision */}
        <div className="mt-12 bg-stone-900 text-white rounded-2xl p-6 lg:p-8 text-center">
          <h2 className="text-2xl font-bold">আমাদের ভিশন</h2>
          <p className="text-stone-300 mt-4 leading-relaxed max-w-2xl mx-auto text-lg">
            একটি অ্যাপ, যেখানে একজন নাগরিক শুধু বলবেন —{' '}
            <span className="text-white font-semibold">&ldquo;আমি কী করতে চাই?&rdquo;</span>
            <br />
            আর প্ল্যাটফর্ম তাকে বলে দেবে —{' '}
            <span className="text-green-400 font-semibold">
              &ldquo;কী লাগবে, কোথায় করতে হবে, কীভাবে করতে হবে এবং কখন করতে হবে।&rdquo;
            </span>
          </p>
        </div>

        {/* Team */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-stone-900">আমাদের টিম</h2>
          <p className="text-stone-400 mt-4">শীঘ্রই আপডেট আসছে...</p>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-xl px-8 h-12 font-semibold transition-colors"
          >
            সেবা দেখুন →
          </Link>
        </div>
      </div>
    </section>
  )
}
