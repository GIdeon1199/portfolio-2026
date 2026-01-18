import gsap from 'https://cdn.skypack.dev/gsap';

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

    const spans = mapping.map((item, index) => {
        const span = document.createElement('span');
        span.textContent = item.symbol;
        span.dataset.char = item.char;
        span.dataset.symbol = item.symbol;
        span.style.display = 'inline-block';
        span.style.minWidth = '0.6em';
        target.appendChild(span);
        return span;
    });

    target.addEventListener('mouseenter', () => {
        gsap.to(spans, {
            duration: 0.5,
            stagger: {
                amount: 0.3,
                from: "random"
            },
            onStart: function () {
                this.targets().forEach(span => {
                    setTimeout(() => {
                        span.textContent = span.dataset.char;
                        span.style.color = 'var(--color-accent)';
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
                        span.style.color = '';
                    }, Math.random() * 300);
                });
            }
        });
    });

    console.log("✅ Decrypt Effect: Initialized on", target);
}
