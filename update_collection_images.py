import os
import re

# Define the base path
base_path = r'c:\Users\MSI\Downloads\Handcraft-main\Handcraft-main'
images_path = os.path.join(base_path, 'images')

# Define categories and their corresponding folders and descriptions
categories = {
    'acrylic': {
        'folder': 'Acrylic Paintings',
        'title': 'ACRYLIC PAINTING',
        'desc': 'VIBRANT',
        'wrapper': 'portrait'
    },
    'fabric': {
        'folder': 'Fabric Painting',
        'title': 'FABRIC PAINTING',
        'desc': 'ARTISTIC DESIGN',
        'wrapper': 'square'
    },
    'mini': {
        'folder': 'Mini Paintings',
        'title': 'MINI PAINTING',
        'desc': 'DÉCOR',
        'wrapper': 'portrait'
    },
    'phonecases': {
        'folder': 'Phone Cases',
        'title': 'HANDCRAFTED PHONE CASE',
        'desc': 'CUSTOM ART',
        'wrapper': ''
    },
    'magnets': {
        'folder': 'Fridge Magnets',
        'title': 'FRIDGE MAGNET',
        'desc': 'MINI ART',
        'wrapper': ''
    },
    'portraits': {
        'folder': 'portraits',
        'title': 'CUSTOM PORTRAIT',
        'desc': 'PERSONALIZED',
        'wrapper': 'portrait'
    },
    'platter': {
        'folder': 'Ring Platter',
        'title': 'RESIN RING PLATTER',
        'desc': 'LUXURY',
        'wrapper': ''
    },
    'resindecor': {
        'folder': 'Resin Decor',
        'title': 'RESIN DECOR',
        'desc': 'MODERN ART',
        'wrapper': ''
    },
    'resinart': {
        'folder': 'Resin Artworks',
        'title': 'RESIN COASTER',
        'desc': 'PREMIUM',
        'wrapper': ''
    },
    'texture': {
        'folder': 'Texture Art',
        'title': 'RELIEF ART WORK',
        'desc': 'TEXTURE / DEPTH',
        'wrapper': ''
    },
    'invitations': {
        'folder': 'Wedding invitations',
        'title': 'WEDDING INVITATION',
        'desc': 'CUSTOM DESIGN',
        'wrapper': ''
    },
    'mural': {
        'folder': 'Wall Mural Art',
        'title': 'WALL MURAL ART',
        'desc': 'STATEMENT ART',
        'wrapper': ''
    }
}

def get_images(folder_name):
    folder_full_path = os.path.join(images_path, folder_name)
    if not os.path.exists(folder_full_path):
        return []
    
    valid_extensions = ('.webp', '.png', '.jpg', '.jpeg', '.gif')
    images = [f for f in os.listdir(folder_full_path) if f.lower().endswith(valid_extensions)]
    return sorted(images)

new_grid_content = []

for cat_id, info in categories.items():
    images = get_images(info['folder'])
    if not images:
        continue
    
    new_grid_content.append(f"          <!-- {info['title']} -->")
    
    for img in images:
        img_src = f"./images/{info['folder']}/{img}"
        
        wrapper_class = info['wrapper']
        masonry_item_class = f"masonry-item work-card reveal {wrapper_class}".strip()
        
        # EVERY card needs "all"
        card_html = f"""          <div class="{masonry_item_class}" data-category="all {cat_id}">
            <div class="img-wrapper"><img src="{img_src}" alt="{info['title']}" loading="lazy"></div>
            <div class="work-info"><h4>{info['title']}</h4><p>{info['desc']}</p></div>
          </div>\n"""
        new_grid_content.append(card_html)

# Read the original collection.html
collection_html_path = os.path.join(base_path, 'collection.html')
with open(collection_html_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find and replace the masonry-grid content
pattern = re.compile(r'(<div class="masonry-grid">)(.*?)(</div>\s+</section>)', re.DOTALL)

updated_content = pattern.sub(r'\1\n' + ''.join(new_grid_content) + r'\3', content)

with open(collection_html_path, 'w', encoding='utf-8') as f:
    f.write(updated_content)

print("Successfully updated collection.html with ALL folder-based images.")
