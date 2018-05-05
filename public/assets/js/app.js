// Particles JS Initialization
particlesJS.load("particles-js", "assets/js/particlesjs-config.json");

// Drop-down Menu
$(".profile-btn").click((e) => {
    e.preventDefault();
    $(".drop-menu").toggleClass('drop-menu-active');
}).blur(() => {
    $(".drop-menu").removeClass('drop-menu-active');
});

// Location Auto Suggestion
const samplePlaces = ['New Delhi', 'Mumbai', 'Madurai', 'Kolkata', 'Hyderabad', 'Bengaluru', 'Kochi', 'Chandigarh', 'Jaipur',  'Chennai', 'Dispur', 'Ahmedabad', 'Pune', 'Surat', 'Tirupathi', 'Patna', 'Jharkhand', 'Goa', 'Thiruvananthapuram', 'Indore', 'Lucknow', 'Bhubaneswar', 'Kanpur', 'Bhopal', 'West Godavari', 'Vadodara', 'Udipi', 'Faridabad', 'Rajkot', 'Agra', 'Vizag', 'Ernakulam', 'Yamuna Nagar', 'Quadian', 'Quthbullapur', 'Zahirabad'];

$('.typeahead').typeahead({
    source: samplePlaces
});

// Flatpickr  Initialization
$(".input-when").flatpickr({
    dateFormat: 'd/m/Y',
    minDate: 'today'
});

/*
    * Fixing date input field placeholder issue (mobile)
    * This code to has to be checked with ".input-when[type="date"]:not(:focus):before" selector in CSS file
*/
$(".input-when[type=date]").blur(function() {
    if ($(this).val()) {
        $(this).attr('placeholder', '');
    } else {
        $(this).attr('placeholder', 'When');
    }
});
// 
$(".input-donation-date").flatpickr({
    dateFormat: 'd/m/Y',
});

$(".input-donation-date[type=date]").blur(function() {
    if ($(this).val()) {
        $(this).attr('placeholder', '');
    } else {
        $(this).attr('placeholder', 'Last Donation Date');
    }
});

// Fixing select placeholder issue
$("select.empty").change(function() {
    $(this).removeClass('empty');
})
