// login_script.js

// Function to handle login form submission
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get email and password from the form
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // Retrieve the email and password stored during signup (assuming they are stored securely)
    var storedEmail = localStorage.getItem("userEmail");
    var storedPassword = localStorage.getItem("userPassword");

    // Perform authentication (you should replace this with your actual authentication logic)
    // For demonstration purposes, let's just check if the entered email and password match the stored ones
    if (email === storedEmail && password === storedPassword) {
        // Set flag indicating user is logged in
        localStorage.setItem("isLoggedIn", true);
        // Redirect to main code (flashcards page)
        window.location.href = "flashcard_list.html";
    } else {
        alert("Invalid email or password. Please try again.");
    }
});

// After successful authentication
localStorage.setItem("isLoggedIn", true);
localStorage.setItem("email", userEmail); // Assuming userEmail is the variable holding the user's email
