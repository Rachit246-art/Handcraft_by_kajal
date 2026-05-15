
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
        folder: "Reisin platters", 
        title: "RESIN DECOR", 
        subtitle: "UNIQUE DÉCOR", 
        class: "square", 
        desc: "Unique resin-crafted décor pieces combining modern aesthetics with artistic detail.",
        featureImage: "./images/Home_page/home---product---resin-decor.png"
    },
    resinart: { 
        folder: "Resin Artworks", 
        title: "RESIN COASTER", 
        subtitle: "PREMIUM", 
        class: "", 
        desc: "Fluid and glossy resin creations inspired by texture, depth, and imagination.",
        featureImage: "./images/Home_page/home---product---resin-artwork.png"
    },
    texture: { 
        folder: "Texture Art", 
        title: "RELIEF ART WORK", 
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
    "Acrylic Paintings": ["20241004_102402387_iOS.jpg", "20241007_141649000_iOS.jpg", "20241007_141649000_iOS_2.jpg", "20241007_141650000_iOS_1.jpg", "20241107_121816473_iOS.jpg", "20241107_122618531_iOS.jpg", "20241107_122907011_iOS.jpg", "20241121_120650076_iOS.jpg", "20241214_093758901_iOS.jpg", "20241215_101215951_iOS.jpg", "20241216_033656143_iOS.jpg", "20241216_033810275_iOS.jpg", "20250822_114344796_iOS.jpg", "20251223_091525401_iOS.jpg", "20251223_093055930_iOS.jpg", "20251223_095536278_iOS.jpg", "20251223_095539982_iOS.jpg", "20251223_095547834_iOS.jpg", "20251223_103800307_iOS.jpg", "20251223_110255064_iOS.jpg"],
    "Fabric Painting": ["20240420_061009973_iOS.webp", "20240420_061057705_iOS.webp", "20250919_113834134_iOS.webp", "20251205_081614188_iOS.webp", "FABRIC PAINTING.webp", "imag 1.webp", "imag 1a.webp", "saree 1.webp", "saree.webp"],
    "Mini Paintings": ["20240819_062133835_iOS.jpg", "20240909_111432382_iOS.jpg", "20241021_091739034_iOS.jpg", "20241112_115742545_iOS.jpg", "20250724_094152180_iOS.jpg", "20250918_064201443_iOS.jpg", "20250918_064219257_iOS.jpg", "20250926_020850000_iOS3.jpg", "20260414_074048871_iOS.jpg", "20260415_094900428_iOS.jpg", "Minipainting1.jpg", "Minipainting2.jpg", "Minipainting3.jpg", "VALENTINE1C1A.jpg", "VALENTINE1C3.jpg", "VALENTINE1C5.jpg"],
    "Phone Cases": ["20250509_104051775_iOS.jpg", "20250918_102636949_iOS.jpg", "20251211_070538219_iOS.jpg", "20251211_070612675_iOS.jpg", "20251211_070618209_iOS.jpg", "IMG_1697.JPG.jpeg", "IMG_1698.JPG.jpeg", "IMG_1699.JPG.jpeg", "IMG_1700.JPG.jpeg", "IMG_1701.JPG.jpeg", "IMG_1702.JPG.jpeg", "IMG_1703.JPG.jpeg"],
    "Fridge Magnets": ["20251121_064926468_iOS.webp", "20251121_065230995_iOS.webp", "20251121_065233010_iOS.webp", "DOG 1.webp", "DOG 2.webp", "DOG 3.webp", "DOG 4.webp", "DOG 5.webp", "DOG 6.webp"],
    "portraits": ["20240715_120516856_iOS.jpg", "20240823_091655909_iOS.jpg", "20240829_084956840_iOS.jpg", "20241116_085036672_iOS.jpg", "20250214_122818727_iOS.jpg", "20250302_070131967_iOS.jpg", "20250304_052056749_iOS.jpg", "20250328_055414012_iOS.jpg", "20250609_064810744_iOS.jpg", "20250721_110541655_iOS.jpg", "20251125_130357098_iOS.jpg", "20251225_124816510_iOS.jpg", "20251226_103011877_iOS.jpg", "20251226_103015984_iOS.jpg"],
    "Ring Platter": ["20251206_083423215_iOS.jpg", "20251208_082922235_iOS.jpg", "20251208_082925851_iOS.jpg", "20251208_083042020_iOS.jpg", "20251208_083414668_iOS.jpg", "20251208_083510652_iOS.jpg", "20251208_084259408_iOS.jpg", "20251226_095928905_iOS.jpg", "20251226_095948515_iOS.jpg", "20251226_100632188_iOS-copy-0.jpg"],
    "Reisin platters": ["20230607_102113024_iOS.jpg", "20230607_103235923_iOS.jpg", "20240819_060232631_iOS.jpg", "20240819_061615764_iOS.jpg", "20240819_061837466_iOS.jpg", "20250102_120724857_iOS.jpg", "20250104_134035183_iOS.jpg", "20250104_134715037_iOS.jpg", "20250104_135156034_iOS.jpg"],
    "Resin Artworks": ["20230227_113449000_iOS.jpg", "20230410_114839469_iOS.jpg", "20230411_133353000_iOS.jpg", "20230511_055921284_iOS.jpg", "20230608_074947846_iOS.jpg", "20240529_103308581_iOS.jpg", "20240529_103505859_iOS.jpg", "20240529_103622629_iOS.jpg", "20251119_125521341_iOS.jpg"],
    "Texture Art": ["20250308_134548902_iOS.jpg", "20250308_134557181_iOS.jpg", "20250308_134605680_iOS.jpg", "20250403_120628991_iOS.jpg", "20250403_120804733_iOS.jpg", "texture-2.jpg", "texture-3.jpg"],
    "Wedding invitations": ["20240413_161840945_iOS.jpg", "20240413_162026956_iOS.jpg", "20240413_162049915_iOS.jpg", "20240414_094004353_iOS.jpg", "20240414_094028613_iOS.jpg", "20240414_094915915_iOS.jpg", "20240414_094922622_iOS.jpg", "20240414_094925004_iOS.jpg", "20240520_052251352_iOS.jpg", "20240520_052422732_iOS.jpg"],
    "Wall Mural Art": ["DSC_0004.webp", "DSC_0005.webp", "DSC_0069.webp", "PXL_20250503_122245225.webp", "PXL_20250503_122828215.webp"]
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
        const p1 = "imag 1.webp";
        const p2 = "imag 1a.webp";
        const saree = "saree.webp";
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
