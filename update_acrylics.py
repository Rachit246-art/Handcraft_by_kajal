import os
import re

def update_collection():
    with open('collection.html', 'r', encoding='utf-8') as f:
        content = f.read()

    acrylic_dir = os.path.join('images', 'Acrylic Paintings')
    if not os.path.exists(acrylic_dir): return
    
    acrylic_images = [img for img in os.listdir(acrylic_dir) if img.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))]
    
    new_acrylic_html = ''
    for img in acrylic_images:
        new_acrylic_html += f'''          <div class="masonry-item work-card reveal portrait" data-category="acrylic">
            <div class="img-wrapper"><img src="./images/Acrylic Paintings/{img}" alt="ACRYLIC PAINTING" loading="lazy"></div>
            <div class="work-info"><h4>ACRYLIC PAINTING</h4><p>VIBRANT</p></div>
          </div>\n'''

    # Using regex to replace the entire block between the end of "all acrylic" and "<!-- FABRIC PAINTING -->"
    # In collection.html:
    #           <div class="masonry-item work-card reveal portrait" data-category="all acrylic">
    #             ...
    #           </div>
    #           <div class="masonry-item work-card reveal portrait" data-category="acrylic">
    #             ...
    #           <!-- FABRIC PAINTING -->
    
    pattern = r'(<div class="masonry-item work-card reveal portrait" data-category="all acrylic">.*?</div>\n)\s*<div class="masonry-item work-card reveal portrait" data-category="acrylic">.*?(?=\s*<!-- FABRIC PAINTING -->)'
    
    def replacer(match):
        return match.group(1) + new_acrylic_html
        
    new_content, count = re.subn(pattern, replacer, content, flags=re.DOTALL)
    if count > 0:
        with open('collection.html', 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("Updated collection.html")
    else:
        print("Regex failed for collection.html")

def update_index():
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    acrylic_dir = os.path.join('images', 'Acrylic Paintings')
    if not os.path.exists(acrylic_dir): return
    
    acrylic_images = [img for img in os.listdir(acrylic_dir) if img.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))]
    
    new_acrylic_html = ''
    for img in acrylic_images:
        new_acrylic_html += f'''        <div class="work-card reveal" data-category="acrylic">
          <div class="img-wrapper portrait">
            <img src="./images/Acrylic Paintings/{img}" alt="ACRYLIC PAINTINGS" loading="lazy" />
          </div>
          <div class="work-info">
            <h4>ACRYLIC PAINTINGS</h4>
          </div>
        </div>\n'''

    pattern = r'(<div class="work-card reveal" data-category="all acrylic">.*?</div>\n)\s*<div class="work-card reveal" data-category="acrylic">.*?(?=\s*<!-- FABRIC PAINTINGS -->)'
    
    def replacer(match):
        return match.group(1) + new_acrylic_html
        
    new_content, count = re.subn(pattern, replacer, content, flags=re.DOTALL)
    if count > 0:
        with open('index.html', 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("Updated index.html")
    else:
        print("Regex failed for index.html")

if __name__ == "__main__":
    update_collection()
    update_index()
