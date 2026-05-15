import os

# Define the base path
base_path = r'c:\Users\MSI\Downloads\Handcraft-main\Handcraft-main'

def transform_exhibitions(file_path):
    print(f"Transforming exhibitions in {file_path}...")
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the start and end of the exhibitions section
    start_marker = 'Major Exhibitions'
    # We look for the h2 with this title and then find the grid following it
    
    start_idx = content.find(start_marker)
    if start_idx == -1:
        print(f"Could not find marker 'Major Exhibitions' in {file_path}")
        return

    # Find the grid starting after the title
    grid_start_idx = content.find('<div class="achievements-grid', start_idx)
    if grid_start_idx == -1:
        print(f"Could not find grid after 'Major Exhibitions' in {file_path}")
        return

    # Find the end of this grid
    # We'll look for the next section or footer
    end_marker = '</section>'
    grid_end_idx = content.find(end_marker, grid_start_idx)

    if grid_end_idx == -1:
        grid_end_idx = len(content)

    grid_content = content[grid_start_idx:grid_end_idx]
    
    # Transform classes
    grid_content = grid_content.replace('achievements-grid four-cols', 'exhibition-clean-grid')
    grid_content = grid_content.replace('achievements-grid', 'exhibition-clean-grid')
    grid_content = grid_content.replace('achievement-card', 'exhibit-card')
    grid_content = grid_content.replace('achievement-frame gallery-item', 'exhibit-mini-img')
    grid_content = grid_content.replace('achievement-frame', 'exhibit-mini-img')
    grid_content = grid_content.replace('achievement-info', 'exhibit-info-clean')
    
    new_content = content[:grid_start_idx] + grid_content + content[grid_end_idx:]

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

update_files = ['blog.html', 'legacy.html']
for f in update_files:
    transform_exhibitions(os.path.join(base_path, f))

print("Successfully transformed exhibition sections.")
