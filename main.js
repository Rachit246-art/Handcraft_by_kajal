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
        <img class="lightbox-img" id="lightbox-img" src="" alt="Enlarged Art" />
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
    };

    // Global listener for lightbox-enabled images
    document.addEventListener('click', (e) => {
      const img = e.target.closest('.gallery-large img, .gallery-split img, .masonry-item img, .gallery-item img, .service-image img, .anim-target img, .exhibit-mini-img img, .testimonial-image img, [data-gallery]');
      
      if (!img) return;
      
      e.preventDefault();
      e.stopPropagation();

      const galleryId = img.getAttribute('data-gallery');
      if (galleryId) {
        // Only images in this specific gallery
        activeGroup = Array.from(document.querySelectorAll(`[data-gallery="${galleryId}"]`));
      } else {
        // Default global group
        activeGroup = Array.from(document.querySelectorAll('.gallery-large img, .gallery-split img, .masonry-item img, .gallery-item img, .service-image img, .anim-target img, .exhibit-mini-img img, .testimonial-image img'));
      }

      currentGalleryIndex = activeGroup.indexOf(img);
      
      if (activeGroup.length <= 1) {
        if (lightboxPrev) lightboxPrev.style.display = 'none';
        if (lightboxNext) lightboxNext.style.display = 'none';
      } else {
        if (lightboxPrev) lightboxPrev.style.display = 'flex';
        if (lightboxNext) lightboxNext.style.display = 'flex';
      }

      lightboxImg.src = img.src;
      lightboxImg.style.opacity = '1';
      
      lightbox.style.display = 'flex';
      setTimeout(() => { lightbox.classList.add('active'); }, 10);
      document.body.style.overflow = 'hidden'; 
    });

    // Apply lightbox cursor to all valid images
    const applyLightboxCursor = () => {
      const allGalleries = document.querySelectorAll('.gallery-large img, .gallery-split img, .masonry-item img, .gallery-item img, .service-image img, .anim-target img, .exhibit-mini-img img, .testimonial-image img, [data-gallery]');
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

  // --- Global Floating WhatsApp Button ---
  if (!document.getElementById('floating-wa')) {
    const waHTML = `
      <a href="https://wa.me/916363307200" id="floating-wa" target="_blank" aria-label="WhatsApp" style="
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #25D366, #128C7E);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.5);
        z-index: 10000;
        animation: pulseWa 2s infinite;
        transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      " onmouseover="this.style.transform='scale(1.1)'; this.style.animation='none';" onmouseout="this.style.transform='scale(1)'; this.style.animation='pulseWa 2s infinite';">
        <svg fill="#fff" width="35px" height="35px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.52 3.449a11.968 11.968 0 00-8.49-3.447C5.43 0 0 5.43 0 11.988c0 2.098.546 4.143 1.585 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 12-5.43 12-11.988a11.912 11.912 0 00-3.53-8.357zM12.045 21.746h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c0-5.445 4.455-9.875 9.897-9.875 2.64 0 5.122 1.03 6.988 2.895a9.87 9.87 0 012.894 6.984c-.001 5.445-4.456 9.888-9.896 9.888zm5.422-7.412c-.297-.149-1.758-.867-2.03-.967-.271-.099-.47-.148-.667.149-.198.297-.768.966-.94 1.164-.173.199-.347.223-.644.075a8.23 8.23 0 01-2.427-1.498 9.079 9.079 0 01-1.688-2.094c-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.496.099-.198.05-.371-.025-.52-.074-.148-.667-1.609-.914-2.203-.242-.579-.487-.501-.667-.51l-.57-.01c-.198 0-.52.074-.792.371-.272.297-1.04 1.016-1.04 2.476 0 1.46 1.065 2.872 1.213 3.07.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.574-.085 1.758-.718 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
      </a>
    `;
    document.body.insertAdjacentHTML('beforeend', waHTML);
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
