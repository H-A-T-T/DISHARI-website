import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ServiceCategory } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const CATEGORY_META: Record<ServiceCategory, {
  name_bn: string
  name_en: string
  color: string
  bgColor: string
  borderColor: string
  badgeBg: string
}> = {
  identity: {
    name_bn: 'পরিচয় ও নথিপত্র',
    name_en: 'Identity & Documents',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-500',
    badgeBg: 'bg-blue-100 text-blue-700',
  },
  education: {
    name_bn: 'শিক্ষা ও বৃত্তি',
    name_en: 'Education & Scholarship',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-500',
    badgeBg: 'bg-purple-100 text-purple-700',
  },
  land: {
    name_bn: 'ভূমি ও সম্পত্তি',
    name_en: 'Land & Property',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-500',
    badgeBg: 'bg-amber-100 text-amber-700',
  },
  welfare: {
    name_bn: 'কল্যাণ ও ভাতা',
    name_en: 'Welfare & Allowance',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-500',
    badgeBg: 'bg-pink-100 text-pink-700',
  },
  business: {
    name_bn: 'ব্যবসা ও উদ্যোগ',
    name_en: 'Business & Enterprise',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-500',
    badgeBg: 'bg-teal-100 text-teal-700',
  },
  tax: {
    name_bn: 'কর ও রাজস্ব',
    name_en: 'Tax & Revenue',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-500',
    badgeBg: 'bg-orange-100 text-orange-700',
  },
  overseas: {
    name_bn: 'প্রবাসী সেবা',
    name_en: 'Overseas Services',
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-500',
    badgeBg: 'bg-cyan-100 text-cyan-700',
  },
  health: {
    name_bn: 'স্বাস্থ্যসেবা',
    name_en: 'Health Services',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-500',
    badgeBg: 'bg-green-100 text-green-700',
  },
}

export function formatFee(fee: string): string {
  if (fee === '0' || fee.toLowerCase() === 'free' || fee === 'বিনামূল্যে') {
    return 'বিনামূল্যে'
  }
  return `৳${fee}`
}
