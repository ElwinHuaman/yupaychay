// Main application JavaScript

// Global variables
let currentReadIndex = 0;
let currentListenIndex = 0;
let currentWriteIndex = 0;
let currentQuizIndex = 0;
let currentChallengeIndex = 0;
let currentSyllableIndex = 0;
let currentWriteChallengeIndex = 0;
let audioPlayer = document.getElementById('audio-player');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Tab navigation
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to current button and pane
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Initialize READ tab
    initReadTab();
    
    // Initialize LISTEN tab
    initListenTab();
    
    // Initialize WRITE tab
    initWriteTab();
});

// Utility functions
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function playAudio(audioFile) {
    audioPlayer.src = audioFile;
    audioPlayer.play().catch(error => {
        console.error('Audio playback failed:', error);
        alert('Audio playback failed. Audio files may not be available in this demo.');
    });
}

// READ Tab Functions
function initReadTab() {
    // Initialize flashcard
    updateFlashcard();
    
    // Flip card functionality
    const flipButton = document.getElementById('flip-card-btn');
    const flashcard = document.querySelector('.flashcard');
    
    flipButton.addEventListener('click', () => {
        flashcard.classList.toggle('flipped');
    });
    
    // Next card functionality
    const nextCardButton = document.getElementById('next-card-btn');
    nextCardButton.addEventListener('click', () => {
        currentReadIndex = (currentReadIndex + 1) % words.length;
        updateFlashcard();
        flashcard.classList.remove('flipped');
    });
    
    // Audio button functionality
    const readAudioBtn = document.getElementById('read-audio-btn');
    readAudioBtn.addEventListener('click', () => {
        playAudio(words[currentReadIndex].audio);
    });
    
    // Initialize quiz
    initReadQuiz();
}

function updateFlashcard() {
    document.getElementById('read-english-word').textContent = words[currentReadIndex].english;
    document.getElementById('read-quechua-word').textContent = words[currentReadIndex].quechua;
    document.getElementById('read-ipa').textContent = words[currentReadIndex].ipa;
    document.getElementById('read-syllables').textContent = words[currentReadIndex].syllables;
}

function initReadQuiz() {
    currentQuizIndex = Math.floor(Math.random() * words.length);
    const quizQuestion = document.getElementById('read-quiz-question');
    const quizOptions = document.getElementById('read-quiz-options');
    const quizFeedback = document.getElementById('read-quiz-feedback');
    const quizNextButton = document.getElementById('read-quiz-next');
    
    // Create quiz question
    quizQuestion.textContent = `Match the Quechua word "${words[currentQuizIndex].quechua}" to the correct English translation:`;
    
    // Create options
    quizOptions.innerHTML = '';
    
    // Get 3 random incorrect options
    let options = words.filter(word => word.english !== words[currentQuizIndex].english);
    options = shuffleArray(options).slice(0, 3);
    options.push(words[currentQuizIndex]);
    options = shuffleArray(options);
    
    options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('quiz-option');
        optionElement.textContent = option.english;
        optionElement.addEventListener('click', () => {
            // Remove selected class from all options
            document.querySelectorAll('.quiz-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            
            // Add selected class to clicked option
            optionElement.classList.add('selected');
            
            // Check if answer is correct
            if (option.english === words[currentQuizIndex].english) {
                quizFeedback.textContent = 'Correct! Well done!';
                quizFeedback.className = 'feedback correct';
            } else {
                quizFeedback.textContent = `Incorrect. The correct answer is "${words[currentQuizIndex].english}".`;
                quizFeedback.className = 'feedback incorrect';
            }
        });
        quizOptions.appendChild(optionElement);
    });
    
    // Next question button
    quizNextButton.addEventListener('click', () => {
        quizFeedback.textContent = '';
        quizFeedback.className = 'feedback';
        initReadQuiz();
    });
}

// LISTEN Tab Functions
function initListenTab() {
    const listenPlayAudio = document.getElementById('listen-play-audio');
    const listenOptions = document.getElementById('listen-options');
    const listenFeedback = document.getElementById('listen-feedback');
    const listenNext = document.getElementById('listen-next');
    
    // Initialize audio playback quiz
    updateListenQuiz();
    
    // Play audio button
    listenPlayAudio.addEventListener('click', () => {
        playAudio(words[currentListenIndex].audio);
    });
    
    // Next word button
    listenNext.addEventListener('click', () => {
        listenFeedback.textContent = '';
        listenFeedback.className = 'feedback';
        currentListenIndex = (currentListenIndex + 1) % words.length;
        updateListenQuiz();
    });
    
    // Initialize challenge mode
    updateListenChallenge();
    
    // Next challenge button
    document.getElementById('challenge-next').addEventListener('click', () => {
        document.getElementById('challenge-feedback').textContent = '';
        document.getElementById('challenge-feedback').className = 'feedback';
        updateListenChallenge();
    });
}

function updateListenQuiz() {
    const listenOptions = document.getElementById('listen-options');
    const listenFeedback = document.getElementById('listen-feedback');
    
    // Clear previous options
    listenOptions.innerHTML = '';
    
    // Get 3 random incorrect options
    let options = words.filter(word => word.english !== words[currentListenIndex].english);
    options = shuffleArray(options).slice(0, 3);
    options.push(words[currentListenIndex]);
    options = shuffleArray(options);
    
    options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('quiz-option');
        optionElement.textContent = option.english;
        optionElement.addEventListener('click', () => {
            // Remove selected class from all options
            document.querySelectorAll('#listen-options .quiz-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            
            // Add selected class to clicked option
            optionElement.classList.add('selected');
            
            // Check if answer is correct
            if (option.english === words[currentListenIndex].english) {
                listenFeedback.textContent = 'Correct! Well done!';
                listenFeedback.className = 'feedback correct';
            } else {
                listenFeedback.textContent = `Incorrect. The correct answer is "${words[currentListenIndex].english}".`;
                listenFeedback.className = 'feedback incorrect';
            }
        });
        listenOptions.appendChild(optionElement);
    });
}

function updateListenChallenge() {
    const challengeWord = document.getElementById('challenge-word');
    const challengeAudioOptions = document.getElementById('challenge-audio-options');
    const challengeFeedback = document.getElementById('challenge-feedback');
    
    // Update current challenge index
    currentChallengeIndex = Math.floor(Math.random() * words.length);
    
    // Display the Quechua word
    challengeWord.textContent = words[currentChallengeIndex].quechua;
    
    // Clear previous options
    challengeAudioOptions.innerHTML = '';
    
    // Get 3 random incorrect options
    let options = words.filter(word => word.quechua !== words[currentChallengeIndex].quechua);
    options = shuffleArray(options).slice(0, 3);
    options.push(words[currentChallengeIndex]);
    options = shuffleArray(options);
    
    options.forEach((option, index) => {
        const audioButton = document.createElement('button');
        audioButton.classList.add('audio-btn');
        audioButton.textContent = `Audio ${index + 1}`;
        audioButton.addEventListener('click', () => {
            playAudio(option.audio);
            
            // Check if answer is correct
            if (option.quechua === words[currentChallengeIndex].quechua) {
                challengeFeedback.textContent = 'Correct! That is the right audio.';
                challengeFeedback.className = 'feedback correct';
            } else {
                challengeFeedback.textContent = 'Incorrect. Try another audio.';
                challengeFeedback.className = 'feedback incorrect';
            }
        });
        challengeAudioOptions.appendChild(audioButton);
    });
}

// WRITE Tab Functions
function initWriteTab() {
    // Initialize guided writing display
    updateWriteDisplay();
    
    // Audio button functionality
    const writeAudioBtn = document.getElementById('write-audio-btn');
    writeAudioBtn.addEventListener('click', () => {
        playAudio(words[currentWriteIndex].audio);
    });
    
    // Initialize syllable quiz
    updateSyllableQuiz();
    
    // Check syllable answer button
    document.getElementById('syllable-check').addEventListener('click', checkSyllableAnswer);
    
    // Next syllable question button
    document.getElementById('syllable-next').addEventListener('click', () => {
        document.getElementById('syllable-feedback').textContent = '';
        document.getElementById('syllable-feedback').className = 'feedback';
        document.getElementById('syllable-answer').value = '';
        updateSyllableQuiz();
    });
    
    // Initialize write challenge
    updateWriteChallenge();
    
    // Check write challenge answer button
    document.getElementById('challenge-write-check').addEventListener('click', checkWriteChallengeAnswer);
    
    // Play challenge audio button
    document.getElementById('challenge-write-audio').addEventListener('click', () => {
        playAudio(words[currentWriteChallengeIndex].audio);
    });
    
    // Next write challenge button
    document.getElementById('challenge-write-next').addEventListener('click', () => {
        document.getElementById('challenge-write-feedback').textContent = '';
        document.getElementById('challenge-write-feedback').className = 'feedback';
        document.getElementById('challenge-write-answer').value = '';
        updateWriteChallenge();
    });
}

function updateWriteDisplay() {
    document.getElementById('write-quechua').textContent = words[currentWriteIndex].quechua;
    document.getElementById('write-english').textContent = words[currentWriteIndex].english;
    document.getElementById('write-ipa').textContent = words[currentWriteIndex].ipa;
    document.getElementById('write-syllables').textContent = words[currentWriteIndex].syllables;
}

function updateSyllableQuiz() {
    currentSyllableIndex = Math.floor(Math.random() * words.length);
    const syllableQuiz = document.getElementById('syllable-quiz');
    
    // Get syllables
    const syllables = words[currentSyllableIndex].syllables.split('-');
    
    // Choose a random syllable to hide
    const hiddenIndex = Math.floor(Math.random() * syllables.length);
    
    // Create display with missing syllable
    let displayText = '';
    for (let i = 0; i < syllables.length; i++) {
        if (i === hiddenIndex) {
            displayText += '___';
        } else {
            displayText += syllables[i];
        }
        
        if (i < syllables.length - 1) {
            displayText += '-';
        }
    }
    
    syllableQuiz.textContent = displayText;
    syllableQuiz.dataset.hiddenSyllable = syllables[hiddenIndex];
    syllableQuiz.dataset.hiddenIndex = hiddenIndex;
}

function checkSyllableAnswer() {
    const syllableQuiz = document.getElementById('syllable-quiz');
    const syllableAnswer = document.getElementById('syllable-answer').value.trim();
    const syllableFeedback = document.getElementById('syllable-feedback');
    
    const correctSyllable = syllableQuiz.dataset.hiddenSyllable;
    
    if (syllableAnswer.toLowerCase() === correctSyllable.toLowerCase()) {
        syllableFeedback.textContent = 'Correct! Well done!';
        syllableFeedback.className = 'feedback correct';
    } else {
        syllableFeedback.textContent = `Incorrect. The correct syllable is "${correctSyllable}".`;
        syllableFeedback.className = 'feedback incorrect';
    }
}

function updateWriteChallenge() {
    currentWriteChallengeIndex = Math.floor(Math.random() * words.length);
}

function checkWriteChallengeAnswer() {
    const writeAnswer = document.getElementById('challenge-write-answer').value.trim();
    const writeFeedback = document.getElementById('challenge-write-feedback');
    
    const correctWord = words[currentWriteChallengeIndex].quechua;
    
    if (writeAnswer.toLowerCase() === correctWord.toLowerCase()) {
        writeFeedback.textContent = 'Correct! Well done!';
        writeFeedback.className = 'feedback correct';
    } else {
        writeFeedback.textContent = `Incorrect. The correct word is "${correctWord}".`;
        writeFeedback.className = 'feedback incorrect';
    }
}
