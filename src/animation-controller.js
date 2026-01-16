import gsap from 'https://cdn.skypack.dev/gsap';
import { ScrollTrigger } from 'https://cdn.skypack.dev/gsap/ScrollTrigger';
import Lenis from 'https://cdn.skypack.dev/@studio-freight/lenis';

export class AnimationController {
    constructor() {
        this.lenis = null;
        this.rafId = null;
    }

    init() {
        // 1. Initialize Lenis (Smooth Scrolling)
        this.lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Premium exponential easing
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false, // Default: false (native touch often feels better on mobile)
            touchMultiplier: 2,
        });

        // 2. Register GSAP Plugins
        gsap.registerPlugin(ScrollTrigger);

        // 3. Connect Lenis to GSAP ScrollTrigger
        // This ensures ScrollTrigger updates in sync with smooth scrolling
        this.lenis.on('scroll', ScrollTrigger.update);

        // 4. Start the Render Loop
        this.startRenderLoop();

        console.log('✅ AnimationController: Initialized');
    }

    startRenderLoop() {
        // We use gsap.ticker to drive Lenis for perfect synchronization


        // Inject Lenis ticker into GSAP to ensure perfect sync
        gsap.ticker.add((time) => {
            this.lenis.raf(time * 1000);
        });

        // Disable GSAP's own ticker to avoid double-updates (optional, but good for performance)
        gsap.ticker.lagSmoothing(0);
    }

    refresh() {
        // Call this after page transitions to re-calculate positions
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
        // Kill all ScrollTriggers
        ScrollTrigger.getAll().forEach(t => t.kill());
    }
}

// Export a singleton instance
export const animationController = new AnimationController();
