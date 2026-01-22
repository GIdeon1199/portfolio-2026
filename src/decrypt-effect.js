import gsap from 'gsap';

export function initDecryptEffect() {
    console.log("🔓 Decrypt Effect: initializing...");
    // Check GSAP
    if (!gsap) {
        console.error("❌ Decrypt Effect: GSAP not found!");
        return;
    }
    console.log(`🔓 Decrypt Effect: GSAP Version ${gsap.version}`);

    const target = document.querySelector('.decrypt-text');
    if (!target) {
        console.error("❌ Decrypt Effect: Target .decrypt-text not found");
        return;
    }
    console.log("🔓 Decrypt Effect: Target found", target);

    const text = "UNORTHODOX";
    const symbols = ['∪', 'η', '⊙', 'ℜ', 'τ', 'ℏ', '⊘', '∂', '𝟎', 'χ'];

    // Safety check length
    if (symbols.length !== text.length) {
        console.warn("Decrypt Effect: Length mismatch between text and symbols");
    }

    const mapping = text.split('').map((char, i) => ({
        char: char,
        symbol: symbols[i] || '?'
    }));

    // Construct DOM
    try {
        target.innerHTML = '';
        target.setAttribute('aria-label', text);
        target.style.cursor = 'help'; // Changed to help to indicate interaction

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

        console.log("🔓 Decrypt Effect: DOM constructed with symbols");

        const scrambleSettings = {
            duration: 0.5,
            stagger: {
                amount: 0.3,
                from: "random"
            }
        };

        const revealText = () => {
            console.log("🔓 Decrypt Effect: Revealing text...");
            gsap.to(spans, {
                ...scrambleSettings,
                onStart: function () {
                    this.targets().forEach(span => {
                        const delay = Math.random() * 300;
                        setTimeout(() => {
                            span.textContent = span.dataset.char;
                            span.style.color = 'var(--color-text-primary)';
                        }, delay);
                    });
                }
            });
        };

        const hideText = () => {
            gsap.to(spans, {
                ...scrambleSettings,
                onStart: function () {
                    this.targets().forEach(span => {
                        const delay = Math.random() * 300;
                        setTimeout(() => {
                            span.textContent = span.dataset.symbol;
                            span.style.color = 'var(--color-accent)';
                        }, delay);
                    });
                }
            });
        };

        // Delay start
        setTimeout(() => {
            revealText();
        }, 1500);

        // Interactions
        target.addEventListener('mouseenter', hideText);
        target.addEventListener('mouseleave', revealText);

    } catch (e) {
        console.error("❌ Decrypt Effect: Error during initialization", e);
    }
}
