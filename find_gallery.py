import os, re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

start = html.find('Art Gallery')
if start != -1:
    end = start + 5000
    # Let's search for the "Products" heading which is the next section
    prod_start = html.find('<h2>Products</h2>', start)
    if prod_start == -1:
        prod_start = html.find('>Products<', start)
    if prod_start != -1:
        end = prod_start

    section = html[start:end]
    print("IMAGES IN ART GALLERY SECTION:")
    # look for <div class="work-card"> inside which we have an image
    imgs = re.findall(r'<div class="work-card[^>]*>.*?<img[^>]+src=["\']([^"\']+)["\']', section, re.DOTALL)
    for img in imgs:
        print(img)
