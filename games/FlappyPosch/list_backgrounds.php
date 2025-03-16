<?php
$backgrounds = glob('backgrounds/*.png'); // Find all PNG files in the 'backgrounds' folder
$backgroundNames = array_map(function($file) {
    return basename($file); // Extract just the filenames
}, $backgrounds);
header('Content-Type: application/json');
echo json_encode($backgroundNames);
?>
