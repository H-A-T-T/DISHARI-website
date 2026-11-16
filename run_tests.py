#!/usr/bin/env python3
"""
Dishari (দিশারী) Automated Test Runner
======================================
Usage:
    python run_tests.py
    python run_tests.py -v
    python -m unittest discover tests

Note:
    This Python test suite is used exclusively for testing, data integrity verification,
    and QA diagnostics. It is not part of running the Next.js / Express production website.
"""

import sys
import time
import unittest
from pathlib import Path


def main():
    root_dir = Path(__file__).resolve().parent
    tests_dir = root_dir / "tests"

    print("=" * 70)
    print("🇧🇩  Dishari (দিশারী) — Automated QA & Verification Suite")
    print(f"    Python Environment: Python {sys.version.split()[0]} on {sys.platform}")
    print(f"    Test Root: {tests_dir}")
    print("=" * 70)

    loader = unittest.TestLoader()
    suite = loader.discover(start_dir=str(tests_dir), pattern="test_*.py")

    verbosity = 2 if ("-v" in sys.argv or "--verbose" in sys.argv) else 1
    runner = unittest.TextTestRunner(verbosity=verbosity)

    start_time = time.time()
    result = runner.run(suite)
    elapsed = time.time() - start_time

    print("\n" + "=" * 70)
    print(f"🏁  Results: Ran {result.testsRun} test(s) in {elapsed:.3f}s")
    if result.wasSuccessful():
        print(f"✅  ALL TESTS PASSED ({result.testsRun}/{result.testsRun})")
        if result.skipped:
            print(f"ℹ️   {len(result.skipped)} test(s) skipped (e.g. offline server)")
        print("=" * 70)
        sys.exit(0)
    else:
        print(f"❌  FAILURES: {len(result.failures)} | ERRORS: {len(result.errors)}")
        print("=" * 70)
        sys.exit(1)


if __name__ == "__main__":
    main()
