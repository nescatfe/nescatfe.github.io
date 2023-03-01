// Set the time zone to GMT+7
const timezoneOffset = 420;
const now = new Date(Date.now() + timezoneOffset * 60000);

// Get the hour of the current time in GMT+7
const hour = now.getHours();

// Get the status container element and the dot element
const statusContainer = document.querySelector('.status-container');
const dot = document.querySelector('.dot');

// Set the default status text and dot class
let statusText = 'Busy\u00A0';
let dotClass = 'red-dot';

// Determine the status and dot class based on the hour in GMT+7
if (hour >= 8 && hour < 17) {
  statusText = 'Busy\u00A0';
  dotClass = 'red-dot';
} else if (hour >= 18 && hour < 21) {
  statusText = 'Free Time\u00A0';
  dotClass = 'green-dot';
} else if (hour >= 22 || hour < 2) {
  statusText = 'Resting\u00A0';
  dotClass = 'silver-dot';
}

// Set the text and dot class in the status container
document.getElementById('status-text').textContent = statusText;
dot.classList.add(dotClass);

// Set the time in the status container
const timeText = now.toLocaleTimeString([], { timeZone: 'GMT', hour12: false, hour: '2-digit', minute: '2-digit' });
document.getElementById('time').textContent = `- Working | ${timeText} GMT+7 `;

// Change the status text and dot class based on the controller page button
document.getElementById('status-btn').addEventListener('click', function() {
  const statusOptions = document.getElementById('status-options');
  const selectedStatus = statusOptions.options[statusOptions.selectedIndex].value;
  
  const dotOptions = document.getElementById('dot-options');
  const selectedDot = dotOptions.options[dotOptions.selectedIndex].value;
  
  statusText = selectedStatus + '\u00A0';
  dot.classList.remove(dotClass);
  dot.classList.add(selectedDot);
  dotClass = selectedDot;
  
  document.getElementById('status-text').textContent = statusText;
});
