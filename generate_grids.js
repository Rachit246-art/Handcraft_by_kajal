
const categories = {
    acrylic: { 
        folder: "Acrylic Paintings", 
        title: "ACRYLIC PAINTING", 
        subtitle: "VIBRANT", 
        class: "portrait", 
        desc: "Vibrant handcrafted artworks created with rich textures and colors.",
        featureImage: "./images/Home_page/home---product---Arcylic.png"
    },
    fabric: { 
        folder: "Fabric Painting", 
        title: "FABRIC PAINTING", 
        subtitle: "ARTISTIC DESIGN", 
        class: "square", 
        desc: "Artistic designs painted on fabric, blending creativity with wearable and decorative art.",
        featureImage: "./images/Home_page/home---product---fabric-painting.png"
    },
    mini: { 
        folder: "Mini Paintings", 
        title: "MINI PAINTING", 
        subtitle: "DÉCOR", 
        class: "portrait", 
        desc: "Small yet expressive artworks that capture beauty in compact forms.",
        featureImage: "./images/Home_page/home---product----minipaintings.png"
    },
    phonecases: { 
        folder: "Phone Cases", 
        title: "HANDCRAFTED PHONE CASE", 
        subtitle: "CUSTOM ART", 
        class: "", 
        desc: "Custom Hand painted artistic phone cases designed to add personality and creativity to everyday essentials.",
        featureImage: "./images/Home_page/home---product---phonecases.png"
    },
    magnets: { 
        folder: "Fridge Magnets", 
        title: "FRIDGE MAGNET", 
        subtitle: "MINI ART", 
        class: "", 
        desc: "Handcrafted miniature art pieces that bring charm and creativity to spaces.",
        featureImage: "./images/Home_page/home---product---fridge-magent.png"
    },
    portraits: { 
        folder: "portraits", 
        title: "CUSTOM PORTRAIT", 
        subtitle: "PERSONALIZED", 
        class: "portrait", 
        desc: "Personalized portraits crafted to preserve emotions, memories, and individuality.",
        featureImage: "./images/Home_page/home---product---portraits.png"
    },
    platter: { 
        folder: "Ring Platter", 
        title: "RESIN RING PLATTER", 
        subtitle: "LUXURY", 
        class: "", 
        desc: "Elegant handcrafted platters designed to beautifully present rings and special moments.",
        featureImage: "./images/Home_page/home---product---ring-platter.png"
    },
    resindecor: { 
        folder: "Resin photo frame", 
        title: "RESIN PHOTO FRAME", 
        subtitle: "UNIQUE DÉCOR", 
        class: "square", 
        desc: "Unique resin-crafted décor pieces combining modern aesthetics with artistic detail.",
        featureImage: "./images/Home_page/home---product---resin-decor.png"
    },
    resinart: { 
        folder: "Resin Decor", 
        title: "RESIN DECOR", 
        subtitle: "PREMIUM", 
        class: "", 
        desc: "Fluid and glossy resin creations inspired by texture, depth, and imagination.",
        featureImage: "./images/Home_page/home---product---resin-artwork.png"
    },
    texture: { 
        folder: "Texture Art", 
        title: "TEXTURE ART", 
        subtitle: "TEXTURE / DEPTH", 
        class: "", 
        desc: "Dimensional artworks that bring depth, movement, and emotion through layered textures.",
        featureImage: "./images/Home_page/home---product---texture-art.png"
    },
    invitations: { 
        folder: "Wedding invitations", 
        title: "WEDDING INVITATION", 
        subtitle: "CUSTOM DESIGN", 
        class: "", 
        desc: "Customized artistic invitations designed to make every celebration feel timeless and personal.",
        featureImage: "./images/Home_page/home---product----wedding-invite.png"
    },
    mural: { 
        folder: "Wall Mural Art", 
        title: "WALL MURAL ART", 
        subtitle: "STATEMENT ART", 
        class: "", 
        desc: "Statement art pieces created to transform spaces with beauty, emotion, and character.",
        featureImage: "./images/Home_page/home---product---wall-mural-art.png"
    }
};

const images = {
    "Acrylic Paintings": ["20241004_102402387_iOS.jpg", "20241007_141650000_iOS_1.jpg", "20251223_095539982_iOS.jpg", "20251223_095547834_iOS.jpg", "Afterglow - 2.5ft x 1.5 ft .png", "Veil of vibrance - 3 feet by 3 feet.png", "an evening at the floating city - 3.5ft x 5.8f.jpg", "an evening at the floating city - 3.5ft x 5.8ft .jpg", "beyond the waves - 3ft x 3 ft .png", "christman in london - 1.5ft x 2.5ft .png", "enchanted euphoria - 3ft x 3 ft.png", "golden hour - 1.5ft x 2.5ft.png", "greece - 1.5 ft x 2.5ft.png", "her grace, their roar - 1.5 ft x 2 ft.png", "nritya ganapati - 3ft x 3ft.png", "solitude by the shore - 1 1_2 x 3ft.png", "still bloom - 1ft x 1 ft .png"],
    "Fabric Painting": ["Fabric Art Palace Bandhgala Jacket .webp", "Fabric Art Palace Bandhgala Jacket.webp", "Hand-painted Pure Silk Kanchi Saree.webp", "Hand-painted Silk Kanchipuram Saree.webp", "Handpainted Abstract Blazer .JPG", "Handpainted Abstract Blazer.JPG", "Handpainted Carnival Bloom Jacket for Groom .jpg", "Handpainted Carnival Bloom Jacket for Groom.jpg", "imag 1a.webp"],
    "Mini Paintings": ["mini_painting_0.png","mini_painting_1.png","mini_painting_2.png","mini_painting_3.png","mini_painting_4.png","mini_painting_5.png","mini_painting_6.png","mini_painting_7.png","mini_painting_8.png","mini_painting_9.png","mini_painting_10.png","mini_painting_11.png","mini_painting_12.png","mini_painting_13.png","mini_painting_14.png","mini_painting_15.png","mini_painting_16.JPG","mini_painting_17.JPG"],
    "Phone Cases": ["IMG_3395.png", "IMG_3396.png", "IMG_3406.png", "WhatsApp Image 2026-05-27 at 17.14.41 (1).jpeg", "WhatsApp Image 2026-05-27 at 17.14.41 (2).jpeg", "WhatsApp Image 2026-05-27 at 17.14.41 (3).jpeg", "WhatsApp Image 2026-05-27 at 17.14.41 (4).jpeg", "WhatsApp Image 2026-05-27 at 17.14.41.jpeg", "WhatsApp Image 2026-05-27 at 17.14.42.jpeg"],
    "Fridge Magnets": ["20251121_064926468_iOS.webp", "20251121_065230995_iOS.webp", "20251121_065233010_iOS.webp", "DOG 1.webp", "DOG 2.webp", "DOG 3.webp", "DOG 4.webp", "DOG 5.webp", "DOG 6.webp"],
    "portraits": ["portrait_0.jpg","portrait_1.png","portrait_2.png","portrait_3.png","portrait_4.png","portrait_5.png","portrait_6.png","portrait_7.png","portrait_8.png","portrait_9.png","portrait_10.png","portrait_11.png"],
    "Ring Platter": ["resin ring platter .png", "resin ring platter. .png", "resin ring platter.png"],
    "Resin photo frame": ["Full moon.jpg", "Resin photo frame.jpg", "Winterfell resin decor.jpg", "beach theme resin decor .jpg", "beach theme resin decor. .jpg", "beach theme resin decor.jpg", "little lotus pond resin decor .png", "resin photo frame .jpg", "winterfell resin decor. .jpg"],
    "Resin Decor": ["20230511_055921284_iOS.jpg", "20240529_103308581_iOS.jpg", "20240529_103622629_iOS.jpg", "20251119_125521341_iOS.jpg", "resin coaster .jpg", "resin navkar mantra .jpg", "resin navkar mantra.jpg", "resin wall clock .jpg", "resin wall decor .jpg"],
    "Texture Art": ["EARTHEN ECHOES.jpeg", "FLORAL FRAME.jpeg", "Golden Foliage.jpeg", "Sun kissed blooms .jpeg"],
    "Wedding invitations": ["20240413_161840945_iOS.jpg", "20240413_162026956_iOS.jpg", "20240413_162049915_iOS.jpg", "20240414_094004353_iOS.jpg", "20240414_094028613_iOS.jpg", "20240414_094915915_iOS.jpg", "20240414_094922622_iOS.jpg", "20240414_094925004_iOS.jpg", "20240520_052251352_iOS.jpg", "20240520_052422732_iOS.jpg"],
    "Wall Mural Art": ["DSC_0004.jpg", "DSC_0005.jpg", "DSC_0069.jpg", "PXL_20250503_122245225.webp", "PXL_20250503_122828215.webp"]
};

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

let collectionHtml = "";
let indexHtml = "";

for (const key in categories) {
    const cat = categories[key];
    let catImages = shuffle([...images[cat.folder]]);
    
    if (key === 'fabric') {
        const p1 = "Handpainted Abstract Blazer .JPG";
        const p2 = "imag 1a.webp";
        const saree = "Hand-painted Silk Kanchipuram Saree.webp";
        // Remove them from the shuffled list first
        catImages = catImages.filter(img => img !== p1 && img !== p2 && img !== saree);
        // Insert them at position 0, 1 and 2
        // Position 0 is the 1st secondary item (pos 2 in grid).
        catImages.splice(0, 0, saree);
        catImages.splice(1, 0, p1, p2);
    }
    
    // COLLECTION
    // Feature card (KEEP IT LIKE BEFORE)
    collectionHtml += `          <!-- ${cat.title} -->          <div class="masonry-item work-card reveal ${cat.class}" data-category="all ${key}">
            <div class="img-wrapper"><img src="${cat.featureImage}" alt="${cat.title}" loading="lazy"></div>
            <div class="work-info"><h4>${cat.title}</h4><p>${cat.subtitle}</p></div>
          </div>\n`;
    
    // Category items - Shuffle all but keep the feature image constant in the "all" section
    for (let i = 0; i < catImages.length; i++) {
        collectionHtml += `          <div class="masonry-item work-card reveal ${cat.class}" data-category="${key}">
            <div class="img-wrapper"><img src="./images/${cat.folder}/${catImages[i]}" alt="${cat.title}" loading="lazy"></div>
            <div class="work-info"><h4>${cat.title}</h4><p>${cat.subtitle}</p></div>
          </div>\n`;
    }

    // INDEX
    // Feature card (KEEP IT LIKE BEFORE)
    indexHtml += `        <!-- ${cat.title}S -->        <div class="work-card reveal" data-category="all ${key}">
          <div class="img-wrapper ${cat.class || 'portrait'}">
            <img src="${cat.featureImage}" alt="${cat.title}S" loading="lazy" />
          </div>
          <div class="work-info">
            <h4>${cat.title}S</h4>
            <p style="font-size: 0.9rem; color: #888; text-transform: none; margin-top: 0.5rem; line-height: 1.4;">${cat.desc}</p>
          </div>
        </div>\n`;

    // Category items
    for (let i = 0; i < catImages.length; i++) {
        indexHtml += `        <div class="work-card reveal" data-category="${key}">
          <div class="img-wrapper ${cat.class || 'portrait'}">
            <img src="./images/${cat.folder}/${catImages[i]}" alt="${cat.title}S" loading="lazy" />
          </div>
          <div class="work-info">
            <h4>${cat.title}S</h4>
          </div>
        </div>\n`;
    }
}

const fs = require('fs');
fs.writeFileSync('grid_collection.txt', collectionHtml);
fs.writeFileSync('grid_index.txt', indexHtml);
