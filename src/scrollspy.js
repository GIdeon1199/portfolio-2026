import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initScrollSpy() {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Find all potential sections to track
    // Looking for headings that mark distinct sections in the case study
    const contentSections = document.querySelectorAll('.case-section, .section-container');
    const trackingData = [];

    // Filter relevant sections - typically those with an H2
    contentSections.forEach((section, index) => {
        const heading = section.querySelector('h2');
        if (heading && heading.textContent.trim().length > 0) {
            // Create a unique ID if not present
            if (!section.id) {
                const slug = heading.textContent
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)/g, '');
                section.id = `section-${slug}-${index}`;
            }

            trackingData.push({
                id: section.id,
                label: heading.textContent.trim(),
                element: section
            });
        }
    });

    if (trackingData.length === 0) return;

    // 2. Build the Sidebar DOM
    const sidebar = document.createElement('nav');
    sidebar.classList.add('scrollspy-nav');

    const ul = document.createElement('ul');
    ul.classList.add('scrollspy-list');

    trackingData.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('scrollspy-item');
        li.textContent = item.label;
        li.dataset.target = item.id;

        li.addEventListener('click', () => {
            const targetEl = document.getElementById(item.id);
            if (targetEl) {
                // Determine offset - maybe header height or slight buffer
                const offset = 100;
                // Use lenis if available globally, otherwise native scroll
                // Assuming smooth scroll behavior in CSS or Lenis global
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
            start: "bottom center", // When bottom of hero hits center of viewport
            onEnter: () => sidebar.classList.add('visible'),
            onLeaveBack: () => sidebar.classList.remove('visible')
        });
    } else {
        // Fallback: Show immediately if no hero
        sidebar.classList.add('visible');
    }

    // 4. Active State Tracking logic
    // We'll use ScrollTrigger for each section to update the active class on the sidebar
    trackingData.forEach(item => {
        ScrollTrigger.create({
            trigger: item.element,
            start: "top center",
            end: "bottom center",
            onEnter: () => setActive(item.id),
            onEnterBack: () => setActive(item.id)
        });
    });

    function setActive(id) {
        document.querySelectorAll('.scrollspy-item').forEach(el => {
            el.classList.remove('active');
            if (el.dataset.target === id) {
                el.classList.add('active');
            }
        });
    }
}
