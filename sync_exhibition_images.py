import os
import re

base_path = r'c:\Users\MSI\Downloads\Handcraft-main\Handcraft-main'
files_to_update = ['blog.html', 'legacy.html']

exhibition_map = {
    'Chitra Kala Parishad': './images/Home_page/home---exhibitions----chitrakala-parishadh.png',
    'Chitra Santhe': './images/Home_page/home---exhibitions----Chitra-Santhe.png',
    'India Art Festival': './images/Home_page/home---exhibitions---India-Art-Festival.png',
    'Indian Institute of World Culture': './images/Home_page/home---exhibitions---Indian-Institute-of-World-Culture.png',
    'Venkatappa Art Gallery': './images/Home_page/home---exhibitions---venkatappa-art-gallery.png'
}

for filename in files_to_update:
    filepath = os.path.join(base_path, filename)
    if not os.path.exists(filepath): continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We look for exhibit-card or similar structures
    # The structure is: 
    # <div class="exhibit-mini-img"><img src="..." alt="EXHIBITION_NAME" ...></div>
    # OR matching by the <h3> tag inside exhibit-info-clean
    
    for name, img_path in exhibition_map.items():
        # Match by <h3> containing the name and find the preceding <img> in exhibit-mini-img
        # Using a regex that finds the card container
        pattern = rf'(<div class="exhibit-card".*?<div class="exhibit-mini-img">.*?<img[^>]*src=")([^"]+)("[^>]*alt="[^"]*{name}[^"]*"[^>]*>)'
        content = re.sub(pattern, rf'\1{img_path}\3', content, flags=re.DOTALL)
        
        # Also update any hidden gallery images that might be using the old cover
        # (Though usually the first one is the cover)
        # Search for <h3>name</h3> then look for images inside the same card
        # This is harder with regex, but let's try a simpler approach for the main image
        
        # Second attempt matching by alt tag if the first one missed
        content = re.sub(rf'(alt="[^"]*{name}[^"]*"[^>]*src=")([^"]+)"', rf'\1{img_path}"', content)
        content = re.sub(rf'(src=")([^"]+)("[^>]*alt="[^"]*{name}[^"]*")', rf'\1{img_path}\3', content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Successfully synchronized exhibition front images across all pages.")
