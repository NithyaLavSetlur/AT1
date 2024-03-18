let flashcards = [];
let currentFlashcard = 0;

function showFlashcard(index) {
    const flashcardElement = document.getElementById('flashcard');
    flashcardElement.innerHTML = `<p>${flashcards[index].question}</p>`;
    updateDots(index);
    document.getElementById('deleteFlashcardButton').style.display = 'inline-block';
}

function showAnswer() {
    const flashcardElement = document.getElementById('flashcard');
    const actionButton = document.getElementById('actionButton');
    const nextButton = document.getElementById('nextButton');
    flashcardElement.innerHTML = `<p>${flashcards[currentFlashcard].answer}</p>`;
    actionButton.style.display = 'none';
    nextButton.style.display = 'inline-block';
}

function nextFlashcard() {
    const actionButton = document.getElementById('actionButton');
    const nextButton = document.getElementById('nextButton');
    currentFlashcard++;

    if (currentFlashcard < flashcards.length) {
        showFlashcard(currentFlashcard);
        actionButton.style.display = 'inline-block';
        nextButton.style.display = 'none';
    } else {
        // All flashcards shown, reset to the first one
        currentFlashcard = 0;
        showFlashcard(currentFlashcard);
        actionButton.style.display = 'inline-block';
        nextButton.style.display = 'none';
    }
    updateLocalStorage();
}

function updateDots(index) {
    const dotsContainer = document.getElementById('dots');
    dotsContainer.innerHTML = '';

    for (let i = 0; i < flashcards.length; i++) {
        const dot = document.createElement('span');
        dot.className = 'dot';
        dot.onclick = () => {
            currentFlashcard = i;
            showFlashcard(currentFlashcard);
        };
        dotsContainer.appendChild(dot);
    }

    const dots = dotsContainer.querySelectorAll('.dot');
    dots[index].classList.add('active');
}

function addFlashcard() {
    const questionInput = document.getElementById('question');
    const answerInput = document.getElementById('answer');

    const newFlashcard = {
        question: questionInput.value,
        answer: answerInput.value,
    };

    flashcards.push(newFlashcard);
    questionInput.value = '';
    answerInput.value = '';

    // Show the newly added flashcard
    currentFlashcard = flashcards.length - 1;
    showFlashcard(currentFlashcard);
    updateLocalStorage();
}

function deleteFlashcard() {
    flashcards.splice(currentFlashcard, 1);
    if (flashcards.length === 0) {
        document.getElementById('deleteFlashcardButton').style.display = 'none';
        document.getElementById('flashcard').innerHTML = '';
        document.getElementById('dots').innerHTML = ''; // Clear progress dots
    } else {
        if (currentFlashcard >= flashcards.length) {
            currentFlashcard = 0;
        }
        showFlashcard(currentFlashcard);
    }
    updateLocalStorage();
}

function resetFlashcards() {
    flashcards = [];
    currentFlashcard = 0;
    document.getElementById('deleteFlashcardButton').style.display = 'none';
    document.getElementById('flashcard').innerHTML = '';
    document.getElementById('dots').innerHTML = ''; // Clear progress dots
    updateLocalStorage();
}

function updateLocalStorage() {
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
    localStorage.setItem('currentFlashcard', currentFlashcard);
}

function retrieveFromLocalStorage() {
    const storedFlashcards = localStorage.getItem('flashcards');
    const storedCurrentFlashcard = localStorage.getItem('currentFlashcard');

    if (storedFlashcards && storedCurrentFlashcard) {
        flashcards = JSON.parse(storedFlashcards);
        currentFlashcard = parseInt(storedCurrentFlashcard);
    }
}

function init() {
    retrieveFromLocalStorage();
    if (flashcards.length > 0) {
        showFlashcard(currentFlashcard);
    }
}

function takeTest() {
    // document.getElementById('addFlashcardForm').style.display = 'none';
    // document.getElementById('deleteFlashcardButton').style.display = 'none';
    document.getElementById('takeTestButton').style.display = 'none';
    document.getElementById('endTestButton').style.display = 'inline-block';
    addFlashcardForm.style.display = "none";
}

function endTest() {
    // document.getElementById('addFlashcardForm').style.display = 'block';
    // document.getElementById('deleteFlashcardButton').style.display = 'inline-block';
    document.getElementById('takeTestButton').style.display = 'inline-block';
    document.getElementById('endTestButton').style.display = 'none';
    addFlashcardForm.style.display = "block";
}

function shuffleFlashcards() {
    for (let i = flashcards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [flashcards[i], flashcards[j]] = [flashcards[j], flashcards[i]];
    }
    currentFlashcard = 0;
    showFlashcard(currentFlashcard);
    updateLocalStorage();
}

init();

// Add event listeners to input fields for Enter key press
document.getElementById('question').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('answer').focus();
    }
});

document.getElementById('answer').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        addFlashcard();
    }
});