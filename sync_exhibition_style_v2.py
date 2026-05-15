import os

# Define the base path
base_path = r'c:\Users\MSI\Downloads\Handcraft-main\Handcraft-main'

def transform_exhibitions(file_path):
    print(f"Transforming exhibitions in {file_path}...")
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the start and end of the exhibitions section
    start_marker = '<div id="exhibitions"'
    # Assuming the section ends before workshops or at some other point
    # We can use the next id as a marker
    end_marker = '<div id="workshops"'
    if end_marker not in content:
        end_marker = '</main>'

    start_idx = content.find(start_marker)
    end_idx = content.find(end_marker, start_idx)

    if start_idx == -1 or end_idx == -1:
        print(f"Could not find markers in {file_path}")
        return

    section_content = content[start_idx:end_idx]
    
    # Transform classes
    section_content = section_content.replace('achievements-grid four-cols', 'exhibition-clean-grid')
    section_content = section_content.replace('achievements-grid', 'exhibition-clean-grid')
    section_content = section_content.replace('achievement-card', 'exhibit-card')
    section_content = section_content.replace('achievement-frame gallery-item', 'exhibit-mini-img')
    section_content = section_content.replace('achievement-frame', 'exhibit-mini-img')
    section_content = section_content.replace('achievement-info', 'exhibit-info-clean')
    section_content = section_content.replace('achievement-link', 'achievement-link-legacy') # hide legacy links if any
    
    new_content = content[:start_idx] + section_content + content[end_idx:]

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

update_files = ['blog.html', 'legacy.html']
for f in update_files:
    transform_exhibitions(os.path.join(base_path, f))

print("Successfully transformed exhibition sections.")
