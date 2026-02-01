#!/usr/bin/env python3
"""
Update all sub-pages with:
1. Exact menu/navigation from index.html
2. Golden color for subtitles (--gold: #C9A86A)
3. Consistent order buttons matching home page
"""

import re
from pathlib import Path

# Sub-pages to update
SUBPAGES = [
    "birthday-cakes.html",
    "gender-reveal.html",
    "character-cakes.html",
    "custom-cakes.html"
]

# Correct navigation HTML from index.html
CORRECT_NAV_HTML = '''    <!-- Navigation -->
    <nav id="navbar">
        <div class="nav-container">
            <a href="index.html" class="logo">
                <div class="logo-icon">
                    <i class="ph-fill ph-cake"></i>
                </div>
                <span class="logo-text">Taart <span>&</span> Koek</span>
            </a>
            <ul class="nav-links">
                <li><a href="index.html#home">Home</a></li>
                <li><a href="character-cakes.html">Thema Taarten</a></li>
                <li><a href="gender-reveal.html">Gender Reveal</a></li>
                <li><a href="birthday-cakes.html">Verjaardagstaarten</a></li>
                <li><a href="custom-cakes.html">Maatwerk</a></li>
                <li><a href="index.html#pricing">Prijzen</a></li>
                <a href="https://wa.me/31634191203?text=Normale bestelling:%20Ik%20heb%20dringend%20een%20taart%20nodig" style="background:var(--hot-pink)" class="nav-cta btn-rush" target="_blank">
                    <i class="ph-fill ph-lightning"></i>
                    Bestellen
                </a>
            </ul>
            <div class="hamburger" id="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </nav>'''

# Correct logo styling from index.html
CORRECT_LOGO_CSS = '''        .logo {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            text-decoration: none;
        }
        
        .logo-icon {
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, var(--hot-pink), var(--deep-pink));
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.5rem;
            transition: transform 0.3s ease;
        }
        
        .logo:hover .logo-icon {
            transform: scale(1.1) rotate(10deg);
        }
        
        .logo-text {
            font-family: var(--font-display);
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--chocolate-brown);
        }
        
        .logo-text span {
            color: var(--hot-pink);
        }'''

def update_file(filepath):
    """Update a single HTML file"""
    print(f"\nUpdating {filepath}...")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Replace navigation HTML
    # Find the nav section and replace it
    nav_pattern = r'<nav[^>]*>.*?</nav>'
    content = re.sub(nav_pattern, CORRECT_NAV_HTML, content, flags=re.DOTALL)
    
    # 2. Update logo CSS styling
    # Find and replace logo CSS
    logo_css_pattern = r'\.logo \{[^}]*\}.*?\.logo-text span \{[^}]*\}'
    content = re.sub(logo_css_pattern, CORRECT_LOGO_CSS, content, flags=re.DOTALL)
    
    # 3. Update subtitle color to golden
    # Find page-subtitle or similar subtitle class and ensure it uses --gold color
    content = re.sub(
        r'(\.page-subtitle\s*\{[^}]*color:\s*)[^;]+;',
        r'\1var(--gold);',
        content
    )
    
    # Also update any section-subtitle to use golden color
    content = re.sub(
        r'(\.section-subtitle\s*\{[^}]*color:\s*)[^;]+;',
        r'\1var(--chocolate-brown);',  # Keep section subtitles as chocolate brown
        content
    )
    
    # Update the page header subtitle specifically to golden
    if '.page-subtitle' not in content:
        # Add page-subtitle CSS if it doesn't exist
        content = re.sub(
            r'(\.page-title \{[^}]*\})',
            r'\1\n        \n        .page-subtitle {\n            font-size: 1.2rem;\n            color: var(--gold);\n            max-width: 600px;\n            margin: 0 auto;\n        }',
            content
        )
    
    # 4. Update CTA buttons to match home page
    # Replace nav-cta styling to match index.html
    nav_cta_css = '''        .nav-cta {
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
        }'''
    
    # Replace nav-cta CSS
    content = re.sub(
        r'\.nav-cta \{[^}]*\}[^.]*?(?=\.|\Z)',
        nav_cta_css + '\n        ',
        content,
        flags=re.DOTALL
    )
    
    # 5. Update order buttons in content to match home page style
    # Find and update any "Bestel Nu" or "Bestellen" buttons
    content = re.sub(
        r'<a[^>]*href="https://wa\.me/[^"]*"[^>]*class="[^"]*"[^>]*>.*?Bestel.*?</a>',
        '<a href="https://wa.me/31634191203?text=Normale bestelling:%20Ik%20heb%20dringend%20een%20taart%20nodig" class="btn btn-primary" target="_blank">\n                        <i class="ph-fill ph-whatsapp-logo"></i>\n                        Bestel Via WhatsApp\n                    </a>',
        content,
        flags=re.DOTALL | re.IGNORECASE
    )
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✓ Updated {filepath}")

def main():
    print("=" * 70)
    print("Updating Menu Navigation and Styling")
    print("=" * 70)
    
    for subpage in SUBPAGES:
        filepath = Path(subpage)
        if filepath.exists():
            update_file(filepath)
        else:
            print(f"⚠ Warning: {subpage} not found")
    
    print("\n" + "=" * 70)
    print("✓ All pages updated successfully!")
    print("=" * 70)

if __name__ == "__main__":
    main()
