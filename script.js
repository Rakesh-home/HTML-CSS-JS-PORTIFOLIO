// ==================== MOBILE MENU ====================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  // Close menu when clicking on a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
    }
  });
}

// ==================== TYPING ANIMATION ====================
const typingText = document.querySelector('.typing-text');
const phrases = [
  'Computer Vision Engineer',
  'AI/ML Specialist',
  'Full-Stack Developer',
  'Cloud Architect',
  'Problem Solver'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
  const currentPhrase = phrases[phraseIndex];
  
  if (isDeleting) {
    typingText.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typingText.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    isDeleting = true;
    typingSpeed = 2000; // Pause at end
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typingSpeed = 500; // Pause before next phrase
  }

  setTimeout(type, typingSpeed);
}

// Start typing animation
document.addEventListener('DOMContentLoaded', () => {
  if (typingText) {
    setTimeout(type, 1000);
  }
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ==================== NAVBAR SCROLL EFFECT ====================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ==================== SCROLL REVEAL ANIMATIONS ====================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('.section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(30px)';
  section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  observer.observe(section);
});

// Observe cards and other elements
const animatedElements = document.querySelectorAll(
  '.skill-card, .project-card, .education-card, .timeline-item, .contact-card'
);

animatedElements.forEach((element, index) => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(30px)';
  element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
  observer.observe(element);
});

// ==================== BACK TO TOP BUTTON ====================
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTopButton.classList.add('visible');
  } else {
    backToTopButton.classList.remove('visible');
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ==================== ACTIVE NAV LINK ON SCROLL ====================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavLink() {
  let scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', highlightNavLink);

// ==================== COUNTER ANIMATION FOR STATS ====================
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  const counter = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target + (element.textContent.includes('+') ? '+' : '') + 
                           (element.textContent.includes('%') ? '%' : '');
      clearInterval(counter);
    } else {
      element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '') + 
                           (element.textContent.includes('%') ? '%' : '');
    }
  }, 16);
}

// Observe hero stats for counter animation
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
      const statNumbers = entry.target.querySelectorAll('.stat-number');
      statNumbers.forEach(stat => {
        const text = stat.textContent;
        const number = parseInt(text.replace(/\D/g, ''));
        stat.textContent = '0' + (text.includes('+') ? '+' : '') + (text.includes('%') ? '%' : '');
        animateCounter(stat, number);
      });
      entry.target.classList.add('animated');
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  statsObserver.observe(heroStats);
}

// ==================== PROJECT CARD TILT EFFECT ====================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
  });
});

// ==================== SKILL TAGS RANDOM COLOR ====================
const skillTags = document.querySelectorAll('.skill-tag');
const colors = [
  'rgba(0, 212, 255, 0.1)',
  'rgba(99, 102, 241, 0.1)',
  'rgba(245, 158, 11, 0.1)',
  'rgba(16, 185, 129, 0.1)'
];

skillTags.forEach(tag => {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  tag.style.background = randomColor;
});

// ==================== CURSOR TRAIL EFFECT (Optional - Cool Effect) ====================
let cursorTrail = [];
const maxTrailLength = 10;

document.addEventListener('mousemove', (e) => {
  if (window.innerWidth > 768) { // Only on desktop
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = e.pageX + 'px';
    trail.style.top = e.pageY + 'px';
    document.body.appendChild(trail);
    
    cursorTrail.push(trail);
    
    if (cursorTrail.length > maxTrailLength) {
      const oldTrail = cursorTrail.shift();
      oldTrail.remove();
    }
    
    setTimeout(() => {
      trail.style.opacity = '0';
      trail.style.transform = 'scale(0)';
      setTimeout(() => trail.remove(), 300);
    }, 100);
  }
});

// Add cursor trail styles dynamically
const style = document.createElement('style');
style.textContent = `
  .cursor-trail {
    position: absolute;
    width: 6px;
    height: 6px;
    background: rgba(0, 212, 255, 0.6);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: opacity 0.3s, transform 0.3s;
    box-shadow: 0 0 10px rgba(0, 212, 255, 0.8);
  }
`;
document.head.appendChild(style);

// ==================== PARALLAX EFFECT ON SCROLL ====================
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const cubes = document.querySelectorAll('.cube');
  
  cubes.forEach((cube, index) => {
    const speed = (index + 1) * 0.05;
    cube.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
  });
});

// ==================== FOOTER YEAR ====================
const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// ==================== LAZY LOADING IMAGES (When you add real images) ====================
const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.add('loaded');
      imageObserver.unobserve(img);
    }
  });
});

lazyImages.forEach(img => imageObserver.observe(img));

// ==================== PREVENT CONSOLE ERRORS ====================
window.addEventListener('error', (e) => {
  if (e.message.includes('ResizeObserver')) {
    e.stopImmediatePropagation();
  }
});

// ==================== PERFORMANCE OPTIMIZATION ====================
let ticking = false;

function onScroll() {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      highlightNavLink();
      ticking = false;
    });
    ticking = true;
  }
}

window.addEventListener('scroll', onScroll, { passive: true });

// ==================== CONSOLE MESSAGE (Fun Easter Egg) ====================
console.log('%c👋 Hey there, fellow developer!', 'color: #00d4ff; font-size: 20px; font-weight: bold;');
console.log('%cLooking for something? 🔍', 'color: #6366f1; font-size: 16px;');
console.log('%cFeel free to reach out: pandrinkirakesh33@gmail.com', 'color: #10b981; font-size: 14px;');
console.log('%c⭐ Star this portfolio on GitHub!', 'color: #f59e0b; font-size: 14px;');

// ==================== INITIALIZE ====================
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Portfolio loaded successfully!');
  
  // Add active class to current nav link on page load
  const currentLocation = window.location.hash || '#home';
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === currentLocation) {
      link.classList.add('active');
    }
  });
});

// ==================== SMOOTH SCROLL POLYFILL FOR OLDER BROWSERS ====================
if (!('scrollBehavior' in document.documentElement.style)) {
  const smoothScrollPolyfill = document.createElement('script');
  smoothScrollPolyfill.src = 'https://cdn.jsdelivr.net/npm/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js';
  document.head.appendChild(smoothScrollPolyfill);
}