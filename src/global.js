import { initNavigation } from './navigation.js';
import './back-to-top.js';
import { animationController } from './animation-controller.js';
import { initHeroAnimation } from './hero-animation.js';
import { initHeroShapes } from './hero-shapes.js';
import { initDecryptEffect } from './decrypt-effect.js';

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.body.classList.add('loaded');
        document.body.classList.add('js-loaded');
    }, 50);

    try { initNavigation(); } catch (e) { console.error("Navigation Init Failed", e); }
    try { animationController.init(); } catch (e) { console.error("Animation Controller Failed", e); }
    try { initHeroAnimation(); } catch (e) { console.error("Hero Animation Failed", e); }
    try { initHeroShapes(); } catch (e) { console.error("Hero Shapes Failed", e); }
    try { initDecryptEffect(); } catch (e) { console.error("Decrypt Effect Failed", e); }

    console.log("✅ Global: Initialized");

    document.body.style.opacity = 1;
    document.body.style.cursor = 'auto';
});

function initCustomCursor() {
    let cursor = document.getElementById('custom-cursor');
    if (!cursor) {
        cursor = document.createElement('div');
        cursor.id = 'custom-cursor';
        cursor.classList.add('custom-cursor');
        document.body.appendChild(cursor);
    }

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    const hoverTargets = document.querySelectorAll('a, button, .project-card, .btn');
    hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
    });
}
