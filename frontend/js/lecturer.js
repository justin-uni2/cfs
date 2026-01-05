const pageList = document.getElementById('page-list');
const pageDetails = document.getElementById('page-details');
const detailTitle = document.getElementById('detail-title');
const pageEnd = document.getElementById('page-end'); 
const sessionData = {};
let currentEditSession = null;
const pageDashboard = document.getElementById('page-dashboard');



function showDetails(name) {
    document.getElementById('detail-title').innerText = name;
    
    const upcomingList = document.getElementById('upcoming-sessions');
    const pastList = document.getElementById('past-sessions');

    // Listen leeren
    upcomingList.innerHTML = "";
    pastList.innerHTML = "";

    // Beispiel-Daten (In einer echten App kämen diese aus einer Datenbank)
    const sessions = [
        { title: "Einführung MCI", type: "past" },
        { title: "User Research", type: "upcoming" }
    ];

    sessions.forEach(s => {
        const li = document.createElement("li");
        li.innerText = s.title;
        li.onclick = () => alert("Session gewählt: " + s.title);
        
        if (s.type === "upcoming") {
            upcomingList.appendChild(li);
        } else {
            pastList.appendChild(li);
        }
    });

    document.getElementById('page-list').style.display = 'none';
    document.getElementById('page-details').style.display = 'block';


}



// Pop up Fenster öffnen
function openPopup() {
  document.getElementById("popup").style.display = "block";
}

// Pop up Fenster schließen
function closePopup() {
  document.getElementById("popup").style.display = "none";
}


function addNewSession() {
    const sessionName = prompt("Name der neuen Session:");
    if (!sessionName) return;

    const ul = document.getElementById("upcoming-sessions");
    const li = document.createElement("li");
    li.textContent = sessionName;

    // Start Session Button erstellen
    const startButton = document.createElement("button");
    startButton.className = "btn-four";
    startButton.textContent = "Start Session";
    startButton.style.marginLeft = "5px";

    // Bearbeiten Button
    const bearbeitenButton = document.createElement("button");
    bearbeitenButton.className = "btn-four";
    bearbeitenButton.textContent = "Bearbeiten";
    bearbeitenButton.style.marginLeft = "5px";

    // Klick-Event: Dashboard anzeigen
    startButton.onclick = () => {
        startSession(sessionName);
    };

    bearbeitenButton.onclick = () => {
        bearbeiteSession(sessionName);

    };

    li.appendChild(startButton);
    li.appendChild(bearbeitenButton);
    ul.appendChild(li);
}
function startSession(sessionName) {
    document.getElementById("page-details").style.display = "none";
    document.getElementById("page-dashboard").style.display = "block";
    document.getElementById("dashboard-title").textContent = sessionName;

    // Initialisierung der Live-Werte (Wizard-of-Oz Simulation)
    document.getElementById("participants").innerText = "49";
    document.getElementById("duration").innerText = "00:02:15";
    
    console.log("Session '" + sessionName + "' gestartet.");
}
function renderEditQuestions(sessionName) {
    const list = document.getElementById("edit-question-list");
    list.innerHTML = "";

    const questions = sessionData[sessionName].questions;

    if (questions.length === 0) {
        const li = document.createElement("li");
        li.innerText = "Noch keine Fragen vorhanden.";
        list.appendChild(li);
        return;
    }

    questions.forEach((q, index) => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${index + 1}. ${q.question}</strong>`;

        const ul = document.createElement("ul");
        q.answers.forEach(a => {
            const aLi = document.createElement("li");
            aLi.innerText = a;
            ul.appendChild(aLi);
        });

        li.appendChild(ul);
        list.appendChild(li);
    });
}
function bearbeiteSession(sessionName) {

    if (!sessionData[sessionName]) {
        sessionData[sessionName] = {
            name: sessionName,
            questions: []
        };
    }

    currentEditSession = sessionName;

    document.getElementById("edit-session").style.display = "block";
    document.getElementById("edit-session-name").value = sessionName;

    renderEditQuestions(sessionName);
}
function saveSessionName() {
    const newName = document.getElementById("edit-session-name").value.trim();
    if (!newName || newName === currentEditSession) return;

    sessionData[newName] = sessionData[currentEditSession];
    sessionData[newName].name = newName;
    delete sessionData[currentEditSession];

    currentEditSession = newName;

    alert("Sessionname geändert!");
}
function addQuestion() {
    if (!currentEditSession) return;

    const questionText = document.getElementById("question-text").value.trim();
    const answerInputs = document.querySelectorAll(".answer-input");

    if (!questionText) {
        alert("Bitte eine Frage eingeben!");
        return;
    }

    const answers = [];
    for (let input of answerInputs) {
        if (!input.value.trim()) {
            alert("Bitte alle 4 Antworten ausfüllen!");
            return;
        }
        answers.push(input.value.trim());
    }

    sessionData[currentEditSession].questions.push({
        question: questionText,
        answers: answers
    });

    // Felder leeren
    document.getElementById("question-text").value = "";
    answerInputs.forEach(i => i.value = "");

    renderEditQuestions(currentEditSession);
}


function closeEdit() {
    document.getElementById("edit-session").style.display = "none";
    document.getElementById("edit-question-list").innerHTML = "";
}




//const pageEnd = document.getElementById('page-end');

function endSession() {
    if (confirm("Möchten Sie die Session wirklich beenden?")) {
        pageDashboard.style.display = "none";
        pageEnd.style.display = "block";
        console.log("Session wurde erfolgreich beendet.");
    }
}

function backToSessions() {
    document.getElementById("page-dashboard").style.display = "none";
    document.getElementById("page-details").style.display = "block";
}

function addFeedbackToTicker(text) {
    const tickerUl = document.querySelector("#feedback-ticker ul");
    if (!tickerUl) return;
    
    const li = document.createElement("li");
    const now = new Date();
    const time = now.getHours() + ":" + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
    
    li.innerText = `"${text}" (${time})`;
    tickerUl.prepend(li); // Neues Feedback erscheint oben
}

// Zurück zur Listenübersicht
function showList() {
    document.getElementById("page-details").style.display = "none";
    document.getElementById("page-dashboard").style.display = 'none';
    document.getElementById("page-end").style.display = 'none';
    document.getElementById("page-list").style.display = "block";
}
