document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);

    fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString()
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('response').innerHTML = '<p>Form successfully submitted!</p>';
        form.reset();
    })
    .catch(error => console.error('Form submission error:', error));
});
