// get references to the navbar links and the sections to scroll to
			const tokenScannerLink = document.querySelector('a[href="#token_scanner"]');
			const chartLink = document.querySelector('a[href="#chart"]');
			const tokenScannerSection = document.getElementById('token_scanner');
			const chartSection = document.getElementById('chart');
			
			// add click event listeners to the navbar links to scroll to the corresponding sections
			tokenScannerLink.addEventListener('click', (event) => {
				event.preventDefault();
				tokenScannerSection.scrollIntoView({ behavior: 'smooth' });
			});
			
			chartLink.addEventListener('click', (event) => {
				event.preventDefault();
				chartSection.scrollIntoView({ behavior: 'smooth' });
			});

function redirectTo(url) {
	var tokenAddress = document.getElementById("token_address").value;
	if (tokenAddress) {
		window.open(url + tokenAddress, "_blank");
	}
}

