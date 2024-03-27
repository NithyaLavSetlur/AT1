// // Check if the user is logged in
// if (!localStorage.getItem("isLoggedIn")) {
//     // If not logged in, redirect to the login page
//     window.location.href = "login.html";
// }

// Defining Variables
let flashcards = [];
let currentFlashcard = 0;
let recentlyDeletedFlashcards = [];

// Initialise and Setup before running program
function init() {
    retrieveFromLocalStorage();
    const subjectInput = document.getElementById('subjectInput');
    const subjectText = document.getElementById('subjectText');
    const changeSubjectButton = document.getElementById('changeSubjectButton');

    if (subject) {
        subjectInput.style.display = 'none';
        subjectText.textContent = subject;
        subjectText.style.display = 'inline-block';
        changeSubjectButton.style.display = 'inline-block';
    } else {
        subjectText.style.display = 'none';
        changeSubjectButton.style.display = 'none';
    }

    if (flashcards.length > 0) {
        showFlashcard(currentFlashcard);
    }
}

// Retrieve data from local storage when session in loaded
function retrieveFromLocalStorage() {
    const storedFlashcards = localStorage.getItem('flashcards');
    const storedCurrentFlashcard = localStorage.getItem('currentFlashcard');

    if (storedFlashcards && storedCurrentFlashcard) {
        flashcards = JSON.parse(storedFlashcards);
        currentFlashcard = parseInt(storedCurrentFlashcard);
    }
}

// Functions for adding a new flaschard (set of question and answer)
// When user clicks the 'Add Flashcard' Button --> Flashcard is added
function addFlashcard() {
    // When the user inputs a question and answer
    const questionInput = document.getElementById('question');
    const answerInput = document.getElementById('answer');

    const question = questionInput.value.trim(); // Trim any leading or trailing whitespace in the text
    const answer = answerInput.value.trim(); // Trim any leading or trailing whitespace in the text

    // If user leaves form blank (warning message)
    if (question === '' || answer === '') {
        alert("Please enter both question and answer before adding the flashcard.");
        return;
    }

    // Create the new flashcard
    const newFlashcard = {
        question: question,
        answer: answer,
    };

    // Push the new flashcard to the flashcards display
    flashcards.push(newFlashcard);
    questionInput.value = '';
    answerInput.value = '';

    // Display the newly added flashcard
    currentFlashcard = flashcards.length - 1;
    showFlashcard(currentFlashcard);
    updateLocalStorage();
}

// Show flashcards (in display area)
function showFlashcard(index) {
    const flashcardElement = document.getElementById('flashcard');
    flashcardElement.innerHTML = `<p>${flashcards[index].question}</p>`;
    updateDots(index); // Update the Progress Dots
    // Display the 'Delete Flashcard' Button
    document.getElementById('deleteFlashcardButton').style.display = 'inline-block';
}

// When user clicks the 'Answer' Button --> Displays the Answer for current Question
function showAnswer() {
    const flashcardElement = document.getElementById('flashcard');
    const actionButton = document.getElementById('actionButton');
    const nextButton = document.getElementById('nextButton');
    flashcardElement.innerHTML = `<p>${flashcards[currentFlashcard].answer}</p>`; // Display answer for the current flashcard question
    actionButton.style.display = 'none';
    nextButton.style.display = 'inline-block'; // Replace 'Answer' Button with 'Next' Button
}

// When user clicks 'Next' Button --> Question of next Flashcard is displayed
function nextFlashcard() {
    const actionButton = document.getElementById('actionButton');
    const nextButton = document.getElementById('nextButton');
    currentFlashcard++;

    if (currentFlashcard < flashcards.length) {
        // Show next flashcard in line
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

// Updating Progress Dots (Green) --> In Sync with number of flashcards
// Looping through all displayed flashcards
function updateDots(index) {
    const dotsContainer = document.getElementById('dots');
    dotsContainer.innerHTML = '';

    // Create Progress Dots element
    for (let i = 0; i < flashcards.length; i++) {
        const dot = document.createElement('span');
        dot.className = 'dot';
        // When dot is clicked, disply the corresponding flashcard (question) --> User sees card corresponding to clicked dot
        dot.onclick = () => {
            currentFlashcard = i;
            showFlashcard(currentFlashcard);
        };
        dotsContainer.appendChild(dot);
    }
    const dots = dotsContainer.querySelectorAll('.dot');
    dots[index].classList.add('active');
}

// When user presses the 'Delete Flashcard' Button --> Flashcard is deleted from display array and stored in sidebar (recently deleted)
function deleteFlashcard() {
    // Save recently deleted flashcards
    recentlyDeletedFlashcards.push(flashcards[currentFlashcard]);
    flashcards.splice(currentFlashcard, 1); // Remove the flashcard from the flashcard display array
    if (flashcards.length === 0) {
        document.getElementById('deleteFlashcardButton').style.display = 'none';
        document.getElementById('flashcard').innerHTML = '';
        document.getElementById('dots').innerHTML = ''; // Clear corresponding progress dot(s)
    } else {
        if (currentFlashcard >= flashcards.length) {
            currentFlashcard = 0; // Display the first flashcard of array
        }
        showFlashcard(currentFlashcard);
    }
    updateLocalStorage();
    updateDeletedFlashcardsList(); // Update the sidebar with deleted flashcards
}

// User clicks 'Reset Flashcards' Button --> Reset number of flashcards in display array to zero
function resetFlashcards() {
    flashcards = [];
    currentFlashcard = 0; // Display no flashcards
    document.getElementById('deleteFlashcardButton').style.display = 'none'; // Hide 'Delete Flashcard' Button
    document.getElementById('flashcard').innerHTML = '';
    document.getElementById('dots').innerHTML = ''; // Clear all progress dot(s)
    updateLocalStorage();
}

// Function for updating Local Storage with current staus of flashcards
function updateLocalStorage() {
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
    localStorage.setItem('currentFlashcard', currentFlashcard);
}

// When user clicks 'Revise' Button --> View Flashcards in Test format (Add, Delete etc forms are hidden)
function takeTest() {
    document.getElementById('reviseInfo').style.display = 'none'; // Hide the text
    document.getElementById('addFlashcardForm').style.display = 'none'; // Hide 'Add Flashcard' and related Forms
    document.getElementById('deleteFlashcardButton').style.display = 'none'; // Hide 'Delete Flashcard' Button
    document.getElementById('takeTestButton').style.display = 'none'; // Hide 'Revise' Button
    document.getElementById('endTestButton').style.display = 'inline-block'; // Show 'Edit' Button
}

// User clicks 'Edit' Button --> Able to edit flashcards again (Add Delete etc forms are shown)
function endTest() {
    document.getElementById('reviseInfo').style.display = 'block'; // Show the text
    document.getElementById('addFlashcardForm').style.display = 'block'; // Show 'Add Flashcard' and related forms
    document.getElementById('deleteFlashcardButton').style.display = 'inline-block'; // Show 'Delete Flashcard' Button
    document.getElementById('takeTestButton').style.display = 'inline-block'; // Show 'Revise Button'
    document.getElementById('endTestButton').style.display = 'none'; // Hide 'Edit' Button
}


// Used clicks 'Shuffle' Button --> Flashcards are reordered randomly in display array
function shuffleFlashcards() {
    for (let i = flashcards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Randomisation
        [flashcards[i], flashcards[j]] = [flashcards[j], flashcards[i]];
    }
    currentFlashcard = 0; // Display the first most flashcard in the array after reordering
    showFlashcard(currentFlashcard);
    updateLocalStorage();
}

// Updating the Recently Deleted Flashcards List --> User interacts with the flashcards to restore them
function updateDeletedFlashcardsList() {
    const deletedFlashcardsList = document.getElementById('deletedFlashcardsList');
    deletedFlashcardsList.innerHTML = '';

    for (let i = 0; i < recentlyDeletedFlashcards.length; i++) {
        const flashcard = recentlyDeletedFlashcards[i];
        const listItem = document.createElement('li'); // Create a new element for every deleted flashcard in the Recently Deleted Flashcards List
        listItem.textContent = flashcard.question;
        // When  clicked on a deleted item, it will be restored into the flashcards display array, and progress dots will be updated
        listItem.onclick = function() {
            restoreFlashcard(i);
        };
        deletedFlashcardsList.appendChild(listItem);
    }
}

// Restore Flashcard Function
function restoreFlashcard(index) {
    const restoredFlashcard = recentlyDeletedFlashcards[index];
    flashcards.push(restoredFlashcard); // Push the restored flashcard to the display array
    recentlyDeletedFlashcards.splice(index, 1);
    updateLocalStorage();
    showFlashcard(currentFlashcard); // Add the flashcard to the display array, and update progress dots
    updateDeletedFlashcardsList(); // Update the Recently Deleted Flashcards List accordingly
}

// Check if subject exists in local storage
let subject = localStorage.getItem('flashcardsSubject');

// Initialize subject display
if (subject) {
    document.getElementById('subjectText').textContent = subject;
    document.getElementById('subjectText').style.display = 'inline-block';
    document.getElementById('changeSubjectButton').style.display = 'inline-block';
} else {
    document.getElementById('subjectInput').style.display = 'inline-block';
}

// Handle subject input
function handleSubjectInput(event) {
    if (event.key === 'Enter') {
        const subjectInput = document.getElementById('subjectInput');
        const subjectText = document.getElementById('subjectText');
        subject = subjectInput.value.trim();
        subjectText.textContent = subject;
        subjectInput.style.display = 'none';
        subjectText.style.display = 'inline-block';
        document.getElementById('changeSubjectButton').style.display = 'inline-block';
        localStorage.setItem('flashcardsSubject', subject);
    }
}

// Change subject
function changeSubject() {
    document.getElementById('subjectInput').value = '';
    document.getElementById('subjectInput').style.display = 'inline-block';
    document.getElementById('subjectText').style.display = 'none';
    document.getElementById('changeSubjectButton').style.display = 'none';
    localStorage.removeItem('flashcardsSubject');
}

// Add event listeners to input fields for Enter key press
document.getElementById('question').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('answer').focus(); // When user presses the enter key while cursor lies in question field, focus moves to answer field
    }
});

document.getElementById('answer').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        addFlashcard(); // When user presses the enter jey while cursor lies in the answer field, the flashcard is added, and focus moves to the question field
    }
});

init(); // Call the initialization function
