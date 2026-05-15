import os
import re

def update_gallery():
    gallery_path = 'gallery.html'
    with open(gallery_path, 'r', encoding='utf-8') as f:
        content = f.read()

    gallery_additions_dir = os.path.join('images', 'gallery addition')
    if os.path.exists(gallery_additions_dir):
        new_images = [img for img in os.listdir(gallery_additions_dir) if img.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))]
        new_items_html = ''
        for img in new_images:
            new_items_html += f'            <div class="gallery-item"><img src="./images/gallery addition/{img}" alt="Art Work" loading="lazy" /></div>\n'
        
        # Insert before the last </div> before </section>
        # Let's find the closing section of the gallery grid.
        # In gallery.html:
        #             <div class="gallery-item"><img src="./images/Gallery/20251223_110255064_iOS (1).webp" alt="Art Work" loading="lazy" /></div>
        #         </div>
        #       </section>
        
        pattern = r'(<div class="gallery-item">.*?</div>\s*)(</div>\s*</section>)'
        
        def inject_gallery(match):
            return match.group(1) + new_items_html + match.group(2)
            
        content = re.sub(pattern, inject_gallery, content, flags=re.DOTALL)
        
        with open(gallery_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Added {len(new_images)} images to gallery.html')

def update_collection():
    collection_path = 'collection.html'
    with open(collection_path, 'r', encoding='utf-8') as f:
        content = f.read()

    acrylic_dir = os.path.join('images', 'Acrylic Paintings')
    if os.path.exists(acrylic_dir):
        acrylic_images = [img for img in os.listdir(acrylic_dir) if img.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))]
        
        parts = content.split('data-category="all acrylic"')
        if len(parts) == 2:
            before_all = parts[0]
            rest = parts[1]
            
            end_all_idx = rest.find('</div>\n          <div class="masonry-item')
            if end_all_idx == -1:
                end_all_idx = rest.find('</div>\n          <!--')
                
            all_block = rest[:end_all_idx + 6]
            after_all = rest[end_all_idx + 6:]
            
            # remove old acrylic
            clean_after = re.sub(r'\s*<div class="masonry-item work-card reveal [^"]*" data-category="acrylic">.*?(?=</div>\s*<div class="masonry-item|</div>\s*<!--|</div>\s*</div>)', '', after_all, flags=re.DOTALL)
            
            new_acrylic_html = ''
            for img in acrylic_images:
                new_acrylic_html += f'''          <div class="masonry-item work-card reveal portrait" data-category="acrylic">
            <div class="img-wrapper"><img src="./images/Acrylic Paintings/{img}" alt="ACRYLIC PAINTING" loading="lazy"></div>
            <div class="work-info"><h4>ACRYLIC PAINTING</h4><p>VIBRANT</p></div>
          </div>\n'''
              
            new_content = before_all + 'data-category="all acrylic"' + all_block + '\n' + new_acrylic_html + clean_after
            
            with open(collection_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f'Added {len(acrylic_images)} acrylic images to collection.html')

def update_index():
    index_path = 'index.html'
    with open(index_path, 'r', encoding='utf-8') as f:
        content = f.read()

    acrylic_dir = os.path.join('images', 'Acrylic Paintings')
    if os.path.exists(acrylic_dir):
        acrylic_images = [img for img in os.listdir(acrylic_dir) if img.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))]
        
        parts = content.split('data-category="all acrylic"')
        if len(parts) == 2:
            before_all = parts[0]
            rest = parts[1]
            
            end_all_idx = rest.find('</div>\n        <div class="work-card')
            if end_all_idx == -1:
                end_all_idx = rest.find('</div>\n        <!--')
                
            all_block = rest[:end_all_idx + 6]
            after_all = rest[end_all_idx + 6:]
            
            clean_after = re.sub(r'\s*<div class="work-card reveal" data-category="acrylic">.*?(?=</div>\s*<div class="work-card|</div>\s*<!--|</div>\s*</div>)', '', after_all, flags=re.DOTALL)
            
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
            
            new_content = before_all + 'data-category="all acrylic"' + all_block + '\n' + new_acrylic_html + clean_after
            
            with open(index_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f'Added {len(acrylic_images)} acrylic images to index.html')

if __name__ == "__main__":
    update_gallery()
    update_collection()
    update_index()
