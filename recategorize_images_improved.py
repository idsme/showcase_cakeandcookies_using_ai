#!/usr/bin/env python3
"""
Re-categorize all 228 cake images using improved logic:
- Unclear theme → Custom Cakes
- Blue/pink + boy/girl visible → Gender Reveal
- Cartoon characters → Birthday Cake
- Not a cake or serious/elegant looking → Custom Cakes (Maatwerk)
"""

import json
import os
from pathlib import Path
import anthropic
import base64
from collections import defaultdict

# Initialize Anthropic client
client = anthropic.Anthropic()

CATEGORY_MAPPING = {
    "character": "character-cakes.html",
    "birthday": "birthday-cakes.html", 
    "gender_reveal": "gender-reveal.html",
    "custom": "custom-cakes.html"
}

def encode_image(image_path):
    """Encode image to base64"""
    with open(image_path, 'rb') as f:
        return base64.standard_b64encode(f.read()).decode('utf-8')

def categorize_image_with_ai(image_path, caption=""):
    """Use Claude to categorize an image based on visual analysis"""
    
    # Get file extension
    ext = Path(image_path).suffix.lower()
    media_type_map = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.webp': 'image/webp'
    }
    media_type = media_type_map.get(ext, 'image/jpeg')
    
    try:
        image_data = encode_image(image_path)
        
        prompt = f"""Analyze this cake image and categorize it into ONE of these categories:

**Categorization Rules:**
1. **character** - Image contains identifiable cartoon characters (Paw Patrol, Pokemon, Frozen, Nijntje, Disney characters, etc.)
2. **gender_reveal** - Cake has blue AND pink colors AND shows boy/girl theme OR explicit gender reveal purpose
3. **birthday** - Standard birthday cake with numbers, candles, or "Happy Birthday" text. NO cartoon characters (those go to character category)
4. **custom** - Everything else, including:
   - Unclear theme
   - Not clearly a cake
   - Serious/elegant looking cakes
   - Wedding or anniversary cakes
   - Minimalist designs
   - Abstract designs

{f'Additional context from Instagram caption: {caption}' if caption else ''}

Return ONLY the category name: character, birthday, gender_reveal, or custom

Category:"""

        response = client.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=50,
            messages=[{
                "role": "user",
                "content": [
                    {
                        "type": "image",
                        "source": {
                            "type": "base64",
                            "media_type": media_type,
                            "data": image_data
                        }
                    },
                    {
                        "type": "text",
                        "text": prompt
                    }
                ]
            }]
        )
        
        category = response.content[0].text.strip().lower()
        
        # Validate category
        if category not in CATEGORY_MAPPING:
            print(f"  ⚠ Invalid category '{category}', defaulting to custom")
            return "custom"
        
        return category
        
    except Exception as e:
        print(f"  ⚠ Error analyzing image: {e}")
        return "custom"  # Default to custom on error

def main():
    print("=" * 70)
    print("Re-categorizing All Cake Images with Improved Logic")
    print("=" * 70)
    
    # Load full post data
    posts_file = 'instagram_posts_full.json'
    if not os.path.exists(posts_file):
        print(f"Error: {posts_file} not found!")
        return
    
    with open(posts_file, 'r', encoding='utf-8') as f:
        all_posts = json.load(f)
    
    print(f"\nTotal images to categorize: {len(all_posts)}")
    print("\nAnalyzing each image with AI...\n")
    
    # Categorize each image
    categorized = defaultdict(list)
    
    for i, post in enumerate(all_posts, 1):
        image_url = post.get('image_url', '')
        caption = post.get('caption', '')
        local_filename = post.get('local_filename', '')
        
        # Get local image path
        if local_filename:
            image_path = os.path.join('images', local_filename)
        else:
            # Fallback to extracting from URL
            image_filename = os.path.basename(image_url).split('?')[0]
            image_path = os.path.join('images', image_filename)
        
        if not os.path.exists(image_path):
            print(f"{i}/{len(all_posts)} ⚠ Image not found: {local_filename or image_url}, defaulting to custom")
            category = "custom"
        else:
            print(f"{i}/{len(all_posts)} Analyzing {local_filename or os.path.basename(image_url)}...", end=" ")
            category = categorize_image_with_ai(image_path, caption)
            print(f"→ {category}")
        
        # Add to category
        category_file = CATEGORY_MAPPING[category]
        categorized[category_file].append(post)
    
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
    
    for category_file in CATEGORY_MAPPING.values():
        count = len(categorized[category_file])
        name = category_names[category_file]
        print(f"{name}: {count} images")
    
    total = sum(len(posts) for posts in categorized.values())
    print(f"\nTotal: {total} images")
    
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
