// ==========================
// Helper Functions
// ==========================

// حساب الإزاحة حسب طول النافذة
function getOffSet() {
    var _offset = 450;
    var windowHeight = window.innerHeight;

    if (windowHeight > 500) _offset = 400;
    if (windowHeight > 680) _offset = 300;
    if (windowHeight > 830) _offset = 210;

    return _offset;
}

// تحديد موقع الـ background مع الـ parallax
function setParallaxPosition($doc, multiplier, $object) {
    var offset = getOffSet();
    var from_top = $doc.scrollTop();
    var bg_css = 'center ' + (multiplier * from_top - offset) + 'px';
    $object.css({ "background-position": bg_css });
}

// ==========================
// Parallax Functions
// ==========================

// Parallax عام
var background_image_parallax = function($object, multiplier, forceSet) {
    multiplier = typeof multiplier !== 'undefined' ? multiplier : 0.5;
    multiplier = 1 - multiplier;
    var $doc = $(document);

    if (forceSet) {
        setParallaxPosition($doc, multiplier, $object);
    } else {
        $(window).scroll(function() {
            setParallaxPosition($doc, multiplier, $object);
        });
    }
};

// Parallax خاص لعناصر معينة (Contact & Testimonials)
var background_image_parallax_2 = function($object, multiplier) {
    multiplier = typeof multiplier !== 'undefined' ? multiplier : 0.5;
    multiplier = 1 - multiplier;
    var $doc = $(document);

    $object.css({ "background-attachment": "fixed" });

    $(window).scroll(function() {
        if ($(window).width() > 768) {
            var firstTop = $object.offset().top,
                pos = $(window).scrollTop(),
                yPos = Math.round((multiplier * (firstTop - pos)) - 186),
                bg_css = 'center ' + yPos + 'px';
            $object.css({ "background-position": bg_css });
        } else {
            $object.css({ "background-position": "center" });
        }
    });
};

// ==========================
// Document Ready
// ==========================
$(function() {

    // Hero Section - Background Parallax
    background_image_parallax($(".tm-parallax"), 0.30, false);
    background_image_parallax_2($("#contact"), 0.80);
    background_image_parallax_2($("#testimonials"), 0.80);

    // Handle window resize
    window.addEventListener('resize', function() {
        background_image_parallax($(".tm-parallax"), 0.30, true);
    }, true);

    // ==========================
    // Navbar Scroll & Mobile Menu
    // ==========================

    $(window).scroll(function() {
        if ($(document).scrollTop() > 120) {
            $('.tm-navbar').addClass("scroll");
        } else {
            $('.tm-navbar').removeClass("scroll");
        }
    });

    // Close mobile menu after click
    $('#tmNav a').on('click', function() {
        $('.navbar-collapse').removeClass('show');
    });

    // ==========================
    // Smooth Scroll
    // ==========================
    $('#tmNav').singlePageNav({
    'filter': ':not([href="/products/html/products.html"])',
    'easing': 'easeInOutExpo',
    'speed': 600
});

    $("a").on('click', function(event) {
    // استثناء رابط المنتجات
    if ($(this).attr('href') === "/products/html/products.html") return true;

    if (this.hash !== "") {
        event.preventDefault();
        var hash = this.hash;
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 600, 'easeInOutExpo', function() {
            window.location.hash = hash;
        });
    }
});


    // ==========================
    // Magnific Popup - Gallery
    // ==========================
    $('.tm-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery: { enabled: true }
    });

    // ==========================
    // Slick Carousel - Testimonials
    // ==========================
    $('.tm-testimonials-carousel').slick({
        dots: true,
        prevArrow: false,
        nextArrow: false,
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 992, settings: { slidesToShow: 2 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } }
        ]
    });

    // ==========================
    // Slick Carousel - Gallery
    // ==========================
    $('.tm-gallery').slick({
        dots: true,
        infinite: false,
        slidesToShow: 5,
        slidesToScroll: 2,
        responsive: [
            { breakpoint: 1199, settings: { slidesToShow: 4, slidesToScroll: 2 } },
            { breakpoint: 991, settings: { slidesToShow: 3, slidesToScroll: 2 } },
            { breakpoint: 767, settings: { slidesToShow: 2, slidesToScroll: 1 } },
            { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } }
        ]
    });

});
