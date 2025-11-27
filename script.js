// --- DOM Elements ---
const gameContainer = document.getElementById('gameContainer');
const questionContainer = document.getElementById('questionContainer');
const questionIcon = document.getElementById('questionIcon');
const questionTitle = document.getElementById('questionTitle');
const questionText = document.getElementById('questionText');
const successContent = document.getElementById('successContent');
const buttonContainer = document.getElementById('buttonContainer');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const playAgainBtn = document.getElementById('playAgainBtn');

// --- Game Data ---
const questions = [
    {
        icon: 'fas fa-heart icon-pink animate-pulse-slow',
        title: 'Do you love me? 💕',
        text: 'Be honest with your feelings...'
    },
    {
        icon: 'fas fa-question-circle icon-yellow animate-bounce-slow',
        title: 'Please think again! 🤔',
        text: 'Are you sure about your answer?'
    },
    {
        icon: 'fas fa-brain icon-purple animate-pulse-slow',
        title: 'Ek baar soch lo! 🧠',
        text: 'Kya pata kar rahe ho?'
    },
    {
        icon: 'fas fa-hand-holding-heart icon-red animate-bounce-slow',
        title: 'Baby maan jao na! 🥺',
        text: 'Kitna bhav khaogi?'
    }
];

// --- Game State ---
let currentQuestionIndex = 0;

// --- Functions ---

function showQuestion(index) {
    const question = questions[index];
    questionIcon.className = question.icon;
    questionTitle.textContent = question.title;
    questionText.textContent = question.text;
}

// Show success screen
function showSuccessScreen() {
    createConfetti();
    questionIcon.className = 'fas fa-heart icon-red animate-pulse';
    questionTitle.textContent = 'hehehehe, I knew it! 💕';
    questionText.textContent = 'Love you a lot! 💖';

    successContent.innerHTML = `
        <div class="success-box">
            <p>You made the right choice! 🎉</p>
            <p>Now we can live happily ever after! 💑</p>
        </div>
    `;
    successContent.classList.remove('hidden');
    buttonContainer.classList.add('hidden');
    playAgainBtn.classList.remove('hidden');
}

// Move button when hovered (escaping no button)
function moveButton() {
    // Use window dimensions for full-screen movement
    const btnRect = noBtn.getBoundingClientRect();

    // Calculate random position within the viewport
    const maxX = window.innerWidth - btnRect.width;
    const maxY = window.innerHeight - btnRect.height;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    // Apply new position
    noBtn.style.position = 'fixed'; // Use 'fixed' for positioning relative to the viewport
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
}

// Reset game to start
function resetGame() {
    currentQuestionIndex = 0;
    showQuestion(currentQuestionIndex);

    // Reset UI
    successContent.classList.add('hidden');
    successContent.innerHTML = '';
    buttonContainer.classList.remove('hidden');
    playAgainBtn.classList.add('hidden');

    // Reset "No" button position
    noBtn.style.position = ''; // Use relative to keep it in the flex container
    noBtn.style.left = 'auto';
    noBtn.style.top = 'auto';
    noBtn.removeEventListener('mouseover', moveButton); // Remove listener on reset
}

// Add some confetti effect for success
function createConfetti() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.cssText = `
            position: absolute;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: -20px;
            left: ${Math.random() * 100}%;
            animation: fall ${Math.random() * 3 + 2}s linear forwards;
            border-radius: 50%;
        `;
        gameContainer.appendChild(confetti);

        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// --- Event Listeners ---
yesBtn.addEventListener('click', showSuccessScreen);

noBtn.addEventListener('click', () => {
    // On click, also move the button and show next question
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
        // If we just moved to the last question, add the mouseover listener
        if (currentQuestionIndex === questions.length - 1) {
            noBtn.addEventListener('mouseover', moveButton);
        }
    } else {
        // If on the last question, just move the button
        moveButton();
    }
});

playAgainBtn.addEventListener('click', resetGame);

// --- Initial Load ---
document.addEventListener('DOMContentLoaded', resetGame);
