// Set the time zone to GMT+7
const timezoneOffset = 420;
const now = new Date(Date.now() + timezoneOffset * 60000);

// Get the hour of the current time in GMT+7
const hour = now.getHours();

// Get the status container element and the dot element
const statusContainer = document.querySelector('.status-container');
const dot = document.querySelector('.dot');

// Set the default status text and dot class
let statusText = 'Busy';
let dotClass = 'red-dot';

// Determine the status and dot class based on the hour in GMT+7
if (hour >= 8 && hour < 17) {
  statusText = 'Busy';
  dotClass = 'red-dot';
} else if (hour >= 18 && hour < 21) {
  statusText = 'Free Time';
  dotClass = 'green-dot';
} else if (hour >= 22 || hour < 2) {
  statusText = 'Resting';
  dotClass = 'silver-dot';
}

// Set the initial text and dot class in the status container
document.getElementById('status-text').textContent = statusText;
dot.classList.add(dotClass);

// Set the time in the status container
const timeText = now.toLocaleTimeString([], { timeZone: 'GMT', hour12: false, hour: '2-digit', minute: '2-digit' });
document.getElementById('time').textContent = `- Working | ${timeText} GMT+7 `;

// Listen for changes to the status text and dot class from the controller page
window.addEventListener('message', (event) => {
  // Only allow messages from the same origin
  if (event.origin !== window.location.origin) {
    return;
  }

  const { type, status, dot } = event.data;

  if (type === 'updateStatus') {
    // Update the status text
    statusText = status;
    document.getElementById('status-text').textContent = statusText;
  } else if (type === 'updateDot') {
    // Remove any existing dot class
    dot.classList.remove(dotClass);

    // Update the dot class
    dotClass = dot;
    dot.classList.add(dotClass);
  }
});
