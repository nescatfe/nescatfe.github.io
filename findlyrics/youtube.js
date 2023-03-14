// Wait for the document to finish loading before running the script
document.addEventListener('DOMContentLoaded', function() {

  // Store the API key for the YouTube API
  const apiKey = 'AIzaSyBJ-PXRhMKxYw3_dPX4j2tyqEyOyFF02SM';

  // Get the search form and search query input element
  const form = document.querySelector('#search-form');
  const searchQueryInput = document.querySelector('#search-query');

  // Listen for a form submission event and prevent the default behavior
  form.addEventListener('submit', event => {
    event.preventDefault();

    // Get the search query entered by the user
    const searchQuery = searchQueryInput.value;

    // Make an API request to search for videos using the entered search query and API key
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${searchQuery}&type=video&videoCategoryId=10&key=${apiKey}`)
      .then(response => response.json()) // Parse the response as JSON
      .then(data => {
        // Handle errors from the API request
        if (data.error && data.error.code === 403 && data.error.errors[0].reason === 'dailyLimitExceeded') {
          // Display an error message to the user when the API daily limit has been exceeded
          const resultContainer = document.createElement('div');
          resultContainer.textContent = 'YouTube API daily limit has been exceeded. Please try again tomorrow.';
          document.querySelector('#results-container').appendChild(resultContainer);
        } else {
          // Parse the results from the API response and create an array of objects for each video
          const results = data.items.map((item, index) => {
            const title = item.snippet.title.length > 40
              ? item.snippet.title.slice(0, 40) + "..."
              : item.snippet.title;
            const videoId = item.id.videoId;
            const link = `https://www.youtube.com/watch?v=${videoId}`;
            return { title, link, index };
          });
          
          // Create a container element to hold the search results
          const resultContainer = document.createElement('div');
          resultContainer.style.marginTop = '30px';

          if (results.length === 0) {
            // Display a message when there are no search results
            const noResultsMessage = document.createElement('p');
            noResultsMessage.textContent = 'No results found.';
            resultContainer.appendChild(noResultsMessage);
          } else {
            // Display the search results for each video
            document.querySelector('#results-container').innerHTML = ""; // Clear previous search results
            results.forEach(result => {
              const resultDiv = document.createElement('div');
              const titleLink = document.createElement('a');
              titleLink.href = result.link;
              titleLink.target = '_blank';
              titleLink.textContent = `${result.index + 1}. ${result.title}`; // Add number to title
              resultDiv.appendChild(titleLink);
              resultDiv.appendChild(document.createElement('br'));
              resultContainer.appendChild(resultDiv);
            });
          }

          // Replace or create the result container element in the HTML document
          const existingResultContainer = document.querySelector('#result-container');
          if (existingResultContainer) {
            existingResultContainer.replaceWith(resultContainer);
          } else {
            resultContainer.id = 'result-container';
            document.querySelector('#results-container').appendChild(resultContainer);
          }
        }
      })
      .catch(error => {
        // Handle errors that occur during the API request
        console.error(error);
      });
  });
});
