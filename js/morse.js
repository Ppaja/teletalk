let morseCode = "";
      let dotSound = new Audio("audio/dot.mp3");
      let dashSound = new Audio("audio/dash.mp3");
      let morseDevice = document.querySelector(".morse-device");
      let longPressThreshold = 150;
      let pauseThreshold = 300;

      let pressing = false;
      let pressingStartTime;

      const morseCodeMap = {
        ".......": " ",
        ".-": "A",
        "-...": "B",
        "-.-.": "C",
        "-..": "D",
        ".": "E",
        "..-.": "F",
        "--.": "G",
        "....": "H",
        "..": "I",
        ".---": "J",
        "-.-": "K",
        ".-..": "L",
        "--": "M",
        "-.": "N",
        "---": "O",
        ".--.": "P",
        "--.-": "Q",
        ".-.": "R",
        "...": "S",
        "-": "T",
        "..-": "U",
        "...-": "V",
        ".--": "W",
        "-..-": "X",
        "-.--": "Y",
        "--..": "Z",
        ".----": "1",
        "..---": "2",
        "...--": "3",
        "....-": "4",
        ".....": "5",
        "-....": "6",
        "--...": "7",
        "---..": "8",
        "----.": "9",
        "-----": "0",
        ".-.-.-": ".",
        "--..--": ",",
        "..--..": "?",
        "-.-.--": "!",
        "-....-": "-",
        "-..-.": "/",
        ".--.-.": "@",
        "-.--.": "(",
        "-.--.-": ")",
        " ": " ",
      };

      function addSpace() {
        morseCode += " / ";
        updateMorseCodeInput();
        translateMorseCode();
      }

      function updateMorseCodeInput() {
        const morseCodeInput = document.getElementById("morsecode");
        morseCodeInput.value = morseCode;
      }

      function clearMorseCode() {
        morseCode = "";
        updateMorseCodeInput();
        translateMorseCode();
      }

      function startMorseCode() {
        if (!pressing) {
          pressing = true;
          pressingStartTime = Date.now();
        }
      }

      function stopMorseCode() {
        if (pressing) {
          let pressDuration = Date.now() - pressingStartTime;
          console.log("pressDuration:", pressDuration);

          if (pressDuration >= longPressThreshold) {
            morseCode += "-";
            dashSound.play();
          } else {
            morseCode += ".";
            dotSound.play();
          }
          updateMorseCode();
          toggleMorseDevice();
          pressing = false;
        }
      }
      function updateLongPressThreshold() {
        let thresholdInput = document.getElementById("longPressThreshold");
        longPressThreshold = parseInt(thresholdInput.value);
      }

      function updatePauseThreshold() {
        var pauseThresholdInput = document.getElementById("pauseThreshold");
        pauseThreshold = parseInt(pauseThresholdInput.value);
        clearTimeout(spaceTimeout);
      }

      function updateMorseCode() {
        let inputField = document.getElementById("morsecode");
        inputField.value = morseCode;
        translateMorseCode();
      }

      function clearMorseCode() {
        morseCode = "";
        updateMorseCode();
      }

      function toggleMorseDevice() {
        morseDevice.classList.add("morse-device-on");
        setTimeout(function () {
          morseDevice.classList.remove("morse-device-on");
        }, 100);
      }

      var keydownTimeout;
      var lastKeyUpTime = 0;
      var spacePressed = false;
      var spaceTimeout;

      document.addEventListener("keydown", function (event) {
        clearTimeout(keydownTimeout);
        if (event.code === "Space") {
          event.preventDefault();
          startMorseCode();
          spacePressed = true;
          clearTimeout(spaceTimeout);
        }
      });

      document.addEventListener("keyup", function (event) {
        if (event.code === "Space") {
          event.preventDefault();
          stopMorseCode();
          spacePressed = false;
          lastKeyUpTime = new Date().getTime();
          spaceTimeout = setTimeout(maybePause, pauseThreshold);
        }
      });

      morseDevice.addEventListener("touchstart", function (event) {
        event.preventDefault();
        startMorseCode();
        spacePressed = true;
        clearTimeout(spaceTimeout);
      });

      morseDevice.addEventListener("touchend", function (event) {
        event.preventDefault();
        stopMorseCode();
        spacePressed = false;
        lastKeyUpTime = new Date().getTime();
        spaceTimeout = setTimeout(maybePause, pauseThreshold);
      });

      function maybePause() {
        var currentTime = new Date().getTime();
        var timeSinceLastKeyUp = currentTime - lastKeyUpTime;
        if (!spacePressed && timeSinceLastKeyUp >= pauseThreshold) {
          addSpace();
        }
      }

      function translateMorseCode() {
        const translation = document.getElementById("translation");
        const words = morseCode.split(" / ");
        const translationText = words
          .map((word) =>
            word
              .split(" ")
              .map((code) => {
                if (code === ".......") {
                  return " ";
                } else {
                  return morseCodeMap[code] || "";
                }
              })
              .join("")
          )
          .join("");
        translation.textContent = translationText;
      }

      function submitForm() {
        const translation = document
          .getElementById("translation")
          .textContent.trim();
        if (translation === "") {
          document.getElementById("error-message").textContent =
            "Error (ID=420): No text input. Please use the intuitive input system to enter your email address.";
        } else {
          if (translation.includes("@")) {
            document.getElementById("error-message").textContent =
              "Thanks for your wasted time";
            redirect();
          } else {
            document.getElementById("error-message").textContent =
              "Error (ID=69): No valid email address.";
          }
        }
      }

      function redirect() {
        setTimeout(function () {
          window.location.href = "https://youtu.be/xvFZjo5PgG0";
        }, 1);
      }

      pressingTime = null;