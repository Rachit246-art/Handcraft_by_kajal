import os
import re

base_path = r'c:\Users\MSI\Downloads\Handcraft-main\Handcraft-main'
collection_file = os.path.join(base_path, 'collection.html')

with open(collection_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Mapping of Hero images for collection.html
hero_mapping = {
    'acrylic': './images/Home page/home---product---Arcylic.png',
    'fabric': './images/Home page/home---product---fabric-painting.png',
    'mini': './images/Home page/home---product----minipaintings.png',
    'phonecases': './images/Home page/home---product---phonecases.png',
    'magnets': './images/Home page/home---product---fridge-magent.png',
    'portraits': './images/Home page/home---product---portraits.png',
    'platter': './images/Home page/home---product---ring-platter.png',
    'resindecor': './images/Home page/home---product---resin-decor.png',
    'resinart': './images/Home page/home---product---resin-artwork.png',
    'texture': './images/Home page/home---product---texture-art.png',
    'invitations': './images/Home page/home---product----wedding-invite.png',
    'mural': './images/Home page/home---product---wall-mural-art.png'
}

# In collection.html, the cards look like:
# <div class="masonry-item work-card reveal portrait" data-category="all acrylic">
#   <div class="img-wrapper"><img src="./images/Acrylic Paintings/20230221_103200186_iOS (1).webp" ...></div>

# We need to:
# 1. Identify which card for each category should be the "Hero" (the first one encountered).
# 2. Update its image to the Home page asset.
# 3. Remove 'all' from all OTHER cards.

lines = content.split('\n')
updated_lines = []
found_heros = set()

# Regex to find data-category
cat_re = re.compile(r'data-category="([^"]+)"')
img_re = re.compile(r'src="([^"]+)"')

for line in lines:
    new_line = line
    match = cat_re.search(line)
    if match:
        cats = match.group(1).split()
        # Find the specific category (not 'all')
        actual_cat = next((c for c in cats if c != 'all'), None)
        
        if actual_cat in hero_mapping:
            if actual_cat not in found_heros:
                # This is the first card of this category - make it the Hero
                found_heros.add(actual_cat)
                # Ensure it has 'all' tag
                if 'all' not in cats:
                    cats.append('all')
                new_line = cat_re.sub(f'data-category="{" ".join(cats)}"', line)
                # Note: We can't easily replace the image in the same line because it might be in the next line
            else:
                # This is NOT the first card - remove 'all' tag
                if 'all' in cats:
                    cats.remove('all')
                new_line = cat_re.sub(f'data-category="{" ".join(cats)}"', line)
                
    updated_lines.append(new_line)

content = '\n'.join(updated_lines)

# Now replace the images for the Hero cards. 
# Since we updated the data-category, we can look for the specific categories that still have 'all'.
# But to be safer, I'll just iterate over the mapping and replace the specific old hero paths with new ones.

old_hero_paths = {
    'acrylic': './images/Acrylic Paintings/20230221_103200186_iOS (1).webp',
    'fabric': './images/Fabric Painting/20240420_061009973_iOS.webp',
    'mini': './images/Mini Paintings/20240819_062133835_iOS.jpg',
    'phonecases': './images/Phone cases/20240212_012658826_iOS (1).webp',
    'magnets': './images/Fridge Magnets/20240207_180239908_iOS (1).webp',
    'portraits': './images/portraits/20240604_042245694_iOS.webp',
    'platter': './images/Reisin platters/20240131_114316000_iOS.webp',
    'resindecor': './images/Resin Decor/20251123_041130637_iOS.webp',
    'resinart': './images/Resin Artworks/20251219_100344000_iOS.webp',
    'texture': './images/Texture Art/20251206_090547000_iOS.webp',
    'invitations': './images/others/20220617_005101000_iOS.webp',
    'mural': './images/Wall Mural Art/PXL_20250503_122828215.webp'
}

for cat, old_path in old_hero_paths.items():
    new_path = hero_mapping[cat]
    content = content.replace(old_path, new_path)

with open(collection_file, 'w', encoding='utf-8') as f:
    f.write(content)

print("Successfully updated collection.html to show only hero images in 'All' view.")
