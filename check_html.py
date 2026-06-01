import os, re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Check Resin Decors
rd_start = html.find('<!-- RESIN DECORS -->')
ta_start = html.find('<!-- TEXTURE ARTS -->')
section = html[rd_start:ta_start]
imgs = re.findall(r'src="./images/Resin Decor/([^"]+)"', section)
print('CURRENT RESIN DECORS IN HTML:')
for i in imgs:
    print(' ', i)

print()

# Check Mini Paintings
mp_start = html.find('<!-- MINI PAINTINGS -->')
# find the next section after mini paintings
sections_after = ['<!-- ACRYLIC', '<!-- PORTRAITS', '<!-- PHONE', '<!-- FABRIC', '<!-- RESIN', '<!-- TEXTURE', '<!-- WALL', '<!-- WEDDING', '<!-- FRIDGE']
mp_end = len(html)
for s in sections_after:
    idx = html.find(s, mp_start + 10)
    if idx != -1 and idx < mp_end:
        mp_end = idx

mp_section = html[mp_start:mp_end]
imgs2 = re.findall(r'src="./images/Mini Paintings/([^"]+)"', mp_section)
print('CURRENT MINI PAINTINGS IN HTML:')
for i in imgs2:
    print(' ', i)
