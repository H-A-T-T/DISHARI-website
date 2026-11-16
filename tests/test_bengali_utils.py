"""
Bengali Localization & Numeral Formatting Tests
===============================================
Tests digit conversion, currency symbols, and string utilities
mirroring the frontend helper functions in TypeScript.
"""

import unittest
from tests.test_helpers import (
    to_bangla_digits,
    to_english_digits,
    contains_bengali,
    BN_DIGITS,
    EN_DIGITS,
)


def format_fee_display(fee_str: str) -> str:
    """Mirrors the TypeScript formatFee function in web/src/lib/utils.ts."""
    if not fee_str or fee_str.strip() in ("0", "free", "বিনামূল্যে"):
        return "বিনামূল্যে"
    return f"৳{fee_str.strip()}"


class TestBengaliUtils(unittest.TestCase):
    def test_digit_conversion_mappings(self):
        """Verify 1-to-1 mapping for all 10 digits."""
        for en, bn in zip(EN_DIGITS, BN_DIGITS):
            self.assertEqual(to_bangla_digits(en), bn)
            self.assertEqual(to_english_digits(bn), en)

    def test_multi_digit_number_conversion(self):
        """Test conversion of larger numbers and phone numbers."""
        test_pairs = [
            (2026, "২০২৬"),
            (16263, "১৬২৬৩"),
            (4025, "৪০২৫"),
            ("01712345678", "০১৭১২৩৪৫৬৭৮"),
            ("100-300", "১০০-৩০০"),
        ]
        for en_val, expected_bn in test_pairs:
            self.assertEqual(to_bangla_digits(en_val), expected_bn)
            self.assertEqual(to_english_digits(expected_bn), str(en_val))

    def test_format_fee_display(self):
        """Verify currency symbol prefixing and free allowance display."""
        self.assertEqual(format_fee_display("বিনামূল্যে"), "বিনামূল্যে")
        self.assertEqual(format_fee_display("0"), "বিনামূল্যে")
        self.assertEqual(format_fee_display("free"), "বিনামূল্যে")
        self.assertEqual(format_fee_display("৪,০২৫"), "৳৪,০২৫")
        self.assertEqual(format_fee_display("৫০০"), "৳৫০০")
        self.assertEqual(format_fee_display("১,১৫০"), "৳১,১৫০")

    def test_bengali_unicode_detection(self):
        """Verify accurate identification of Bengali scripts."""
        self.assertTrue(contains_bengali("দিশারী"))
        self.assertTrue(contains_bengali("জনবন্ধু এআই"))
        self.assertTrue(contains_bengali("পাসপোর্ট ফি ৪০২৫ টাকা"))
        self.assertFalse(contains_bengali("Dishari Government Assistant"))
        self.assertFalse(contains_bengali("1234567890"))
        self.assertFalse(contains_bengali("https://epassport.gov.bd"))


if __name__ == "__main__":
    unittest.main()
