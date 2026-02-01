#!/usr/bin/env python3
"""
Update homepage gallery with top liked cakes
"""

import json
import re
from pathlib import Path
from bs4 import BeautifulSoup

# Load data
base_path = Path('/home/ubuntu/showcase_cakeandcookies')
with open(base_path / 'instagram_posts_full.json', 'r') as f:
    instagram_data = json.load(f)

with open(base_path / 'image_name_mapping.json', 'r') as f:
    image_name_mapping = json.load(f)

with open(base_path / 'descriptive_names.json', 'r') as f:
    descriptive_names = json.load(f)

with open(base_path / 'images_to_remove.json', 'r') as f:
    images_to_remove = json.load(f)

with open(base_path / 'categories_full.json', 'r') as f:
    categories_data = json.load(f)

# Create mapping
image_to_post = {}
for post in instagram_data:
    local_file = post.get('local_filename', '')
    if local_file:
        image_to_post[local_file] = post

# Get valid posts
valid_posts = []
for post in instagram_data:
    local_file = post.get('local_filename', '')
    if local_file and local_file not in images_to_remove and local_file in image_name_mapping:
        valid_posts.append(post)

# Sort by likes
valid_posts.sort(key=lambda x: x.get('likes', 0), reverse=True)

# Define elegant keywords
elegant_keywords = [
    'bruiloft', 'wedding', 'elegante', 'elegant', 'goud', 'gold',
    'zilver', 'silver', 'naked', 'bloemen', 'flowers', 'classic',
    'marble', 'marmer', 'drip', 'minimal'
]

def elegance_score(post):
    caption = post.get('caption', '').lower()
    score = 0
    for keyword in elegant_keywords:
        if keyword in caption:
            score += 1
    score += post.get('likes', 0) / 100
    return score

# Get top posts
top_posts = valid_posts[:30]
top_posts.sort(key=elegance_score, reverse=True)
top_posts = top_posts[:15]

print(f"Top {len(top_posts)} cakes selected:")
for idx, post in enumerate(top_posts, 1):
    local_file = post.get('local_filename', '')
    new_name = image_name_mapping.get(local_file, local_file)
    likes = post.get('likes', 0)
    caption_preview = post.get('caption', '')[:50]
    print(f"  {idx}. {new_name} - {likes} likes - {caption_preview}...")

# Get category for each image
image_to_category = {}
if isinstance(categories_data, dict):
    for category, images in categories_data.items():
        for img in images:
            image_to_category[img] = category

# Read index.html
with open(base_path / 'index.html', 'r', encoding='utf-8') as f:
    content = f.read()

soup = BeautifulSoup(content, 'html.parser')

# Find gallery-grid
gallery_grid = soup.find('div', class_='gallery-grid')
if gallery_grid:
    print("\n✓ Found gallery-grid section")
    
    # Clear existing items
    gallery_grid.clear()
    
    # Add new items
    for post in top_posts:
        local_file = post.get('local_filename', '')
        new_name = image_name_mapping.get(local_file, local_file)
        descriptive_name = descriptive_names.get(local_file, new_name.replace('.jpg', ''))
        likes = post.get('likes', 0)
        caption = post.get('caption', '')[:100]
        
        # Determine theme from categories
        theme = "Handgemaakte Taarten"
        theme_display = "Speciale Taart"
        category = image_to_category.get(local_file, '')
        
        if 'verjaardag' in category.lower():
            theme_display = "Verjaardagstaart"
        elif 'character' in category.lower() or 'karakter' in category.lower():
            theme_display = "Karaktertaart"
        elif 'gender' in category.lower():
            theme_display = "Gender Reveal"
        elif 'custom' in category.lower():
            theme_display = "Custom Taart"
        
        # Get nice title from descriptive name
        title = descriptive_name.replace('-', ' ').title()
        
        # Create gallery item HTML
        item_html = f'''<div class="gallery-item fade-in" onclick="openLightbox('images/{new_name}')">
                <img src="images/{new_name}" alt="{title}" loading="lazy">
                <div class="gallery-overlay">
                    <h4>{title}</h4>
                    <span>{theme_display}</span>
                </div>
            </div>'''
        
        item_soup = BeautifulSoup(item_html, 'html.parser')
        gallery_grid.append(item_soup.find('div'))
    
    # Write updated HTML
    with open(base_path / 'index.html', 'w', encoding='utf-8') as f:
        f.write(str(soup.prettify()))
    
    print(f"\n✓ Updated homepage gallery with {len(top_posts)} top cakes")
else:
    print("\n⚠️  Gallery-grid section not found in index.html")

print("\n✅ Homepage gallery update completed!")
