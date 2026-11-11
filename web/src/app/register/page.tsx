'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { DishariLogo } from '@/components/shared/DishariLogo'
import { Eye, EyeOff, ArrowRight, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { t } from '@/lib/translations'
import { registerUser } from '@/lib/api'

export default function RegisterPage() {
  const { lang } = useLanguage()
  const router = useRouter()

  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!fullName.trim() || !phone.trim() || !password) {
      setError(t('auth', 'errorRequired', lang))
      return
    }

    const cleanPhone = phone.trim().replace(/\s+/g, '')
    if (cleanPhone.length < 11) {
      setError(t('auth', 'errorPhone', lang))
      return
    }

    if (password.length < 6) {
      setError(t('auth', 'errorPasswordLength', lang))
      return
    }

    if (password !== confirmPassword) {
      setError(t('auth', 'errorPasswordMatch', lang))
      return
    }

    setLoading(true)

    try {
      const res = await registerUser({
        fullName: fullName.trim(),
        phone: cleanPhone,
        email: email.trim() || undefined,
        password,
      })

      if (!res.success) {
        setError(res.error || (lang === 'bn' ? 'নিবন্ধন ব্যর্থ হয়েছে' : 'Registration failed'))
        setLoading(false)
        return
      }

      if (res.user) {
        localStorage.setItem('dishari_user', JSON.stringify(res.user))
        localStorage.setItem('dishari_logged_in', 'true')
      }

      setSuccess(true)
      setTimeout(() => {
        router.push('/dashboard')
      }, 700)
    } catch {
      setError(lang === 'bn' ? 'নেটওয়ার্ক সমস্যা হয়েছে, পুনরায় চেষ্টা করুন' : 'Network error, please try again')
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#F5F6F8] text-neutral-900 font-sans">
      {/* ─── Left Brand Panel — Deep Bangladesh Green ─────────────────────── */}
      <div className="hidden lg:flex w-1/2 bg-[#004D38] text-white flex-col justify-between p-12 lg:p-16 border-r border-[#006A4E] relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#C8102E]" />

        <div>
          <Link href="/" className="inline-block group mb-4 win-press">
            <DishariLogo
              theme="dark"
              lang={lang}
              className="h-9 sm:h-10 w-auto transition-transform group-hover:scale-[1.02]"
            />
          </Link>

          <div className="mt-12 max-w-md">
            <span className="inline-block px-2.5 py-0.5 bg-[#C8102E] text-white text-[11px] font-bold uppercase tracking-wider mb-2.5 rounded-none">
              {lang === 'bn' ? 'বিনামূল্যে নাগরিক নিবন্ধন' : 'Free Citizen Registration'}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
              {lang === 'bn'
                ? 'এক ক্লিকে সকল সরকারি সেবা হাতের মুঠোয়'
                : 'All Government Services in One Click'}
            </h1>
            <p className="text-emerald-100 mt-3 text-sm sm:text-base leading-relaxed font-normal">
              {lang === 'bn'
                ? 'একটি অ্যাকাউন্ট তৈরি করুন এবং কম্পিউটার দোকানের দীর্ঘ লাইন ও হয়রানি থেকে মুক্তি পান।'
                : 'Create an account and free yourself from long queues and hassle at computer shops.'}
            </p>
          </div>
        </div>

        {/* Feature Highlights — Flat paper panel */}
        <div className="border border-[#0D8262] bg-[#003627] p-5 max-w-md space-y-3 rounded-none shadow-xs">
          <div className="flex items-start gap-2.5">
            <span className="font-mono text-xs font-bold text-emerald-300 pt-0.5">
              {lang === 'bn' ? '১.' : '1.'}
            </span>
            <span className="text-xs sm:text-sm text-emerald-100 font-medium">
              {lang === 'bn'
                ? 'ডিজিটাল লকার: এনআইডি, জন্ম সনদ ও ছবি সুরক্ষিতভাবে সংরক্ষণ করুন।'
                : 'Digital Locker: Store NID, Birth Certificate, and photos securely.'}
            </span>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="font-mono text-xs font-bold text-emerald-300 pt-0.5">
              {lang === 'bn' ? '২.' : '2.'}
            </span>
            <span className="text-xs sm:text-sm text-emerald-100 font-medium">
              {lang === 'bn'
                ? 'অটো-ডকেট তৈরি: যেকোনো সরকারি ফর্মের জন্য মুহূর্তেই প্রস্তুত কার্যপত্র।'
                : 'Auto-Docket: Instant pre-filled applications ready for direct submission.'}
            </span>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="font-mono text-xs font-bold text-emerald-300 pt-0.5">
              {lang === 'bn' ? '৩.' : '3.'}
            </span>
            <span className="text-xs sm:text-sm text-emerald-100 font-medium">
              {lang === 'bn'
                ? 'সরকারি ফি ও সময়সীমা ট্র্যাকিং: কোনো অতিরিক্ত খরচ ছাড়া সঠিক সেবা।'
                : 'Official Fee & Deadline Tracking: Guaranteed official charges only.'}
            </span>
          </div>
        </div>
      </div>

      {/* ─── Right Form Panel ──────────────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 lg:p-16">
        <div className="w-full max-w-md border border-neutral-200 bg-white p-7 sm:p-9 rounded-none shadow-xs">
          {/* Header */}
          <div className="mb-6">
            <span className="font-mono text-xs text-[#006A4E] font-bold uppercase tracking-wider block mb-1">
              {lang === 'bn' ? 'নতুন নাগরিক অ্যাকাউন্ট' : 'Citizen Registration'}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">
              {t('auth', 'registerHeader', lang)}
            </h2>
            <p className="text-neutral-500 text-xs sm:text-sm mt-0.5">
              {t('auth', 'registerSub', lang)}
            </p>
          </div>

          {error && (
            <div className="mb-4 border border-red-300 bg-red-50 text-[#C8102E] p-3 text-xs sm:text-sm font-semibold flex items-center gap-2 rounded-none">
              <AlertCircle className="w-4 h-4 shrink-0 text-[#C8102E]" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-4 border border-emerald-300 bg-emerald-50 text-[#006A4E] p-3 text-xs sm:text-sm font-bold flex items-center gap-2 rounded-none">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-[#006A4E]" />
              <span>
                {lang === 'bn' ? 'নিবন্ধন সফল হয়েছে! ড্যাশবোর্ডে নিয়ে যাওয়া হচ্ছে...' : 'Registration successful! Redirecting to workspace...'}
              </span>
            </div>
          )}

          <form className="space-y-3.5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                {t('auth', 'fullNameLabel', lang)} <span className="text-[#C8102E]">*</span>
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={t('auth', 'fullNamePlaceholder', lang)}
                className="h-10 w-full border border-neutral-300 bg-white px-3 text-sm font-medium focus:border-[#006A4E] outline-none transition-colors placeholder:text-neutral-400 rounded-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                {t('auth', 'phoneLabel', lang)} <span className="text-[#C8102E]">*</span>
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t('auth', 'phonePlaceholder', lang)}
                className="h-10 w-full border border-neutral-300 bg-white px-3 text-sm font-medium focus:border-[#006A4E] outline-none transition-colors placeholder:text-neutral-400 font-mono rounded-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                {t('auth', 'emailLabel', lang)}{' '}
                <span className="text-neutral-400 font-normal font-sans">
                  {t('auth', 'optional', lang)}
                </span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('auth', 'emailPlaceholder', lang)}
                className="h-10 w-full border border-neutral-300 bg-white px-3 text-sm font-medium focus:border-[#006A4E] outline-none transition-colors placeholder:text-neutral-400 rounded-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                {t('auth', 'passwordLabel', lang)} <span className="text-[#C8102E]">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('auth', 'passwordPlaceholder', lang)}
                  className="h-10 w-full border border-neutral-300 bg-white px-3 pr-10 text-sm font-medium focus:border-[#006A4E] outline-none transition-colors placeholder:text-neutral-400 rounded-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 cursor-pointer win-press"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                {t('auth', 'confirmPasswordLabel', lang)} <span className="text-[#C8102E]">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={t('auth', 'confirmPasswordPlaceholder', lang)}
                  className="h-10 w-full border border-neutral-300 bg-white px-3 pr-10 text-sm font-medium focus:border-[#006A4E] outline-none transition-colors placeholder:text-neutral-400 rounded-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 cursor-pointer win-press"
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-5 w-full border border-[#006A4E] bg-[#006A4E] hover:bg-[#004D38] disabled:bg-neutral-400 text-white h-11 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2 rounded-none win-btn"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{t('auth', 'submitting', lang)}</span>
                </>
              ) : (
                <>
                  <span>{t('auth', 'registerBtn', lang)}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer Navigation */}
          <div className="mt-7 pt-4 border-t border-neutral-100 text-center text-xs text-neutral-600">
            <span>{t('auth', 'hasAccount', lang)} </span>
            <Link
              href="/login"
              className="text-[#006A4E] font-bold hover:underline transition-colors ml-1 win-press"
            >
              {t('auth', 'loginLink', lang)}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
