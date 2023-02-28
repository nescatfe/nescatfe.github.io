// Get the current hour in GMT+7 timezone
const now = new Date();
const hour = now.getHours() + 7;

// Check if the current time is between 7am and 5pm
if (hour >= 7 && hour < 17) {
  const dot = document.querySelector('.busy');
  dot.classList.add('active');
} else {
  const dot = document.querySelector('.free');
  dot.classList.add('active');
}
