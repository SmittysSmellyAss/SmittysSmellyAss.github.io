<?php
// Path to the backgrounds directory (relative to this PHP file)
$backgroundsDir = 'backgrounds/';

// Get all files in the directory
$files = scandir($backgroundsDir);

// Filter out "." and ".." (current and parent directory entries)
$backgrounds = array_filter($files, function($file) {
    return !in_array($file, ['.', '..']);
});

// Return the list of backgrounds as JSON
header('Content-Type: application/json');
echo json_encode(array_values($backgrounds)); // array_values resets keys to be numeric

?>
