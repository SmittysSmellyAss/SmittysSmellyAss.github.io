$(document).ready(function() {
    var webhookUrl = 'https://discord.com/api/webhooks/1118954545784045710/t2Xm1b8BSZ1fqmYxhm8TDO7fYbSE9AQYVW-y9FTr0PhI6ZpGigWONeciviN-tjztJnXQ';

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
