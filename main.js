// Removed ES Module imports for standard local rendering

console.log("Handcrafted by Kajal clone interactive logic initializing...");

// Execute immediately without DOMContentLoaded wrapper so that Vite HMR updates take effect instantly!
const init = () => {
  document.body.classList.add('js-loaded');
  // --- Scroll Reveal Animations (Transitions) --- 
  const elementsToReveal = document.querySelectorAll(
    '.hero-title, .hero-buttons, .section-title, .section-subtitle, .about-content p, .testimonials-header, .testimonials-carousel-wrapper, .reveal'
  );

  const cardsToReveal = document.querySelectorAll('.work-card, .blog-card, .service-item, .terms-card');
  const galleryImages = document.querySelectorAll('.gallery-large, .gallery-split img, .gallery-item');

  const allRevealElements = [...new Set([...elementsToReveal, ...cardsToReveal, ...galleryImages])];

  allRevealElements.forEach((el) => {
    el.classList.add('reveal');
    if (el.classList.contains('work-card') || el.classList.contains('blog-card') || el.classList.contains('service-item')) {
         const parentChildren = Array.from(el.parentElement.children);
         const i = parentChildren.indexOf(el);
         el.style.transitionDelay = `${(i % 4) * 0.15}s`;
    }
  });

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  allRevealElements.forEach(el => observer.observe(el));


  // --- Smooth Parallax Animations ---
  const heroBadge = document.querySelector('.hero-badge-container');
  const aboutImg = document.querySelector('.about-img');
  const galleryImage = document.querySelector('.gallery-large img');
  const splitGalleryImages = document.querySelectorAll('.gallery-split img');
  const thumbsParallax = document.querySelectorAll('.rounded-thumb');

  let ticking = false;
  let lastScrollY = window.pageYOffset;

  const updateParallax = () => {
    const scrollY = lastScrollY;
    const windowHeight = window.innerHeight;

    if (heroBadge && scrollY < windowHeight) {
      heroBadge.style.transform = `rotate(${scrollY * 0.05}deg)`;
    }

    if (aboutImg) {
      const aboutRect = document.querySelector('.about-section').getBoundingClientRect();
      if (aboutRect.top < windowHeight && aboutRect.bottom > 0) {
        aboutImg.style.transform = `translateY(${aboutRect.top * -0.2}px)`;
      }
    }

    ticking = false;
  };

  window.addEventListener('scroll', () => {
    lastScrollY = window.pageYOffset;
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });
  
  updateParallax();


  // --- Mouse-move 3D Magnetic Tilt Effect for Contact Image & Hero Badge ---
  const applyTilt = (selector, targetSelector) => {
      const area = document.querySelector(selector);
      if (!area) return;
      
      area.addEventListener('mousemove', (e) => {
          const rect = area.getBoundingClientRect();
          const x = e.clientX - rect.left; 
          const y = e.clientY - rect.top; 
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateX = ((y - centerY) / centerY) * -10; // Subtle Tilt
          const rotateY = ((x - centerX) / centerX) * 10;
          
          const target = area.querySelector(targetSelector);
          if (target) {
              target.style.transition = 'transform 0.1s ease-out';
              target.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
          }
      });

      area.addEventListener('mouseleave', () => {
          const target = area.querySelector(targetSelector);
          if (target) {
              target.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
              target.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
          }
      });
  };

  applyTilt('.hero-badge-container', '.rotating-badge');
  applyTilt('.contact-image-wrapper', 'img');

  // --- Dropdown Menu & Inline Search ---
  const menuBtns = document.querySelectorAll('.menu-btn');
  const menuDropdowns = document.querySelectorAll('.menu-dropdown');

  const searchBtns = document.querySelectorAll('.search-btn');
  const searchWrappers = document.querySelectorAll('.search-wrapper');
  const searchInputsInline = document.querySelectorAll('.search-inline-input');

  menuBtns.forEach((btn, idx) => {
    const dropdown = menuDropdowns[idx] || document.querySelector('.menu-dropdown');
    if (!btn || !dropdown) return;
    
    btn.onclick = (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('active');
    };
  });

  document.addEventListener('click', (e) => {
    menuDropdowns.forEach(dropdown => {
      if (dropdown.classList.contains('active')) {
        let isInsideMenu = false;
        menuBtns.forEach(btn => { if (btn.contains(e.target)) isInsideMenu = true; });
        if (!isInsideMenu && !dropdown.contains(e.target)) {
          dropdown.classList.remove('active');
        }
      }
    });
  });

  searchBtns.forEach((btn, idx) => {
    const wrapper = searchWrappers[idx] || document.querySelector('.search-wrapper');
    const input = searchInputsInline[idx] || document.querySelector('.search-inline-input');
    if (!btn || !wrapper || !input) return;

    btn.onclick = (e) => {
      e.preventDefault();
      wrapper.classList.toggle('active');
      if (wrapper.classList.contains('active')) {
        input.focus();
      }
    };
  });

// --- Liquid Distortion Hover Effect ---
  const applyLiquidEffect = () => {
    const cards = document.querySelectorAll('.blog-card');
    
    const oldContainer = document.getElementById('liquid-svg-container');
    if (oldContainer) oldContainer.remove();

    const svgContainer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgContainer.id = 'liquid-svg-container';
    svgContainer.setAttribute("style", "position: absolute; width: 0; height: 0; pointer-events: none;");
    
    let svgHTML = '';
    cards.forEach((card, index) => {
      const filterId = `liquid-filter-${index}`;
      svgHTML += `
        <filter id="${filterId}" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.015 0.02" numOctaves="2" result="noise">
            <animate attributeName="baseFrequency" values="0.015 0.02; 0.02 0.025; 0.015 0.02" dur="4s" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" id="disp-${index}" />
        </filter>
      `;
    });
    svgContainer.innerHTML = svgHTML;
    document.body.appendChild(svgContainer);

    cards.forEach((card, index) => {
      const img = card.querySelector('img');
      if (!img) return;

      img.style.filter = `url(#liquid-filter-${index})`;

      let currentScale = 0;
      let targetScale = 0;
      let animFrame;

      const animate = () => {
        currentScale += (targetScale - currentScale) * 0.1;
        const disp = document.getElementById(`disp-${index}`);
        if (disp) disp.setAttribute('scale', currentScale);

        if (Math.abs(targetScale - currentScale) > 0.1) {
          animFrame = requestAnimationFrame(animate);
        } else {
          currentScale = targetScale;
          if (disp) disp.setAttribute('scale', currentScale);
        }
      };

      card.addEventListener('mouseenter', () => {
        targetScale = 35; // Melted look Amount
        cancelAnimationFrame(animFrame);
        animate();
      });

      card.addEventListener('mouseleave', () => {
        targetScale = 0;
        cancelAnimationFrame(animFrame);
        animate();
      });
    });
  };
  applyLiquidEffect();

  // --- Portfolio Filtering Logic ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const workCardsFilter = document.querySelectorAll('.work-card');

  if (filterBtns.length > 0 && workCardsFilter.length > 0) {
    // Initialize initial state: hide anything not tagged with 'all'
    workCardsFilter.forEach(card => {
      const categories = card.getAttribute('data-category').split(' ');
      if (!categories.includes('all')) {
        card.style.display = 'none';
        card.classList.add('hide');
      }
    });

    filterBtns.forEach(btn => {
      btn.onclick = () => {
        // Toggle active button state
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        workCardsFilter.forEach(card => {
          // Remove active reveal transform so it doesn't conflict with filter animation
          card.style.transition = 'none'; 
          card.classList.remove('reveal');
          card.classList.add('active'); // force reveal active if it was hidden
          
          card.style.display = ''; // Reset display so it can animate in
          
          const categories = card.getAttribute('data-category').split(' ');
          
          if (categories.includes(filterValue)) {
             card.classList.remove('hide');
             setTimeout(() => {
                card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
             }, 10);
          } else {
             card.classList.add('hide');
             setTimeout(() => {
                if (card.classList.contains('hide')) {
                   card.style.display = 'none';
                }
             }, 400); // Wait for CSS transition to vanish it, then totally remove from doc flow
          }
        });
      };
    });
  }

  // --- Dynamic Lightbox Navigation ---
  const createLightbox = () => {
    if (document.getElementById('lightbox')) return; 
    
    const lightboxHTML = `
      <div class="lightbox" id="lightbox">
        <button class="lightbox-close" aria-label="Close Lightbox">&times;</button>
        <button class="lightbox-prev" aria-label="Previous Image">&#10094;</button>
        <div class="lightbox-wrapper">
          <img class="lightbox-img" id="lightbox-img" src="" alt="Enlarged Art" />
          <div class="lightbox-caption" id="lightbox-caption" style="display: none;">
            <h3 class="lightbox-title" id="lightbox-title"></h3>
            <p class="lightbox-desc" id="lightbox-desc"></p>
          </div>
          <div class="lightbox-swipe-hint" id="lightbox-swipe-hint" style="display: none; text-align: center; color: rgba(255,255,255,0.6); font-size: 0.8rem; margin-top: 10px; letter-spacing: 1px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 4px;"><path d="M19 12H5M12 19l-7-7 7-7"/><path d="M19 12l-7-7M19 12l-7 7"/></svg>
            Swipe left or right to explore
          </div>
        </div>
        <button class="lightbox-next" aria-label="Next Image">&#10095;</button>
      </div>
    `;
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
    };

    // Global listener for lightbox-enabled images
    document.addEventListener('click', (e) => {
      const img = e.target.closest('.gallery-large img, .gallery-split img, .masonry-item img, .gallery-item img, .service-image img, .anim-target img, .exhibit-mini-img img, .work-card img, [data-gallery]');
      
      if (!img) return;
      
      e.preventDefault();
      e.stopPropagation();

      const galleryId = img.getAttribute('data-gallery');
      let allInGallery = [];
      
      // Check if image belongs to a product category
      const workCard = img.closest('.work-card');
      const categoryAttr = workCard ? workCard.getAttribute('data-category') : null;
      let category = null;
      if (categoryAttr) {
        // filter out 'all' to get base category
        const parts = categoryAttr.split(' ').map(p => p.trim()).filter(p => p !== 'all');
        if (parts.length > 0) {
          category = parts[0];
        }
      }

      if (galleryId) {
        // Only images in this specific gallery
        allInGallery = Array.from(document.querySelectorAll(`[data-gallery="${galleryId}"]`));
      } else if (category) {
        // Only show images of the same category, so scrolling stops at the end of the category
        const categoryCards = Array.from(document.querySelectorAll('.work-card')).filter(card => {
          const cat = card.getAttribute('data-category');
          if (!cat) return false;
          return cat.split(' ').map(p => p.trim()).includes(category);
        });
        allInGallery = categoryCards.map(card => card.querySelector('img')).filter(Boolean);
      } else {
        // Default group: only images within the same section to prevent bleeding into products or other areas
        const parentSection = img.closest('section');
        if (parentSection) {
          allInGallery = Array.from(parentSection.querySelectorAll('.gallery-large img, .gallery-split img, .masonry-item img, .gallery-item img, .service-image img, .anim-target img, .exhibit-mini-img img, .work-card img'));
        } else {
          allInGallery = [img];
        }
      }

      // Filter out duplicates based on src to prevent same image appearing twice
      const seenSrcs = new Set();
      activeGroup = allInGallery.filter(el => {
        if (seenSrcs.has(el.src)) return false;
        seenSrcs.add(el.src);
        return true;
      });

      currentGalleryIndex = activeGroup.indexOf(img);
      
      if (activeGroup.length <= 1) {
        if (lightboxPrev) lightboxPrev.style.display = 'none';
        if (lightboxNext) lightboxNext.style.display = 'none';
        const swipeHint = document.getElementById('lightbox-swipe-hint');
        if (swipeHint) swipeHint.style.display = 'none';
      } else {
        if (lightboxPrev) lightboxPrev.style.display = 'flex';
        if (lightboxNext) lightboxNext.style.display = 'flex';
        const swipeHint = document.getElementById('lightbox-swipe-hint');
        // Only show swipe hint on mobile screens
        if (swipeHint && window.innerWidth < 768) swipeHint.style.display = 'block';
      }

      lightboxImg.src = img.src;
      lightboxImg.style.opacity = '1';
      updateLightboxCaption(img);
      
      lightbox.style.display = 'flex';
      setTimeout(() => { lightbox.classList.add('active'); }, 10);
      document.body.style.overflow = 'hidden'; 
    });

    // Apply lightbox cursor to all valid images
    const applyLightboxCursor = () => {
      const allGalleries = document.querySelectorAll('.gallery-large img, .gallery-split img, .masonry-item img, .gallery-item img, .service-image img, .anim-target img, .exhibit-mini-img img, .work-card img, [data-gallery]');
      allGalleries.forEach(img => img.classList.add('lightbox-cursor'));
    };
    applyLightboxCursor();

    if (lightboxPrev) lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); showGalleryImage(currentGalleryIndex - 1); });
    if (lightboxNext) lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); showGalleryImage(currentGalleryIndex + 1); });
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    
    if (lightbox) {
      lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg && e.target !== lightboxPrev && e.target !== lightboxNext) {
          closeLightbox();
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (!lightbox || !lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      
      if (currentGalleryIndex !== -1) {
          if (e.key === 'ArrowLeft') showGalleryImage(currentGalleryIndex - 1);
          if (e.key === 'ArrowRight') showGalleryImage(currentGalleryIndex + 1);
      }
    });

    let lightboxTouchStartX = 0;
    if (lightbox) {
      lightbox.addEventListener('touchstart', (e) => {
        lightboxTouchStartX = e.changedTouches[0].screenX;
      }, {passive: true});

      lightbox.addEventListener('touchend', (e) => {
        if (!lightbox.classList.contains('active') || currentGalleryIndex === -1) return;
        const touchEndX = e.changedTouches[0].screenX;
        if (lightboxTouchStartX - touchEndX > 50) {
           showGalleryImage(currentGalleryIndex + 1);
        }
        if (touchEndX - lightboxTouchStartX > 50) {
           showGalleryImage(currentGalleryIndex - 1);
        }
      }, {passive: true});
    }
  };
  
  // Use a slight timeout to ensure images are loaded and in DOM
  setTimeout(createLightbox, 100);

  // --- Testimonials Carousel ---
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const testiPrevBtn = document.querySelector('.testi-btn.prev');
  const testiNextBtn = document.querySelector('.testi-btn.next');
  const testiDots = document.querySelectorAll('.testimonial-dots .dot');

  if (testimonialSlides.length > 0) {
    let currentTestimonial = 0;
    let autoPlayInterval;

    const showTestimonial = (index) => {
      testimonialSlides.forEach(slide => slide.classList.remove('active'));
      testiDots.forEach(dot => dot.classList.remove('active'));
      
      if (index >= testimonialSlides.length) currentTestimonial = 0;
      else if (index < 0) currentTestimonial = testimonialSlides.length - 1;
      else currentTestimonial = index;

      testimonialSlides[currentTestimonial].classList.add('active');
      testiDots[currentTestimonial].classList.add('active');
    };

    const nextTestimonial = () => showTestimonial(currentTestimonial + 1);
    const prevTestimonial = () => showTestimonial(currentTestimonial - 1);

    const startAutoPlay = () => { autoPlayInterval = setInterval(nextTestimonial, 6000); };
    const stopAutoPlay = () => { clearInterval(autoPlayInterval); };

    if(testiNextBtn) testiNextBtn.addEventListener('click', () => {
      nextTestimonial(); stopAutoPlay(); startAutoPlay();
    });

    if(testiPrevBtn) testiPrevBtn.addEventListener('click', () => {
      prevTestimonial(); stopAutoPlay(); startAutoPlay();
    });

    testiDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showTestimonial(index); stopAutoPlay(); startAutoPlay();
      });
    });

    const carouselWrapper = document.querySelector('.testimonials-carousel');
    if (carouselWrapper) {
      carouselWrapper.addEventListener('mouseenter', stopAutoPlay);
      carouselWrapper.addEventListener('mouseleave', startAutoPlay);
    }

    startAutoPlay();
  }

  // --- Scroll to Top Button ---
  const scrollTopBtn = document.querySelector('.scroll-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 500) {
        scrollTopBtn.classList.add('active');
      } else {
        scrollTopBtn.classList.remove('active');
      }
    });
    
    scrollTopBtn.onclick = (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  }

  // --- Social Media SVG Icons Injection ---
  const socialConfig = {
    'Instagram': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:0.5rem; vertical-align:text-bottom;"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>',
    'Facebook': '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style="margin-right:0.5rem; vertical-align:text-bottom;"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"/></svg>'
  };

  const socialLinksA = document.querySelectorAll('.social-links a');
  socialLinksA.forEach(link => {
    const textContext = link.textContent.trim().replace(' ↗', '');
    if (socialConfig[textContext] && !link.querySelector('svg')) {
      link.innerHTML = socialConfig[textContext] + link.innerHTML;
      link.style.display = 'inline-flex';
      link.style.alignItems = 'center';
    }
  });

  // --- Services Slider (Multi-item Scroll Logic) ---
  const serviceCarousel = document.querySelector('.services-carousel');
  const serviceSlides = document.querySelectorAll('.service-slide');
  const servicePrevBtn = document.querySelector('.testi-btn.prev-service');
  const serviceNextBtn = document.querySelector('.testi-btn.next-service');
  const serviceDots = document.querySelectorAll('.service-dots .dot');

  if (serviceSlides.length > 0 && serviceCarousel) {
    let currentService = 0;
    let serviceAutoInterval;

    const showService = (index) => {
      const totalSlides = serviceSlides.length;
      if (totalSlides === 0) return;

      // If screen is wider than 1100px, we are in grid mode
      if (window.innerWidth > 1100) {
        serviceCarousel.style.transform = 'none';
        return; 
      }

      // Cycle index
      if (index >= totalSlides) currentService = 0;
      else if (index < 0) currentService = totalSlides - 1;
      else currentService = index;

      const wrapper = document.querySelector('.services-carousel-wrapper');
      const wrapperWidth = wrapper.offsetWidth;
      const slideWidth = serviceSlides[0].offsetWidth;
      
      // Get the actual computed gap from CSS
      const computedStyle = window.getComputedStyle(serviceCarousel);
      const gap = parseFloat(computedStyle.gap) || 24;
      
      // Precise centering calculation
      const offset = (wrapperWidth / 2) - (slideWidth / 2) - (currentService * (slideWidth + gap));
      serviceCarousel.style.transform = `translateX(${offset}px)`;

      // Update dots
      serviceDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentService);
        dot.style.display = 'block';
      });
    };

    const nextService = () => showService(currentService + 1);
    const prevService = () => showService(currentService - 1);

    const startServiceAuto = () => { 
      stopServiceAuto();
      if (window.innerWidth <= 1100) {
        serviceAutoInterval = setInterval(nextService, 4000); 
      }
    };
    const stopServiceAuto = () => { if (serviceAutoInterval) clearInterval(serviceAutoInterval); };

    if(serviceNextBtn) {
      serviceNextBtn.onclick = (e) => {
        e.preventDefault();
        nextService(); 
        stopServiceAuto(); 
        startServiceAuto(); 
      };
    }
    
    if(servicePrevBtn) {
      servicePrevBtn.onclick = (e) => {
        e.preventDefault();
        prevService(); 
        stopServiceAuto(); 
        startServiceAuto(); 
      };
    }

    serviceDots.forEach((dot, index) => {
      dot.onclick = () => { 
        showService(index); 
        stopServiceAuto(); 
        startServiceAuto(); 
      };
    });

    serviceCarousel.onmouseenter = stopServiceAuto;
    serviceCarousel.onmouseleave = startServiceAuto;

    // Handle touch events for mobile swiping
    let touchStartX = 0;
    serviceCarousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopServiceAuto();
    }, {passive: true});

    serviceCarousel.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) nextService();
      if (touchEndX - touchStartX > 50) prevService();
      startServiceAuto();
    }, {passive: true});

    window.addEventListener('resize', () => {
        showService(currentService);
        // Restart auto-slide only if it's supposed to be running
        if (window.innerWidth <= 1100) startServiceAuto();
        else stopServiceAuto();
    });

    startServiceAuto();
    // Use a small delay to ensure rendering is complete before first center
    setTimeout(() => showService(0), 150);
  }
};

// Handle Vite HMR edge cases where script is reloaded but page is not re-parsed
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init(); // Fire instantly if DOM is already fully loaded
}
