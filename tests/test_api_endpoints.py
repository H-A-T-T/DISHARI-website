"""
API Integration Tests: Express Backend & Database Engine
========================================================
Tests the live HTTP endpoints of the Dishari backend service.
If the backend is offline during test execution, tests gracefully skip
with diagnostic notices without failing the build.
"""

import unittest
from tests.test_helpers import ping_api, load_local_services


class TestBackendAPI(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        # Check if the backend is reachable
        cls.is_server_online = ping_api("/health") is not None
        cls.local_services = load_local_services()

    def test_health_check_endpoint(self):
        """Verify GET /api/health responds with status ok."""
        if not self.is_server_online:
            self.skipTest("Backend server is not running on port 5000 (skipped live API test)")

        res = ping_api("/health")
        self.assertIsNotNone(res)
        self.assertEqual(res.get("status"), "ok")
        self.assertIn("Dishari", res.get("service", ""))

    def test_all_services_endpoint(self):
        """Verify GET /api/services returns the full directory of services."""
        if not self.is_server_online:
            self.skipTest("Backend server is not running on port 5000")

        services = ping_api("/services")
        self.assertIsInstance(services, list)
        self.assertGreaterEqual(
            len(services),
            30,
            f"Expected at least 30 services from database, received {len(services)}",
        )

    def test_services_category_filtering(self):
        """Verify GET /api/services?category=health filters correctly."""
        if not self.is_server_online:
            self.skipTest("Backend server is not running on port 5000")

        health_services = ping_api("/services?category=health")
        self.assertIsInstance(health_services, list)
        self.assertGreater(len(health_services), 0)
        for s in health_services:
            self.assertEqual(s["category"], "health")

    def test_services_query_search(self):
        """Verify GET /api/services?q=passport matches relevant records."""
        if not self.is_server_online:
            self.skipTest("Backend server is not running on port 5000")

        results = ping_api("/services?q=passport")
        self.assertIsInstance(results, list)
        self.assertGreater(len(results), 0)
        slugs = [s["slug"] for s in results]
        self.assertIn("passport", slugs)

    def test_single_service_by_slug(self):
        """Verify GET /api/services/:slug returns detailed data."""
        if not self.is_server_online:
            self.skipTest("Backend server is not running on port 5000")

        # Test essential services
        for slug in ["passport", "driving-license", "land-mutation"]:
            service = ping_api(f"/services/{slug}")
            self.assertIsNotNone(service, f"Service {slug} returned null")
            self.assertEqual(service["slug"], slug)
            self.assertIn("required_docs", service)
            self.assertIn("steps", service)

    def test_nonexistent_service_slug(self):
        """Verify GET /api/services/:slug returns null / 404 for invalid slug."""
        if not self.is_server_online:
            self.skipTest("Backend server is not running on port 5000")

        res = ping_api("/services/non-existent-service-slug-xyz")
        # In ping_api, 404 returns None
        self.assertIsNone(res)


if __name__ == "__main__":
    unittest.main()
