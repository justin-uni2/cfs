/*
student.js
This javascript is implemented in the student.html

Author: Justin
*/

const overlay = document.getElementById("overlay");
const overlayContent = document.getElementById("overlayContent");
const overlayInner = document.getElementById("overlayInner");
const bottomBar = document.getElementById("bottomBar");


document.querySelectorAll(".bottom-bar button").forEach(button => {
    button.addEventListener("click", () => {
    overlay.style.display = "block";

    // Edit overlay here
    // different switch cases:
    const func = button.dataset.function;
    switch (func) {
        case "star":
            overlayInner.innerHTML =    "<h2>Sterne Bewertung</h2>" +
                                        "<p>Inhalt:</p>";
            break;
        case "fast-feedback":
            overlayInner.innerHTML =    "<h2>Fast Feedback</h2>" +
                                        "<p>Inhalt:</p>";
            break;
        case "quiz":
            overlayInner.innerHTML =    "<h2>Quiz</h2>" +
                                        "<p>Inhalt:</p>";
            break;
        case "after-feedback":
            overlayInner.innerHTML =    "<h2>After-Session Feedback</h2>" +
                                        "<p>Inhalt:</p>";
            break;
        default:
            break;
    }


    // Layouting of arrow
    requestAnimationFrame(() => {
        const buttonRect = button.getBoundingClientRect();
        const overlayRect = overlayContent.getBoundingClientRect();

        const buttonCenterX = buttonRect.left + buttonRect.width / 2;
        const arrowX = buttonCenterX - overlayRect.left;

        overlayContent.style.setProperty("--arrow-x", arrowX + "px");
    });
    });
});

document.getElementById("closeOverlay").addEventListener("click", () => {
    overlay.style.display = "none";
});