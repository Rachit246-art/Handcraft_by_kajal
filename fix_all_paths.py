import os

base_path = r'c:\Users\MSI\Downloads\Handcraft-main\Handcraft-main'
files_to_update = ['index.html', 'collection.html', 'about-services.html', 'legacy.html']

for filename in files_to_update:
    filepath = os.path.join(base_path, filename)
    if not os.path.exists(filepath):
        continue
        
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Update folder name (handling both space and %20)
    content = content.replace('Home page', 'Home_page')
    content = content.replace('Home%20page', 'Home_page')
    
    # Special fix for index.html hero badge
    if filename == 'index.html':
        # Update the Hero Badge image if it hasn't been updated yet
        content = content.replace('src="./images/PROFILE PICa.webp"', 'src="./images/Home_page/HOME-KAJAL.png"')
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Successfully updated all references to 'Home_page' and fixed the Hero Badge image.")
