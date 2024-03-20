// signup_script.js

// Function to handle signup form submission
document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get email and password from the form
    var email = document.getElementById("newEmail").value;
    var password = document.getElementById("newPassword").value;

    // Perform signup (you should replace this with your actual signup logic)
    // For demonstration purposes, let's just store the email and password in local storage
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPassword", password);
    // You may want to hash the password and store it securely, but that's beyond the scope of this example

    // Redirect to login page
    window.location.href = "login.html";
});
