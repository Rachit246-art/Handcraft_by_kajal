import os
import re

# Define the base path
base_path = r'c:\Users\MSI\Downloads\Handcraft-main\Handcraft-main'
images_path = os.path.join(base_path, 'images')

# Define categories and their corresponding folders and descriptions
categories = {
    'acrylic': {
        'folder': 'Acrylic Paintings',
        'title': 'ACRYLIC PAINTINGS',
        'desc': 'Vibrant handcrafted artworks created with rich textures and colors.',
        'wrapper': 'portrait'
    },
    'fabric': {
        'folder': 'Fabric Painting',
        'title': 'FABRIC PAINTINGS',
        'desc': 'Artistic designs painted on fabric, blending creativity with wearable and decorative art.',
        'wrapper': 'square'
    },
    'mini': {
        'folder': 'Mini Paintings',
        'title': 'MINI PAINTINGS',
        'desc': 'Small yet expressive artworks that capture beauty in compact forms.',
        'wrapper': 'portrait'
    },
    'phonecases': {
        'folder': 'Phone Cases',
        'title': 'PHONE CASES',
        'desc': 'Custom Hand painted artistic phone cases designed to add personality and creativity to everyday essentials.',
        'wrapper': 'square'
    },
    'magnets': {
        'folder': 'Fridge Magnets',
        'title': 'FRIDGE MAGNETS',
        'desc': 'Handcrafted miniature art pieces that bring charm and creativity to spaces.',
        'wrapper': 'square'
    },
    'portraits': {
        'folder': 'portraits',
        'title': 'PORTRAITS',
        'desc': 'Personalized portraits crafted to preserve emotions, memories, and individuality.',
        'wrapper': 'portrait'
    },
    'platter': {
        'folder': 'Ring Platter',
        'title': 'RING PLATTER',
        'desc': 'Elegant handcrafted platters designed to beautifully present rings and special moments.',
        'wrapper': 'square'
    },
    'resindecor': {
        'folder': 'Resin Decor',
        'title': 'RESIN DECOR',
        'desc': 'Unique resin-crafted décor pieces combining modern aesthetics with artistic detail.',
        'wrapper': 'square'
    },
    'resinart': {
        'folder': 'Resin Artworks',
        'title': 'RESIN ARTWORKS',
        'desc': 'Fluid and glossy resin creations inspired by texture, depth, and imagination.',
        'wrapper': 'square'
    },
    'texture': {
        'folder': 'Texture Art',
        'title': 'TEXTURE ART',
        'desc': 'Dimensional artworks that bring depth, movement, and emotion through layered textures.',
        'wrapper': 'square'
    },
    'invitations': {
        'folder': 'Wedding invitations',
        'title': 'WEDDING INVITATIONS',
        'desc': 'Customized artistic invitations designed to make every celebration feel timeless and personal.',
        'wrapper': 'square'
    },
    'mural': {
        'folder': 'Wall Mural Art',
        'title': 'WALL MURAL ART',
        'desc': 'Statement art pieces created to transform spaces with beauty, emotion, and character.',
        'wrapper': 'square'
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
    
    new_grid_content.append(f"        <!-- {info['title']} -->")
    
    for i, img in enumerate(images):
        img_src = f"./images/{info['folder']}/{img}"
        
        # Logic change: Only the FIRST image of each category gets the "all" tag.
        # All images get their specific category tag.
        if i == 0:
            data_category = f"all {cat_id}"
        else:
            data_category = cat_id
        
        card_html = f"""        <div class="work-card reveal" data-category="{data_category}">
          <div class="img-wrapper {info['wrapper']}">
            <img src="{img_src}" alt="{info['title']}" loading="lazy" />
          </div>
          <div class="work-info">
            <h4>{info['title']}</h4>"""
        
        if i == 0:
            card_html += f"""
            <p style="font-size: 0.9rem; color: #888; text-transform: none; margin-top: 0.5rem; line-height: 1.4;">{info['desc']}</p>"""
        
        card_html += """
          </div>
        </div>\n"""
        new_grid_content.append(card_html)

# Read the original index.html
index_html_path = os.path.join(base_path, 'index.html')
with open(index_html_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find and replace the work-grid content
pattern = re.compile(r'(<div class="work-grid">)(.*?)(</div>\s+<div class="text-center mt-8")', re.DOTALL)

updated_content = pattern.sub(r'\1\n' + ''.join(new_grid_content) + r'\3', content)

with open(index_html_path, 'w', encoding='utf-8') as f:
    f.write(updated_content)

print("Successfully updated index.html: 'All Creations' now shows 1 image per category.")
