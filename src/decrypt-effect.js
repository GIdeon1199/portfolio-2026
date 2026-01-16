import gsap from 'gsap';

export function initDecryptEffect() {
    const target = document.querySelector('.decrypt-text');
    if (!target) return;

    // Define the mapping: Letter -> Symbol
    const mapping = [
        { char: 'U', symbol: '∪' },
        { char: 'N', symbol: 'η' },
        { char: 'O', symbol: '⊙' },
        { char: 'R', symbol: 'ℜ' },
        { char: 'T', symbol: 'τ' },
        { char: 'H', symbol: 'ℏ' },
        { char: 'O', symbol: '⊘' },
        { char: 'D', symbol: '∂' },
        { char: 'O', symbol: '𝟎' },
        { char: 'X', symbol: 'χ' }
    ];

    // Clear and rebuild HTML for granular control
    target.innerHTML = '';
    target.setAttribute('aria-label', 'UNORTHODOX'); // Accessibility

    // Create spans
    const spans = mapping.map((item, index) => {
        const span = document.createElement('span');
        span.textContent = item.symbol; // Start with symbol
        span.dataset.char = item.char;   // Store real char
        span.dataset.symbol = item.symbol; // Store symbol
        span.style.display = 'inline-block';
        span.style.minWidth = '0.6em'; // Prevent layout shift during swap
        target.appendChild(span);
        return span;
    });

    // Hover Animation
    target.addEventListener('mouseenter', () => {
        gsap.to(spans, {
            duration: 0.5,
            stagger: {
                amount: 0.3,
                from: "random" // Scramble feel
            },
            onStart: function () {
                // We use a tween to swap text content
                // But simple textContent swap in onStart/Update is easier
                this.targets().forEach(span => {
                    // Random delay for the swap itself to look glitchy
                    setTimeout(() => {
                        span.textContent = span.dataset.char;
                        span.style.color = 'var(--color-accent)'; // Optional: highlight
                    }, Math.random() * 300);
                });
            }
        });
    });

    target.addEventListener('mouseleave', () => {
        gsap.to(spans, {
            duration: 0.5,
            stagger: {
                amount: 0.3,
                from: "random"
            },
            onStart: function () {
                this.targets().forEach(span => {
                    setTimeout(() => {
                        span.textContent = span.dataset.symbol;
                        span.style.color = ''; // Reset color
                    }, Math.random() * 300);
                });
            }
        });
    });

    console.log("✅ Decrypt Effect: Initialized on", target);
}
