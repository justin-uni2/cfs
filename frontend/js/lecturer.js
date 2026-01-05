const pageList = document.getElementById('page-list');
const pageDetails = document.getElementById('page-details');
const detailTitle = document.getElementById('detail-title');
const detailDescription = document.getElementById('detail-description');

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
    pageList.style.display = 'block';
}



// Pop up Fenster öffnen
function openPopup() {
  document.getElementById("popup").style.display = "block";
}

<<<<<<< HEAD
// Pop up Fenster schließen
function closePopup() {
  document.getElementById("popup").style.display = "none";
}


=======
function addNewSession() {
    const sessionName = prompt("Name der neuen Session:");
    
    if (sessionName) {
        const upcomingList = document.getElementById('upcoming-sessions');
        
        const li = document.createElement("li");
        li.innerText = sessionName;
        li.onclick = () => alert("Session gewählt: " + sessionName);
        
        upcomingList.appendChild(li);
        console.log("Session '" + sessionName + "' wurde hinzugefügt.");
    }
}

>>>>>>> c5ebf358e5bd2f730611d765d592c1550c706100
