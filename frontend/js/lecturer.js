const pageList = document.getElementById('page-list');
const pageDetails = document.getElementById('page-details');
const detailTitle = document.getElementById('detail-title');
const detailDescription = document.getElementById('detail-description');
const pageEnd = document.getElementById('page-end'); 

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



// Zurück zur Liste
function showList() {
    pageDetails.style.display = 'none';
    pageDashboard.style.display = 'none';
    if(pageEnd) pageEnd.style.display = 'none';
    pageList.style.display = 'block';
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
