/*
student.js
This javascript is implemented in the student.html

Author: Justin
*/

const overlay = document.getElementById("overlay");
const overlayContent = document.getElementById("overlayContent");
const overlayInner = document.getElementById("overlayInner");
const bottomBar = document.getElementById("bottomBar");


// general background
initSessionInfo();

function initSessionInfo() {
  const params = new URLSearchParams(window.location.search);

  const session = params.get("session");
  const status = params.get("status"); // "waiting" | "live"
  const startTime = params.get("start");

  // Implement Session-Code
  if (session) {
    document.getElementById("sessionCode").innerText = session;
  }

  const statusDiv = document.getElementById("sessionStatus");
  const bottomBar = document.getElementById("bottomBar");

  if (status === "waiting") {
    statusDiv.classList.add("waiting");
    statusDiv.innerHTML = `
      Die Session hat noch nicht begonnen.<br>
      Start heute um <strong>${startTime || "?"}</strong>.
    `;

    // Only show after-session feedback
    bottomBar.querySelectorAll("button").forEach(btn => {
      if (btn.dataset.function !== "after-feedback") {
        btn.style.display = "none";
      }
    });

  } else if (status === "live") {
    statusDiv.classList.add("live");
    statusDiv.innerHTML = `
      Die Session läuft gerade.<br>
      Du kannst jetzt Feedback geben.
    `;

  } 
}



// Overlay selection
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
            initFastFeedback();
            //fastFeedbackOverlay();
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

function initFastFeedback() {
  overlayInner.innerHTML = `
      <h1>Fast-Feedback</h1>
      <div class="fast-grid" id="buttonContainer">
          <button class="fast-btn btn-red" onclick="triggerFeedback('zu schnell')">zu schnell</button>
          <button class="fast-btn btn-red" onclick="triggerFeedback('zu langsam')">zu langsam</button>
          <button class="fast-btn btn-red" onclick="triggerFeedback('Mikro zu laut')">Mikro zu laut</button>
          <button class="fast-btn btn-red" onclick="triggerFeedback('Mikro zu leise')">Mikro zu leise</button>
          <button class="fast-btn btn-red" onclick="triggerFeedback('Atmosphäre zu laut')">Atmosphäre zu laut</button>
          <button class="fast-btn btn-red" onclick="triggerFeedback('Falsche Folie')">Falsche Folie</button>
          <button class="fast-btn btn-red" onclick="triggerFeedback('Wiederholen')">Bitte letzten Gedanken Wiederholen</button>
          <button class="fast-btn btn-red" onclick="triggerFeedback('Verbindung schlecht')">Verbindung schlecht</button>
      </div>
      <h2 id="feedbackStatus" style="opacity: 0; transition: opacity 0.1s ease-in-out; margin-top: 20px;"></h2>
  `;
}

function triggerFeedback(typ) {
  console.log("Sende Feedback: " + typ); 
  
  const status = document.getElementById('feedbackStatus');
  
  status.style.transition = 'none'; 
  status.style.opacity = '0';
  
  setTimeout(() => {
      status.innerText = `Feedback "${typ}" gesendet!`;
      status.style.transition = 'opacity 0.1s ease-in-out'; 
      status.style.opacity = '1';
  }, 50); 
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