document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to the form submission
    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        const form = event.target;
        const data = new FormData(form);

        // Request user's location using Geolocation API
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                // Add latitude and longitude to form data
                data.append('latitude', position.coords.latitude);
                data.append('longitude', position.coords.longitude);

                // Simulate form submission for Netlify
                fetch('/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams(data).toString()
                })
                .then(() => {
                    // Display a success message
                    document.getElementById('response').innerHTML = '<p>Form successfully submitted!</p>';
                    form.reset(); // Clear the form fields
                })
                .catch(error => {
                    document.getElementById('response').innerHTML = '<p>There was an error submitting the form.</p>';
                    console.error('Form submission error:', error);
                });

            }, function(error) {
                // Handle geolocation error
                console.error('Geolocation error:', error);
                document.getElementById('response').innerHTML = '<p>Unable to retrieve your location. Please try again.</p>';
            });
        } else {
            // Geolocation is not supported by the browser
            console.error('Geolocation is not supported by this browser.');
            document.getElementById('response').innerHTML = '<p>Geolocation is not supported by your browser.</p>';
        }
    });
});



