document.addEventListener("DOMContentLoaded", function() {
    const videoPlayer = document.getElementById("video-player");
    const playBtn = document.getElementById("play-btn");
    const replaceBtn = document.getElementById("replace-btn");

    // Array of video file names in your directory
    const videos = [
        "fan_videos/video1.mp4",
        "fan_videos/video2.mp4",
        "fan_videos/video3.mp4",
        "fan_videos/video4.mp4",
        "fan_videos/video5.mp4",
        "fan_videos/video6.mp4",
        "fan_videos/video7.mp4",
        "fan_videos/video8.mp4",
        "fan_videos/video9.mp4",
        "fan_videos/video10.mp4",
        "fan_videos/video11.mp4",
        "fan_videos/video12.mp4",
        "fan_videos/video13.mp4",
        "fan_videos/video14.mp4",
        "fan_videos/video15.mp4",
        "fan_videos/video16.mp4",
        "fan_videos/video17.mp4",
        "fan_videos/video18.mp4",
        "fan_videos/video19.mp4",
        "fan_videos/video20.mp4",
        "fan_videos/video21.mp4",
        "fan_videos/video22.mp4",
        "fan_videos/video23.mp4",
        "fan_videos/video24.mp4",
        "fan_videos/video25.mp4",
        "fan_videos/video26.mp4",
        "fan_videos/video27.mp4",
        "fan_videos/video25.mp4",
        "fan_videos/video28.mp4",
        "fan_videos/video29.mp4",
        "fan_videos/video31.mp4",
        "fan_videos/video32.mp4",
        "fan_videos/video33.mp4",
        "fan_videos/video34.mp4",
        "fan_videos/video35.mp4",
        "fan_videos/video36.mp4",
        "fan_videos/video37.mp4",
        "fan_videos/video38.mp4",
        "fan_videos/video39.mp4"
        "fan_videos/video40.mp4",
];

    let shuffledVideos = shuffle(videos.slice()); // Make a copy of the videos array and shuffle it
    let currentIndex = 0; // Index to keep track of the current video

    function shuffle(array) {
        // Fisher-Yates shuffle algorithm
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function loadNextVideo() {
        // Check if currentIndex exceeds the length of the videos array
        if (currentIndex >= shuffledVideos.length) {
            // If so, shuffle the videos array again and reset the currentIndex
            shuffledVideos = shuffle(videos.slice());
            currentIndex = 0;
        }

        // Get the next video path
        const nextVideo = shuffledVideos[currentIndex];

        // Set the video player source to the next video
        videoPlayer.src = nextVideo;

        // Increment the currentIndex for the next video
        currentIndex++;
    }

    playBtn.addEventListener("click", function() {
        videoPlayer.play();
    });

    replaceBtn.addEventListener("click", function() {
        loadNextVideo();
    });

    // Load the first video when the page loads
    loadNextVideo();
});
