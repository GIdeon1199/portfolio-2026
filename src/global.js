
// GLOBAL POLISH: Custom Cursor & Page Transitions

document.addEventListener('DOMContentLoaded', () => {
    // 1. Page Fade In
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 50);

    // Initialize Cursor if desktop
    if (window.matchMedia('(min-width: 992px)').matches) {
        initCustomCursor();
        initPageTransitions();
    } else {
        // Just fade in on mobile, no cursor/transition logic needed
        document.body.style.opacity = 1;
        document.body.style.cursor = 'auto';
    }
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

function initPageTransitions() {
    const links = document.querySelectorAll('a');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            const target = link.getAttribute('target');

            // Skip if external, anchor, or download
            if (!href || href.startsWith('#') || href.startsWith('mailto:') || target === '_blank') return;

            // Internal link -> Fade out
            e.preventDefault();
            document.body.classList.remove('loaded');

            setTimeout(() => {
                window.location.href = href;
            }, 400); // Wait for CSS transition
        });
    });
}
