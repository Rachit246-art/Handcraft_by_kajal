import sys

# Replace grid in index.html
try:
    with open('grid_index.txt', 'r', encoding='utf-8') as f:
        idx_content = f.read()

    with open('index.html', 'r', encoding='utf-8') as f:
        idx_html = f.read()

    wg_start = idx_html.find('<div class="work-grid">')
    wg_end = idx_html.find('</section>', wg_start)

    if wg_start != -1 and wg_end != -1:
        new_idx_html = idx_html[:wg_start+len('<div class="work-grid">\n')] + idx_content + '      </div>\n    </section>\n' + idx_html[wg_end+len('</section>'):]
        with open('index.html', 'w', encoding='utf-8') as f:
            f.write(new_idx_html)
        print('index.html updated successfully!')
    else:
        print('Failed to find work-grid in index.html')
except Exception as e:
    print(f"Error updating index.html: {e}")

# Replace grid in collection.html
try:
    with open('grid_collection.txt', 'r', encoding='utf-8') as f:
        col_content = f.read()

    with open('collection.html', 'r', encoding='utf-8') as f:
        col_html = f.read()

    mg_start = col_html.find('<div class="masonry-grid" id="collection-grid">')
    mg_end = col_html.find('</section>', mg_start)

    if mg_start != -1 and mg_end != -1:
        new_col_html = col_html[:mg_start+len('<div class="masonry-grid" id="collection-grid">\n')] + col_content + '      </div>\n    </section>\n' + col_html[mg_end+len('</section>'):]
        with open('collection.html', 'w', encoding='utf-8') as f:
            f.write(new_col_html)
        print('collection.html updated successfully!')
    else:
        print('Failed to find masonry-grid in collection.html')
except Exception as e:
    print(f"Error updating collection.html: {e}")
