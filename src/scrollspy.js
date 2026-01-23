import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initScrollSpy() {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Find all potential sections to track
    // Refined selector to catch sections
    const allSections = document.querySelectorAll('.case-section, .section-container');
    const trackingData = [];
    const seenHeadings = new Set();

    allSections.forEach((section, index) => {
        // Only track if it has an H2
        const heading = section.querySelector('h2');
        if (!heading) return;

        const headingText = heading.textContent.trim();

        // Skip empty or duplicate headings
        // This is the CRITICAL FIX: duplicated nested containers caused duplicate list items
        if (headingText.length === 0 || seenHeadings.has(headingText)) return;

        seenHeadings.add(headingText);

        // Create a unique ID if not present
        if (!section.id) {
            const slug = headingText
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            section.id = `section-${slug}-${index}`;
        }

        trackingData.push({
            id: section.id,
            label: headingText,
            element: section
        });
    });

    if (trackingData.length === 0) return;

    // 2. Build the Sidebar DOM
    const sidebar = document.createElement('nav');
    sidebar.classList.add('scrollspy-nav');

    // Create the bullet list container
    const ul = document.createElement('ul');
    ul.classList.add('scrollspy-list');

    trackingData.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('scrollspy-item');

        // Structure: Bullet + Label
        // We put the label in a span to animate/show it on hover if desired
        const span = document.createElement('span');
        span.textContent = item.label;
        li.appendChild(span);

        li.dataset.target = item.id;

        li.addEventListener('click', (e) => {
            e.preventDefault();
            const targetEl = document.getElementById(item.id);
            if (targetEl) {
                // Determine offset - roughly header height
                const offset = 100;
                const top = targetEl.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({
                    top: top,
                    behavior: 'smooth'
                });
            }
        });

        ul.appendChild(li);
    });

    sidebar.appendChild(ul);
    document.body.appendChild(sidebar);

    // 3. Logic: Show sidebar only after scrolling past Hero
    const hero = document.querySelector('.case-header') || document.querySelector('header');

    if (hero) {
        ScrollTrigger.create({
            trigger: hero,
            start: "bottom center", // Trigger when bottom of hero hits center of viewport
            onEnter: () => sidebar.classList.add('visible'),
            onLeaveBack: () => sidebar.classList.remove('visible'),
            // Also ensure it is visible if we reload page already scrolled down
            onUpdate: (self) => {
                if (self.progress > 0 && !sidebar.classList.contains('visible')) {
                    sidebar.classList.add('visible');
                }
            }
        });
    } else {
        // Fallback: Show immediately if no hero
        sidebar.classList.add('visible');
    }

    // 4. Active State Tracking logic
    trackingData.forEach(item => {
        ScrollTrigger.create({
            trigger: item.element,
            start: "top center+=100", // Activate slightly before it hits center
            end: "bottom center+=100",
            onEnter: () => setActive(item.id),
            onEnterBack: () => setActive(item.id)
        });
    });

    function setActive(id) {
        // Remove active class from all
        document.querySelectorAll('.scrollspy-item').forEach(el => el.classList.remove('active'));

        // Add to matching
        const match = document.querySelector(`.scrollspy-item[data-target="${id}"]`);
        if (match) match.classList.add('active');
    }
}
