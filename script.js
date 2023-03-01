// Set the time zone to GMT+7
const timezoneOffset = 420;
const now = new Date(Date.now() + timezoneOffset * 60000);

// Get the hour of the current time in GMT+7
const hour = (now.getHours() - timezoneOffset / 60 + 24) % 24;

// Get the status container element and the dot element
const statusContainer = document.querySelector('.status-container');
const dot = document.querySelector('.dot');

// Set the default status text and dot class
//let statusText = 'Resting\u00A0';
//let dotClass = 'silver-dot';

// Determine the status and dot class based on the hour in GMT+7
if (hour >= 0 && hour < 4) {
  statusText = 'Turu 😴\u00A0';
  dotClass = 'silver-dot';
} else if (hour >= 4 && hour < 5) {
  statusText = 'Fajr 🤲🏼\u00A0';
  dotClass = 'green-dot';
} else if (hour >= 5 && hour < 7) {
  statusText = 'Workout 🧘🏼‍♂️\u00A0';
  dotClass = 'orange-dot';
} else if (hour >= 7 && hour < 12) {
  statusText = 'Busy\u00A0';
  dotClass = 'red-dot';
} else if (hour >= 12 && hour < 13) {
  statusText = 'Ishoma\u00A0';
  dotClass = 'green-dot';
} else if (hour >= 13 && hour < 17) {
  statusText = 'Busy\u00A0';
  dotClass = 'red-dot';
} else if (hour >= 17 && hour < 19) {
  statusText = 'Free Time\u00A0';
  dotClass = 'green-dot';
} else if (hour >= 19 && hour < 22) {
  statusText = 'Working 👨🏽‍💻\u00A0';
  dotClass = 'orange-dot';
} else {
  statusText = 'Free Time\u00A0';
  dotClass = 'green-dot';
}


// Set the text and dot class in the status container
document.getElementById('status-text').textContent = statusText;
dot.classList.add(dotClass);

// Set the time in the status container
const timeText = now.toLocaleTimeString([], { timeZone: 'GMT', hour12: false, hour: '2-digit', minute: '2-digit' });
document.getElementById('time').textContent = `\u00A0| ${timeText} GMT+7 `;
