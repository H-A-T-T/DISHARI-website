"""
Smart Bag Checker & Document Packing Tests
==========================================
Tests the document checklist and readiness computation
matching the TypeScript logic in SmartBagChecker.tsx.
"""

import unittest
from typing import List, Dict, Any

COPY_TYPE_LABELS = {
    "original": {"bn": "মূল কপি প্রয়োজন", "en": "Original Required"},
    "photocopy": {"bn": "সত্যায়িত ফটোকপি", "en": "Attested Photocopy"},
    "online": {"bn": "অনলাইন প্রিন্ট কপি", "en": "Digital / Online Copy"},
    "online_print": {"bn": "অনলাইন প্রিন্ট কপি", "en": "Digital / Online Printout"},
    "both": {"bn": "মূল + ফটোকপি উভয়ই", "en": "Both Original & Copy"},
}


def calculate_bag_readiness(required_docs: List[Dict[str, Any]], checked_indices: List[int]) -> int:
    """Computes completion percentage matching SmartBagChecker.tsx."""
    if not required_docs:
        return 100
    checked_count = sum(1 for idx in checked_indices if 0 <= idx < len(required_docs))
    return round((checked_count / len(required_docs)) * 100)


class TestSmartBagChecker(unittest.TestCase):
    def setUp(self):
        self.sample_docs = [
            {"name_bn": "জাতীয় পরিচয়পত্র (NID)", "copy_type": "both"},
            {"name_bn": "পাসপোর্ট সাইজ ছবি", "copy_type": "original"},
            {"name_bn": "নাগরিক সনদপত্র", "copy_type": "original"},
            {"name_bn": "অনলাইন আবেদন ফরম", "copy_type": "online_print"},
        ]

    def test_copy_type_labels_complete(self):
        """All supported copy types must have valid bilingual labels."""
        for ctype in ["original", "photocopy", "online", "online_print", "both"]:
            self.assertIn(ctype, COPY_TYPE_LABELS)
            self.assertIn("bn", COPY_TYPE_LABELS[ctype])
            self.assertIn("en", COPY_TYPE_LABELS[ctype])

    def test_readiness_calculation_empty(self):
        """Zero items packed equals 0% readiness."""
        percent = calculate_bag_readiness(self.sample_docs, [])
        self.assertEqual(percent, 0)

    def test_readiness_calculation_partial(self):
        """Two out of four packed equals 50% readiness."""
        percent = calculate_bag_readiness(self.sample_docs, [0, 1])
        self.assertEqual(percent, 50)

    def test_readiness_calculation_full(self):
        """All items packed equals 100% readiness."""
        percent = calculate_bag_readiness(self.sample_docs, [0, 1, 2, 3])
        self.assertEqual(percent, 100)

    def test_readiness_calculation_with_invalid_indices(self):
        """Out of bounds indices should not artificially inflate readiness."""
        percent = calculate_bag_readiness(self.sample_docs, [0, 99, 100])
        self.assertEqual(percent, 25)  # only index 0 is valid (1 out of 4)


if __name__ == "__main__":
    unittest.main()
