document.getElementById('submissionForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    var alias = document.getElementById('alias').value;
    var message = document.getElementById('message').value;

    // Create log entry
    var logEntry = document.createElement('p');
    logEntry.innerText = alias + ': ' + message;

    // Add log entry to logbook
    var logbook = document.getElementById('logbook');
    logbook.appendChild(logEntry);

    // Clear form fields
    document.getElementById('alias').value = '';
    document.getElementById('message').value = '';
});
