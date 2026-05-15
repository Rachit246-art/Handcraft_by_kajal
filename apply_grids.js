const fs = require('fs');

function updateFile(filePath, startMarker, endPattern, newContent) {
    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filePath}`);
        return;
    }
    let content = fs.readFileSync(filePath, 'utf8');
    
    const startIndex = content.indexOf(startMarker);
    if (startIndex === -1) {
        console.error(`Start marker not found in ${filePath}: ${startMarker}`);
        return;
    }
    
    const remainingContent = content.substring(startIndex);
    const match = remainingContent.match(endPattern);
    
    if (!match) {
        console.error(`End pattern not found in ${filePath}`);
        return;
    }
    
    const endIndex = startIndex + match.index;
    
    const updatedContent = content.substring(0, startIndex) + 
                           newContent + 
                           content.substring(endIndex);
    
    fs.writeFileSync(filePath, updatedContent);
    console.log(`Successfully updated ${filePath}`);
}

const gridIndex = fs.readFileSync('grid_index.txt', 'utf8');
const gridCollection = fs.readFileSync('grid_collection.txt', 'utf8');

updateFile('collection.html', '<!-- ACRYLIC PAINTING -->', /<\/div>\s*<\/section>/, gridCollection);
updateFile('index.html', '<!-- ACRYLIC PAINTINGS -->', /<\/div>\s*<div class="text-center mt-8"/, gridIndex);
