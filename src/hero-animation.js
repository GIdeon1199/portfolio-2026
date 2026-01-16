import gsap from 'https://cdn.skypack.dev/gsap';
import { ScrollTrigger } from 'https://cdn.skypack.dev/gsap/ScrollTrigger';

export function initHeroAnimation() {
    // Ensure ScrollTrigger is registered
    gsap.registerPlugin(ScrollTrigger);

    const heroSection = document.querySelector('.hero-section-fix');
    const heroTitle = document.querySelector('.hero-title');

    if (!heroSection || !heroTitle) return;

    // Initial State: Set opacity to 0 for fade-in
    gsap.set(heroTitle.children, { y: 100, opacity: 0 });

    console.log("Hero Animation: Found elements, starting...");

    // 1. Entry Animation (Fade Up)
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to(heroTitle.children, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        delay: 0.2
    });

    // 2. Micro-Interaction: Subtle Parallax on Mouse Move
    heroSection.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20; // Subtle movement
        const y = (e.clientY / window.innerHeight - 0.5) * 20;

        gsap.to(heroTitle, {
            x: x,
            y: y,
            duration: 1,
            ease: 'power2.out'
        });
    });
}
