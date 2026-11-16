import Tesseract from 'tesseract.js'

export interface ParsedDocumentData {
  doc_title?: string
  full_name_bn?: string
  full_name_en?: string
  candidate_name?: string
  id_number?: string
  roll?: string
  reg_no?: string
  board?: string
  exam_name?: string
  institution?: string
  dob?: string
  blood_group?: string
  father_name?: string
  mother_name?: string
  address?: string
  business_name?: string
  owner_name?: string
  taxpayer_name?: string
  assessment_zone?: string
  issue_date?: string
  valid_till?: string
  status?: string
  raw_text?: string
  verified_source?: string
  confidence?: number
}

// Map Bengali digits to English digits for consistent regex matching
const BN_TO_EN_DIGITS: Record<string, string> = {
  '০': '0',
  '১': '1',
  '২': '2',
  '৩': '3',
  '৪': '4',
  '৫': '5',
  '৬': '6',
  '৭': '7',
  '৮': '8',
  '৯': '9',
}

export function normalizeDigits(str: string): string {
  return str.replace(/[০-৯]/g, (char) => BN_TO_EN_DIGITS[char] || char)
}

/**
 * Parses raw text extracted by OCR into structured citizen document fields.
 * Every field is derived strictly from the text found in the image.
 */
export function parseDocumentText(rawText: string, preferredDocType?: string): ParsedDocumentData {
  const cleanRaw = (rawText || '').trim()
  const normalizedText = normalizeDigits(cleanRaw)
  const lowerText = cleanRaw.toLowerCase()

  const result: ParsedDocumentData = {
    raw_text: cleanRaw.slice(0, 1000), // preserve raw OCR text for transparency
    verified_source: 'JavaScript Vision OCR (Tesseract)',
  }

  // 1. Determine Document Title & Type
  if (
    preferredDocType === 'nid_front' ||
    preferredDocType === 'nid_back' ||
    lowerText.includes('national id') ||
    cleanRaw.includes('জাতীয় পরিচয়পত্র') ||
    lowerText.includes('election commission') ||
    cleanRaw.includes('নির্বাচন কমিশন')
  ) {
    result.doc_title = preferredDocType === 'nid_back'
      ? 'জাতীয় পরিচয়পত্র (পেছনের পাতা)'
      : 'জাতীয় পরিচয়পত্র (National ID Card)'
  } else if (
    preferredDocType === 'birth_certificate' ||
    lowerText.includes('birth') ||
    cleanRaw.includes('জন্ম নিবন্ধন') ||
    cleanRaw.includes('জন্ম ও মৃত্যু') ||
    lowerText.includes('bdris')
  ) {
    result.doc_title = 'জন্ম নিবন্ধন সনদপত্র (Birth Registration Certificate)'
  } else if (
    preferredDocType === 'educational_transcript' ||
    lowerText.includes('admit') ||
    lowerText.includes('intermediate') ||
    lowerText.includes('secondary') ||
    cleanRaw.includes('প্রবেশপত্র') ||
    cleanRaw.includes('শিক্ষা বোর্ড') ||
    cleanRaw.includes('সনদপত্র')
  ) {
    result.doc_title = 'মাধ্যমিক ও উচ্চ মাধ্যমিক শিক্ষা বোর্ড - প্রবেশপত্র / সনদ'
  } else if (
    preferredDocType === 'tin_certificate' ||
    lowerText.includes('tin') ||
    cleanRaw.includes('টিআইএন') ||
    lowerText.includes('taxes zone') ||
    cleanRaw.includes('জাতীয় রাজস্ব')
  ) {
    result.doc_title = 'জাতীয় রাজস্ব বোর্ড (NBR) - ই-টিআইএন সনদপত্র'
  } else if (
    preferredDocType === 'trade_license' ||
    lowerText.includes('trade') ||
    cleanRaw.includes('ট্রেড লাইসেন্স') ||
    lowerText.includes('city corporation') ||
    cleanRaw.includes('সিটি কর্পোরেশন')
  ) {
    result.doc_title = 'সিটি কর্পোরেশন / পৌরসভা - ই-ট্রেড লাইসেন্স'
  } else if (cleanRaw.length > 0) {
    result.doc_title = 'নাগরিক সরকারি নথি (Citizen Document)'
  }

  // 2. ID / NID / Birth Reg / TIN Extraction
  // Look for 17-digit birth registration number or old NID
  const seventeenDigitMatch = normalizedText.match(/\b(19\d{15}|20\d{15}|\d{17})\b/)
  // Look for 10-digit Smart NID
  const tenDigitMatch = normalizedText.match(/\b\d{10}\b/)
  // Look for 12-digit e-TIN
  const twelveDigitMatch = normalizedText.match(/\b\d{12}\b/)

  // Explicit label matching: "NID NO", "ID NO", "আইডি নং" (also handle OCR reading I as 1, e.g. 1D NO)
  const nidLabelMatch = normalizedText.match(/(?:[1I]D|N[1I]D|আইডি)\s*(?:NO|No|Number)?[:\s.\-]+([0-9]{10,17})/i)
  const brnLabelMatch = normalizedText.match(/(?:Birth\s*Registration\s*Number|BRN|নিবন্ধন\s*নং?)[:\s.\-]+([0-9]{17})/i)
  const tinLabelMatch = normalizedText.match(/(?:TIN|টিআইএন)[:\s.\-]+([0-9]{12})/i)

  if (brnLabelMatch) {
    result.id_number = brnLabelMatch[1]
  } else if (nidLabelMatch) {
    result.id_number = nidLabelMatch[1]
  } else if (tinLabelMatch) {
    result.id_number = tinLabelMatch[1]
  } else if (seventeenDigitMatch) {
    result.id_number = seventeenDigitMatch[1]
  } else if (twelveDigitMatch && (preferredDocType === 'tin_certificate' || lowerText.includes('tin'))) {
    result.id_number = twelveDigitMatch[0]
  } else if (tenDigitMatch && preferredDocType !== 'educational_transcript') {
    result.id_number = tenDigitMatch[0]
  }

  // 3. Educational Transcripts / Admit Card (Roll, Reg, Board, Exam)
  if (preferredDocType !== 'birth_certificate' && !lowerText.includes('birth registration')) {
    const rollMatch = normalizedText.match(/(?:[RP]oll|[RP]ol|রোল)\s*(?:No|Number|Noc|নং)?[:\s.\-c=]+([0-9]{4,8})/i)
    if (rollMatch) {
      result.roll = rollMatch[1]
    } else if (preferredDocType === 'educational_transcript') {
      const standalone6Digit = normalizedText.match(/\b\d{6}\b/)
      if (standalone6Digit) result.roll = standalone6Digit[0]
    }

    const regMatch = normalizedText.match(/(?<!Birth\s*)(?:[RP]eg(?:istration)?\.?\s*(?:No|Number)?|রেজি(?:স্ট্রেশন)?\s*(?:নং)?)[:\s.\-c=]+([0-9]{6,12})/i)
    if (regMatch) {
      result.reg_no = regMatch[1]
    }
  }

  // Board Detection
  const boards = [
    'Dhaka',
    'Chattogram',
    'Chittagong',
    'Rajshahi',
    'Cumilla',
    'Comilla',
    'Barishal',
    'Barisal',
    'Sylhet',
    'Dinajpur',
    'Mymensingh',
    'Madrasah',
    'Technical',
    'Jessore',
    'যশোর',
    'ঢাকা',
    'চট্টগ্রাম',
    'রাজশাহী',
    'কুমিল্লা',
    'বরিশাল',
    'সিলেট',
    'দিনাজপুর',
    'ময়মনসিংহ',
    'মাদ্রাসা',
  ]
  for (const b of boards) {
    if (new RegExp('\\b' + b + '\\b', 'i').test(cleanRaw)) {
      result.board = b
      break
    }
  }

  // Exam Name
  if (/HSC|Higher\s*Secondary/i.test(cleanRaw)) {
    result.exam_name = 'HSC Exam'
  } else if (/SSC|Secondary\s*School/i.test(cleanRaw)) {
    result.exam_name = 'SSC Exam'
  } else if (/Alim|আলিম/i.test(cleanRaw)) {
    result.exam_name = 'Alim Exam'
  } else if (/Dakhil|দাখিল/i.test(cleanRaw)) {
    result.exam_name = 'Dakhil Exam'
  }

  // 4. Date of Birth (DOB)
  const dobLabelMatch = normalizedText.match(
    /(?:Date\s*of\s*Birth|DOB|DOR|জন্ম\s*তারিখ)[:\s.\-]+([0-9]{1,2}[\/\-\.][0-9]{1,2}[\/\-\.][0-9]{4}|[0-9]{1,2}\s+[A-Za-z]{3,9}\s+[0-9]{4})/i
  )
  if (dobLabelMatch) {
    result.dob = dobLabelMatch[1].trim()
  } else {
    // General DD/MM/YYYY match
    const dateMatch = normalizedText.match(/\b([0-2]?[0-9]|3[01])[\/\-\.](0?[1-9]|1[0-2])[\/\-\.](19\d{2}|20\d{2})\b/)
    if (dateMatch) {
      result.dob = dateMatch[0]
    }
  }

  // 5. Blood Group
  const bloodMatch =
    cleanRaw.match(/(?:Blood\s*(?:Group|Grou|Grp)?|রক্তের\s*গ্রুপ)[:\s.\-]*\s*([ABO]{1,2}[+-])/i) ||
    cleanRaw.match(/\b([ABO]{1,2}[+-])\b/i)
  if (bloodMatch) {
    result.blood_group = (bloodMatch[1] || bloodMatch[0]).trim().toUpperCase()
  }

  // 6. Names (English, Bengali, Father, Mother)
  const nameEnMatch = cleanRaw.match(
    /(?:Name\s*(?:of\s*(?:Examinee|Assessee|Candidate))?|Name)[:\s.\-]+([A-Za-z\.\s]{3,35})/i
  )
  if (nameEnMatch) {
    const val = nameEnMatch[1].split(/\r?\n/)[0].trim()
    if (val && !/father|mother|date|blood|roll|govt|republic|bangladesh|board/i.test(val)) {
      result.full_name_en = val
      result.candidate_name = val
    }
  }

  const nameBnMatch = cleanRaw.match(/(?:নাম)[:\s.\-]+([\u0980-\u09FF\.\s]{3,35})/)
  if (nameBnMatch) {
    const val = nameBnMatch[1].split(/\r?\n/)[0].trim()
    if (val && !/পিতা|মাতা|জন্ম|রক্ত|গণপ্রজাতন্ত্রী|বাংলাদেশ/i.test(val)) {
      result.full_name_bn = val
      if (!result.candidate_name) result.candidate_name = val
    }
  }

  const fatherMatch = cleanRaw.match(
    /(?:Father(?:'s)?\s*Name|Father|পিতা|পিতার\s*নাম)[:\s.\-]+([A-Za-z\u0980-\u09FF\.\s]{3,35})/i
  )
  if (fatherMatch) {
    const val = fatherMatch[1].split(/\r?\n/)[0].trim()
    if (!/mother|মাতা|date|nid|roll/i.test(val)) {
      result.father_name = val
    }
  }

  const motherMatch = cleanRaw.match(
    /(?:Mother(?:'s)?\s*Name|Mother|মাতা|মাতার\s*নাম)[:\s.\-]+([A-Za-z\u0980-\u09FF\.\s]{3,35})/i
  )
  if (motherMatch) {
    const val = motherMatch[1].split(/\r?\n/)[0].trim()
    if (!/father|পিতা|date|nid|roll/i.test(val)) {
      result.mother_name = val
    }
  }

  // 7. Business / Trade License
  const busMatch = cleanRaw.match(/(?:Business\s*Name|প্রতিষ্ঠানের\s*নাম)[:\s.\-]+([A-Za-z\u0980-\u09FF0-9\.\s&]{3,45})/i)
  if (busMatch) {
    result.business_name = busMatch[1].split(/\r?\n/)[0].trim()
  }

  // 8. Address
  const addrMatch = cleanRaw.match(/(?:Address|ঠিকানা)[:\s.\-]+([A-Za-z\u0980-\u09FF0-9\.\s,\/\-]{6,80})/i)
  if (addrMatch) {
    result.address = addrMatch[1].split(/\r?\n/)[0].trim()
  }

  // Set default status
  result.status = result.id_number || result.roll ? 'যাচাইকৃত (Verified by OCR)' : 'স্ক্যান সম্পন্ন (Review Required)'

  return result
}

/**
 * Performs actual JavaScript OCR on the image buffer using Tesseract.js.
 * Strictly extracts real text from the image rather than hardcoded mock data.
 */
export async function runJavaScriptOCR(
  imageBuffer: Buffer,
  docType?: string
): Promise<{ success: boolean; document: ParsedDocumentData; rawText: string; error?: string }> {
  try {
    // Run fast, reliable English OCR (covers all NID, Admit Card, TIN, Birth Reg numbers, codes, dates, titles)
    const ocrResult = await Tesseract.recognize(imageBuffer, 'eng', {
      logger: () => {}, // silent in production
    })

    const recognizedText = ocrResult?.data?.text || ''
    const confidence = ocrResult?.data?.confidence || 0

    // Parse the actual text read from the image
    const parsed = parseDocumentText(recognizedText, docType)
    parsed.confidence = Math.round(confidence)

    return {
      success: true,
      document: parsed,
      rawText: recognizedText,
    }
  } catch (err: any) {
    console.error('Error running JavaScript Tesseract OCR:', err)
    return {
      success: false,
      document: {
        raw_text: '',
        doc_title: 'OCR প্রক্রিয়াকরণে ত্রুটি',
        status: 'ম্যানুয়াল ইনপুট প্রয়োজন',
      },
      rawText: '',
      error: err?.message || 'JavaScript OCR recognition failed',
    }
  }
}
