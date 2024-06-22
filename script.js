document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault();

        const form = event.target;
        const data = new FormData(form);

        if (navigator.geolocation) {
            document.getElementById('response').innerHTML = '<p>Requesting your location...</p>';

            navigator.geolocation.getCurrentPosition(function(position) {
                data.append('latitude', position.coords.latitude);
                data.append('longitude', position.coords.longitude);

                fetch('/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams(data).toString()
                })
                .then(() => {
                    window.location.href = 'congratulations.html';
                })
                .catch(error => {
                    document.getElementById('response').innerHTML = '<p>There was an error submitting the form.</p>';
                    console.error('Form submission error:', error);
                });

            }, function(error) {
                handleGeolocationError(error);
            }, {
                enableHighAccuracy: true
            });
        } else {
            console.error('Geolocation is not supported by this browser.');
            document.getElementById('response').innerHTML = '<p>Geolocation is not supported by your browser.</p>';
        }
    });
});

function handleGeolocationError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById('response').innerHTML = '<p>Location permission denied by user.</p>';
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById('response').innerHTML = '<p>Location information is unavailable.</p>';
            break;
        case error.TIMEOUT:
            document.getElementById('response').innerHTML = '<p>The request to get your location timed out.</p>';
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById('response').innerHTML = '<p>An unknown error occurred.</p>';
            break;
    }
}
});



