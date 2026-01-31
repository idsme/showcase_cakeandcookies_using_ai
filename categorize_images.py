#!/usr/bin/env python3
"""
Categorize Instagram images by theme using AI/keywords
"""

import json
import re
from collections import defaultdict

# Define keywords for each category
CATEGORY_KEYWORDS = {
    "character-cakes.html": {
        "name": "Thema & Karakter Taarten",
        "keywords": [
            "marvel", "spiderman", "frozen", "paw patrol", "pokemon", "disney",
            "nijntje", "miffy", "karakter", "character", "superhero", "princess",
            "prins", "prinses", "thema", "theme", "cartoon", "mario", "sonic",
            "mickey", "minnie", "avengers", "batman", "superman", "elsa", "anna"
        ]
    },
    "birthday-cakes.html": {
        "name": "Verjaardagstaarten",
        "keywords": [
            "verjaardag", "birthday", "happy birthday", "jarig", "jaar", "years",
            "age", "oude", "first birthday", "16", "18", "21", "30", "40", "50",
            "milestone", "mijlpaal", "gefeliciteerd", "congratulations"
        ]
    },
    "gender-reveal.html": {
        "name": "Baby & Gender Reveal",
        "keywords": [
            "gender reveal", "baby", "babyshower", "boy", "girl", "jongen",
            "meisje", "roze", "blauw", "pink", "blue", "zwanger", "pregnant",
            "geboorte", "birth", "newborn", "pasgeboren", "baby shower"
        ]
    },
    "custom-cakes.html": {
        "name": "Maatwerk Taarten",
        "keywords": [
            "maatwerk", "custom", "speciaal", "special", "uniek", "unique",
            "op maat", "personalized", "gepersonaliseerd", "bruiloft", "wedding",
            "trouw", "jubileum", "anniversary", "feest", "party", "celebration"
        ]
    }
}

def categorize_post(post_data):
    """
    Categorize a post based on caption and alt text
    Returns list of categories (can be multiple)
    """
    caption = post_data.get("caption", "").lower()
    
    # Count keyword matches for each category
    category_scores = defaultdict(int)
    
    for category_file, category_info in CATEGORY_KEYWORDS.items():
        for keyword in category_info["keywords"]:
            if keyword.lower() in caption:
                category_scores[category_file] += 1
    
    # If no keywords matched, try to infer from context
    if not category_scores:
        # Check for character/theme indicators
        if any(word in caption for word in ["taart", "cake", "ganache", "vulling", "filled"]):
            # Default to birthday cakes if nothing else matches
            category_scores["birthday-cakes.html"] = 1
    
    # Sort by score and return top categories
    sorted_categories = sorted(category_scores.items(), key=lambda x: x[1], reverse=True)
    
    # Return all categories with score > 0, or default to custom cakes
    if sorted_categories and sorted_categories[0][1] > 0:
        # Return top category, or multiple if scores are close
        top_score = sorted_categories[0][1]
        categories = [cat for cat, score in sorted_categories if score >= top_score * 0.7]
        return categories
    else:
        # Default to custom cakes
        return ["custom-cakes.html"]

def distribute_images_evenly(posts_data, target_categories):
    """
    Distribute images across categories, ensuring each category gets images
    """
    categorized = {cat: [] for cat in target_categories.keys()}
    
    # First pass: assign based on keywords
    for post in posts_data:
        categories = categorize_post(post)
        # Add to primary category
        primary_category = categories[0]
        categorized[primary_category].append(post)
    
    # Check distribution
    print("\nInitial distribution:")
    for cat, posts in categorized.items():
        print(f"  {target_categories[cat]['name']}: {len(posts)} images")
    
    # Ensure minimum images per category
    min_images = 20
    total_posts = len(posts_data)
    
    # Redistribute if needed
    for cat, posts in categorized.items():
        if len(posts) < min_images:
            print(f"\n{target_categories[cat]['name']} has only {len(posts)} images, redistributing...")
            # Find categories with excess images
            excess_categories = [c for c in categorized.keys() if len(categorized[c]) > min_images]
            
            if excess_categories:
                # Take images from categories with most images
                while len(categorized[cat]) < min_images and excess_categories:
                    # Find category with most images
                    donor_cat = max(excess_categories, key=lambda c: len(categorized[c]))
                    
                    # Move one image
                    if categorized[donor_cat]:
                        post = categorized[donor_cat].pop()
                        categorized[cat].append(post)
                    else:
                        excess_categories.remove(donor_cat)
    
    print("\nFinal distribution:")
    for cat, posts in categorized.items():
        print(f"  {target_categories[cat]['name']}: {len(posts)} images")
    
    return categorized

def main():
    print("=" * 70)
    print("Categorizing Instagram Images")
    print("=" * 70)
    
    # Load Instagram posts
    with open('instagram_posts_full.json', 'r', encoding='utf-8') as f:
        posts_data = json.load(f)
    
    print(f"\nTotal posts to categorize: {len(posts_data)}")
    
    # Categorize images
    categorized = distribute_images_evenly(posts_data, CATEGORY_KEYWORDS)
    
    # Create categories.json structure
    categories_output = {}
    
    for category_file, category_info in CATEGORY_KEYWORDS.items():
        posts = categorized[category_file]
        
        # Sort by date (newest first)
        posts.sort(key=lambda p: p.get("date", ""), reverse=True)
        
        categories_output[category_file] = {
            "title": category_info["name"],
            "subtitle": get_subtitle(category_file),
            "description": get_description(category_file),
            "posts": posts  # Include full post data with likes
        }
    
    # Save categories
    with open('categories_full.json', 'w', encoding='utf-8') as f:
        json.dump(categories_output, f, indent=2, ensure_ascii=False)
    
    print(f"\n✓ Saved categorized images to categories_full.json")
    
    # Also create a simpler version with just image URLs for backwards compatibility
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
    
    print(f"✓ Saved simple categories to categories.json")
    
    print("\n" + "=" * 70)
    print("✓ Categorization complete!")
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
