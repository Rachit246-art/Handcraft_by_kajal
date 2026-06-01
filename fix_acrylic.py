import os, re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# ---- Fix 1: Check the JS variable name ----
js_var_check = html[html.find('function updateProductDesc'):html.find('function updateProductDesc')+300]
print("JS function snippet:")
print(js_var_check)

# ---- Fix 2: Rebuild ACRYLIC PAINTINGS with subtitles ----
start_marker = '<!-- ACRYLIC PAINTINGS -->'
end_marker = '<!-- FABRIC PAINTINGS -->'
start = html.find(start_marker)
end = html.find(end_marker, start)
if start == -1 or end == -1:
    print(f'ERROR: markers not found. start={start} end={end}')
    exit()

section = html[start:end]
# Find end of header card
first = section.find('<div class="work-card reveal"')
second = section.find('<div class="work-card reveal"', first + 1)
header = section[:second]

# Get actual files on disk
files = sorted([f for f in os.listdir('images/Acrylic Paintings')
                if f.lower().endswith(('.jpg','.jpeg','.png','.webp'))])

generic_pat = re.compile(
    r'^(?:\d{8}_\d{9}_iOS(?:_1)?|imag\s*1a|20\d{6}_\d{9}_iOS(?:_1)?|DSC_\d+)$', re.I)

new_cards = ''
for f in files:
    name = os.path.splitext(f)[0].strip()
    is_gen = bool(generic_pat.match(name))
    new_cards += f'        <div class="work-card reveal" data-category="acrylic">\n'
    new_cards += f'          <div class="img-wrapper portrait">\n'
    new_cards += f'            <img src="./images/Acrylic Paintings/{f}" alt="ACRYLIC PAINTINGS" loading="lazy" />\n'
    new_cards += f'          </div>\n'
    new_cards += f'          <div class="work-info">\n'
    new_cards += f'            <h4>ACRYLIC PAINTINGS</h4>\n'
    if not is_gen:
        display = name.replace('_',' ').strip()
        new_cards += f'            <p style="font-size: 0.9rem; color: #888; text-transform: none; margin-top: 0.5rem; line-height: 1.4;">{display}</p>\n'
    new_cards += f'          </div>\n'
    new_cards += f'        </div>\n'

html = html[:start] + header + new_cards + html[end:]

# ---- Fix 3: Check JS descriptions variable name ----
# Make sure the object is called 'descriptions'
if 'const productDescriptions' in html:
    html = html.replace('const productDescriptions', 'const descriptions')
    print("Fixed: renamed productDescriptions to descriptions")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print('\nSUCCESS - Acrylic paintings rebuilt with subtitles')
print(f'Total acrylic files: {len(files)}')
for f in files:
    print(f'  {f}')
