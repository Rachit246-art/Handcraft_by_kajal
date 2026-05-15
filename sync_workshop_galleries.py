import os
import re

# Define the base path
base_path = r'c:\Users\MSI\Downloads\Handcraft-main\Handcraft-main'
workshops_path = os.path.join(base_path, 'images', 'Workshops')

# Map workshop titles to folder names
workshop_data = [
    {
        'title': 'Resin Art Workshops',
        'meta': 'Foundation & Advanced',
        'desc': 'Curated for beginners and advanced learners, covering foundational techniques and customized product sessions.',
        'folder': 'Resin worksop'
    },
    {
        'title': 'Fluid Art Workshops',
        'meta': 'Interactive Sessions',
        'desc': 'Engaging workshops for kids and adults through camps, schools, and group sessions encouraging self-expression.',
        'folder': 'Fluid art workshop'
    },
    {
        'title': 'Texture Art Workshops',
        'meta': 'Modern & Aesthetic',
        'desc': 'Guiding participants in creating dimensional artworks using texture techniques and mixed media elements.',
        'folder': 'texture painting'
    },
    {
        'title': 'Christmas Kids DIY Workshops',
        'meta': 'Festive Fun',
        'desc': 'Festive crafts, handmade décor, and interactive activities designed to inspire imagination and joyful learning.',
        'folder': 'DIY CHRIStmass'
    },
    {
        'title': 'Hospital Coaster Workshop',
        'meta': 'Sustainability Project',
        'desc': 'A creative upcycling workshop with Manipal Hospitals, transforming newspapers into handcrafted coasters.',
        'folder': 'Manipal Hospital Newspaper Coaster Workshop'
    }
]

def get_images(folder_name):
    folder_full_path = os.path.join(workshops_path, folder_name)
    if not os.path.exists(folder_full_path):
        return []
    valid_extensions = ('.webp', '.png', '.jpg', '.jpeg', '.gif', '.JPG')
    images = [f for f in os.listdir(folder_full_path) if f.lower().endswith(valid_extensions)]
    return sorted(list(set(images)))

def generate_workshop_grid(items_list):
    # We use exhibition-clean-grid for the same professional look
    html = '<div class="exhibition-clean-grid">'
    for i, item in enumerate(items_list):
        images = get_images(item['folder'])
        gallery_id = item['folder'].replace(' ', '_').lower()
        
        if not images:
            cover_src = "./images/others/placeholder.webp" # Fallback
            hidden_imgs = ""
        else:
            cover_src = f"./images/Workshops/{item['folder']}/{images[0]}"
            hidden_imgs = ""
            for img in images:
                hidden_imgs += f'\n            <img src="./images/Workshops/{item["folder"]}/{img}" data-gallery="{gallery_id}" style="display:none;" />'
        
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

# Update blog.html and legacy.html
grid_html = generate_workshop_grid(workshop_data)

for fname in ['blog.html', 'legacy.html']:
    with open(os.path.join(base_path, fname), 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Pattern for the workshops section container
    pattern = r'(<div id="workshops".*?<h2.*?>Art Workshops</h2>.*?<p.*?>.*?</p>\s*)(<div class="(achievements-grid|exhibition-clean-grid)".*?</div>)'
    
    replacement = r'\1' + grid_html
    new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)
    
    with open(os.path.join(base_path, fname), 'w', encoding='utf-8') as f:
        f.write(new_content)

print("Successfully synced workshop galleries and updated structure.")
