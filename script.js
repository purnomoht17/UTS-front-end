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

    // Scroll-triggered animation for content visibility
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

    // Form submission event for contact form
    const contactForm = $('#contact-form');

    contactForm.on('submit', function(event) {
        event.preventDefault();  // Prevent default form submission behavior
        alert('Pesan Anda telah terkirim!');  // Display alert when form is submitted

        // Kosongkan semua input setelah pesan terkirim
        contactForm.trigger("reset");
    });

    // Form submission event for subscribe form
    const subscribeForm = $('#subscribe-form');

    subscribeForm.on('submit', function(event) {
        event.preventDefault();  // Prevent default form submission behavior
        var email = $('[name="email"]').val();

        if (validateEmail(email)) {
            alert('Anda berhasil Bergabung!');  // Display alert when form is submitted
            $('[name="email"]').val('');  // Kosongkan input email setelah sukses
        } else {
            alert('Masukkan email yang valid.');  // Tampilkan pesan kesalahan jika email tidak valid
        }
    });

    // Fungsi untuk memvalidasi format email
    function validateEmail(email) {
        var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(email);
    }
});

$(document).ready(function() {
    
    let adDisplayCount = sessionStorage.getItem('adDisplayCount') || 0;

    
    function showAd() {
        if (adDisplayCount < 4) {
            setTimeout(function() {
                $('#ads-container').css('bottom', '0');
                adDisplayCount++;
                sessionStorage.setItem('adDisplayCount', adDisplayCount); 
            }, 3000);
        }
    }


    showAd();

    
    $('#close-ads').on('click', function() {
        $('#ads-container').css('bottom', '-100%');
    });

  
    if (!sessionStorage.getItem('pageVisited')) {
        sessionStorage.setItem('pageVisited', 'true');
        sessionStorage.setItem('adDisplayCount', 0);
    }
});


const hamburger = document.getElementById('hamburger-menu');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

