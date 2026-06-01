import os
import re

resin_photo_frame_files = [f for f in os.listdir('images/Resin photo frame') if f.endswith(('.jpg', '.png', '.webp', '.jpeg')) and not f.endswith(' - Copy.jpg')]
resin_decor_files = [f for f in os.listdir('images/Resin Decor') if f.endswith(('.jpg', '.png', '.webp', '.jpeg')) and not f.endswith(' - Copy.jpg')]

print("Resin photo frame:", resin_photo_frame_files)
print("Resin Decor:", resin_decor_files)

with open('generate_grids.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace Resin photo frame
content = re.sub(
    r'"Resin photo frame":\s*\[.*?\]',
    f'"Resin photo frame": {str(resin_photo_frame_files)}',
    content
)

# Replace Resin Decor
content = re.sub(
    r'"Resin Decor":\s*\[.*?\]',
    f'"Resin Decor": {str(resin_decor_files)}',
    content
)

with open('generate_grids.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated generate_grids.js")
