const settingsContainer = document.getElementById("settings-container");
      const settingsButton = document.getElementById("settings-button");

      settingsButton.addEventListener("click", function () {
        if (settingsContainer.style.right === "0px") {
          settingsContainer.style.right = "-400px";
        } else {
          settingsContainer.style.right = "0px";
        }
      });

      settingsButton.dispatchEvent(new Event("click"));
      settingsContainer.style.right = "-400px";

      const settingsContainer2 = document.getElementById("settings-container2");
      const settingsButton2 = document.getElementById("settings-button2");

      settingsButton2.addEventListener("click", function () {
        if (settingsContainer2.style.left === "0px") {
          settingsContainer2.style.left = "-400px";
        } else {
          settingsContainer2.style.left = "0px";
        }
      });

      settingsButton2.dispatchEvent(new Event("click"));
      settingsContainer2.style.left = "-400px";

      const popUp = document.getElementById("popup");
      const closeButton = document.getElementById("closepopup");

      function showPopUp() {
        popUp.style.display = "block";
      }

      closeButton.addEventListener("click", function () {
        popUp.style.display = "none";
      });

      const showUsername = document.getElementById("show-username");
      const currentUser = localStorage.getItem("username");

      if (currentUser) {
        showUsername.innerHTML = `<div class="greendot"></div><p id="show-username">${currentUser}</p>`;
      }

      const logoutContainer = document.getElementById("logout-container");
      const logoutBtn = document.getElementById("logout-button");
      const closeLogoutBtn = document.getElementById("closelogoutbtn");
      showUsername.addEventListener("click", function () {
        logoutContainer.style.display = "flex";
      });

      closeLogoutBtn.addEventListener("click", function () {
        logoutContainer.style.display = "none";
      });

      logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("username");
        window.location.href = "index.html";
      });

      function toggleMenu() {
        const menuButtons = document.querySelector(".menu-buttons");
        menuButtons.classList.toggle("show");
      }

      const closeBtn = document.getElementById("close");

      closeBtn.addEventListener("click", () => {
        settingsContainer2.style.left = "-400px";
      });



// Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA-tilEQgywgU_SUrOFA8fO6c-uxlzv86o",
    authDomain: "teletalk-917a9.firebaseapp.com",
    databaseURL:
      "https://teletalk-917a9-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "teletalk-917a9",
    storageBucket: "teletalk-917a9.appspot.com",
    messagingSenderId: "633282111310",
    appId: "1:633282111310:web:ada56cfd439ba912cd601f",
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const questionContainer = document.getElementById("question-container");
  const questionContainer2 = document.getElementById("question-container2");
  const logo = document.getElementById("logo");

  // Firebase Database reference
  var database = firebase.database();

  document.addEventListener("DOMContentLoaded", function () {
    loadChats();
    const sendButton = document.getElementById("send-button");

    sendButton.addEventListener("click", function () {
      const translation = document
      .getElementById("translation")
      .textContent.trim();
    if (translation === "") {
      alert("Bitte gib eine Nachricht ein.");
    } else {
      // Nachrichten-Count erhöhen
      var chatCountRef = database.ref("ChatCount");
      chatCountRef.transaction(
        function (currentCount) {
          return (currentCount || 0) + 1;
        },
        function (error, committed, snapshot) {
          if (error) {
            console.error("Transaktion fehlgeschlagen:", error);
          } else if (!committed) {
            console.warn("Transaktion abgebrochen.");
          } else {
            // Erfolgreiche Transaktion
            var currentCount = snapshot.val();
            var chatRef = database.ref("Chat/" + currentCount);

            // Daten für die Nachricht
            var currentUser = localStorage.getItem("username");
            var translation = document
              .getElementById("translation")
              .textContent.trim();
              var currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            // Daten in die Realtime Database schreiben
            chatRef.set({
              Number: currentCount,
              Name: currentUser,
              Nachricht: translation,
              Uhrzeit: currentTime,
            });

            clearMorseCode();
          }
        }
      );
    }
      
    });

    // Referenz auf die Nachrichten in der Realtime Database
    var chatRef = database.ref("Chat");

    

    // Event-Listener für Änderungen an den Nachrichten
    chatRef.on("child_added", function (snapshot) {
      var messageData = snapshot.val();
      var currentUser = localStorage.getItem("username");

      // Überprüfen, ob die Nachricht eigene oder fremde ist
      var isOwnMessage = messageData.Name === currentUser;

      // Nachrichten-Container auswählen
      var chatBody = document.querySelector(".chat-body");

      // Nachrichten-Element erstellen
      var messageElement = document.createElement("div");
      messageElement.classList.add("message");

      // Entscheiden, ob es eine eigene oder fremde Nachricht ist
      if (isOwnMessage) {
        messageElement.classList.add("sent");
      } else {
        messageElement.classList.add("received");
      }

      // Sendername hinzufügen
      var senderNameElement = document.createElement("p");
      senderNameElement.classList.add("sender-name");
      senderNameElement.textContent = messageData.Name;
      messageElement.appendChild(senderNameElement);

      // Nachrichtentext hinzufügen
      var messageTextElement = document.createElement("p");
      messageTextElement.textContent = messageData.Nachricht;
      messageElement.appendChild(messageTextElement);

      // Zeitstempel hinzufügen
      var timestampElement = document.createElement("span");
      timestampElement.classList.add("timestamp");
      timestampElement.textContent = messageData.Uhrzeit;
      messageElement.appendChild(timestampElement);

      // Nachrichten-Element zum Chat-Body hinzufügen
      chatBody.appendChild(messageElement);

      setTimeout(function() {
chatBody.scrollTop = chatBody.scrollHeight;
}, 200);
  });
    });

    let tutorial = localStorage.getItem("tutorial");

// Überprüfe, ob tutorial einen Wert hat und ob dieser Wert 'true' als Zeichenkette ist
if (tutorial && tutorial === 'true') {
  console.log("Tutorial schon angezeigt");
} else {
  showTutorial();
}
      
function showTutorial() {
  const driver = window.driver.js.driver;


  const driverObj = driver({
    overlayColor: 'black',
  animate: true,
  showProgress: true,
  // onDestroyStarted is called when the user tries to exit the tour
  onDestroyStarted: () => {
    if (!driverObj.hasNextStep() || confirm("Tutorial überspringen? (nicht empfohlen!)")) {
      driverObj.destroy();
    }
  },
  showButtons: ['next', 'previous', 'close'],
  steps: [
  { popover: { title: 'TeleTalk', description: 'This is a short tutorial on how to use Teletalk.' } },
    { element: '#chat-main', popover: { title: 'Chat', description: 'This is the chat window. Selfexplanatory.', side: "bottom", align: 'start' }},
    { element: '#morse-code-container', popover: { title: 'How to write', description: 'Use the morse device to write whatever you want. Click on the "i" symbol to learn more about how the morse code system works. ', side: "bottom", align: 'start' }},
    { element: '#clear-it', popover: { title: 'Clear', description: 'Here you can clear the current input if you misspelled something.', side: "top", align: 'start' }},
    { element: '#translation-container', popover: { title: 'Translation', description: 'Here you can see in realtime what your morse code translates to.', side: "top", align: 'start' }},
    { element: '#send-button', popover: { title: 'Send message', description: 'Here you can send your message. ', side: "top", align: 'start' }},
    { element: '#menuToggler', popover: { title: 'Menu', description: 'Klick here to open 2 Buttons, one for settings and one with a cheatsheet for morse codes.', side: "top", align: 'start' }},
    { element: '#show-username', popover: { title: 'LogOut', description: 'By clicking here you can log out.', side: "top", align: 'start' }},
  ]
});
      
driverObj.drive();
localStorage.setItem('tutorial', true);
}

// localStorage.removeItem('tutorial', true);

if (!currentUser) {
  window.location.href = "index.html";
}