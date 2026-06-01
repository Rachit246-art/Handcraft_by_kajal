import os, re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

def rebuild_section(html, start_marker, end_marker, folder, cat, is_square, h4_title):
    start = html.find(start_marker)
    end = html.find(end_marker)
    if start == -1 or end == -1:
        print(f'ERROR: Could not find markers for {folder}')
        return html

    section = html[start:end]
    # The first work-card is the "header" card with all/home_page image - keep it
    first_card = section.find('<div class="work-card reveal"')
    second_card = section.find('<div class="work-card reveal"', first_card + 1)
    header = section[:second_card]  # keep everything up to the second card

    # Get actual files on disk
    files = sorted([f for f in os.listdir('images/' + folder)
                    if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp', '.gif'))])

    img_cls = 'img-wrapper square' if is_square else 'img-wrapper portrait'
    generic_pat = re.compile(
        r'^(?:\d{8}_\d{9}_iOS(?: - Copy)?|imag\s*1a|20\d{6}_\d{9}_iOS|DSC_\d+)$', re.I)

    new_cards = ''
    for f in files:
        name = os.path.splitext(f)[0].strip()
        is_gen = bool(generic_pat.match(name))
        display_name = name.replace('- Copy', '').strip()
        new_cards += f'        <div class="work-card reveal" data-category="{cat}">\n'
        new_cards += f'          <div class="{img_cls}">\n'
        new_cards += f'            <img src="./images/{folder}/{f}" alt="{h4_title}" loading="lazy" />\n'
        new_cards += f'          </div>\n'
        new_cards += f'          <div class="work-info">\n'
        new_cards += f'            <h4>{h4_title}</h4>\n'
        if not is_gen:
            new_cards += f'            <p style="font-size: 0.9rem; color: #888; text-transform: none; margin-top: 0.5rem; line-height: 1.4;">{display_name}</p>\n'
        new_cards += f'          </div>\n'
        new_cards += f'        </div>\n'

    return html[:start] + header + new_cards + html[end:]

# Rebuild Resin Decors
html = rebuild_section(html,
    '<!-- RESIN DECORS -->', '<!-- TEXTURE ARTS -->',
    'Resin Decor', 'resinart', False, 'RESIN DECORS')

# Rebuild Mini Paintings
# Find the next section after Mini Paintings
mp_start = html.find('<!-- MINI PAINTINGS -->')
# Find end marker - next section comment
mp_end_candidates = []
for marker in ['<!-- ACRYLIC', '<!-- PORTRAITS', '<!-- PHONE', '<!-- FABRIC', '<!-- RESIN', '<!-- TEXTURE', '<!-- WALL', '<!-- WEDDING', '<!-- FRIDGE']:
    idx = html.find(marker, mp_start + 20)
    if idx != -1:
        mp_end_candidates.append(idx)
mp_end_marker_pos = min(mp_end_candidates)
mp_end_text = html[mp_end_marker_pos:mp_end_marker_pos+30]
print(f'Mini paintings ends at marker: {mp_end_text[:25]}')

html = rebuild_section(html,
    '<!-- MINI PAINTINGS -->', mp_end_text[:25],
    'Mini Paintings', 'mini', False, 'MINI PAINTINGS')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print('SUCCESS - HTML updated with current disk images')
