document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        if (navigator.geolocation) {
            document.getElementById('response').innerHTML = '<p>Requesting your location...</p>';

            navigator.geolocation.getCurrentPosition(function(position) {
                // Populate hidden fields with geolocation data
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                document.getElementById('latitude').value = latitude;
                document.getElementById('longitude').value = longitude;

                // Log the coordinates for debugging
                console.log('Latitude:', latitude);
                console.log('Longitude:', longitude);

                // Check if the hidden fields are populated correctly
                console.log('Hidden Latitude:', document.getElementById('latitude').value);
                console.log('Hidden Longitude:', document.getElementById('longitude').value);

                // Submit the form with geolocation data
                form.submit();
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



