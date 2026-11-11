'use client'

import { useState } from 'react'
import { ShieldCheck, User, Phone, Mail, MapPin, LogOut, Check } from 'lucide-react'
import type { UserProfile } from '@/lib/api'

interface ProfileSettingsProps {
  user: UserProfile
  citizenId: string
  lang: 'bn' | 'en'
  setLang: (lang: 'bn' | 'en') => void
  onLogout: () => void
}

export default function ProfileSettings({
  user,
  citizenId,
  lang,
  setLang,
  onLogout,
}: ProfileSettingsProps) {
  const [savedSuccess, setSavedSuccess] = useState(false)
  const [fullName, setFullName] = useState(user.full_name || '')
  const [district, setDistrict] = useState('ঢাকা (Dhaka)')
  const [occupation, setOccupation] = useState('ব্যবসায়ী / পেশাজীবী')

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const updated = {
        ...user,
        full_name: fullName,
        district,
        occupation,
      }
      localStorage.setItem('dishari_user', JSON.stringify(updated))
      setSavedSuccess(true)
      setTimeout(() => setSavedSuccess(false), 3000)
    } catch {}
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* ─── Top Banner (Windows 10 Flat Card) ─────────────────────────────── */}
      <div className="border border-neutral-200 bg-white p-5 sm:p-6 rounded-none shadow-xs border-t-3 border-t-[#006A4E]">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#006A4E] uppercase mb-1">
          <ShieldCheck className="w-4 h-4 text-[#006A4E]" />
          <span>{lang === 'bn' ? 'নাগরিক প্রোফাইল কার্যপত্র' : 'Citizen Profile Docket'}</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">
          {lang === 'bn' ? 'অ্যাকাউন্ট ও নাগরিক তথ্য' : 'Account & Citizen Information'}
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 mt-1">
          {lang === 'bn'
            ? 'এই তথ্যগুলো স্বয়ংক্রিয়ভাবে আপনার সরকারি ফর্ম পূরণে ব্যবহার করা হয়।'
            : 'This profile data is securely stored and utilized to autofill government application dockets.'}
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3 border border-emerald-300 bg-emerald-50 text-[#006A4E] text-xs font-bold flex items-center gap-2 rounded-none">
          <Check className="w-4 h-4" />
          <span>{lang === 'bn' ? 'প্রোফাইল তথ্য সফলভাবে সংরক্ষিত হয়েছে!' : 'Profile updated successfully!'}</span>
        </div>
      )}

      {/* ─── Profile Form ─────────────────────────────────────────────────── */}
      <form onSubmit={handleSave} className="border border-neutral-200 bg-white p-5 sm:p-7 rounded-none shadow-xs space-y-4">
        <div>
          <label className="block text-xs font-mono font-bold text-neutral-600 uppercase mb-1">
            {lang === 'bn' ? 'নাগরিক ট্র্যাকিং আইডি (অপরিবর্তনযোগ্য)' : 'Citizen Docket ID (Immutable)'}
          </label>
          <input
            type="text"
            readOnly
            value={citizenId}
            className="w-full h-10 px-3 border border-neutral-200 bg-neutral-100 font-mono text-xs sm:text-sm font-semibold text-neutral-600 cursor-not-allowed rounded-none"
          />
        </div>

        <div>
          <label className="block text-xs font-mono font-bold text-neutral-700 uppercase mb-1">
            {lang === 'bn' ? 'পূর্ণ নাম' : 'Full Name'}
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full h-10 px-3 border border-neutral-300 bg-white font-semibold text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-[#006A4E] rounded-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono font-bold text-neutral-600 uppercase mb-1">
              {lang === 'bn' ? 'মোবাইল নম্বর' : 'Phone Number'}
            </label>
            <input
              type="text"
              readOnly
              value={user.phone || '+8801712345678'}
              className="w-full h-10 px-3 border border-neutral-200 bg-neutral-100 font-mono text-xs sm:text-sm font-semibold text-neutral-600 cursor-not-allowed rounded-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-neutral-600 uppercase mb-1">
              {lang === 'bn' ? 'ইমেইল ঠিকানা' : 'Email Address'}
            </label>
            <input
              type="email"
              readOnly
              value={user.email || 'citizen@dishari.bd'}
              className="w-full h-10 px-3 border border-neutral-200 bg-neutral-100 font-mono text-xs sm:text-sm font-semibold text-neutral-600 cursor-not-allowed rounded-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono font-bold text-neutral-700 uppercase mb-1">
              {lang === 'bn' ? 'জেলা / অঞ্চল' : 'District / Region'}
            </label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full h-10 px-3 border border-neutral-300 bg-white font-semibold text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-[#006A4E] rounded-none"
            >
              <option value="ঢাকা (Dhaka)">ঢাকা (Dhaka)</option>
              <option value="চট্টগ্রাম (Chattogram)">চট্টগ্রাম (Chattogram)</option>
              <option value="রাজশাহী (Rajshahi)">রাজশাহী (Rajshahi)</option>
              <option value="খুলনা (Khulna)">খুলনা (Khulna)</option>
              <option value="বরিশাল (Barishal)">বরিশাল (Barishal)</option>
              <option value="সিলেট (Sylhet)">সিলেট (Sylhet)</option>
              <option value="রংপুর (Rangpur)">রংপুর (Rangpur)</option>
              <option value="ময়মনসিংহ (Mymensingh)">ময়মনসিংহ (Mymensingh)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-neutral-700 uppercase mb-1">
              {lang === 'bn' ? 'পেশা / ক্যাটাগরি' : 'Occupation / Category'}
            </label>
            <select
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              className="w-full h-10 px-3 border border-neutral-300 bg-white font-semibold text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-[#006A4E] rounded-none"
            >
              <option value="ব্যবসায়ী / পেশাজীবী">ব্যবসায়ী / পেশাজীবী</option>
              <option value="সরকারি / বেসরকারি চাকরিজীবী">সরকারি / বেসরকারি চাকরিজীবী</option>
              <option value="শিক্ষার্থী">শিক্ষার্থী</option>
              <option value="প্রবাসী / অভিবাসী">প্রবাসী / অভিবাসী</option>
              <option value="কৃষক / খামারি">কৃষক / খামারি</option>
              <option value="অন্যান্য">অন্যান্য</option>
            </select>
          </div>
        </div>

        <div className="pt-3 flex items-center justify-between">
          <button
            type="submit"
            className="min-h-[40px] px-6 border border-[#006A4E] bg-[#006A4E] hover:bg-[#004D38] text-white font-bold text-xs uppercase tracking-wider rounded-none transition-colors cursor-pointer win-btn"
          >
            {lang === 'bn' ? 'তথ্য হালনাগাদ সংরক্ষণ' : 'Save Changes'}
          </button>

          <button
            type="button"
            onClick={onLogout}
            className="min-h-[40px] px-4 border border-red-200 hover:border-red-300 bg-white hover:bg-red-50 text-[#C8102E] font-semibold text-xs uppercase flex items-center gap-1.5 rounded-none transition-colors win-press"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'লগআউট' : 'Log Out'}</span>
          </button>
        </div>
      </form>
    </div>
  )
}
