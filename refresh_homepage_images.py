import os
import re

# Define the base path
base_path = r'c:\Users\MSI\Downloads\Handcraft-main\Handcraft-main'
index_file = os.path.join(base_path, 'index.html')

with open(index_file, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. About Section Artist Image
content = content.replace('./images/about us (1).webp', './images/Home page/HOME-KAJAL.png')

# 2. Services Slider Section
services_replacements = {
    './images/Wall Murals.webp': './images/Home page/HOME---SERVICES--WALLMURALS.png',
    './images/Fabric Art.webp': './images/Home page/HOME---SERVICES--Fabric-Painting.png',
    './images/Devotional art.webp': './images/Home page/HOME---SERVICES--devotional-art.png',
    './images/texture art.webp': './images/Home page/HOME---SERVICES---texture-art.png',
    './images/Resin Art Works.webp': './images/Home page/HOME---SERVICES---resin-art-works.png',
    './images/landscapes.webp': './images/Home page/HOME---SERVICES--landscapes.png',
    './images/others/20241216_014900831_iOS.webp': './images/Home page/HOME---SERVICES--portraits.png',
    './images/others/20250918_102636949_iOS.webp': './images/Home page/HOME---SERVICES--hand-painted-phone-cases.png',
    './images/Reisin platters/20251208_083446201_iOS.webp': './images/Home page/HOME---SERVICES---resin-ring-platter.png',
    './images/others/20230221_103200186_iOS.webp': './images/Home page/HOME---SERVICES---mini-paintings.png'
}

for old, new in services_replacements.items():
    content = content.replace(old, new)

# 3. Exhibitions Highlights
# Need to replace the main cover and the first hidden image (which is usually the cover duplicated)
exhibition_replacements = {
    './images/events/Chitra Kala Parishad/20240518_051439514_iOS.jpg': './images/Home page/home---exhibitions----chitrakala-parishadh.png',
    './images/events/chitrasante/20240107_075522000_iOS 1.jpg': './images/Home page/home---exhibitions----Chitra-Santhe.png',
    './images/events/India art festival/20241218_133900026_iOS.jpg': './images/Home page/home---exhibitions---India-Art-Festival.png',
    './images/events/Indian Institute of World Culture/20250308_103811683_iOS.jpg': './images/Home page/home---exhibitions---Indian-Institute-of-World-Culture.png'
}

for old, new in exhibition_replacements.items():
    content = content.replace(old, new)

# 4. Products (All Creations) Section
# This is tricky because some categories have multiple cards. We only want to update the "all" cards or the main covers.
product_replacements = {
    './images/Acrylic Paintings/20230221_103200186_iOS (1).webp': './images/Home page/home---product---Arcylic.png',
    './images/Fabric Painting/20240420_061009973_iOS.webp': './images/Home page/home---product---fabric-painting.png',
    './images/Mini Paintings/20240819_062133835_iOS.jpg': './images/Home page/home---product----minipaintings.png',
    './images/Phone cases/20240212_012658826_iOS (1).webp': './images/Home page/home---product---phonecases.png',
    './images/Fridge Magnets/20240207_180239908_iOS (1).webp': './images/Home page/home---product---fridge-magent.png',
    './images/portraits/20240604_042245694_iOS.webp': './images/Home page/home---product---portraits.png',
    './images/Reisin platters/20240131_114316000_iOS.webp': './images/Home page/home---product---ring-platter.png',
    './images/Resin Decor/20251123_041130637_iOS.webp': './images/Home page/home---product---resin-decor.png',
    './images/Resin Artworks/20251219_100344000_iOS.webp': './images/Home page/home---product---resin-artwork.png',
    './images/Texture Art/20251206_090547000_iOS.webp': './images/Home page/home---product---texture-art.png',
    './images/others/20220617_005101000_iOS.webp': './images/Home page/home---product----wedding-invite.png',
    './images/Wall Mural Art/PXL_20250503_122828215.webp': './images/Home page/home---product---wall-mural-art.png'
}

for old, new in product_replacements.items():
    content = content.replace(old, new)

with open(index_file, 'w', encoding='utf-8') as f:
    f.write(content)

print("Successfully updated homepage images using the 'Home page' assets folder.")
