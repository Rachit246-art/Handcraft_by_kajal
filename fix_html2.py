import os, re
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

def get_cards(folder, cat, is_square=False, title=''):
    if not title: title = folder.upper() + 'S'
    files = [f for f in os.listdir('images/' + folder) if f.lower().endswith(('.jpg','.jpeg','.png','.webp'))]
    out = ''
    for f in files:
        name = os.path.splitext(f)[0].strip()
        is_gen = bool(re.match(r'^(?:\d{8}_\d{9}_iOS(?: - Copy)?|imag\s*1a|20\d{6}_\d{9}_iOS|DSC_\d+)$', name, re.I))
        if name.endswith('- Copy'): name = name[:-6].strip()
        img_cls = 'img-wrapper square' if is_square else 'img-wrapper portrait'
        out += f'        <div class="work-card reveal" data-category="{cat}">\n'
        out += f'          <div class="{img_cls}">\n'
        out += f'            <img src="./images/{folder}/{f}" alt="{title}" loading="lazy" />\n'
        out += f'          </div>\n'
        out += f'          <div class="work-info">\n'
        out += f'            <h4>{title}</h4>\n'
        if not is_gen:
            out += f'            <p style="font-size: 0.9rem; color: #888; text-transform: none; margin-top: 0.5rem; line-height: 1.4;">{name}</p>\n'
        out += f'          </div>\n'
        out += f'        </div>\n'
    return out

fab_cards = get_cards('Fabric Painting', 'fabric', False, 'FABRIC PAINTINGS')
tex_cards = get_cards('Texture Art', 'texture', False, 'TEXTURE ARTS')

fab_start = html.find('<!-- FABRIC PAINTINGS -->')
fab_end = html.find('<!-- MINI PAINTINGS -->')

tex_start = html.find('<!-- TEXTURE ARTS -->')
tex_end = html.find('<!-- WEDDING INVITATIONS -->')

if fab_start == -1 or fab_end == -1 or tex_start == -1 or tex_end == -1:
    print('Failed to find sections')
    exit(1)

fab_sec = html[fab_start:fab_end]
fab_header_end = fab_sec.find('<div class="work-card reveal"', fab_sec.find('<div class="work-card reveal"') + 1)
fab_header = fab_sec[:fab_header_end]

tex_sec = html[tex_start:tex_end]
tex_header_end = tex_sec.find('<div class="work-card reveal"', tex_sec.find('<div class="work-card reveal"') + 1)
tex_header = tex_sec[:tex_header_end]

new_html = html[:fab_start] + fab_header + fab_cards + html[fab_end:tex_start] + tex_header + tex_cards + html[tex_end:]

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_html)

print('SUCCESS')
