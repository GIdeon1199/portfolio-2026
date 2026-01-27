/**
 * Card Snap - GSAP ScrollTrigger-based smooth snapping for project cards
 * Replaces CSS scroll-snap for smoother animations
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initCardSnap() {
    gsap.registerPlugin(ScrollTrigger);

    const cards = gsap.utils.toArray('.stacking-card');
    const container = document.querySelector('.stacking-work-container');

    if (!container || cards.length === 0) return;

    // Calculate snap positions for each card
    // Each card is 100vh, so positions are 0, 1, 2, 3... in normalized scroll terms
    const snapPositions = cards.map((_, i) => i / (cards.length - 1));

    ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: () => `+=${container.scrollHeight - window.innerHeight}`,
        snap: {
            snapTo: snapPositions,
            duration: { min: 0.3, max: 0.6 }, // Smooth animation duration
            delay: 0.1, // Small delay before snapping
            ease: 'power2.inOut' // Smooth easing
        },
        scrub: false // Don't scrub, just snap
    });

    console.log('✅ Card Snap: Initialized with', cards.length, 'cards');
}
