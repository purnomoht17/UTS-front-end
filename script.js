$(document).ready(function() {
    // Array video sources
    var videos = [
        "assets/videos/food.mp4",
        "assets/videos/running.mp4",
        "assets/videos/teknologi.mp4",
        "assets/videos/gayahidup.mp4"
    ];

    var currentVideoIndex = 0;
    var videoElement = $('#background-video');

    // Load the initial video
    videoElement.attr('src', videos[currentVideoIndex]);

    // Swipe detection for both touch and mouse
    var startX, endX;

    // For touch devices
    $(document).on('touchstart', function(e) {
        startX = e.originalEvent.touches[0].clientX;
    });

    $(document).on('touchend', function(e) {
        endX = e.originalEvent.changedTouches[0].clientX;
        handleSwipe();
    });

    // For mouse devices (desktop, touchpad, etc.)
    $(document).on('mousedown', function(e) {
        startX = e.clientX;
    });

    $(document).on('mouseup', function(e) {
        endX = e.clientX;
        handleSwipe();
    });

    function handleSwipe() {
        var swipeThreshold = 50; // Minimum swipe distance to change video
        var swipeDistance = startX - endX;

        if (swipeDistance > swipeThreshold) {
            // Swipe left (next video)
            currentVideoIndex = (currentVideoIndex + 1) % videos.length;
            console.log('Swiped left, changing to next video.');
        } else if (swipeDistance < -swipeThreshold) {
            // Swipe right (previous video)
            currentVideoIndex = (currentVideoIndex - 1 + videos.length) % videos.length;
            console.log('Swiped right, changing to previous video.');
        }

        // Update video source if a valid swipe occurred
        if (Math.abs(swipeDistance) > swipeThreshold) {
            changeVideo();
        }
    }

    // Function to change video
    function changeVideo() {
        videoElement.attr('src', videos[currentVideoIndex]);
        videoElement.get(0).play(); // Ensure the video starts playing after the change
    }

    // Event listener for when the video ends
    videoElement.on('ended', function() {
        // Move to the next video when the current one finishes
        currentVideoIndex = (currentVideoIndex + 1) % videos.length;
        changeVideo();
    });

    $(document).ready(function() {
        // Function to check if the content-container is visible on scroll
        function checkVisibility() {
            var scrollPosition = $(window).scrollTop();
            var windowHeight = $(window).height();
            var contentContainerTop = $('.content-container').offset().top;
    
            // If the content-container is in view, add the 'visible' class
            if (scrollPosition + windowHeight > contentContainerTop) {
                $('.content-container').addClass('visible');
            }
            
            console.log('Scroll position:', scrollPosition);
            console.log('Container top:', contentContainerTop);
            console.log('Container visible:', $('.content-container').hasClass('visible'));
        }
    
        // Check visibility on scroll and on page load
        $(window).on('scroll', checkVisibility);
        checkVisibility(); // Run on page load in case the element is already visible
    });
    
    
});
