(function () {
    // 1. Inject CSS
    const style = document.createElement('style');
    style.innerHTML = `
        #backToTop {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            background: var(--color-accent, #6366F1); /* Fallback to Soft Indigo */
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease, transform 0.3s ease;
            transform: translateY(10px);
        }
        #backToTop.visible {
            opacity: 1;
            pointer-events: all;
            transform: translateY(0);
        }
        #backToTop:hover {
            transform: translateY(-4px);
            box-shadow: 0 6px 16px rgba(0,0,0,0.2);
        }
        @media (max-width: 768px) {
            #backToTop {
                bottom: 1.5rem;
                right: 1.5rem;
                width: 45px;
                height: 45px;
                font-size: 1.2rem;
            }
        }
    `;
    document.head.appendChild(style);

    // 2. Inject HTML Button
    const btn = document.createElement('button');
    btn.id = 'backToTop';
    btn.innerHTML = '↑';
    btn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(btn);

    // 3. Logic
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    window.addEventListener('scroll', toggleVisibility);
    btn.addEventListener('click', scrollToTop);
})();
