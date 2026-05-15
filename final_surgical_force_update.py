import os
import re

base_path = r'c:\Users\MSI\Downloads\Handcraft-main\Handcraft-main'
home_page_dir = os.path.join(base_path, 'images', 'Home_page')

# Get exact filenames from the directory
files = os.listdir(home_page_dir)

def find_file(pattern):
    for f in files:
        if pattern.lower() in f.lower():
            return f
    return None

# Mapping logic
product_map = {
    'acrylic': find_file('product---Arcylic'),
    'fabric': find_file('product---fabric-painting'),
    'mini': find_file('product----minipaintings'),
    'phonecases': find_file('product---phonecases'),
    'magnets': find_file('product---fridge-magent'),
    'portraits': find_file('product---portraits'),
    'platter': find_file('product---ring-platter'),
    'resindecor': find_file('product---resin-decor'),
    'resinart': find_file('product---resin-artwork'),
    'texture': find_file('product---texture-art'),
    'invitations': find_file('product----wedding-invite'),
    'mural': find_file('product---wall-mural-art')
}

services_map = {
    'WALLMURALS': find_file('SERVICES--WALLMURALS'),
    'Fabric-Painting': find_file('SERVICES--Fabric-Painting'),
    'devotional-art': find_file('SERVICES--devotional-art'),
    'texture-art': find_file('SERVICES---texture-art'),
    'resin-art-works': find_file('SERVICES---resin-art-works'),
    'landscapes': find_file('SERVICES--landscapes'),
    'portraits': find_file('SERVICES--portraits'),
    'phone-cases': find_file('SERVICES--hand-painted-phone-cases'),
    'ring-platter': find_file('SERVICES---resin-ring-platter'),
    'mini-paintings': find_file('SERVICES---mini-paintings')
}

exhibitions_map = {
    'Chitra-Santhe': find_file('exhibitions----Chitra-Santhe'),
    'chitrakala': find_file('exhibitions----chitrakala-parishadh'),
    'India-Art': find_file('exhibitions---India-Art-Festival'),
    'World-Culture': find_file('exhibitions---Indian-Institute-of-World-Culture')
}

def update_file(filename):
    filepath = os.path.join(base_path, filename)
    if not os.path.exists(filepath): return
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Update Products Section (Hero cards)
    # We look for work-card with "all" in data-category
    for cat, img_file in product_map.items():
        if not img_file: continue
        new_src = f'./images/Home_page/{img_file}'
        
        # Regex to find the <img> tag inside a work-card that has "all" and the category
        pattern = rf'(<div[^>]*data-category="[^"]*all[^"]*{cat}[^"]*"[^>]*>.*?<img[^>]*src=")([^"]+)("[^>]*>)'
        content = re.sub(pattern, rf'\1{new_src}\3', content, flags=re.DOTALL)

    # 2. Update Services Section (for index.html)
    if filename == 'index.html':
        for key, img_file in services_map.items():
            if not img_file: continue
            new_src = f'./images/Home_page/{img_file}'
            # For services, we look for the slide title and update the preceding img
            # Using a simpler string replace for known alt tags or surrounding text
            if key == 'WALLMURALS': content = re.sub(r'(alt="Wall Murals"[^>]*src=")([^"]+)"', rf'\1{new_src}"', content)
            elif key == 'Fabric-Painting': content = re.sub(r'(alt="Fabric Art"[^>]*src=")([^"]+)"', rf'\1{new_src}"', content)
            elif key == 'devotional-art': content = re.sub(r'(alt="Devotional Art"[^>]*src=")([^"]+)"', rf'\1{new_src}"', content)
            elif key == 'texture-art': content = re.sub(r'(alt="Texture Art"[^>]*src=")([^"]+)"', rf'\1{new_src}"', content)
            elif key == 'resin-art-works': content = re.sub(r'(alt="Resin Art"[^>]*src=")([^"]+)"', rf'\1{new_src}"', content)
            elif key == 'landscapes': content = re.sub(r'(alt="Landscapes"[^>]*src=")([^"]+)"', rf'\1{new_src}"', content)
            elif key == 'portraits': content = re.sub(r'(alt="Portraits"[^>]*src=")([^"]+)"', rf'\1{new_src}"', content)
            elif key == 'phone-cases': content = re.sub(r'(alt="Accessories"[^>]*src=")([^"]+)"', rf'\1{new_src}"', content)
            elif key == 'ring-platter': content = re.sub(r'(alt="Ring Platters"[^>]*src=")([^"]+)"', rf'\1{new_src}"', content)
            elif key == 'mini-paintings': content = re.sub(r'(alt="Nameplates"[^>]*src=")([^"]+)"', rf'\1{new_src}"', content)

    # 3. Update Exhibition Highlights (index.html)
    if filename == 'index.html':
        for key, img_file in exhibitions_map.items():
            if not img_file: continue
            new_src = f'./images/Home_page/{img_file}'
            # Match by the title in the exhibit-card
            pattern = rf'(<div class="exhibit-card".*?<h3>[^<]*{key}.*?</h3>.*?<img[^>]*src=")([^"]+)("[^>]*>)'
            # Wait, the img is usually before the title in this layout
            pattern = rf'(<div class="exhibit-card">.*?<img[^>]*src=")([^"]+)("[^>]*>.*?<h3>[^<]*{key}.*?</h3>)'
            content = re.sub(pattern, rf'\1{new_src}\3', content, flags=re.DOTALL)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

update_file('index.html')
update_file('collection.html')

print("Final surgical force update complete. All Home_page assets are now strictly mapped.")
