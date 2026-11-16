import type { Service } from '@/types'

export const ALL_OFFICIAL_SERVICES: Service[] = [
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
  },
  {
    slug: 'driving-license',
    name_bn: 'স্মার্ট ড্রাইভিং লাইসেন্স আবেদন ও নবায়ন',
    name_en: 'Smart Driving License Application & Renewal',
    category: 'identity',
    department_bn: 'বাংলাদেশ সড়ক পরিবহন কর্তৃপক্ষ (বিআরটিএ)',
    department_en: 'Bangladesh Road Transport Authority (BRTA)',
    submission_type: 'hybrid',
    fee: '২,৫৪২',
    fee_note_bn: 'পেশাদার লাইসেন্স ফি ২,৫৪২ টাকা, অপেশাদার ৪,১৫২ টাকা (১৫% ভ্যাটসহ বিআরটিএ ফি)',
    processing_time_bn: '৩০ কার্যদিবস (পরীক্ষা ও বায়োমেট্রিক সাপেক্ষে)',
    official_url: 'https://bsp.brta.gov.bd',
    apply_location_bn: 'বিআরটিএ সার্ভিস পোর্টাল (BSP) অনলাইনে আবেদন ও সংশ্লিষ্ট সার্কেল অফিসে পরীক্ষা',
    required_docs: [
      {
        name_bn: 'অনলাইন আবেদন ফরম ও লার্নার ড্রাইভিং লাইসেন্স প্রিন্ট কপি',
        name_en: 'Application Summary & Learner Driving License Printout',
        copy_type: 'online_print',
        note_bn: 'বিএসপি পোর্টাল থেকে প্রিন্ট করা লার্নার পারমিট'
      },
      {
        name_bn: 'রেজিস্টার্ড এমবিবিএস ডাক্তার কর্তৃক প্রদত্ত মেডিকেল সার্টিফিকেট ফরম',
        name_en: 'Medical Fitness Certificate by Registered Physician',
        copy_type: 'original',
        note_bn: 'বিএমডিসি রেজিস্ট্রেশন নম্বর ও সিল সম্বলিত নির্ধারিত ফরম'
      },
      {
        name_bn: 'জাতীয় পরিচয়পত্র (NID) অথবা অনলাইন জন্ম নিবন্ধন সনদ',
        name_en: 'National ID (NID) or 17-digit Birth Certificate',
        copy_type: 'both',
        note_bn: '১৮ বছরের ঊর্ধ্বে অপেশাদার, ২১ বছরের ঊর্ধ্বে পেশাদার আবেদন'
      },
      {
        name_bn: 'শিক্ষাগত যোগ্যতার সনদ (ন্যূনতম ৮ম শ্রেণি বা সমমান)',
        name_en: 'Educational Qualification Certificate (Min Class 8/JSC)',
        copy_type: 'both',
        note_bn: 'মূল সার্টিফিকেট ও সত্যায়িত ফটোকপি'
      },
      {
        name_bn: 'বিআরটিএ নির্ধারিত ফি জমার ই-চালান বা ব্যাংক রসিদ',
        name_en: 'BRTA Fee Bank Challan / E-Payment Receipt',
        copy_type: 'original',
        note_bn: 'অনলাইন পেমেন্ট স্লিপ বা সোনালী ব্যাংক চালান'
      }
    ],
    steps: [
      {
        step: 1,
        title_bn: 'বিএসপি পোর্টালে নাগরিক অ্যাকাউন্ট তৈরি',
        description_bn: 'bsp.brta.gov.bd পোর্টালে মোবাইল নম্বর ও এনআইডি দিয়ে নাগরিক অ্যাকাউন্ট নিবন্ধন করুন।',
        url: 'https://bsp.brta.gov.bd'
      },
      {
        step: 2,
        title_bn: 'লার্নার লাইসেন্স আবেদন ও ফি পরিশোধ',
        description_bn: 'মেডিকেল সার্টিফিকেট আপলোড করে মোটরসাইকেল/হালকা যানবাহনের লার্নার ফি পরিশোধ করুন।',
        url: 'https://bsp.brta.gov.bd'
      },
      {
        step: 3,
        title_bn: 'লিখিত, মৌখিক ও ফিল্ড টেস্ট প্রদান',
        description_bn: 'লার্নার সনদে উল্লেখিত নির্ধারিত তারিখে বিআরটিএ সার্কেল পরীক্ষা কেন্দ্রে ব্যবহারিক পরীক্ষায় অংশ নিন।',
        url: 'https://bsp.brta.gov.bd'
      },
      {
        step: 4,
        title_bn: 'বায়োমেট্রিক ও ছবি প্রদান',
        description_bn: 'উত্তীর্ণ প্রার্থীরা সার্কেল অফিসে আঙুলের ছাপ, ডিজিটাল ছবি ও ইলেকট্রনিক স্বাক্ষর সম্পন্ন করুন।',
        url: 'https://bsp.brta.gov.bd'
      },
      {
        step: 5,
        title_bn: 'ই-ড্রাইভিং লাইসেন্স ও স্মার্ট কার্ড গ্রহণ',
        description_bn: 'তাৎক্ষণিক ই-ড্রাইভিং লাইসেন্স ডাউনলোড করুন এবং ডাকযোগে চিপযুক্ত স্মার্ট কার্ড সংগ্রহ করুন।',
        url: 'https://bsp.brta.gov.bd'
      }
    ],
    important_notes_bn: [
      'পেশাদার ড্রাইভিং লাইসেন্স প্রার্থীদের ক্ষেত্রে সরকারি হাসপাতাল কর্তৃক ডোপ টেস্ট (মাদক পরীক্ষা) রিপোর্ট বাধ্যতামূলক।',
      'লার্নার সনদের মেয়াদ সাধারণত ৩ মাস থাকে; এই সময়ের মধ্যে পরীক্ষা সম্পন্ন করতে হবে।'
    ],
    common_mistakes_bn: [
      'মেডিকেল সার্টিফিকেটে বিএমডিসি রেজিস্ট্রেশন নম্বর ও ডাক্তারের স্পষ্ট সিল না থাকা।',
      'পরীক্ষার দিন মূল লার্নার পারমিট ও এনআইডি সাথে না নিয়ে যাওয়া।'
    ]
  },
  {
    slug: 'vehicle-fitness',
    name_bn: 'মোটরযান ফিটনেস ও ট্যাক্স টোকেন নবায়ন',
    name_en: 'Vehicle Fitness & Tax Token Renewal',
    category: 'business',
    department_bn: 'বাংলাদেশ সড়ক পরিবহন কর্তৃপক্ষ (বিআরটিএ)',
    department_en: 'Bangladesh Road Transport Authority (BRTA)',
    submission_type: 'hybrid',
    fee: '১,১৫০',
    fee_note_bn: 'মোটরসাইকেল ট্যাক্স টোকেন ১,১৫০ টাকা; প্রাইভেট কার ও মাইক্রোবাস ফিটনেস ও রোড ট্যাক্স সিসি অনুযায়ী নির্ধারিত',
    processing_time_bn: '১-৩ কার্যদিবস',
    official_url: 'https://bsp.brta.gov.bd',
    apply_location_bn: 'অনলাইনে ফি পরিশোধ শেষে বিআরটিএ ভেহিকেল ইন্সপেকশন সেন্টারে (VIC) মোটরযান প্রদর্শন',
    required_docs: [
      {
        name_bn: 'মোটরযান রেজিস্ট্রেশন সার্টিফিকেট ও মূল ব্লু-বুক',
        name_en: 'Vehicle Registration Certificate (Smart Card / Blue Book)',
        copy_type: 'both',
        note_bn: 'মালিকানা যাচাইয়ের জন্য মূল কার্ড ও ফটোকপি'
      },
      {
        name_bn: 'পূর্ববর্তী মূল ফিটনেস সার্টিফিকেট ও ট্যাক্স টোকেন',
        name_en: 'Previous Original Fitness Certificate & Tax Token',
        copy_type: 'original',
        note_bn: 'মেয়াদোত্তীর্ণ বা হালনাগাদ পূর্ববর্তী রসিদ'
      },
      {
        name_bn: 'হালনাগাদ অগ্রিম আয়কর (AIT) পরিশোধের রসিদ (বাণিজ্যিক/কার)',
        name_en: 'Advance Income Tax (AIT) Payment Receipt',
        copy_type: 'original',
        note_bn: 'প্রাইভেট কার ও বাণিজ্যিক যানবাহনের জন্য প্রযোজ্য'
      },
      {
        name_bn: 'অনলাইন ফিটনেস ও ট্যাক্স টোকেন পেমেন্ট স্লিপ',
        name_en: 'Online Fee Payment Slip / Bank Challan',
        copy_type: 'online_print',
        note_bn: 'বিএসপি পোর্টাল বা ব্যাংকের জমার রসিদ'
      }
    ],
    steps: [
      {
        step: 1,
        title_bn: 'অনলাইনে ফি হিসাব ও যাচাই',
        description_bn: 'বিএসপি পোর্টালে মোটরযানের নম্বর দিয়ে বকেয়া রোড ট্যাক্স, ফিটনেস ফি ও ভ্যাট যাচাই করুন।',
        url: 'https://bsp.brta.gov.bd'
      },
      {
        step: 2,
        title_bn: 'ই-পেমেন্ট সম্পন্ন করণ',
        description_bn: 'বিকাশ, নগদ বা সোনালী ব্যাংকের মাধ্যমে সরকারি ফিটনেস ও ট্যাক্স টোকেন ফি পরিশোধ করুন।',
        url: 'https://bsp.brta.gov.bd'
      },
      {
        step: 3,
        title_bn: 'ইন্সপেকশন সেন্টারে গাড়ি প্রদর্শন',
        description_bn: 'মিরপুর, ইকুরিয়া বা সংশ্লিষ্ট বিআরটিএ সার্কেল ভেহিকেল ইন্সপেকশন সেন্টারে গাড়ি নিয়ে যান।',
        url: 'https://bsp.brta.gov.bd'
      },
      {
        step: 4,
        title_bn: 'স্বয়ংক্রিয় মেশিন টেস্ট',
        description_bn: 'হেডলাইট, ব্রেক, নির্গমন ধোঁয়া (এমিশন) ও চেসিস নম্বর ডিজিটাল যন্ত্রে স্বয়ংক্রিয়ভাবে পরীক্ষা হবে।',
        url: 'https://bsp.brta.gov.bd'
      },
      {
        step: 5,
        title_bn: 'ডিজিটাল সার্টিফিকেট ও ট্যাক্স টোকেন প্রাপ্তি',
        description_bn: 'উত্তীর্ণ হলে কিউআর কোডযুক্ত ডিজিটাল ফিটনেস সার্টিফিকেট ও ট্যাক্স টোকেন তাৎক্ষণিক গ্রহণ করুন।',
        url: 'https://bsp.brta.gov.bd'
      }
    ],
    important_notes_bn: [
      'ফিটনেসের মেয়াদ উত্তীর্ণ হওয়ার পূর্বে নবায়ন না করলে মাসিক হারে জরিমানা ধার্য করা হয়।',
      'ট্যাক্স টোকেনের মেয়াদ শেষ হওয়ার ১৫ দিনের মধ্যে নবায়ন করতে হয়।'
    ],
    common_mistakes_bn: [
      'গাড়ির লুকিং গ্লাস, হাই সিকিউরিটি রেট্রো-রিফ্লেক্টিভ নাম্বারপ্লেট বিহীন অবস্থায় পরিদর্শনে যাওয়া।'
    ]
  },
  {
    slug: 'police-clearance',
    name_bn: 'অনলাইন পুলিশ ক্লিয়ারেন্স সার্টিফিকেট',
    name_en: 'Online Police Clearance Certificate',
    category: 'identity',
    department_bn: 'বাংলাদেশ পুলিশ (স্পেশাল ব্রাঞ্চ)',
    department_en: 'Bangladesh Police (Special Branch)',
    submission_type: 'hybrid',
    fee: '৫০০',
    fee_note_bn: 'বাংলাদেশ ব্যাংক বা সোনালী ব্যাংকের ১-২২০১-০০০১-২৬৮১ কোডে ৫০০ টাকার ট্রেজারি চালান',
    processing_time_bn: '৭-১০ কার্যদিবস',
    official_url: 'https://pcc.police.gov.bd',
    apply_location_bn: 'অনলাইনে আবেদন ফরম পূরণ এবং সংশ্লিষ্ট মেট্রোপলিটন পুলিশ কমিশনার বা পুলিশ সুপার কার্যালয় থেকে সনদ সংগ্রহ',
    required_docs: [
      {
        name_bn: 'আবেদনকারীর পাসপোর্টের ১ম শ্রেণির গেজেটেড কর্মকর্তা কর্তৃক সত্যায়িত কপি',
        name_en: "Applicant's Passport Attested Photocopy",
        copy_type: 'both',
        note_bn: 'পাসপোর্টের মেয়াদ ন্যূনতম ৩ মাস থাকতে হবে'
      },
      {
        name_bn: '৫০০ টাকার সরকারি ট্রেজারি চালান (A-Challan) মূল কপি',
        name_en: 'Tk 500 Treasury Challan (Original)',
        copy_type: 'original',
        note_bn: 'কোড: ১-২২০১-০০০১-২৬৮১ খাতে চালানের মূল ভাউচার'
      },
      {
        name_bn: 'ইউনিয়ন পরিষদ চেয়ারম্যান / ওয়ার্ড কাউন্সিলর প্রদত্ত নাগরিকত্ব সনদপত্র',
        name_en: 'Citizenship Certificate from UP Chairman/Councillor',
        copy_type: 'original',
        note_bn: 'বর্তমান ও স্থায়ী ঠিকানার প্রত্যয়নপত্র'
      },
      {
        name_bn: 'প্রবাসীদের ক্ষেত্রে পাসপোর্টের ইমিগ্রেশন ডিপারচার সিল ও ভিসা পৃষ্ঠার কপি',
        name_en: 'Departure Stamp & Visa Copy for Expatriates',
        copy_type: 'both',
        note_bn: 'বিদেশে অবস্থানরতদের জন্য বাংলাদেশ দূতাবাস কর্তৃক সত্যায়ন'
      }
    ],
    steps: [
      {
        step: 1,
        title_bn: 'pcc.police.gov.bd পোর্টালে নিবন্ধন',
        description_bn: 'সচল মোবাইল নম্বর ও পাসওয়ার্ড দিয়ে অনলাইনে পুলিশ ক্লিয়ারেন্স অ্যাকাউন্ট তৈরি করুন।',
        url: 'https://pcc.police.gov.bd'
      },
      {
        step: 2,
        title_bn: 'তথ্য পূরণ ও চালান আপলোড',
        description_bn: 'পাসপোর্টের সাথে মিল রেখে ঠিকানা দিন এবং ৫০০ টাকার চালানের স্ক্যান কপি আপলোড করুন।',
        url: 'https://pcc.police.gov.bd'
      },
      {
        step: 3,
        title_bn: 'সংশ্লিষ্ট থানায় পুলিশ ভেরিফিকেশন',
        description_bn: 'আপনার আবেদনের ভিত্তিতে স্থানীয় থানার সাব-ইন্সপেক্টর ঠিকানায় গিয়ে তথ্য ও রেকর্ড তদন্ত করবেন।',
        url: 'https://pcc.police.gov.bd'
      },
      {
        step: 4,
        title_bn: 'এসবি কর্তৃক অনুমোদন',
        description_bn: 'থানার ক্লিয়ারেন্স রিপোর্ট স্পেশাল ব্রাঞ্চে (SB) যাচাই শেষে চূড়ান্ত অনুমোদন পায়।',
        url: 'https://pcc.police.gov.bd'
      },
      {
        step: 5,
        title_bn: 'কিউআর কোডযুক্ত সার্টিফিকেট গ্রহণ',
        description_bn: 'পুলিশ সুপারের কার্যালয় বা ডিসি অফিস থেকে কিউআর কোডযুক্ত মূল সার্টিফিকেট সংগ্রহ করুন।',
        url: 'https://pcc.police.gov.bd'
      }
    ],
    important_notes_bn: [
      'পাসপোর্টের উল্লেখিত স্থায়ী ঠিকানার অধিক্ষেত্রভুক্ত থানাতেই পুলিশ ক্লিয়ারেন্স আবেদন করতে হবে।',
      'বিদেশে ব্যবহারের জন্য পররাষ্ট্র মন্ত্রণালয়ের কনস্যুলার শাখা থেকে সত্যায়ন করে নিতে হবে।'
    ],
    common_mistakes_bn: [
      'চালান কোডে ভুল করা বা ব্যাংকের সঠিক শাখা সিলের স্ক্যান কপি আপলোড না করা।',
      'পাসপোর্টের ঠিকানার সাথে স্থানীয় ঠিকানার অমিল থাকা।'
    ]
  },
  {
    slug: 'land-khatian',
    name_bn: 'অনলাইন খতিয়ান বা পর্চা ও সার্টিফাইড কপি উত্তোলন',
    name_en: 'Online Khatian & Porcha Certified Copy',
    category: 'land',
    department_bn: 'ভূমি সংস্কার বোর্ড ও ভূমি রেকর্ড ও জরিপ অধিদপ্তর',
    department_en: 'Land Reform Board & DLRS, Ministry of Land',
    submission_type: 'hybrid',
    fee: '১০০',
    fee_note_bn: 'অনলাইন ভিউ ও ডিজিটাল কপি ১০০ টাকা; কোর্ট ফি ও ডাক মাশুলসহ সার্টিফাইড হার্ডকপি ১৪০ টাকা',
    processing_time_bn: 'তাৎক্ষণিক (অনলাইন কপি) / ৫-৭ কার্যদিবস (ডাকযোগে হার্ডকপি)',
    official_url: 'https://eporcha.gov.bd',
    apply_location_bn: 'eporcha.gov.bd পোর্টালে সরাসরি আবেদন বা জেলা প্রশাসকের রেকর্ড রুম / ডাকযোগে বিতরণ',
    required_docs: [
      {
        name_bn: 'আবেদনকারীর জাতীয় পরিচয়পত্র (NID) ও মোবাইল নম্বর',
        name_en: "Applicant's NID & Active Mobile Number",
        copy_type: 'online_print',
        note_bn: 'ওটিপি ভেরিফিকেশনের জন্য সচল মোবাইল'
      },
      {
        name_bn: 'মৌজার নাম, জেএল নম্বর ও কাঙ্ক্ষিত খতিয়ান বা দাগ নম্বর',
        name_en: 'Mouza, JL Number & Khatian/Dag Number Details',
        copy_type: 'original',
        note_bn: 'খতিয়ান অনুসন্ধানের প্রাথমিক তথ্য'
      },
      {
        name_bn: 'ডাকযোগে বাসায় গ্রহণের ক্ষেত্রে পূর্ণাঙ্গ ডাক যোগাযোগের ঠিকানা',
        name_en: 'Complete Postal Delivery Address with Postcode',
        copy_type: 'original',
        note_bn: 'সার্টিফাইড হার্ডকপি সরাসরি বাসায় পৌঁছে দেওয়ার জন্য'
      }
    ],
    steps: [
      {
        step: 1,
        title_bn: 'eporcha.gov.bd পোর্টালে বিভাগ ও জেলা নির্বাচন',
        description_bn: 'বিভাগ, জেলা, উপজেলা এবং জরিপের ধরন (বিএস/সিএস/এসএ/আরএস) নির্বাচন করুন।',
        url: 'https://eporcha.gov.bd'
      },
      {
        step: 2,
        title_bn: 'মৌজা ও খতিয়ান নম্বর অনুসন্ধান',
        description_bn: 'নির্দিষ্ট মৌজায় খতিয়ান নম্বর বা দাগ নম্বর দিয়ে কাঙ্ক্ষিত খতিয়ান খুঁজে বের করুন।',
        url: 'https://eporcha.gov.bd'
      },
      {
        step: 3,
        title_bn: 'মালিকানা ও দাগের বিবরণ যাচাই',
        description_bn: 'স্ক্রিনে প্রদর্শিত খতিয়ানের জমির অংশ ও হিস্যা মালিকের তথ্যের সাথে মিলিয়ে নিন।',
        url: 'https://eporcha.gov.bd'
      },
      {
        step: 4,
        title_bn: 'কপির ধরন নির্বাচন ও ফি পরিশোধ',
        description_bn: 'অনলাইন কপি বা সার্টিফাইড হার্ডকপি বেছে নিয়ে বিকাশ/নগদে ফি পরিশোধ করুন।',
        url: 'https://eporcha.gov.bd'
      },
      {
        step: 5,
        title_bn: 'ডাউনলোড বা ডাকযোগে রিসিভ',
        description_bn: 'অনলাইন কপি তাৎক্ষণিক ডাউনলোড করুন অথবা পোস্টম্যানের মাধ্যমে মূল সার্টিফাইড কপি গ্রহণ করুন।',
        url: 'https://eporcha.gov.bd'
      }
    ],
    important_notes_bn: [
      'জমির রেজিস্ট্রেশন, ব্যাংকে বন্ধক রাখা এবং নামজারি করার জন্য ডিসি অফিসের সিলযুক্ত সার্টিফাইড হার্ডকপি আবশ্যক।'
    ],
    common_mistakes_bn: [
      'জরিপের ধরন (CS, SA, RS, BS) ভুল নির্বাচন করার কারণে সঠিক খতিয়ান খুঁজে না পাওয়া।'
    ]
  },
  {
    slug: 'land-tax',
    name_bn: 'অনলাইন ভূমি উন্নয়ন কর (খাজনা) পরিশোধ',
    name_en: 'Online Land Development Tax (LD Tax)',
    category: 'land',
    department_bn: 'ভূমি মন্ত্রণালয় (Ministry of Land)',
    department_en: 'Ministry of Land',
    submission_type: 'online_bot',
    fee: 'সরকারি গেজেট অনুযায়ী',
    fee_note_bn: 'কৃষি জমি ২৫ বিঘা পর্যন্ত করমুক্ত (শুধুমাত্র দাখিলা ফি); আবাসিক ও বাণিজ্যিক জমির মৌজা ভিত্তিক বাৎসরিক নির্ধারিত কর',
    processing_time_bn: 'তাৎক্ষণিক ডিজিটাল দাখিলা রশিদ',
    official_url: 'https://ldtax.gov.bd',
    apply_location_bn: 'ldtax.gov.bd পোর্টালে সরাসরি বিকাশ/নগদে পরিশোধ ও তাৎক্ষণিক ডিজিটাল দাখিলা প্রিন্ট',
    required_docs: [
      {
        name_bn: 'আবেদনকারী বা মালিকের জাতীয় পরিচয়পত্র (NID) নম্বর',
        name_en: "Owner's National ID (NID) Number",
        copy_type: 'online_print',
        note_bn: 'নাগরিক পোর্টালে অ্যাকাউন্ট তৈরির জন্য'
      },
      {
        name_bn: 'সর্বশেষ নামজারি (মিউটেশন) খতিয়ানের কপি',
        name_en: 'Latest Mutation (Namjari) Khatian Copy',
        copy_type: 'both',
        note_bn: 'হোল্ডিং নম্বর নির্ধারণের জন্য'
      },
      {
        name_bn: 'পূর্ববর্তী বছরের দাখিলা / রসিদ (যদি থাকে)',
        name_en: 'Previous Year Land Tax Dakhila / Receipt',
        copy_type: 'both',
        note_bn: 'বকেয়া হিসাব মেলানোর জন্য'
      }
    ],
    steps: [
      {
        step: 1,
        title_bn: 'ldtax.gov.bd পোর্টালে নাগরিক নিবন্ধন',
        description_bn: 'এনআইডি ও সচল মোবাইল নম্বর দিয়ে লগইন প্রোফাইল তৈরি করুন।',
        url: 'https://ldtax.gov.bd'
      },
      {
        step: 2,
        title_bn: 'খতিয়ান ও হোল্ডিং সংযোজন',
        description_bn: 'জেলা, উপজেলা ও মৌজা নির্বাচন করে আপনার নামজারি খতিয়ানের হোল্ডিং যুক্ত করুন।',
        url: 'https://ldtax.gov.bd'
      },
      {
        step: 3,
        title_bn: 'ইউনিয়ন ভূমি সহকারী কর্মকর্তা কর্তৃক যাচাই',
        description_bn: 'দায়িত্বপ্রাপ্ত তহশিলদার অনলাইনে হোল্ডিংয়ের জমির পরিমাণ ও বাৎসরিক কর অনুমোদন করবেন।',
        url: 'https://ldtax.gov.bd'
      },
      {
        step: 4,
        title_bn: 'অনলাইন ই-পেমেন্ট',
        description_bn: 'বিকাশ, নগদ, রকেট বা কার্ডের মাধ্যমে সরাসরি সরকারি চালানে কর পরিশোধ করুন।',
        url: 'https://ldtax.gov.bd'
      },
      {
        step: 5,
        title_bn: 'ডিজিটাল দাখিলা ডাউনলোড',
        description_bn: 'পেমেন্ট সম্পন্ন হওয়ার সাথে সাথে কিউআর কোডযুক্ত আইনসিদ্ধ দাখিলা সংগ্রহ ও প্রিন্ট করুন।',
        url: 'https://ldtax.gov.bd'
      }
    ],
    important_notes_bn: [
      'ডিজিটাল দাখিলায় কোনো কর্মকর্তার ম্যানুয়াল স্বাক্ষরের প্রয়োজন নেই; কিউআর কোড স্ক্যান করলেই সত্যতা যাচাই হয়।'
    ],
    common_mistakes_bn: [
      'পুরানো বা বাতিল খতিয়ানের ভিত্তিতে হোল্ডিং তৈরি করার চেষ্টা করা।'
    ]
  },
  {
    slug: 'mouza-map',
    name_bn: 'ডিজিটাল মৌজা ম্যাপ বা নকশা আবেদন',
    name_en: 'Digital Mouza Map & Plot Sheet',
    category: 'land',
    department_bn: 'ভূমি রেকর্ড ও জরিপ অধিদপ্তর (DLRS)',
    department_en: 'Department of Land Records and Surveys (DLRS)',
    submission_type: 'hybrid',
    fee: '৫২০',
    fee_note_bn: 'প্রতি শিট মৌজা ম্যাপ ফি ৫২০ টাকা (ডাক মাশুল ও পিভিসি টিউব প্যাকেজিং খরচ অন্তর্ভুক্ত)',
    processing_time_bn: '৭-১৫ কার্যদিবস (ডাকযোগে ডেলিভারি)',
    official_url: 'https://eporcha.gov.bd',
    apply_location_bn: 'eporcha.gov.bd পোর্টালে অনলাইন অর্ডার অথবা জেলা রেকর্ড রুম / তেজগাঁও ভূমি রেকর্ড ভবন',
    required_docs: [
      {
        name_bn: 'আবেদনকারীর জাতীয় পরিচয়পত্র (NID) নম্বর ও মোবাইল',
        name_en: "Applicant's NID Number & Mobile",
        copy_type: 'online_print',
        note_bn: 'আবেদন ট্র্যাকিং ও এসএমএসের জন্য'
      },
      {
        name_bn: 'সংশ্লিষ্ট মৌজার নাম, জেএল নম্বর ও শিট নম্বর',
        name_en: 'Mouza Name, JL Number & Sheet Number',
        copy_type: 'original',
        note_bn: 'নকশা নির্বাচনের সুনির্দিষ্ট বিবরণ'
      },
      {
        name_bn: 'ডাকযোগে সরবরাহের জন্য পূর্ণাঙ্গ বর্তমান ঠিকানা',
        name_en: 'Delivery Address with Postal Code',
        copy_type: 'original',
        note_bn: 'পোস্টম্যান কর্তৃক সরাসরি বাসায় বিতরণের ঠিকানা'
      }
    ],
    steps: [
      {
        step: 1,
        title_bn: 'মৌজা ম্যাপ অপশন নির্বাচন',
        description_bn: 'eporcha.gov.bd ওয়েবসাইটে গিয়ে মৌজা ম্যাপ সেকশন ওপেন করুন।',
        url: 'https://eporcha.gov.bd'
      },
      {
        step: 2,
        title_bn: 'বিভাগ, জেলা, থানা ও মৌজা নির্বাচন',
        description_bn: 'জরিপের ধরন (বিএস/সিএস/আরএস) এবং নির্দিষ্ট মৌজার জেএল নম্বর সিলেক্ট করুন।',
        url: 'https://eporcha.gov.bd'
      },
      {
        step: 3,
        title_bn: 'শিট নম্বর ও প্রিভিউ যাচাই',
        description_bn: 'আপনার জমির দাগ নম্বরটি কোন শিটের অন্তর্ভুক্ত তা যাচাই করে সঠিক শিট নির্বাচন করুন।',
        url: 'https://eporcha.gov.bd'
      },
      {
        step: 4,
        title_bn: '৫২০ টাকা অনলাইন ফি পরিশোধ',
        description_bn: 'বিকাশ বা নগদে সরকারি ফি পরিশোধ করে পেমেন্ট কনফার্মেশন সংগ্রহ করুন।',
        url: 'https://eporcha.gov.bd'
      },
      {
        step: 5,
        title_bn: 'পিভিসি টিউবে মূল নকশা গ্রহণ',
        description_bn: 'ডাক বিভাগের মাধ্যমে অক্ষত অবস্থায় প্লাস্টিক টিউবে মোড়ানো মূল মৌজা ম্যাপ বাসায় গ্রহণ করুন।',
        url: 'https://eporcha.gov.bd'
      }
    ],
    important_notes_bn: [
      'জমির সীমানা নিয়ে বিরোধ বা ডিজিটাল সার্ভেয়ার (আমিন) দ্বারা জমি পরিমাপের ক্ষেত্রে মূল মুদ্রিত মৌজা নকশা আবশ্যক।'
    ],
    common_mistakes_bn: [
      'একটি মৌজায় একাধিক শিট থাকলে দাগ নম্বর যাচাই না করে ভুল শিটের জন্য অর্ডার করা।'
    ]
  },
  {
    slug: 'telemedicine-16263',
    name_bn: 'স্বাস্থ্য বাতায়ন ১৬২৬৩ ও জরুরি টেলিমেডিসিন সেবা',
    name_en: 'Shastho Batayan 16263 Telemedicine',
    category: 'health',
    department_bn: 'স্বাস্থ্য অধিদপ্তর (DGHS), স্বাস্থ্য ও পরিবার কল্যাণ মন্ত্রণালয়',
    department_en: 'Directorate General of Health Services (DGHS)',
    submission_type: 'online_bot',
    fee: 'বিনামূল্যে',
    fee_note_bn: 'চিকিৎসা পরামর্শ ও ই-প্রেসক্রিপশন সম্পূর্ণ বিনামূল্যে। শুধুমাত্র মোবাইল অপারেটরের নিয়মিত কল চার্জ প্রযোজ্য',
    processing_time_bn: 'তাৎক্ষণিক (২৪/৭ রিয়েল-টাইম কল)',
    official_url: 'https://16263.dghs.gov.bd',
    apply_location_bn: 'যেকোনো মোবাইল বা টেলিফোন থেকে সরাসরি ১৬২৬৩ নম্বরে ডায়াল করে',
    required_docs: [
      {
        name_bn: 'রোগীর বয়স, লিঙ্গ ও বর্তমান শারীরিক উপসর্গের তথ্য',
        name_en: "Patient's Age, Gender & Symptoms",
        copy_type: 'original',
        note_bn: 'ডাক্তারের সাথে প্রাথমিক কথোপকথনের বিবরণ'
      },
      {
        name_bn: 'পূর্ববর্তী প্রেসক্রিপশন বা চলমান ওষুধের বিবরণ (যদি থাকে)',
        name_en: 'Previous Medical History / Prescriptions',
        copy_type: 'both',
        note_bn: 'ডায়াবেটিস, রক্তচাপ বা অ্যালার্জির তথ্য'
      },
      {
        name_bn: 'ই-প্রেসক্রিপশন গ্রহণের জন্য সচল মোবাইল ফোন নম্বর',
        name_en: 'Active Mobile Number for SMS E-Prescription',
        copy_type: 'original',
        note_bn: 'কল সমাপ্তির সাথে সাথে এসএমএস আসবে'
      }
    ],
    steps: [
      {
        step: 1,
        title_bn: '১৬২৬৩ নম্বরে কল প্রদান',
        description_bn: 'যেকোনো সিম থেকে ১৬২৬৩ ডায়াল করুন (বছরের ৩৬৫ দিন, ২৪ ঘণ্টা সেবা চালু)।',
        url: 'https://16263.dghs.gov.bd'
      },
      {
        step: 2,
        title_bn: 'ডাক্তারের সাথে সংযোগ স্থাপন',
        description_bn: 'আইভিআর নির্দেশনায় ডাক্তারের সাথে কথা বলতে নির্ধারিত বোতাম চেপে চিকিৎসকের সাথে যুক্ত হন।',
        url: 'https://16263.dghs.gov.bd'
      },
      {
        step: 3,
        title_bn: 'সমস্যার বিবরণ ও চিকিৎসা গ্রহণ',
        description_bn: 'সরকারি এমবিবিএস চিকিৎসকের নিকট রোগীর শারীরিক সমস্যা ও উপসর্গের কথা স্পষ্টভাবে বলুন।',
        url: 'https://16263.dghs.gov.bd'
      },
      {
        step: 4,
        title_bn: 'ই-প্রেসক্রিপশন এসএমএস প্রাপ্তি',
        description_bn: 'চিকিৎসক তাৎক্ষণিক প্রেসক্রিপশন তৈরি করে আপনার মোবাইলে অফিশিয়াল এসএমএস পাঠিয়ে দেবেন।',
        url: 'https://16263.dghs.gov.bd'
      },
      {
        step: 5,
        title_bn: 'ওষুধ সেবন ও ফলো-আপ',
        description_bn: 'এসএমএস প্রেসক্রিপশন দেখিয়ে ফার্মেসি থেকে ওষুধ সংগ্রহ করুন এবং প্রয়োজনে পুনরায় ফলো-আপ কল দিন।',
        url: 'https://16263.dghs.gov.bd'
      }
    ],
    important_notes_bn: [
      'জরুরি অ্যাম্বুলেন্স সেবা, সরকারি হাসপাতালের অবস্থান ও হেলথ কার্ডের তথ্যও ১৬২৬৩ থেকে জানা যায়।'
    ],
    common_mistakes_bn: [
      'সংকটাপন্ন বা জরুরি অস্ত্রোপচারের রোগীকে হাসপাতালে না নিয়ে শুধুমাত্র ফোনে সময় নষ্ট করা।'
    ]
  },
  {
    slug: 'vaccination-certificate',
    name_bn: 'ইপিআই টিকাদান ও আন্তর্জাতিক স্বাস্থ্য সনদ',
    name_en: 'EPI Child Vaccination & Health Certificate',
    category: 'health',
    department_bn: 'সম্প্রসারিত টিকাদান কর্মসূচি (EPI), স্বাস্থ্য অধিদপ্তর',
    department_en: 'Expanded Programme on Immunization (EPI), DGHS',
    submission_type: 'hybrid',
    fee: 'বিনামূল্যে',
    fee_note_bn: 'শিশুদের মারাত্মক ১০টি রোগের সরকারি টিকা ও টিকাদান প্রত্যয়ন সম্পূর্ণ বিনামূল্যে',
    processing_time_bn: '১-৩ কার্যদিবস',
    official_url: 'https://dghs.gov.bd',
    apply_location_bn: 'উপজেলা স্বাস্থ্য কমপ্লেক্স, নগর মাতৃসদন বা স্থানীয় ইপিআই স্থায়ী টিকাদান কেন্দ্রে',
    required_docs: [
      {
        name_bn: 'শিশুর মূল ইপিআই টিকাদান কার্ড (EPI Vaccine Card)',
        name_en: "Child's Original EPI Vaccine Card",
        copy_type: 'original',
        note_bn: 'টিকার তারিখ ও স্বাস্থ্যকর্মীর স্বাক্ষরযুক্ত মূল কার্ড'
      },
      {
        name_bn: 'শিশুর ১৭ ডিজিটের অনলাইন জন্ম নিবন্ধন সনদ',
        name_en: "Child's 17-digit Online Birth Certificate",
        copy_type: 'both',
        note_bn: 'ডিএইচআইএস-২ অনলাইন রেকর্ডের জন্য'
      },
      {
        name_bn: 'পিতা ও মাতার জাতীয় পরিচয়পত্র (NID) কপি',
        name_en: "Parents' National ID Copies",
        copy_type: 'photocopy',
        note_bn: 'অভিভাবকত্বের প্রমাণ'
      },
      {
        name_bn: 'বিদেশ ভ্রমণের ক্ষেত্রে শিশুর মূল পাসপোর্ট ও ফটোকপি',
        name_en: "Child's Original Passport & Copy (for travel)",
        copy_type: 'both',
        note_bn: 'আন্তর্জাতিক ট্রাভেল ভ্যাকসিনের জন্য'
      }
    ],
    steps: [
      {
        step: 1,
        title_bn: 'ইপিআই কার্ড ও জন্ম সনদ সংগ্রহ',
        description_bn: 'শিশুর জন্মের পর থেকে সব কয়টি নির্ধারিত টিকার ডোজ সম্পন্ন করা মূল কার্ডটি নিন।',
        url: 'https://dghs.gov.bd'
      },
      {
        step: 2,
        title_bn: 'নিকটস্থ স্বাস্থ্য কমপ্লেক্সে উপস্থিতি',
        description_bn: 'উপজেলা স্বাস্থ্য কমপ্লেক্স বা নগর স্বাস্থ্য কেন্দ্রের ইপিআই ফোকাল পার্সনের কাছে মূল কার্ড প্রদর্শন করুন।',
        url: 'https://dghs.gov.bd'
      },
      {
        step: 3,
        title_bn: 'ডিএইচআইএস-২ অনলাইন ভেরিফিকেশন',
        description_bn: 'স্বাস্থ্য সহকারী সরকারি স্বাস্থ্য পোর্টালে শিশুর টিকার ডাটা এন্ট্রি ও অনুমোদন নিশ্চিত করবেন।',
        url: 'https://dghs.gov.bd'
      },
      {
        step: 4,
        title_bn: 'উপজেলা স্বাস্থ্য কর্মকর্তার প্রতিস্বাক্ষর',
        description_bn: 'স্বাস্থ্য ও পরিবার পরিকল্পনা কর্মকর্তা (UH&FPO) টিকাদান সনদে প্রাতিষ্ঠানিক সিল ও স্বাক্ষর দেবেন।',
        url: 'https://dghs.gov.bd'
      },
      {
        step: 5,
        title_bn: 'আন্তর্জাতিক সনদপত্র গ্রহণ',
        description_bn: 'স্কুল ভর্তি বা বিদেশে ভ্রমণের জন্য কার্যকর কিউআর কোডযুক্ত ভ্যাকসিনেশন সার্টিফিকেট গ্রহণ করুন।',
        url: 'https://dghs.gov.bd'
      }
    ],
    important_notes_bn: [
      'প্রাপ্তবয়স্ক বিদেশগামীদের হলুদ জ্বর (Yellow Fever) ও পোলিও টিকার জন্য আইইডিসিআর মহাখালীতে যেতে হবে।'
    ],
    common_mistakes_bn: [
      'শিশুর মূল ইপিআই কার্ড হারিয়ে ফেলা বা টিকার ডোজের তারিখ স্পষ্ট না থাকা।'
    ]
  },
  {
    slug: 'suborno-nagorik-card',
    name_bn: 'সুবর্ণ নাগরিক - প্রতিবন্ধী ব্যক্তি ডিজিটাল স্মার্ট কার্ড',
    name_en: 'Suborno Nagorik Disability Smart Card',
    category: 'health',
    department_bn: 'সমাজসেবা অধিদপ্তর (সমাজকল্যাণ মন্ত্রণালয়) ও স্বাস্থ্য অধিদপ্তর',
    department_en: 'Department of Social Services (DSS) & DGHS',
    submission_type: 'hybrid',
    fee: 'বিনামূল্যে',
    fee_note_bn: 'মেডিকেল অ্যাসেসমেন্ট, প্রতিবন্ধিতা শনাক্তকরণ ও সুবর্ণ নাগরিক কার্ড সম্পূর্ণ বিনামূল্যে',
    processing_time_bn: '১৫-২১ কার্যদিবস',
    official_url: 'https://dis.dss.gov.bd',
    apply_location_bn: 'উপজেলা স্বাস্থ্য কমপ্লেক্স (মেডিকেল বোর্ড) এবং উপজেলা সমাজসেবা কার্যালয়ে',
    required_docs: [
      {
        name_bn: 'প্রতিবন্ধী ব্যক্তির জাতীয় পরিচয়পত্র (NID) অথবা অনলাইন জন্ম নিবন্ধন',
        name_en: "Person's National ID or Online Birth Certificate",
        copy_type: 'both',
        note_bn: 'বয়স অনুযায়ী বৈধ সরকারি পরিচয়পত্র'
      },
      {
        name_bn: 'সরকারি মেডিকেল বোর্ডের বিশেষজ্ঞ চিকিৎসকের প্রত্যয়নপত্র',
        name_en: 'Disability Assessment Certificate by Medical Board',
        copy_type: 'original',
        note_bn: 'প্রতিবন্ধিতার ধরন ও মাত্রা সম্বলিত মূল প্রত্যয়ন'
      },
      {
        name_bn: 'আবেদনকারীর ৩ কপি পাসপোর্ট সাইজ ছবি (প্রতিবন্ধিতা স্পষ্ট প্রকাশ পায়)',
        name_en: '3 Passport-size Photos Showing Disability Clearly',
        copy_type: 'original',
        note_bn: 'সত্যায়িত রঙিন ছবি'
      },
      {
        name_bn: 'অভিভাবক বা নমিনির জাতীয় পরিচয়পত্র (NID) কপি',
        name_en: "Guardian / Nominee's National ID Copy",
        copy_type: 'photocopy',
        note_bn: 'নাবালক বা মানসিক প্রতিবন্ধীর ক্ষেত্রে আবশ্যক'
      }
    ],
    steps: [
      {
        step: 1,
        title_bn: 'মেডিকেল বোর্ডে শারীরিক অ্যাসেসমেন্ট',
        description_bn: 'উপজেলা স্বাস্থ্য কমপ্লেক্সের প্রতিবন্ধিতা শনাক্তকরণ মেডিকেল বোর্ডে অংশ নিয়ে ডাক্তার প্রত্যয়ন নিন।',
        url: 'https://dis.dss.gov.bd'
      },
      {
        step: 2,
        title_bn: 'ডিআইএস (DIS) পোর্টালে অনলাইন নিবন্ধন',
        description_bn: 'dis.dss.gov.bd পোর্টালে ডাক্তারের রিপোর্ট ও ছবি আপলোড করে আবেদন সাবমিট করুন।',
        url: 'https://dis.dss.gov.bd'
      },
      {
        step: 3,
        title_bn: 'সমাজসেবা কর্মকর্তা কর্তৃক ফিল্ড ভেরিফিকেশন',
        description_bn: 'উপজেলা সমাজসেবা কর্মকর্তা আবেদনকারীর তথ্য ডাটাবেসে যাচাই ও অনুমোদন করবেন।',
        url: 'https://dis.dss.gov.bd'
      },
      {
        step: 4,
        title_bn: 'সুবর্ণ নাগরিক আইডি নম্বর বরাদ্দ',
        description_bn: 'জাতীয় ডাটাবেসে নাম অন্তর্ভুক্ত হয়ে ডিজিটাল সুবর্ণ নাগরিক নম্বর জেনারেট হবে।',
        url: 'https://dis.dss.gov.bd'
      },
      {
        step: 5,
        title_bn: 'সুবর্ণ নাগরিক স্মার্ট কার্ড গ্রহণ',
        description_bn: 'উপজেলা সমাজসেবা অফিস থেকে বিশেষ স্মার্ট কার্ড গ্রহণ করে মাসিক ভাতা ও সুযোগ নিশ্চিত করুন।',
        url: 'https://dis.dss.gov.bd'
      }
    ],
    important_notes_bn: [
      'এই কার্ড থাকলে সরকার নির্ধারিত অসচ্ছল প্রতিবন্ধী ভাতা (মাসিক ৮৫০ টাকা) এবং গণপরিবহনে বিশেষ অধিকার পাওয়া যায়।'
    ],
    common_mistakes_bn: [
      'বেসরকারি হাসপাতালের সাধারণ প্রেসক্রিপশন জমা দেওয়া; সরকারি মেডিকেল বোর্ডের প্রত্যয়নই একমাত্র গ্রহণযোগ্য।'
    ]
  },
  {
    slug: 'board-certificate-duplicate',
    name_bn: 'শিক্ষা বোর্ড মূল সনদ ও নম্বরপত্র যাচাই ও উত্তোলন',
    name_en: 'Board Certificate & Transcript Issue',
    category: 'education',
    department_bn: 'মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষা বোর্ডসমূহ (আন্তঃশিক্ষা বোর্ড সমন্বয় সাব-কমিটি)',
    department_en: 'Board of Intermediate and Secondary Education',
    submission_type: 'hybrid',
    fee: '৫০০',
    fee_note_bn: 'হারানো সনদের জন্য ৫০০ টাকা; নম্বরপত্র বা একাডেমিক ট্রান্সক্রিপ্ট ফি ৩৫০ টাকা',
    processing_time_bn: '৭-১৫ কার্যদিবস',
    official_url: 'https://dhakaeducationboard.gov.bd',
    apply_location_bn: 'সংশ্লিষ্ট শিক্ষা বোর্ডের অনলাইন ই-সেবা পোর্টাল অথবা সরাসরি বোর্ড ওয়ান-স্টপ কাউন্টারে',
    required_docs: [
      {
        name_bn: 'এসএসসি বা এইচএসসি পরীক্ষার মূল প্রবেশপত্র ও রেজিস্ট্রেশন কার্ড',
        name_en: 'Original Admit Card & Registration Card Copy',
        copy_type: 'both',
        note_bn: 'পরীক্ষার বছর, রোল ও রেজিস্ট্রেশন নম্বর'
      },
      {
        name_bn: 'হারানোর ক্ষেত্রে সংশ্লিষ্ট থানার জিডি (সাধারণ ডায়েরি) এর মূল কপি',
        name_en: 'Police GD (General Diary) Original Copy',
        copy_type: 'original',
        note_bn: 'সনদপত্র হারিয়ে যাওয়ার প্রমাণ'
      },
      {
        name_bn: 'জাতীয় দৈনিক পত্রিকায় প্রকাশিত হারানো বিজ্ঞপ্তির মূল কাটিং',
        name_en: 'Daily Newspaper Lost Notice Original Paper Cutting',
        copy_type: 'original',
        note_bn: 'পত্রিকার তারিখ ও নাম স্পষ্ট থাকতে হবে'
      },
      {
        name_bn: 'শিক্ষাপ্রতিষ্ঠান প্রধানের সুপারিশ ও প্রত্যয়নপত্র',
        name_en: 'Head of Institution Recommendation Letter',
        copy_type: 'original',
        note_bn: 'যে স্কুল বা কলেজ থেকে পাস করেছেন'
      }
    ],
    steps: [
      {
        step: 1,
        title_bn: 'থানায় জিডি ও পত্রিকায় বিজ্ঞপ্তি',
        description_bn: 'সার্টিফিকেট হারিয়ে গেলে নিকটস্থ থানায় জিডি করুন এবং বহুল প্রচারিত পত্রিকায় হারানো বিজ্ঞপ্তি দিন।',
        url: 'https://dhakaeducationboard.gov.bd'
      },
      {
        step: 2,
        title_bn: 'বোর্ডের ই-সেবা পোর্টালে অনলাইন আবেদন',
        description_bn: 'সংশ্লিষ্ট শিক্ষা বোর্ডের পোর্টালে গিয়ে রোল ও রেজিস্ট্রেশন দিয়ে আবেদন ফরম পূরণ করুন।',
        url: 'https://dhakaeducationboard.gov.bd'
      },
      {
        step: 3,
        title_bn: 'কাগজপত্র ও জিডি কপি আপলোড',
        description_bn: 'জিডির কপি, পত্রিকার কাটিং ও প্রবেশপত্রের স্ক্যান কপি অনলাইনে আপলোড করুন।',
        url: 'https://dhakaeducationboard.gov.bd'
      },
      {
        step: 4,
        title_bn: 'সোনালী সেবায় ফি পরিশোধ',
        description_bn: 'সোনালী পেমেন্ট গেটওয়েতে ৫০০ টাকা ফি জমা দিয়ে মানি রিসিট সংরক্ষণ করুন।',
        url: 'https://dhakaeducationboard.gov.bd'
      },
      {
        step: 5,
        title_bn: 'ডুপ্লিকেট সনদ সংগ্রহ',
        description_bn: 'বোর্ড থেকে এসএমএস পেলে মূল রসিদ প্রদর্শন করে বোর্ড কাউন্টার থেকে ডুপ্লিকেট মূল সনদপত্র গ্রহণ করুন।',
        url: 'https://dhakaeducationboard.gov.bd'
      }
    ],
    important_notes_bn: [
      'উচ্চশিক্ষায় বিদেশ গমনের জন্য শিক্ষা বোর্ড থেকে উত্তোলিত সনদে আন্তঃশিক্ষা বোর্ড ও শিক্ষা মন্ত্রণালয়ের সত্যায়ন প্রয়োজন।'
    ],
    common_mistakes_bn: [
      'থানার সাধারণ ডায়েরিতে (জিডি) পরীক্ষার রোল ও রেজিস্ট্রেশন নম্বরের বানানে ভুল থাকা।'
    ]
  },
  {
    slug: 'school-admission',
    name_bn: 'সরকারি ও বেসরকারি বিদ্যালয়ে কেন্দ্রীয় অনলাইন ভর্তি আবেদন',
    name_en: 'Central Online School Admission (GSA)',
    category: 'education',
    department_bn: 'মাধ্যমিক ও উচ্চ শিক্ষা অধিদপ্তর (DSHE)',
    department_en: 'Directorate of Secondary and Higher Education (DSHE)',
    submission_type: 'online_bot',
    fee: '১১০',
    fee_note_bn: 'প্রতি আবেদনে সর্বোচ্চ ৫টি বিদ্যালয় পছন্দের জন্য টেলিটক ফি ১১০ টাকা',
    processing_time_bn: 'কেন্দ্রীয় ডিজিটাল লটারি ও ফলাফল সরকারি সময়সূচি অনুযায়ী',
    official_url: 'https://gsa.teletalk.com.bd',
    apply_location_bn: 'gsa.teletalk.com.bd পোর্টালে অনলাইন আবেদন এবং টেলিটকে এসএমএস ফি পরিশোধ',
    required_docs: [
      {
        name_bn: 'শিক্ষার্থীর ১৭ ডিজিটের অনলাইন জন্ম নিবন্ধন সনদ (BDRIS Verification)',
        name_en: "Student's 17-digit Online Birth Certificate",
        copy_type: 'online_print',
        note_bn: 'সরকারি ডাটাবেসে নাম ও বয়স যাচাইয়ের জন্য'
      },
      {
        name_bn: 'শিক্ষার্থীর পাসপোর্ট সাইজ ডিজিটাল রঙিন ছবি',
        name_en: 'Digital Color Passport Photo (300x300 px)',
        copy_type: 'original',
        note_bn: 'সর্বোচ্চ ১০০ কেবি সাইজ'
      },
      {
        name_bn: 'পিতা ও মাতার জাতীয় পরিচয়পত্র (NID) নম্বর ও মোবাইল',
        name_en: "Parents' NID Number & Contact Details",
        copy_type: 'original',
        note_bn: 'অভিভাবক ভেরিফিকেশন'
      },
      {
        name_bn: 'কোটা সুবিধা থাকলে প্রযোজ্য সনদ (মুক্তিযোদ্ধা, প্রতিবন্ধী বা ক্যাচমেন্ট)',
        name_en: 'Quota Supporting Certificate (if applicable)',
        copy_type: 'both',
        note_bn: 'সরকারি কোটায় ভর্তির প্রমাণপত্র'
      }
    ],
    steps: [
      {
        step: 1,
        title_bn: 'gsa.teletalk.com.bd পোর্টালে প্রবেশ',
        description_bn: 'বার্ষিক ভর্তি মৌসুমে কেন্দ্রীয় অনলাইন ভর্তি পোর্টালে প্রবেশ করুন।',
        url: 'https://gsa.teletalk.com.bd'
      },
      {
        step: 2,
        title_bn: 'শিক্ষার্থীর ১৭ ডিজিটের জন্ম নিবন্ধন এন্ট্রি',
        description_bn: 'জন্ম নিবন্ধন দিলে স্বয়ংক্রিয়ভাবে নাম ও জন্মতারিখ সরকারি ডাটাবেস থেকে লোড হবে।',
        url: 'https://gsa.teletalk.com.bd'
      },
      {
        step: 3,
        title_bn: 'শ্রেণি ও বিদ্যালয় পছন্দক্রম নির্ধারণ',
        description_bn: 'শিক্ষার্থীর শ্রেণি, শিফট, মাধ্যম এবং এলাকাভিত্তিক সর্বোচ্চ ৫টি পছন্দের বিদ্যালয় নির্বাচন করুন।',
        url: 'https://gsa.teletalk.com.bd'
      },
      {
        step: 4,
        title_bn: 'টেলিটক এসএমএসে ১১০ টাকা ফি পরিশোধ',
        description_bn: 'প্রাপ্ত ইউজার আইডি দিয়ে যেকোনো টেলিটক মোবাইল থেকে এসএমএসে আবেদন ফি পরিশোধ করুন।',
        url: 'https://gsa.teletalk.com.bd'
      },
      {
        step: 5,
        title_bn: 'ডিজিটাল লটারির ফলাফল ও ভর্তি',
        description_bn: 'নির্ধারিত দিনে ডিজিটাল লটারির রেজাল্ট এসএমএসে আসবে এবং নির্বাচিত বিদ্যালয়ে ভর্তি সম্পন্ন করুন।',
        url: 'https://gsa.teletalk.com.bd'
      }
    ],
    important_notes_bn: [
      'একটি জন্ম নিবন্ধন দিয়ে একবারই আবেদন করা সম্ভব; অসদুপায় অবলম্বন করলে প্রার্থিতা সম্পূর্ণ বাতিল হয়।'
    ],
    common_mistakes_bn: [
      'অনলাইন ভেরিফাইড ১৭ ডিজিটের জন্ম নিবন্ধন সনদ ব্যবহার না করে ম্যানুয়াল জন্ম সনদের তথ্য দেওয়া।'
    ]
  },
  {
    slug: 'bmet-smart-card',
    name_bn: 'বিএমইটি স্মার্ট ইমিগ্রেশন কার্ড ও ছাড়পত্র',
    name_en: 'BMET Smart Card & Emigration Clearance',
    category: 'overseas',
    department_bn: 'জনশক্তি কর্মসংস্থান ও প্রশিক্ষণ ব্যুরো (BMET), প্রবাসী কল্যাণ ও বৈদেশিক কর্মসংস্থান মন্ত্রণালয়',
    department_en: 'Bureau of Manpower, Employment and Training (BMET)',
    submission_type: 'hybrid',
    fee: '৪,৭৫০',
    fee_note_bn: 'কল্যাণ তহবিল ফি ৩,৫০০ টাকা, বাধ্যতামূলক জীবন বীমা ১,০০০ টাকা ও সরকারি সার্ভিস চার্জ',
    processing_time_bn: '৩-৫ কার্যদিবস',
    official_url: 'https://www.bmet.gov.bd',
    apply_location_bn: 'আমি প্রবাসী (Ami Probashi) ডিজিটাল অ্যাপ অথবা বিএমইটি জেলা কর্মসংস্থান কার্যালয় (DEMO)',
    required_docs: [
      {
        name_bn: 'আবেদনকারীর মূল পাসপোর্ট ও ভিসার সত্যায়িত রঙিন কপি',
        name_en: "Applicant's Passport & Visa Copy",
        copy_type: 'both',
        note_bn: 'পাসপোর্টের মেয়াদ ন্যূনতম ৬ মাস থাকতে হবে'
      },
      {
        name_bn: 'গামকা (GAMCA) অনুমোদিত মেডিকেল ফিটনেস রিপোর্ট',
        name_en: 'GAMCA Approved Medical Fitness Certificate',
        copy_type: 'original',
        note_bn: 'অনুমোদিত মেডিকেল সেন্টার প্রদত্ত রিপোর্ট'
      },
      {
        name_bn: 'বিএমইটি অনুমোদিত ৩ দিনের প্রাক-বহির্গমন ওরিয়েন্টেশন (PDO) সনদ',
        name_en: 'Pre-Departure Orientation (PDO) Certificate',
        copy_type: 'both',
        note_bn: 'সরকারি কারিগরি প্রশিক্ষণ কেন্দ্র (TTC) প্রদত্ত সনদ'
      },
      {
        name_bn: 'নিয়োগকর্তার সাথে সম্পাদিত বৈধ কাজের চুক্তিপত্র (Employment Contract)',
        name_en: 'Verified Employment Contract Agreement',
        copy_type: 'both',
        note_bn: 'বেতন ও সুযোগ-সুবিধা সম্বলিত চুক্তি'
      }
    ],
    steps: [
      {
        step: 1,
        title_bn: 'আমি প্রবাসী অ্যাপে নিবন্ধন ও পাসপোর্ট যাচাই',
        description_bn: 'অ্যাপের মাধ্যমে পাসপোর্ট স্ক্যান করে তথ্য ও বায়োমেট্রিক ওটিপি দিয়ে প্রোফাইল সম্পন্ন করুন।',
        url: 'https://www.bmet.gov.bd'
      },
      {
        step: 2,
        title_bn: 'পিডিও (PDO) ট্রেনিং সম্পন্ন করণ',
        description_bn: 'নিকটস্থ টিটিসি সেন্টারে ৩ দিনের প্রাক-বহির্গমন প্রশিক্ষণে অংশ নিয়ে সনদ অর্জন করুন।',
        url: 'https://www.bmet.gov.bd'
      },
      {
        step: 3,
        title_bn: 'মেডিকেল ও ভিসা আপলোড',
        description_bn: 'বৈধ কাজের ভিসা ও গামকা ফিটনেস রিপোর্ট অ্যাপে বা বিএমইটি সার্ভারে আপলোড করুন।',
        url: 'https://www.bmet.gov.bd'
      },
      {
        step: 4,
        title_bn: 'কল্যাণ তহবিল ও জীবন বীমা ফি পরিশোধ',
        description_bn: 'বিকাশ বা নগদে প্রবাসী কল্যাণ তহবিল ও বাধ্যতামূলক জীবন বীমার ফি পরিশোধ করুন।',
        url: 'https://www.bmet.gov.bd'
      },
      {
        step: 5,
        title_bn: 'বিএমইটি স্মার্ট কার্ড ও কিউআর কোড গ্রহণ',
        description_bn: 'ইমিগ্রেশন ছাড়পত্র সম্বলিত ডিজিটাল বিএমইটি স্মার্ট কার্ড গ্রহণ করুন যা বিমানবন্দরে প্রদর্শন বাধ্যতামূলক।',
        url: 'https://www.bmet.gov.bd'
      }
    ],
    important_notes_bn: [
      'বৈধ বিএমইটি কার্ড ব্যতীত বিমানবন্দরে বহির্গমন ইমিগ্রেশন পার হওয়া অসম্ভব এবং সরকারি সুবিধা পাওয়া যায় না।'
    ],
    common_mistakes_bn: [
      'অস্বীকৃত দালালের মিথ্যা প্রলোভনে ভুয়া ভিসা বা জাল মেডিকেল সনদ আপলোড করে বিমানবন্দরে আটক হওয়া।'
    ]
  },
  {
    slug: 'rjsc-company-registration',
    name_bn: 'যৌথ মূলধন কোম্পানি ও ফার্ম নিবন্ধন (RJSC)',
    name_en: 'RJSC Company Registration & Incorporation',
    category: 'business',
    department_bn: 'যৌথ মূলধন কোম্পানি ও ফার্মসমূহের পরিদপ্তর (RJSC), বাণিজ্য মন্ত্রণালয়',
    department_en: 'Registrar of Joint Stock Companies and Firms (RJSC)',
    submission_type: 'hybrid',
    fee: '৪,২০০',
    fee_note_bn: 'নামের ছাড়পত্র ফি ১,০০০ টাকা, প্রাথমিক মূলধন স্ট্যাম্প ডিউটি ও সরকারি গেজেট ফি অন্তর্ভুক্ত',
    processing_time_bn: '৭-১০ কার্যদিবস',
    official_url: 'https://roc.gov.bd',
    apply_location_bn: 'roc.gov.bd অনলাইন পোর্টালে ডিজিটাল আবেদন ও ই-পেমেন্ট',
    required_docs: [
      {
        name_bn: 'অনুমোদিত নামের ছাড়পত্র (Name Clearance Certificate)',
        name_en: 'Approved Name Clearance Certificate',
        copy_type: 'online_print',
        note_bn: 'আরজেএসসি থেকে ইস্যুকৃত ৩০ দিন মেয়াদী ছাড়পত্র'
      },
      {
        name_bn: 'কোম্পানির মেমোরেন্ডাম অব অ্যাসোসিয়েশন (MoA) ও আর্টিক্যালস (AoA)',
        name_en: 'Memorandum (MoA) & Articles of Association (AoA)',
        copy_type: 'original',
        note_bn: 'কোম্পানির উদ্দেশ্য ও পরিচালনা বিধিমালার মূল কপি'
      },
      {
        name_bn: 'সকল পরিচালকের জাতীয় পরিচয়পত্র (NID), ই-টিআইএন ও ছবি',
        name_en: "All Directors' NID, e-TIN & Passport Photos",
        copy_type: 'both',
        note_bn: 'পরিচালকদের কর শনাক্তকরণ ও নাগরিক তথ্য'
      },
      {
        name_bn: 'কোম্পানির রেজিস্টার্ড অফিসের ঠিকানা সংক্রান্ত চুক্তি বা ইউটিলিটি বিল',
        name_en: 'Registered Office Rent Agreement / Utility Bill',
        copy_type: 'both',
        note_bn: 'দাপ্তরিক ঠিকানার প্রমাণ'
      }
    ],
    steps: [
      {
        step: 1,
        title_bn: 'নামের ছাড়পত্র (Name Clearance) আবেদন',
        description_bn: 'roc.gov.bd পোর্টালে কোম্পানির কাঙ্ক্ষিত নাম অনুসন্ধান করে ছাড়পত্র গ্রহণ করুন।',
        url: 'https://roc.gov.bd'
      },
      {
        step: 2,
        title_bn: 'MoA ও AoA প্রণয়ন ও স্বাক্ষর',
        description_bn: 'কোম্পানির শেয়ারহোল্ডারদের বিবরণ ও ব্যবসায়িক উদ্দেশ্য সম্বলিত স্মারকলিপি চূড়ান্ত করুন।',
        url: 'https://roc.gov.bd'
      },
      {
        step: 3,
        title_bn: 'আরজেএসসি ডিজিটাল ফরম পূরণ ও স্ট্যাম্প ফি',
        description_bn: 'ফর্ম I, VI, IX, X, XII অনলাইনে সাবমিট করে সরকারি ট্রেজারি ও স্ট্যাম্প ডিউটি পরিশোধ করুন।',
        url: 'https://roc.gov.bd'
      },
      {
        step: 4,
        title_bn: 'সহকারী নিবন্ধক কর্তৃক নিরীক্ষা',
        description_bn: 'আরজেএসসি কর্মকর্তা দাখিলকৃত সকল কাগজপত্র ও পরিচালকদের এনআইডি যাচাই করবেন।',
        url: 'https://roc.gov.bd'
      },
      {
        step: 5,
        title_bn: 'সার্টিফিকেট অব ইনকর্পোরেশন (CIN) লাভ',
        description_bn: 'অনুমোদিত ডিজিটাল সার্টিফিকেট অব ইনকর্পোরেশন ডাউনলোড করে প্রাতিষ্ঠানিক কার্যক্রম শুরু করুন।',
        url: 'https://roc.gov.bd'
      }
    ],
    important_notes_bn: [
      'কোম্পানি নিবন্ধনের পর অবিলম্বে কোম্পানির নামে ব্যাংক হিসাব খোলা এবং বাণিজ্যিক ট্রেড লাইসেন্স গ্রহণ করতে হয়।'
    ],
    common_mistakes_bn: [
      'পরিচালকদের এনআইডির নামের বানানের সাথে ই-টিআইএন ও আরজেএসসি ফর্মের বানানে অমিল থাকা।'
    ]
  },
  {
    slug: 'maternity-allowance',
    name_bn: 'মা ও শিশু সহায়তা কর্মসূচি / মাতৃত্বকালীন ভাতা',
    name_en: 'Mother & Child Benefit Programme (MCBP)',
    category: 'welfare',
    department_bn: 'মহিলা বিষয়ক অধিদপ্তর (মহিলা ও শিশু বিষয়ক মন্ত্রণালয়)',
    department_en: 'Department of Women Affairs (DWA)',
    submission_type: 'hybrid',
    fee: 'বিনামূল্যে',
    fee_note_bn: 'আবেদন সম্পূর্ণ বিনামূল্যে। নির্বাচিত গর্ভবতী মায়েরা মাসিক ৮০০ টাকা হারে মোট ৩৬ মাস (২৮,৮০০ টাকা) ভাতা পান',
    processing_time_bn: '৩০-৪৫ কার্যদিবস (বাছাই কমিটি সাপেক্ষে)',
    official_url: 'https://dwa.gov.bd',
    apply_location_bn: 'উপজেলা মহিলা বিষয়ক কর্মকর্তার কার্যালয়, ইউনিয়ন ডিজিটাল সেন্টার বা পৌরসভা',
    required_docs: [
      {
        name_bn: 'গর্ভবতী মায়ের মূল জাতীয় পরিচয়পত্র (NID) ও ফটোকপি',
        name_en: "Pregnant Mother's National ID (Both Copies)",
        copy_type: 'both',
        note_bn: 'ভোটার তালিকাভুক্ত বৈধ এনআইডি কার্ড'
      },
      {
        name_bn: 'উপজেলা স্বাস্থ্য কমপ্লেক্স বা পরিবার পরিকল্পনা কেন্দ্র প্রদত্ত এএনসি (ANC) কার্ড',
        name_en: 'Antenatal Care (ANC) Card from Health Center',
        copy_type: 'both',
        note_bn: 'নিয়মিত গর্ভকালীন স্বাস্থ্য পরীক্ষার প্রমাণ'
      },
      {
        name_bn: 'গর্ভধারণের বয়স ৫-৭ মাস প্রমাণের সরকারি ডাক্তারের আল্ট্রাসনোগ্রাম রিপোর্ট',
        name_en: 'Doctor Certified Ultrasonography Report (5-7 months)',
        copy_type: 'original',
        note_bn: 'গর্ভধারণের সঠিক সময়কাল প্রমাণের জন্য'
      },
      {
        name_bn: 'আবেদনকারিণীর নিজের নামে নিবন্ধিত মোবাইল ব্যাংকিং (বিকাশ/নগদ) হিসাব',
        name_en: 'Active Mobile Financial Account (bKash/Nagad)',
        copy_type: 'original',
        note_bn: 'মায়ের নিজের নামে সিম ও অ্যাকাউন্ট থাকা বাধ্যতামূলক'
      }
    ],
    steps: [
      {
        step: 1,
        title_bn: 'ইউনিয়ন বা পৌর ডিজিটাল সেন্টারে আবেদন',
        description_bn: 'গর্ভবতী মা স্বাস্থ্য কেন্দ্রের এএনসি কার্ড ও এনআইডি নিয়ে অনলাইনে নিবন্ধন ফরম পূরণ করবেন।',
        url: 'https://dwa.gov.bd'
      },
      {
        step: 2,
        title_bn: 'আর্থ-সামাজিক তথ্য এন্ট্রি',
        description_bn: 'প্রথম বা দ্বিতীয় গর্ভধারণ, পরিবারের বাৎসরিক আয় ও পেশা সংক্রান্ত সঠিক তথ্য দিন।',
        url: 'https://dwa.gov.bd'
      },
      {
        step: 3,
        title_bn: 'মাঠপর্যায়ে স্বাস্থ্য সহকারীর যাচাই',
        description_bn: 'স্বাস্থ্য সহকারী ও পরিবার কল্যাণ সহকারী গর্ভবতী মায়ের শারীরিক অবস্থা নিশ্চিত করবেন।',
        url: 'https://dwa.gov.bd'
      },
      {
        step: 4,
        title_bn: 'উপজেলা কমিটির চূড়ান্ত অনুমোদন',
        description_bn: 'উপজেলা নির্বাহী কর্মকর্তার (ইউএনও) নেতৃত্বে কমিটি যোগ্য মায়েদের নাম তালিকাভুক্ত করে।',
        url: 'https://dwa.gov.bd'
      },
      {
        step: 5,
        title_bn: 'জিটুপি (G2P) মোবাইল ব্যাংকিংয়ে ভাতা লাভ',
        description_bn: 'প্রতি মাসে সরাসরি বাংলাদেশ ব্যাংক থেকে মায়ের বিকাশ বা নগদ নম্বরে ৮০০ টাকা ভাতা জমা হবে।',
        url: 'https://dwa.gov.bd'
      }
    ],
    important_notes_bn: [
      'এই ভাতা শুধুমাত্র প্রথম ও দ্বিতীয় গর্ভধারণের জন্য প্রযোজ্য; তৃতীয় সন্তানের ক্ষেত্রে এই সুবিধা পাওয়া যায় না।'
    ],
    common_mistakes_bn: [
      'স্বামীর বা অন্যের নামে নিবন্ধিত সিম দিয়ে মোবাইল ব্যাংকিং নম্বর দেওয়া; নিজের এনআইডিতে সিম থাকা বাধ্যতামূলক।'
    ]
  },
  {
    slug: 'warishan-certificate',
    name_bn: 'ওয়ারিশান বা উত্তরাধিকার সনদপত্র',
    name_en: 'Warishan / Legal Heirship Certificate',
    category: 'identity',
    department_bn: 'স্থানীয় সরকার বিভাগ (ইউনিয়ন পরিষদ / পৌরসভা / সিটি কর্পোরেশন)',
    department_en: 'Local Government Division (UP / Pourashava / City Corporation)',
    submission_type: 'hybrid',
    fee: '১০০-৩০০',
    fee_note_bn: 'স্থানীয় সরকার গেজেট অনুযায়ী ইউনিয়ন পরিষদে ১০০ টাকা, পৌরসভা বা সিটি কর্পোরেশনে ২০০-৩০০ টাকা',
    processing_time_bn: '৩-৭ কার্যদিবস',
    official_url: 'https://pouroseba.gov.bd',
    apply_location_bn: 'pouroseba.gov.bd পোর্টাল অথবা সংশ্লিষ্ট ইউনিয়ন পরিষদ / ওয়ার্ড কাউন্সিলর কার্যালয়ে',
    required_docs: [
      {
        name_bn: 'মৃত ব্যক্তির ডিজিটাল অনলাইন মৃত্যু নিবন্ধন সনদপত্র',
        name_en: "Deceased Person's Digital Online Death Certificate",
        copy_type: 'both',
        note_bn: 'বিডিআরআইএস (BDRIS) অনলাইন ভেরিফাইড সনদ'
      },
      {
        name_bn: 'সকল জীবিত ওয়ারিশের জাতীয় পরিচয়পত্র (NID) বা অনলাইন জন্ম নিবন্ধন',
        name_en: "All Living Heirs' NID or Online Birth Certificates",
        copy_type: 'both',
        note_bn: 'স্ত্রী, পুত্র, কন্যাসহ সকল উত্তরাধিকারীর নথিপত্র'
      },
      {
        name_bn: 'আবেদনকারী ও সকল ওয়ারিশের পাসপোর্ট সাইজ সত্যায়িত ছবি',
        name_en: "Passport-size Attested Photos of All Heirs",
        copy_type: 'original',
        note_bn: 'স্থানীয় জনপ্রতিনিধি কর্তৃক সত্যায়িত'
      },
      {
        name_bn: 'সকল ওয়ারিশের নাম ও সম্পর্ক উল্লেখপূর্বক ৩০০ টাকার স্ট্যাম্পে হলফনামা',
        name_en: 'Notarized Affidavit on Tk 300 Non-Judicial Stamp',
        copy_type: 'original',
        note_bn: 'কোনো ওয়ারিশ বাদ না পড়ার শপথনামা'
      }
    ],
    steps: [
      {
        step: 1,
        title_bn: 'ইউপি বা পৌরসভা পোর্টালে আবেদন',
        description_bn: 'pouroseba.gov.bd সাইটে বা কাউন্সিলর কার্যালয়ে ওয়ারিশান আবেদন ফরম পূরণ করুন।',
        url: 'https://pouroseba.gov.bd'
      },
      {
        step: 2,
        title_bn: 'মৃত ব্যক্তি ও ওয়ারিশদের তালিকা এন্ট্রি',
        description_bn: 'মৃত ব্যক্তির সকল বৈধ ওয়ারিশের নাম, এনআইডি নম্বর ও সম্পর্কের বিবরণ নির্ভুলভাবে দিন।',
        url: 'https://pouroseba.gov.bd'
      },
      {
        step: 3,
        title_bn: 'ইউপি সদস্য / কাউন্সিলরের সরেজমিন তদন্ত',
        description_bn: 'স্থানীয় জনপ্রতিনিধি ওয়ারিশদের সঠিকতা ও কোনো ওয়ারিশ গোপন করা হয়েছে কিনা তা তদন্ত করবেন।',
        url: 'https://pouroseba.gov.bd'
      },
      {
        step: 4,
        title_bn: 'ইউপি চেয়ারম্যান বা মেয়রের ডিজিটাল স্বাক্ষর',
        description_bn: 'তদন্ত প্রতিবেদনের ভিত্তিতে চেয়ারম্যান বা মেয়র ওয়ারিশান সনদে অফিশিয়াল অনুমোদন দেবেন।',
        url: 'https://pouroseba.gov.bd'
      },
      {
        step: 5,
        title_bn: 'কিউআর কোডযুক্ত ওয়ারিশান সনদ গ্রহণ',
        description_bn: 'নির্ধারিত ফি পরিশোধ করে কিউআর কোড সম্বলিত সরকারি ওয়ারিশান সনদপত্র সংগ্রহ করুন।',
        url: 'https://pouroseba.gov.bd'
      }
    ],
    important_notes_bn: [
      'জমি খারিজ (মিউটেশন), ব্যাংকে থাকা টাকা উত্তোলন এবং উত্তরাধিকার সূত্রে সম্পত্তি বণ্টনে ওয়ারিশান সনদ অপরিহার্য।'
    ],
    common_mistakes_bn: [
      'কন্যাসন্তান বা কোনো নির্দিষ্ট ওয়ারিশের নাম বাদ দেওয়া; এটি দণ্ডবিধিতে আইনত শাস্তিযোগ্য অপরাধ।'
    ]
  }
]
