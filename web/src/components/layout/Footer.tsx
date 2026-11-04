import Link from 'next/link'
import { DishariLogo } from '@/components/shared/DishariLogo'

export default function Footer() {
  return (
    <footer className="border-t-2 border-stone-900 bg-stone-950 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Column 1: Branding */}
          <div>
            <Link href="/" className="inline-block mb-3 group">
              <DishariLogo
                theme="dark"
                className="h-11 sm:h-12 w-auto transition-transform group-hover:scale-105"
              />
            </Link>
            <p className="mt-2 text-stone-300 text-sm leading-relaxed">
              সরকারি সেবাকে প্রতিটি নাগরিকের কাছে সহজ, স্বচ্ছ ও নির্ভুলভাবে পৌঁছে দেওয়ার জাতীয় ডিজিটাল উদ্যোগ।
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-3">দ্রুত লিংক</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services"
                  className="text-green-200 hover:text-white transition-colors"
                >
                  সেবাসমূহ
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-green-200 hover:text-white transition-colors"
                >
                  আমাদের সম্পর্কে
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-green-200 hover:text-white transition-colors"
                >
                  যোগাযোগ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Emergency Helplines */}
          <div>
            <h4 className="text-white font-semibold mb-3">জরুরি হেল্পলাইন</h4>
            <ul className="space-y-2">
              <li className="text-green-200">
                জাতীয় হেল্পলাইন:{' '}
                <span className="text-white font-bold">৩৩৩</span>
              </li>
              <li className="text-green-200">
                জরুরি সেবা:{' '}
                <span className="text-white font-bold">৯৯৯</span>
              </li>
              <li className="text-green-200">
                দুর্নীতি দমন:{' '}
                <span className="text-white font-bold">১০৬</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-green-700 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-green-300 text-sm">
            © ২০২৬ দিশারী। সর্বস্বত্ব সংরক্ষিত।
          </p>
          <p className="text-green-300 text-sm">
            তৈরি করেছে দিশারী টিম
          </p>
        </div>
      </div>
    </footer>
  )
}
