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

export type DocType =
  | 'nid_front'
  | 'nid_back'
  | 'birth_certificate'
  | 'photo'
  | 'tin_certificate'
  | 'trade_license'
  | 'citizenship_certificate'
  | 'educational_transcript'
  | 'other'

export interface CitizenDocument {
  id: number
  user_id: number
  doc_type: DocType
  file_name: string
  file_size: number
  mime_type: string
  verified: boolean
  extracted_meta?: Record<string, any>
  uploaded_at: string
  file_data?: string
}

export interface CitizenApplication {
  id: number
  docket_id: string
  user_id: number
  service_slug: string
  service_name_bn: string
  service_name_en: string
  status: 'ready' | 'submitted' | 'processing' | 'approved'
  applicant_data: Record<string, any>
  documents_attached: string[]
  fee_status: string
  official_portal_url?: string
  submitted_at: string
  updated_at: string
}

export interface CitizenDeadline {
  id: string
  title_bn: string
  title_en: string
  deadline: string
  category: string
  urgency: 'high' | 'medium' | 'normal'
  description_bn: string
  description_en: string
  required_docs: string[]
  official_link?: string
}
