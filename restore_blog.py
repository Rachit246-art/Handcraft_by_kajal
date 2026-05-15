import os
import re

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
    valid_extensions = ('.webp', '.png', '.jpg', '.jpeg', '.gif', '.JPG')
    images = [f for f in os.listdir(folder_full_path) if f.lower().endswith(valid_extensions)]
    return sorted(list(set(images)))

def generate_exhibition_grid(items_list):
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

# Correct content for Achievements and Workshops
achievements_html = """
        <div id="achievements" class="blog-category-section">
          <h2 class="blog-category-title">Our Achievements</h2>
          <p style="color: #888; margin-bottom: 4rem; font-size: 1.1rem; text-align: center;">Recognized for soulful artistry across leading platforms.</p>
          <div class="achievements-grid">
            <div onclick="openVideoModal('dQw4w9WgXcQ')" class="achievement-card reveal" style="cursor: pointer;">
              <div class="achievement-frame">
                <img src="./images/top icon 1.webp" alt="Your story" loading="lazy" />
              </div>
              <div class="achievement-info">
                <p>Featured Story</p>
                <h3>Your story</h3>
                <span class="achievement-link">Watch Story ↗</span>
              </div>
            </div>

            <div onclick="openVideoModal('dQw4w9WgXcQ')" class="achievement-card reveal" style="cursor: pointer;">
              <div class="achievement-frame">
                <img src="./images/top icon 2.webp" alt="Enadu Teleugu" loading="lazy" />
              </div>
              <div class="achievement-info">
                <p>Media Spotlight</p>
                <h3>Enadu Teleugu</h3>
                <span class="achievement-link">Watch Now ↗</span>
              </div>
            </div>

            <a href="https://www.google.com" target="_blank" class="achievement-card reveal" style="text-decoration: none; display: block;">
              <div class="achievement-frame">
                <img src="./images/top icon 3.webp" alt="News 1 - Kannada" loading="lazy" />
              </div>
              <div class="achievement-info">
                <p>Press Feature</p>
                <h3>News 1 - Kannada</h3>
                <span class="achievement-link">Read News ↗</span>
              </div>
            </a>
          </div>
        </div>"""

workshops_html = """
        <div id="workshops" class="blog-category-section">
          <h2 class="blog-category-title">Art Workshops</h2>
          <p style="color: #888; margin-bottom: 4rem; font-size: 1.1rem; text-align: center;">Spreading the joy of handcrafting through guided masterclasses and sessions.</p>
          <div class="achievements-grid">
            <div class="achievement-card reveal">
              <div class="achievement-frame">
                <img src="./images/Reisin platters/20251208_083446201_iOS.webp" alt="Resin Art Workshop" loading="lazy" />
              </div>
              <div class="achievement-info">
                <p>Foundation & Advanced</p>
                <h3>Resin Art Workshops</h3>
                <p class="exhibition-desc">Curated for beginners and advanced learners, covering foundational techniques and customized product sessions.</p>
              </div>
            </div>

            <div class="achievement-card reveal">
              <div class="achievement-frame">
                <img src="./images/others/20241121_121710712_iOS.webp" alt="Fluid Art Workshop" loading="lazy" />
              </div>
              <div class="achievement-info">
                <p>Interactive Sessions</p>
                <h3>Fluid Art Workshops</h3>
                <p class="exhibition-desc">Engaging workshops for kids and adults through camps, schools, and group sessions encouraging self-expression.</p>
              </div>
            </div>
          </div>
        </div>"""

exhibitions_html = f"""
        <div id="exhibitions" class="blog-category-section">
          <h2 class="blog-category-title">Major Exhibitions</h2>
          <p style="color: #888; margin-bottom: 4rem; font-size: 1.1rem; text-align: center;">Showcasing handcrafted collections at prestigious art venues across the country.</p>
          {generate_exhibition_grid(event_data)}
        </div>"""

# Reconstruct blog.html
with open(os.path.join(base_path, 'blog.html'), 'r', encoding='utf-8') as f:
    content = f.read()

# We find the start of the category sections (after the tags)
pattern = r'(<section class="section-padding" style="padding-top: 6rem; background: #121212;">\s*<div class="mb-8 flex".*?</div>)(.*?)(<section class="section-padding" style="background: #111; border-top: 1px solid #333;">)'
full_sections = f"\n{achievements_html}\n{exhibitions_html}\n{workshops_html}\n      "

new_content = re.sub(pattern, r'\1' + full_sections + r'\3', content, flags=re.DOTALL)

with open(os.path.join(base_path, 'blog.html'), 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Successfully restored blog.html sections.")
