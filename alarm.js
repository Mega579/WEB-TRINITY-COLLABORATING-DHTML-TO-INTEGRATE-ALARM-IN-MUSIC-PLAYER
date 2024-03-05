var alarmTimeout; // Declare the alarmTimeout variable outside the function

function setAlarm() {
  var selectedSong = document.getElementById("songSelect").value;

  var alarmTime = document.getElementById("alarmTime").value;

  var alarmTimeMs = new Date(alarmTime).getTime();

  var currentTime = new Date().getTime();

  // Check if the alarm time has already passed
  if (alarmTimeMs <= currentTime) {
    console.log("Invalid alarm time. Please select a future time.");
    return;
  }

  // Calculate the time remaining until the alarm
  var timeRemaining = alarmTimeMs - currentTime;

  // Check if the browser supports the Notification API
  if ("Notification" in window) {
    // Request permission to display notifications
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") {
        // Set the alarm
        alarmTimeout = setTimeout(function () {
          // Play the selected song
          var audio = new Audio(selectedSong);
          audio.play();

          // Display a notification
          var notification = new Notification("Alarm!");
        }, timeRemaining);
      } else {
        // Fallback to playing the song without a notification
        alarmTimeout = setTimeout(function () {
          // Play the selected song
          var audio = new Audio(selectedSong);
          audio.play();
        }, timeRemaining);
      }
    });
  }
}

// Create a function to stop the alarm
function stopAlarm() {
  console.log("Stop button clicked");

  // Pause the audio element if it exists
  var audio = document.querySelector("audio");
  if (audio) {
      audio.pause(); // Pause the audio immediately
      audio.currentTime = 0; // Reset the audio to the beginning
  }

  // Clear the alarm timeout
  clearTimeout(alarmTimeout);
}
