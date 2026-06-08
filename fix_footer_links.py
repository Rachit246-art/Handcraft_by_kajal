import glob

html_files = glob.glob('*.html')

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace email
    content = content.replace(
        '                        thehandcraftd@gmail.com',
        '                        <a href="mailto:thehandcraftd@gmail.com" style="color: inherit; text-decoration: none; transition: color 0.3s ease;" onmouseover="this.style.color=\'#fff\'" onmouseout="this.style.color=\'inherit\'">thehandcraftd@gmail.com</a>'
    )
    
    # Replace phone
    content = content.replace(
        '                        +91 6363307200',
        '                        <a href="tel:+916363307200" style="color: inherit; text-decoration: none; transition: color 0.3s ease;" onmouseover="this.style.color=\'#fff\'" onmouseout="this.style.color=\'inherit\'">+91 6363307200</a>'
    )

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
