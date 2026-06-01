const fs = require('fs');
const file = 'c:/Users/MSI/OneDrive/Desktop/Handcraft-main/Handcraft-main/index.html';
let content = fs.readFileSync(file, 'utf8');

// We want to replace the block inside work-card reveal data-category="acrylic"
// Specifically, after <h4>ACRYLIC PAINTINGS</h4> we add <p>...</p> based on the image name.
// Let's use a regex to match the work-card blocks.
const regex = /<div class="work-card reveal" data-category="acrylic">\s*<div class="img-wrapper portrait">\s*<img src="\.\/images\/Acrylic Paintings\/([^"]+)" alt="ACRYLIC PAINTINGS" loading="lazy" \/>\s*<\/div>\s*<div class="work-info">\s*<h4>ACRYLIC PAINTINGS<\/h4>\s*<\/div>\s*<\/div>/g;

content = content.replace(regex, (match, filename) => {
  // filename could be 'golden hour - 1.5ft x 2.5ft.png'
  // Let's remove the extension and any trailing space before it.
  let name = filename.replace(/\.[^/.]+$/, '').trim();
  
  return `<div class="work-card reveal" data-category="acrylic">
          <div class="img-wrapper portrait">
            <img src="./images/Acrylic Paintings/${filename}" alt="ACRYLIC PAINTINGS" loading="lazy" />
          </div>
          <div class="work-info">
            <h4>ACRYLIC PAINTINGS</h4>
            <p style="font-size: 0.9rem; color: #888; text-transform: none; margin-top: 0.5rem; line-height: 1.4;">${name}</p>
          </div>
        </div>`;
});

fs.writeFileSync(file, content);
console.log('Updated acrylic paintings subtitles.');
