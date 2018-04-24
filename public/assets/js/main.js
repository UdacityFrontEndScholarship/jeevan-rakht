// This is our Main JS file.
// Please modify as and when required.
// alert('works');
let didScroll = false;
let lastScrollPosition = 0;
let delta = 2;
let nav = $('.navbar');
let navHeight = nav.outerHeight();
// Select the navbar item list div
const drawer = $('.collapse');
/**
 *@Event_Listener: It collapses the menu item on click of
 *                   anywhere outside menu area.
 */
$(window).on('click', function (e) {
    if (drawer.hasClass("show")) {
        drawer.removeClass('show');
        $('.navbar-toggler').addClass('collapsed');
        e.stopPropagation();
    }
});

//Set didScroll to true when user scrolls
$(window).scroll(function (e) {
    didScroll = true;
});

//Check if the user scrolled every 250ms
setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);


function hasScrolled() {
    let currentScroll = $(this).scrollTop();
    // Make sure to fire only when the user scrolls more than delta
    if (Math.abs(lastScrollPosition - currentScroll) <= delta)
        return;

    if (currentScroll > lastScrollPosition && currentScroll > navHeight) {
        //When user scrolls down, hide navbar
        $('nav')[0].style.top =  ('-' + $('nav').outerHeight() + 'px');
    } else {
        //When user scrolls up, show navbar
        if (currentScroll + $(window).height() < $(document).height()) {
          $('nav')[0].style.top = '0px';
        }
    }
    lastScrollPosition = currentScroll;

}


$(document).ready(function () {
    var trigger = $('.hamburger'),
        overlay = $('.overlay'),
        isClosed = false;

    trigger.click(function () {
        hamburger_cross();
    });

    function hamburger_cross() {

        if (isClosed == true) {
            overlay.hide();
            trigger.removeClass('is-open');
            trigger.addClass('is-closed');
            isClosed = false;
        } else {
            overlay.show();
            trigger.removeClass('is-closed');
            trigger.addClass('is-open');
            isClosed = true;
        }
    }

    $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
    });
});
