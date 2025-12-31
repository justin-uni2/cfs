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
  overlayInner.innerHTML = `
    <h1>Live Bewertung</h1>
    <h3>Wie bewertest du den aktuellen Stand der heutigen Sitzung?</h3>

    <div class="star-row" id="starRow">
      <span class="star" data-value="1">☆</span>
      <span class="star" data-value="2">☆</span>
      <span class="star" data-value="3">☆</span>
      <span class="star" data-value="4">☆</span>
      <span class="star" data-value="5">☆</span>
    </div>

    <div id="starReasons" class="hidden">
      <p>Können Sie die Bewertung Begründen?</p>

      <div class="reason-grid">
        <button class="reason-btn">Gut erklärt</button>
        <button class="reason-btn">Interessant</button>
        <button class="reason-btn">Ich kann der Vorlesung nicht folgen.</button>
        <button class="reason-btn">Unklar</button>

        <button class="reason-btn">Gute Beispiele</button>
        <button class="reason-btn">Zu wenig Beispiele</button>
        <button class="reason-btn">Keine Rückfragen möglich</button>
        <button class="reason-btn">Schreibe ich in das After-Session Feedback.</button>
      </div>
    </div>

    <div id="starConfirmation" class="confirmation hidden">
    Feedback gesendet. Vielen Dank!
    </div>
  `;

  let selectedStars = 0;

  // make stars clickable
  document.querySelectorAll(".star").forEach(star => {
    star.addEventListener("click", () => {
      selectedStars = Number(star.dataset.value);
      updateStars(selectedStars);
      showReasons(true);
      document.getElementById("starReasons").classList.remove("hidden");
      document.getElementById("starConfirmation").classList.add("hidden");
    });
  });

  // make reasons clickable
  document.querySelectorAll(".reason-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      showReasons(false);
      document.getElementById("starConfirmation").classList.remove("hidden");
    });
  });
}



function fastFeedbackOverlay() {
    overlayInner.innerHTML = `
    <h1>Fast Feedback</h1>
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
     overlayInner.innerHTML = `
        <h1>After-Session Feedback</h1>
        <h3>Trage in das Feld eine Nachricht für die Vorlesungsleitung ein.</h3>
    
        <textarea
        id="afterFeedbackText"
        placeholder="Dein Feedback..."
        rows="5"
        class="feedback-textarea"
        ></textarea>

        <div class="feedback-type">
        <button class="type-btn" data-type="lob">Lob</button>
        <button class="type-btn" data-type="kritik">Kritik</button>
        </div>

        <button id="sendFeedbackBtn" class="send-btn">Feedback senden</button>

        <div id="feedbackConfirmation" class="confirmation hidden">Feedback gesendet. Vielen Dank!</div>
    `;

    let selectedType = null;

    // type selection (Lob / Kritik)
    document.querySelectorAll(".type-btn").forEach(btn => {
        btn.addEventListener("click", () => {
        document.querySelectorAll(".type-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectedType = btn.dataset.type;
        });
    });

    // Send Feedback
    document.getElementById("sendFeedbackBtn").addEventListener("click", () => {
        const text = document.getElementById("afterFeedbackText").value.trim();

        if (!text || !selectedType) {
        alert("Bitte Text eingeben und Lob oder Kritik auswählen.");
        return;
        };

        // Show feedback confirmation
        document.getElementById("feedbackConfirmation").classList.remove("hidden");
    });
}

// helper functions

// star:
function updateStars(value) {
  document.querySelectorAll(".star").forEach(star => {
    const starValue = Number(star.dataset.value);
    star.textContent = starValue <= value ? "★" : "☆";
    star.classList.toggle("active", starValue <= value);
  });
}

function showReasons(makeVisible) {
    if (makeVisible) {
        document.querySelectorAll(".reason-btn").forEach(btn => {
            btn.classList.remove("hidden");
        });
    } else {
        document.querySelectorAll(".reason-btn").forEach(btn => {
            btn.classList.add("hidden");
        });
    } 
}

// fast-feedback:
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