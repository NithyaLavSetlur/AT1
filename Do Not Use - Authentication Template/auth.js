// auth.js

// Check if the user is logged in
if (!localStorage.getItem("isLoggedIn")) {
    // If not logged in, redirect to the login page
    window.location.href = "login.html";
}

// Function to handle logout
function logout() {
    // Clear the isLoggedIn flag from local storage
    localStorage.removeItem("isLoggedIn");
    // Redirect to the login page
    window.location.href = "login.html";
}

