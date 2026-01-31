import json
import re
from pathlib import Path

# Load the URL mapping
with open('url_mapping.json', 'r') as f:
    url_mapping = json.load(f)

# Load categories to get the theme type for each page
with open('categories.json', 'r') as f:
    categories = json.load(f)

# List of HTML files to update
html_files = ['birthday-cakes.html', 'character-cakes.html', 'custom-cakes.html', 'gender-reveal.html']

# Function to get theme type from filename
def get_theme_type(filename):
    theme_map = {
        'birthday-cakes.html': 'Verjaardagstaarten',
        'character-cakes.html': 'Thema & Karakter Taarten',
        'custom-cakes.html': 'Maatwerk Taarten',
        'gender-reveal.html': 'Baby & Gender Reveal'
    }
    return theme_map.get(filename, 'Taart')

for html_file in html_files:
    print(f"\nProcessing {html_file}...")
    filepath = Path(html_file)
    
    if not filepath.exists():
        print(f"  ✗ File not found: {html_file}")
        continue
    
    # Read the HTML content
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Get theme type for this page
    theme_type = get_theme_type(html_file)
    
    # 1. Replace Instagram URLs with local image paths
    for instagram_url, local_filename in url_mapping.items():
        if instagram_url in content:
            content = content.replace(instagram_url, f'images/{local_filename}')
            print(f"  ✓ Replaced {local_filename}")
    
    # 2. Remove gaps in gallery-grid CSS
    # Replace gap: 1.5rem with gap: 0
    content = re.sub(
        r'(\.gallery-grid\s*\{[^}]*?)gap:\s*[\d.]+rem;',
        r'\1gap: 0;',
        content
    )
    print(f"  ✓ Updated gallery-grid gap to 0")
    
    # 3. Remove border-radius from gallery-item to make tiles fit seamlessly
    content = re.sub(
        r'(\.gallery-item\s*\{[^}]*?)border-radius:\s*[\d.]+px;',
        r'\1border-radius: 0;',
        content
    )
    print(f"  ✓ Removed border-radius from gallery-item")
    
    # 4. Add data-theme attribute to gallery items and update onclick handler
    # Find all gallery-item divs and add data-theme and data-image attributes
    def add_onclick_handler(match):
        img_src = match.group(2)
        # Extract just the filename from the src
        filename = img_src.split('/')[-1] if '/' in img_src else img_src
        filename = filename.split('?')[0]  # Remove query params if any
        
        return f'''<div class="gallery-item" data-theme="{theme_type}" data-image="{filename}" onclick="handleTileClick(this)">
                <img src="{img_src}"'''
    
    # Match gallery-item divs with their img tags
    content = re.sub(
        r'<div class="gallery-item">\s*<img src="([^"]+)"',
        lambda m: add_onclick_handler(m).replace(m.group(1), m.group(1)),
        content
    )
    
    # More robust pattern that handles existing attributes
    pattern = r'<div class="gallery-item"[^>]*>\s*<img src="([^"]+)"'
    
    def replace_gallery_item(match):
        img_src = match.group(1)
        filename = img_src.split('/')[-1] if '/' in img_src else img_src
        filename = filename.split('?')[0]
        return f'<div class="gallery-item" data-theme="{theme_type}" data-image="{filename}" onclick="handleTileClick(this)">\n                <img src="{img_src}"'
    
    content = re.sub(pattern, replace_gallery_item, content)
    
    # 5. Add the JavaScript function for handling WhatsApp clicks
    # Check if the function already exists
    if 'function handleTileClick' not in content:
        # Find the closing script tag before </body>
        whatsapp_script = '''
        
        // Handle tile click to open WhatsApp
        function handleTileClick(element) {
            const theme = element.getAttribute('data-theme');
            const imageName = element.getAttribute('data-image');
            const phoneNumber = '31612345678'; // Replace with actual WhatsApp number
            const message = `Hallo! Ik ben geïnteresseerd in een ${theme}. Ik vond deze taart mooi: ${imageName}`;
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        }
'''
        # Insert before the closing </script> tag that's near the end
        content = re.sub(
            r'(</script>\s*</body>)',
            whatsapp_script + r'\1',
            content,
            count=1
        )
        print(f"  ✓ Added WhatsApp click handler function")
    
    # Write the updated content back
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"  ✓ Successfully updated {html_file}")

print("\n✅ All HTML files updated successfully!")
