// Check if user was previously logged in
let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

function toggleAuth() {
    isLoggedIn = !isLoggedIn; // Toggle state
    localStorage.setItem("isLoggedIn", isLoggedIn); // Save state

    // Update button visibility
    updateButtons();
}

function updateButtons() {
    document.getElementById("login").style.display = isLoggedIn ? "none" : "block";
    document.getElementById("logout").style.display = isLoggedIn ? "block" : "none";
}

// Run on page load
updateButtons();
