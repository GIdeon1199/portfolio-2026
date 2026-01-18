import gsap from 'https://cdn.skypack.dev/gsap';
import { ScrollTrigger } from 'https://cdn.skypack.dev/gsap/ScrollTrigger';
import Lenis from 'https://cdn.jsdelivr.net/npm/lenis@1.1.18/+esm';

export class AnimationController {
    constructor() {
        this.lenis = null;
        this.rafId = null;
    }

    init() {
        this.lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        gsap.registerPlugin(ScrollTrigger);
        this.lenis.on('scroll', ScrollTrigger.update);
        this.startRenderLoop();

        console.log('✅ AnimationController: Initialized');
    }

    startRenderLoop() {
        gsap.ticker.add((time) => {
            this.lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
    }

    refresh() {
        if (this.lenis) {
            this.lenis.resize();
            ScrollTrigger.refresh();
        }
    }

    destroy() {
        if (this.lenis) {
            this.lenis.destroy();
            this.lenis = null;
        }
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
        }
        ScrollTrigger.getAll().forEach(t => t.kill());
    }
}

export const animationController = new AnimationController();
