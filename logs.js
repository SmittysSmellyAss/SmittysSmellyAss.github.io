$(document).ready(function() {
    // Fetch and display existing logs
    $.get('https://discord.com/api/channels/1118945873532035174/messages', function(data) {
        data.forEach(function(message) {
            var alias = message.author.username;
            var content = message.content;
            appendLogEntry(alias, content);
        });
    });

    // Handle form submission
    $('#submissionForm').submit(function(event) {
        event.preventDefault();

        var alias = $('#alias').val();
        var message = $('#message').val();

        // Send message to Discord channel
        $.post('https://discord.com/api/channels/1118945873532035174/messages', {
            content: message
        }, function(data) {
            appendLogEntry(alias, message);
        });

        // Clear form fields
        $('#alias').val('');
        $('#message').val('');
    });

    // Helper function to append log entry
    function appendLogEntry(alias, message) {
        var logEntry = '<p>' + alias + ': ' + message + '</p>';
        $('#logbook').append(logEntry);
    }
});
