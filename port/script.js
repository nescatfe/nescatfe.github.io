// get the current time in GMT+7 timezone
const currentTime = new Date().toLocaleString("en-US", {
  timeZone: "Asia/Jakarta",
});

// get the hour component of the current time
const currentHour = new Date(currentTime).getHours();

// get the status indicator element
const statusIndicator = document.getElementById("status-indicator");

// get the status text and dot elements
const statusText = statusIndicator.querySelector(".status-text");
const statusDot = statusIndicator.querySelector(".status-dot");

// determine the status based on the current time
let status = "";
let dotColor = "";

if (currentHour >= 6 && currentHour < 17) {
  status = "Busy";
  dotColor = "red";
} else {
  status = "Free Time";
  dotColor = "green";
}

// set the status text and dot color
statusText.textContent = status;
statusDot.style.backgroundColor = dotColor;

// make the dot breathe
setInterval(() => {
  statusDot.classList.toggle("breathing");
}, 1000);
