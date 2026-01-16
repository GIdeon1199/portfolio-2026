export function initHeroShapes() {
    gsap.registerPlugin(ScrollTrigger);

    const shapes = document.querySelectorAll('.hero-shapes .shape');
    if (!shapes.length) return;

    // Randomize initial positions slightly
    shapes.forEach((shape, i) => {
        gsap.set(shape, {
            xPercent: -50,
            yPercent: -50,
            x: gsap.utils.random(-200, 200), // Spread out more
            y: gsap.utils.random(-100, 100),
            rotation: gsap.utils.random(0, 360)
        });
    });

    // 1. Floating Animation (Continuous)
    shapes.forEach((shape, i) => {
        gsap.to(shape, {
            y: `+=${gsap.utils.random(20, 50)}`,
            rotation: `+=${gsap.utils.random(20, 90)}`,
            duration: gsap.utils.random(5, 10),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.5
        });
    });

    // 2. Scroll Parallax
    gsap.to('.shape-circle', {
        scrollTrigger: {
            trigger: '.hero-section-fix',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: -150,
        ease: 'none'
    });

    gsap.to('.shape-square', {
        scrollTrigger: {
            trigger: '.hero-section-fix',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5
        },
        y: -100,
        rotation: 45,
        ease: 'none'
    });



    // 3. Mouse Parallax (Interactive)
    const heroSection = document.querySelector('.hero-section-fix');

    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 50;
            const y = (e.clientY / window.innerHeight - 0.5) * 50;

            gsap.to('.shape-circle', { x: x * 2, y: y * 2, duration: 1, ease: 'power2.out' });
            gsap.to('.shape-square', { x: -x, y: -y, duration: 1, ease: 'power2.out' });
        });
    }
}
