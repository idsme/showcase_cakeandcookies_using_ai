#!/usr/bin/env python3
"""
Comprehensive update script for Taart en Koek website
Tasks:
1. Analyze all images for text content using OCR
2. Remove images with more than 5 words
3. Generate descriptive names from Instagram captions
4. Update all HTML files with new names and styling
5. Add top liked cakes to home page
"""

import json
import os
import re
from pathlib import Path
from PIL import Image
import pytesseract
from collections import defaultdict
from bs4 import BeautifulSoup
import shutil

class WebsiteUpdater:
    def __init__(self, base_path='/home/ubuntu/showcase_cakeandcookies'):
        self.base_path = Path(base_path)
        self.images_dir = self.base_path / 'images'
        self.instagram_data = self.load_json('instagram_posts_full.json')
        self.categories_data = self.load_json('categories_full.json')
        
        # Create mapping of local_filename to instagram post
        self.image_to_post = {}
        for post in self.instagram_data:
            local_file = post.get('local_filename', '')
            if local_file:
                self.image_to_post[local_file] = post
        
        self.images_to_remove = []
        self.image_name_mapping = {}  # old_name -> new_name
        self.descriptive_names = {}  # old_name -> descriptive_name (without extension)
        
        print(f"Initialized with {len(self.instagram_data)} Instagram posts")
        print(f"Found {len(list(self.images_dir.glob('*.jpg')))} images in directory")
    
    def load_json(self, filename):
        """Load JSON file"""
        path = self.base_path / filename
        if path.exists():
            with open(path, 'r', encoding='utf-8') as f:
                return json.load(f)
        return []
    
    def save_json(self, data, filename):
        """Save JSON file"""
        path = self.base_path / filename
        with open(path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
    
    def analyze_image_text(self, image_path):
        """Analyze image for text content using OCR"""
        try:
            img = Image.open(image_path)
            text = pytesseract.image_to_string(img, lang='eng+nld')
            words = text.strip().split()
            # Filter out single characters and numbers
            meaningful_words = [w for w in words if len(w) > 1]
            return len(meaningful_words), text
        except Exception as e:
            print(f"Error analyzing {image_path}: {e}")
            return 0, ""
    
    def generate_descriptive_name(self, post, category=""):
        """Generate a descriptive name from Instagram caption"""
        caption = post.get('caption', '')
        
        # Common cake-related keywords in Dutch
        keywords = {
            'verjaardag': 'verjaardag',
            'birthday': 'verjaardag',
            'bruiloft': 'bruiloft',
            'wedding': 'bruiloft',
            'baby': 'baby',
            'gender reveal': 'gender-reveal',
            'communie': 'communie',
            'communion': 'communie',
            'kerst': 'kerst',
            'christmas': 'kerst',
            'paas': 'paas',
            'easter': 'paas',
            'sinterklaas': 'sinterklaas',
            'carnaval': 'carnaval',
            'annivers': 'jubileum',
            'jubileum': 'jubileum',
        }
        
        # Character/theme keywords
        character_keywords = {
            'spiderman': 'spiderman',
            'spider-man': 'spiderman',
            'frozen': 'frozen',
            'elsa': 'frozen-elsa',
            'anna': 'frozen-anna',
            'disney': 'disney',
            'mickey': 'mickey-mouse',
            'minnie': 'minnie-mouse',
            'princess': 'prinses',
            'prinses': 'prinses',
            'unicorn': 'eenhoorn',
            'eenhoorn': 'eenhoorn',
            'paw patrol': 'paw-patrol',
            'peppa': 'peppa-pig',
            'cars': 'cars',
            'marvel': 'marvel',
            'avengers': 'avengers',
            'batman': 'batman',
            'superman': 'superman',
            'barbie': 'barbie',
            'pokemon': 'pokemon',
            'pikachu': 'pikachu',
            'minecraft': 'minecraft',
            'fortnite': 'fortnite',
            'hulk': 'hulk',
            'iron man': 'iron-man',
            'captain america': 'captain-america',
        }
        
        # Color/style keywords
        style_keywords = {
            'roze': 'roze',
            'pink': 'roze',
            'blauw': 'blauw',
            'blue': 'blauw',
            'goud': 'goud',
            'gold': 'goud',
            'zilver': 'zilver',
            'silver': 'zilver',
            'regenboog': 'regenboog',
            'rainbow': 'regenboog',
            'bloemen': 'bloemen',
            'flowers': 'bloemen',
            'drip': 'drip',
            'naked': 'naked-cake',
            'ombre': 'ombre',
        }
        
        caption_lower = caption.lower()
        name_parts = []
        
        # Check category first
        if category:
            cat_normalized = category.lower().replace(' ', '-')
            if 'verjaardag' in cat_normalized:
                name_parts.append('verjaardag')
            elif 'character' in cat_normalized or 'karakter' in cat_normalized:
                name_parts.append('karakter')
            elif 'custom' in cat_normalized or 'speciaal' in cat_normalized:
                name_parts.append('custom')
            elif 'gender' in cat_normalized:
                name_parts.append('gender-reveal')
        
        # Find character/theme
        for key, value in character_keywords.items():
            if key in caption_lower:
                name_parts.append(value)
                break
        
        # Find occasion
        for key, value in keywords.items():
            if key in caption_lower and value not in name_parts:
                name_parts.append(value)
                break
        
        # Find style/color
        for key, value in style_keywords.items():
            if key in caption_lower and value not in name_parts:
                name_parts.append(value)
                break
        
        # If no keywords found, try to extract from first few words
        if not name_parts:
            words = caption.split()[:5]
            for word in words:
                clean = re.sub(r'[^\w\s-]', '', word).strip().lower()
                if len(clean) > 3 and clean not in ['deze', 'this', 'voor', 'that', 'with']:
                    name_parts.append(clean)
                    break
        
        # If still no name, use category or generic
        if not name_parts:
            if category:
                name_parts.append(category.lower().replace(' ', '-'))
            else:
                name_parts.append('taart')
        
        # Join parts and clean up
        descriptive_name = '-'.join(name_parts)
        descriptive_name = re.sub(r'[^\w\s-]', '', descriptive_name)
        descriptive_name = re.sub(r'\s+', '-', descriptive_name)
        descriptive_name = re.sub(r'-+', '-', descriptive_name)
        
        return descriptive_name.strip('-')
    
    def step1_analyze_images(self):
        """Step 1: Analyze all images for text content"""
        print("\n=== Step 1: Analyzing images for text content ===")
        
        results = []
        image_files = sorted(self.images_dir.glob('instagram_*.jpg'))
        
        for idx, img_path in enumerate(image_files, 1):
            print(f"Analyzing {idx}/{len(image_files)}: {img_path.name}", end='\r')
            
            word_count, text = self.analyze_image_text(img_path)
            
            if word_count > 5:
                self.images_to_remove.append(img_path.name)
                print(f"\n  ⚠️  {img_path.name}: {word_count} words - WILL BE REMOVED")
                print(f"      Text preview: {text[:100]}...")
            
            results.append({
                'filename': img_path.name,
                'word_count': word_count,
                'text_preview': text[:200] if text else "",
                'will_remove': word_count > 5
            })
        
        print(f"\n\nFound {len(self.images_to_remove)} images to remove (>5 words)")
        
        # Save analysis results
        self.save_json(results, 'image_text_analysis.json')
        self.save_json(self.images_to_remove, 'images_to_remove.json')
        
        return results
    
    def step2_generate_descriptive_names(self):
        """Step 2: Generate descriptive names for all images"""
        print("\n=== Step 2: Generating descriptive names ===")
        
        # Load categories to know which theme each image belongs to
        image_to_category = {}
        if isinstance(self.categories_data, dict):
            for category, images in self.categories_data.items():
                for img in images:
                    image_to_category[img] = category
        
        name_counter = defaultdict(int)
        
        for post in self.instagram_data:
            local_file = post.get('local_filename', '')
            if not local_file:
                continue
            
            # Skip if image will be removed
            if local_file in self.images_to_remove:
                continue
            
            category = image_to_category.get(local_file, '')
            descriptive_base = self.generate_descriptive_name(post, category)
            
            # Handle duplicates by adding number
            name_counter[descriptive_base] += 1
            if name_counter[descriptive_base] > 1:
                descriptive_name = f"{descriptive_base}-{name_counter[descriptive_base]}"
            else:
                descriptive_name = descriptive_base
            
            # Store mapping
            new_filename = f"{descriptive_name}.jpg"
            self.image_name_mapping[local_file] = new_filename
            self.descriptive_names[local_file] = descriptive_name
            
            print(f"  {local_file} -> {new_filename}")
        
        print(f"\nGenerated {len(self.image_name_mapping)} descriptive names")
        
        # Save mapping
        self.save_json(self.image_name_mapping, 'image_name_mapping.json')
        self.save_json(self.descriptive_names, 'descriptive_names.json')
    
    def step3_rename_image_files(self):
        """Step 3: Rename actual image files"""
        print("\n=== Step 3: Renaming image files ===")
        
        for old_name, new_name in self.image_name_mapping.items():
            old_path = self.images_dir / old_name
            new_path = self.images_dir / new_name
            
            if old_path.exists():
                if new_path.exists():
                    # Handle collision
                    base, ext = os.path.splitext(new_name)
                    counter = 2
                    while new_path.exists():
                        new_name = f"{base}-v{counter}{ext}"
                        new_path = self.images_dir / new_name
                        counter += 1
                    self.image_name_mapping[old_name] = new_name
                
                shutil.move(str(old_path), str(new_path))
                print(f"  ✓ Renamed: {old_name} -> {new_name}")
            else:
                print(f"  ⚠️  Not found: {old_name}")
        
        print(f"\nRenamed {len(self.image_name_mapping)} files")
    
    def step4_update_html_files(self):
        """Step 4: Update all HTML files"""
        print("\n=== Step 4: Updating HTML files ===")
        
        html_files = [
            'index.html',
            'birthday-cakes.html',
            'character-cakes.html',
            'custom-cakes.html',
            'gender-reveal.html'
        ]
        
        # Home page styling reference (to be applied to all pages)
        home_logo_style = """
        .logo-text {
            font-family: var(--font-display);
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--chocolate-brown);
        }
        
        .logo-text span {
            color: var(--hot-pink);
        }"""
        
        home_button_style = """
        .nav-cta {
            background: var(--hot-pink);
            color: white !important;
            padding: 0.6rem 1.5rem;
            border-radius: 50px;
            font-weight: 600 !important;
            transition: all 0.3s ease !important;
        }
        
        .nav-cta:hover {
            background: var(--deep-pink);
            transform: translateY(-2px);
        }
        
        .nav-cta::after {
            display: none !important;
        }"""
        
        for html_file in html_files:
            file_path = self.base_path / html_file
            if not file_path.exists():
                print(f"  ⚠️  File not found: {html_file}")
                continue
            
            print(f"\n  Processing: {html_file}")
            
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            soup = BeautifulSoup(content, 'html.parser')
            
            # Update styling (for sub-pages, not index.html)
            if html_file != 'index.html':
                # Find and update logo-text styling
                style_tags = soup.find_all('style')
                for style_tag in style_tags:
                    style_content = style_tag.string
                    if style_content and '.logo-text' in style_content:
                        # Replace logo-text styling
                        style_content = re.sub(
                            r'\.logo-text\s*{[^}]*}',
                            home_logo_style.strip(),
                            style_content,
                            flags=re.DOTALL
                        )
                        
                        # Replace nav-cta styling if exists
                        if '.nav-cta' in style_content:
                            style_content = re.sub(
                                r'\.nav-cta\s*{[^}]*}(?:\s*\.nav-cta:hover\s*{[^}]*})?(?:\s*\.nav-cta::after\s*{[^}]*})?',
                                home_button_style.strip(),
                                style_content,
                                flags=re.DOTALL
                            )
                        
                        style_tag.string = style_content
                        print(f"    ✓ Updated styling")
            
            # Update image references
            gallery_items = soup.find_all('div', class_='gallery-item')
            removed_count = 0
            updated_count = 0
            
            for item in gallery_items:
                # Get current image name
                img_tag = item.find('img')
                if not img_tag or not img_tag.get('src'):
                    continue
                
                old_image_name = os.path.basename(img_tag['src'])
                
                # Check if should be removed
                if old_image_name in self.images_to_remove:
                    item.decompose()
                    removed_count += 1
                    continue
                
                # Update to new name if exists
                if old_image_name in self.image_name_mapping:
                    new_image_name = self.image_name_mapping[old_image_name]
                    descriptive_name = self.descriptive_names.get(old_image_name, new_image_name)
                    
                    # Update img src
                    img_tag['src'] = f"images/{new_image_name}"
                    
                    # Update alt text
                    img_tag['alt'] = descriptive_name.replace('-', ' ').title()
                    
                    # Update data-image attribute
                    if item.get('data-image'):
                        item['data-image'] = new_image_name
                    
                    updated_count += 1
            
            # Update JavaScript function for WhatsApp message
            scripts = soup.find_all('script')
            for script in scripts:
                if script.string and 'handleTileClick' in script.string:
                    # Update the function to use descriptive names
                    new_script = re.sub(
                        r'const imageName = element\.getAttribute\([\'"]data-image[\'"]\);',
                        '''const imageName = element.getAttribute('data-image');
            const imageAlt = element.querySelector('img')?.alt || imageName;
            const descriptiveName = imageAlt;''',
                        script.string
                    )
                    
                    new_script = re.sub(
                        r'Ik vond deze taart mooi: \$\{imageName\}',
                        r'Ik vond deze taart mooi: ${descriptiveName}',
                        new_script
                    )
                    
                    script.string = new_script
            
            # Write updated HTML
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(str(soup))
            
            print(f"    ✓ Removed {removed_count} images")
            print(f"    ✓ Updated {updated_count} image references")
    
    def step5_add_top_cakes_to_homepage(self):
        """Step 5: Add most liked cakes to homepage gallery"""
        print("\n=== Step 5: Adding top liked cakes to homepage ===")
        
        # Get valid posts (not removed)
        valid_posts = []
        for post in self.instagram_data:
            local_file = post.get('local_filename', '')
            if local_file and local_file not in self.images_to_remove and local_file in self.image_name_mapping:
                valid_posts.append(post)
        
        # Sort by likes
        valid_posts.sort(key=lambda x: x.get('likes', 0), reverse=True)
        
        # Define elegant keywords for sorting
        elegant_keywords = [
            'bruiloft', 'wedding', 'elegante', 'elegant', 'goud', 'gold',
            'zilver', 'silver', 'naked', 'bloemen', 'flowers', 'classic',
            'marble', 'marmer', 'drip', 'minimal'
        ]
        
        # Score posts by elegance
        def elegance_score(post):
            caption = post.get('caption', '').lower()
            score = 0
            for keyword in elegant_keywords:
                if keyword in caption:
                    score += 1
            # Bonus for high likes
            score += post.get('likes', 0) / 100
            return score
        
        # Get top 20 posts
        top_posts = valid_posts[:30]  # Get more to sort by elegance
        top_posts.sort(key=elegance_score, reverse=True)
        top_posts = top_posts[:15]  # Take top 15 for gallery
        
        print(f"\nTop {len(top_posts)} cakes selected:")
        for idx, post in enumerate(top_posts, 1):
            local_file = post.get('local_filename', '')
            new_name = self.image_name_mapping.get(local_file, local_file)
            likes = post.get('likes', 0)
            caption_preview = post.get('caption', '')[:60]
            print(f"  {idx}. {new_name} - {likes} likes - {caption_preview}...")
        
        # Now update index.html gallery section
        file_path = self.base_path / 'index.html'
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        soup = BeautifulSoup(content, 'html.parser')
        
        # Find the gallery section
        gallery = soup.find('div', class_='gallery')
        if gallery:
            # Clear existing items
            gallery.clear()
            
            # Add new items
            for post in top_posts:
                local_file = post.get('local_filename', '')
                new_name = self.image_name_mapping.get(local_file, local_file)
                descriptive_name = self.descriptive_names.get(local_file, new_name)
                likes = post.get('likes', 0)
                
                # Determine theme from categories
                theme = "Handgemaakte Taarten"
                if isinstance(self.categories_data, dict):
                    for cat, images in self.categories_data.items():
                        if local_file in images:
                            theme = cat
                            break
                
                # Create gallery item
                item_html = f'''
            <div class="gallery-item" data-theme="{theme}" data-image="{new_name}" data-likes="{likes}" onclick="handleTileClick(this)">
                <img src="images/{new_name}" alt="{descriptive_name.replace('-', ' ').title()}" loading="lazy">
                <div class="likes-overlay">
                    <i class="ph-fill ph-heart"></i> {likes} likes
                </div>
            </div>'''
                
                item_soup = BeautifulSoup(item_html, 'html.parser')
                gallery.append(item_soup.find('div'))
            
            # Write updated HTML
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(str(soup))
            
            print(f"\n  ✓ Updated homepage gallery with {len(top_posts)} top cakes")
        else:
            print("  ⚠️  Gallery section not found in index.html")
    
    def run_all_steps(self):
        """Run all update steps"""
        print("=" * 70)
        print("COMPREHENSIVE WEBSITE UPDATE")
        print("=" * 70)
        
        try:
            # Step 1: Analyze images
            self.step1_analyze_images()
            
            # Step 2: Generate descriptive names
            self.step2_generate_descriptive_names()
            
            # Step 3: Rename files
            self.step3_rename_image_files()
            
            # Step 4: Update HTML files
            self.step4_update_html_files()
            
            # Step 5: Add top cakes to homepage
            self.step5_add_top_cakes_to_homepage()
            
            print("\n" + "=" * 70)
            print("✅ ALL UPDATES COMPLETED SUCCESSFULLY")
            print("=" * 70)
            print(f"\nSummary:")
            print(f"  - Images analyzed: {len(list(self.images_dir.glob('*.jpg')))}")
            print(f"  - Images removed: {len(self.images_to_remove)}")
            print(f"  - Images renamed: {len(self.image_name_mapping)}")
            print(f"  - HTML files updated: 5")
            
        except Exception as e:
            print(f"\n❌ Error during update: {e}")
            import traceback
            traceback.print_exc()

if __name__ == '__main__':
    updater = WebsiteUpdater()
    updater.run_all_steps()
