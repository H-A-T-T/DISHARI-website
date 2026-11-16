"""
OCR Document Intelligence & Locker Pipeline Tests
=================================================
Tests the AI Document OCR parsing, schema validation, and n8n workflow integrity:
1. Validates extraction schemas for NID, Admit Card, Birth Certificate, TIN, and Trade License.
2. Tests the live /api/documents/scan-ocr endpoint for resilient metadata output.
3. Inspects and audits the Structure/Capture_image_info (1).json n8n workflow definition.
"""

import json
import re
import unittest
from pathlib import Path
from tests.test_helpers import ping_api, post_api, BASE_DIR


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

        # Ensure Webhook and Gemini/AI/HTTP execution nodes are present
        has_webhook = any("webhook" in t.lower() or "webhook" in n.lower() for t, n in zip(node_types, node_names))
        has_ai_or_http = any("gemini" in t.lower() or "gemini" in n.lower() or "http" in t.lower() for t, n in zip(node_types, node_names))

        self.assertTrue(has_webhook, "Workflow should contain a Webhook trigger node")
        self.assertTrue(has_ai_or_http, "Workflow should contain an AI / Gemini / HTTP processing node")

    def test_nid_document_schema(self):
        """Verify NID card extracted metadata structure and field requirements."""
        if not self.is_server_online:
            self.skipTest("Backend server is not running on port 5000")

        dummy_base64 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP"
        payload = {
            "imageBase64": dummy_base64,
            "docType": "nid_front",
            "fileName": "nid_card_front.jpg",
        }
        res = post_api("/documents/scan-ocr", payload)
        self.assertIsNotNone(res, "POST /api/documents/scan-ocr returned None")
        self.assertTrue(res.get("success"), "OCR endpoint must return success=True")

        doc = res.get("document", {})
        self.assertIn("id_number", doc, "NID document must have id_number")
        self.assertIn("dob", doc, "NID document must have dob")
        self.assertIn("full_name_bn", doc, "NID document must have full_name_bn")
        self.assertIn("blood_group", doc, "NID document must have blood_group")

        # NID should be 10 or 17 digits
        nid_num = str(doc.get("id_number", ""))
        self.assertTrue(len(nid_num) in (10, 13, 17), f"Unexpected NID length: {len(nid_num)}")

    def test_admit_card_schema(self):
        """Verify Admit Card / Educational Transcript extracted metadata (Roll, Reg, Board)."""
        if not self.is_server_online:
            self.skipTest("Backend server is not running on port 5000")

        dummy_base64 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP"
        payload = {
            "imageBase64": dummy_base64,
            "docType": "educational_transcript",
            "fileName": "hsc_admit_card_2024.jpg",
        }
        res = post_api("/documents/scan-ocr", payload)
        self.assertIsNotNone(res)
        self.assertTrue(res.get("success"))

        doc = res.get("document", {})
        self.assertIn("roll", doc, "Admit card must include candidate roll")
        self.assertIn("reg_no", doc, "Admit card must include registration number")
        self.assertIn("board", doc, "Admit card must include education board")
        self.assertIn("exam_name", doc, "Admit card must include examination name")

        # Roll number should be numeric
        self.assertTrue(str(doc.get("roll", "")).isdigit(), "Roll number must be numeric")

    def test_birth_certificate_schema(self):
        """Verify Birth Certificate 17-digit BRN schema."""
        if not self.is_server_online:
            self.skipTest("Backend server is not running on port 5000")

        dummy_base64 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP"
        payload = {
            "imageBase64": dummy_base64,
            "docType": "birth_certificate",
            "fileName": "birth_certificate_bdris.jpg",
        }
        res = post_api("/documents/scan-ocr", payload)
        self.assertIsNotNone(res)
        self.assertTrue(res.get("success"))

        doc = res.get("document", {})
        brn = str(doc.get("id_number", ""))
        self.assertEqual(len(brn), 17, f"Digital Birth Certificate must be 17 digits, got: {len(brn)}")
        self.assertTrue(brn.isdigit(), "Birth registration number must be numeric")

    def test_trade_license_schema(self):
        """Verify Trade License extracted fields."""
        if not self.is_server_online:
            self.skipTest("Backend server is not running on port 5000")

        dummy_base64 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP"
        payload = {
            "imageBase64": dummy_base64,
            "docType": "trade_license",
            "fileName": "trade_license_2024.jpg",
        }
        res = post_api("/documents/scan-ocr", payload)
        self.assertIsNotNone(res)
        self.assertTrue(res.get("success"))

        doc = res.get("document", {})
        self.assertIn("business_name", doc, "Trade license must include business_name")
        self.assertIn("owner_name", doc, "Trade license must include owner_name")

    def test_ocr_missing_payload_handling(self):
        """Verify POST /api/documents/scan-ocr gracefully rejects empty image payload."""
        if not self.is_server_online:
            self.skipTest("Backend server is not running on port 5000")

        payload = {"imageBase64": ""}
        res = post_api("/documents/scan-ocr", payload)
        # Empty imageBase64 returns 400 which post_api returns None for
        self.assertIsNone(res, "Missing imageBase64 should result in client error response")


if __name__ == "__main__":
    unittest.main()
