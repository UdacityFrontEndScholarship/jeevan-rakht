// This is our Main JS file.
// Please modify as and when required.
// alert('works');
let didScroll= false;
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
// TODO: Set didScroll to true when user scrolls
$(window).scroll(function (e) {
    didScroll = true;
});
// TODO: Check if the user scrolled every 250ms
setInterval(checkScrolled, 250);

function checkScrolled() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}

function hasScrolled() {
    let currentScroll = $(this).scrollTop();
    // Make sure to fire only when the user scrolls more than delta
    if (Math.abs(lastScrollPosition - currentScroll) <= delta)
        return;

    // TODO: When user scrolls down, hide navbar
    // TODO: When user scrolls up, show navbar
    if (currentScroll > lastScrollPosition && currentScroll > navHeight) {
        // scroll down
        nav.addClass('hide-nav');
    } else {
        // scroll up
        // if user has not scrolled past document which is possible for mac users
        if (currentScroll + $(window).height() < $(document).height()) {
            nav.removeClass('hide-nav');
        }
    }
    lastScrollPosition = currentScroll;

}
