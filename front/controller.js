// Set the status text and dot class based on the user input
function setStatus() {
  // Get the input values from the form
  const statusSelect = document.getElementById('status-select');
  const statusText = statusSelect.options[statusSelect.selectedIndex].text;
  const dotSelect = document.getElementById('dot-select');
  const dotClass = dotSelect.options[dotSelect.selectedIndex].value;

  // Send the status update to the main script
  const message = { statusText, dotClass };
  window.parent.postMessage(message, '*');
}

// Add a listener for the form submission
const form = document.getElementById('status-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  setStatus();
});
