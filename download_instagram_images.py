import json
import requests
from pathlib import Path
import hashlib

# Read the Instagram URLs from the JSON file
with open('instagram_images.json', 'r') as f:
    data = json.load(f)

# Create images directory if it doesn't exist
images_dir = Path('images')
images_dir.mkdir(exist_ok=True)

# Dictionary to store URL to filename mapping
url_mapping = {}

# Download each image
for idx, url in enumerate(data['images'], 1):
    try:
        print(f"Downloading image {idx}/{len(data['images'])}...")
        
        # Create a hash of the URL to get a unique filename
        url_hash = hashlib.md5(url.encode()).hexdigest()[:8]
        filename = f"instagram_{idx:02d}_{url_hash}.jpg"
        filepath = images_dir / filename
        
        # Download the image
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        response = requests.get(url, headers=headers, timeout=30)
        response.raise_for_status()
        
        # Save the image
        with open(filepath, 'wb') as img_file:
            img_file.write(response.content)
        
        url_mapping[url] = filename
        print(f"  ✓ Saved as {filename}")
        
    except Exception as e:
        print(f"  ✗ Error downloading {url}: {e}")

# Save the mapping to a JSON file for reference
with open('url_mapping.json', 'w') as f:
    json.dump(url_mapping, f, indent=2)

print(f"\nDownload complete! {len(url_mapping)} images saved.")
print("URL mapping saved to url_mapping.json")
