document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        const form = event.target;
        const data = new FormData(form);

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
    });
});

