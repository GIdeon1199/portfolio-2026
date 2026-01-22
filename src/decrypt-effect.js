import gsap from 'gsap';

export function initDecryptEffect() {
    const target = document.querySelector('.decrypt-text');
    if (!target) return;

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

    target.innerHTML = '';
    target.setAttribute('aria-label', 'UNORTHODOX');
    target.style.cursor = 'crosshair'; // Hint at interaction

    const spans = mapping.map((item) => {
        const span = document.createElement('span');
        span.textContent = item.symbol; // Start with symbols
        span.dataset.char = item.char;
        span.dataset.symbol = item.symbol;
        span.style.display = 'inline-block';
        span.style.minWidth = '0.6em';
        span.style.transition = 'color 0.3s ease';
        target.appendChild(span);
        return span;
    });

    const scrambleSettings = {
        duration: 0.5,
        stagger: {
            amount: 0.3,
            from: "random"
        }
    };

    // Function to reveal text (turn to letters)
    const revealText = () => {
        gsap.to(spans, {
            ...scrambleSettings,
            onStart: function () {
                this.targets().forEach(span => {
                    const delay = Math.random() * 300;
                    setTimeout(() => {
                        span.textContent = span.dataset.char;
                        span.style.color = 'var(--color-text-primary)'; // Reset color
                    }, delay);
                });
            }
        });
    };

    // Function to hide text (turn to symbols)
    const hideText = () => {
        gsap.to(spans, {
            ...scrambleSettings,
            onStart: function () {
                this.targets().forEach(span => {
                    const delay = Math.random() * 300;
                    setTimeout(() => {
                        span.textContent = span.dataset.symbol;
                        span.style.color = 'var(--color-accent)'; // Highlight symbols
                    }, delay);
                });
            }
        });
    };

    // Initial Animation: Wait a bit, then reveal
    setTimeout(() => {
        revealText();
    }, 1500); // delayed to run after hero entrance

    // Interactions
    target.addEventListener('mouseenter', hideText);
    target.addEventListener('mouseleave', revealText);

    console.log("✅ Decrypt Effect: Initialized with Auto-Reveal");
}
