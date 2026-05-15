import os
import re

# Define the base path
base_path = r'c:\Users\MSI\Downloads\Handcraft-main\Handcraft-main'

def update_file_structure(file_path):
    print(f"Updating structure for {file_path}...")
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    new_content = content
    
    # Update achievements-grid to exhibition-clean-grid ONLY in the exhibitions section
    # We find the section with id="exhibitions"
    
    section_pattern = re.compile(rf'(<div id="exhibitions".*?>.*?<div class=")achievements-grid( four-cols)?(".*?>)(.*?)(</div>\s*</div>)', re.DOTALL | re.IGNORECASE)
    
    def transform_section(match):
        prefix = match.group(1)
        grid_class = "exhibition-clean-grid"
        suffix = match.group(3)
        inner_content = match.group(4)
        closing = match.group(5)
        
        # Now transform cards inside this section
        # achievement-card -> exhibit-card
        # achievement-frame gallery-item -> exhibit-mini-img
        # achievement-info -> exhibit-info-clean
        # exhibition-desc -> (keep as is or update to p)
        
        inner_content = inner_content.replace('achievement-card', 'exhibit-card')
        inner_content = inner_content.replace('achievement-frame gallery-item', 'exhibit-mini-img')
        inner_content = inner_content.replace('achievement-frame', 'exhibit-mini-img')
        inner_content = inner_content.replace('achievement-info', 'exhibit-info-clean')
        
        return f"{prefix}{grid_class}{suffix}{inner_content}{closing}"

    new_content = section_pattern.sub(transform_section, new_content)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

# Update both files
update_file_structure(os.path.join(base_path, 'blog.html'))
update_file_structure(os.path.join(base_path, 'legacy.html'))

print("Successfully updated blog.html and legacy.html with the new exhibition grid structure.")
