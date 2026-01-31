#!/usr/bin/env python3
"""
Instagram Profile Scraper with Infinite Scroll
Downloads ALL images from an Instagram profile by scrolling until no more content loads
"""

import json
import time
import requests
from pathlib import Path
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import hashlib

def setup_driver():
    """Set up Chrome driver with appropriate options"""
    chrome_options = Options()
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')
    chrome_options.add_argument('--disable-blink-features=AutomationControlled')
    chrome_options.add_argument('--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')
    
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=chrome_options)
    return driver

def scroll_to_bottom(driver, max_scrolls=100, scroll_pause_time=2):
    """
    Scroll down the page until no more new content loads
    Returns the number of scrolls performed
    """
    print("Starting infinite scroll...")
    last_height = driver.execute_script("return document.body.scrollHeight")
    scrolls = 0
    no_change_count = 0
    
    while scrolls < max_scrolls:
        # Scroll down to bottom
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        scrolls += 1
        
        # Wait for page to load
        time.sleep(scroll_pause_time)
        
        # Calculate new scroll height and compare with last scroll height
        new_height = driver.execute_script("return document.body.scrollHeight")
        
        if new_height == last_height:
            no_change_count += 1
            print(f"Scroll {scrolls}: No new content loaded (attempt {no_change_count}/3)")
            
            # If no change after 3 attempts, we've reached the end
            if no_change_count >= 3:
                print(f"Reached end of page after {scrolls} scrolls")
                break
        else:
            no_change_count = 0
            print(f"Scroll {scrolls}: New content loaded (height: {last_height} -> {new_height})")
        
        last_height = new_height
    
    return scrolls

def extract_post_data(driver):
    """
    Extract all post URLs and metadata from the loaded page
    Returns list of dictionaries with post data
    """
    print("\nExtracting post data...")
    posts = []
    
    # Wait for posts to load
    try:
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.TAG_NAME, "article"))
        )
    except:
        print("Warning: No articles found on page")
        return posts
    
    # Find all image links (posts)
    articles = driver.find_elements(By.TAG_NAME, "article")
    print(f"Found {len(articles)} article containers")
    
    for article in articles:
        try:
            # Find all links within the article
            links = article.find_elements(By.TAG_NAME, "a")
            
            for link in links:
                href = link.get_attribute("href")
                
                # Only process post URLs (contain /p/)
                if href and "/p/" in href:
                    # Try to find the image
                    images = link.find_elements(By.TAG_NAME, "img")
                    
                    for img in images:
                        src = img.get_attribute("src")
                        alt = img.get_attribute("alt") or ""
                        
                        # Skip profile pictures and other non-post images
                        if src and "profile" not in src.lower():
                            # Try to extract likes from alt text or nearby elements
                            likes = 0
                            if "likes" in alt.lower():
                                try:
                                    # Extract number from alt text like "Photo by ... on Instagram. May be an image of ... 123 likes"
                                    parts = alt.split()
                                    for i, part in enumerate(parts):
                                        if "like" in part.lower() and i > 0:
                                            likes = int(parts[i-1].replace(',', ''))
                                            break
                                except:
                                    pass
                            
                            post_data = {
                                "post_url": href,
                                "image_url": src,
                                "alt_text": alt,
                                "likes": likes
                            }
                            
                            # Avoid duplicates
                            if not any(p["image_url"] == src for p in posts):
                                posts.append(post_data)
        except Exception as e:
            print(f"Error extracting post data: {e}")
            continue
    
    print(f"Extracted {len(posts)} unique posts")
    return posts

def scrape_instagram_profile(profile_url, max_scrolls=100):
    """
    Scrape all images from an Instagram profile
    """
    driver = None
    try:
        driver = setup_driver()
        print(f"Opening Instagram profile: {profile_url}")
        driver.get(profile_url)
        
        # Wait for page to load
        time.sleep(5)
        
        # Perform infinite scroll
        total_scrolls = scroll_to_bottom(driver, max_scrolls=max_scrolls)
        print(f"\nCompleted {total_scrolls} scrolls")
        
        # Extract all posts
        posts = extract_post_data(driver)
        
        return posts
    
    except Exception as e:
        print(f"Error during scraping: {e}")
        import traceback
        traceback.print_exc()
        return []
    
    finally:
        if driver:
            driver.quit()

def download_images(posts, output_dir="images"):
    """
    Download all images from the posts
    Returns mapping of image URLs to local filenames
    """
    output_path = Path(output_dir)
    output_path.mkdir(exist_ok=True)
    
    url_mapping = {}
    downloaded_count = 0
    
    print(f"\nDownloading {len(posts)} images...")
    
    for idx, post in enumerate(posts, 1):
        try:
            image_url = post["image_url"]
            
            # Create unique filename
            url_hash = hashlib.md5(image_url.encode()).hexdigest()[:8]
            filename = f"instagram_{idx:03d}_{url_hash}.jpg"
            filepath = output_path / filename
            
            # Skip if already downloaded
            if filepath.exists():
                print(f"  [{idx}/{len(posts)}] Already exists: {filename}")
                url_mapping[image_url] = filename
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
            downloaded_count += 1
            print(f"  [{idx}/{len(posts)}] Downloaded: {filename}")
            
        except Exception as e:
            print(f"  [{idx}/{len(posts)}] Error downloading {post.get('image_url', 'unknown')}: {e}")
    
    print(f"\n✓ Downloaded {downloaded_count} new images")
    print(f"✓ Total images: {len(url_mapping)}")
    
    return url_mapping

def save_metadata(posts, url_mapping, output_file="instagram_posts_full.json"):
    """
    Save post metadata including image URLs, likes, and local filenames
    """
    output_data = []
    
    for post in posts:
        image_url = post["image_url"]
        
        if image_url in url_mapping:
            output_data.append({
                "post_url": post["post_url"],
                "image_url": image_url,
                "local_filename": url_mapping[image_url],
                "alt_text": post["alt_text"],
                "likes": post["likes"]
            })
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(output_data, f, indent=2, ensure_ascii=False)
    
    print(f"\n✓ Saved metadata to {output_file}")

def main():
    # Instagram profile URL
    profile_url = "https://www.instagram.com/taart_en_koek/?hl=en"
    
    print("=" * 60)
    print("Instagram Profile Scraper with Infinite Scroll")
    print("=" * 60)
    
    # Scrape profile
    posts = scrape_instagram_profile(profile_url, max_scrolls=100)
    
    if not posts:
        print("\n❌ No posts found. This could be due to:")
        print("   - Instagram blocking automated access")
        print("   - Profile is private")
        print("   - Network issues")
        return
    
    print(f"\n✓ Found {len(posts)} posts from Instagram profile")
    
    # Download images
    url_mapping = download_images(posts, output_dir="images")
    
    # Save metadata
    save_metadata(posts, url_mapping, output_file="instagram_posts_full.json")
    
    print("\n" + "=" * 60)
    print(f"✓ Scraping complete!")
    print(f"✓ Total images: {len(posts)}")
    print(f"✓ Downloaded: {len(url_mapping)}")
    print("=" * 60)

if __name__ == "__main__":
    main()
