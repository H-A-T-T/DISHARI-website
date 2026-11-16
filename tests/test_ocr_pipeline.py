"""
OCR Document Intelligence & Locker Pipeline Tests
=================================================
Tests the real JavaScript AI Document OCR parsing, schema validation,
image rendering verification, and n8n workflow integrity:
1. Validates extraction schemas for NID, Admit Card, Birth Certificate, and Trade License using real generated test images.
2. Verifies that JavaScript Tesseract OCR reads actual image text instead of hardcoded fake data.
3. Inspects and audits the Structure/Capture_image_info (1).json n8n workflow definition.
"""

import io
import json
import base64
import unittest
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
from tests.test_helpers import ping_api, post_api, BASE_DIR


def generate_doc_image_base64(lines: list[str]) -> str:
    """Renders test document text into a clear JPEG image and encodes to Base64 data URL."""
    img = Image.new("RGB", (850, 320), color=(255, 255, 255))
    draw = ImageDraw.Draw(img)
    try:
        font = ImageFont.truetype("arial.ttf", 22)
    except Exception:
        font = ImageFont.load_default()

    y = 20
    for line in lines:
        draw.text((30, y), line, fill=(0, 0, 0), font=font)
        y += 40
    buf = io.BytesIO()
    img.save(buf, format="JPEG", quality=95)
    return "data:image/jpeg;base64," + base64.b64encode(buf.getvalue()).decode("utf-8")


class TestOCRPipeline(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.is_server_online = ping_api("/health") is not None
        cls.workflow_file = BASE_DIR / "Structure" / "Capture_image_info (1).json"

    def test_n8n_workflow_json_structure(self):
        """Verify Structure/Capture_image_info (1).json is valid JSON with essential nodes."""
        self.assertTrue(
            self.workflow_file.exists(),
            f"Expected {self.workflow_file} to exist in Structure directory",
        )
        with open(self.workflow_file, "r", encoding="utf-8") as f:
            workflow_data = json.load(f)

        self.assertIn("nodes", workflow_data, "n8n workflow must contain 'nodes' array")
        nodes = workflow_data["nodes"]
        self.assertGreater(len(nodes), 0, "Workflow must have at least one node")

        node_types = [node.get("type", "") for node in nodes]
        node_names = [node.get("name", "") for node in nodes]

        has_webhook = any("webhook" in t.lower() or "webhook" in n.lower() for t, n in zip(node_types, node_names))
        has_ai_or_http = any("gemini" in t.lower() or "gemini" in n.lower() or "http" in t.lower() for t, n in zip(node_types, node_names))

        self.assertTrue(has_webhook, "Workflow should contain a Webhook trigger node")
        self.assertTrue(has_ai_or_http, "Workflow should contain an AI / Gemini / HTTP processing node")

    def test_nid_document_schema(self):
        """Verify NID card extracted metadata structure and field requirements using real image OCR."""
        if not self.is_server_online:
            self.skipTest("Backend server is not running on port 5000")

        nid_image_b64 = generate_doc_image_base64([
            "Government of Bangladesh",
            "National ID Card",
            "Name: Md. Abdur Rahman",
            "ID NO: 7359128392",
            "DOB: 15/04/1998",
            "Blood Group: B+",
        ])
        payload = {
            "imageBase64": nid_image_b64,
            "docType": "nid_front",
            "fileName": "my_nid_card.jpg",
        }
        res = post_api("/documents/scan-ocr", payload)
        self.assertIsNotNone(res, "POST /api/documents/scan-ocr returned None")
        self.assertTrue(res.get("success"), "OCR endpoint must return success=True")

        doc = res.get("document", {})
        # Real OCR must extract the ID number found on the image
        self.assertIn("id_number", doc, "NID document must have id_number")
        nid_num = str(doc.get("id_number", ""))
        self.assertTrue(len(nid_num) in (10, 13, 17), f"Unexpected NID length: {len(nid_num)}")
        self.assertEqual(nid_num, "7359128392", f"Real OCR should extract 7359128392 from image, got: {nid_num}")

    def test_admit_card_schema(self):
        """Verify Admit Card / Educational Transcript extracted metadata (Roll, Reg, Board)."""
        if not self.is_server_online:
            self.skipTest("Backend server is not running on port 5000")

        admit_image_b64 = generate_doc_image_base64([
            "Board of Intermediate and Secondary Education, Dhaka",
            "Higher Secondary Certificate Examination",
            "Admit Card",
            "Name: Tanvir Hasan",
            "Roll No: 619284",
            "Reg. No: 1812948291",
        ])
        payload = {
            "imageBase64": admit_image_b64,
            "docType": "educational_transcript",
            "fileName": "hsc_admit_card_2024.jpg",
        }
        res = post_api("/documents/scan-ocr", payload)
        self.assertIsNotNone(res)
        self.assertTrue(res.get("success"))

        doc = res.get("document", {})
        self.assertIn("roll", doc, "Admit card must include candidate roll")
        self.assertEqual(str(doc.get("roll", "")), "619284", "Real OCR must match roll on image")
        self.assertEqual(doc.get("board", ""), "Dhaka", "Board should be Dhaka")

    def test_birth_certificate_schema(self):
        """Verify Birth Certificate 17-digit BRN schema."""
        if not self.is_server_online:
            self.skipTest("Backend server is not running on port 5000")

        birth_image_b64 = generate_doc_image_base64([
            "Government of Bangladesh",
            "Office of the Registrar of Birth and Death",
            "Birth Registration Certificate",
            "Birth Registration Number: 20022692015091823",
            "Date of Birth: 25/08/2002",
        ])
        payload = {
            "imageBase64": birth_image_b64,
            "docType": "birth_certificate",
            "fileName": "birth_certificate_bdris.jpg",
        }
        res = post_api("/documents/scan-ocr", payload)
        self.assertIsNotNone(res)
        self.assertTrue(res.get("success"))

        doc = res.get("document", {})
        brn = str(doc.get("id_number", ""))
        self.assertEqual(len(brn), 17, f"Digital Birth Certificate must be 17 digits, got: {len(brn)}")
        self.assertEqual(brn, "20022692015091823")

    def test_bdris_verification_record_parsing(self):
        """Verify real BDRIS birth record verification text parsing."""
        if not self.is_server_online:
            self.skipTest("Backend server is not running on port 5000")

        bdris_image_b64 = generate_doc_image_base64([
            "Office of the Registrar General, Birth and Death Registration",
            "Birth Registration Record Verification",
            "Date of Birth: 21 FEBRUARY 2005",
            "Birth Registration Number: 20058619458016610",
            "Registered Person Name: MD ASIF MAHMUD JISAN",
            "Mother's Name: SABINA YESMIN",
            "Father's Name: MD MOFIZUL ISLAM",
            "Place of Birth: SHARIATPUR",
        ])
        payload = {
            "imageBase64": bdris_image_b64,
            "docType": "nid_front",  # Test that title auto-detects birth certificate despite default
            "fileName": "birth_record.png",
        }
        res = post_api("/documents/scan-ocr", payload)
        self.assertIsNotNone(res)
        self.assertTrue(res.get("success"))

        doc = res.get("document", {})
        self.assertEqual(doc.get("id_number"), "20058619458016610")
        self.assertIn("Birth Registration", doc.get("doc_title", ""))
        self.assertIn("ASIF MAHMUD", doc.get("full_name_en", ""))
        self.assertEqual(doc.get("father_name"), "MD MOFIZUL ISLAM")
        self.assertEqual(doc.get("mother_name"), "SABINA YESMIN")

    def test_unreadable_image_does_not_invent_fake_names(self):
        """Verify unreadable or blank image returns skeleton without hardcoded fake names."""
        if not self.is_server_online:
            self.skipTest("Backend server is not running on port 5000")

        # 1x1 blank image
        blank_b64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
        payload = {
            "imageBase64": blank_b64,
            "docType": "nid_front",
            "fileName": "blank.png",
        }
        res = post_api("/documents/scan-ocr", payload)
        self.assertIsNotNone(res)
        self.assertTrue(res.get("success"))

        doc = res.get("document", {})
        # Must NOT contain hardcoded fake name "Ahmed Jamil" or "আহমেদ জামিল"
        self.assertNotEqual(doc.get("full_name_en"), "Ahmed Jamil")
        self.assertNotEqual(doc.get("full_name_bn"), "আহমেদ জামিল")

    def test_ocr_missing_payload_handling(self):
        """Verify POST /api/documents/scan-ocr gracefully rejects empty image payload."""
        if not self.is_server_online:
            self.skipTest("Backend server is not running on port 5000")

        payload = {"imageBase64": ""}
        res = post_api("/documents/scan-ocr", payload)
        self.assertIsNone(res, "Missing imageBase64 should result in 400 error")


if __name__ == "__main__":
    unittest.main()
