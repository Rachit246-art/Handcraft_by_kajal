import os, re

with open('collection.html', 'r', encoding='utf-8') as f:
    html = f.read()

def rebuild_collection_section(html, start_comment, end_comment, folder, cat, shape, h4_title, subtitle):
    """Rebuild a collection.html section using actual files on disk."""
    start = html.find(start_comment)
    end = html.find(end_comment, start + len(start_comment))
    if start == -1 or end == -1:
        print(f'ERROR: Could not find markers for {folder}  start={start} end={end}')
        return html

    section = html[start:end]
    first = section.find('<div class="masonry-item work-card reveal')
    second = section.find('<div class="masonry-item work-card reveal', first + 1)
    header = section[:second]   # keep header card + comment

    files = sorted([f for f in os.listdir('images/' + folder)
                    if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp', '.gif'))])

    generic_pat = re.compile(
        r'^(?:\d{8}_\d{9}_iOS(?: - Copy)?|imag\s*1a|20\d{6}_\d{9}_iOS(?: - Copy)?|DSC_\d+)$', re.I)

    shape_cls = f' {shape}' if shape else ''
    new_cards = ''
    for f in files:
        name = os.path.splitext(f)[0].strip()
        is_gen = bool(generic_pat.match(name))
        new_cards += f'          <div class="masonry-item work-card reveal{shape_cls}" data-category="{cat}">\n'
        new_cards += f'            <div class="img-wrapper"><img src="./images/{folder}/{f}" alt="{h4_title}" loading="lazy"></div>\n'
        new_cards += f'            <div class="work-info">\n'
        new_cards += f'              <h4>{h4_title}</h4>\n'
        if not is_gen:
            display = name.replace('- Copy', '').strip()
            # We add a custom class or inline style that mirrors the index.html subtitle style
            new_cards += f'              <p style="font-size: 0.9rem; color: #888; text-transform: none; margin-top: 0.5rem; line-height: 1.4;">{display}</p>\n'
        else:
            new_cards += f'              <p>{subtitle}</p>\n'
        new_cards += f'            </div>\n'
        new_cards += f'          </div>\n'

    return html[:start] + header + new_cards + html[end:]

# Fix Mini Paintings  (start_comment --> end_comment)
html = rebuild_collection_section(
    html,
    '<!-- MINI PAINTING -->',
    '<!-- HANDCRAFTED PHONE CASE -->',
    'Mini Paintings', 'mini', 'portrait', 'MINI PAINTING', 'DÉCOR'
)

# Fix Resin Decor
html = rebuild_collection_section(
    html,
    '<!-- RESIN DECOR -->',
    '<!-- TEXTURE ART -->',
    'Resin Decor', 'resinart', '', 'RESIN DECOR', 'PREMIUM'
)

# Fix Resin Photo Frame
html = rebuild_collection_section(
    html,
    '<!-- RESIN PHOTO FRAME -->',
    '<!-- RESIN DECOR -->',
    'Resin photo frame', 'resindecor', 'square', 'RESIN PHOTO FRAME', 'UNIQUE DÉCOR'
)

with open('collection.html', 'w', encoding='utf-8') as f:
    f.write(html)

print('SUCCESS - collection.html synced with disk images')
