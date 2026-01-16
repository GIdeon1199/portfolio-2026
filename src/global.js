// GLOBAL POLISH: Custom Cursor & Page Transitions
import { initNavigation } from './navigation.js';
// Import back-to-top as side effect
import './back-to-top.js';
import { animationController } from './animation-controller.js';
import { initHeroAnimation } from './hero-animation.js'; // NEW
import { initHeroShapes } from './hero-shapes.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Page Fade In
    // 1. Page Fade In - FAILSAFE
    // Add 'loaded' class immediately if not already present, but allow a tiny frame for CSS transition
    setTimeout(() => {
        document.body.classList.add('loaded');
        // Also add js-loaded to match index.html just in case, though style.css uses .loaded
        document.body.classList.add('js-loaded');
    }, 50);

    // Initialize Navigation (Page Transitions & Scroll Animations)
    try { initNavigation(); } catch (e) { console.error("Navigation Init Failed", e); }

    // Initialize Animation System (Lenis + GSAP)
    try { animationController.init(); } catch (e) { console.error("Animation Controller Failed", e); }

    // Initialize Hero Animation (Pinning)
    try { initHeroAnimation(); } catch (e) { console.error("Hero Animation Failed", e); }
    try { initHeroShapes(); } catch (e) { console.error("Hero Shapes Failed", e); }

    console.log("✅ Global: Initialized");
    // Initialize Cursor if desktop
    // Initialize Cursor - DISABLED per user request
    // if (window.matchMedia('(min-width: 992px)').matches) {
    //     initCustomCursor();
    // } else {
    document.body.style.opacity = 1;
    document.body.style.cursor = 'auto';
    // }
});

function initCustomCursor() {
    // Create cursor if not exists
    let cursor = document.getElementById('custom-cursor');
    if (!cursor) {
        cursor = document.createElement('div');
        cursor.id = 'custom-cursor';
        cursor.classList.add('custom-cursor');
        document.body.appendChild(cursor);
    }

    // Move logic
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Hover logic
    const hoverTargets = document.querySelectorAll('a, button, .project-card, .btn');
    hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
    });
}
