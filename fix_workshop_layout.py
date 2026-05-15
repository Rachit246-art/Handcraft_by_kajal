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
    html = '<div class="exhibition-clean-grid">'
    for i, item in enumerate(items_list):
        images = get_images(item['folder'])
        gallery_id = item['folder'].replace(' ', '_').lower()
        
        if not images:
            cover_src = "./images/others/placeholder.webp"
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

# Update blog.html
grid_html = generate_workshop_grid(workshop_data)

for fname in ['blog.html', 'legacy.html']:
    with open(os.path.join(base_path, fname), 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We find the id="workshops" section and clean EVERYTHING inside it
    # Pattern matches from the start of #workshops until the end of the category section (before the next section)
    pattern = r'(<div id="workshops" class="blog-category-section">.*?<p.*?>.*?</p>\s*)(.*?)(</div>\s*</div>\s*(</section>|<section))'
    
    # Replacement strictly uses the generated grid and closes the section correctly
    # Note: the double </div> at the end is for .blog-category-section and the container (if applicable)
    
    if 'blog.html' in fname:
        # blog.html structure: <div id="workshops" ...> ... </div> </div> </section>
        replacement = r'\1' + grid_html + '\n        </div>'
        new_content = re.sub(r'(<div id="workshops" class="blog-category-section">.*?)(<section class="section-padding" style="background: #111; border-top: 1px solid #333;">)', r'\1' + grid_html + r'\n        </div>\n      \2', content, flags=re.DOTALL)
    else:
        # legacy.html structure: <section class="workshops-section ..."> ... </section>
        new_content = re.sub(r'(<section class="workshops-section".*?<p.*?>.*?</p>\s*)(.*?)(</section>)', r'\1' + grid_html + r'\n        </div>\n      \3', content, flags=re.DOTALL)

    with open(os.path.join(base_path, fname), 'w', encoding='utf-8') as f:
        f.write(new_content)

print("Cleaned up and fixed workshop layout issues.")
