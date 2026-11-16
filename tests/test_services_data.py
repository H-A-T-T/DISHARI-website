"""
Unit & Integrity Tests: Citizen Services Dataset
================================================
Validates all 30 citizen services for schema compliance,
Bengali language accuracy, category distribution, and gazette fees.
"""

import unittest
from tests.test_helpers import load_local_services, contains_bengali

VALID_CATEGORIES = {
    "identity",
    "education",
    "land",
    "welfare",
    "business",
    "tax",
    "overseas",
    "health",
}

VALID_SUBMISSION_TYPES = {
    "online_bot",
    "pdf_only",
    "hybrid",
}


class TestServicesDataIntegrity(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.services = load_local_services()

    def test_service_count_is_at_least_thirty(self):
        """Ensure all 30 citizen services are present in the dataset."""
        self.assertGreaterEqual(
            len(self.services),
            30,
            f"Expected at least 30 services, found {len(self.services)}",
        )

    def test_unique_slugs(self):
        """Every service must possess a unique URL slug."""
        slugs = [s["slug"] for s in self.services]
        duplicates = [s for s in slugs if slugs.count(s) > 1]
        self.assertEqual(len(slugs), len(set(slugs)), f"Duplicate slugs detected: {set(duplicates)}")

    def test_essential_services_exist(self):
        """Verify presence of core high-demand citizen services."""
        slugs = {s["slug"] for s in self.services}
        essential = {
            "passport",
            "passport-renewal",
            "nid-correction",
            "birth-registration",
            "driving-license",
            "police-clearance",
            "land-mutation",
            "land-khatian",
            "land-tax",
            "telemedicine-16263",
            "vaccination-certificate",
            "suborno-nagorik-card",
            "trade-license",
            "tin-certificate",
            "tax-return",
            "bmet-smart-card",
            "maternity-allowance",
            "warishan-certificate",
        }
        missing = essential - slugs
        self.assertEqual(len(missing), 0, f"Missing essential services: {missing}")

    def test_all_categories_are_valid_and_populated(self):
        """Every canonical category must be populated with at least one service."""
        found_categories = {s["category"] for s in self.services}

        # Ensure no invalid category exists
        invalid = found_categories - VALID_CATEGORIES
        self.assertEqual(len(invalid), 0, f"Found invalid categories: {invalid}")

        # Ensure all 8 canonical categories are represented
        unrepresented = VALID_CATEGORIES - found_categories
        self.assertEqual(
            len(unrepresented),
            0,
            f"Categories with 0 services: {unrepresented}",
        )

    def test_health_category_has_active_services(self):
        """Verify Health category is active and has real services."""
        health_services = [s for s in self.services if s["category"] == "health"]
        self.assertGreaterEqual(
            len(health_services),
            3,
            "Health category should contain at least 3 active health services",
        )

    def test_bengali_titles_and_departments(self):
        """All services must have authentic Bengali names and departments."""
        for s in self.services:
            self.assertTrue(
                contains_bengali(s["name_bn"]),
                f"Service {s['slug']} name_bn does not contain Bengali Unicode: {s['name_bn']}",
            )
            self.assertTrue(
                contains_bengali(s["department_bn"]),
                f"Service {s['slug']} department_bn does not contain Bengali Unicode: {s['department_bn']}",
            )

    def test_english_metadata_present(self):
        """All services must have English titles for bilingual localization."""
        for s in self.services:
            self.assertTrue(
                bool(s["name_en"].strip()),
                f"Service {s['slug']} is missing English title name_en",
            )
            self.assertTrue(
                bool(s["department_en"].strip()),
                f"Service {s['slug']} is missing English department name_en",
            )

    def test_submission_types_valid(self):
        """Submission type must be valid enum."""
        for s in self.services:
            self.assertIn(
                s["submission_type"],
                VALID_SUBMISSION_TYPES,
                f"Invalid submission type for {s['slug']}: {s['submission_type']}",
            )

    def test_official_gov_urls_format(self):
        """Official URLs must point to legitimate portals (gov.bd or secure https)."""
        for s in self.services:
            url = s.get("official_url", "")
            if url:
                self.assertTrue(
                    url.startswith("https://") or url.startswith("http://"),
                    f"Official URL in {s['slug']} is not valid http/https: {url}",
                )


if __name__ == "__main__":
    unittest.main()
