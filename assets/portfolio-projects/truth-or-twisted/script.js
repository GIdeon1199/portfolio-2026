document.addEventListener('DOMContentLoaded', () => {
    // ═══════════════════════════════════════════════════════════
    // GAME CONFIG & DATA
    // ═══════════════════════════════════════════════════════════
    const MAX_CARDS = 10;
    const SWIPE_THRESHOLD = 100; // px to trigger decision

    // Placeholder for fetched data
    let questionsData = [];

    // ═══════════════════════════════════════════════════════════
    // STATE MANAGEMENT
    // ═══════════════════════════════════════════════════════════
    let gameState = {
        score: 0,
        streak: 0,
        maxStreak: 0,
        cards: [], // Array of question objects
        currentCardIndex: 0
    };

    const DOM = {
        stack: document.getElementById('card-stack'),
        score: document.getElementById('score-display'),
        streak: document.getElementById('streak-display'),
        overlayTrue: document.getElementById('overlay-true'),
        overlayTwisted: document.getElementById('overlay-twisted'),
        modalFeedback: document.getElementById('modal-feedback'),
        feedbackTitle: document.getElementById('feedback-title'),
        feedbackExp: document.getElementById('feedback-explanation'),
        feedbackSource: document.getElementById('feedback-source'),
        endScreen: document.getElementById('end-screen'),
        finalScore: document.getElementById('final-score'),
        finalStreak: document.getElementById('final-streak')
    };

    // ═══════════════════════════════════════════════════════════
    // INITIALIZATION & DATA FETCHING
    // ═══════════════════════════════════════════════════════════
    async function initGame() {
        try {
            const response = await fetch('./questions.json');
            if (!response.ok) throw new Error('Failed to load mission data');
            const allQuestions = await response.json();

            questionsData = shuffleArray(allQuestions).slice(0, MAX_CARDS);
            startGameSession();

        } catch (error) {
            console.error(error);
            DOM.stack.innerHTML = `<div class="empty-state"><div class="loader-ink"></div><p>CONNECTION FAILURE</p></div>`;
            setTimeout(initGame, 3000);
        }
    }

    function startGameSession() {
        gameState.score = 0;
        gameState.streak = 0;
        gameState.maxStreak = 0;
        gameState.currentCardIndex = 0;
        gameState.cards = [...questionsData];

        updateStats();

        DOM.stack.innerHTML = '';
        DOM.endScreen.classList.add('hidden');
        DOM.modalFeedback.classList.add('hidden');

        gameState.cards.forEach((cardData, index) => {
            const cardEl = createCardElement(cardData, index);
            DOM.stack.appendChild(cardEl);
        });

        if (gameState.cards.length > 0) {
            setupTopCardInteractions();
        } else {
            endGame();
        }
    }

    function createCardElement(data, index) {
        const el = document.createElement('div');
        el.classList.add('tinder-card');
        el.style.zIndex = gameState.cards.length - index;
        el.dataset.id = data.id;
        el.dataset.isTrue = data.isTrue;

        if (index > 0) {
            el.style.transform = `scale(${1 - (index * 0.05)}) translateY(${index * 10}px)`;
            el.style.opacity = index > 2 ? 0 : 1;
        }

        // EDITORIAL LAYOUT - NOW WITH SPEAKER NAME
        el.innerHTML = `
            <div class="card-content">
                <span class="card-icon">${data.icon || '📰'}</span>
                
                <div class="card-speaker-box" style="text-align:center; margin-bottom:15px;">
                    <span class="speaker-label" style="font-size:0.7rem; font-weight:700; color:#888; letter-spacing:1px; text-transform:uppercase;">SPEAKER:</span>
                    <h3 class="card-headline" style="margin:5px 0 10px; font-size:1.4rem;">${data.speaker || 'Anonymous Source'}</h3>
                </div>
                
                <div class="card-separator" style="width:50px; height:1px; background:#ccc; margin:0 auto 20px;"></div>
                
                <p class="card-text">"${data.statement}"</p>
                <div class="card-hint">IS THIS A FACT?</div>
            </div>
        `;

        return el;
    }

    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    // ═══════════════════════════════════════════════════════════
    // INTERACTION LOGIC
    // ═══════════════════════════════════════════════════════════
    function setupTopCardInteractions() {
        const topCard = DOM.stack.firstElementChild;
        if (!topCard) {
            endGame();
            return;
        }

        let isDragging = false;
        let startX = 0;
        let currentX = 0;

        function onStart(e) {
            if (e.target.closest('.control-btn')) return;
            isDragging = true;
            startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
            topCard.style.transition = 'none';
        }

        function onMove(e) {
            if (!isDragging) return;
            e.preventDefault();

            const x = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
            currentX = x - startX;
            const rotate = currentX * 0.1;

            topCard.style.transform = `translateX(${currentX}px) rotate(${rotate}deg)`;

            const opacity = Math.min(Math.abs(currentX) / 100, 1);
            if (currentX > 0) {
                DOM.overlayTrue.style.opacity = opacity;
                DOM.overlayTrue.style.transform = `translate(-50%, -50%) rotate(-10deg) scale(${0.5 + opacity / 2})`;
                DOM.overlayTwisted.style.opacity = 0;
            } else {
                DOM.overlayTwisted.style.opacity = opacity;
                DOM.overlayTwisted.style.transform = `translate(-50%, -50%) rotate(15deg) scale(${0.5 + opacity / 2})`;
                DOM.overlayTrue.style.opacity = 0;
            }
        }

        function onEnd(e) {
            if (!isDragging) return;
            isDragging = false;
            topCard.style.transition = 'transform 0.3s ease';

            if (Math.abs(currentX) > SWIPE_THRESHOLD) {
                const direction = currentX > 0 ? 'right' : 'left';
                handleSwipe(direction, topCard);
            } else {
                topCard.style.transform = '';
                DOM.overlayTrue.style.opacity = 0;
                DOM.overlayTwisted.style.opacity = 0;
            }
        }

        topCard.addEventListener('touchstart', onStart);
        document.addEventListener('touchmove', onMove, { passive: false });
        document.addEventListener('touchend', onEnd);

        topCard.addEventListener('mousedown', onStart);
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onEnd);

        topCard.dataset.listeners = 'true';
    }

    function handleSwipe(direction, cardEl) {
        const flyX = direction === 'right' ? 1000 : -1000;
        cardEl.style.transform = `translateX(${flyX}px) rotate(${flyX / 10}deg)`;

        const userChoice = direction === 'right';
        const isActuallyTrue = cardEl.dataset.isTrue === 'true';

        processResult(userChoice, isActuallyTrue);

        setTimeout(() => {
            cardEl.remove();
            DOM.overlayTrue.style.opacity = 0;
            DOM.overlayTwisted.style.opacity = 0;
            restackCards();
        }, 300);
    }

    function restackCards() {
        const remaining = Array.from(DOM.stack.children);
        remaining.forEach((card, i) => {
            card.style.zIndex = remaining.length - i;
            card.style.transition = 'transform 0.3s ease, opacity 0.3s ease';

            if (i === 0) {
                card.style.transform = 'scale(1) translateY(0)';
                card.style.opacity = 1;
            } else {
                card.style.transform = `scale(${1 - (i * 0.05)}) translateY(${i * 10}px)`;
                card.style.opacity = i > 2 ? 0 : 1;
            }
        });

        setupTopCardInteractions();
    }

    function showFeedbackModalForTopCard(isCorrect) {
        const topCard = DOM.stack.firstElementChild;
        const id = parseInt(topCard.dataset.id);
        const data = questionsData.find(q => q.id === id);

        if (!data) return;

        // --- EDITORIAL THEME UPDATE ---
        DOM.feedbackTitle.innerText = isCorrect ? "FACT VERIFIED" : "CORRECTION ISSUED";
        DOM.modalFeedback.firstElementChild.className = `modal-content newspaper-paper correction-slip ${isCorrect ? 'correct' : 'incorrect'}`;

        const stampEl = document.getElementById('feedback-stamp');
        if (stampEl) {
            stampEl.innerText = data.isTrue ? "TRUE" : "FALSE";
        }

        DOM.feedbackExp.innerText = data.explanation;

        if (data.source) {
            DOM.feedbackSource.href = data.source;
            DOM.feedbackSource.innerText = "View Primary Source";
        }

        // Active Search (Verify) Button
        const query = encodeURIComponent(`fact check ${data.statement}`);
        const searchUrl = `https://www.google.com/search?q=${query}`;

        let verifyBtn = document.getElementById('btn-verify-active');
        if (!verifyBtn) {
            verifyBtn = document.createElement('a');
            verifyBtn.id = 'btn-verify-active';
            verifyBtn.target = '_blank';
            verifyBtn.className = 'ink-btn secondary';
            verifyBtn.style.marginTop = '15px';
            verifyBtn.style.display = 'block';
            verifyBtn.style.textAlign = 'center';
            verifyBtn.style.textDecoration = 'none';
            verifyBtn.innerText = "🔍 VERIFY IN THE WILD";
            const nextBtn = document.getElementById('btn-next');
            nextBtn.parentNode.insertBefore(verifyBtn, nextBtn);
        }
        verifyBtn.className = 'ink-btn secondary';
        verifyBtn.href = searchUrl;

        DOM.modalFeedback.classList.remove('hidden');
    }

    function processResult(userSaysTrue, isTrue) {
        const isCorrect = (userSaysTrue === isTrue) || (!userSaysTrue && !isTrue);

        if (isCorrect) {
            gameState.score++;
            gameState.streak++;
            if (gameState.streak > gameState.maxStreak) gameState.maxStreak = gameState.streak;
            updateStats();

            if (DOM.stack.children.length <= 1) {
                setTimeout(endGame, 500);
            }
        } else {
            gameState.streak = 0;
            updateStats();
            showFeedbackModalForTopCard(false);
        }
    }

    function updateStats() {
        DOM.score.innerText = `${gameState.score}`;
        DOM.streak.innerText = gameState.streak;
    }

    function endGame() {
        DOM.endScreen.classList.remove('hidden');
        DOM.finalScore.innerText = `${Math.round((gameState.score / MAX_CARDS) * 100)}%`;
        DOM.finalStreak.innerText = gameState.maxStreak;

        const accuracy = gameState.score / MAX_CARDS;
        let rating = "INTERN";
        if (accuracy > 0.9) rating = "EDITOR-IN-CHIEF";
        else if (accuracy > 0.7) rating = "SENIOR REPORTER";
        else if (accuracy > 0.5) rating = "JUNIOR CONTRIBUTOR";

        DOM.endScreen.querySelector('#final-message').innerText = `EDITOR RATING: ${rating}`;
    }

    // BUTTONS
    document.getElementById('btn-false').addEventListener('click', () => {
        const topCard = DOM.stack.firstElementChild;
        if (topCard) handleSwipe('left', topCard);
    });

    document.getElementById('btn-true').addEventListener('click', () => {
        const topCard = DOM.stack.firstElementChild;
        if (topCard) handleSwipe('right', topCard);
    });

    document.getElementById('btn-next').addEventListener('click', () => {
        DOM.modalFeedback.classList.add('hidden');
        if (DOM.stack.children.length === 0) {
            endGame();
        }
    });

    document.getElementById('btn-restart').addEventListener('click', initGame);

    const startBtn = document.getElementById('btn-start-game');
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            document.getElementById('welcome-screen').classList.add('hidden');
        });
    }

    initGame();
});