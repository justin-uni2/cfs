document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const userField = document.getElementById('username').value;
    const passField = document.getElementById('password').value;
    const errorMsg = document.getElementById('errorMessage');

    //hier nur gehartcodet, reicht aber vielleicht so zur präsentation 
    if (userField === "admin" && passField === "secret") {
        alert("Login erfolgreich!");
        window.location.href = "lecturer.html"; 
    } else {
        errorMsg.textContent = "Invalid username or password.";
        errorMsg.classList.remove('hidden');
    }
});

