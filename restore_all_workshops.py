import os
import re

# Define the base path
base_path = r'c:\Users\MSI\Downloads\Handcraft-main\Handcraft-main'

# Correct content for Workshops with ALL 5 cards
workshops_html = """
        <div id="workshops" class="blog-category-section">
          <h2 class="blog-category-title">Art Workshops</h2>
          <p style="color: #888; margin-bottom: 4rem; font-size: 1.1rem; text-align: center;">Spreading the joy of handcrafting through guided masterclasses and sessions.</p>
          <div class="achievements-grid">
            <div class="achievement-card reveal">
              <div class="achievement-frame">
                <img src="./images/Reisin platters/20251208_083446201_iOS.webp" alt="Resin Art Workshop" loading="lazy" />
              </div>
              <div class="achievement-info">
                <p>Foundation & Advanced</p>
                <h3>Resin Art Workshops</h3>
                <p class="exhibition-desc">Curated for beginners and advanced learners, covering foundational techniques and customized product sessions.</p>
              </div>
            </div>

            <div class="achievement-card reveal">
              <div class="achievement-frame">
                <img src="./images/others/20241121_121710712_iOS.webp" alt="Fluid Art Workshop" loading="lazy" />
              </div>
              <div class="achievement-info">
                <p>Interactive Sessions</p>
                <h3>Fluid Art Workshops</h3>
                <p class="exhibition-desc">Engaging workshops for kids and adults through camps, schools, and group sessions encouraging self-expression.</p>
              </div>
            </div>

            <div class="achievement-card reveal">
              <div class="achievement-frame">
                <img src="./images/others/20240108_022036000_iOS.webp" alt="Texture Art Workshop" loading="lazy" />
              </div>
              <div class="achievement-info">
                <p>Modern & Aesthetic</p>
                <h3>Texture Art Workshops</h3>
                <p class="exhibition-desc">Guiding participants in creating dimensional artworks using texture techniques and mixed media elements.</p>
              </div>
            </div>

            <div class="achievement-card reveal">
              <div class="achievement-frame">
                <img src="./images/others/20240107_075522000_iOS 1.webp" alt="Christmas Kids DIY" loading="lazy" />
              </div>
              <div class="achievement-info">
                <p>Festive Fun</p>
                <h3>Christmas Kids DIY Workshops</h3>
                <p class="exhibition-desc">Festive crafts, handmade décor, and interactive activities designed to inspire imagination and joyful learning.</p>
              </div>
            </div>

            <div class="achievement-card reveal">
              <div class="achievement-frame">
                <img src="./images/others/20251123_042835057_iOS.webp" alt="Hospital Coaster Workshop" loading="lazy" />
              </div>
              <div class="achievement-info">
                <p>Sustainability Project</p>
                <h3>Hospital Coaster Workshop</h3>
                <p class="exhibition-desc">A creative upcycling workshop with Manipal Hospitals, transforming newspapers into handcrafted coasters.</p>
              </div>
            </div>
          </div>
        </div>"""

# Reconstruct blog.html
with open(os.path.join(base_path, 'blog.html'), 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern for the workshops section
# We find the id="workshops" div and replace it
pattern = r'(<div id="workshops" class="blog-category-section">.*?)(<section class="section-padding" style="background: #111; border-top: 1px solid #333;">)'
new_content = re.sub(pattern, workshops_html + r'\n      \2', content, flags=re.DOTALL)

with open(os.path.join(base_path, 'blog.html'), 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Successfully restored all 5 workshop cards in blog.html.")
