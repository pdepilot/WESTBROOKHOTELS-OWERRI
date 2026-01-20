// ===========================================
// LUXURY PRELOADER FUNCTIONALITY
// ===========================================
document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.getElementById('preloader');
  const skipPreloaderBtn = document.getElementById('skipPreloader');
  const progressFill = document.querySelector('.progress-fill');
  const percentageText = document.querySelector('.percentage');
  const statusText = document.querySelector('.status');
  const detailItems = document.querySelectorAll('.detail-item');
  
  if (!preloader) return;
  
  // Status messages for a luxury experience
  const statusMessages = [
    "INITIALIZING LUXURY EXPERIENCE",
    "LOADING PREMIUM AMENITIES",
    "PREPARING CONCIERGE SERVICES",
    "CURATING EXCLUSIVE OFFERS",
    "OPTIMIZING LUXURY INTERFACE",
    "FINALIZING 5-STAR EXPERIENCE"
  ];
  
  // Progress simulation for a luxury feel
  let progress = 0;
  let currentStatus = 0;
  let completedItems = 0;
  let loadingInterval;
  
  // Simulate luxury loading process
  function simulateLuxuryLoading() {
    loadingInterval = setInterval(() => {
      // Increment progress with random luxury feel
      progress += Math.random() * 3 + 1; // 1-4% per interval
      
      if (progress >= 100) {
        progress = 100;
        clearInterval(loadingInterval);
        completeLoading();
      }
      
      // Update progress bar
      progressFill.style.width = `${progress}%`;
      percentageText.textContent = `${Math.round(progress)}%`;
      
      // Change status message at certain intervals
      if (progress > 20 && currentStatus === 0) {
        currentStatus = 1;
        statusText.textContent = statusMessages[currentStatus];
        completeDetailItem(0);
      } else if (progress > 40 && currentStatus === 1) {
        currentStatus = 2;
        statusText.textContent = statusMessages[currentStatus];
        completeDetailItem(1);
      } else if (progress > 60 && currentStatus === 2) {
        currentStatus = 3;
        statusText.textContent = statusMessages[currentStatus];
      } else if (progress > 80 && currentStatus === 3) {
        currentStatus = 4;
        statusText.textContent = statusMessages[currentStatus];
        completeDetailItem(2);
      }
      
    }, 100); // Update every 100ms
  }
  
  // Complete a detail item
  function completeDetailItem(index) {
    if (index < detailItems.length && !detailItems[index].classList.contains('completed')) {
      detailItems[index].classList.add('completed');
      
      // Add celebration effect
      const check = detailItems[index].querySelector('.detail-check i');
      check.style.transform = 'scale(1.5)';
      setTimeout(() => {
        check.style.transform = 'scale(1)';
      }, 300);
      
      completedItems++;
    }
  }
  
  // Complete loading with luxury flourish
  function completeLoading() {
    // Final updates
    percentageText.textContent = "100%";
    statusText.textContent = "READY FOR LUXURY";
    statusText.style.color = "#c19a5b";
    
    // Final celebration
    createSparkleBurst();
    
    // Trigger luxury completion sequence
    setTimeout(() => {
      // Animate preloader out
      preloader.classList.add('fade-out');
      
      // Enable body scroll
      document.body.style.overflow = 'auto';
      
      // Remove preloader from DOM after animation
      setTimeout(() => {
        preloader.style.display = 'none';
        
        // Initialize main website functionality
        initializeMainWebsite();
      }, 1200);
    }, 1000);
  }
  
  // Create sparkle burst effect
  function createSparkleBurst() {
    const preloaderContent = document.querySelector('.preloader-content');
    
    for (let i = 0; i < 20; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'burst-sparkle';
      sparkle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 6 + 2}px;
        height: ${Math.random() * 6 + 2}px;
        background: radial-gradient(circle, 
          rgba(255,255,255,1) 0%, 
          rgba(193,154,91,1) 50%, 
          transparent 100%);
        border-radius: 50%;
        top: 50%;
        left: 50%;
        pointer-events: none;
        z-index: 1000;
        filter: blur(1px);
        animation: burstSparkle 1.5s ease-out forwards;
        animation-delay: ${Math.random() * 0.2}s;
      `;
      
      // Random angle and distance
      const angle = Math.random() * Math.PI * 2;
      const distance = 80 + Math.random() * 150;
      
      sparkle.style.setProperty('--end-x', `${Math.cos(angle) * distance}px`);
      sparkle.style.setProperty('--end-y', `${Math.sin(angle) * distance}px`);
      
      preloaderContent.appendChild(sparkle);
      
      // Remove sparkle after animation
      setTimeout(() => {
        if (sparkle.parentNode) {
          sparkle.remove();
        }
      }, 1500);
    }
  }
  
  // Skip preloader functionality
  skipPreloaderBtn.addEventListener('click', () => {
    // Animate skip button
    skipPreloaderBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
      skipPreloaderBtn.style.transform = '';
    }, 200);
    
    // Clear any existing interval
    if (loadingInterval) {
      clearInterval(loadingInterval);
    }
    
    // Immediately complete loading
    progress = 100;
    progressFill.style.width = '100%';
    percentageText.textContent = "100%";
    statusText.textContent = "SKIPPING TO LUXURY";
    statusText.style.color = "#c19a5b";
    
    // Mark all detail items as completed
    detailItems.forEach((item, index) => {
      item.classList.add('completed');
    });
    
    // Create quick sparkle effect
    createSparkleBurst();
    
    // Fade out quickly
    setTimeout(() => {
      preloader.classList.add('fade-out');
      document.body.style.overflow = 'auto';
      
      setTimeout(() => {
        preloader.style.display = 'none';
        initializeMainWebsite();
      }, 800);
    }, 500);
  });
  
  // Add key press skip (ESC key)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && preloader && !preloader.classList.contains('fade-out')) {
      skipPreloaderBtn.click();
    }
  });
  
  // Start loading simulation after a brief pause for dramatic effect
  setTimeout(() => {
    simulateLuxuryLoading();
  }, 800);
  
  // Add CSS for burst animation
  const burstStyle = document.createElement('style');
  burstStyle.textContent = `
    @keyframes burstSparkle {
      0% {
        opacity: 1;
        transform: translate(0, 0) scale(1);
      }
      100% {
        opacity: 0;
        transform: translate(var(--end-x), var(--end-y)) scale(0);
      }
    }
  `;
  document.head.appendChild(burstStyle);
});

// ===========================================
// MAIN WEBSITE FUNCTIONALITY
// ===========================================
function initializeMainWebsite() {
  // PRELOADER
  window.addEventListener("load", () => {
    setTimeout(() => {
      document.querySelector(".preloader").style.opacity = "0";
      document.querySelector(".preloader").style.pointerEvents = "none";
      document.body.style.overflow = "auto";
    }, 2000);
  });

  // SLIDES + TAGLINES
  const slides = document.querySelectorAll(".slide");
  const heroText = document.getElementById("heroText");
  const subtitle = document.getElementById("subtitle");
  const headline = document.getElementById("headline");
  const socialIcons = document.querySelectorAll('.social-icon');

  const textData = [
    {
      subtitle: "THE ULTIMATE LUXURY EXPERIENCE",
      headline: "ENJOY THE BEST<br>MOMENTS OF LIFE"
    },
    {
      subtitle: "COMFORT REDEFINED",
      headline: "WHERE ELEGANCE<br>MEETS TRANQUILITY"
    },
    {
      subtitle: "DESIGNED FOR YOU",
      headline: "EXPERIENCE TRUE<br>HOSPITALITY"
    },
    {
      subtitle: "A STAY TO REMEMBER",
      headline: "LUXURY THAT<br>FEELS LIKE HOME"
    }
  ];

  let current = 0;
  let slideInterval;

  function startSlideShow() {
    slideInterval = setInterval(() => {
      changeSlide();
    }, 6500);
  }

  function changeSlide() {
    slides[current].classList.remove("active");
    heroText.classList.add("text-out");

    current = (current + 1) % slides.length;
    slides[current].classList.add("active");

    setTimeout(() => {
      subtitle.textContent = textData[current].subtitle;
      headline.innerHTML = textData[current].headline;
      heroText.classList.remove("text-out");
      
      // Reset and sync social icon animations
      socialIcons.forEach(icon => {
        icon.style.animation = 'none';
        void icon.offsetWidth; // Trigger reflow
        icon.style.animation = '';
      });
    }, 600);
  }

  // Initialize slideshow
  startSlideShow();

  // HAMBURGER MENU (FULLY FUNCTIONAL)
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");

  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    mobileMenu.classList.toggle("active");
    hamburger.classList.toggle("active");
    
    // Prevent body scroll when menu is open
    if (mobileMenu.classList.contains("active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  });

  mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
      hamburger.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  });

  document.addEventListener("click", e => {
    if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target) && mobileMenu.classList.contains("active")) {
      mobileMenu.classList.remove("active");
      hamburger.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      mobileMenu.classList.remove("active");
      hamburger.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });

  // BOOKING
  document.querySelector(".book-btn").addEventListener("click", () => {
    const inDate = document.getElementById('checkin').value;
    const outDate = document.getElementById('checkout').value;

    if (!inDate || !outDate) {
      alert("Please select your dates.");
      return;
    }

    if (new Date(outDate) <= new Date(inDate)) {
      alert("Check-out must be after check-in.");
      return;
    }

    alert("Booking request received.");
  });

  // Pause social icon animations on hover
  socialIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
      icon.style.animationPlayState = 'paused';
    });
    
    icon.addEventListener('mouseleave', () => {
      icon.style.animationPlayState = 'running';
    });
  });

  // STICKY NAVBAR IMPLEMENTATION
  // Create sticky navbar HTML
  const stickyNav = document.createElement('nav');
  stickyNav.className = 'sticky-nav';
  stickyNav.innerHTML = `
    <div class="nav-container">
      <div class="logo">
        <img src="./images/westbrook logo.png" alt="WestBrook Hotel">
      </div>
      
      <div class="nav-links">
        <a href="index.html" class="nav-link active">HOME</a>
        <a href="about.html" class="nav-link">ABOUT</a>
        <a href="rooms-suites.html" class="nav-link">ROOMS & SUITES</a>
        <a href="experience.html" class="nav-link">EXPERIENCE</a>
        <a href="contact.html" class="nav-link">CONTACT</a>
      </div>
      
      <button class="book-btn">BOOK NOW</button>
      
      <button class="hamburger-btn" id="stickyHamburger">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  `;
  
  // Create mobile menu overlay
  const mobileMenuOverlay = document.createElement('div');
  mobileMenuOverlay.className = 'mobile-menu-overlay';
  mobileMenuOverlay.innerHTML = `
    <button class="menu-close-btn" id="menuCloseBtn">
      <span></span>
      <span></span>
    </button>
    
    <div class="mobile-menu-container">
      <a href="index.html" class="active">HOME</a>
      <a href="about.html">ABOUT</a>
      <a href="rooms-suites.html">ROOMS & SUITES</a>
      <a href="experience.html">EXPERIENCE</a>
      <a href="contact.html">CONTACT</a>
      <a href="#">SPECIAL OFFERS</a>
      
      <div class="mobile-contact-info">
        <p>RESERVATIONS</p>
        <div class="phone">+234 809 999 1244</div>
        <div class="phone">+234 704 282 5937</div>
      </div>
    </div>
  `;
  
  // Insert elements into DOM
  document.body.insertBefore(stickyNav, document.body.firstChild);
  document.body.appendChild(mobileMenuOverlay);
  
  // Get elements
  const stickyNavbar = document.querySelector('.sticky-nav');
  const stickyHamburger = document.getElementById('stickyHamburger');
  const menuCloseBtn = document.getElementById('menuCloseBtn');
  const mobileLinks = mobileMenuOverlay.querySelectorAll('a');
  const bookBtn = stickyNavbar.querySelector('.book-btn');
  const navLinks = stickyNavbar.querySelectorAll('.nav-link');
  
  // Show sticky navbar after hero section
  let lastScrollY = window.scrollY;
  let ticking = false;
  
  function updateNavbar() {
    const heroHeight = document.querySelector('.hero').offsetHeight;
    const scrollPosition = window.scrollY;
    
    // Show/hide navbar based on scroll
    if (scrollPosition > heroHeight * 0.3) {
      stickyNavbar.classList.add('visible');
    } else {
      stickyNavbar.classList.remove('visible');
    }
    
    // Add scrolled class for background change
    if (scrollPosition > 100) {
      stickyNavbar.classList.add('scrolled');
    } else {
      stickyNavbar.classList.remove('scrolled');
    }
    
    // Add elevated class for further scrolling
    if (scrollPosition > 300) {
      stickyNavbar.classList.add('elevated');
    } else {
      stickyNavbar.classList.remove('elevated');
    }
    
    // Update active link based on scroll position
    updateActiveLink(scrollPosition);
  }
  
  function updateActiveLink(scrollY) {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}` || 
              (sectionId === 'about' && link.getAttribute('href') === 'about.html') ||
              (sectionId === 'rooms' && link.getAttribute('href') === 'rooms-suites.html') ||
              (sectionId === 'experience' && link.getAttribute('href') === 'experience.html') ||
              (sectionId === 'contact' && link.getAttribute('href') === 'contact.html')) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  // Mobile menu functionality
  function openMobileMenu() {
    mobileMenuOverlay.classList.add('active');
    stickyHamburger.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  function closeMobileMenu() {
    mobileMenuOverlay.classList.remove('active');
    stickyHamburger.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
  
  // Fix for sticky navbar link clicks - proper navigation
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      
      // Update active state
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      
      if (href.includes('.html')) {
        // External page navigation
        window.location.href = href;
      } else if (href.startsWith('#')) {
        // Internal section navigation
        const targetSection = document.querySelector(href);
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Menu item click effect for mobile
  mobileLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Add click animation
      link.style.transform = 'scale(0.95)';
      link.style.transition = 'transform 0.2s ease';
      
      // Add highlight effect
      link.style.backgroundColor = 'rgba(193, 154, 91, 0.1)';
      
      setTimeout(() => {
        link.style.transform = 'scale(1)';
        link.style.backgroundColor = '';
      }, 200);
      
      // Close menu after delay
      setTimeout(() => {
        closeMobileMenu();
        
        // Check if it's an anchor link or external page
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
          const targetSection = document.querySelector(href);
          if (targetSection) {
            window.scrollTo({
              top: targetSection.offsetTop - 80,
              behavior: 'smooth'
            });
          }
        } else if (href.includes('.html')) {
          // Navigate to external page
          window.location.href = href;
        }
      }, 300);
    });
  });
  
  // Book button animation
  bookBtn.addEventListener('mouseenter', () => {
    bookBtn.style.transform = 'translateY(-2px)';
  });
  
  bookBtn.addEventListener('mouseleave', () => {
    bookBtn.style.transform = 'translateY(0)';
  });
  
  bookBtn.addEventListener('click', () => {
    // Add bounce effect
    bookBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
      bookBtn.style.transform = 'scale(1)';
    }, 150);
    
    // Scroll to booking section or show modal
    const bookingBar = document.querySelector('.booking-bar');
    if (bookingBar) {
      window.scrollTo({
        top: bookingBar.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  });
  
  // Event Listeners
  window.addEventListener('scroll', onScroll);
  stickyHamburger.addEventListener('click', openMobileMenu);
  menuCloseBtn.addEventListener('click', closeMobileMenu);
  
  // Close menu on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) {
      closeMobileMenu();
    }
  });
  
  // Close menu when clicking outside
  mobileMenuOverlay.addEventListener('click', (e) => {
    if (e.target === mobileMenuOverlay) {
      closeMobileMenu();
    }
  });
  
  // Initialize navbar
  updateNavbar();
  
  // Throttle scroll events
  function onScroll() {
    lastScrollY = window.scrollY;
    
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateNavbar();
        ticking = false;
      });
      ticking = true;
    }
  }
  
  // Add CSS for ripple animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(2);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // ===========================================
  // NEW SECTIONS FUNCTIONALITY
  // ===========================================

  // Testimonials Slider
  const testimonials = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.dot');
  let currentTestimonial = 0;

  function showTestimonial(index) {
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
    currentTestimonial = index;
  }

  // Auto-rotate testimonials
  let testimonialInterval = setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
  }, 5000);

  // Dot click events
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      clearInterval(testimonialInterval);
      showTestimonial(index);
      // Restart auto-rotation
      testimonialInterval = setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
      }, 5000);
    });
  });

  // Pause auto-rotation on hover
  const testimonialsContainer = document.querySelector('.testimonials-slider');
  testimonialsContainer.addEventListener('mouseenter', () => {
    clearInterval(testimonialInterval);
  });

  testimonialsContainer.addEventListener('mouseleave', () => {
    testimonialInterval = setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(currentTestimonial);
    }, 5000);
  });

  // Gallery modal functionality
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const imgSrc = item.querySelector('img').src;
      const title = item.querySelector('h3').textContent;
      const description = item.querySelector('p').textContent;
      
      // Create modal
      const modal = document.createElement('div');
      modal.className = 'gallery-modal';
      modal.innerHTML = `
        <div class="modal-content">
          <button class="modal-close"><i class="fas fa-times"></i></button>
          <img src="${imgSrc}" alt="${title}">
          <div class="modal-info">
            <h3>${title}</h3>
            <p>${description}</p>
          </div>
        </div>
      `;
      
      document.body.appendChild(modal);
      document.body.style.overflow = 'hidden';
      
      // Close modal
      const closeBtn = modal.querySelector('.modal-close');
      closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
        document.body.style.overflow = 'auto';
      });
      
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          document.body.removeChild(modal);
          document.body.style.overflow = 'auto';
        }
      });
      
      // Close on ESC
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.body.contains(modal)) {
          document.body.removeChild(modal);
          document.body.style.overflow = 'auto';
        }
      });
    });
  });

  // Contact form submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form values
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);
      
      // In a real application, you would send this to a server
      console.log('Form submitted:', data);
      
      // Show success message
      const submitBtn = contactForm.querySelector('.submit-btn');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = '<i class="fas fa-check"></i> MESSAGE SENT!';
      submitBtn.style.background = '#4CAF50';
      
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        contactForm.reset();
        
        // Show thank you message
        alert('Thank you for your message! We will get back to you within 24 hours.');
      }, 2000);
    });
  }

  // Newsletter subscription
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const submitBtn = newsletterForm.querySelector('button');
      
      if (emailInput.value) {
        const originalHtml = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-check"></i>';
        submitBtn.style.background = '#4CAF50';
        
        setTimeout(() => {
          submitBtn.innerHTML = originalHtml;
          submitBtn.style.background = '';
          emailInput.value = '';
          alert('Thank you for subscribing to our newsletter!');
        }, 2000);
      }
    });
  }

  // Back to top button
  const backToTop = document.getElementById('backToTop');

  function toggleBackToTop() {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('scroll', toggleBackToTop);

  // Room booking buttons
  const roomBookBtns = document.querySelectorAll('.room-book-btn');
  roomBookBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const roomName = btn.closest('.room-card').querySelector('.room-name').textContent;
      const roomPrice = btn.closest('.room-card').querySelector('.room-price').textContent;
      
      // Scroll to booking section
      const bookingBar = document.querySelector('.booking-bar');
      if (bookingBar) {
        window.scrollTo({
          top: bookingBar.offsetTop - 100,
          behavior: 'smooth'
        });
        
        // Optional: Show a notification about which room was selected
        setTimeout(() => {
          const bookingBtn = document.querySelector('.book-btn');
          bookingBtn.style.animation = 'pulse 2s ease';
          setTimeout(() => {
            bookingBtn.style.animation = '';
          }, 2000);
        }, 1000);
      }
    });
  });

  // Add smooth scrolling to all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes on scroll
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
        }
      });
    }, observerOptions);

    // Observe all new sections
    document.querySelectorAll('.rooms-grid, .experience-grid, .testimonials-container, .gallery-grid, .contact-container').forEach(el => {
      observer.observe(el);
    });
    
    // Initialize back to top button
    toggleBackToTop();
  });

  // Add CSS for modal
  const modalStyle = document.createElement('style');
  modalStyle.textContent = `
    .gallery-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.95);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    .modal-content {
      max-width: 90%;
      max-height: 90%;
      position: relative;
      animation: zoomIn 0.3s ease;
    }
    
    @keyframes zoomIn {
      from { transform: scale(0.8); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    
    .modal-content img {
      max-width: 100%;
      max-height: 70vh;
      border-radius: 10px;
    }
    
    .modal-close {
      position: absolute;
      top: -40px;
      right: -40px;
      background: none;
      border: none;
      color: #fff;
      font-size: 24px;
      cursor: pointer;
      transition: color 0.3s ease;
    }
    
    .modal-close:hover {
      color: #c19a5b;
    }
    
    .modal-info {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      padding: 20px;
      border-radius: 0 0 10px 10px;
      text-align: center;
    }
    
    .modal-info h3 {
      font-family: 'Playfair Display', serif;
      color: #fff;
      margin-bottom: 10px;
    }
    
    .modal-info p {
      color: rgba(255, 255, 255, 0.7);
    }
    
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
  `;

  document.head.appendChild(modalStyle);
}

// Initialize main website when preloader completes
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    // The preloader will handle initialization
  });
} else {
  // DOM already loaded, check if preloader is still showing
  const preloader = document.getElementById('preloader');
  if (!preloader || preloader.style.display === 'none') {
    initializeMainWebsite();
  }
}