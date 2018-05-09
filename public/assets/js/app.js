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
    maxDate: 'today'
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

//function to validate signup form inputs
$('#signup-submit').on('click',function (event){
	//flag to decide whether to submit the form or not
	let flag = false;
	var radioButtonCheck = $('form input[type=radio]:checked').val();
	//trim the inputs for leading and trailing whitespaces
	var pass = $('#password').val();
	var veriPass = $('#verify').val();
	if (radioButtonCheck == 'Individual') {
		var fname = $('#fname').val();
		var lname = $('#lname').val();
		if(checkName('First Name',fname)==false) flag = true;
		if(checkName('Last Name',lname)==false) flag = true;;
	}
	if (radioButtonCheck == 'Non-Individual') {
		var orgname = $('#orgname').val();
		var license = $('#license').val();
		if(checkName('Organization Name',orgname)==false) flag = true;
		if(checkLength('License Nanme',license)==false) flag = true;
	}
	//regular expression to chceck if the password contains uppercase and lowercase letters
	if(validatePass(pass,veriPass)==false) flag = true;
	if(flag) event.preventDefault();
});

//function to check if fname/lname are valid by checking their length and checking if they contain a number
function checkName(field,val){
	return checkLength(field,val)&&checkNumber(field,val);
}

//function to check if the input contains any numbers
function checkNumber(field,val){
	let regex = /[0-9]/;
	if(regex.test(val)){
		alert(field +' should not contain any numbers!');
		return false;
	}else return true;
}

//function to check if the length of an input if greater than 3 characters
function checkLength(field,val){
	val = val.trim();
	if(val.length<3){
		alert(field +" must contain minimum 3 characters");
		return false;
	}else return true;
}

//function to validate password, takes the arguments original password, and confirm password
function validatePass(pass,veriPass){
	console.log('validating pass');
	let regex = /^(?=.*[a-z])(?=.*[A-Z])/;
	if (!regex.test(pass) || pass.length < 6) {
		alert('Password must contain one capital & one small letter with total six chars minimum');
		return false;
	}
	if (pass !== veriPass) {
		alert('Passwords do not match!');
		return false;
	}
	return true;
}

//function to validate city name in the donate form
$('#donate-submit').on('click',function (event){
  //flag to decide whether to submit the form or not
  let flag = false;
  var city = $('form input[name=bookcity]').val().trim();
  //regular experssion to check for charecters other than uppercase/lowercase letters and space
  var regex = /[^a-zA-z\s]/;
  if (regex.test(city)) {
	alert('city must contain only alphabets and spaces!');
	flag = true;
  }
  if(flag) event.preventDefault();
});