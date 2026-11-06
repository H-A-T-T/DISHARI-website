'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { DishariLogo } from '@/components/shared/DishariLogo'
import { Eye, EyeOff, Phone, Mail, ShieldCheck, ArrowRight, Loader2, AlertCircle } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { t } from '@/lib/translations'
import { loginUser } from '@/lib/api'

export default function LoginPage() {
  const { lang } = useLanguage()
  const router = useRouter()

  const [mode, setMode] = useState<'phone' | 'email'>('phone')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const identifier = mode === 'phone' ? phone.trim() : email.trim()
    if (!identifier) {
      setError(
        lang === 'bn'
          ? (mode === 'phone' ? 'মোবাইল নম্বর লিখুন' : 'ইমেইল ঠিকানা লিখুন')
          : (mode === 'phone' ? 'Please enter your phone number' : 'Please enter your email')
      )
      return
    }

    setLoading(true)

    try {
      const res = await loginUser({
        identifier,
        password: password || undefined,
      })

      if (!res.success) {
        setError(res.error || (lang === 'bn' ? 'লগইন ব্যর্থ হয়েছে' : 'Login failed'))
        setLoading(false)
        return
      }

      if (res.user) {
        localStorage.setItem('dishari_user', JSON.stringify(res.user))
        localStorage.setItem('dishari_logged_in', 'true')
      }

      router.push('/dashboard')
    } catch {
      setError(lang === 'bn' ? 'নেটওয়ার্ক সমস্যা হয়েছে' : 'Network error occurred')
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#F5F6F8] text-neutral-900 font-sans">
      {/* ─── Left Brand Panel — Deep Bangladesh Green ─────────────────────── */}
      <div className="hidden lg:flex w-1/2 bg-[#004D38] text-white flex-col justify-between p-12 lg:p-16 border-r border-[#006A4E] relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#C8102E]" />

        <div>
          <Link href="/" className="inline-block group mb-4">
            <DishariLogo
              theme="dark"
              lang={lang}
              className="h-9 sm:h-10 w-auto transition-transform group-hover:scale-[1.02]"
            />
          </Link>

          <div className="mt-12 max-w-md">
            <span className="inline-block px-2.5 py-0.5 bg-[#C8102E] text-white text-[11px] font-bold uppercase tracking-wider mb-2.5 rounded-none">
              {t('auth', 'leftBadge', lang)}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
              {t('auth', 'leftHeadline', lang)}
            </h1>
            <p className="text-emerald-100 mt-3 text-sm sm:text-base leading-relaxed font-normal">
              {t('auth', 'leftDesc', lang)}
            </p>
          </div>
        </div>

        {/* Civic Testimonial Box — Flat paper panel */}
        <div className="border border-[#0D8262] bg-[#003627] p-5 max-w-md rounded-none shadow-xs">
          <div className="flex items-center gap-2 text-emerald-300 text-xs font-mono font-bold mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>{t('auth', 'testimonialBadge', lang)}</span>
          </div>
          <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed italic">
            "{t('auth', 'testimonialText', lang)}"
          </p>
          <p className="text-emerald-300/80 text-xs mt-2.5 font-semibold">
            — {t('auth', 'testimonialAuthor', lang)}
          </p>
        </div>

        {/* Bottom gazette note */}
        <div className="font-mono text-xs text-emerald-200/70 font-medium">
          {t('auth', 'gazetteNote', lang)}
        </div>
      </div>

      {/* ─── Right Form Panel — Flat Windows 10 Paper Surface ─────────────── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-12 sm:px-8">
        <div className="w-full max-w-md bg-white border border-neutral-200 p-7 sm:p-8 rounded-none shadow-xs">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-6">
            <Link href="/" className="inline-block">
              <DishariLogo
                theme="light"
                lang={lang}
                className="h-8 w-auto"
              />
            </Link>
          </div>

          <div className="border-b border-neutral-200 pb-3 mb-5">
            <span className="font-mono text-xs font-bold text-[#006A4E] uppercase tracking-wider block mb-1">
              {t('auth', 'leftBadge', lang)}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">
              {t('auth', 'loginHeader', lang)}
            </h2>
            <p className="text-neutral-500 text-xs sm:text-sm mt-0.5">
              {t('auth', 'loginSub', lang)}
            </p>
          </div>

          {error && (
            <div className="mb-4 border border-red-300 bg-red-50 text-[#C8102E] p-3 text-xs sm:text-sm font-semibold flex items-center gap-2 rounded-none">
              <AlertCircle className="w-4 h-4 shrink-0 text-[#C8102E]" />
              <span>{error}</span>
            </div>
          )}

          {/* Mode Toggle — Windows 10 Flat Segmented Control */}
          <div className="grid grid-cols-2 border border-neutral-300 bg-neutral-100 p-0.5 mb-5 rounded-none">
            <button
              type="button"
              onClick={() => {
                setMode('phone')
                setError(null)
              }}
              className={`flex items-center justify-center gap-1.5 py-2 text-xs font-bold transition-colors cursor-pointer rounded-none ${
                mode === 'phone'
                  ? 'bg-[#006A4E] text-white'
                  : 'text-neutral-700 hover:text-neutral-950'
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{t('auth', 'tabPhone', lang)}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('email')
                setError(null)
              }}
              className={`flex items-center justify-center gap-1.5 py-2 text-xs font-bold transition-colors cursor-pointer rounded-none ${
                mode === 'email'
                  ? 'bg-[#006A4E] text-white'
                  : 'text-neutral-700 hover:text-neutral-950'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{t('auth', 'tabEmail', lang)}</span>
            </button>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {mode === 'phone' ? (
              <>
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
                    className="h-11 w-full border border-neutral-300 bg-white px-3.5 text-sm font-medium focus:border-[#006A4E] outline-none transition-colors placeholder:text-neutral-400 font-mono rounded-none"
                  />
                  <p className="text-xs text-neutral-500 mt-1 font-mono">
                    {lang === 'bn'
                      ? 'আমরা আপনার নম্বরে একটি গোপন ওটিপি (OTP) পাঠাব।'
                      : 'We will send a confidential one-time password (OTP) to your phone.'}
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full border border-[#006A4E] bg-[#006A4E] hover:bg-[#004D38] disabled:bg-neutral-400 text-white h-11 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2 rounded-none"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>{t('auth', 'otpBtn', lang)}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    {t('auth', 'emailLabel', lang)} <span className="text-[#C8102E]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('auth', 'emailPlaceholder', lang)}
                    className="h-11 w-full border border-neutral-300 bg-white px-3.5 text-sm font-medium focus:border-[#006A4E] outline-none transition-colors placeholder:text-neutral-400 rounded-none"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-700">
                      {t('auth', 'passwordLabel', lang)} <span className="text-[#C8102E]">*</span>
                    </label>
                    <button type="button" className="text-xs text-[#006A4E] font-semibold hover:underline cursor-pointer">
                      {t('auth', 'forgotPassword', lang)}
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t('auth', 'passwordPlaceholder', lang)}
                      className="h-11 w-full border border-neutral-300 bg-white px-3.5 pr-11 text-sm font-medium focus:border-[#006A4E] outline-none transition-colors placeholder:text-neutral-400 rounded-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 cursor-pointer"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full border border-[#006A4E] bg-[#006A4E] hover:bg-[#004D38] disabled:bg-neutral-400 text-white h-11 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2 rounded-none"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>{t('auth', 'loginBtn', lang)}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </>
            )}
          </form>

          {/* Footer Navigation */}
          <div className="mt-7 pt-4 border-t border-neutral-100 text-center text-xs text-neutral-600">
            <span>{t('auth', 'noAccount', lang)} </span>
            <Link
              href="/register"
              className="text-[#006A4E] font-bold hover:underline transition-colors ml-1"
            >
              {t('auth', 'registerLink', lang)}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
