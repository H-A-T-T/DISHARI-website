'use client'

import React, { useState, useEffect } from 'react'
import {
  CloudSun,
  CloudRain,
  Sun,
  Wind,
  Droplets,
  AlertTriangle,
  MapPin,
  Calendar,
  Sparkles,
  ChevronDown
} from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { cn } from '@/lib/utils'

interface DivisionWeather {
  divisionBn: string
  divisionEn: string
  districtBn: string
  districtEn: string
  temp: number
  conditionBn: string
  conditionEn: string
  icon: 'sun' | 'rain' | 'cloud'
  rainProb: number
  humidity: number
  windKm: number
  advisoryType: 'alert' | 'advisory' | 'normal'
  advisoryTitleBn: string
  advisoryTitleEn: string
  advisoryDescBn: string
  advisoryDescEn: string
  cropAdviceBn: string
  cropAdviceEn: string
}

const DISTRICT_WEATHER_DATA: Record<string, DivisionWeather> = {
  dhaka: {
    divisionBn: 'ঢাকা',
    divisionEn: 'Dhaka',
    districtBn: 'ঢাকা সদর ও পার্শ্ববর্তী এলাকা',
    districtEn: 'Dhaka & Surroundings',
    temp: 29,
    conditionBn: 'পরিষ্কার ও মৃদু কুয়াশা',
    conditionEn: 'Clear & Mild Fog',
    icon: 'sun',
    rainProb: 10,
    humidity: 62,
    windKm: 12,
    advisoryType: 'normal',
    advisoryTitleBn: 'স্বাভাবিক আবহাওয়া সতর্কতা',
    advisoryTitleEn: 'Normal Weather Advisory',
    advisoryDescBn: 'আগামী ৪৮ ঘণ্টায় ঢাকায় ভারী বৃষ্টির কোনো সম্ভাবনা নেই। স্বাভাবিক নাগরিক কাজ নির্বিঘ্নে সম্পন্ন করা যাবে।',
    advisoryDescEn: 'No heavy rainfall expected in Dhaka for the next 48 hours. Routine civic activities can proceed normally.',
    cropAdviceBn: 'শীতকালীন শাকসবজি ও চারাগাছে নিয়মিত হালকা সেচ প্রদান করতে পারেন।',
    cropAdviceEn: 'Provide regular light irrigation for winter vegetables and seedlings.'
  },
  netrokona: {
    divisionBn: 'ময়মনসিংহ',
    divisionEn: 'Mymensingh',
    districtBn: 'নেত্রকোনা ও হাওড়াঞ্চল',
    districtEn: 'Netrokona & Haor Basin',
    temp: 26,
    conditionBn: 'মেঘলা ও হালকা গুঁড়ি গুঁড়ি বৃষ্টি',
    conditionEn: 'Overcast with Light Drizzle',
    icon: 'rain',
    rainProb: 65,
    humidity: 84,
    windKm: 18,
    advisoryType: 'alert',
    advisoryTitleBn: 'হাওড়াঞ্চলের জন্য কৃষি ও বৃষ্টির জরুরি বার্তা',
    advisoryTitleEn: 'Urgent Rain Advisory for Haor Region',
    advisoryDescBn: 'নেত্রকোনা, খালিয়াজুরী ও সংলগ্ন হাওর এলাকায় আগামী ২৪ ঘণ্টায় মাঝারি থেকে ভারী বৃষ্টির সম্ভাবনা রয়েছে। খলা ও নিচু জমির ফসল নিরাপদ স্থানে রাখুন।',
    advisoryDescEn: 'Moderate to heavy rainfall expected across Netrokona and Haor areas in 24h. Secure harvested crops from low lands.',
    cropAdviceBn: 'হাওরের নিচু জমিতে পাকা ধান থাকলে দ্রুত কাটাই ও মাড়াই সম্পন্ন করে উঁচু স্থানে সংরক্ষণ করুন।',
    cropAdviceEn: 'Promptly harvest and thrash mature crops from low-lying haor areas and store on elevated ground.'
  },
  chattogram: {
    divisionBn: 'চট্টগ্রাম',
    divisionEn: 'Chattogram',
    districtBn: 'চট্টগ্রাম ও উপকূলীয় এলাকা',
    districtEn: 'Chattogram & Coastal Belt',
    temp: 28,
    conditionBn: 'আংশিক মেঘলা ও আর্দ্র',
    conditionEn: 'Partly Cloudy & Humid',
    icon: 'cloud',
    rainProb: 25,
    humidity: 75,
    windKm: 22,
    advisoryType: 'advisory',
    advisoryTitleBn: 'উপকূলীয় আবহাওয়া সতর্কতা',
    advisoryTitleEn: 'Coastal Weather Notice',
    advisoryDescBn: 'সমুদ্রের মোহনা ও উপকূলীয় অঞ্চলে স্বাভাবিকের চেয়ে দমকা হাওয়া বইতে পারে। স্থানীয় জেলেদের সতর্কতার সাথে চলাচলের পরামর্শ দেওয়া হচ্ছে।',
    advisoryDescEn: 'Gusty winds may blow along the coast. Local fishermen are advised to navigate cautiously.',
    cropAdviceBn: 'লবণাক্ততা নিয়ন্ত্রণ ও উপকূলীয় পানের বরজে বাতাস থেকে সুরক্ষামূলক বেড়া নিশ্চিত করুন।',
    cropAdviceEn: 'Ensure windbreakers for betel leaf enclosures and monitor coastal soil salinity.'
  },
  sylhet: {
    divisionBn: 'সিলেট',
    divisionEn: 'Sylhet',
    districtBn: 'সিলেট সদর ও সুনামগঞ্জ',
    districtEn: 'Sylhet & Sunamganj',
    temp: 25,
    conditionBn: 'বজ্রসহ বৃষ্টিপাত হতে পারে',
    conditionEn: 'Thunderstorms Expected',
    icon: 'rain',
    rainProb: 75,
    humidity: 88,
    windKm: 16,
    advisoryType: 'alert',
    advisoryTitleBn: 'বজ্রপাত ও পাহাড়ি ঢল সতর্কতা',
    advisoryTitleEn: 'Flash Flood & Lightning Alert',
    advisoryDescBn: 'সুরমা ও কুশিয়ারা অববাহিকায় আকস্মিক পানির চাপ বাড়তে পারে। খোলা মাঠে কাজ করার সময় মেঘের ডাক শুনলে দ্রুত নিরাপদ আশ্রয়ে যান।',
    advisoryDescEn: 'Water levels in Surma and Kushiyara may rise. Take shelter indoors immediately during lightning.',
    cropAdviceBn: 'চা বাগান ও ফসলি জমিতে পানি নিষ্কাশন নালা পরিষ্কার রাখুন যেন জলাবদ্ধতা না ঘটে।',
    cropAdviceEn: 'Clear drainage canals in tea estates and fields to prevent waterlogging.'
  },
  rajshahi: {
    divisionBn: 'রাজশাহী',
    divisionEn: 'Rajshahi',
    districtBn: 'রাজশাহী ও বরেন্দ্র অঞ্চল',
    districtEn: 'Rajshahi & Barind Tract',
    temp: 31,
    conditionBn: 'রোদেলা ও শুষ্ক আবহাওয়া',
    conditionEn: 'Sunny & Dry Weather',
    icon: 'sun',
    rainProb: 5,
    humidity: 50,
    windKm: 10,
    advisoryType: 'normal',
    advisoryTitleBn: 'শুষ্ক বরেন্দ্র অঞ্চল নির্দেশনা',
    advisoryTitleEn: 'Dry Barind Zone Advisory',
    advisoryDescBn: 'রাজশাহী ও বরেন্দ্র এলাকায় রোদ অব্যাহত থাকবে। গম ও রবি শস্যের চারা রোপণের উপযোগী পরিবেশ বিরাজ করছে।',
    advisoryDescEn: 'Sunny weather persists in Barind. Optimal conditions for planting wheat and Rabi winter crops.',
    cropAdviceBn: 'মাটির আর্দ্রতা ধরে রাখতে রবি ফসলে সময়মতো জৈব মালচিং এবং পরিমিত সেচ প্রয়োগ করুন।',
    cropAdviceEn: 'Apply organic mulching and scheduled irrigation to retain soil moisture for crops.'
  },
  rangpur: {
    divisionBn: 'রংপুর',
    divisionEn: 'Rangpur',
    districtBn: 'রংপুর ও কুড়িগ্রাম চরাঞ্চল',
    districtEn: 'Rangpur & Kurigram Char',
    temp: 24,
    conditionBn: 'ঘন কুয়াশা ও হিমেল হাওয়া',
    conditionEn: 'Dense Fog & Cold Breeze',
    icon: 'cloud',
    rainProb: 15,
    humidity: 82,
    windKm: 14,
    advisoryType: 'advisory',
    advisoryTitleBn: 'কুয়াশা ও চরাঞ্চলীয় কৃষি বার্তা',
    advisoryTitleEn: 'Fog & Char Area Farming Notice',
    advisoryDescBn: 'তিস্তা ও ব্রহ্মপুত্র তীরবর্তী চরাঞ্চলে রাত থেকে সকাল পর্যন্ত মাঝারি থেকে ঘন কুয়াশার সম্ভাবনা রয়েছে। সড়ক ও নৌপথে সতর্ক থাকুন।',
    advisoryDescEn: 'Moderate to dense fog expected across Teesta and Brahmaputra char lands. Drive and navigate cautiously.',
    cropAdviceBn: 'আলুর জমিতে লেট ব্লাইট (নাবি ধসা) রোগ প্রতিরোধে অনুমোদিত ছত্রাকনাশক স্প্রে করুন।',
    cropAdviceEn: 'Apply approved fungicide to prevent late blight disease in potato crops.'
  },
  khulna: {
    divisionBn: 'খুলনা',
    divisionEn: 'Khulna',
    districtBn: 'খুলনা ও সাতক্ষীরা উপকূল',
    districtEn: 'Khulna & Satkhira Belt',
    temp: 28,
    conditionBn: 'পরিষ্কার ও মৃদু বাতাস',
    conditionEn: 'Clear with Gentle Breeze',
    icon: 'sun',
    rainProb: 15,
    humidity: 68,
    windKm: 15,
    advisoryType: 'normal',
    advisoryTitleBn: 'উপকূলীয় মৎস্য ও কৃষি নির্দেশিকা',
    advisoryTitleEn: 'Coastal Fisheries & Agriculture Guide',
    advisoryDescBn: 'সুন্দরবন সংলগ্ন অঞ্চলে স্বাভাবিক জলবায়ু বিরাজ করছে। ঘেরে চিংড়ি চাষ ও মাছের খাবার প্রদানে অনুকূল অবস্থা বিদ্যমান।',
    advisoryDescEn: 'Favorable weather conditions around the Sundarbans belt for shrimp farming and fisheries.',
    cropAdviceBn: 'লবণাক্ততা বৃদ্ধি রোধে পুকুর ও ঘেরের পাড়ে মাটি বাঁধ মজবুত রাখুন।',
    cropAdviceEn: 'Strengthen embankments of fish enclosures to prevent saline water intrusion.'
  },
  barishal: {
    divisionBn: 'বরিশাল',
    divisionEn: 'Barishal',
    districtBn: 'বরিশাল ও ভোলা নদী অববাহিকা',
    districtEn: 'Barishal & Bhola Riverine',
    temp: 27,
    conditionBn: 'আংশিক মেঘলা আকাশ',
    conditionEn: 'Partly Cloudy Skies',
    icon: 'cloud',
    rainProb: 30,
    humidity: 78,
    windKm: 17,
    advisoryType: 'normal',
    advisoryTitleBn: 'নদীতীরবর্তী নাগরিক বার্তা',
    advisoryTitleEn: 'Riverine Civic Advisory',
    advisoryDescBn: 'মেঘনা ও কীর্তনখোলা অববাহিকায় নদীপথের নৌযানসমূহ স্বাভাবিকভাবে চলাচল করতে পারছে। নৌযাত্রায় সরকারি নিরাপত্তা জ্যাকেট ব্যবহার নিশ্চিত করুন।',
    advisoryDescEn: 'Waterways along Meghna and Kirtankhola are running safely. Always wear certified lifejackets during river transit.',
    cropAdviceBn: 'পান বরজ ও শীতকালীন ডাল ফসলে পানি নিষ্কাশন ব্যবস্থা সচল রাখুন।',
    cropAdviceEn: 'Keep drainage clear in betel vine sheds and winter pulse fields.'
  }
}

export function WeatherAdvisory() {
  const { lang } = useLanguage()
  const isBn = lang === 'bn'

  const [mounted, setMounted] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState<string>('netrokona')

  useEffect(() => {
    setMounted(true)
  }, [])

  const current = DISTRICT_WEATHER_DATA[selectedRegion] || DISTRICT_WEATHER_DATA.dhaka

  return (
    <section className="bg-white border-y border-neutral-200 py-8 px-4" suppressHydrationWarning>
      <div className="max-w-6xl mx-auto">
        {/* Header bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 bg-emerald-50 border border-emerald-300 text-[#006A4E] flex items-center justify-center rounded-none shrink-0 font-bold">
              <CloudSun className="w-5 h-5 text-[#006A4E]" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-neutral-900 tracking-tight">
                  {isBn ? 'আবহাওয়া ও গ্রামীণ কৃষি নাগরিক বার্তা' : 'Weather & Rural Civic Advisory'}
                </h2>
                <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-emerald-100 text-[#006A4E] border border-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006A4E] animate-pulse" />
                  {isBn ? 'লাইভ আপডেট' : 'LIVE'}
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-0.5">
                {isBn
                  ? 'গ্রামীণ কৃষক, দূরবর্তী চরাঞ্চল ও সাধারণ নাগরিকদের জন্য দুর্যোগ ও কৃষি প্রস্তুতি'
                  : 'Agricultural & disaster advisories tailored for rural farmers and citizens'}
              </p>
            </div>
          </div>

          {/* Region selector dropdown */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <label htmlFor="weather-region-select" className="text-xs font-semibold text-neutral-600 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#006A4E]" />
              <span>{isBn ? 'অঞ্চল বেছে নিন:' : 'Region:'}</span>
            </label>
            <div className="relative">
              <select
                id="weather-region-select"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="appearance-none bg-neutral-50 border border-neutral-300 text-xs font-bold text-neutral-800 py-1.5 pl-3 pr-8 rounded-none cursor-pointer hover:border-[#006A4E] focus:outline-none focus:ring-1 focus:ring-[#006A4E]"
              >
                <option value="netrokona">{isBn ? 'নেত্রকোনা ও হাওড়াঞ্চল' : 'Netrokona & Haor Basin'}</option>
                <option value="dhaka">{isBn ? 'ঢাকা সদর' : 'Dhaka Central'}</option>
                <option value="sylhet">{isBn ? 'সিলেট ও সুনামগঞ্জ' : 'Sylhet & Sunamganj'}</option>
                <option value="rangpur">{isBn ? 'রংপুর ও কুড়িগ্রাম চর' : 'Rangpur & Kurigram Char'}</option>
                <option value="rajshahi">{isBn ? 'রাজশাহী ও বরেন্দ্র' : 'Rajshahi & Barind'}</option>
                <option value="chattogram">{isBn ? 'চট্টগ্রাম উপকূল' : 'Chattogram Coast'}</option>
                <option value="khulna">{isBn ? 'খুলনা ও সাতক্ষীরা' : 'Khulna & Satkhira'}</option>
                <option value="barishal">{isBn ? 'বরিশাল ও ভোলা' : 'Barishal & Bhola'}</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Advisory Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-5">
          {/* Left Column: Current Snapshot (4 cols) */}
          <div className="lg:col-span-4 border border-neutral-200 bg-neutral-50/80 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-neutral-500 font-mono mb-2">
                <span>{isBn ? current.divisionBn + ' বিভাগ' : current.divisionEn + ' Division'}</span>
                <span>{isBn ? 'আজকের পূর্বাভাস' : "Today's Forecast"}</span>
              </div>
              <h3 className="text-base font-bold text-neutral-900 leading-snug">
                {isBn ? current.districtBn : current.districtEn}
              </h3>

              {/* Temperature & Icon */}
              <div className="flex items-center gap-4 my-4">
                <div className="w-14 h-14 bg-white border border-neutral-300 flex items-center justify-center shrink-0">
                  {current.icon === 'sun' && <Sun className="w-8 h-8 text-amber-500" />}
                  {current.icon === 'rain' && <CloudRain className="w-8 h-8 text-blue-600 animate-bounce" />}
                  {current.icon === 'cloud' && <CloudSun className="w-8 h-8 text-emerald-600" />}
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-neutral-900 tracking-tight font-mono">
                    {current.temp}°C
                  </div>
                  <div className="text-xs font-semibold text-neutral-600">
                    {isBn ? current.conditionBn : current.conditionEn}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-neutral-200 text-center font-mono">
              <div className="bg-white border border-neutral-200 p-2">
                <div className="text-[10px] text-neutral-500 flex items-center justify-center gap-1 mb-0.5">
                  <CloudRain className="w-3 h-3 text-blue-600" />
                  {isBn ? 'বৃষ্টি' : 'Rain'}
                </div>
                <div className="text-xs font-bold text-neutral-800">{current.rainProb}%</div>
              </div>
              <div className="bg-white border border-neutral-200 p-2">
                <div className="text-[10px] text-neutral-500 flex items-center justify-center gap-1 mb-0.5">
                  <Droplets className="w-3 h-3 text-teal-600" />
                  {isBn ? 'আর্দ্রতা' : 'Humid'}
                </div>
                <div className="text-xs font-bold text-neutral-800">{current.humidity}%</div>
              </div>
              <div className="bg-white border border-neutral-200 p-2">
                <div className="text-[10px] text-neutral-500 flex items-center justify-center gap-1 mb-0.5">
                  <Wind className="w-3 h-3 text-neutral-600" />
                  {isBn ? 'বাতাস' : 'Wind'}
                </div>
                <div className="text-xs font-bold text-neutral-800">{current.windKm} km/h</div>
              </div>
            </div>
          </div>

          {/* Right Column: Tailored Civic & Agricultural Advisory (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {/* Urgent Weather Alert Callout */}
            <div
              className={cn(
                'border p-4.5 rounded-none flex items-start gap-3.5',
                current.advisoryType === 'alert'
                  ? 'border-[#C8102E] bg-rose-50/70 text-rose-950'
                  : current.advisoryType === 'advisory'
                  ? 'border-amber-400 bg-amber-50/70 text-amber-950'
                  : 'border-emerald-300 bg-emerald-50/70 text-emerald-950'
              )}
            >
              <div
                className={cn(
                  'w-8 h-8 rounded-none flex items-center justify-center shrink-0 mt-0.5 font-bold',
                  current.advisoryType === 'alert'
                    ? 'bg-[#C8102E] text-white'
                    : current.advisoryType === 'advisory'
                    ? 'bg-amber-600 text-white'
                    : 'bg-[#006A4E] text-white'
                )}
              >
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-white/90 border border-neutral-300">
                    {current.advisoryType === 'alert'
                      ? (isBn ? 'জরুরি পূর্বাভাস' : 'URGENT ALERT')
                      : (isBn ? 'অফিসিয়াল বার্তা' : 'OFFICIAL NOTICE')}
                  </span>
                  <h4 className="font-bold text-sm sm:text-base leading-snug">
                    {isBn ? current.advisoryTitleBn : current.advisoryTitleEn}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm mt-1.5 leading-relaxed text-neutral-800">
                  {isBn ? current.advisoryDescBn : current.advisoryDescEn}
                </p>
              </div>
            </div>

            {/* Practical Crop & Rural Farming Guidance */}
            <div className="border border-neutral-200 bg-white p-4.5 flex items-start gap-3.5">
              <div className="w-8 h-8 bg-emerald-100 border border-emerald-300 text-[#006A4E] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                <Sparkles className="w-4 h-4 text-[#006A4E]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-[#006A4E] uppercase tracking-wide font-mono">
                    {isBn ? '🌾 কৃষি ও ফসল সুরক্ষা পরামর্শ' : '🌾 Crop & Farming Guidance'}
                  </span>
                  <span className="text-[11px] text-neutral-500 font-mono">
                    {isBn ? 'কৃষি সম্প্রসারণ অধিদপ্তর রেফারেন্স' : 'Ref: Dept of Agricultural Extension'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-700 mt-1 leading-relaxed font-medium">
                  {isBn ? current.cropAdviceBn : current.cropAdviceEn}
                </p>
              </div>
            </div>

            {/* Rural Citizen Helplines */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-neutral-100/90 border border-neutral-200 px-4 py-2.5 text-xs text-neutral-600 font-mono">
              <div className="flex items-center gap-2">
                <span className="font-bold text-neutral-800">{isBn ? 'জরুরি কৃষি কল সেন্টার:' : 'Agri Call Center:'}</span>
                <span className="text-[#006A4E] font-bold">১৬১২৩</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-neutral-800">{isBn ? 'জাতীয় দুর্যোগ বার্তা:' : 'Disaster Helpline:'}</span>
                <span className="text-[#C8102E] font-bold">১০৯০</span>
              </div>
              <div className="text-[11px] text-neutral-500">
                {isBn ? 'টোল-ফ্রি সরকারি নম্বর · ২৪ ঘণ্টা খোলা' : 'Toll-free Govt Hotlines · 24/7'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WeatherAdvisory