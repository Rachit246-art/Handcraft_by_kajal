const fs = require('fs');

const mainJsPath = 'c:/Users/MSI/Downloads/Handcraft-main/Handcraft-main/main.js';
const styleCssPath = 'c:/Users/MSI/Downloads/Handcraft-main/Handcraft-main/style.css';

// 1. Update main.js
let mainContent = fs.readFileSync(mainJsPath, 'utf8');
const mainHasCrlf = mainContent.includes('\r\n');
mainContent = mainContent.replace(/\r\n/g, '\n');

const createLightboxTarget = `  // --- Dynamic Lightbox Navigation ---
  const createLightbox = () => {
    if (document.getElementById('lightbox')) return; 
    
    const lightboxHTML = \`
      <div class="lightbox" id="lightbox">
        <button class="lightbox-close" aria-label="Close Lightbox">&times;</button>
        <button class="lightbox-prev" aria-label="Previous Image">&#10094;</button>
        <img class="lightbox-img" id="lightbox-img" src="" alt="Enlarged Art" />
        <button class="lightbox-next" aria-label="Next Image">&#10095;</button>
      </div>
    \`;
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');

    // The gallery images and the complete collection masonry images should open in the lightbox
    const galleryGroup = Array.from(document.querySelectorAll('.gallery-large img, .gallery-split img, .masonry-item img, .gallery-item img, .service-image img, .anim-target img'));

    // Grouping logic for Lightbox
    let activeGroup = [];
    let currentGalleryIndex = -1;

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      setTimeout(() => {
        lightbox.style.display = 'none';
        lightboxImg.src = '';
        document.body.style.overflow = '';
      }, 400); 
    };

    const showGalleryImage = (index) => {
      if (index >= activeGroup.length || index < 0) {
        closeLightbox();
        return;
      }
      
      currentGalleryIndex = index;
      
      lightboxImg.style.opacity = '0.3';
      setTimeout(() => {
        lightboxImg.src = activeGroup[currentGalleryIndex].src;
        lightboxImg.style.opacity = '1';
      }, 150);
    };`;

const createLightboxReplacement = `  // --- Dynamic Lightbox Navigation ---
  const createLightbox = () => {
    if (document.getElementById('lightbox')) return; 
    
    const lightboxHTML = \`
      <div class="lightbox" id="lightbox">
        <button class="lightbox-close" aria-label="Close Lightbox">&times;</button>
        <button class="lightbox-prev" aria-label="Previous Image">&#10094;</button>
        <div class="lightbox-wrapper">
          <img class="lightbox-img" id="lightbox-img" src="" alt="Enlarged Art" />
          <div class="lightbox-caption" id="lightbox-caption" style="display: none;">
            <h3 class="lightbox-title" id="lightbox-title"></h3>
            <p class="lightbox-desc" id="lightbox-desc"></p>
          </div>
        </div>
        <button class="lightbox-next" aria-label="Next Image">&#10095;</button>
      </div>
    \`;
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');

    // The gallery images and the complete collection masonry images should open in the lightbox
    const galleryGroup = Array.from(document.querySelectorAll('.gallery-large img, .gallery-split img, .masonry-item img, .gallery-item img, .service-image img, .anim-target img'));

    // Grouping logic for Lightbox
    let activeGroup = [];
    let currentGalleryIndex = -1;

    const updateLightboxCaption = (img) => {
      const titleEl = document.getElementById('lightbox-title');
      const descEl = document.getElementById('lightbox-desc');
      const captionContainer = document.getElementById('lightbox-caption');
      
      if (!titleEl || !descEl || !captionContainer) return;

      // Extract caption details
      let title = '';
      let description = '';

      // 1. Check if inside a .work-card
      const workCard = img.closest('.work-card');
      if (workCard) {
        const h4 = workCard.querySelector('h4');
        const p = workCard.querySelector('p');
        if (h4) title = h4.textContent.trim();
        if (p) description = p.textContent.trim();
      }

      // 2. Check if inside/associated with an .exhibit-card
      if (!title) {
        const exhibitCard = img.closest('.exhibit-card');
        if (exhibitCard) {
          const h3 = exhibitCard.querySelector('h3');
          const desc = exhibitCard.querySelector('.exhibition-desc');
          const p = exhibitCard.querySelector('p');
          if (h3) title = h3.textContent.trim();
          if (desc) description = desc.textContent.trim();
          else if (p) description = p.textContent.trim();
        }
      }

      // 3. Check if hidden gallery image inside exhibit info
      if (!title) {
        const parentInfo = img.closest('.exhibit-info-clean');
        if (parentInfo) {
          const exhibitCard = parentInfo.closest('.exhibit-card');
          if (exhibitCard) {
            const h3 = exhibitCard.querySelector('h3');
            const desc = exhibitCard.querySelector('.exhibition-desc');
            if (h3) title = h3.textContent.trim();
            if (desc) description = desc.textContent.trim();
          }
        }
      }

      // 4. Overrides via attributes
      const imgAlt = img.getAttribute('alt');
      const dataTitle = img.getAttribute('data-title') || img.getAttribute('title');
      const dataCaption = img.getAttribute('data-caption');

      if (dataTitle) title = dataTitle;
      if (dataCaption) description = dataCaption;

      // If no title, but alt is descriptive
      if (!title && imgAlt && imgAlt !== 'Art Work' && imgAlt !== 'Enlarged Art' && imgAlt !== 'Gallery Image') {
        title = imgAlt;
      }

      // Dynamic fallback based on image source path if no title/desc found yet
      if (!title) {
        const srcLower = img.src.toLowerCase();
        if (srcLower.includes('acrylic')) {
          title = 'Acrylic Painting';
          description = 'Expressive color gradients and textured canvas layers.';
        } else if (srcLower.includes('fabric')) {
          title = 'Fabric Painting';
          description = 'Hand-painted detailing on premium fabric, blending utility with fine art.';
        } else if (srcLower.includes('mini')) {
          title = 'Miniature Painting';
          description = 'Delicate and highly detailed small-scale canvas creation.';
        } else if (srcLower.includes('phone')) {
          title = 'Custom Phone Case';
          description = 'A protective daily essential transformed into a handheld masterpiece.';
        } else if (srcLower.includes('magnet')) {
          title = 'Fridge Magnet';
          description = 'Vibrant miniature art piece to add creativity to magnetic surfaces.';
        } else if (srcLower.includes('portrait')) {
          title = 'Custom Portrait';
          description = 'Capturing individuality, emotions, and life in custom fine art.';
        } else if (srcLower.includes('platter')) {
          title = 'Bespoke Ring Platter';
          description = 'Glossy resin work designed to celebrate major life events.';
        } else if (srcLower.includes('resin')) {
          title = 'Resin Artwork';
          description = 'Fluid glossy layers of high-grade resin, pigments, and metallic highlights.';
        } else if (srcLower.includes('texture')) {
          title = 'Texture Relief Art';
          description = 'Dimensional sculptured details bringing depth and movement.';
        } else if (srcLower.includes('invitation')) {
          title = 'Artistic Invitation';
          description = 'Personalized custom-designed cards for special celebrations.';
        } else if (srcLower.includes('mural')) {
          title = 'Wall Mural Art';
          description = 'A grand statement art piece designed to transform a space.';
        } else {
          title = 'Gallery Masterpiece';
          description = 'A curated fine art creation showcasing premium textures and colors.';
        }
      }

      // Fade out caption first, update it, and fade back in
      captionContainer.style.opacity = '0';
      setTimeout(() => {
        if (title || description) {
          titleEl.textContent = title;
          descEl.textContent = description;
          captionContainer.style.display = 'block';
          // Force a reflow to trigger transition
          captionContainer.offsetHeight; 
          captionContainer.style.opacity = '1';
        } else {
          titleEl.textContent = '';
          descEl.textContent = '';
          captionContainer.style.display = 'none';
        }
      }, 150);
    };

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      setTimeout(() => {
        lightbox.style.display = 'none';
        lightboxImg.src = '';
        const titleEl = document.getElementById('lightbox-title');
        const descEl = document.getElementById('lightbox-desc');
        if (titleEl) titleEl.textContent = '';
        if (descEl) descEl.textContent = '';
        document.body.style.overflow = '';
      }, 400); 
    };

    const showGalleryImage = (index) => {
      if (index >= activeGroup.length || index < 0) {
        closeLightbox();
        return;
      }
      
      currentGalleryIndex = index;
      
      lightboxImg.style.opacity = '0.3';
      updateLightboxCaption(activeGroup[currentGalleryIndex]);
      setTimeout(() => {
        lightboxImg.src = activeGroup[currentGalleryIndex].src;
        lightboxImg.style.opacity = '1';
      }, 150);
    };`;

mainContent = mainContent.replace(createLightboxTarget, createLightboxReplacement);

// Update click listener part to call updateLightboxCaption
const clickTarget = `      lightboxImg.src = img.src;
      lightboxImg.style.opacity = '1';
      
      lightbox.style.display = 'flex';`;

const clickReplacement = `      lightboxImg.src = img.src;
      lightboxImg.style.opacity = '1';
      updateLightboxCaption(img);
      
      lightbox.style.display = 'flex';`;

mainContent = mainContent.replace(clickTarget, clickReplacement);

if (mainHasCrlf) {
    mainContent = mainContent.replace(/\n/g, '\r\n');
}
fs.writeFileSync(mainJsPath, mainContent, 'utf8');
console.log("Updated main.js successfully");


// 2. Update style.css
let cssContent = fs.readFileSync(styleCssPath, 'utf8');
const cssHasCrlf = cssContent.includes('\r\n');
cssContent = cssContent.replace(/\r\n/g, '\n');

const cssStyles = `
/* --- LIGHTBOX CAPTION EXTENSIONS --- */
.lightbox-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 80%;
  max-height: 90vh;
  z-index: 10001;
}

.lightbox-img {
  max-width: 100% !important;
  max-height: 68vh !important; /* leave room for text below */
  width: auto !important;
  height: auto !important;
}

.lightbox-caption {
  margin-top: 1.5rem;
  text-align: center;
  color: #fff;
  max-width: 700px;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  background: rgba(0, 0, 0, 0.6);
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.lightbox.active .lightbox-caption {
  opacity: 1;
  transform: translateY(0);
}

.lightbox-title {
  font-family: serif;
  font-size: 1.6rem;
  font-weight: 400;
  color: #d48a60;
  margin-bottom: 0.4rem;
  letter-spacing: -0.01em;
}

.lightbox-desc {
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #ccc;
  line-height: 1.5;
  font-weight: 300;
  margin: 0;
}

@media (max-width: 768px) {
  .lightbox-wrapper {
    max-width: 90%;
  }
  .lightbox-img {
    max-height: 55vh !important;
  }
  .lightbox-title {
    font-size: 1.25rem;
  }
  .lightbox-desc {
    font-size: 0.8rem;
  }
}
`;

// Append CSS styles to the end of style.css
cssContent += cssStyles;

if (cssHasCrlf) {
    cssContent = cssContent.replace(/\n/g, '\r\n');
}
fs.writeFileSync(styleCssPath, cssContent, 'utf8');
console.log("Updated style.css successfully");
