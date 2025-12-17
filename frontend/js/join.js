/*
join.js
This javascript is implemented in the join.html

Author: Justin
*/

// Add Listener for clicking button
document.getElementById("joinBtn").addEventListener("click", joinSession);

// execute this function when clicking join Button
function joinSession() {
    const code = document
    .getElementById("sessionCode")
    .value
    .trim()
    .toUpperCase();

    // TODO: check if sessionCode exists!!!!!!!!!!!!!!!!!!!


    // Redirect to student view with session code
    window.location.href = "student.html?session=" + code;
}