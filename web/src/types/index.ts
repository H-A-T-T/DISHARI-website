export type Language = 'bn' | 'en'

export type CopyType = 'original' | 'photocopy' | 'online' | 'both'

export type SubmissionType = 'online_bot' | 'pdf_only' | 'hybrid'

export type ServiceCategory =
  | 'identity'
  | 'education'
  | 'land'
  | 'welfare'
  | 'business'
  | 'tax'
  | 'overseas'
  | 'health'

export interface RequiredDoc {
  name_bn: string
  name_en: string
  copy_type: CopyType
  note_bn?: string
}

export interface ServiceStep {
  step: number
  title_bn: string
  description_bn: string
  url?: string
}

export interface Service {
  slug: string
  name_bn: string
  name_en: string
  category: ServiceCategory
  department_bn: string
  department_en: string
  submission_type: SubmissionType
  fee: string
  fee_note_bn?: string
  processing_time_bn: string
  official_url: string
  apply_location_bn: string
  required_docs: RequiredDoc[]
  steps: ServiceStep[]
  important_notes_bn?: string[]
  common_mistakes_bn?: string[]
}

export interface Category {
  slug: ServiceCategory
  name_bn: string
  name_en: string
  icon: string
  color: string
  bgColor: string
  borderColor: string
}
