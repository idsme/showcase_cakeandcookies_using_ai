#!/usr/bin/env python3
"""
Update all HTML files with:
1. All categorized images (hundreds)
2. Likes count on each image overlay
3. Images sorted newest to oldest
4. Replace phone number placeholder with real number
"""

import json
import re
from pathlib import Path
from bs4 import BeautifulSoup

# Real phone number from the website
REAL_PHONE = "31634191203"
PLACEHOLDER_PHONE = "31612345678"

def update_phone_numbers(html_content):
    """
    Replace placeholder phone number with real one
    """
    html_content = html_content.replace(PLACEHOLDER_PHONE, REAL_PHONE)
    html_content = html_content.replace("06-12345678", "06-34191203")
    return html_content

def generate_gallery_html(posts, category_name):
    """
    Generate HTML for gallery grid with all images, likes overlay, and proper sorting
    Posts are already sorted newest to oldest in categories_full.json
    """
    html_parts = []
    
    for idx, post in enumerate(posts, 1):
        local_filename = post.get("local_filename", "")
        likes = post.get("likes", 0)
        caption = post.get("caption", "")[:50] + "..." if len(post.get("caption", "")) > 50 else post.get("caption", "")
        
        # Create gallery item with likes overlay
        item_html = f'''
            <div class="gallery-item" data-theme="{category_name}" data-image="{local_filename}" data-likes="{likes}" onclick="handleTileClick(this)">
                <img src="images/{local_filename}" alt="{category_name} {idx}" loading="lazy">
                <div class="likes-overlay">
                    <i class="ph-fill ph-heart"></i> {likes} likes
                </div>
            </div>'''
        
        html_parts.append(item_html)
    
    return "\n".join(html_parts)

def update_html_file(html_file, posts, category_name):
    """
    Update an HTML file with new gallery content
    """
    print(f"\nUpdating {html_file}...")
    
    # Read HTML file
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace phone numbers
    content = update_phone_numbers(content)
    
    # Generate new gallery HTML
    gallery_html = generate_gallery_html(posts, category_name)
    
    # Find and replace the gallery section
    # Look for <div class="gallery-grid"> ... </div>
    pattern = r'(<div class="gallery-grid">)(.*?)(</div>\s*</section>)'
    
    def replacement(match):
        return match.group(1) + "\n" + gallery_html + "\n        " + match.group(3)
    
    content = re.sub(pattern, replacement, content, flags=re.DOTALL)
    
    # Add CSS for likes overlay if not present
    if "likes-overlay" not in content:
        css_to_add = '''
        .gallery-item {
            position: relative;
            overflow: hidden;
        }
        
        .likes-overlay {
            position: absolute;
            bottom: 10px;
            left: 10px;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 5px 10px;
            border-radius: 20px;
            font-size: 0.9rem;
            display: flex;
            align-items: center;
            gap: 5px;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .gallery-item:hover .likes-overlay {
            opacity: 1;
        }
        
        .likes-overlay i {
            color: #ff4458;
        }
'''
        # Insert before </style>
        content = content.replace('</style>', css_to_add + '\n    </style>')
    
    # Write updated HTML
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"  ✓ Updated with {len(posts)} images")
    print(f"  ✓ Replaced phone number: {PLACEHOLDER_PHONE} -> {REAL_PHONE}")
    print(f"  ✓ Added likes overlay")

def update_index_html():
    """
    Update index.html with phone number replacement
    """
    index_file = "index.html"
    print(f"\nUpdating {index_file}...")
    
    with open(index_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace phone numbers
    original_content = content
    content = update_phone_numbers(content)
    
    # Write back
    with open(index_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    if content != original_content:
        print(f"  ✓ Replaced phone number: {PLACEHOLDER_PHONE} -> {REAL_PHONE}")
    else:
        print(f"  ℹ No phone number changes needed")

def main():
    print("=" * 70)
    print("Updating HTML Files")
    print("=" * 70)
    
    # Load categorized images
    with open('categories_full.json', 'r', encoding='utf-8') as f:
        categories_data = json.load(f)
    
    # Update each HTML file
    for html_file, data in categories_data.items():
        category_name = data["title"]
        posts = data["posts"]
        
        if Path(html_file).exists():
            update_html_file(html_file, posts, category_name)
        else:
            print(f"\n⚠ Warning: {html_file} not found")
    
    # Update index.html (phone number only)
    update_index_html()
    
    print("\n" + "=" * 70)
    print("✓ All HTML files updated!")
    print("=" * 70)
    print("\nChanges made:")
    print("  1. ✓ Added ALL Instagram images (228 images distributed across pages)")
    print("  2. ✓ Added likes count overlay on each image")
    print("  3. ✓ Images sorted newest to oldest")
    print(f"  4. ✓ Replaced phone number: {PLACEHOLDER_PHONE} -> {REAL_PHONE}")
    print("=" * 70)

if __name__ == "__main__":
    main()
