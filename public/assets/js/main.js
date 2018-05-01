// This is our Main JS file.
// Please modify as and when required.
// alert('works');
let didScroll = false,
    lastScrollPosition = 0,
    delta = 2,
    nav = $('.navbar');
var trigger = $('.hamburger'),
    overlay = $('.overlay'),
    isClosed = false;
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

    if (currentScroll > lastScrollPosition && currentScroll > nav.outerHeight()) {
        //When user scrolls down, hide navbar
        $('nav')[0].style.top =  ('-' + nav.outerHeight() + 'px');
    } else {
        //When user scrolls up, show navbar
        if (currentScroll + $(window).height() < $(document).height()) {
          $('nav')[0].style.top = '0px';
        }
    }
    lastScrollPosition = currentScroll;
}


trigger.click(function () {
  $('#wrapper').toggleClass('toggled');
  $('#wrapper.toggled #sidebar-wrapper').css('top', nav.outerHeight());
  if (isClosed == true) {
    overlay.hide();
    trigger.removeClass('is-open');
    trigger.addClass('is-closed');
    isClosed = false;
    //Enable scrolling
    //$('body')[0].style.overflowY = 'auto';
    //$('body')[0].style.position = 'static';
    $('body')[0].style.height = '';
    //$('html')[0].style.height = '';
    //$('body')[0].style.width = '';
  } else  {
      overlay.show();
      trigger.removeClass('is-closed');
      trigger.addClass('is-open');
      isClosed = true;
      //Disable scrolling
      //$('body')[0].style.overflowY = 'scroll';
      //$('body')[0].style.position = 'fixed';
      $('body')[0].style.height = '100%';
      //$('html')[0].style.height = '100%';
      //$('body')[0].style.width = '100%';
    }
});


/* Vertical auto scrolling list */

ScrollRate = 40;

function scrollDiv_init() {
    DivElmnt = document.getElementById('MyDivName');
    ReachedMaxScroll = false;
    
    DivElmnt.scrollTop = 0;
    PreviousScrollTop  = 0;
    
    ScrollInterval = setInterval('scrollDiv()', ScrollRate);
}

function scrollDiv() {
    
    if (!ReachedMaxScroll) {
        DivElmnt.scrollTop = PreviousScrollTop;
        PreviousScrollTop++;
        
        ReachedMaxScroll = DivElmnt.scrollTop >= (DivElmnt.scrollHeight-DivElmnt.offsetHeight);
    }
    else {
        ReachedMaxScroll = (DivElmnt.scrollTop == 0)?false:true;
        DivElmnt.scrollTop = 0;
        PreviousScrollTop  = 0;
    }
}

function pauseDiv() {
    clearInterval(ScrollInterval);
}

function resumeDiv() {
    PreviousScrollTop = DivElmnt.scrollTop;
    ScrollInterval    = setInterval('scrollDiv()', ScrollRate);
}
