import os
import re

# Define the base path
base_path = r'c:\Users\MSI\Downloads\Handcraft-main\Handcraft-main'
events_path = os.path.join(base_path, 'images', 'events')

# Map exhibition titles to folder names and cover images
event_data = {
    'Chitra Kala Parishad': {
        'folder': 'Chitra Kala Parishad',
        'cover': './images/events/Chitra Kala Parishad/20240518_051439514_iOS.jpg',
        'id': 'chitra_kala_parishad'
    },
    'Chitra Santhe 2024 & 2025': {
        'folder': 'chitrasante',
        'cover': './images/events/chitrasante/20240107_075522000_iOS 1.jpg',
        'id': 'chitrasante'
    },
    'India Art Festival – Bengaluru 2024': {
        'folder': 'India art festival',
        'cover': './images/events/India art festival/20241218_133900026_iOS.jpg',
        'id': 'india_art_festival'
    },
    'India Art Festival – 2024': { # for legacy.html
        'folder': 'India art festival',
        'cover': './images/events/India art festival/20241218_133900026_iOS.jpg',
        'id': 'india_art_festival'
    },
    'Indian Institute of World Culture': {
        'folder': 'Indian Institute of World Culture',
        'cover': './images/events/Indian Institute of World Culture/20250308_103811683_iOS.jpg',
        'id': 'indian_institute_of_world_culture'
    },
    'Indian Institute of World Culture, Basavanagudi': {
        'folder': 'Indian Institute of World Culture',
        'cover': './images/events/Indian Institute of World Culture/20250308_103811683_iOS.jpg',
        'id': 'indian_institute_of_world_culture'
    },
    'Venkatappa Art Gallery': {
        'folder': 'Venkatappa art gallery',
        'cover': './images/events/Venkatappa art gallery/20240823_091655909_iOS.jpg', # I'll pick one from here
        'id': 'venkatappa_art_gallery'
    }
}

def get_images(folder_name):
    folder_full_path = os.path.join(events_path, folder_name)
    if not os.path.exists(folder_full_path):
        return []
    
    valid_extensions = ('.webp', '.png', '.jpg', '.jpeg', '.gif')
    images = [f for f in os.listdir(folder_full_path) if f.lower().endswith(valid_extensions)]
    return sorted(images)

def update_file(file_path):
    print(f"Updating {file_path}...")
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    new_content = content
    
    # Update each event
    for title, data in event_data.items():
        images = get_images(data['folder'])
        if not images:
            continue
        
        gallery_id = data['id']
        cover_src = data['cover']
        
        hidden_images_html = ""
        for img in images:
            hidden_images_html += f'<img src="./images/events/{data["folder"]}/{img}" data-gallery="{gallery_id}" style="display:none;" />'
        
        # Regex to find the card. Legacy/Blog use achievement-card or similar.
        # We look for the container that has the title.
        # This is more complex because titles vary slightly.
        
        # Pattern: look for a div/section that contains the title
        pattern = re.compile(rf'(<div class="achievement-card reveal.*?>.*?<h3>{re.escape(title)}</h3>.*?)(</div>)', re.DOTALL | re.IGNORECASE)
        
        if not pattern.search(new_content):
            # Try exhibit-card for index (already done but safe)
            pattern = re.compile(rf'(<div class="exhibit-card reveal.*?>.*?<h3>{re.escape(title)}</h3>.*?)(</div>)', re.DOTALL | re.IGNORECASE)

        def add_gallery(match):
            inner_content = match.group(1)
            # Replace the main image src and add data-gallery
            # Find the first img tag and replace its src with cover_src
            inner_content = re.sub(r'(<img .*?src=")(.*?)(".*?/?>)', rf'\1{cover_src}\3', inner_content, count=1)
            # Add data-gallery to that img tag
            inner_content = re.sub(r'(<img .*?)(/?>)', rf'\1 data-gallery="{gallery_id}" \2', inner_content, count=1)
            return inner_content + hidden_images_html + match.group(2)

        new_content = pattern.sub(add_gallery, new_content)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

# Update both files
update_file(os.path.join(base_path, 'legacy.html'))
update_file(os.path.join(base_path, 'blog.html'))

print("Successfully updated legacy.html and blog.html with hidden event gallery images and covers.")
