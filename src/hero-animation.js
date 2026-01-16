import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initHeroAnimation() {
    // Ensure ScrollTrigger is registered
    gsap.registerPlugin(ScrollTrigger);

    const heroSection = document.querySelector('.hero-section-fix');
    const heroTitle = document.querySelector('.hero-title');

    if (!heroSection || !heroTitle) return;

    // Initial State: Set opacity to 0 for fade-in
    gsap.set(heroTitle.children, { y: 100, opacity: 0 });

    // 1. Entry Animation (Fade Up)
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to(heroTitle.children, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        delay: 0.2
    });

    // 2. Scroll Interaction (Pin & Fade)
    // We pin the hero section so the user "scrubs" through the fade out
    ScrollTrigger.create({
        trigger: heroSection,
        start: "top top", // Pin when top of hero hits top of viewport
        end: "+=800", // Drag out the animation for 800px of scrolling
        pin: true,
        scrub: true,

        animation: gsap.to(heroTitle, {
            scale: 1.5, // Zoom IN logic (or out, user choice, let's try zoom out/fade)
            opacity: 0,
            y: -100,
            ease: "none"
        })
    });
}
