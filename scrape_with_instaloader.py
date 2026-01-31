#!/usr/bin/env python3
"""
Scrape Instagram profile using Instaloader
"""

import instaloader
import json
import requests
from pathlib import Path
import hashlib
from datetime import datetime

def scrape_instagram_with_instaloader(username="taart_en_koek"):
    """
    Scrape Instagram profile using Instaloader
    """
    # Create an Instaloader instance
    L = instaloader.Instaloader(
        download_videos=False,
        download_video_thumbnails=False,
        download_geotags=False,
        download_comments=False,
        save_metadata=False,
        compress_json=False
    )
    
    print(f"Fetching profile: {username}")
    
    try:
        # Get profile
        profile = instaloader.Profile.from_username(L.context, username)
        
        print(f"Profile: {profile.full_name}")
        print(f"Followers: {profile.followers}")
        print(f"Posts: {profile.mediacount}")
        print("\nFetching posts...")
        
        posts_data = []
        count = 0
        
        # Iterate over all posts
        for post in profile.get_posts():
            count += 1
            
            try:
                # Get post data
                post_data = {
                    "post_url": f"https://www.instagram.com/p/{post.shortcode}/",
                    "image_url": post.url,
                    "caption": post.caption if post.caption else "",
                    "likes": post.likes,
                    "comments": post.comments,
                    "date": post.date_utc.isoformat(),
                    "is_video": post.is_video,
                    "typename": post.typename
                }
                
                # Only include images, not videos
                if not post.is_video:
                    posts_data.append(post_data)
                    print(f"  [{len(posts_data)}] Post {post.shortcode}: {post.likes} likes")
                
                # Limit to avoid rate limiting
                if count >= 250:  # Get up to 250 posts
                    print(f"\nReached limit of {count} posts")
                    break
                    
            except Exception as e:
                print(f"  Error processing post: {e}")
                continue
        
        print(f"\n✓ Successfully fetched {len(posts_data)} image posts")
        return posts_data
        
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()
        return []

def download_images(posts_data, output_dir="images"):
    """
    Download all images from posts_data
    """
    output_path = Path(output_dir)
    output_path.mkdir(exist_ok=True)
    
    url_mapping = {}
    downloaded_count = 0
    
    print(f"\nDownloading {len(posts_data)} images...")
    
    for idx, post in enumerate(posts_data, 1):
        try:
            image_url = post["image_url"]
            
            # Create unique filename
            url_hash = hashlib.md5(image_url.encode()).hexdigest()[:8]
            filename = f"instagram_{idx:03d}_{url_hash}.jpg"
            filepath = output_path / filename
            
            # Skip if already exists
            if filepath.exists():
                print(f"  [{idx}/{len(posts_data)}] Already exists: {filename}")
                url_mapping[image_url] = filename
                post["local_filename"] = filename
                continue
            
            # Download image
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
            response = requests.get(image_url, headers=headers, timeout=30)
            response.raise_for_status()
            
            # Save image
            with open(filepath, 'wb') as f:
                f.write(response.content)
            
            url_mapping[image_url] = filename
            post["local_filename"] = filename
            downloaded_count += 1
            print(f"  [{idx}/{len(posts_data)}] Downloaded: {filename}")
            
        except Exception as e:
            print(f"  [{idx}/{len(posts_data)}] Error: {e}")
    
    print(f"\n✓ Downloaded {downloaded_count} new images")
    print(f"✓ Total images: {len(url_mapping)}")
    
    return posts_data

def main():
    print("=" * 70)
    print("Instagram Scraper using Instaloader")
    print("=" * 70)
    
    # Scrape Instagram
    posts_data = scrape_instagram_with_instaloader("taart_en_koek")
    
    if not posts_data:
        print("\n❌ No posts found")
        return
    
    # Download images
    posts_data = download_images(posts_data, output_dir="images")
    
    # Save metadata
    with open('instagram_posts_full.json', 'w', encoding='utf-8') as f:
        json.dump(posts_data, f, indent=2, ensure_ascii=False)
    
    print(f"\n✓ Saved metadata to instagram_posts_full.json")
    
    print("\n" + "=" * 70)
    print(f"✓ Scraping complete!")
    print(f"✓ Total posts: {len(posts_data)}")
    print("=" * 70)

if __name__ == "__main__":
    main()
