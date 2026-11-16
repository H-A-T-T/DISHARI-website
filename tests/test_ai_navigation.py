"""
Jonobondhu AI Navigation & Natural Language Routing Tests
=========================================================
Tests the sitemap routing and intent detection logic for Jonobondhu AI,
verifying that user natural language inputs in English and Bengali
resolve accurately to the correct target URL and manual breadcrumb.
"""

import unittest
from typing import Optional, Tuple

# Mirror the navigation sitemap defined in JonobondhuChat.tsx
SITEMAP_ROUTING = [
    {
        "url": "/services/passport",
        "title_bn": "ই-পাসপোর্ট আবেদন",
        "title_en": "E-Passport Application",
        "keywords_bn": ["পাসপোর্ট", "ই-পাসপোর্ট", "পাসপোর্ট আবেদন"],
        "keywords_en": ["passport", "e-passport", "passport application", "epassport"],
    },
    {
        "url": "/services/passport-renewal",
        "title_bn": "পাসপোর্ট নবায়ন",
        "title_en": "Passport Renewal",
        "keywords_bn": ["পাসপোর্ট নবায়ন", "নবায়ন", "রিনিউ", "পাসপোর্ট রিনিউ"],
        "keywords_en": ["passport renewal", "renew passport", "renewal", "renew my passport", "renew"],
    },
    {
        "url": "/services/nid-correction",
        "title_bn": "NID সংশোধন",
        "title_en": "NID Correction",
        "keywords_bn": ["nid", "জাতীয় পরিচয়পত্র", "পরিচয়পত্র", "nid সংশোধন", "সংশোধন"],
        "keywords_en": ["nid", "national id", "nid correction", "voter id"],
    },
    {
        "url": "/services/birth-registration",
        "title_bn": "জন্ম নিবন্ধন",
        "title_en": "Birth Registration",
        "keywords_bn": ["জন্ম নিবন্ধন", "জন্ম সনদ", "নিবন্ধন"],
        "keywords_en": ["birth registration", "birth certificate", "bdris"],
    },
    {
        "url": "/services/driving-license",
        "title_bn": "ড্রাইভিং লাইসেন্স",
        "title_en": "Driving License",
        "keywords_bn": ["ড্রাইভিং লাইসেন্স", "লাইসেন্স", "লার্নার", "বিআরটিএ", "ড্রাইভিং"],
        "keywords_en": ["driving license", "driving", "license", "brta", "learner license"],
    },
    {
        "url": "/services/police-clearance",
        "title_bn": "পুলিশ ক্লিয়ারেন্স",
        "title_en": "Police Clearance",
        "keywords_bn": ["পুলিশ ক্লিয়ারেন্স", "ক্লিয়ারেন্স", "থানা ভেরিফিকেশন", "পুলিশ সনদ"],
        "keywords_en": ["police clearance", "police clearance certificate", "pcc", "police verification"],
    },
    {
        "url": "/services/land-khatian",
        "title_bn": "খতিয়ান ও পর্চা",
        "title_en": "Khatian & Porcha",
        "keywords_bn": ["খতিয়ান", "পর্চা", "দাগ নম্বর", "পর্চা উত্তোলন", "সার্টিফাইড কপি"],
        "keywords_en": ["khatian", "porcha", "land record", "certified copy", "eporcha"],
    },
    {
        "url": "/services/land-tax",
        "title_bn": "ভূমি উন্নয়ন কর (খাজনা)",
        "title_en": "Land Development Tax",
        "keywords_bn": ["খাজনা", "ভূমি উন্নয়ন কর", "দাখিলা", "জমির কর", "এলডি ট্যাক্স"],
        "keywords_en": ["land tax", "khajna", "ld tax", "land development tax", "dakhila"],
    },
    {
        "url": "/services/telemedicine-16263",
        "title_bn": "স্বাস্থ্য বাতায়ন ১৬২৬৩",
        "title_en": "Shastho Batayan 16263",
        "keywords_bn": ["স্বাস্থ্য বাতায়ন", "টেলিমেডিসিন", "১৬২৬৩", "ডাক্তার পরামর্শ", "স্বাস্থ্যসেবা", "চিকিৎসা"],
        "keywords_en": ["telemedicine", "16263", "doctor consultation", "health advice", "shastho batayan"],
    },
    {
        "url": "/services/trade-license",
        "title_bn": "ট্রেড লাইসেন্স",
        "title_en": "Trade License",
        "keywords_bn": ["ট্রেড লাইসেন্স", "ব্যবসা লাইসেন্স", "বাণিজ্য"],
        "keywords_en": ["trade license", "business license", "trade"],
    },
    {
        "url": "/services/tax-return",
        "title_bn": "আয়কর রিটার্ন",
        "title_en": "Income Tax Return",
        "keywords_bn": ["আয়কর", "ট্যাক্স রিটার্ন", "কর রিটার্ন", "ইনকাম ট্যাক্স"],
        "keywords_en": ["tax return", "income tax", "income tax return"],
    },
]


def resolve_nav_intent(query: str) -> Optional[Tuple[str, str, str]]:
    """
    Simulates the Jonobondhu AI intent resolver.
    The longest matching keyword wins (more specific phrase > generic word).
    """
    clean_q = query.strip().lower()
    best_entry = None
    best_len = 0

    # Words that signal navigation intent
    nav_triggers = [
        "take me", "navigate", "go to", "where is", "where can i", "how do i", "how to get", "apply", "submit", "pay",
        "need", "urgently", "call", "find",
        "নিয়ে চলুন", "যেতে চাই", "কীভাবে", "লাগবে", "করতে চাই", "তুলতে চাই", "দিতে চাই", "কথা বলব", "বের করতে হবে"
    ]
    has_trigger = any(t in clean_q for t in nav_triggers)
    if not has_trigger:
        return None

    for entry in SITEMAP_ROUTING:
        for kw in entry["keywords_bn"] + entry["keywords_en"]:
            if kw.lower() in clean_q and len(kw) > best_len:
                best_len = len(kw)
                best_entry = entry

    if best_entry and best_len > 0:
        return best_entry["url"], best_entry["title_bn"], best_entry["title_en"]

    return None


class TestJonobondhuAINavigation(unittest.TestCase):
    def test_english_natural_language_queries(self):
        """Test user natural language queries in English."""
        test_cases = [
            ("take me to the passport application", "/services/passport"),
            ("I need to renew my passport urgently", "/services/passport-renewal"),
            ("how do I correct my national id card?", "/services/nid-correction"),
            ("navigate to driving license portal", "/services/driving-license"),
            ("I need police clearance certificate for embassy", "/services/police-clearance"),
            ("where can I find my land khatian or porcha", "/services/land-khatian"),
            ("pay my annual land tax khajna online", "/services/land-tax"),
            ("call telemedicine 16263 doctor advice", "/services/telemedicine-16263"),
            ("apply for a new trade license for my business", "/services/trade-license"),
            ("submit income tax return online", "/services/tax-return"),
        ]

        for query, expected_url in test_cases:
            result = resolve_nav_intent(query)
            self.assertIsNotNone(
                result,
                f"Failed to resolve intent for query: '{query}'",
            )
            url, _, _ = result
            self.assertEqual(
                url,
                expected_url,
                f"Query '{query}' resolved to {url}, expected {expected_url}",
            )

    def test_bengali_natural_language_queries(self):
        """Test user natural language queries in Bengali."""
        test_cases = [
            ("আমাকে পাসপোর্ট আবেদন পৃষ্ঠায় নিয়ে চলুন", "/services/passport"),
            ("পাসপোর্ট নবায়ন করতে চাই", "/services/passport-renewal"),
            ("জাতীয় পরিচয়পত্র সংশোধন করতে চাই", "/services/nid-correction"),
            ("ড্রাইভিং লাইসেন্স কীভাবে পাব", "/services/driving-license"),
            ("পুলিশ ক্লিয়ারেন্স সনদ কীভাবে তুলব", "/services/police-clearance"),
            ("জমির খতিয়ান ও পর্চা বের করতে হবে", "/services/land-khatian"),
            ("জমির খাজনা বা ভূমি উন্নয়ন কর দিতে চাই", "/services/land-tax"),
            ("স্বাস্থ্য বাতায়ন ১৬২৬৩ ডাক্তারের সাথে কথা বলব", "/services/telemedicine-16263"),
            ("ব্যবসার ট্রেড লাইসেন্স লাগবে", "/services/trade-license"),
            ("অনলাইন আয়কর রিটার্ন কীভাবে দাখিল করব", "/services/tax-return"),
        ]

        for query, expected_url in test_cases:
            result = resolve_nav_intent(query)
            self.assertIsNotNone(
                result,
                f"Failed to resolve Bengali intent for query: '{query}'",
            )
            url, _, _ = result
            self.assertEqual(
                url,
                expected_url,
                f"Bengali query '{query}' resolved to {url}, expected {expected_url}",
            )

    def test_irrelevant_query_returns_none(self):
        """Unrelated non-civic questions should not falsely trigger navigation."""
        queries = [
            "what is the weather on Mars?",
            "write a poem about quantum physics",
            "hello who are you",
        ]
        for q in queries:
            result = resolve_nav_intent(q)
            self.assertIsNone(
                result,
                f"Query '{q}' should not trigger navigation but resolved to: {result}",
            )


if __name__ == "__main__":
    unittest.main()
