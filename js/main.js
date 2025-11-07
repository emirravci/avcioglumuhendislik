(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });


    // Facts counter
    // Facts counter — robust IntersectionObserver-based animation
    // Detect suffix and numeric target per element
    $('[data-toggle="counter-up"]').each(function () {
        var $el = $(this);
        var txt = $el.text().trim();
        var suffix = txt.endsWith('+') ? '+' : '';
        $el.data('counterup-suffix', suffix);
        if (!$el.attr('data-num')) {
            var digits = txt.replace(/[^0-9.]/g, '');
            if (digits) $el.attr('data-num', digits);
        }
        // ensure starting value is 0 for animation
        if ($el.text().trim() === '' || $el.text().trim() === '0') {
            $el.text('0');
        }
    });

    // fallback animation using requestAnimationFrame
    function animateCounter(el, target, duration, suffix) {
        target = parseInt(target, 10) || 0;
        var start = null;
        var initial = 0;
        function step(timestamp) {
            if (!start) start = timestamp;
            var progress = timestamp - start;
            var percent = Math.min(progress / duration, 1);
            var current = Math.floor(initial + (target - initial) * percent);
            el.textContent = current + (suffix || '');
            if (percent < 1) {
                window.requestAnimationFrame(step);
            }
        }
        window.requestAnimationFrame(step);
    }

    // Use IntersectionObserver to trigger counters when visible
    var counters = Array.prototype.slice.call(document.querySelectorAll('[data-toggle="counter-up"]'));
    if ('IntersectionObserver' in window && counters.length) {
        var io = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var el = entry.target;
                    var $el = $(el);
                    var target = el.getAttribute('data-num') || $el.text().replace(/[^0-9]/g, '');
                    var suffix = $el.data('counterup-suffix') || '';
                    animateCounter(el, target, 2000, suffix);
                    observer.unobserve(el);
                }
            });
        }, {threshold: 0.2});
        counters.forEach(function (c) { io.observe(c); });
    } else {
        // Fallback: animate all counters immediately
        counters.forEach(function (el) {
            var $el = $(el);
            var target = el.getAttribute('data-num') || $el.text().replace(/[^0-9]/g, '');
            var suffix = $el.data('counterup-suffix') || '';
            animateCounter(el, target, 2000, suffix);
        });
    }


    // Experience
    $('.experience').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Modal Video
    var $videoSrc;
    $('.btn-play').click(function () {
        $videoSrc = $(this).data("src");
    });
    console.log($videoSrc);
    $('#videoModal').on('shown.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    })
    $('#videoModal').on('hide.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc);
    })


    // Testimonial carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        loop: true,
        dots: false,
        nav: true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ]
    });
    
})(jQuery);

