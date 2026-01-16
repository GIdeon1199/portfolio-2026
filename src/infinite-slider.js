import gsap from 'https://cdn.skypack.dev/gsap';
import { ScrollTrigger } from 'https://cdn.skypack.dev/gsap/ScrollTrigger';
import { Draggable } from 'https://cdn.skypack.dev/gsap/Draggable';

export function initInfiniteSlider() {
    gsap.registerPlugin(Draggable); // ScrollTrigger no longer needed for driving animation

    console.log("Initializing Seamless Loop Slider (Horizontal Interaction)...");

    let iteration = 0; // gets iterated when we scroll all the way to the end or start and wraps around

    // set initial state of items
    gsap.set('.cards li', { xPercent: 400, opacity: 0, scale: 0 });

    const spacing = 0.1; // spacing of the cards (stagger)
    const snapTime = gsap.utils.snap(spacing);
    const cards = gsap.utils.toArray('.cards li');

    // animateFunc: called for each element in buildSeamlessLoop
    const animateFunc = element => {
        const tl = gsap.timeline();
        tl.fromTo(element, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, zIndex: 100, duration: 0.5, yoyo: true, repeat: 1, ease: "power1.in", immediateRender: false })
            .fromTo(element, { xPercent: 400 }, { xPercent: -400, duration: 1, ease: "none", immediateRender: false }, 0);
        return tl;
    };

    const seamlessLoop = buildSeamlessLoop(cards, spacing, animateFunc);

    const playhead = { offset: 0 };
    const wrapTime = gsap.utils.wrap(0, seamlessLoop.duration());
    const scrub = gsap.to(playhead, {
        offset: 0,
        onUpdate() {
            seamlessLoop.time(wrapTime(playhead.offset));
        },
        duration: 0.5,
        ease: "power3",
        paused: true
    });

    // --- HORIZONTAL WHEEL / TRACKPAD LOGIC ---
    const gallery = document.querySelector('.gallery');
    if (gallery) {
        gallery.addEventListener('wheel', (e) => {
            // Only capture if it's primarily horizontal
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                e.preventDefault();
                // Adjust sensitivity as needed. 
                // seamlessLoop.duration() * factor
                const sensitivity = 0.001;
                scrub.vars.offset += e.deltaX * sensitivity;
                scrub.invalidate().restart();
            }
        }, { passive: false });
    }


    // --- BUTTON LOGIC ---
    function moveSlider(direction) {
        const currentOffset = scrub.vars.offset;
        const targetOffset = currentOffset + (direction * spacing);
        const snapped = snapTime(targetOffset); // Optional: Snap to exact card

        scrub.vars.offset = snapped;
        scrub.invalidate().restart();
    }

    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");

    // Next button moves forward (positive spacing)
    if (nextBtn) nextBtn.addEventListener("click", () => moveSlider(1));
    // Prev button moves backward (negative spacing)
    if (prevBtn) prevBtn.addEventListener("click", () => moveSlider(-1));

    // --- DRAGGABLE LOGIC ---
    Draggable.create(".drag-proxy", {
        type: "x",
        trigger: ".cards",
        onPress() {
            this.startOffset = scrub.vars.offset;
        },
        onDrag() {
            // Map pixel movement to timeline progress
            // 0.002 is a sensitivity factor for "feel"
            scrub.vars.offset = this.startOffset + (this.startX - this.x) * 0.002;
            scrub.invalidate().restart();
        },
        onDragEnd() {
            // Optional: Snap on release
            const snapped = snapTime(scrub.vars.offset);
            scrub.vars.offset = snapped;
            scrub.invalidate().restart();
        }
    });

    console.log("✅ Seamless Loop Slider: Active (Vertical Scroll Decoupled)");
}

function buildSeamlessLoop(items, spacing, animateFunc) {
    let overlap = Math.ceil(1 / spacing),
        startTime = items.length * spacing + 0.5,
        loopTime = (items.length + overlap) * spacing + 1,
        rawSequence = gsap.timeline({ paused: true }),
        seamlessLoop = gsap.timeline({
            paused: true,
            repeat: -1,
            onRepeat() {
                this._time === this._dur && (this._tTime += this._dur - 0.01);
            }
        }),
        l = items.length + overlap * 2,
        time, i, index;

    for (i = 0; i < l; i++) {
        index = i % items.length;
        time = i * spacing;
        rawSequence.add(animateFunc(items[index]), time);
        i <= items.length && seamlessLoop.add("label" + i, time);
    }

    rawSequence.time(startTime);
    seamlessLoop.to(rawSequence, {
        time: loopTime,
        duration: loopTime - startTime,
        ease: "none"
    }).fromTo(rawSequence, { time: overlap * spacing + 1 }, {
        time: startTime,
        duration: startTime - (overlap * spacing + 1),
        immediateRender: false,
        ease: "none"
    });
    return seamlessLoop;
}
