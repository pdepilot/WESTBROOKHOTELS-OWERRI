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
  const inDate = checkin.value;
  const outDate = checkout.value;

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
document.addEventListener('DOMContentLoaded', () => {
  // Create sticky navbar HTML
  const stickyNav = document.createElement('nav');
  stickyNav.className = 'sticky-nav';
  stickyNav.innerHTML = `
    <div class="nav-container">
      <div class="logo">
        <img src="./images/westbrook logo.png" alt="WestBrook Hotel">
      </div>
      
      <div class="nav-links">
        <a href="#" class="active">HOME</a>
        <a href="#about">ABOUT</a>
        <a href="#">ROOMS & SUITES</a>
        <a href="#">EXPERIENCE</a>
        <a href="#">CONTACT</a>
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
      <a href="#" class="active">HOME</a>
      <a href="#about">ABOUT</a>
      <a href="#">ROOMS & SUITES</a>
      <a href="#">EXPERIENCE</a>
      <a href="#">CONTACT</a>
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
    const navLinks = stickyNavbar.querySelectorAll('.nav-links a');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
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
  
  // Mobile menu functionality
  function openMobileMenu() {
    mobileMenuOverlay.classList.add('active');
    stickyHamburger.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add ripple effect to the clicked hamburger
    addRippleEffect(stickyHamburger);
  }
  
  function closeMobileMenu() {
    mobileMenuOverlay.classList.remove('active');
    stickyHamburger.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Add ripple effect to the close button
    addRippleEffect(menuCloseBtn);
  }
  
  // Ripple effect function
  function addRippleEffect(element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(193, 154, 91, 0.3);
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      width: ${size}px;
      height: ${size}px;
      top: ${(rect.height - size) / 2}px;
      left: ${(rect.width - size) / 2}px;
      pointer-events: none;
    `;
    
    element.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }
  
  // Menu item click effect
  function onMenuItemClick(event) {
    event.preventDefault();
    
    // Add click animation
    const link = event.currentTarget;
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
      
      // Scroll to section if it's an anchor link
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        const targetSection = document.querySelector(href);
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }
    }, 300);
  }
  
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
  
  // Add click events to mobile menu links
  mobileLinks.forEach(link => {
    link.addEventListener('click', onMenuItemClick);
  });
  
  // Also add click events to desktop nav links for smooth scrolling
  const desktopLinks = stickyNavbar.querySelectorAll('.nav-links a');
  desktopLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      
      if (href.startsWith('#')) {
        const targetSection = document.querySelector(href);
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }
      
      // Update active state
      desktopLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });
  
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
});

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

// Add smooth scrolling to all links
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

// ===========================================
// ENHANCED BOOKING FORM FUNCTIONALITY
// ===========================================

// Initialize date inputs with tomorrow's date as minimum
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const tomorrowStr = tomorrow.toISOString().split('T')[0];

const checkinInput = document.getElementById('checkin');
const checkoutInput = document.getElementById('checkout');

if (checkinInput) {
  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0];
  checkinInput.min = today;
  checkinInput.value = today;
  
  // Set checkout minimum to tomorrow
  checkoutInput.min = tomorrowStr;
  
  // When checkin changes, update checkout min
  checkinInput.addEventListener('change', function() {
    const checkinDate = new Date(this.value);
    checkinDate.setDate(checkinDate.getDate() + 1);
    const nextDay = checkinDate.toISOString().split('T')[0];
    checkoutInput.min = nextDay;
    
    // If checkout is before new min, reset it
    if (checkoutInput.value && new Date(checkoutInput.value) < checkinDate) {
      checkoutInput.value = nextDay;
    }
  });
}

// Enhanced booking form validation
const bookBtn = document.querySelector('.book-btn');
if (bookBtn) {
  bookBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    const checkin = checkinInput.value;
    const checkout = checkoutInput.value;
    const adults = document.getElementById('adults').value;
    const children = document.getElementById('children').value;
    
    // Validation
    if (!checkin || !checkout) {
      showBookingAlert('Please select both check-in and check-out dates.', 'error');
      return;
    }
    
    if (new Date(checkout) <= new Date(checkin)) {
      showBookingAlert('Check-out date must be after check-in date.', 'error');
      return;
    }
    
    if (parseInt(adults) === 0) {
      showBookingAlert('Please select at least 1 adult.', 'error');
      return;
    }
    
    // Calculate nights
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);
    const nights = Math.ceil((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24));
    
    // Show success message with booking summary
    const summary = `
      Booking Summary:
      • Check-in: ${formatDate(checkin)}
      • Check-out: ${formatDate(checkout)}
      • Nights: ${nights}
      • Adults: ${adults}
      • Children: ${children}
      
      Your reservation request has been received. Our team will contact you shortly.
    `;
    
    showBookingAlert(summary, 'success');
    
    // Animate booking button
    animateBookingButton();
  });
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function showBookingAlert(message, type) {
  // Remove existing alert if any
  const existingAlert = document.querySelector('.booking-alert');
  if (existingAlert) {
    existingAlert.remove();
  }
  
  // Create alert element
  const alert = document.createElement('div');
  alert.className = `booking-alert ${type}`;
  alert.innerHTML = `
    <div class="alert-content">
      <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
      <div class="alert-message">${message.replace(/\n/g, '<br>')}</div>
      <button class="alert-close"><i class="fas fa-times"></i></button>
    </div>
  `;
  
  document.body.appendChild(alert);
  
  // Close alert
  const closeBtn = alert.querySelector('.alert-close');
  closeBtn.addEventListener('click', () => {
    alert.classList.add('fade-out');
    setTimeout(() => alert.remove(), 300);
  });
  
  // Auto-close success alerts after 8 seconds
  if (type === 'success') {
    setTimeout(() => {
      if (alert.parentNode) {
        alert.classList.add('fade-out');
        setTimeout(() => alert.remove(), 300);
      }
    }, 8000);
  }
}

function animateBookingButton() {
  const bookBtn = document.querySelector('.book-btn');
  bookBtn.classList.add('processing');
  bookBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> PROCESSING...';
  
  setTimeout(() => {
    bookBtn.classList.remove('processing');
    bookBtn.innerHTML = 'BOOK NOW';
  }, 2000);
}

// ===========================================
// MOBILE RESERVATION CREATION
// ===========================================
function createMobileReservation() {
  // Check if mobile reservation already exists
  if (document.querySelector('.mobile-reservation')) return;
  
  // Create mobile reservation element
  const mobileReservation = document.createElement('div');
  mobileReservation.className = 'mobile-reservation';
  mobileReservation.innerHTML = `
    <span class="label">RESERVATION</span>
    <span class="divider"></span>
    <span class="phone-icon">
      <i class="fas fa-phone"></i>
    </span>
    <span class="phone">
      +234 809 999 1244<br>
      +234 704 282 5937
    </span>
  `;
  
  // Add to hero section
  const hero = document.querySelector('.hero');
  hero.appendChild(mobileReservation);
  
  // Add click event to phone icon
  const phoneIcon = mobileReservation.querySelector('.phone-icon');
  phoneIcon.addEventListener('click', () => {
    // Animate phone icon
    phoneIcon.style.transform = 'scale(0.9)';
    setTimeout(() => {
      phoneIcon.style.transform = 'scale(1)';
    }, 200);
    
    // Show call dialog
    if (window.confirm('Call +234 809 999 1244?')) {
      window.location.href = 'tel:+2348099991244';
    }
  });
}

// ===========================================
// ENHANCED SCROLL PROGRESS WITH PERCENTAGE
// ===========================================
function createScrollProgress() {
  // Check if scroll progress already exists
  if (document.querySelector('.scroll-progress-container')) return;
  
  // Create scroll progress container
  const scrollProgressContainer = document.createElement('div');
  scrollProgressContainer.className = 'scroll-progress-container';
  scrollProgressContainer.innerHTML = `
    <div class="scroll-progress">
      <svg class="scroll-progress-circle" viewBox="0 0 100 100">
        <circle class="scroll-progress-circle-bg" cx="50" cy="50" r="45"></circle>
        <circle class="scroll-progress-circle-fill" cx="50" cy="50" r="45"></circle>
      </svg>
      <div class="scroll-progress-text">0%</div>
    </div>
    <button class="enhanced-back-to-top">
      <i class="fas fa-chevron-up"></i>
    </button>
  `;
  
  document.body.appendChild(scrollProgressContainer);
  
  // Get elements
  const scrollProgressFill = document.querySelector('.scroll-progress-circle-fill');
  const scrollProgressText = document.querySelector('.scroll-progress-text');
  const backToTopBtn = document.querySelector('.enhanced-back-to-top');
  
  // Calculate scroll percentage
  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = scrollTop / docHeight;
    
    // Update circle
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (scrollPercent * circumference);
    scrollProgressFill.style.strokeDashoffset = offset;
    
    // Update percentage text
    const percent = Math.round(scrollPercent * 100);
    scrollProgressText.textContent = `${percent}%`;
    
    // Show/hide back to top button
    if (scrollPercent > 0.1) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }
  
  // Back to top functionality
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Animate button
    backToTopBtn.style.transform = 'scale(0.9)';
    setTimeout(() => {
      backToTopBtn.style.transform = '';
    }, 200);
  });
  
  // Throttle scroll event
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateScrollProgress();
        ticking = false;
      });
      ticking = true;
    }
  });
  
  // Initial update
  updateScrollProgress();
}

// ===========================================
// INITIALIZE NEW FEATURES
// ===========================================
document.addEventListener('DOMContentLoaded', () => {
  // Create mobile reservation on load
  createMobileReservation();
  
  // Create scroll progress
  createScrollProgress();
  
  // Check screen size and update mobile reservation
  function checkScreenSize() {
    const mobileReservation = document.querySelector('.mobile-reservation');
    const originalReservation = document.querySelector('.side-reservation');
    
    if (window.innerWidth <= 768) {
      // Mobile
      if (mobileReservation) mobileReservation.style.display = 'flex';
      if (originalReservation) originalReservation.style.display = 'none';
    } else {
      // Desktop
      if (mobileReservation) mobileReservation.style.display = 'none';
      if (originalReservation) originalReservation.style.display = 'flex';
    }
  }
  
  // Initial check
  checkScreenSize();
  
  // Update on resize
  window.addEventListener('resize', checkScreenSize);
  
  // Update booking button to handle adults/children
  const adultsSelect = document.getElementById('adults');
  const childrenSelect = document.getElementById('children');
  
  if (adultsSelect && childrenSelect) {
    adultsSelect.addEventListener('change', updateBookingSummary);
    childrenSelect.addEventListener('change', updateBookingSummary);
  }
});

function updateBookingSummary() {
  const adults = document.getElementById('adults').value;
  const children = document.getElementById('children').value;
  const checkin = document.getElementById('checkin').value;
  const checkout = document.getElementById('checkout').value;
  
  // In a real application, you would update pricing here
  console.log(`Booking updated: ${adults} adults, ${children} children`);
}

// ===========================================
// STYLES FOR NEW ELEMENTS (Dynamically added)
// ===========================================
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
  /* Booking Alert Styles */
  .booking-alert {
    position: fixed;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(15, 15, 20, 0.95);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(193, 154, 91, 0.3);
    border-radius: 15px;
    padding: 25px;
    max-width: 500px;
    width: 90%;
    z-index: 9999;
    animation: slideDown 0.5s ease;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  }
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }
  
  .booking-alert.fade-out {
    animation: fadeOut 0.3s ease forwards;
  }
  
  @keyframes fadeOut {
    to {
      opacity: 0;
      transform: translateX(-50%) translateY(-20px);
    }
  }
  
  .booking-alert.success {
    border-left: 4px solid #4CAF50;
  }
  
  .booking-alert.error {
    border-left: 4px solid #f44336;
  }
  
  .alert-content {
    display: flex;
    align-items: flex-start;
    gap: 20px;
  }
  
  .booking-alert i {
    font-size: 24px;
    flex-shrink: 0;
  }
  
  .booking-alert.success i {
    color: #4CAF50;
  }
  
  .booking-alert.error i {
    color: #f44336;
  }
  
  .alert-message {
    color: #fff;
    line-height: 1.6;
    flex: 1;
    font-size: 14px;
    white-space: pre-line;
  }
  
  .alert-message strong {
    color: #c19a5b;
  }
  
  .alert-close {
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    font-size: 16px;
    padding: 5px;
    transition: color 0.3s ease;
  }
  
  .alert-close:hover {
    color: #c19a5b;
  }
  
  /* Processing animation for booking button */
  .book-btn.processing {
    background: linear-gradient(135deg, #666 0%, #888 100%);
    cursor: not-allowed;
  }
  
  .book-btn i.fa-spinner {
    margin-right: 10px;
  }
  
  /* Date input styling */
  input[type="date"]::-webkit-calendar-picker-indicator {
    color: #c19a5b;
    opacity: 0.7;
    cursor: pointer;
    transition: opacity 0.3s ease;
  }
  
  input[type="date"]::-webkit-calendar-picker-indicator:hover {
    opacity: 1;
  }
  
  /* Select dropdown styling */
  select {
    cursor: pointer;
  }
  
  /* Booking summary preview */
  .booking-summary-preview {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(15, 15, 20, 0.95);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(193, 154, 91, 0.3);
    border-radius: 10px;
    padding: 15px;
    color: #fff;
    font-size: 12px;
    min-width: 200px;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    pointer-events: none;
  }
  
  .booking-bar:hover .booking-summary-preview {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(-10px);
    pointer-events: auto;
  }
  
  .booking-summary-preview::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 8px solid transparent;
    border-top-color: rgba(193, 154, 91, 0.3);
  }
  
  .summary-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
  }
  
  .summary-item:last-child {
    margin-bottom: 0;
  }
  
  .summary-label {
    color: rgba(255, 255, 255, 0.7);
  }
  
  .summary-value {
    color: #c19a5b;
    font-weight: 500;
  }
`;

document.head.appendChild(dynamicStyles);

// ===========================================
// BOOKING SUMMARY PREVIEW
// ===========================================
function addBookingSummaryPreview() {
  const bookingBar = document.querySelector('.booking-bar');
  if (!bookingBar || document.querySelector('.booking-summary-preview')) return;
  
  const summaryPreview = document.createElement('div');
  summaryPreview.className = 'booking-summary-preview';
  summaryPreview.innerHTML = `
    <div class="summary-item">
      <span class="summary-label">Adults:</span>
      <span class="summary-value" id="preview-adults">2</span>
    </div>
    <div class="summary-item">
      <span class="summary-label">Children:</span>
      <span class="summary-value" id="preview-children">0</span>
    </div>
    <div class="summary-item">
      <span class="summary-label">Nights:</span>
      <span class="summary-value" id="preview-nights">0</span>
    </div>
  `;
  
  bookingBar.appendChild(summaryPreview);
  
  // Update preview on change
  const updatePreview = () => {
    const adults = document.getElementById('adults').value;
    const children = document.getElementById('children').value;
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    
    document.getElementById('preview-adults').textContent = adults;
    document.getElementById('preview-children').textContent = children;
    
    if (checkin && checkout) {
      const checkinDate = new Date(checkin);
      const checkoutDate = new Date(checkout);
      const nights = Math.ceil((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24));
      document.getElementById('preview-nights').textContent = nights;
    }
  };
  
  // Add event listeners
  document.getElementById('adults').addEventListener('change', updatePreview);
  document.getElementById('children').addEventListener('change', updatePreview);
  document.getElementById('checkin').addEventListener('change', updatePreview);
  document.getElementById('checkout').addEventListener('change', updatePreview);
  
  // Initial update
  updatePreview();
}

// Initialize booking summary preview
setTimeout(addBookingSummaryPreview, 1000);