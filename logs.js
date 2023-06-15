$(document).ready(function() {
    var webhookUrl = 'https://discord.com/api/webhooks/1118956540125265980/_dzSq604-oB09tl9IaWukcZn328fE86vZUOm6bcBA6i4YqeuCM4i-NjrlVPSNLKwAvoc';

    // Fetch and display existing logs
    $.get(webhookUrl + '/messages', function(data) {
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
        $.post(webhookUrl, {
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
