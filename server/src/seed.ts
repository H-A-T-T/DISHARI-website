import { pool } from './db.js'
import { initDatabase } from './schema.js'

export const officialServicesData = [
  {
    slug: 'passport',
    name_bn: 'পাসপোর্ট আবেদন',
    name_en: 'Passport Application',
    category: 'identity',
    department_bn: 'ইমিগ্রেশন ও পাসপোর্ট অধিদপ্তর (DIP)',
    department_en: 'Department of Immigration and Passports',
    submission_type: 'hybrid',
    fee: '৪,০২৫',
    fee_note_bn: '৪৮ পাতা, ৫ বছর মেয়াদী সাধারণ আবেদনের ফি (১৫% ভ্যাটসহ)',
    processing_time_bn: '২১ কার্যদিবস (সাধারণ) / ১০ কার্যদিবস (জরুরি)',
    official_url: 'https://www.epassport.gov.bd',
    apply_location_bn: 'অনলাইনে আবেদন ফরম পূরণ শেষে নির্ধারিত আঞ্চলিক পাসপোর্ট অফিসে বায়োমেট্রিক প্রদান',
    required_docs: [
      {
        name_bn: 'অনলাইন আবেদনপত্রের সারসংক্ষেপ (Application Summary) ও মূল আবেদনপত্র',
        name_en: 'Application Summary & Full Form Printout',
        copy_type: 'online_print',
        note_bn: 'epassport.gov.bd পোর্টাল থেকে প্রিন্ট করা অ্যাপয়েন্টমেন্ট তারিখ ও বারকোডযুক্ত কপি'
      },
      {
        name_bn: 'জাতীয় পরিচয়পত্র (NID) অথবা ১৭ ডিজিটের অনলাইন জন্ম নিবন্ধন সনদ',
        name_en: 'National ID (NID) or 17-digit Online Birth Certificate',
        copy_type: 'both',
        note_bn: '১৮ বছরের ঊর্ধ্বে NID বাধ্যতামূলক, অপ্রাপ্তবয়স্কদের ক্ষেত্রে অনলাইন জন্ম নিবন্ধন'
      },
      {
        name_bn: 'পাসপোর্ট ফি পরিশোধের চালান বা পেমেন্ট স্লিপ',
        name_en: 'Payment Slip / Bank Challan',
        copy_type: 'original',
        note_bn: 'অফলাইন ব্যাংকে ফি জমা দিলে জমার রসিদ, অনলাইনে দিলে পেমেন্ট রসিদ'
      },
      {
        name_bn: 'সরকারি কর্মকর্তা/কর্মচারীদের ক্ষেত্রে GO / NOC (প্রযোজ্য ক্ষেত্রে)',
        name_en: 'Government Order (GO) or No Objection Certificate (NOC)',
        copy_type: 'original',
        note_bn: 'শুধুমাত্র সরকারি, আধা-সরকারি বা স্বায়ত্তশাসিত প্রতিষ্ঠানে কর্মরতদের জন্য'
      },
      {
        name_bn: 'নাগরিক সনদপত্র ও পূর্ববর্তী পাসপোর্ট (যদি থাকে)',
        name_en: 'Citizenship Certificate & Previous Passport (if any)',
        copy_type: 'original',
        note_bn: 'পুরাতন পাসপোর্ট থাকলে মূল কপি ও ডাটা পেজের ফটোকপি সাথে রাখতে হবে'
      }
    ],
    steps: [
      {
        step: 1,
        title_bn: 'আঞ্চলিক পাসপোর্ট অফিস নির্বাচন ও সেবা যাচাই',
        description_bn: 'epassport.gov.bd পোর্টালে আপনার বর্তমান ও স্থায়ী ঠিকানা অনুযায়ী সংশ্লিষ্ট আঞ্চলিক পাসপোর্ট অফিস নির্ধারণ করুন।',
        url: 'https://www.epassport.gov.bd'
      },
      {
        step: 2,
        title_bn: 'অনলাইনে ই-পাসপোর্ট ফরম পূরণ',
        description_bn: 'সঠিক জাতীয় পরিচয়পত্র বা জন্ম নিবন্ধন তথ্যের সাথে মিল রেখে অনলাইনে প্রতিটি ধাপের ব্যক্তিগত ও পারিবারিক তথ্য পূরণ করুন।',
        url: 'https://www.epassport.gov.bd/authorization/applicant-registration'
      },
      {
        step: 3,
        title_bn: 'পাসপোর্ট ফি পরিশোধ',
        description_bn: 'অনলাইনে (কার্ড/মোবাইল ব্যাংকিং) অথবা সরকার নির্ধারিত ব্যাংকের (A-Challan) মাধ্যমে পাসপোর্ট ফি পরিশোধ করুন।',
        url: 'https://www.epassport.gov.bd'
      },
      {
        step: 4,
        title_bn: 'পাসপোর্ট অফিসে বায়োমেট্রিক এনরোলমেন্ট',
        description_bn: 'নির্ধারিত দিনে সকল মূল কাগজপত্র এবং আবেদনপত্র সহ পাসপোর্ট অফিসে উপস্থিত হয়ে ছবি, আঙুলের ১০ ছাপ এবং আইরিশ স্ক্যান সম্পন্ন করুন।',
        url: 'https://www.epassport.gov.bd'
      },
      {
        step: 5,
        title_bn: 'ডেলিভারি স্লিপ সংরক্ষণ ও পাসপোর্ট গ্রহণ',
        description_bn: 'এনরোলমেন্ট শেষে প্রদত্ত ডেলিভারি স্লিপ সংরক্ষণ করুন। মোবাইলে পাসপোর্ট প্রস্তুতের এসএমএস পেলে স্লিপ দেখিয়ে পাসপোর্ট সংগ্রহ করুন।',
        url: 'https://www.epassport.gov.bd'
      }
    ],
    important_notes_bn: [
      'NID বা জন্ম নিবন্ধনের নামের বানানের সাথে আবেদনপত্রের তথ্য হুবহু মিল থাকতে হবে।',
      'পাসপোর্ট অফিসে ছবি তোলার জন্য সাদা বা হালকা রঙের পোশাক না পরে গাঢ় রঙের পোশাক পরিধান করা উচিত।'
    ],
    common_mistakes_bn: [
      'পাসপোর্ট অফিসে মূল NID বা জন্ম নিবন্ধন সনদ সাথে না নিয়ে যাওয়া।',
      'অনলাইন আবেদন ফরম সাবমিট করার পর প্রিন্ট কপিতে বানান বা পিতা-মাতার নামের ভুল খেয়াল না করা।'
    ]
  },
  {
    slug: 'passport-renewal',
    name_bn: 'পাসপোর্ট নবায়ন / রি-ইস্যু',
    name_en: 'Passport Renewal / Re-issue',
    category: 'identity',
    department_bn: 'ইমিগ্রেশন ও পাসপোর্ট অধিদপ্তর (DIP)',
    department_en: 'Department of Immigration and Passports',
    submission_type: 'hybrid',
    fee: '৪,০২৫',
    fee_note_bn: '৪৮ পাতা, ৫ বছর সাধারণ রি-ইস্যু ফি (১৫% ভ্যাটসহ)',
    processing_time_bn: '২১ কার্যদিবস (সাধারণ) / ১০ কার্যদিবস (জরুরি)',
    official_url: 'https://www.epassport.gov.bd',
    apply_location_bn: 'অনলাইনে রি-ইস্যু আবেদন করে আঞ্চলিক পাসপোর্ট অফিসে পুরাতন পাসপোর্টসহ জমা',
    required_docs: [
      {
        name_bn: 'বিদ্যমান মূল পাসপোর্ট ও ডাটা পেজের ফটোকপি',
        name_en: 'Original Old Passport & Photocopy of Data Pages',
        copy_type: 'both',
        note_bn: 'মেয়াদোত্তীর্ণ বা হারানো পাসপোর্টের মূল কপি (হারিয়ে গেলে জিডি কপি আবশ্যক)'
      },
      {
        name_bn: 'জাতীয় পরিচয়পত্র (NID) কার্ডের মূল ও ফটোকপি',
        name_en: 'National ID Card (Original & Copy)',
        copy_type: 'both',
        note_bn: 'পাসপোর্টের তথ্যের সাথে NID তথ্যের অসঙ্গতি থাকলে সংশোধনের উপযুক্ত প্রমাণক'
      },
      {
        name_bn: 'অনলাইন আবেদন সারসংক্ষেপ ও ফি পেমেন্ট স্লিপ',
        name_en: 'Online Application Summary & Payment Challan',
        copy_type: 'online_print',
        note_bn: 'epassport.gov.bd থেকে প্রাপ্ত নিশ্চিতকরণ স্লিপ'
      },
      {
        name_bn: 'পাসপোর্ট হারিয়ে গেলে থানার সাধারণ ডায়েরি (GD) এর মূল কপি',
        name_en: 'Police GD (General Diary) Original Copy',
        copy_type: 'original',
        note_bn: 'শুধুমাত্র পাসপোর্ট হারানোর ক্ষেত্রে প্রযোজ্য'
      }
    ],
    steps: [
      {
        step: 1,
        title_bn: 'ই-পাসপোর্ট পোর্টালে লগইন ও রি-ইস্যু নির্বাচন',
        description_bn: 'epassport.gov.bd অ্যাকাউন্টে লগইন করে ‘Re-issue / Renewal’ অপশন বেছে নিন।',
        url: 'https://www.epassport.gov.bd'
      },
      {
        step: 2,
        title_bn: 'পূর্ববর্তী পাসপোর্টের তথ্য এন্ট্রি',
        description_bn: 'পুরাতন পাসপোর্টের নম্বর, প্রদানের তারিখ ও মেয়াদ শেষের তথ্য প্রদান করুন।',
        url: 'https://www.epassport.gov.bd'
      },
      {
        step: 3,
        title_bn: 'ফি প্রদান ও অ্যাপয়েন্টমেন্ট নির্ধারণ',
        description_bn: 'অনলাইন বা অফলাইন ব্যাংকিংয়ের মাধ্যমে নবায়ন ফি পরিশোধ করুন।',
        url: 'https://www.epassport.gov.bd'
      },
      {
        step: 4,
        title_bn: 'পাসপোর্ট অফিসে পুরাতন পাসপোর্ট যাচাই ও বায়োমেট্রিক',
        description_bn: 'পুরাতন মূল পাসপোর্ট এবং আবেদনপত্রের সাথে পাসপোর্ট অফিসে গিয়ে যাচাই সম্পন্ন করুন।',
        url: 'https://www.epassport.gov.bd'
      },
      {
        step: 5,
        title_bn: 'নতুন পাসপোর্ট গ্রহণ',
        description_bn: 'পুরাতন পাসপোর্ট বাতিল (Cancelled) সিলমোহর করিয়ে নতুন পাসপোর্ট সংগ্রহ করুন।',
        url: 'https://www.epassport.gov.bd'
      }
    ],
    important_notes_bn: ['পুরাতন পাসপোর্ট বাতিল করার সময় পূর্ববর্তী কার্যকর ভিসা বহাল রাখা যায়।'],
    common_mistakes_bn: ['হারানো পাসপোর্টের ক্ষেত্রে পুলিশ জিডি না নিয়ে সরাসরি পাসপোর্ট অফিসে চলে যাওয়া।']
  },
  {
    slug: 'nid-correction',
    name_bn: 'জাতীয় পরিচয়পত্র (NID) সংশোধন',
    name_en: 'National ID (NID) Correction',
    category: 'identity',
    department_bn: 'বাংলাদেশ নির্বাচন কমিশন (EC)',
    department_en: 'Bangladesh Election Commission',
    submission_type: 'online_bot',
    fee: '২৩০',
    fee_note_bn: 'প্রথমবার সাধারণ তথ্য সংশোধন ফি ২০০ টাকা + ১৫% ভ্যাট ৩০ টাকা = মোট ২৩০ টাকা',
    processing_time_bn: '১৫-৪৫ কার্যদিবস',
    official_url: 'https://services.nidw.gov.bd',
    apply_location_bn: 'নির্বাচন কমিশনের NID অনলাইন সার্ভিস পোর্টালে সরাসরি আবেদন',
    required_docs: [
      {
        name_bn: 'এসএসসি / সমমান পরীক্ষার মূল সনদপত্র (শিক্ষাগত যোগ্যদের ক্ষেত্রে)',
        name_en: 'SSC / Equivalent Original Certificate',
        copy_type: 'original',
        note_bn: 'নাম বা জন্মতারিখ সংশোধনের জন্য সবচেয়ে শক্তিশালী আইনি দলিল'
      },
      {
        name_bn: 'অনলাইন ১৭ ডিজিটের ডিজিটাল জন্ম নিবন্ধন সনদ',
        name_en: '17-digit Online Digital Birth Certificate',
        copy_type: 'online_print',
        note_bn: 'bdris.gov.bd এর সাথে যাচাইযোগ্য হতে হবে'
      },
      {
        name_bn: 'পিতা/মাতা বা ভাই/বোনের NID কার্ডের কপি (প্রয়োজনে)',
        name_en: "Parents' or Siblings' NID Copy",
        copy_type: 'photocopy',
        note_bn: 'পিতা বা মাতার নাম সংশোধনের ক্ষেত্রে সহায়ক প্রমাণ'
      },
      {
        name_bn: 'নিকাহনামা / কাবিননামা (বৈবাহিক অবস্থা বা স্বামীর নাম যুক্ত করতে)',
        name_en: 'Registered Marriage Deed (Nikahnama)',
        copy_type: 'both',
        note_bn: 'বিবাহিত নারীদের ক্ষেত্রে স্বামী পরিবর্তন বা যুক্ত করণে আবশ্যক'
      },
      {
        name_bn: 'ঠিকানা পরিবর্তনের ক্ষেত্রে চেয়ারম্যান/কাউন্সিলর প্রত্যয়ন বা ইউটিলিটি বিল',
        name_en: 'Citizen Certificate / Utility Bill',
        copy_type: 'original',
        note_bn: 'বিদ্যুৎ, গ্যাস বা পানির বিলের কপি ও স্থানীয় জনপ্রতিনিধির প্রত্যয়ন'
      }
    ],
    steps: [
      {
        step: 1,
        title_bn: 'NID পোর্টালে অ্যাকাউন্ট রেজিস্ট্রেশন ও ফেস ভেরিফিকেশন',
        description_bn: 'services.nidw.gov.bd সাইটে NID নম্বর ও জন্মতারিখ দিয়ে NID Wallet অ্যাপের মাধ্যমে ফেস যাচাই করে পাসওয়ার্ড সেট করুন।',
        url: 'https://services.nidw.gov.bd'
      },
      {
        step: 2,
        title_bn: 'প্রোফাইল থেকে তথ্য সম্পাদন (Edit Information)',
        description_bn: 'প্রোফাইলে গিয়ে ‘এডিট’ বাটনে চাপুন এবং ভুল তথ্য পরিবর্তন করে সঠিক তথ্যটি লিখুন।',
        url: 'https://services.nidw.gov.bd'
      },
      {
        step: 3,
        title_bn: 'সরকারি সংশোধন ফি প্রদান',
        description_bn: 'বিকাশ, রকেট বা নেক্সাস পে-এর মাধ্যমে নির্বাচন কমিশনের সরকারি ফি কোডে নির্দিষ্ট ফি পরিশোধ করুন।',
        url: 'https://services.nidw.gov.bd'
      },
      {
        step: 4,
        title_bn: 'সহায়ক কাগজপত্র আপলোড',
        description_bn: 'সংশোধিত তথ্যের সপক্ষে এসএসসি সনদ, জন্ম নিবন্ধন, নিকাহনামা বা সার্ভিস বুকের স্পষ্ট স্ক্যান কপি সংযুক্ত করুন।',
        url: 'https://services.nidw.gov.bd'
      },
      {
        step: 5,
        title_bn: 'আবেদন ট্র্যাকিং ও সংশোধিত NID ডাউনলোড',
        description_bn: 'অনুমোদনের পর এসএমএস নোটিফিকেশন পেলে পোর্টাল থেকে বিনামূল্যে সংশোধিত ডিজিটাল NID ডাউনলোড ও প্রিন্ট করুন।',
        url: 'https://services.nidw.gov.bd'
      }
    ],
    important_notes_bn: ['সংশোধনের মাত্রাভেদে আবেদন ক, খ, গ বা ঘ ক্যাটাগরিতে উপজেলা থেকে বিভাগীয় পর্যায়ে অনুমোদিত হয়।'],
    common_mistakes_bn: ['অস্পষ্ট বা মোবাইল দিয়ে তোলা ছায়াযুক্ত ফটোকপির ছবি আপলোড করা।']
  },
  {
    slug: 'birth-registration',
    name_bn: 'নতুন জন্ম নিবন্ধন আবেদন',
    name_en: 'Birth Registration Application',
    category: 'identity',
    department_bn: 'স্থানীয় সরকার বিভাগ (জন্ম ও মৃত্যু নিবন্ধন রেজিস্ট্রার জেনারেলের কার্যালয়)',
    department_en: 'Office of the Registrar General, Birth and Death Registration',
    submission_type: 'hybrid',
    fee: 'বিনামূল্যে',
    fee_note_bn: 'জন্মের ৪৫ দিনের মধ্যে বিনামূল্যে, ৫ বছর পর্যন্ত ২৫ টাকা, ৫ বছরের বেশি হলে ৫০ টাকা',
    processing_time_bn: '৭ কার্যদিবস',
    official_url: 'https://bdris.gov.bd',
    apply_location_bn: 'bdris.gov.bd ওয়েবসাইটে অনলাইনে আবেদন করে সংশ্লিষ্ট ইউনিয়ন পরিষদ / পৌরসভা / সিটি কর্পোরেশন কার্যালয়ে জমা',
    required_docs: [
      {
        name_bn: 'হাসপাতাল বা ক্লিনিক কর্তৃক প্রদত্ত ডিসচার্জ সার্টিফিকেট বা প্রসূতি কার্ড',
        name_en: 'Hospital Birth Certificate / Discharge Certificate',
        copy_type: 'original',
        note_bn: 'হাসপাতালে জন্ম না হলে রেজিস্টার্ড চিকিৎসকের প্রত্যায়নপত্র'
      },
      {
        name_bn: 'পিতা ও মাতার অনলাইন ১৭ ডিজিটের জন্ম নিবন্ধন সনদ',
        name_en: "Parents' Online Birth Registration Certificates",
        copy_type: 'online_print',
        note_bn: '২০০১ সালের পরে জন্ম নেওয়া শিশুদের ক্ষেত্রে পিতা-মাতার অনলাইন জন্ম সনদ থাকা বাধ্যতামূলক'
      },
      {
        name_bn: 'পিতা ও মাতার জাতীয় পরিচয়পত্র (NID)',
        name_en: "Parents' National ID (NID)",
        copy_type: 'photocopy',
        note_bn: 'পিতা ও মাতার NID কার্ডের সুস্পষ্ট কপি'
      },
      {
        name_bn: 'বাসার হোল্ডিং ট্যাক্সের রসিদ বা ইউটিলিটি বিলের কপি',
        name_en: 'Holding Tax Receipt or Utility Bill',
        copy_type: 'both',
        note_bn: 'স্থায়ী বা বর্তমান ঠিকানার প্রমাণ হিসেবে'
      },
      {
        name_bn: 'বয়স্কদের ক্ষেত্রে শিক্ষাগত যোগ্যতার সনদ (PSC/JSC/SSC)',
        name_en: 'Educational Certificate (for adults)',
        copy_type: 'photocopy',
        note_bn: 'বয়স প্রমাণের জন্য শিক্ষাগত যোগ্যতার সনদ অথবা সিভিল সার্জনের প্রত্যয়ন'
      }
    ],
    steps: [
      {
        step: 1,
        title_bn: 'BDRIS পোর্টালে জন্ম নিবন্ধনের আবেদন শুরু',
        description_bn: 'bdris.gov.bd ওয়েবসাইটে গিয়ে ‘জন্ম নিবন্ধন আবেদন’ বাটনে ক্লিক করুন এবং নিবন্ধক কার্যালয় (ইউনিয়ন পরিষদ/পৌরসভা) নির্বাচন করুন।',
        url: 'https://bdris.gov.bd'
      },
      {
        step: 2,
        title_bn: 'ব্যক্তিগত ও পিতা-মাতার তথ্য পূরণ',
        description_bn: 'নাম (বাংলা ও ইংরেজি), জন্মতারিখ, লিঙ্গ এবং পিতা-মাতার ১৭ ডিজিটের জন্ম নিবন্ধন নম্বর দিয়ে তথ্য সম্পূর্ণ করুন।',
        url: 'https://bdris.gov.bd'
      },
      {
        step: 3,
        title_bn: 'কাগজপত্র আপলোড ও আবেদন সাবমিট',
        description_bn: 'হাসপাতালের ছাড়পত্র, ইপিআই টিকা কার্ড বা চিকিৎসকের প্রত্যয়নপত্রের ফাইল আপলোড করে আবেদন সাবমিট করুন।',
        url: 'https://bdris.gov.bd'
      },
      {
        step: 4,
        title_bn: 'আবেদন ফরম প্রিন্ট ও কার্যালয়ে জমা',
        description_bn: 'অনলাইন আবেদনের প্রিন্ট কপি সহ মূল প্রমাণপত্রাদি নিয়ে সংশ্লিষ্ট ইউনিয়ন পরিষদ বা ওয়ার্ড কাউন্সিলর অফিসে ১৫ দিনের মধ্যে উপস্থিত হন।',
        url: 'https://bdris.gov.bd'
      },
      {
        step: 5,
        title_bn: 'যাচাই শেষে জন্ম সনদ সংগ্রহ',
        description_bn: 'নিবন্ধক কর্তৃক অনুমোদনের পর নির্ধারিত তারিখে স্বাক্ষর ও সিলযুক্ত মূল ডিজিটাল জন্ম সনদ সংগ্রহ করুন।',
        url: 'https://bdris.gov.bd'
      }
    ],
    important_notes_bn: ['ইংরেজি নাম লেখার ক্ষেত্রে পাসপোর্টের নামের বানান বা পূর্ববর্তী সনদের সাথে হুবহু মিল রাখা উচিত।'],
    common_mistakes_bn: ['পিতা-মাতার নাম বাংলায় পূরণ করলেও ইংরেজি অপশন ফাঁকা রাখা।']
  },
  {
    slug: 'birth-registration-correction',
    name_bn: 'জন্ম নিবন্ধন সংশোধন',
    name_en: 'Birth Registration Correction',
    category: 'identity',
    department_bn: 'স্থানীয় সরকার বিভাগ (রেজিস্ট্রার জেনারেলের কার্যালয়)',
    department_en: 'Office of the Registrar General, Birth and Death Registration',
    submission_type: 'hybrid',
    fee: '৫০',
    fee_note_bn: 'জন্ম তারিখ ব্যতীত অন্যান্য তথ্য সংশোধন ফি ৫০ টাকা, জন্ম তারিখ সংশোধন ১০০ টাকা',
    processing_time_bn: '৭-১৫ কার্যদিবস',
    official_url: 'https://bdris.gov.bd',
    apply_location_bn: 'অনলাইনে আবেদন ফরম পূরণ করে সংশ্লিষ্ট নিবন্ধক কার্যালয়ে মূল কাগজপত্রসহ উপস্থাপন',
    required_docs: [
      {
        name_bn: 'বিদ্যমান জন্ম সনদের অনলাইন কপি',
        name_en: 'Existing Birth Certificate Copy',
        copy_type: 'online_print',
        note_bn: '১৭ ডিজিটের অনলাইন জন্ম নিবন্ধন'
      },
      {
        name_bn: 'এসএসসি / জেএসসি / পিএসসি সনদপত্র (প্রযোজ্য ক্ষেত্রে)',
        name_en: 'Educational Certificates (SSC/JSC/PSC)',
        copy_type: 'both',
        note_bn: 'নাম ও জন্মতারিখ সংশোধনের প্রধান ভিত্তি'
      },
      {
        name_bn: 'পিতা ও মাতার সংশোধিত অনলাইন জন্ম সনদ বা NID কার্ড',
        name_en: "Parents' Corrected NID / Birth Certificate",
        copy_type: 'photocopy',
        note_bn: 'পিতা-মাতার নাম সংশোধনের ক্ষেত্রে'
      },
      {
        name_bn: 'পাসপোর্ট বা ভোটার আইডি কার্ডের কপি (প্রাপ্তবয়স্ক হলে)',
        name_en: 'Passport or Voter ID Copy',
        copy_type: 'both',
        note_bn: 'তথ্য প্রমাণের সহায়ক নথি'
      }
    ],
    steps: [
      {
        step: 1,
        title_bn: 'BDRIS সাইটে সংশোধন ফরম নির্বাচন',
        description_bn: 'bdris.gov.bd সাইটে গিয়ে ‘জন্ম নিবন্ধন তথ্য সংশোধন আবেদন’ নির্বাচন করে ১৭ ডিজিটের নম্বর ও জন্মতারিখ দিন।',
        url: 'https://bdris.gov.bd'
      },
      {
        step: 2,
        title_bn: 'ভুল তথ্য নির্বাচন ও সঠিক তথ্য এন্ট্রি',
        description_bn: 'যে ফিল্ডটি সংশোধন করতে চান (নাম, জন্মতারিখ, পিতা-মাতার নাম) তা সিলেক্ট করে সঠিক তথ্য ইনপুট দিন।',
        url: 'https://bdris.gov.bd'
      },
      {
        step: 3,
        title_bn: 'আইনি ও প্রাতিষ্ঠানিক প্রমাণক আপলোড',
        description_bn: 'এসএসসি সনদ, পিতা-মাতার NID বা পাসপোর্ট ইত্যাদি স্ক্যান করে সংযুক্ত করুন।',
        url: 'https://bdris.gov.bd'
      },
      {
        step: 4,
        title_bn: 'আবেদন কপি জমা ও শুনানি',
        description_bn: 'আবেদনের প্রিন্ট কপি নিয়ে ইউনিয়ন পরিষদ বা পৌরসভায় গিয়ে মূল কাগজ প্রদর্শন করুন।',
        url: 'https://bdris.gov.bd'
      },
      {
        step: 5,
        title_bn: 'সংশোধিত সনদ গ্রহণ',
        description_bn: 'অনুমোদন শেষে প্রিন্ট করা সংশোধিত মূল জন্ম নিবন্ধন সনদ সংগ্রহ করুন।',
        url: 'https://bdris.gov.bd'
      }
    ],
    important_notes_bn: ['জন্মতারিখ সংশোধনের ক্ষেত্রে সর্বোচ্চ ৫ বছর বা বয়স অনুযায়ী মেডিকেল বোর্ডের প্রতিবেদন লাগতে পারে।'],
    common_mistakes_bn: ['শিক্ষাগত সনদ ও NID-র সাথে মিল না রেখে ইচ্ছামতো জন্মতারিখ পরিবর্তনের আবেদন করা।']
  },
  {
    slug: 'death-registration',
    name_bn: 'মৃত্যু নিবন্ধন আবেদন',
    name_en: 'Death Registration Application',
    category: 'identity',
    department_bn: 'স্থানীয় সরকার বিভাগ (রেজিস্ট্রার জেনারেলের কার্যালয়)',
    department_en: 'Office of the Registrar General, Birth and Death Registration',
    submission_type: 'hybrid',
    fee: 'বিনামূল্যে',
    fee_note_bn: 'মৃত্যুর ৪৫ দিনের মধ্যে বিনামূল্যে, ৪৫ দিন থেকে ৫ বছর পর্যন্ত ২৫ টাকা, ৫ বছরের বেশি হলে ৫০ টাকা',
    processing_time_bn: '৭ কার্যদিবস',
    official_url: 'https://bdris.gov.bd',
    apply_location_bn: 'bdris.gov.bd-এ অনলাইনে আবেদন করে সংশ্লিষ্ট স্থানীয় সরকার অফিসে জমা',
    required_docs: [
      {
        name_bn: 'মৃত ব্যক্তির অনলাইন ১৭ ডিজিটের জন্ম নিবন্ধন সনদ',
        name_en: "Deceased Person's 17-digit Online Birth Certificate",
        copy_type: 'online_print',
        note_bn: 'মৃত্যু নিবন্ধনের পূর্বে মৃত ব্যক্তির অনলাইন জন্ম নিবন্ধন থাকা আবশ্যক'
      },
      {
        name_bn: 'রেজিস্টার্ড চিকিৎসক / হাসপাতাল কর্তৃক প্রদত্ত মৃত্যুর প্রত্যয়নপত্র',
        name_en: 'Doctor / Hospital Death Certificate',
        copy_type: 'original',
        note_bn: 'হাসপাতালে মৃত্যু হলে চিকিৎসকের স্বাক্ষর ও সীলমোহরযুক্ত সনদ'
      },
      {
        name_bn: 'কবরস্থান বা শ্মশান কর্তৃপক্ষ কর্তৃক প্রদত্ত দাফন / সत्कार রসিদ',
        name_en: 'Burial / Cremation Receipt',
        copy_type: 'both',
        note_bn: 'কবরস্থান বা শ্মশানের দায়িত্বপ্রাপ্ত ব্যক্তির প্রত্যয়ন'
      },
      {
        name_bn: 'ইউনিয়ন পরিষদ সদস্য বা ওয়ার্ড কাউন্সিলরের মৃত্যু প্রত্যয়নপত্র',
        name_en: 'Ward Councillor / UP Member Death Certificate',
        copy_type: 'original',
        note_bn: 'স্থানীয় জনপ্রতিনিধি কর্তৃক মৃত্যুর তারিখ ও কারণের সত্যতা প্রত্যয়ন'
      },
      {
        name_bn: 'আবেদনকারীর জাতীয় পরিচয়পত্র (NID) বা জন্ম সনদ',
        name_en: "Applicant's NID / Birth Certificate",
        copy_type: 'photocopy',
        note_bn: 'উত্তরাধিকারী বা আত্মীয় হিসেবে সম্পর্কের প্রমাণ'
      }
    ],
    steps: [
      {
        step: 1,
        title_bn: 'অনলাইনে মৃত ব্যক্তির জন্ম সনদ অনুসন্ধান',
        description_bn: 'bdris.gov.bd পোর্টালে মৃত ব্যক্তির জন্ম নিবন্ধন নম্বর ও জন্মতারিখ দিয়ে রেকর্ডটি আনুন।',
        url: 'https://bdris.gov.bd'
      },
      {
        step: 2,
        title_bn: 'মৃত্যুর তারিখ, স্থান ও কারণ লিপিবদ্ধকরণ',
        description_bn: 'মৃত্যুর সুনির্দিষ্ট তারিখ, স্থান (বাসা/হাসপাতাল) এবং মৃত্যুর কারণ নির্বাচন করুন।',
        url: 'https://bdris.gov.bd'
      },
      {
        step: 3,
        title_bn: 'আবেদনকারীর তথ্য ও সম্পর্ক এন্ট্রি',
        description_bn: 'মৃত ব্যক্তির সাথে আবেদনকারীর সম্পর্ক (স্বামী/স্ত্রী, সন্তান ইত্যাদি) ও যোগাযোগের নম্বর দিন।',
        url: 'https://bdris.gov.bd'
      },
      {
        step: 4,
        title_bn: 'ডাক্তারের প্রত্যয়ন ও প্রমাণক সহ আবেদন জমা',
        description_bn: 'প্রিন্ট করা অনলাইন ফর্মের সাথে চিকিৎসকের প্রত্যয়নপত্র ও দাফন রসিদ সহ ইউনিয়ন পরিষদ/পৌরসভায় জমা দিন।',
        url: 'https://bdris.gov.bd'
      },
      {
        step: 5,
        title_bn: 'মৃত্যু সনদপত্র সংগ্রহ',
        description_bn: 'যাচাই শেষে সরকারি মৃত্যু নিবন্ধন সনদ সংগ্রহ করুন (যা পরবর্তীতে ওয়ারিশ সনদের জন্য প্রয়োজন হয়)।',
        url: 'https://bdris.gov.bd'
      }
    ],
    important_notes_bn: ['ওয়ারিশ কায়েম সনদ বা সম্পত্তি বণ্টনের জন্য অফিসিয়াল মৃত্যু সনদ বাধ্যতামূলক।'],
    common_mistakes_bn: ['মৃত ব্যক্তির জন্ম সনদ অনলাইনে ডিজিটাল না করিয়ে সরাসরি মৃত্যু সনদের চেষ্টা করা।']
  },
  {
    slug: 'widow-allowance',
    name_bn: 'বিধবা ও স্বামী নিগৃহীতা মহিলা ভাতা',
    name_en: 'Widow & Deserted Women Allowance',
    category: 'welfare',
    department_bn: 'সমাজসেবা অধিদপ্তর (সমাজকল্যাণ মন্ত্রণালয়)',
    department_en: 'Department of Social Services (DSS)',
    submission_type: 'hybrid',
    fee: 'বিনামূল্যে',
    fee_note_bn: 'আবেদন সম্পূর্ণ বিনামূল্যে। মাসিক ভাতার হার ৭০০ টাকা (সরাসরি G2P মোবাইল ব্যাংকিংয়ে প্রদেয়)',
    processing_time_bn: '৬০-৯০ কার্যদিবস (বাছাই কমিটি সাপেক্ষে)',
    official_url: 'https://dss.gov.bd',
    apply_location_bn: 'dss.bhata.gov.bd অনলাইন পোর্টালে অথবা উপজেলা সমাজসেবা কার্যালয়ে',
    required_docs: [
      {
        name_bn: 'আবেদনকারিণীর মূল জাতীয় পরিচয়পত্র (NID) ও ফটোকপি',
        name_en: "Applicant's National ID (Original & Photocopy)",
        copy_type: 'both',
        note_bn: 'ভোটার তালিকায় নাম অন্তর্ভুক্তি নিশ্চিত হতে হবে'
      },
      {
        name_bn: 'স্বামীর মৃত্যু নিবন্ধন সনদপত্র (ডিজিটাল কপি)',
        name_en: "Husband's Digital Death Certificate",
        copy_type: 'both',
        note_bn: 'বিধবাদের ক্ষেত্রে ইউনিয়ন পরিষদ/পৌরসভা প্রদত্ত মৃত্যু সনদ'
      },
      {
        name_bn: 'স্বামী নিগৃহীতা বা পরিত্যক্তা হলে স্থানীয় চেয়ারম্যান/কাউন্সিলরের প্রত্যয়ন',
        name_en: 'Deserted Certificate from UP Chairman/Councillor',
        copy_type: 'original',
        note_bn: 'স্বামী পরিত্যক্তা নারীদের ক্ষেত্রে আবশ্যক'
      },
      {
        name_bn: 'আবেদনকারিণীর ২ কপি পাসপোর্ট সাইজ রঙিন ছবি',
        name_en: '2 Passport-size Color Photos',
        copy_type: 'original',
        note_bn: 'ইউপি সদস্য বা কাউন্সিলর কর্তৃক সত্যায়িত'
      },
      {
        name_bn: 'নমিনির NID কার্ডের ফটোকপি ও ১ কপি ছবি',
        name_en: "Nominee's NID Copy & Photo",
        copy_type: 'photocopy',
        note_bn: 'উত্তরাধিকারী নমিনির পরিচয়পত্র'
      },
      {
        name_bn: 'সচল মোবাইল ব্যাংকিং (বিকাশ/নগদ) সিম বা ব্যাংক হিসাব নম্বর',
        name_en: 'Active Mobile Financial Account (bKash/Nagad)',
        copy_type: 'original',
        note_bn: 'সরাসরি সরকারি ভাতা (G2P) পাওয়ার জন্য নিজের নামে নিবন্ধিত নম্বর'
      }
    ],
    steps: [
      {
        step: 1,
        title_bn: 'সামাজিক নিরাপত্তা পোর্টালে অনলাইন আবেদন',
        description_bn: 'dss.bhata.gov.bd সাইটে বা স্থানীয় ডিজিটাল সেন্টারে গিয়ে বিধবা ভাতার অনলাইন ফরম পূরণ করুন।',
        url: 'https://dss.gov.bd'
      },
      {
        step: 2,
        title_bn: 'আর্থ-সামাজিক ও পারিবারিক তথ্য এন্ট্রি',
        description_bn: 'বাৎসরিক আয় (১২,০০০ টাকার কম হতে হবে), পরিবারের সদস্য সংখ্যা ও নির্ভরশীলতার বিবরণ প্রদান করুন।',
        url: 'https://dss.gov.bd'
      },
      {
        step: 3,
        title_bn: 'পেমেন্ট মাধ্যম (বিকাশ/নগদ/ব্যাংক) সংযুক্তি',
        description_bn: 'সরকারি ভাতা গ্রহণের জন্য নিজের নামের বিকাশ বা নগদ একাউন্টের সঠিক বিবরণ দিন।',
        url: 'https://dss.gov.bd'
      },
      {
        step: 4,
        title_bn: 'স্থানীয় কমিটি কর্তৃক মাঠপর্যায়ে যাচাই',
        description_bn: 'ইউনিয়ন বা পৌর সমাজসেবা কমিটি কর্তৃক আবেদনকারীর অর্থনৈতিক অবস্থা ও বিধবা মর্যাদার সত্যতা যাচাই।',
        url: 'https://dss.gov.bd'
      },
      {
        step: 5,
        title_bn: 'ভাতা অনুমোদন ও সরাসরি অর্থ প্রাপ্তি (G2P)',
        description_bn: 'উপজেলা সমাজসেবা কমিটি চূড়ান্ত অনুমোদন দিলে প্রতি মাসে বা কোয়ার্টারে সরাসরি মোবাইলে ভাতার টাকা জমা হবে।',
        url: 'https://dss.gov.bd'
      }
    ],
    important_notes_bn: ['পুনরায় বিবাহবন্ধনে আবদ্ধ হলে বা নিয়মিত সরকারি পেনশনভোগী হলে এই ভাতা প্রযোজ্য হবে না।'],
    common_mistakes_bn: ['অন্য কারো নামে রেজিস্টার করা সিম নম্বরে ভাতার মোবাইল ব্যাংকিং একাউন্ট দেওয়া।']
  },
  {
    slug: 'old-age-allowance',
    name_bn: 'বয়স্ক ভাতা আবেদন',
    name_en: 'Old Age Allowance Application',
    category: 'welfare',
    department_bn: 'সমাজসেবা অধিদপ্তর (সমাজকল্যাণ মন্ত্রণালয়)',
    department_en: 'Department of Social Services (DSS)',
    submission_type: 'hybrid',
    fee: 'বিনামূল্যে',
    fee_note_bn: 'আবেদন সম্পূর্ণ বিনামূল্যে। মাসিক ভাতার হার ৭০০ টাকা (সরাসরি G2P মোবাইল ব্যাংকিংয়ে প্রদেয়)',
    processing_time_bn: '৬০-৯০ কার্যদিবস (বাছাই সাপেক্ষে)',
    official_url: 'https://dss.gov.bd',
    apply_location_bn: 'dss.bhata.gov.bd অথবা স্থানীয় ইউনিয়ন পরিষদ / উপজেলা সমাজসেবা কার্যালয়',
    required_docs: [
      {
        name_bn: 'আবেদনকারীর জাতীয় পরিচয়পত্র (NID) মূল ও ফটোকপি',
        name_en: 'Original National ID (NID) & Photocopy',
        copy_type: 'both',
        note_bn: 'বয়স প্রমাণের একক নির্ভরযোগ্য সনদ (পুরুষের ক্ষেত্রে সর্বনিম্ন ৬৫ বছর, নারীদের সর্বনিম্ন ৬২ বছর)'
      },
      {
        name_bn: 'স্থানীয় জনপ্রতিনিধি কর্তৃক বার্ষিক আয়ের সনদপত্র',
        name_en: 'Annual Income Certificate from UP Chairman/Councillor',
        copy_type: 'original',
        note_bn: 'বার্ষিক গড় আয় অনূর্ধ্ব ১০,০০০-১২,০০০ টাকা প্রমাণের প্রত্যয়ন'
      },
      {
        name_bn: 'আবেদনকারীর ৩ কপি পাসপোর্ট সাইজ ছবি',
        name_en: '3 Passport-size Photographs',
        copy_type: 'original',
        note_bn: 'সাম্প্রতিক তোলা স্পষ্ট রঙিন ছবি'
      },
      {
        name_bn: 'নমিনির NID ও ১ কপি ছবি',
        name_en: "Nominee's NID Copy & Photo",
        copy_type: 'photocopy',
        note_bn: 'বৈধ মনোনীত ব্যক্তির পরিচয়পত্র'
      },
      {
        name_bn: 'নিজ নামে বায়োমেট্রিক নিবন্ধিত মোবাইল ব্যাংকিং অ্যাকাউন্ট',
        name_en: 'Active G2P Mobile Wallet Account (bKash/Nagad)',
        copy_type: 'original',
        note_bn: 'ভাতার অর্থ সরাসরি মোবাইলে পাওয়ার জন্য'
      }
    ],
    steps: [
      {
        step: 1,
        title_bn: 'বয়স ও যোগ্যতার শর্ত যাচাই',
        description_bn: 'NID অনুযায়ী পুরুষের বয়স ৬৫ ও নারীর বয়স ৬২ বছর পূর্ণ হয়েছে কিনা এবং আর্থিকভাবে অসচ্ছল কিনা তা নিশ্চিত করুন।',
        url: 'https://dss.gov.bd'
      },
      {
        step: 2,
        title_bn: 'অনলাইনে বয়স্ক ভাতার ফরম পূরণ',
        description_bn: 'dss.bhata.gov.bd পোর্টাল বা ডিজিটাল সেন্টারের সাহায্যে নাম, NID নম্বর, ঠিকানা ও স্বাস্থ্যগত অবস্থা লিখে আবেদন করুন।',
        url: 'https://dss.gov.bd'
      },
      {
        step: 3,
        title_bn: 'স্থানীয় যাচাই-বাছাই কমিটির সভা',
        description_bn: 'ইউনিয়ন পরিষদ বা পৌর ওয়ার্ড কমিটি বয়োজ্যেষ্ঠ ও সবচেয়ে দরিদ্র ব্যক্তিদের অগ্রাধিকার ভিত্তিতে তালিকা প্রস্তুত করে।',
        url: 'https://dss.gov.bd'
      },
      {
        step: 4,
        title_bn: 'উপজেলা সমাজসেবা কার্যালয় কর্তৃক চূড়ান্ত এন্ট্রি',
        description_bn: 'উপজেলা কমিটির অনুমোদনের পর তথ্য সেন্ট্রাল এমআইএস (MIS) ডেটাবেজে যুক্ত হয়।',
        url: 'https://dss.gov.bd'
      },
      {
        step: 5,
        title_bn: 'ভাতার অর্থ গ্রহণ',
        description_bn: 'জিটুপি (G2P) পদ্ধতিতে সরাসরি মোবাইল একাউন্টে বা তফসিলি ব্যাংকে প্রতি মাসে ভাতার টাকা চলে আসবে।',
        url: 'https://dss.gov.bd'
      }
    ],
    important_notes_bn: ['সরকারি পেনশনভোগী বা অন্য কোনো নিয়মিত সরকারি অনুদানপ্রাপ্ত ব্যক্তিরা এই ভাতার আওতাভুক্ত নন।'],
    common_mistakes_bn: ['বয়স পূর্ণ হওয়ার পূর্বেই মিথ্যা তথ্য দিয়ে আবেদন করা বা দালালের খপ্পরে পড়ে টাকা দেওয়া।']
  },
  {
    slug: 'disability-allowance',
    name_bn: 'অসচ্ছল প্রতিবন্ধী ভাতা',
    name_en: 'Insolvent Disability Allowance',
    category: 'welfare',
    department_bn: 'সমাজসেবা অধিদপ্তর (সমাজকল্যাণ মন্ত্রণালয়)',
    department_en: 'Department of Social Services (DSS)',
    submission_type: 'hybrid',
    fee: 'বিনামূল্যে',
    fee_note_bn: 'আবেদন সম্পূর্ণ বিনামূল্যে। মাসিক ভাতার হার ১,০০০ টাকা (সরাসরি G2P মোবাইল ব্যাংকিংয়ে প্রদেয়)',
    processing_time_bn: '৪৫-৬০ কার্যদিবস',
    official_url: 'https://dss.gov.bd',
    apply_location_bn: 'সমাজসেবা অধিদপ্তরের প্রতিবন্ধী জরিপ কার্ড সহ উপজেলা সমাজসেবা অফিস / অনলাইন',
    required_docs: [
      {
        name_bn: 'প্রতিবন্ধী পরিচয়পত্র বা "সুবর্ণ নাগরিক কার্ড" (DIS কার্ড)',
        name_en: 'Subarna Nagorik Disability ID Card (DIS)',
        copy_type: 'both',
        note_bn: 'সমাজসেবা অধিদপ্তর কর্তৃক শনাক্তকরণ জরিপে নিবন্ধিত সুবর্ণ নাগরিক কার্ড বাধ্যতামূলক'
      },
      {
        name_bn: 'জাতীয় পরিচয়পত্র (প্রাপ্তবয়স্ক) অথবা অনলাইন জন্ম নিবন্ধন (অপ্রাপ্তবয়স্ক)',
        name_en: 'NID Card or Online Birth Certificate',
        copy_type: 'both',
        note_bn: 'আবেদনকারীর সরকারি ডিজিটাল পরিচয়পত্র'
      },
      {
        name_bn: 'অভিভাবক বা নমিনির NID কার্ডের কপি ও ছবি',
        name_en: "Guardian's / Nominee's NID Copy",
        copy_type: 'photocopy',
        note_bn: 'গুরুতর প্রতিবন্ধী বা শিশুদের ক্ষেত্রে অভিভাবকের বিবরণ'
      },
      {
        name_bn: 'আবেদনকারীর ৩ কপি ছবি (প্রতিবন্ধিতা দৃশ্যমান ছবি)',
        name_en: '3 Color Photographs of the Applicant',
        copy_type: 'original',
        note_bn: 'শারীরিক প্রতিবন্ধিতার ক্ষেত্রে পূর্ণ অবয়ব স্পষ্ট ছবি'
      },
      {
        name_bn: 'মোবাইল ব্যাংকিং অ্যাকাউন্ট নম্বর (বিকাশ বা নগদ)',
        name_en: 'Active Mobile Financial Account',
        copy_type: 'original',
        note_bn: 'ভাতা উত্তোলনের নম্বর'
      }
    ],
    steps: [
      {
        step: 1,
        title_bn: 'সুবর্ণ নাগরিক জরিপ ও কার্ড গ্রহণ',
        description_bn: 'প্রথমে উপজেলা সমাজসেবা অফিসে গিয়ে চিকিৎসকের প্রত্যয়ন সাপেক্ষে প্রতিবন্ধী হিসেবে নিবন্ধিত হয়ে সুবর্ণ নাগরিক কার্ড সংগ্রহ করুন।',
        url: 'https://dss.gov.bd'
      },
      {
        step: 2,
        title_bn: 'ভাতার জন্য অনলাইন আবেদন',
        description_bn: 'সুবর্ণ কার্ডের নম্বর ব্যবহার করে dss.bhata.gov.bd সাইটে অসচ্ছল প্রতিবন্ধী ভাতার ফরম পূরণ করুন।',
        url: 'https://dss.gov.bd'
      },
      {
        step: 3,
        title_bn: 'কাগজপত্র জমা ও ডাক্তারের মূল্যায়ন',
        description_bn: 'উপজেলা সমাজসেবা অফিসার ও মেডিকেল কর্মকর্তার উপস্থিতিতে যাচাইকরণ সভায় অংশগ্রহণ করুন।',
        url: 'https://dss.gov.bd'
      },
      {
        step: 4,
        title_bn: 'এমআইএস (MIS) ডাটাবেজে অন্তর্ভুক্তি',
        description_bn: 'কমিটি কর্তৃক অনুমোদিত হলে ভাতাভোগীর তথ্য সরকারি সেন্ট্রাল সার্ভারে সংরক্ষিত হয়।',
        url: 'https://dss.gov.bd'
      },
      {
        step: 5,
        title_bn: 'ভাতার অর্থ গ্রহণ',
        description_bn: 'নিয়মিত বিরতিতে সরাসরি মোবাইল অ্যাকাউন্টে সরকারি ভাতার অর্থ পৌঁছে যাবে।',
        url: 'https://dss.gov.bd'
      }
    ],
    important_notes_bn: ['যাদের প্রতিবন্ধিতা মাত্রা বেশি (গুরুতর প্রতিবন্ধী) তারা এই তালিকায় অগ্রাধিকার পান।'],
    common_mistakes_bn: ['সুবর্ণ নাগরিক কার্ড না করে সরাসরি ভাতার জন্য আবেদন করার চেষ্টা করা।']
  },
  {
    slug: 'scholarship',
    name_bn: 'প্রধানমন্ত্রীর শিক্ষা সহায়তা ট্রাস্ট উপবৃত্তি ও সহায়তা',
    name_en: 'Prime Minister Education Assistance Trust Stipend',
    category: 'education',
    department_bn: 'প্রধানমন্ত্রীর শিক্ষা সহায়তা ট্রাস্ট (মাধ্যমিক ও উচ্চ শিক্ষা বিভাগ)',
    department_en: 'Prime Minister Education Assistance Trust (SHED)',
    submission_type: 'online_bot',
    fee: 'বিনামূল্যে',
    fee_note_bn: 'সম্পূর্ণ বিনামূল্যে আবেদনযোগ্য (উপবৃত্তি ও টিউশন ফি সরাসরি EFT-তে প্রদেয়)',
    processing_time_bn: 'শিক্ষাবর্ষের নির্ধারিত সেশন অনুযায়ী',
    official_url: 'https://pmeat.gov.bd',
    apply_location_bn: 'estipend.pmeat.gov.bd অনলাইন সফটওয়্যারের মাধ্যমে এবং শিক্ষা প্রতিষ্ঠান প্রধানের অনুমোদন',
    required_docs: [
      {
        name_bn: 'শিক্ষার্থীর পাসপোর্ট সাইজের ছবি ও ডিজিটাল স্বাক্ষর',
        name_en: "Student's Passport Photo & Signature",
        copy_type: 'online_print',
        note_bn: 'পরিষ্কার স্ক্যান কপি জেপিজি ফরম্যাটে'
      },
      {
        name_bn: 'শিক্ষার্থীর ডিজিটাল জন্ম নিবন্ধন সনদ বা NID',
        name_en: "Student's Digital Birth Certificate or NID",
        copy_type: 'both',
        note_bn: '১৭ ডিজিটের জন্ম সনদ'
      },
      {
        name_bn: 'পিতা ও মাতার জাতীয় পরিচয়পত্র (NID)',
        name_en: "Parents' National ID (NID)",
        copy_type: 'photocopy',
        note_bn: 'উভয় পিতা-মাতার এনআইডি'
      },
      {
        name_bn: 'শিক্ষা প্রতিষ্ঠান প্রধান / বিভাগীয় প্রধান কর্তৃক প্রদত্ত প্রত্যয়নপত্র',
        name_en: 'Recommendation Letter from Head of Institution',
        copy_type: 'original',
        note_bn: 'শিক্ষার্থী নিয়মিত এবং দরিদ্র মর্মে নির্ধারিত ফরম্যাটে সুপারিশ'
      },
      {
        name_bn: 'ইউপি চেয়ারম্যান বা ওয়ার্ড কাউন্সিলর কর্তৃক আয়ের প্রত্যয়নপত্র',
        name_en: 'Income Certificate from Local Government',
        copy_type: 'original',
        note_bn: 'পারিবারিক বার্ষিক আয় দারিদ্রসীমার নিচে থাকার প্রমাণ'
      },
      {
        name_bn: 'ব্যাংক হিসাব বা মোবাইল ব্যাংকিং হিসাবের তথ্য (EFT এর জন্য)',
        name_en: 'Bank Account or MFS Details (for EFT)',
        copy_type: 'both',
        note_bn: 'শিক্ষার্থী বা তার অভিভাবকের নামে খোলা সচল অনলাইন ব্যাংক হিসাব'
      }
    ],
    steps: [
      {
        step: 1,
        title_bn: 'বিজ্ঞপ্তি প্রকাশের পর পোর্টাল রেজিস্ট্রেশন',
        description_bn: 'pmeat.gov.bd ওয়েবসাইটে বিজ্ঞপ্তি অনুযায়ী estipend পোর্টালে শিক্ষার্থীর তথ্য দিয়ে অ্যাকাউন্ট তৈরি করুন।',
        url: 'https://pmeat.gov.bd'
      },
      {
        step: 2,
        title_bn: 'শিক্ষাগত ও প্রাতিষ্ঠানিক তথ্য পূরণ',
        description_bn: 'বর্তমান শ্রেণি, রোল, পূর্ববর্তী পরীক্ষার ফলাফল (GPA/CGPA) এবং শিক্ষা প্রতিষ্ঠানের নাম সঠিকভাবে লিখুন।',
        url: 'https://pmeat.gov.bd'
      },
      {
        step: 3,
        title_bn: 'অভিভাবকের আয় ও প্রয়োজনীয় কাগজ আপলোড',
        description_bn: 'চেয়ারম্যানের আয়ের প্রত্যয়নপত্র এবং প্রধান শিক্ষকের সুপারিশপত্র আপলোড করুন।',
        url: 'https://pmeat.gov.bd'
      },
      {
        step: 4,
        title_bn: 'প্রতিষ্ঠান প্রধান কর্তৃক অনলাইনে যাচাই ও অগ্রায়ন',
        description_bn: 'অনলাইন আবেদনটি শিক্ষা প্রতিষ্ঠান প্রধানের প্যানেলে যাবে এবং তিনি অনলাইনে অনুমোদন দিয়ে ট্রাস্টে ফরোয়ার্ড করবেন।',
        url: 'https://pmeat.gov.bd'
      },
      {
        step: 5,
        title_bn: 'ইএফটি (EFT) এর মাধ্যমে উপবৃত্তি বিতরণ',
        description_bn: 'চূড়ান্তভাবে নির্বাচিত হলে উপবৃত্তি ও টিউশন ফির টাকা সরাসরি ব্যাংক একাউন্টে জমা হবে।',
        url: 'https://pmeat.gov.bd'
      }
    ],
    important_notes_bn: ['সরকারি অন্য কোনো উপবৃত্তি একযোগে পেলে এই ট্রাস্টের উপবৃত্তি পাওয়া যাবে না।'],
    common_mistakes_bn: ['প্রধান শিক্ষকের স্বাক্ষরযুক্ত প্রত্যয়নপত্র ব্যতিরেকে আবেদন সাবমিট করা।']
  },
  {
    slug: 'trade-license',
    name_bn: 'ট্রেড লাইসেন্স আবেদন',
    name_en: 'Trade License Application',
    category: 'business',
    department_bn: 'স্থানীয় সরকার প্রতিষ্ঠান (সিটি কর্পোরেশন / পৌরসভা / ইউনিয়ন পরিষদ)',
    department_en: 'Local Government Division (City Corporation / Pourashava / UP)',
    submission_type: 'hybrid',
    fee: '৫০০-৫,০০০',
    fee_note_bn: 'ব্যবসার ধরন, মূলধন ও এলাকার কর তফসিল অনুযায়ী মূল ফি + ১৫% ভ্যাট ও সাইনবোর্ড কর',
    processing_time_bn: '৩-৭ কার্যদিবস',
    official_url: 'https://etradelicense.gov.bd',
    apply_location_bn: 'অনলাইনে (ই-ট্রেড লাইসেন্স পোর্টাল) অথবা স্থানীয় পৌরসভা/ইউপি কার্যালয়ে সরাসরি',
    required_docs: [
      {
        name_bn: 'ব্যবসায়ী বা স্বত্বাধিকারীর ৩ কপি পাসপোর্ট সাইজ রঙিন ছবি',
        name_en: "3 Passport-size Photographs of Business Owner",
        copy_type: 'original',
        note_bn: 'প্রতিষ্ঠানের প্রধান ব্যক্তির ছবি'
      },
      {
        name_bn: 'মালিকের জাতীয় পরিচয়পত্র (NID) বা পাসপোর্ট',
        name_en: "Owner's National ID or Passport",
        copy_type: 'both',
        note_bn: 'স্বত্বাধিকারীর পরিচিতি'
      },
      {
        name_bn: 'ব্যবসার স্থানের ভাড়ার চুক্তিপত্র ও রসিদ (ভাড়া জায়গা হলে)',
        name_en: 'Shop / Office Rent Agreement & Receipts',
        copy_type: 'both',
        note_bn: 'বাণিজ্যিক স্পেস ভাড়ার চুক্তিপত্র'
      },
      {
        name_bn: 'নিজস্ব জায়গা হলে জমির দলিলের কপি ও হালনাগাদ হোল্ডিং ট্যাক্স রসিদ',
        name_en: 'Property Deed / Updated Holding Tax Receipt',
        copy_type: 'both',
        note_bn: 'প্রতিষ্ঠানের ঠিকানার স্বপক্ষে মালিকানার প্রমাণ'
      },
      {
        name_bn: 'লিমিটেড কোম্পানি হলে মেমোরেন্ডাম অব অ্যাসোসিয়েশন ও ইনকরপোরেশন সনদ',
        name_en: 'Memorandum of Association & Incorporation Certificate',
        copy_type: 'both',
        note_bn: 'কোম্পানি বা ফার্মের ক্ষেত্রে বাধ্যতামূলক'
      },
      {
        name_bn: 'বিশেষ ব্যবসার ক্ষেত্রে ফায়ার লাইসেন্স বা পরিবেশ ছাড়পত্র (প্রযোজ্য ক্ষেত্রে)',
        name_en: 'Fire License / Environmental Clearance (if applicable)',
        copy_type: 'both',
        note_bn: 'কারখানা, হোটেল বা দাহ্য পদার্থের ব্যবসার ক্ষেত্রে'
      }
    ],
    steps: [
      {
        step: 1,
        title_bn: 'ট্রেড লাইসেন্স ক্যাটাগরি ও ব্যবসার ধরন নির্ধারণ',
        description_bn: 'একক মালিকানা, অংশীদারি নাকি লিমিটেড কোম্পানি তা নির্ধারণ করে সরকারি ফি সিডিউল পরীক্ষা করুন।',
        url: 'https://etradelicense.gov.bd'
      },
      {
        step: 2,
        title_bn: 'অনলাইন পোর্টালে (বা ‘কে’ ফরমে) তথ্য প্রদান',
        description_bn: 'প্রতিষ্ঠানের নাম, পূর্ণাঙ্গ ঠিকানা, মালিকের বিবরণ এবং ব্যবসার মূলধন লিখে ফরম পূরণ করুন।',
        url: 'https://etradelicense.gov.bd'
      },
      {
        step: 3,
        title_bn: 'ভাড়ার চুক্তিপত্র ও NID সংযুক্তি',
        description_bn: 'ভাড়া চুক্তি, হোল্ডিং ট্যাক্স রসিদ ও মালিকের NID কার্ডের কপি সংযুক্ত করুন।',
        url: 'https://etradelicense.gov.bd'
      },
      {
        step: 4,
        title_bn: 'কর ও সরকারি লাইসেন্স ফি পরিশোধ',
        description_bn: 'সিটি কর্পোরেশন বা পৌরসভার নির্ধারিত রাজস্ব ফি ও সাইনবোর্ড কর ব্যাংকে বা অনলাইনে পরিশোধ করুন।',
        url: 'https://etradelicense.gov.bd'
      },
      {
        step: 5,
        title_bn: 'অনুমোদিত ট্রেড লাইসেন্স সংগ্রহ',
        description_bn: 'রাজস্ব কর্মকর্তা কর্তৃক অনুমোদনের পর ডিজিটাল ই-ট্রেড লাইসেন্স ডাউনলোড বা মূল সনদপত্র সংগ্রহ করুন।',
        url: 'https://etradelicense.gov.bd'
      }
    ],
    important_notes_bn: ['ট্রেড লাইসেন্স প্রতি বছর জুলাই-সেপ্টেম্বর মাসের মধ্যে নবায়ন করা বাধ্যতামূলক।'],
    common_mistakes_bn: ['বাণিজ্যিক হোল্ডিং ট্যাক্স পরিশোধের প্রমাণ না রেখে ট্রেড লাইসেন্সের আবেদন জমা দেওয়া।']
  },
  {
    slug: 'land-mutation',
    name_bn: 'ই-নামজারি (ভূমি নামজারি ও জমাভাগ)',
    name_en: 'E-Mutation of Land',
    category: 'land',
    department_bn: 'ভূমি মন্ত্রণালয় (উপজেলা ভূমি অফিস / AC Land)',
    department_en: 'Ministry of Land (AC Land Office)',
    submission_type: 'hybrid',
    fee: '১,১৭০',
    fee_note_bn: 'আবেদন ফি ও নোটিশ ফি ৭০ টাকা + ডিসিআর ও খতিয়ান ফি ১,১০০ টাকা (সর্বমোট সরকারি ফি ১,১৭০ টাকা)',
    processing_time_bn: '২৮ কার্যদিবস',
    official_url: 'https://mutation.land.gov.bd',
    apply_location_bn: 'mutation.land.gov.bd অনলাইনে আবেদন, শুনানির দিনে সহকারী কমিশনার (ভূমি) অফিসে উপস্থিতি',
    required_docs: [
      {
        name_bn: 'মালিকানা অর্জনের মূল রেজিস্ট্রিকৃত দলিল (সাফ কবলা / দানপত্র / বণ্টননামা)',
        name_en: 'Original Registered Land Deed (Kabala / Heba / Distribution)',
        copy_type: 'both',
        note_bn: 'সাব-রেজিস্ট্রি অফিস থেকে প্রাপ্ত মূল দলিল বা নকল'
      },
      {
        name_bn: 'পিঠ দলিল বা বায়া দলিল (প্রযোজ্য ক্ষেত্রে)',
        name_en: 'Chain of Title Deeds (Baya Deeds)',
        copy_type: 'photocopy',
        note_bn: 'জমির ক্রমান্বয়ে মালিকানার ধারাবাহিকতা প্রমাণের দলিল'
      },
      {
        name_bn: 'হালনাগাদ বা পূর্ববর্তী রেকর্ডিয় খতিয়ানের কপি (CS/SA/RS/BS খতিয়ান)',
        name_en: 'Previous Record of Rights (Khatiyan)',
        copy_type: 'both',
        note_bn: 'সাবেক খতিয়ানের কপি'
      },
      {
        name_bn: 'সর্বশেষ বছরের ভূমি উন্নয়ন কর (খাজনা) পরিশোধের দাখিলা / রসিদ',
        name_en: 'Updated Land Development Tax Receipt',
        copy_type: 'both',
        note_bn: 'খাজনা বকেয়া থাকা যাবে না'
      },
      {
        name_bn: 'উত্তরাধিকার সূত্রে হলে ওয়ারিশান সনদ ও বংশলতিকা',
        name_en: 'Warishan Certificate & Family Tree',
        copy_type: 'original',
        note_bn: 'ইউপি চেয়ারম্যান বা পৌর মেয়র কর্তৃক মূল ওয়ারিশান সনদ'
      },
      {
        name_bn: 'আবেদনকারীর জাতীয় পরিচয়পত্র (NID) ও ছবি',
        name_en: "Applicant's NID & Passport Photo",
        copy_type: 'both',
        note_bn: 'জমির সকল অংশীদারের পরিচয়পত্র'
      }
    ],
    steps: [
      {
        step: 1,
        title_bn: 'ই-নামজারি পোর্টালে অনলাইন আবেদন',
        description_bn: 'mutation.land.gov.bd পোর্টালে বিভাগ, জেলা, উপজেলা, মৌজা ও জেএল নম্বর দিয়ে ফরম পূরণ শুরু করুন।',
        url: 'https://mutation.land.gov.bd'
      },
      {
        step: 2,
        title_bn: 'জমির তফসিল ও দলিলের তথ্য প্রদান',
        description_bn: 'খতিয়ান নম্বর, দাগ নম্বর, হস্তান্তরিত জমির পরিমাণ এবং রেজিস্ট্রি দলিলের নম্বর ও তারিখ ইনপুট দিন।',
        url: 'https://mutation.land.gov.bd'
      },
      {
        step: 3,
        title_bn: 'দলিল ও খতিয়ানের স্ক্যান কপি আপলোড এবং প্রাথমিক ফি পরিশোধ',
        description_bn: 'দলিল, খতিয়ান ও খাজনার রসিদ আপলোড করে আবেদন ও নোটিশ জারি ফি বাবদ ৭০ টাকা মোবাইল ব্যাংকিংয়ে পরিশোধ করুন।',
        url: 'https://mutation.land.gov.bd'
      },
      {
        step: 4,
        title_bn: 'ইউনিয়ন ভূমি সহকারী কর্মকর্তার তদন্ত ও এসি ল্যান্ড শুনানিতে অংশ',
        description_bn: 'তহশিলদার কর্তৃক প্রস্তাব প্রেরণের পর শুনানির তারিখে মূল দলিলপত্রাদিসহ সহকারী কমিশনার (ভূমি) এর নিকট উপস্থিত হন।',
        url: 'https://mutation.land.gov.bd'
      },
      {
        step: 5,
        title_bn: 'ডিসিআর ও খতিয়ান ফি প্রদান শেষে ডিজিটাল খতিয়ান গ্রহণ',
        description_bn: 'আদেশ মঞ্জুর হলে ১,১০০ টাকা সরকারি ফি পরিশোধ করে অনলাইন থেকে নামজারি খতিয়ান ও ডিসিআর সংগ্রহ করুন।',
        url: 'https://mutation.land.gov.bd'
      }
    ],
    important_notes_bn: ['সরকারি নির্ধারিত ১,১৭০ টাকার বাইরে অতিরিক্ত কোনো অর্থ লেনদেন আইনত দণ্ডনীয়।'],
    common_mistakes_bn: ['বায়া দলিলের ধারাবাহিকতা না রাখা বা বকেয়া খাজনা পরিশোধ না করে আবেদন করা।']
  },
  {
    slug: 'tin-certificate',
    name_bn: 'ই-টিআইএন (e-TIN) সনদপত্র রেজিস্ট্রেশন',
    name_en: 'e-TIN Registration',
    category: 'tax',
    department_bn: 'জাতীয় রাজস্ব বোর্ড (NBR)',
    department_en: 'National Board of Revenue',
    submission_type: 'online_bot',
    fee: 'বিনামূল্যে',
    fee_note_bn: 'ই-টিআইএন রেজিস্ট্রেশনে কোনো সরকারি ফি প্রযোজ্য নয়',
    processing_time_bn: 'তাৎক্ষণিক (রিয়েল-টাইম)',
    official_url: 'https://secure.incometax.gov.bd/TINHome',
    apply_location_bn: 'সম্পূর্ণ অনলাইনে secure.incometax.gov.bd ওয়েবসাইটের মাধ্যমে',
    required_docs: [
      {
        name_bn: 'জাতীয় পরিচয়পত্র (NID) নম্বর ও জন্মতারিখ',
        name_en: 'National ID Number & Date of Birth',
        copy_type: 'original',
        note_bn: 'নির্বাচন কমিশন ডাটাবেজের সাথে তাৎক্ষণিক অনলাইনে মিলানো হয়'
      },
      {
        name_bn: 'ব্যক্তিগত বায়োমেট্রিক নিবন্ধিত মোবাইল নম্বর',
        name_en: 'Personal Biometric Registered Mobile Number',
        copy_type: 'original',
        note_bn: 'অ্যাকাউন্ট ভেরিফিকেশন ও ওটিপি (OTP) কোড পাওয়ার জন্য'
      },
      {
        name_bn: 'বর্তমান ও স্থায়ী ঠিকানার সুনির্দিষ্ট বিবরণ',
        name_en: 'Present and Permanent Address Details',
        copy_type: 'original',
        note_bn: 'কর অঞ্চল ও সার্কেল নির্ধারণের সুবিধার্থে'
      },
      {
        name_bn: 'কোম্পানি বা ব্যবসার ক্ষেত্রে ট্রেড লাইসেন্স ও আরজেএসসি নিবন্ধন নম্বর',
        name_en: 'Trade License / RJSC Incorporation Number (for business)',
        copy_type: 'both',
        note_bn: 'শুধুমাত্র ব্যবসায়ী প্রতিষ্ঠান বা কোম্পানির ক্ষেত্রে প্রযোজ্য'
      }
    ],
    steps: [
      {
        step: 1,
        title_bn: 'e-TIN পোর্টালে নতুন অ্যাকাউন্ট রেজিস্টার',
        description_bn: 'secure.incometax.gov.bd/TINHome লিংকে প্রবেশ করে ‘Register’ অপশনে গিয়ে ইউজার আইডি, পাসওয়ার্ড ও মোবাইল নম্বর দিন।',
        url: 'https://secure.incometax.gov.bd/TINHome'
      },
      {
        step: 2,
        title_bn: 'মোবাইল ওটিপি ভেরিফিকেশন',
        description_bn: 'মোবাইলে পাঠানো অ্যাক্টিভেশন কোড লিখে অ্যাকাউন্টটি সক্রিয় করুন এবং সিস্টেমে লগইন করুন।',
        url: 'https://secure.incometax.gov.bd/TINHome'
      },
      {
        step: 3,
        title_bn: 'TIN Application ফরমে তথ্য এন্ট্রি',
        description_bn: 'করদাতার ধরন (Individual/Company), আয়ের উৎস এবং NID অনুযায়ী নাম, পিতা-মাতার নাম ও জন্মতারিখ লিখুন।',
        url: 'https://secure.incometax.gov.bd/TINHome'
      },
      {
        step: 4,
        title_bn: 'তথ্য যাচাই ও সাবমিশন',
        description_bn: 'নির্বাচন কমিশনের তথ্যভাণ্ডারের সাথে তথ্য মিলিয়ে প্রদর্শিত প্রিভিউ যাচাই করে সাবমিট বাটনে চাপুন।',
        url: 'https://secure.incometax.gov.bd/TINHome'
      },
      {
        step: 5,
        title_bn: 'ই-টিআইএন সার্টিফিকেট ডাউনলোড ও প্রিন্ট',
        description_bn: 'সাবমিট করার সাথে সাথেই ১২ ডিজিটের ই-টিআইএন নম্বরযুক্ত সনদপত্র তৈরি হয়ে যাবে, যা সাথে সাথে ডাউনলোড করা যায়।',
        url: 'https://secure.incometax.gov.bd/TINHome'
      }
    ],
    important_notes_bn: ['একবার টিআইএন গ্রহণ করলে প্রতি বছর বার্ষিক আয়কর রিটার্ন দাখিল করা আইনত বাধ্যতামূলক।'],
    common_mistakes_bn: ['অন্য কারো এনআইডি নম্বর ব্যবহার করে টিআইএন তৈরি করা, যা গুরুতর ফৌজদারি অপরাধ।']
  },
  {
    slug: 'tax-return',
    name_bn: 'অনলাইন আয়কর রিটার্ন দাখিল (e-Return)',
    name_en: 'Online Income Tax Return Submission',
    category: 'tax',
    department_bn: 'জাতীয় রাজস্ব বোর্ড (NBR)',
    department_en: 'National Board of Revenue',
    submission_type: 'online_bot',
    fee: 'বিনামূল্যে',
    fee_note_bn: 'রিটার্ন দাখিলের কোনো ফি নেই (প্রযোজ্য আয়কর থাকলে তা সরকারি কোডে প্রদেয়)',
    processing_time_bn: 'তাৎক্ষণিক সার্টিফিকেট ও প্রাপ্তি স্বীকারপত্র প্রদান',
    official_url: 'https://etaxnbr.gov.bd',
    apply_location_bn: 'সম্পূর্ণ অনলাইনে etaxnbr.gov.bd প্ল্যাটফর্মে',
    required_docs: [
      {
        name_bn: '১২ ডিজিটের ই-টিআইএন (e-TIN) সার্টিফিকেট নম্বর',
        name_en: '12-digit e-TIN Certificate Number',
        copy_type: 'online_print',
        note_bn: 'ট্যাক্সপোর্টালে লগইন করার প্রাথমিক শনাক্তকারী'
      },
      {
        name_bn: 'করদাতার নিজের NID দিয়ে বায়োমেট্রিক সিমযুক্ত মোবাইল ফোন নম্বর',
        name_en: 'Biometric SIM registered with Taxpayer NID',
        copy_type: 'original',
        note_bn: 'লগইন ও রিটার্ন সাবমিশনের ওটিপি যাচাইকরণের জন্য আবশ্যক'
      },
      {
        name_bn: 'বেতন সনদপত্র ও ব্যাংক হিসাবের বার্ষিক বিবরণী (Bank Statement)',
        name_en: 'Salary Certificate & Yearly Bank Statement',
        copy_type: 'both',
        note_bn: 'অর্থবছরের মোট আয় ও ব্যাংকে অর্জিত সুদ এবং উৎসে কর কাটার হিসাবের জন্য'
      },
      {
        name_bn: 'বিনিয়োগ ও কর রেয়াতের প্রমাণক (সঞ্চয়পত্র, ডিপিএস, জীবনবীমা ইত্যাদি)',
        name_en: 'Investment Documents (DPS, Sanchayapatra, Insurance)',
        copy_type: 'both',
        note_bn: 'কর ছাড় পাওয়ার জন্য তথ্য সংরক্ষিত রাখতে হবে (আপলোড করতে হয় না)'
      },
      {
        name_bn: 'সম্পদ ও দায়ের হিসাব বিবরণী (বাড়ি, গাড়ি, স্বর্ণালংকার ও ঋণ)',
        name_en: 'Asset & Liability Calculation Sheet',
        copy_type: 'both',
        note_bn: 'মোট পরিসম্পদের পরিমাণ নির্ধারণের জন্য'
      }
    ],
    steps: [
      {
        step: 1,
        title_bn: 'ই-রিটার্ন পোর্টালে রেজিস্ট্রেশন ও লগইন',
        description_bn: 'etaxnbr.gov.bd সাইটে টিআইএন ও বায়োমেট্রিক মোবাইল নম্বর দিয়ে অ্যাকাউন্ট রেজিস্ট্রেশন ও ওটিপি নিশ্চিত করুন।',
        url: 'https://etaxnbr.gov.bd'
      },
      {
        step: 2,
        title_bn: 'আয়ের খাত নির্বাচন ও হিসাব প্রদান',
        description_bn: 'বেতন, গৃহসম্পত্তি, কৃষি বা ব্যবসা থেকে অর্জিত বার্ষিক আয়ের তথ্য সংশ্লিষ্ট ঘরে লিখুন।',
        url: 'https://etaxnbr.gov.bd'
      },
      {
        step: 3,
        title_bn: 'বিনিয়োগ রেয়াত ও সম্পদ বিবরণী পূরণ',
        description_bn: 'ডিপিএস বা সঞ্চয়পত্রের বিনিয়োগ তথ্য দিন এবং স্থাবর-অস্থাবর সম্পদের হিসাব ফর্মটি পূরণ করুন।',
        url: 'https://etaxnbr.gov.bd'
      },
      {
        step: 4,
        title_bn: 'প্রদেয় কর পরিশোধ (যদি প্রযোজ্য থাকে)',
        description_bn: 'করযোগ্য আয় থাকলে সিস্টেম প্রদর্শিত হিসাব অনুযায়ী অনলাইন ব্যাংকিং বা মোবাইল ওয়ালেটে চালান পরিশোধ করুন।',
        url: 'https://etaxnbr.gov.bd'
      },
      {
        step: 5,
        title_bn: 'অনলাইন রিটার্ন সাবমিশন ও স্বীকৃতিপত্র ডাউনলোড',
        description_bn: 'সবশেষে রিটার্ন ভেরিফাই করে সাবমিট করুন। সাথে সাথেই ডিজিটাল একনলেজমেন্ট স্লিপ ও কর সার্টিফিকেট ডাউনলোড করুন।',
        url: 'https://etaxnbr.gov.bd'
      }
    ],
    important_notes_bn: ['অনলাইন ই-রিটার্নে কোনো কাগজের স্ক্যান কপি আপলোড করতে হয় না, তবে ভবিষ্যতে অডিটের জন্য প্রমাণক সংরক্ষণ করতে হয়।'],
    common_mistakes_bn: ['এনআইডি দিয়ে নিবন্ধিত নয় এমন মোবাইল নম্বর ব্যবহার করে রেজিস্ট্রেশন করার ব্যর্থ চেষ্টা।']
  },
  {
    slug: 'overseas-welfare-card',
    name_bn: 'প্রবাসী কল্যাণ ও BMET স্মার্ট কার্ড রেজিস্ট্রেশন',
    name_en: 'BMET Smart Card & Overseas Welfare Registration',
    category: 'overseas',
    department_bn: 'জনশক্তি, কর্মসংস্থান ও প্রশিক্ষণ ব্যুরো (BMET)',
    department_en: 'Bureau of Manpower, Employment and Training (BMET)',
    submission_type: 'hybrid',
    fee: '৫,৫০০-৬,০০০',
    fee_note_bn: 'পুনর্নির্ধারিত ওয়েজ আর্নার্স কল্যাণ তহবিল ফি ৫,৫০০ টাকা + বীমা প্রিমিয়াম ও সরকারি অনুমোদন ফি',
    processing_time_bn: '৭-১৫ কার্যদিবস',
    official_url: 'https://bmet.gov.bd',
    apply_location_bn: '"আমি প্রবাসী" মোবাইল অ্যাপ / bmet.gov.bd অথবা জেলা কর্মসংস্থান ও জনশক্তি অফিস (DEMO)',
    required_docs: [
      {
        name_bn: 'মূল পাসপোর্ট (কমপক্ষে ৬ মাস মেয়াদ থাকতে হবে) ও ডাটা পেজের কপি',
        name_en: 'Original Passport (min 6 months validity) & Copy',
        copy_type: 'both',
        note_bn: 'বিদেশ গমনেচ্ছু কর্মীর বৈধ পাসপোর্ট'
      },
      {
        name_bn: 'বৈধ কাজের ভিসা ও নিয়োগ চুক্তিপত্র (Visa & Employment Contract)',
        name_en: 'Valid Work Visa & Employment Contract',
        copy_type: 'both',
        note_bn: 'নিয়োগকারী দেশের দূতাবাস বা প্রতিষ্ঠানের অনুমোদিত চুক্তি'
      },
      {
        name_bn: 'সরকার অনুমোদিত মেডিকেল সেন্টার থেকে ফিটনেস সনদ',
        name_en: 'Medical Fitness Certificate (GCC/Approved)',
        copy_type: 'original',
        note_bn: 'স্বাস্থ্যগতভাবে উপযুক্ত হওয়ার সনদ'
      },
      {
        name_bn: 'বিএমইটি প্রাক-বহির্গমন ৩ দিনের প্রশিক্ষণ (PDO) সনদপত্র',
        name_en: 'Pre-Departure Orientation (PDO) Certificate',
        copy_type: 'original',
        note_bn: 'বাধ্যতামূলক পিডিও ওরিয়েন্টেশন কোর্স সম্পন্ন করার প্রত্যয়ন'
      },
      {
        name_bn: 'জেলা জনশক্তি অফিস (DEMO) থেকে বায়োমেট্রিক ফিঙ্গারপ্রিন্ট রসিদ',
        name_en: 'Biometric Fingerprint Enrollment Slip',
        copy_type: 'original',
        note_bn: 'আঙুলের ছাপ প্রদানের অফিসিয়াল প্রমাণ'
      },
      {
        name_bn: 'বৈধ চ্যানেলে রেমিট্যান্স পাঠানোর জন্য নিজের নামে ব্যাংক হিসাব নম্বর',
        name_en: "Bank Account Details for Remittance",
        copy_type: 'photocopy',
        note_bn: 'প্রবাসী বা ওয়েজ আর্নার্স ব্যাংক অ্যাকাউন্ট সংক্রান্ত তথ্য'
      }
    ],
    steps: [
      {
        step: 1,
        title_bn: 'বিএমইটি ডাটাবেজ রেজিস্ট্রেশন',
        description_bn: '"আমি প্রবাসী" অ্যাপ বা বিএমইটি পোর্টালে পাসপোর্ট ও এনআইডি নম্বর দিয়ে নিবন্ধন সম্পন্ন করুন।',
        url: 'https://bmet.gov.bd'
      },
      {
        step: 2,
        title_bn: 'জেলা জনশক্তি অফিসে (DEMO) বায়োমেট্রিক ফিঙ্গারপ্রিন্ট',
        description_bn: 'নিকটস্থ জেলা কর্মসংস্থান ও জনশক্তি অফিসে সশরীরে উপস্থিত হয়ে বায়োমেট্রিক আঙুলের ছাপ দিন।',
        url: 'https://bmet.gov.bd'
      },
      {
        step: 3,
        title_bn: 'প্রাক-বহির্গমন ওরিয়েন্টেশন (PDO) প্রশিক্ষণ সমাপ্তি',
        description_bn: 'বিএমইটি কারিগরি প্রশিক্ষণ কেন্দ্রে ৩ দিনের বাধ্যতামূলক কোর্স সম্পন্ন করে সনদ অর্জন করুন।',
        url: 'https://bmet.gov.bd'
      },
      {
        step: 4,
        title_bn: 'ইমিগ্রেশন ক্লিয়ারেন্স ও কল্যাণ তহবিলের ফি পরিশোধ',
        description_bn: 'ওয়েজ আর্নার্স কল্যাণ বোর্ডের ফি (৫,৫০০ টাকা), প্রবাসী জীবন বীমা ও সরকারি ফি ব্যাংকে বা অনলাইনে পরিশোধ করুন।',
        url: 'https://bmet.gov.bd'
      },
      {
        step: 5,
        title_bn: 'বিএমইটি স্মার্ট কার্ড গ্রহণ',
        description_bn: 'সব কাগজপত্র ও ভিসা যাচাই শেষে ইমিগ্রেশন ক্লিয়ারেন্স সম্বলিত ডিজিটাল বিএমইটি স্মার্ট কার্ড সংগ্রহ করুন।',
        url: 'https://bmet.gov.bd'
      }
    ],
    important_notes_bn: ['বিমানবন্দরে বহির্গমনের পূর্বে ইমিগ্রেশনে বিএমইটি স্মার্ট কার্ড প্রদর্শন বাধ্যতামূলক।'],
    common_mistakes_bn: ['অপ্রশিক্ষিত দালালের কথায় জাল ভিসা বা নকল মেডিকেল সনদ জমা দিয়ে প্রতারিত হওয়া।']
  }
]

export async function seedDatabase() {
  await initDatabase()
  const client = await pool.connect()
  try {
    console.log('🌱 Seeding verified government service data into PostgreSQL...')
    for (const service of officialServicesData) {
      await client.query(`
        INSERT INTO services (
          slug, name_bn, name_en, category, department_bn, department_en,
          submission_type, fee, fee_note_bn, processing_time_bn, official_url,
          apply_location_bn, required_docs, steps, important_notes_bn, common_mistakes_bn
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16
        )
        ON CONFLICT (slug) DO UPDATE SET
          name_bn = EXCLUDED.name_bn,
          name_en = EXCLUDED.name_en,
          category = EXCLUDED.category,
          department_bn = EXCLUDED.department_bn,
          department_en = EXCLUDED.department_en,
          submission_type = EXCLUDED.submission_type,
          fee = EXCLUDED.fee,
          fee_note_bn = EXCLUDED.fee_note_bn,
          processing_time_bn = EXCLUDED.processing_time_bn,
          official_url = EXCLUDED.official_url,
          apply_location_bn = EXCLUDED.apply_location_bn,
          required_docs = EXCLUDED.required_docs,
          steps = EXCLUDED.steps,
          important_notes_bn = EXCLUDED.important_notes_bn,
          common_mistakes_bn = EXCLUDED.common_mistakes_bn;
      `, [
        service.slug,
        service.name_bn,
        service.name_en,
        service.category,
        service.department_bn,
        service.department_en,
        service.submission_type,
        service.fee,
        service.fee_note_bn || null,
        service.processing_time_bn,
        service.official_url || null,
        service.apply_location_bn,
        JSON.stringify(service.required_docs),
        JSON.stringify(service.steps),
        JSON.stringify(service.important_notes_bn || []),
        JSON.stringify(service.common_mistakes_bn || [])
      ])
    }
    console.log(`✅ Successfully seeded ${officialServicesData.length} government services into database!`)
  } catch (err) {
    console.error('❌ Error during seeding:', err)
    throw err
  } finally {
    client.release()
  }
}

if (process.argv[1]?.includes('seed')) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch(() => process.exit(1))
}
