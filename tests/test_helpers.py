"""
Test Helper Utilities for Dishari QA Engine
"""

import json
import re
import urllib.request
import urllib.error
from pathlib import Path
from typing import Dict, List, Any, Optional

BASE_DIR = Path(__file__).resolve().parent.parent
API_URL = "http://localhost:5000/api"

# Unicode range for Bengali characters: U+0980 to U+09FF
BENGALI_UNICODE_PATTERN = re.compile(r"[\u0980-\u09FF]")

BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"]
EN_DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
BN_TO_EN_MAP = dict(zip(BN_DIGITS, EN_DIGITS))
EN_TO_BN_MAP = dict(zip(EN_DIGITS, BN_DIGITS))


def to_bangla_digits(number: int | str) -> str:
    """Converts standard digits to Bengali numerals."""
    return "".join(EN_TO_BN_MAP.get(c, c) for c in str(number))


def to_english_digits(text: str) -> str:
    """Converts Bengali numerals to standard English digits."""
    return "".join(BN_TO_EN_MAP.get(c, c) for c in str(text))


def contains_bengali(text: str) -> bool:
    """Returns True if the string contains any Bengali Unicode character."""
    return bool(BENGALI_UNICODE_PATTERN.search(text))


def load_local_services() -> List[Dict[str, Any]]:
    """
    Parses services data directly from server/src/seed.ts or web/src/lib/default-services.ts
    without requiring a running database server.
    """
    seed_path = BASE_DIR / "server" / "src" / "seed.ts"
    if not seed_path.exists():
        fallback_path = BASE_DIR / "web" / "src" / "lib" / "default-services.ts"
        if fallback_path.exists():
            seed_path = fallback_path
        else:
            raise FileNotFoundError("Could not locate services dataset file")

    content = seed_path.read_text(encoding="utf-8")

    # Match slug definitions and extract basic metadata using robust regex
    service_blocks = re.split(r"\n\s*\{\s*\n\s*slug:\s*'", content)[1:]
    services = []

    for block in service_blocks:
        slug_match = re.search(r"^([^']+)'", block)
        name_bn_match = re.search(r"name_bn:\s*'([^']+)'", block)
        name_en_match = re.search(r"name_en:\s*'([^']+)'", block)
        category_match = re.search(r"category:\s*'([^']+)'", block)
        dept_bn_match = re.search(r"department_bn:\s*'([^']+)'", block)
        dept_en_match = re.search(r"department_en:\s*'([^']+)'", block)
        sub_type_match = re.search(r"submission_type:\s*'([^']+)'", block)
        fee_match = re.search(r"fee:\s*'([^']+)'", block)
        proc_time_match = re.search(r"processing_time_bn:\s*'([^']+)'", block)
        url_match = re.search(r"official_url:\s*'([^']+)'", block)
        apply_loc_match = re.search(r"apply_location_bn:\s*'([^']+)'", block)

        if slug_match and name_bn_match and category_match:
            services.append({
                "slug": slug_match.group(1),
                "name_bn": name_bn_match.group(1),
                "name_en": name_en_match.group(1) if name_en_match else "",
                "category": category_match.group(1),
                "department_bn": dept_bn_match.group(1) if dept_bn_match else "",
                "department_en": dept_en_match.group(1) if dept_en_match else "",
                "submission_type": sub_type_match.group(1) if sub_type_match else "hybrid",
                "fee": fee_match.group(1) if fee_match else "",
                "processing_time_bn": proc_time_match.group(1) if proc_time_match else "",
                "official_url": url_match.group(1) if url_match else "",
                "apply_location_bn": apply_loc_match.group(1) if apply_loc_match else "",
            })

    return services


def ping_api(endpoint: str, timeout: float = 2.0) -> Optional[Dict[str, Any] | List[Any]]:
    """
    Attempts to fetch JSON from the Dishari backend API.
    Returns None if server is not currently running.
    """
    url = f"{API_URL}{endpoint}"
    req = urllib.request.Request(url, headers={"User-Agent": "Dishari-Python-Test-Suite/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as response:
            if response.status == 200:
                data = response.read().decode("utf-8")
                return json.loads(data)
    except (urllib.error.URLError, TimeoutError, ConnectionRefusedError, OSError):
        return None
    return None
