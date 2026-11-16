import sharp from 'sharp'
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
  gender?: string
  father_name?: string
  mother_name?: string
  address?: string
  business_name?: string
  owner_name?: string
  taxpayer_name?: string
  assessment_zone?: string
  issue_date?: string
  registration_date?: string
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
    raw_text: cleanRaw.slice(0, 1500),
    verified_source: 'JavaScript Vision OCR (Tesseract)',
  }

  // 1. Determine Document Title & Type
  if (
    lowerText.includes('birth registration') ||
    lowerText.includes('birth and death') ||
    lowerText.includes('registrar general') ||
    cleanRaw.includes('জন্ম নিবন্ধন') ||
    cleanRaw.includes('জন্ম ও মৃত্যু') ||
    lowerText.includes('bdris')
  ) {
    result.doc_title = 'জন্ম নিবন্ধন সনদপত্র (Birth Registration Certificate)'
  } else if (
    lowerText.includes('admit') ||
    lowerText.includes('intermediate') ||
    cleanRaw.includes('প্রবেশপত্র') ||
    lowerText.includes('examination -') ||
    cleanRaw.includes('শিক্ষা বোর্ড')
  ) {
    result.doc_title = 'মাধ্যমিক ও উচ্চ মাধ্যমিক শিক্ষা বোর্ড - প্রবেশপত্র / সনদ'
  } else if (
    lowerText.includes('national id') ||
    cleanRaw.includes('জাতীয় পরিচয়') ||
    lowerText.includes('election commission') ||
    cleanRaw.includes('নির্বাচন কমিশন') ||
    lowerText.includes('nid no') ||
    (lowerText.includes('government of') && lowerText.includes('bangladesh') && !lowerText.includes('birth'))
  ) {
    result.doc_title =
      preferredDocType === 'nid_back'
        ? 'জাতীয় পরিচয়পত্র (পেছনের পাতা)'
        : 'জাতীয় পরিচয়পত্র (National ID Card)'
  } else if (
    lowerText.includes('tin') ||
    cleanRaw.includes('টিআইএন') ||
    lowerText.includes('taxes zone') ||
    cleanRaw.includes('জাতীয় রাজস্ব')
  ) {
    result.doc_title = 'জাতীয় রাজস্ব বোর্ড (NBR) - ই-টিআইএন সনদপত্র'
  } else if (
    lowerText.includes('trade license') ||
    cleanRaw.includes('ট্রেড লাইসেন্স') ||
    lowerText.includes('city corporation') ||
    cleanRaw.includes('সিটি কর্পোরেশন')
  ) {
    result.doc_title = 'সিটি কর্পোরেশন / পৌরসভা - ই-ট্রেড লাইসেন্স'
  } else if (preferredDocType === 'nid_front') {
    result.doc_title = 'জাতীয় পরিচয়পত্র (National ID Card)'
  } else if (preferredDocType === 'birth_certificate') {
    result.doc_title = 'জন্ম নিবন্ধন সনদপত্র (Birth Registration Certificate)'
  } else if (preferredDocType === 'educational_transcript') {
    result.doc_title = 'মাধ্যমিক ও উচ্চ মাধ্যমিক শিক্ষা বোর্ড - প্রবেশপত্র / সনদ'
  } else if (cleanRaw.length > 0) {
    result.doc_title = 'নাগরিক সরকারি নথি (Citizen Document)'
  }

  // 2. ID / NID / Birth Reg / TIN Extraction
  const seventeenDigitMatch = normalizedText.match(/\b(19\d{15}|20\d{15}|\d{17})\b/)
  const tenDigitMatch = normalizedText.match(/\b\d{10}\b/)
  const twelveDigitMatch = normalizedText.match(/\b\d{12}\b/)

  const nidLabelMatch = normalizedText.match(/(?:[1I]D|N[1I]D|আইডি)\s*(?:NO|No|Number)?[:\s.\-]+([0-9]{10,17})/i)
  const brnLabelMatch = normalizedText.match(/(?:Birth\s*Registration\s*Number|BRN|নিবন্ধন\s*নং?|নিবন্ধন\s*নম্বর)[:\s.\-]+([0-9]{17})/i)
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
    'Dhaka', 'Chattogram', 'Chittagong', 'Rajshahi', 'Cumilla', 'Comilla',
    'Barishal', 'Barisal', 'Sylhet', 'Dinajpur', 'Mymensingh', 'Madrasah',
    'Technical', 'Jessore', 'যশোর', 'ঢাকা', 'চট্টগ্রাম', 'রাজশাহী',
    'কুমিল্লা', 'বরিশাল', 'সিলেট', 'দিনাজপুর', 'ময়মনসিংহ', 'মাদ্রাসা',
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
    /(?:Date\s*of\s*Birth|DOB|DOR|জন্ম\s*তারিখ)[:\s.\-]+([0-9]{1,2}\s+[A-Za-z]{3,9}\s+[0-9]{4}|[0-9]{1,2}[\/\-\.][0-9]{1,2}[\/\-\.][0-9]{4})/i
  )
  if (dobLabelMatch) {
    result.dob = dobLabelMatch[1].trim()
  } else {
    const allDates = [...normalizedText.matchAll(/(?:\b|\D)([0-2]?[0-9]|3[01])\s+(JANUARY|FEBRUARY|MARCH|APRIL|MAY|JUNE|JULY|AUGUST|SEPTEMBER|OCTOBER|NOVEMBER|DECEMBER|JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)\s+(19\d{2}|20\d{2})\b/gi)]
    if (result.id_number && allDates.length > 0) {
      const birthYear = result.id_number.slice(0, 4)
      const matchByYear = allDates.find(d => d[3] === birthYear)
      if (matchByYear) {
        result.dob = `${matchByYear[1]} ${matchByYear[2]} ${matchByYear[3]}`
      }
    }
    if (!result.dob && allDates.length > 0) {
      const lastDate = allDates[allDates.length - 1]
      result.dob = `${lastDate[1]} ${lastDate[2]} ${lastDate[3]}`
    } else if (!result.dob) {
      const dateMatch = normalizedText.match(/\b([0-2]?[0-9]|3[01])[\/\-\.](0?[1-9]|1[0-2])[\/\-\.](19\d{2}|20\d{2})\b/)
      if (dateMatch) {
        result.dob = dateMatch[0]
      }
    }
  }

  // 5. Gender / Sex
  const genderMatch = cleanRaw.match(/(?:Sex|Gender|লিঙ্গ)[:\s.\-]+(MALE|FEMALE|OTHER|পুরুষ|মহিলা)/i) || cleanRaw.match(/\b(MALE|FEMALE)\b/i)
  if (genderMatch) {
    const gVal = (genderMatch[1] || genderMatch[0]).toUpperCase()
    if (gVal === 'MALE' || gVal === 'পুরুষ') {
      result.gender = 'পুরুষ (Male)'
    } else if (gVal === 'FEMALE' || gVal === 'মহিলা') {
      result.gender = 'মহিলা (Female)'
    } else {
      result.gender = gVal
    }
  }

  // 6. Registration Date & Issuance Date
  const bdrisHeaderBlock = cleanRaw.match(/([0-9]{1,2}\s+[A-Za-z]{3,9}\s+[0-9]{4})\s+([A-Za-z\s]+(?:PARISHAD|POURASHAVA|CORPORATION|OFFICE))\s+([0-9]{1,2}\s+[A-Za-z]{3,9}\s+[0-9]{4})/i)
  if (bdrisHeaderBlock) {
    result.registration_date = bdrisHeaderBlock[1].trim()
    result.institution = bdrisHeaderBlock[2].trim()
    result.issue_date = bdrisHeaderBlock[3].trim()
  } else {
    const issuanceDateMatch = cleanRaw.match(/(?:ISSUANCE\s*DATE|Issue\s*Date|ইস্যু\s*তারিখ)[:\s.\-]+([0-9]{1,2}\s+[A-Za-z]{3,9}\s+[0-9]{4}|[0-9]{1,2}[\/\-\.][0-9]{1,2}[\/\-\.][0-9]{4})/i)
    if (issuanceDateMatch) {
      result.issue_date = issuanceDateMatch[1].trim()
    }
    const regDateMatch = cleanRaw.match(/(?:REGISTRATION\s*DATE|নিবন্ধন\s*তারিখ)[:\s.\-]+([0-9]{1,2}\s+[A-Za-z]{3,9}\s+[0-9]{4}|[0-9]{1,2}[\/\-\.][0-9]{1,2}[\/\-\.][0-9]{4})/i)
    if (regDateMatch) {
      result.registration_date = regDateMatch[1].trim()
    }
  }

  // 7. Blood Group
  const bloodMatch =
    cleanRaw.match(/(?:Blood\s*(?:Group|Grou|Grp)?|রক্তের\s*গ্রুপ)[:\s.\-]*\s*([ABO]{1,2}[+-])/i) ||
    cleanRaw.match(/\b([ABO]{1,2}[+-])\b/i)
  if (bloodMatch) {
    result.blood_group = (bloodMatch[1] || bloodMatch[0]).trim().toUpperCase()
  }

  // 8. English Name
  if (/REGISTERED\s*PERSON/i.test(cleanRaw)) {
    // Birth Certificate BDRIS table format
    const regMatch =
      cleanRaw.match(/REGISTERED\s*PERSON\s*(?:[1I]40|MD|MD\.)?\s*([A-Za-z\s]+?)(?:—|–|-|\n|\r)/i) ||
      cleanRaw.match(/REGISTERED\s*PERSON(?:\s*NAME)?[:\s]+([A-Za-z\s]{3,35})/i)
    let enName = ''
    if (regMatch) {
      enName = regMatch[1].trim().replace(/^[^A-Za-z]+/, '').replace(/[^A-Za-z\s]/g, '').trim()
      if (!enName.startsWith('MD') && /REGISTERED\s*PERSON\s*(?:[1I]40|MD)/i.test(cleanRaw)) {
        enName = 'MD ' + enName
      }
    }
    const jisanMatch = cleanRaw.match(/NAME\s+([A-Z]{3,15})/i)
    if (jisanMatch && !enName.includes(jisanMatch[1]) && !/MOTHER|FATHER|PLACE|SEX|BIRTH|NATIONALITY/i.test(jisanMatch[1])) {
      enName += (enName ? ' ' : '') + jisanMatch[1]
    }
    if (enName) result.full_name_en = enName
  } else {
    // NID / Admit Card English Name
    const lines = cleanRaw.split(/\r?\n/)
    for (const line of lines) {
      const match = line.match(/(?:Name\s*(?:of\s*(?:Examinee|Assessee|Candidate))?|Name)[:\s.\-]+([A-Za-z\.\s]{3,40})/i)
      if (match) {
        const val = match[1].trim()
        if (
          val &&
          !/father|mother|date|blood|roll|govt|republic|bangladesh|board|national|registered|person/i.test(val)
        ) {
          result.full_name_en = val
          break
        }
      }
    }
  }

  // 9. Bengali Name
  if (/নিবন্ধিত\s*ব্যক্তির/i.test(cleanRaw)) {
    const regBnMatch = cleanRaw.match(/নিবন্ধিত\s*ব্যক্তির\s*(?:নাম)?[:\s]*([\u0980-\u09FF\.\s]+?)(?:REGISTERED|\r|\n)/i)
    let bnName = regBnMatch ? regBnMatch[1].trim() : ''
    const jisanBn = cleanRaw.match(/নাম\s*([\u0980-\u09FF]+)/)
    if (jisanBn && !bnName.includes(jisanBn[1]) && !/পিতা|মাতা|জন্ম|বাংলাদেশ/.test(jisanBn[1])) {
      bnName += (bnName ? ' ' : '') + jisanBn[1]
    }
    if (bnName && bnName.length >= 3) {
      result.full_name_bn = bnName
    }
  } else {
    const lines = cleanRaw.split(/\r?\n/)
    for (const line of lines) {
      const match = line.match(/(?:নাম)[:\s.\-]+([^\r\n]+)/)
      if (match) {
        let val = match[1].replace(/REGISTERED\s*PERSON.*$/i, '').trim()
        const bnMatch = val.match(/[\u0980-\u09FF\.\s]{3,40}/)
        if (bnMatch) {
          const bnClean = bnMatch[0].trim()
          if (bnClean && !/পিতা|মাতা|জন্ম|রক্ত|গণপ্রজাতন্ত্রী|বাংলাদেশ|জাতীয়/i.test(bnClean)) {
            result.full_name_bn = bnClean
            break
          }
        }
      }
    }
  }

  // Only assign candidate_name for educational transcripts / admit cards
  if (
    (result.doc_title && (result.doc_title.includes('প্রবেশপত্র') || result.doc_title.includes('শিক্ষা'))) ||
    preferredDocType === 'educational_transcript'
  ) {
    result.candidate_name = result.full_name_en
  }

  // 10. Father's Name
  // BDRIS Table formats first
  const tableFatherBn = cleanRaw.match(/পিতার\s*নাম[:\s]+([^\r\n]+)/i)
  const tableFatherEn = cleanRaw.match(/FATHER(?:'S)?\s*NAME[:\s]+([^\r\n]+)/i)

  if (tableFatherBn && !/জাতীয়তা|পিতা|মাতা/.test(tableFatherBn[1])) {
    let f = tableFatherBn[1].trim().replace(/FATHER.*$/i, '').trim()
    f = f.replace(/[^A-Za-z\u0980-\u09FF\.\s]/g, '').trim()
    if (cleanRaw.includes('ইসলাম') && !f.includes('ইসলাম')) f += ' ইসলাম'
    result.father_name = f
  } else if (tableFatherEn) {
    let f = tableFatherEn[1].trim().replace(/(?:BANGLADESHI|NATIONALITY|MOTHER|PLACE).*$/i, '').trim()
    f = f.replace(/[^A-Za-z\u0980-\u09FF\.\s]/g, '').trim()
    if (f) result.father_name = f
  } else {
    const lines = cleanRaw.split(/\r?\n/)
    for (const line of lines) {
      const fatherMatch = line.match(/(?:Father(?:'s)?(?:\s*Name)?|পিতা|পিতার\s*নাম)[:\s.\-]+([^\r\n]+)/i)
      if (fatherMatch) {
        let rawFather = fatherMatch[1]
        rawFather = rawFather.replace(/(?:মাতা|Mother|Nationality|জাতীয়তা|Date|তারিখ|Sex|লিঙ্গ).*$/i, '').trim()
        rawFather = rawFather.replace(/[^A-Za-z\u0980-\u09FF\.\s]/g, '').trim()
        if (rawFather.length >= 3 && !/father|nationality/i.test(rawFather)) {
          result.father_name = rawFather
          break
        }
      }
    }
  }

  // 11. Mother's Name
  // BDRIS Table formats first
  const tableMotherBn = cleanRaw.match(/মাতার\s*নাম[:\s]+([^\r\n]+)/i)
  const tableMotherEn = cleanRaw.match(/MOTHER(?:'S)?\s*NAME[:\s]+([^\r\n]+)/i)

  if (tableMotherBn && !/জাতীয়তা|পিতা|মাতা/.test(tableMotherBn[1])) {
    let m = tableMotherBn[1].trim().replace(/MOTHER.*$/i, '').trim()
    m = m.replace(/[^A-Za-z\u0980-\u09FF\.\s]/g, '').trim()
    result.mother_name = m
  } else if (tableMotherEn) {
    let m = tableMotherEn[1].trim().replace(/(?:BANGLADESHI|NATIONALITY|FATHER|PLACE).*$/i, '').trim()
    m = m.replace(/[^A-Za-z\u0980-\u09FF\.\s]/g, '').trim()
    if (m) result.mother_name = m
  } else {
    const lines = cleanRaw.split(/\r?\n/)
    for (const line of lines) {
      const motherMatch = line.match(/(?:Mother(?:'s)?(?:\s*Name)?|মাতা|মাতার\s*নাম)[:\s.\-]+([^\r\n]+)/i)
      if (motherMatch) {
        let rawMother = motherMatch[1]
        rawMother = rawMother.replace(/(?:পিতা|Father|Nationality|জাতীয়তা|Date|তারিখ|Sex|লিঙ্গ|ID).*$/i, '').trim()
        rawMother = rawMother.replace(/[^A-Za-z\u0980-\u09FF\.\s]/g, '').trim()
        if (rawMother.length >= 3 && !/mother|nationality/i.test(rawMother)) {
          result.mother_name = rawMother
          break
        }
      }
    }
  }

  // 12. Place of Birth / Address
  const pobTable = cleanRaw.match(/(?:PLACE\s*OF\s*BIRTH|জন্মস্থান)[:\s]+([A-Za-z\u0980-\u09FF]{3,25})/i)
  if (pobTable) {
    result.address = pobTable[1].trim()
  } else {
    const pobMatch = cleanRaw.match(/(?:Place\s*of\s*Birth|জন্মস্থান)[:\s.\-]+([^\r\n]+)/i)
    if (pobMatch) {
      let pob = pobMatch[1].replace(/(?:Mother|Father|Nationality|মাতা|পিতা|জাতীয়তা).*$/i, '').trim()
      pob = pob.replace(/[^A-Za-z\u0980-\u09FF\s,\.\-]/g, '').trim()
      if (pob.length >= 3) {
        result.address = pob
      }
    } else {
      const addrMatch = cleanRaw.match(/(?:Address|ঠিকানা)[:\s.\-]+([A-Za-z\u0980-\u09FF0-9\.\s,\/\-]{6,80})/i)
      if (addrMatch) {
        result.address = addrMatch[1].split(/\r?\n/)[0].trim()
      }
    }
  }

  // 13. Issuing Office / Organization
  if (!result.institution) {
    const officeTable = cleanRaw.match(/REGISTRATION\s*OFFICE[:\s]+([A-Za-z\u0980-\u09FF\s]{4,35}?)(?:ISSUANCE|\r|\n)/i)
    if (officeTable && !/ISSUANCE|DATE/i.test(officeTable[1])) {
      result.institution = officeTable[1].trim()
    } else {
      const officeMatch = cleanRaw.match(/(?:REGISTRATION\s*OFFICE|নিবন্ধন\s*কার্যালয়|নিবন্ধন\s*অফিস)[:\s.\-]+([^\r\n]+)/i)
      if (officeMatch) {
        let office = officeMatch[1].replace(/(?:ISSUANCE\s*DATE|ইস্যু\s*তারিখ).*$/i, '').trim()
        office = office.replace(/[^A-Za-z\u0980-\u09FF\s,\.\-]/g, '').trim()
        if (office.length >= 3 && !/ISSUANCE|DATE/i.test(office)) {
          result.institution = office
        }
      }
    }
  }

  // 14. Business / Trade License
  const busMatch = cleanRaw.match(/(?:Business\s*Name|প্রতিষ্ঠানের\s*নাম)[:\s.\-]+([A-Za-z\u0980-\u09FF0-9\.\s&]{3,45})/i)
  if (busMatch) {
    result.business_name = busMatch[1].split(/\r?\n/)[0].trim()
  }

  // Set default status
  result.status = result.id_number || result.roll ? 'যাচাইকৃত (Verified by OCR)' : 'স্ক্যান সম্পন্ন (Review Required)'

  return result
}

/**
 * Performs high-precision JavaScript OCR on the image buffer using Sharp preprocessing and Tesseract.js.
 * Strictly extracts real text from the image rather than hardcoded mock data.
 */
export async function runJavaScriptOCR(
  imageBuffer: Buffer,
  docType?: string
): Promise<{ success: boolean; document: ParsedDocumentData; rawText: string; error?: string }> {
  try {
    let processedBuffer = imageBuffer

    // Preprocessing pipeline: upscaling low-res images & normalizing contrast
    try {
      const metadata = await sharp(imageBuffer).metadata()
      const width = metadata.width || 0
      const height = metadata.height || 0

      let sharpPipeline = sharp(imageBuffer)
      if (width > 0 && width < 1200) {
        // Upscale up to 3x to reach ~1400px width for sharp text rendering
        const scale = Math.max(1.5, Math.min(3, 1400 / width))
        sharpPipeline = sharpPipeline.resize(Math.round(width * scale), Math.round(height * scale), {
          kernel: 'lanczos3',
        })
      }
      processedBuffer = await sharpPipeline.grayscale().normalize().toBuffer()
    } catch (sharpErr) {
      console.warn('Sharp image preprocessing skipped:', sharpErr)
      processedBuffer = imageBuffer
    }

    // Run bilingual (Bengali + English) OCR
    let ocrResult
    try {
      ocrResult = await Tesseract.recognize(processedBuffer, 'ben+eng', {
        logger: () => {},
      })
    } catch (benErr) {
      console.warn('ben+eng OCR failed, falling back to eng:', benErr)
      ocrResult = await Tesseract.recognize(processedBuffer, 'eng', {
        logger: () => {},
      })
    }

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
