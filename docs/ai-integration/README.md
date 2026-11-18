# Dishari AI Integration Guide & System Specification

## 1. Overview & System Architecture
- Purpose & Vision (Civic AI for Web & Android)
- Architecture Diagram (Web/Android -> Express Gateway -> OCR/NLP Engine / n8n / Gemini)
- Client-Side vs Server-Side vs Cloud LLM Division

## 2. Core AI Capabilities & Modules
### 2.1 Optical Character Recognition (OCR) Pipeline
- Supported Document Types (Smart NID, Birth Cert, Driving License)
- Preprocessing Pipeline (Grayscale, Thresholding, Deskew via Sharp/OpenCV)
- Bilingual Extraction & Digit Normalization (Bangla <-> English)
- Output Schema & Confidence Scoring

### 2.2 Facial Analysis & Citizen Verification
- Purpose & Use Case (e-KYC Liveness / Verification / Accessibility)
- Supported Classes & Confidence Thresholds
- Camera Capture Guidelines for Android & Web (Lighting, framing, angle)
- Biometric Data & Privacy Policy (Zero-retention of raw biometric faces)

### 2.3 Jonobondhu AI (Conversational & Voice Engine)
- Bengali NLP & Dialect Normalization
- Sitemap Intent Mapping & Voice Navigation
- Speech-to-Text (STT) & Audio Specs

## 3. n8n Workflow Automation
- Webhook Architecture & Authentication
- Workflow Catalog & Export Standards (Directory: `/Structure/workflows/`)
- Multimodal Fallback Pipelines (Gemini Vision integration)
- Error Handling & Dead-Letter Retries

## 4. Developer API Reference
- Base URLs & Authentication Headers
- Endpoint Specs (POST /ocr, POST /face, POST /nlp)
- Request & Response JSON Payloads (Full schemas)
- Standard Error Codes & Guidance Messages (in Bangla & English)

## 5. Client Integration Guidelines
- Web (Next.js / TypeScript fetch & file upload)
- Android (CameraX, Retrofit, Bitmap compression before upload)
- Human-in-the-Loop UI pattern (Verification/Editing step after scan)

## 6. Evaluation, Performance & SLAs
- Target Latency & Accuracy Benchmarks
- Automated QA Test Suite (`tests/test_ocr_pipeline.py`, `tests/test_ai_navigation.py`)

## 7. Security, PII & Ethical Guardrails
- Disclaimers on Facial Analysis & AI hallucination
- Temporary File Lifecycle (TTL)
- Citizen PII Protection
eta amr AI dise
