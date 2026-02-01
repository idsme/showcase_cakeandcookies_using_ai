#!/usr/bin/env python3
"""
Re-categorize all 228 cake images using improved logic with smart heuristics:
- Unclear theme → Custom Cakes
- Blue/pink + boy/girl visible → Gender Reveal
- Cartoon characters → Character Cakes
- Not a cake or serious/elegant looking → Custom Cakes (Maatwerk)
"""

import json
import os
import re
from collections import defaultdict

# Character keywords - specific characters
CHARACTER_KEYWORDS = [
    'paw patrol', 'pokemon', 'pikachu', 'frozen', 'elsa', 'anna', 'olaf',
    'nijntje', 'miffy', 'mickey', 'minnie', 'disney', 'marvel', 'spiderman',
    'spider-man', 'hulk', 'iron man', 'captain america', 'avengers',
    'batman', 'superman', 'dc', 'sonic', 'mario', 'luigi',
    'peppa', 'spongebob', 'dora', 'barbie', 'princess', 'prins', 'prinses',
    'hello kitty', 'my little pony', 'cars', 'lightning mcqueen',
    'toy story', 'woody', 'buzz', 'nemo', 'finding nemo', 'dory',
    'moana', 'rapunzel', 'belle', 'ariel', 'cinderella', 'snow white',
    'mulan', 'jasmine', 'pocahontas', 'tiana',
    'thomas', 'thomas de trein', 'thomas train',
    'winnie', 'pooh', 'tigger', 'eeyore',
    'stitch', 'lilo', 'simba', 'lion king',
    'encanto', 'mirabel', 'isabela', 'luisa',
    'karakter', 'character', 'cartoon', 'thema'
]

# Gender reveal keywords
GENDER_REVEAL_KEYWORDS = [
    'gender reveal', 'boy or girl', 'jongen of meisje',
    'baby shower', 'babyshower', 'baby', 'geboorte',
    'zwanger', 'pregnant', 'roze', 'blauw',
    'pink', 'blue', 'jongen', 'meisje',
    'boy', 'girl', 'oh baby', 'newborn',
    'pasgeboren', 'welkom', 'welcome baby'
]

# Birthday explicit keywords (but NOT character-related)
BIRTHDAY_KEYWORDS = [
    'verjaardag', 'birthday', 'happy birthday', 'jarig',
    'gefeliciteerd', 'congratulations', 'jaar',
    'years', 'age', 'oude', 'first birthday'
]

# Milestone/number keywords
MILESTONE_KEYWORDS = [
    r'\b1\b', r'\b2\b', r'\b3\b', r'\b4\b', r'\b5\b',
    r'\b6\b', r'\b7\b', r'\b8\b', r'\b9\b', r'\b10\b',
    r'\b16\b', r'\b18\b', r'\b21\b', r'\b25\b',
    r'\b30\b', r'\b40\b', r'\b50\b', r'\b60\b',
    r'\b70\b', r'\b80\b', r'\b90\b', r'\b100\b',
    'eerste', 'first', 'tweede', 'derde',
    'milestone', 'mijlpaal', 'sweet sixteen'
]

# Custom/elegant keywords
CUSTOM_KEYWORDS = [
    'bruiloft', 'wedding', 'trouw', 'huwelijk',
    'jubileum', 'anniversary', 'feest', 'party',
    'celebration', 'viering', 'elegant', 'luxury',
    'bloemen', 'flowers', 'roos', 'rose',
    'goud', 'gold', 'zilver', 'silver',
    'maatwerk', 'custom', 'op maat', 'special',
    'speciaal', 'uniek', 'unique', 'gepersonaliseerd'
]

def categorize_post(post):
    """
    Categorize a post based on caption using improved rules:
    1. Character cakes = identifiable characters
    2. Gender reveal = baby + gender theme
    3. Birthday = birthday mentions + age/milestone (NO characters)
    4. Custom = everything else (unclear, elegant, wedding, etc.)
    """
    caption = post.get("caption", "").lower()
    
    # Rule 1: Check for cartoon characters - highest priority
    for keyword in CHARACTER_KEYWORDS:
        if keyword.lower() in caption:
            return "character"
    
    # Rule 2: Check for gender reveal indicators
    gender_reveal_score = 0
    for keyword in GENDER_REVEAL_KEYWORDS:
        if keyword.lower() in caption:
            gender_reveal_score += 1
    
    # Need at least 2 gender reveal keywords OR explicit "gender reveal"
    if gender_reveal_score >= 2 or 'gender reveal' in caption or 'babyshower' in caption:
        return "gender_reveal"
    
    # Rule 3: Check for birthday with milestone/age (but NO characters)
    has_birthday = any(keyword.lower() in caption for keyword in BIRTHDAY_KEYWORDS)
    has_milestone = any(re.search(pattern, caption) for pattern in MILESTONE_KEYWORDS)
    
    if has_birthday or has_milestone:
        # Only categorize as birthday if it's not a character cake
        # and it has clear birthday indicators
        if has_birthday:
            return "birthday"
        elif has_milestone and any(word in caption for word in ['jaar', 'year', 'verjaardag', 'birthday', 'gefeliciteerd']):
            return "birthday"
    
    # Rule 4: Everything else goes to custom (unclear themes, elegant, weddings, etc.)
    return "custom"

def main():
    print("=" * 70)
    print("Re-categorizing All Cake Images with Smart Heuristics")
    print("=" * 70)
    
    # Load full post data
    posts_file = 'instagram_posts_full.json'
    if not os.path.exists(posts_file):
        print(f"Error: {posts_file} not found!")
        return
    
    with open(posts_file, 'r', encoding='utf-8') as f:
        all_posts = json.load(f)
    
    print(f"\nTotal images to categorize: {len(all_posts)}")
    print("\nCategorizing based on caption analysis...\n")
    
    # Categorize each image
    category_mapping = {
        "character": "character-cakes.html",
        "birthday": "birthday-cakes.html",
        "gender_reveal": "gender-reveal.html",
        "custom": "custom-cakes.html"
    }
    
    categorized = defaultdict(list)
    
    for i, post in enumerate(all_posts, 1):
        caption = post.get('caption', '')
        local_filename = post.get('local_filename', 'unknown')
        
        category = categorize_post(post)
        category_file = category_mapping[category]
        
        categorized[category_file].append(post)
        
        if i % 20 == 0:
            print(f"Processed {i}/{len(all_posts)} images...")
    
    # Print distribution
    print("\n" + "=" * 70)
    print("Distribution Results:")
    print("=" * 70)
    
    category_names = {
        "character-cakes.html": "Thema & Karakter Taarten",
        "birthday-cakes.html": "Verjaardagstaarten",
        "gender-reveal.html": "Baby & Gender Reveal",
        "custom-cakes.html": "Maatwerk Taarten"
    }
    
    for category_file in category_mapping.values():
        count = len(categorized[category_file])
        name = category_names[category_file]
        print(f"{name}: {count} images")
    
    total = sum(len(posts) for posts in categorized.values())
    print(f"\nTotal: {total} images")
    
    # Show some examples from each category
    print("\n" + "=" * 70)
    print("Sample categorizations:")
    print("=" * 70)
    
    for category_file, posts in categorized.items():
        if posts:
            name = category_names[category_file]
            print(f"\n{name} (showing first 3):")
            for post in posts[:3]:
                caption = post.get('caption', '')[:80]
                print(f"  - {caption}...")
    
    # Create output structure
    categories_output = {}
    
    for category_file, posts in categorized.items():
        # Sort by date (newest first)
        posts.sort(key=lambda p: p.get("date", ""), reverse=True)
        
        categories_output[category_file] = {
            "title": category_names[category_file],
            "subtitle": get_subtitle(category_file),
            "description": get_description(category_file),
            "posts": posts
        }
    
    # Save full categories
    with open('categories_full.json', 'w', encoding='utf-8') as f:
        json.dump(categories_output, f, indent=2, ensure_ascii=False)
    
    print(f"\n✓ Saved to categories_full.json")
    
    # Save simple version
    categories_simple = {}
    for category_file, data in categories_output.items():
        categories_simple[category_file] = {
            "title": data["title"],
            "subtitle": data["subtitle"],
            "description": data["description"],
            "images": [p["image_url"] for p in data["posts"]]
        }
    
    with open('categories.json', 'w', encoding='utf-8') as f:
        json.dump(categories_simple, f, indent=2, ensure_ascii=False)
    
    print(f"✓ Saved to categories.json")
    
    print("\n" + "=" * 70)
    print("✓ Re-categorization complete!")
    print("=" * 70)

def get_subtitle(category_file):
    """Get subtitle for each category"""
    subtitles = {
        "character-cakes.html": "Breng hun favoriete karakters tot leven",
        "birthday-cakes.html": "Maak elke verjaardag onvergetelijk",
        "gender-reveal.html": "Vier het grote nieuws in stijl",
        "custom-cakes.html": "Unieke creaties voor jouw speciale moment"
    }
    return subtitles.get(category_file, "")

def get_description(category_file):
    """Get description for each category"""
    descriptions = {
        "character-cakes.html": "Van Paw Patrol tot Pokemon, van Nijntje tot Frozen—wij maken droomtaarten met de meest geliefde karakters en thema's",
        "birthday-cakes.html": "Prachtige verjaardagstaarten voor elk leeftijd, van eerste verjaardag tot mijlpalen",
        "gender-reveal.html": "Onvergetelijke babyshower en gender reveal taarten om de mooiste momenten te markeren",
        "custom-cakes.html": "Volledig gepersonaliseerde taarten op maat—vertel ons jouw idee en wij maken het waar"
    }
    return descriptions.get(category_file, "")

if __name__ == "__main__":
    main()
