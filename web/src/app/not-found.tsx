import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <p className="text-8xl font-extrabold text-stone-200">৪০৪</p>
      <h1 className="text-xl font-medium text-stone-700 mt-4">পৃষ্ঠাটি খুঁজে পাওয়া যায়নি</h1>
      <p className="text-stone-500 mt-2 text-center">আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি পাওয়া যায়নি।</p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center bg-green-600 hover:bg-green-700 text-white rounded-xl px-6 h-12 font-medium transition-colors"
      >
        হোম পেজে ফিরে যান →
      </Link>
    </div>
  )
}
