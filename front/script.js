// Get the current time
const now = new Date();

// Get the hour of the current time
const hour = now.getHours();

// Get the status container element and the dot element
const statusContainer = document.querySelector('.status-container');
const dot = document.querySelector('.dot');

// Set the default status text and dot color
let statusText = 'Sleep';
let dotColor = 'silver';

// Determine the status and dot color based on the hour
if (hour >= 8 && hour < 17) {
	statusText = 'Busy';
	dotColor = 'red';
} else if (hour >= 17 && hour < 21) {
	statusText = 'Free Time';
	dotColor = 'green';
} else if (hour >= 21 && hour <= 23 || hour >= 0 && hour < 2) {
	statusText = 'Working';
	dotColor = 'red';
}

// Set the text and dot color in the status container
document.getElementById('status-text').textContent = statusText;
dot.style.backgroundColor = dotColor;

// Set the date and time in the status container
document.getElementById('date-time').textContent = now.toLocaleString();