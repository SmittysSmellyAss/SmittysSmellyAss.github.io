$(document).ready(function() {
    var authToken = 'YMTA5Njg5NjYyOTgyODc2MzY1OA.G5yLbf.EVo-o7FdAlp1xV-ukSgD_BNjsCt01xO4tTJFZ0';
    var channelId = '1118945873532035174';

    // Fetch and display existing logs
    $.ajax({
        url: `https://discord.com/api/channels/${channelId}/messages`,
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${authToken}`
        },
        success: function(data) {
            data.forEach(function(message) {
                var alias = message.author.username;
                var content = message.content;
                appendLogEntry(alias, content);
            });
        },
        error: function(error) {
            console.error('Error fetching logs:', error);
        }
    });

    // Handle form submission
    $('#submissionForm').submit(function(event) {
        event.preventDefault();

        var alias = $('#alias').val();
        var message = $('#message').val();

        // Send message to Discord channel
        $.ajax({
            url: `https://discord.com/api/channels/${channelId}/messages`,
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`
            },
            data: JSON.stringify({ content: message }),
            contentType: 'application/json',
            success: function(data) {
                appendLogEntry(alias, message);
            },
            error: function(error) {
                console.error('Error submitting log:', error);
            }
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
