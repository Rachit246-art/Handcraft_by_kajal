const fs = require('fs');

const indexFile = 'c:/Users/MSI/OneDrive/Desktop/Handcraft-main/Handcraft-main/index.html';
let html = fs.readFileSync(indexFile, 'utf8');

const rfStartMarker = '<!-- RESIN PHOTO FRAMES -->';
const rdStartMarker = '<!-- RESIN DECORS -->';
const taStartMarker = '<!-- TEXTURE ARTS -->';

const rfStartIndex = html.indexOf(rfStartMarker);
const rdStartIndex = html.indexOf(rdStartMarker);
const taStartIndex = html.indexOf(taStartMarker);

if (rfStartIndex === -1 || rdStartIndex === -1 || taStartIndex === -1) {
    console.error('Could not find markers');
    process.exit(1);
}

let newHtml = html.substring(0, rfStartIndex);

const rfSectionOriginal = html.substring(rfStartIndex, rdStartIndex);
// Find the SECOND work-card reveal to keep the first one
let nextCardIndexRF = rfSectionOriginal.indexOf('<div class="work-card reveal"');
nextCardIndexRF = rfSectionOriginal.indexOf('<div class="work-card reveal"', nextCardIndexRF + 1);
let rfHeader = rfSectionOriginal.substring(0, nextCardIndexRF);

const rdSectionOriginal = html.substring(rdStartIndex, taStartIndex);
let nextCardIndexRD = rdSectionOriginal.indexOf('<div class="work-card reveal"');
nextCardIndexRD = rdSectionOriginal.indexOf('<div class="work-card reveal"', nextCardIndexRD + 1);
let rdHeader = rdSectionOriginal.substring(0, nextCardIndexRD);

// BUT wait! Because I already ran the broken script, index.html NO LONGER HAS the header cards!
// So finding the SECOND work-card won't give us the header, it will give us the second normal item!
// I need to RESTORE the header cards manually here.
