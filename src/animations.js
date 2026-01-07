/**
 * Smooth reveal animations and interaction handling
 */

export function initAnimations() {
  setupIntersectionObserver();
  setupParallax();
  setupStickyNav();
}

function setupIntersectionObserver() {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, options);

  // Target elements with animation classes
  const elements = document.querySelectorAll('.fade-up, .reveal-text');
  elements.forEach(el => observer.observe(el));
}

function setupParallax() {
  const heroText = document.querySelector('.hero-text');

  if (!heroText) return;

  let currentScroll = 0;
  let targetScroll = 0;

  window.addEventListener('scroll', () => {
    targetScroll = window.scrollY;
  });

  function animate() {
    // Lerp for smooth movement
    currentScroll += (targetScroll - currentScroll) * 0.1;

    // Applying parallax: Text moves slower than scroll (0.4 factor)
    // Adding a slight opacity fade out as you scroll down
    if (heroText) {
      heroText.style.transform = `translateY(${currentScroll * 0.4}px)`;
      heroText.style.opacity = Math.max(0, 1 - (currentScroll / 800));
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

function setupStickyNav() {
  // Logic if we need dynamic changes to the sticky corners based on scroll pos
  // Currently handled by CSS fixed positioning
}
