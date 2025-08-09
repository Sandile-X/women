// Enhanced Interactive Love Story Script with All 10 Features

// Story content - personalized for Mama Ariyana
const storyChapters = [
    {
        title: "The Beginning",
        content: "From the very first moment I laid eyes on you, Mama Ariyana, I knew my life would never be the same. Your smile lit up my world in ways I never thought possible. You became my everything.",
        photo: "us2.jpg", // First story image
        music: "chapter1.mp3" // Optional chapter music
    },
    {
        title: "Falling in Love",
        content: "Every day with you, my beautiful Mama Ariyana, has been a new adventure. Your laugh became my favorite sound, your happiness became my mission, and your love became my safe haven.",
        photo: "us3.jpg", // Second story image
        interactive: true, // This chapter has interactive elements
        quiz: {
            question: "What's my favorite thing about Immy?",
            options: ["Your beautiful smile", "Your kind heart", "Everything about you"],
            correct: 2
        }
    },
    {
        title: "Growing Together",
        content: "Through every rainy or sunny season, every challenge, and every joy, we've grown stronger together, Immy. You've shown me what it means to truly love and be loved unconditionally.",
        photo: "us4.jpg", // Third story image
        surprise: "You are my strength, my inspiration, and my forever love! 💖"
    },
    {
        title: "My Queen, Mama Ariyana",
        content: "You are not just my partner, you are my queen, my best friend, my everything. Your strength inspires me, your kindness humbles me, and your love completes me, Mama Ariyana.",
        photo: "us5.jpg", // Fourth story image
        specialEffect: "heartRain"
    },
    {
        title: "Today & Forever",
        content: "On this Women's Day and our anniversary, I celebrate not just how far we've come, but the beautiful journey that lies ahead of us. You are my forever and always, my beautiful Mama Ariyana.",
        photo: "us6.jpg", // Fifth story image
        finalMessage: "Ready for our next adventure together? 💍"
    }
];

// Photo gallery for slideshow
const photoGallery = [
    { src: "us.jpg", caption: "My beautiful Mama Ariyana and I - Welcome" },
    { src: "us2.jpg", caption: "Our beginning - First moments" },
    { src: "us3.jpg", caption: "Falling in love - Perfect together" },
    { src: "us4.jpg", caption: "Growing together - Stronger each day" },
    { src: "us5.jpg", caption: "My Queen - Forever and always" },
    { src: "us6.jpg", caption: "Today & Forever - Our future" }
];

// Love letters/messages
const loveLetters = [
    "Mama Ariyana, you make every day feel like a fairytale 💕",
    "Your love gives me strength to conquer any challenge 🌟",
    "Thank you for being my partner in this beautiful journey 💖",
    "You are the reason I believe in forever 💍"
];

// Mini games data
const personalityQuiz = [
    {
        question: "What's Mama Ariyana's favorite way to spend a weekend?",
        options: ["Romantic dinner", "Movie night at home", "Adventure outdoors"],
        correct: 1,
        explanation: "Because cozy moments with you are perfect! 💕"
    },
    {
        question: "What makes Mama Ariyana happiest?",
        options: ["Surprise gifts", "Quality time together", "Acts of service"],
        correct: 1,
        explanation: "Every moment with you is precious! 🥰"
    }
];

// Current states
let currentChapter = 0;
let currentGame = 'story';
let musicPlaying = true;
let gameScore = 0;
let visitCount = localStorage.getItem('visitCount') || 0;

// DOM elements
const welcomeScreen = document.getElementById('welcomeScreen');
const storyContent = document.getElementById('storyContent');
const storyText = document.getElementById('storyText');
const invitationScreen = document.getElementById('invitationScreen');
const loadingScreen = document.getElementById('loadingScreen');
const thankYouScreen = document.getElementById('thankYouScreen');
const backgroundMusic = document.getElementById('backgroundMusic');
const musicToggle = document.getElementById('musicToggle');
const volumeSlider = document.getElementById('volumeSlider');

const startBtn = document.getElementById('startBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Update visit count
    visitCount++;
    localStorage.setItem('visitCount', visitCount);
    
    // Setup music
    setupMusic();
    
    // Add event listeners
    startBtn.addEventListener('click', startStory);
    nextBtn.addEventListener('click', nextChapter);
    prevBtn.addEventListener('click', previousChapter);
    yesBtn.addEventListener('click', () => handleResponse('yes'));
    noBtn.addEventListener('click', () => handleResponse('no'));
    
    // Add time-based greeting
    addTimeBasedGreeting();
    
    // Start special effects
    createContinuousHeartBurst();
    addDraggableHearts();
    
    // Add visit count message
    if (visitCount > 1) {
        showWelcomeBackMessage();
    }
    
    // Setup easter eggs
    setupEasterEggs();
}

// 🎵 Feature 1: Background Music Control
function setupMusic() {
    backgroundMusic.volume = 0.5; // 50% volume as requested
    
    musicToggle.addEventListener('click', toggleMusic);
    volumeSlider.addEventListener('input', (e) => {
        backgroundMusic.volume = e.target.value / 100;
    });
    
    // Handle autoplay restrictions
    backgroundMusic.play().catch(e => {
        console.log('Autoplay prevented, user interaction required');
        musicToggle.innerHTML = '<i class="fas fa-play text-xl"></i>';
        musicPlaying = false;
    });
}

function toggleMusic() {
    if (musicPlaying) {
        backgroundMusic.pause();
        musicToggle.innerHTML = '<i class="fas fa-play text-xl"></i>';
        musicPlaying = false;
    } else {
        backgroundMusic.play();
        musicToggle.innerHTML = '<i class="fas fa-music text-xl"></i>';
        musicPlaying = true;
    }
}

// 📸 Feature 2: Photo Gallery Integration
function createPhotoSlideshow(chapterData) {
    if (chapterData.photo) {
        return `
            <div class="photo-container mb-6">
                <img src="${chapterData.photo}" alt="Our Love Story" 
                     class="w-64 h-64 mx-auto rounded-2xl shadow-2xl object-cover polaroid-effect hover:rotate-2 transition-transform duration-500">
                <p class="text-sm text-pink-500 mt-2 font-cursive">Our beautiful memories ❤️</p>
            </div>
        `;
    }
    return '';
}

// 💌 Feature 3: Love Letters Display
function showRandomLoveLetter() {
    const randomLetter = loveLetters[Math.floor(Math.random() * loveLetters.length)];
    
    // Create floating love note
    const loveNote = document.createElement('div');
    loveNote.className = 'fixed top-20 right-4 bg-pink-100 border-2 border-pink-300 rounded-lg p-4 shadow-lg z-50 max-w-sm love-note-slide';
    loveNote.innerHTML = `
        <div class="text-sm text-pink-700 font-cursive">${randomLetter}</div>
        <button onclick="this.parentElement.remove()" class="absolute top-1 right-2 text-pink-400 hover:text-pink-600">&times;</button>
    `;
    
    document.body.appendChild(loveNote);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (loveNote.parentElement) {
            loveNote.remove();
        }
    }, 5000);
}

// 🎮 Feature 4: Mini Games Implementation
function createQuizGame(quizData) {
    return `
        <div class="quiz-game bg-pink-50 rounded-2xl p-6 mb-6">
            <h3 class="text-xl font-cursive text-pink-600 mb-4">💕 Love Quiz 💕</h3>
            <p class="text-lg mb-4">${quizData.question}</p>
            <div class="space-y-2">
                ${quizData.options.map((option, index) => `
                    <button onclick="checkAnswer(${index}, ${quizData.correct})" 
                            class="quiz-option w-full text-left p-3 rounded-lg bg-white hover:bg-pink-100 transition-colors border border-pink-200">
                        ${option}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
}

function checkAnswer(selected, correct) {
    const options = document.querySelectorAll('.quiz-option');
    options.forEach((option, index) => {
        if (index === correct) {
            option.classList.add('bg-green-200', 'border-green-400');
            option.innerHTML += ' ✅';
        } else if (index === selected && selected !== correct) {
            option.classList.add('bg-red-200', 'border-red-400');
            option.innerHTML += ' ❌';
        }
        option.disabled = true;
    });
    
    if (selected === correct) {
        gameScore++;
        createHeartBurst();
        setTimeout(() => showRandomLoveLetter(), 1000);
    }
}

// 🌟 Feature 5: Enhanced Personalization
function addTimeBasedGreeting() {
    const hour = new Date().getHours();
    let greeting = '';
    
    if (hour < 12) {
        greeting = 'Good morning, my beautiful Mama Ariyana! 🌅';
    } else if (hour < 18) {
        greeting = 'Good afternoon, my lovely Mama Ariyana! ☀️';
    } else {
        greeting = 'Good evening, my gorgeous Mama Ariyana! 🌙';
    }
    
    // Add greeting to welcome message
    const existingText = document.querySelector('#welcomeScreen p');
    existingText.innerHTML = greeting + '<br><br>' + existingText.innerHTML;
}

// 📱 Feature 6: Mobile-Optimized Touch Interactions
function addTouchGestures() {
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentChapter < storyChapters.length - 1) {
                // Swipe left - next chapter
                nextChapter();
            } else if (diff < 0 && currentChapter > 0) {
                // Swipe right - previous chapter
                previousChapter();
            }
        }
    }
}

// 🎁 Feature 7: Surprise Elements & Easter Eggs
function setupEasterEggs() {
    // Secret konami code for special message
    let konamiCode = [];
    const secretCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.code);
        if (konamiCode.length > secretCode.length) {
            konamiCode.shift();
        }
        
        if (JSON.stringify(konamiCode) === JSON.stringify(secretCode)) {
            showSecretMessage();
            konamiCode = [];
        }
        
        // Secret admin reset: Ctrl + Shift + R + E + S + E + T
        if (e.ctrlKey && e.shiftKey && e.code === 'KeyR') {
            let resetSequence = [];
            const resetKeys = ['KeyE', 'KeyS', 'KeyE', 'KeyT'];
            let resetIndex = 0;
            
            const resetListener = (event) => {
                if (event.code === resetKeys[resetIndex]) {
                    resetIndex++;
                    if (resetIndex >= resetKeys.length) {
                        resetVisitCounter();
                        document.removeEventListener('keydown', resetListener);
                    }
                } else {
                    resetIndex = 0;
                }
            };
            
            document.addEventListener('keydown', resetListener);
            setTimeout(() => {
                document.removeEventListener('keydown', resetListener);
            }, 5000); // 5 second timeout
        }
    });
    
    // Random surprise messages
    setInterval(() => {
        if (Math.random() < 0.1) { // 10% chance every interval
            showRandomLoveLetter();
        }
    }, 30000);
}

function showSecretMessage() {
    alert('🎉 Secret message unlocked! 🎉\n\nMama Ariyana, you found the secret! You are truly amazing and I love your curious spirit! This is just one of the many reasons why I adore you! 💖✨');
    createHeartExplosion();
}

// 💎 Feature 8: Interactive Draggable Elements
function addDraggableHearts() {
    const hearts = document.querySelectorAll('.heart');
    hearts.forEach(heart => {
        heart.style.cursor = 'grab';
        heart.addEventListener('mousedown', startDrag);
        heart.addEventListener('touchstart', startDrag);
    });
}

function startDrag(e) {
    e.preventDefault();
    const heart = e.target;
    let isDragging = true;
    
    function drag(e) {
        if (!isDragging) return;
        
        const clientX = e.clientX || e.touches[0].clientX;
        const clientY = e.clientY || e.touches[0].clientY;
        
        heart.style.left = clientX - 25 + 'px';
        heart.style.top = clientY - 25 + 'px';
        heart.style.transform = 'scale(1.2)';
    }
    
    function stopDrag() {
        isDragging = false;
        heart.style.transform = 'scale(1)';
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', stopDrag);
        document.removeEventListener('touchmove', drag);
        document.removeEventListener('touchend', stopDrag);
    }
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchmove', drag);
    document.addEventListener('touchend', stopDrag);
}

// 🌙 Feature 9: Advanced Time-Based Content
function getTimeBasedContent() {
    const now = new Date();
    const hour = now.getHours();
    const isAnniversary = checkIfAnniversary();
    const isWeekend = now.getDay() === 0 || now.getDay() === 6;
    
    let timeMessage = '';
    
    if (isAnniversary) {
        timeMessage = '🎉 Happy Anniversary, Mama Ariyana! Another year of beautiful love! 🎉';
    } else if (isWeekend) {
        timeMessage = '🌸 Perfect weekend for romance, my love! 🌸';
    } else if (hour < 6) {
        timeMessage = '🌙 Up late thinking of you, Mama Ariyana! 🌙';
    } else if (hour > 22) {
        timeMessage = '✨ Sweet dreams await us, my love! ✨';
    }
    
    return timeMessage;
}

function checkIfAnniversary() {
    const today = new Date();
    const anniversaryMonth = 8; // August (0-indexed)
    const anniversaryDay = 9;   // Adjust to your actual anniversary
    
    return today.getMonth() === anniversaryMonth && today.getDate() === anniversaryDay;
}

// 💝 Feature 10: Keepsake & Sharing Features
function addKeepsakeFeatures() {
    // Add download/share buttons
    const keepsakeDiv = document.createElement('div');
    keepsakeDiv.className = 'fixed bottom-4 left-4 z-50 space-x-2';
    keepsakeDiv.innerHTML = `
        <button onclick="captureScreenshot()" class="bg-pink-500 text-white p-3 rounded-full shadow-lg hover:bg-pink-600 transition-colors" title="Take Screenshot">
            📸
        </button>
        <button onclick="generateKeepsake()" class="bg-purple-500 text-white p-3 rounded-full shadow-lg hover:bg-purple-600 transition-colors" title="Download Keepsake">
            💾
        </button>
        <button onclick="resetVisitCounter()" class="bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-600 transition-colors" title="Reset Visit Counter (Admin Only)">
            🔄
        </button>
    `;
    document.body.appendChild(keepsakeDiv);
}

function resetVisitCounter() {
    const confirmReset = confirm('⚠️ Are you sure you want to reset the visit counter? This will:\n\n• Reset visit count to 0\n• Clear all stored keepsake data\n• Remove welcome back messages\n\nThis action cannot be undone!');
    
    if (confirmReset) {
        localStorage.removeItem('visitCount');
        localStorage.removeItem('loveStoryKeepsake');
        visitCount = 0;
        alert('✅ Visit counter has been reset! Refresh the page to start fresh.');
        console.log('🔄 Visit counter reset by admin');
    }
}

function generateKeepsake() {
    const keepsakeData = {
        visitDate: new Date().toISOString(),
        story: storyChapters,
        score: gameScore,
        visitCount: visitCount,
        response: 'pending'
    };
    
    localStorage.setItem('loveStoryKeepsake', JSON.stringify(keepsakeData));
    
    const blob = new Blob([JSON.stringify(keepsakeData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'our-love-story-keepsake.json';
    a.click();
}

function captureScreenshot() {
    // Simple alert for now - would need additional library for full screenshot
    alert('📸 Screenshot feature! In a full implementation, this would capture our beautiful love story to keep forever! 💖');
}

// Enhanced story display with all features
function displayChapter(index) {
    const chapter = storyChapters[index];
    
    storyText.innerHTML = `
        <div class="mb-6">
            ${createPhotoSlideshow(chapter)}
            <h2 class="font-cursive text-4xl text-pink-600 mb-6 gradient-text">${chapter.title}</h2>
            <p class="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">${chapter.content}</p>
            ${getTimeBasedContent() ? `<p class="text-pink-500 mt-4 font-cursive">${getTimeBasedContent()}</p>` : ''}
            ${chapter.quiz ? createQuizGame(chapter.quiz) : ''}
            ${chapter.surprise ? `<div class="surprise-message mt-4 p-4 bg-gradient-to-r from-pink-200 to-purple-200 rounded-lg font-cursive text-lg">${chapter.surprise}</div>` : ''}
        </div>
        <div class="flex justify-center mt-8">
            ${createProgressDots()}
        </div>
    `;
    
    // Special effects for specific chapters
    if (chapter.specialEffect === 'heartRain') {
        setTimeout(() => createHeartRain(), 1000);
    }
    
    updateNavigationButtons();
    storyText.classList.add('story-slide');
    
    setTimeout(() => {
        storyText.classList.remove('story-slide');
    }, 600);
}

// Enhanced visual effects
function createContinuousHeartBurst() {
    setInterval(() => {
        if (Math.random() < 0.3) { // 30% chance
            createFloatingHeart();
        }
    }, 2000);
}

function createFloatingHeart() {
    const hearts = ['💖', '💕', '💝', '🌸', '🌺', '💗', '🌷', '💐', '🥰', '😍'];
    const heart = document.createElement('div');
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.className = 'floating-heart';
    heart.style.cssText = `
        position: fixed;
        font-size: 2rem;
        pointer-events: none;
        z-index: 1000;
        left: ${Math.random() * window.innerWidth}px;
        top: ${window.innerHeight}px;
        animation: floatUp 4s ease-out forwards;
        opacity: 0.8;
    `;
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        if (heart.parentElement) {
            heart.remove();
        }
    }, 4000);
}

function createHeartRain() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createFloatingHeart();
        }, i * 200);
    }
}

function createHeartExplosion() {
    const center = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.textContent = '💖';
        heart.style.cssText = `
            position: fixed;
            font-size: 3rem;
            pointer-events: none;
            z-index: 1000;
            left: ${center.x}px;
            top: ${center.y}px;
            animation: explode ${2 + Math.random()}s ease-out forwards;
        `;
        document.body.appendChild(heart);
        
        setTimeout(() => heart.remove(), 3000);
    }
}

function showWelcomeBackMessage() {
    const welcomeBack = document.createElement('div');
    welcomeBack.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-pink-100 border-4 border-pink-300 rounded-2xl p-8 z-50 text-center max-w-md';
    welcomeBack.innerHTML = `
        <h3 class="font-cursive text-2xl text-pink-600 mb-4">Welcome back, Mama Ariyana! 💕</h3>
        <p class="text-gray-700">This is visit #${visitCount}! I love that you keep coming back to our love story! 🥰</p>
        <button onclick="this.parentElement.remove()" class="mt-4 bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition-colors">
            Continue to Our Story 💖
        </button>
    `;
    document.body.appendChild(welcomeBack);
}

// Original functions with enhancements
function startStory() {
    welcomeScreen.classList.add('hidden');
    storyContent.classList.remove('hidden');
    displayChapter(0);
    storyContent.classList.add('story-slide');
    
    // Add keepsake features
    addKeepsakeFeatures();
    // Enable touch gestures
    addTouchGestures();
}

function createProgressDots() {
    return storyChapters.map((_, index) => 
        `<div class="progress-dot ${index === currentChapter ? 'active' : ''}"></div>`
    ).join('');
}

function updateNavigationButtons() {
    if (currentChapter === 0) {
        prevBtn.classList.add('hidden');
    } else {
        prevBtn.classList.remove('hidden');
    }
    
    if (currentChapter === storyChapters.length - 1) {
        nextBtn.innerHTML = `
            Continue to Invitation
            <i class="fas fa-heart ml-2"></i>
        `;
    } else {
        nextBtn.innerHTML = `
            Next Chapter
            <i class="fas fa-arrow-right ml-2"></i>
        `;
    }
}

function nextChapter() {
    if (currentChapter < storyChapters.length - 1) {
        currentChapter++;
        displayChapter(currentChapter);
        
        // Random surprise
        if (Math.random() < 0.3) {
            setTimeout(() => showRandomLoveLetter(), 2000);
        }
    } else {
        showInvitation();
    }
}

function previousChapter() {
    if (currentChapter > 0) {
        currentChapter--;
        displayChapter(currentChapter);
    }
}

function showInvitation() {
    storyContent.classList.add('hidden');
    invitationScreen.classList.remove('hidden');
    invitationScreen.classList.add('story-slide');
    
    // Special invitation effect
    setTimeout(() => createHeartRain(), 1000);
}

function handleResponse(response) {
    invitationScreen.classList.add('hidden');
    loadingScreen.classList.remove('hidden');
    
    const responseMessage = response === 'yes' 
        ? `🎉 AMAZING NEWS! Mama Ariyana said YES to our dinner date! 💕 
           She completed our love story journey and chose to create more memories with you! 
           Story Score: ${gameScore}/${personalityQuiz.length} 
           Visit #${visitCount} 🌹`
        : `💭 Mama Ariyana needs to think about it... 
           She loved the story journey though! 
           Maybe suggest another romantic activity? 
           Story Score: ${gameScore}/${personalityQuiz.length} 
           Visit #${visitCount} 🤗`;
    
    // Save response to keepsake
    let keepsakeData = JSON.parse(localStorage.getItem('loveStoryKeepsake') || '{}');
    keepsakeData.response = response;
    keepsakeData.responseDate = new Date().toISOString();
    localStorage.setItem('loveStoryKeepsake', JSON.stringify(keepsakeData));
    
    sendWhatsAppMessage(responseMessage);
    
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        thankYouScreen.classList.remove('hidden');
        thankYouScreen.classList.add('story-slide');
        createHeartExplosion();
    }, 3000);
}

function sendWhatsAppMessage(message) {
    const phoneNumber = "27736538207";
    const whatsappMessage = `💖 ROMANTIC LOVE STORY RESPONSE 💖%0A%0A${encodeURIComponent(message)}%0A%0ADate: ${new Date().toLocaleDateString()}%0ATime: ${new Date().toLocaleTimeString()}%0A%0ASent with love from our interactive story! 💕%0A%0A#LoveStory #MamaAriyana #Anniversary #WomensDay`;
    
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;
    window.open(whatsappURL, '_blank');
}

// Add floating animation CSS
const additionalStyle = document.createElement('style');
additionalStyle.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.8;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes explode {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: scale(2) rotate(720deg) translate(${Math.random() * 400 - 200}px, ${Math.random() * 400 - 200}px);
            opacity: 0;
        }
    }
    
    .love-note-slide {
        animation: slideInRight 0.5s ease-out;
    }
    
    @keyframes slideInRight {
        0% {
            transform: translateX(100%);
            opacity: 0;
        }
        100% {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .polaroid-effect {
        border: 10px solid white;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        position: relative;
    }
    
    .polaroid-effect:after {
        content: '';
        position: absolute;
        bottom: -30px;
        left: 0;
        right: 0;
        height: 30px;
        background: white;
    }
`;
document.head.appendChild(additionalStyle);

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    console.log('💖 Love Story Initialized for Mama Ariyana! 💖');

});
