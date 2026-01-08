/**
 * Navigation & Page Transition System
 * Handles smooth page transitions and navigation state
 */

export class PageTransition {
  constructor() {
    this.overlay = this.createOverlay();
    this.setupListeners();
  }

  createOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'page-transition';
    document.body.appendChild(overlay);
    return overlay;
  }

  setupListeners() {
    // Intercept all internal links
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link && link.href && link.origin === window.location.origin && !link.hasAttribute('target')) {
        // Check if it's not an anchor link
        if (!link.getAttribute('href').startsWith('#')) {
          e.preventDefault();
          this.navigate(link.href);
        }
      }
    });
  }

  async navigate(url) {
    // Activate transition overlay
    this.overlay.classList.add('active');
    
    // Wait for transition
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Navigate to new page
    window.location.href = url;
  }
}

/**
 * Scroll-based animations
 * Fades in elements as they come into view
 */
export class ScrollAnimations {
  constructor() {
    this.observer = this.createObserver();
    this.observeElements();
  }

  createObserver() {
    const options = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    return new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          this.observer.unobserve(entry.target);
        }
      });
    }, options);
  }

  observeElements() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => this.observer.observe(el));
  }
}

/**
 * Initialize navigation system
 */
export function initNavigation() {
  // Initialize page transitions
  new PageTransition();
  
  // Initialize scroll animations
  new ScrollAnimations();
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
