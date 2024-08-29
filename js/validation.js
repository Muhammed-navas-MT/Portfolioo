document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('contactForm').addEventListener('submit', function(event) {
              event.preventDefault();  // Prevent the default form submission
        // Get form field values
        const name = document.querySelector('input[name="username"]').value;
        const email = document.querySelector('input[name="email"]').value;
        const message = document.querySelector('textarea[name="message"]').value;
        // Basic form validation
        if (!name || !email || !message) {
            alert("All fields are required.", "error");
            return;
        } else if (!validateEmail(email)) {
             alert("Please enter a valid email address.", "error");
            return;
        }
        // Data to be sent to the Google Apps Script web app
        const data = {
            name: name,
            email: email,
            message: message
        };
        // Replace 'YOUR_WEB_APP_URL' with your Google Apps Script web app URL
        fetch('https://script.google.com/macros/s/AKfycbxl4u2GkuXmA1U7l2I7EFYFEZY0yjGSIOIue-tp1oeYhJ6PiE5X9Ls8VUITJ2y8GCzjJA/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.result === "success") {
                alert("Form submitted succesfully");
            } else {
                alert("Error sending message: " + data.message, "error");
            }
        })
        .catch(error => {
            console.error("Error: ", error);
           alert("Error: " + error.message, "error");
        });
    });
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    });