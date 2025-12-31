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
            starOverlay();
            break;
        case "fast-feedback":
            fastFeedbackOverlay();
            break;
        case "quiz":
            quizOverlay(true);
            break;
        case "after-feedback":
            afterFeedbackOverlay();
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


// functions for different overlays
function starOverlay() {

}

function fastFeedbackOverlay() {
    overlayInner.innerHTML = `
    <h1>Fast-Feedback</h1>
    <div class="fast-grid">
    <button class="fast-btn btn-red">zu schnell</button>
    <button class="fast-btn btn-red">zu langsam</button>
    <button class="fast-btn btn-red">Mikro zu laut</button>
    <button class="fast-btn btn-red">Mikro zu leise</button>
    <button class="fast-btn btn-red">Atmosphäre zu laut</button>
    <button class="fast-btn btn-red">Falsche Folie</button>
    <button class="fast-btn btn-red">Bitte letzten Gedanken Wiederholen</button>
    <button class="fast-btn btn-red">Verbindung schlecht</button>
    </div>
`;

    document.querySelectorAll(".fast-btn").forEach(btn => {
            btn.addEventListener("click", () =>
            fastFeedbackSent());
    });
}



function quizOverlay(quizAvaiable) {

    if (!(quizAvaiable)) {
        noQuizAvailable(false);
    }
    else {

        const quiz = {
        question: "Wie verständlich war die heutige Vorlesung?",
        answers: ["Sehr gut", "Gut", "Okay", "Schlecht"]
        };

        overlayInner.innerHTML = `
            <h1>Quiz</h1>
            <h3>${quiz.question}</h3>
            <div class="quiz-grid">
            <button class="quiz-btn btn-red">${quiz.answers[0]}</button>
            <button class="quiz-btn btn-blue">${quiz.answers[1]}</button>
            <button class="quiz-btn btn-yellow">${quiz.answers[2]}</button>
            <button class="quiz-btn btn-green">${quiz.answers[3]}</button>
            </div>
        `;

        // activate quiz buttons
        document.querySelectorAll(".quiz-btn").forEach(btn => {
            btn.addEventListener("click", () =>
            noQuizAvailable(true));
        });
    }
}

function afterFeedbackOverlay() {
    
}

// helper functions

function fastFeedbackSent() {
    overlayInner.innerHTML = `
    <h1>Fast-Feedback</h1>
    <div class="fast-grid">
    <button class="fast-btn btn-red">zu schnell</button>
    <button class="fast-btn btn-red">zu langsam</button>
    <button class="fast-btn btn-red">Mikro zu laut</button>
    <button class="fast-btn btn-red">Mikro zu leise</button>
    <button class="fast-btn btn-red">Atmosphäre zu laut</button>
    <button class="fast-btn btn-red">Falsche Folie</button>
    <button class="fast-btn btn-red">Bitte letzten Gedanken Wiederholen</button>
    <button class="fast-btn btn-red">Verbindung schlecht</button>
    </div>

    <h2>Feedback gesendet!</h2>
`;
}


function noQuizAvailable (answered){
    if (answered) {
        overlayInner.innerHTML = `
            <h1>Quiz</h1>
            <h3>Aktuell keine Frage vorhanden.</h3>


            <h2> Antwort gesendet </h2>
        `;

    } else {

    
    overlayInner.innerHTML = `
            <h1>Quiz</h1>
            <h3>Aktuell keine Frage vorhanden.</h3>
        `;
    }
}



document.getElementById("closeOverlay").addEventListener("click", () => {
    overlay.style.display = "none";
});