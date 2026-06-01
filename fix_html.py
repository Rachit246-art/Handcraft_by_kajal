import os, re
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

def get_cards(folder, cat):
    files = [f for f in os.listdir('images/' + folder) if f.lower().endswith(('.jpg','.jpeg','.png','.webp'))]
    out = ''
    for f in files:
        name = os.path.splitext(f)[0].strip()
        is_gen = bool(re.match(r'^(?:\d{8}_\d{9}_iOS(?: - Copy)?|imag\s*1a|20\d{6}_\d{9}_iOS|DSC_\d+)$', name, re.I))
        if name.endswith('- Copy'): name = name[:-6].strip()
        img_cls = 'img-wrapper square' if folder == 'Resin photo frame' else 'img-wrapper portrait'
        out += f'        <div class="work-card reveal" data-category="{cat}">\n'
        out += f'          <div class="{img_cls}">\n'
        out += f'            <img src="./images/{folder}/{f}" alt="{folder.upper()}S" loading="lazy" />\n'
        out += f'          </div>\n'
        out += f'          <div class="work-info">\n'
        out += f'            <h4>{folder.upper()}S</h4>\n'
        if not is_gen:
            out += f'            <p style="font-size: 0.9rem; color: #888; text-transform: none; margin-top: 0.5rem; line-height: 1.4;">{name}</p>\n'
        out += f'          </div>\n'
        out += f'        </div>\n'
    return out

rf_cards = get_cards('Resin photo frame', 'resindecor')
rd_cards = get_cards('Resin Decor', 'resinart')

rf_start = html.find('<!-- RESIN PHOTO FRAMES -->')
rd_start = html.find('<!-- RESIN DECORS -->')
ta_start = html.find('<!-- TEXTURE ARTS -->')

rf_sec = html[rf_start:rd_start]
rf_header_end = rf_sec.find('<div class="work-card reveal"', rf_sec.find('<div class="work-card reveal"') + 1)
rf_header = rf_sec[:rf_header_end]

rd_sec = html[rd_start:ta_start]
rd_header_end = rd_sec.find('<div class="work-card reveal"', rd_sec.find('<div class="work-card reveal"') + 1)
rd_header = rd_sec[:rd_header_end]

new_html = html[:rf_start] + rf_header + rf_cards + rd_header + rd_cards + html[ta_start:]

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_html)

print('SUCCESS')
