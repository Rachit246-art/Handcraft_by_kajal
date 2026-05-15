import os

# Define the base path
base_path = r'c:\Users\MSI\Downloads\Handcraft-main\Handcraft-main'
events_path = os.path.join(base_path, 'images', 'events')

# Map exhibition titles to folder names and preferred covers
event_data = [
    {
        'title': 'Chitra Kala Parishad',
        'meta': 'CKP Gallery',
        'desc': 'I showcased a collection of my artworks at CKP Gallery, where I had the opportunity to present my artistic style through expressive colors, textures, and storytelling.',
        'folder': 'Chitra Kala Parishad',
        'cover': '20240518_051439514_iOS.jpg'
    },
    {
        'title': 'Chitra Santhe 2024 & 2025',
        'meta': 'Annual Festival',
        'desc': 'I participated in Chitra Santhe for two consecutive years, exhibiting my works alongside artists from across the country. Being part of one of India\'s largest open-air art festivals was a truly inspiring experience.',
        'folder': 'chitrasante',
        'cover': '20240107_075522000_iOS 1.jpg'
    },
    {
        'title': 'India Art Festival – Bengaluru 2024',
        'meta': 'Palace Grounds, Bengaluru',
        'desc': 'I showcased my artworks at the India Art Festival held at Palace Grounds, Bengaluru. The festival brought together artists, collectors, and art enthusiasts, giving me a platform to connect with a diverse creative audience.',
        'folder': 'India art festival',
        'cover': '20241218_133900026_iOS.jpg'
    },
    {
        'title': 'Indian Institute of World Culture, Basavanagudi',
        'meta': 'Basavanagudi',
        'desc': 'At the Indian Institute of World Culture, I exhibited my Ganesha painting, where I expressed spirituality and tradition through my artistic perspective.',
        'folder': 'Indian Institute of World Culture',
        'cover': '20250308_103811683_iOS.jpg'
    },
    {
        'title': 'Venkatappa Art Gallery',
        'meta': 'Gallery Showcase',
        'desc': 'I participated in the Chittara Group Show at Venkatappa Art Gallery, where I showcased my relief artworks and landscape paintings. I also took part in another exhibition there in February, continuing to explore texture, depth, and nature through my work.',
        'folder': 'Venkatappa art gallery',
        'cover': 'WhatsApp Image 2026-05-13 at 1.39.42 PM.jpeg'
    }
]

def get_images(folder_name):
    folder_full_path = os.path.join(events_path, folder_name)
    if not os.path.exists(folder_full_path):
        return []
    valid_extensions = ('.webp', '.png', '.jpg', '.jpeg', '.gif')
    images = [f for f in os.listdir(folder_full_path) if f.lower().endswith(valid_extensions)]
    return sorted(images)

def generate_grid_html(items_list):
    html = '<div class="exhibition-clean-grid">'
    for i, item in enumerate(items_list):
        images = get_images(item['folder'])
        gallery_id = item['folder'].replace(' ', '_').lower()
        cover_src = f"./images/events/{item['folder']}/{item['cover']}"
        
        hidden_imgs = ""
        for img in images:
            hidden_imgs += f'\n            <img src="./images/events/{item["folder"]}/{img}" data-gallery="{gallery_id}" style="display:none;" />'
        
        delay_class = f" anim-delay-{i}" if i > 0 else ""
        html += f"""
        <div class="exhibit-card reveal{delay_class}">
          <div class="exhibit-mini-img">
            <img src="{cover_src}" alt="{item['title']}" data-gallery="{gallery_id}" loading="lazy" />
          </div>
          <div class="exhibit-info-clean">
            <p>{item['meta']}</p>
            <h3>{item['title']}</h3>
            <p class="exhibition-desc">{item['desc']}</p>{hidden_imgs}
          </div>
        </div>"""
    html += '\n      </div>'
    return html

# 1. Update index.html (limit to 4)
grid_html_4 = generate_grid_html(event_data[:4])
with open(os.path.join(base_path, 'index.html'), 'r', encoding='utf-8') as f:
    idx_content = f.read()

import re
idx_content = re.sub(r'<div class="exhibition-clean-grid">.*?</div>\s*</div>', grid_html_4 + '\n      </div>', idx_content, flags=re.DOTALL)
with open(os.path.join(base_path, 'index.html'), 'w', encoding='utf-8') as f:
    f.write(idx_content)

# 2. Update blog.html and legacy.html (all 5)
grid_html_5 = generate_grid_html(event_data)
for fname in ['blog.html', 'legacy.html']:
    with open(os.path.join(base_path, fname), 'r', encoding='utf-8') as f:
        content = f.read()
    content = re.sub(r'<div class="exhibition-clean-grid">.*?</div>\s*</div>', grid_html_5 + '\n      </div>', content, flags=re.DOTALL)
    with open(os.path.join(base_path, fname), 'w', encoding='utf-8') as f:
        f.write(content)

print("Successfully restored and synced all exhibition grids.")
