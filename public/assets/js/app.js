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
		else if(checkName('Last Name',lname)==false) flag = true;
		else if(validatePass(pass,veriPass)==false) flag = true;
	}
	if (radioButtonCheck == 'Non-Individual') {
		var orgname = $('#orgname').val();
		var license = $('#license').val();
		if(checkName('Organization Name',orgname)==false) flag = true;
		else if(checkLength('License Nanme',license,3)==false) flag = true;
		else if(validatePass(pass,veriPass)==false) flag = true;
	}
	//regular expression to chceck if the password contains uppercase and lowercase letters
	if(flag) event.preventDefault();
});

//function to check if the format of an input date is DD/MM/YYYY
function checkDate(field,val){
	val = val.trim();
	let regex = /^(0?[1-9]|1\d|2\d|3[01])\/(0?[1-9]|1[0-2])\/(19|20)\d{2}$/;
	if(regex.test(val)){
		return true;
	}else{
		alert(field +' format should be dd/mm/yyyy.');
		return false;
	}
}

//function to check if fname/lname are valid by checking their length and checking if they contain a number
function checkName(field,val){
	return checkLength(field,val,3)&&checkNumber(field,val);
}

//function to check if the input contains any numbers
function checkNumber(field,val){
	let regex = /[0-9]/;
	if(regex.test(val)){
		alert(field +' should not contain any numbers!');
		return false;
	}else return true;
}

//function to check if the length of an input if greater than len characters
function checkLength(field,val,len){
	val = val.trim();
	if(val.length<len){
		alert(field +" must contain minimum " +len+" characters");
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
  var city = $('form input[name=bookcity]').val();
  let bookdate = $('form input[name=bookdate]').val();	
  if(checkAlphaSpaces('City',city)==false) flag = true;
  else if(checkDate('Booking date',bookdate)==false) flag = true;
  if(flag) event.preventDefault();
});

//function to check if the field is filled or not if it's required
function checkRequired(field,val){
	val = val.trim();
	if(val.length==0){
		alert(field +' is required!');
		return false;
	}else return true;
}

//function to check if the first character of an input is a special character, returns false if the first character is a special character
function checkSpecial(field,val){
	val = val.trim();
	//regex to check if the first character is an alphanumeric
	let regex = /^[A-Za-z0-9]/;
	if(!regex.test(val)){
		alert(field +"'s first character should be an alphanumberic character, not a special character!");
		return false;
	}else return true;
}

//function to check if the input contains only alphabets and spaces
function checkAlphaSpaces(field,val){
	val = val.trim();
	//regex to check for characters other than alphabets and spaces
	let regex = /^[a-zA-Z]+[a-zA-Z ]+$/;
	if(!val){
		alert(field +' is required!');
		return false;
	}else if(val.length<2){
		alert(field +' must contain minimum two alphabets!');
		return false;
	}else if(!regex.test(val)){
		alert(field +' must contain only alphabets and spaces!');
		return false;
	}else return true;
}

//function to validate pincode i.e if it's a 6 digit numerical value
function checkPincode(val){
	val = val.trim();
	if(val.length!==6 || isNaN(val)){
		alert('Pincode must be a six digit number!');
		return false;
	}else return true;
}

$('#profile-update').on('click',function(event){
	//flag to decide whether to submit the form or not
	let flag = false;
	//getting elements of all the inputs
	let orgname = $('form input[name=orgname]');
	let fname = $('form input[name=firstname]');	
	let addr1 = $('form input[name=address1]');
	let addr2 = $('form input[name=address2]');
	let city = $('form input[name=city]');
	let state = $('form input[name=state]');
	let pincode = $('form input[name=zip]');
	let radioButtonCheck = $('form input[type=radio]:checked').val();

	//if-else condition to check if the current form is for an organization or an individual based on if the form contains element 'orgname' or 'firstname'
	if(jQuery.contains(document,orgname[0])){
		let license = $('form input[name=license]');
		if(checkName('Organization Name',orgname.val())==false) flag = true;
		else if(checkLength('License Name',license.val(),3)==false) flag =true;
	}else{
		let lname = $('form input[name=lastname]');
		let bg = $('form select[name=bloodgroup] :selected');
		let gen = $('form select[name=gender] :selected');
		let last_donation = $('form input[name=last_donation]');	
		if(checkName('First Name',fname.val())==false) flag = true;
		else if(checkName('Last Name',lname.val())==false) flag = true;
		//blocks to check if the user has selected blood group and gender from the select dropdown
		else if(bg.text()==='Blood group'){
			alert('Please select Blood Group!');
			flag = true;
		}
		else if(gen.text()==='select gender'){
			alert('Please select gender!');
			flag = true;
		}
		else if(checkDate('Last Donation date',last_donation.val())==false) flag = true;
	}
	console.log("flag: "+ flag);
	//if the add/edit address radio is checked then only check for the input fields otherwise the fields will be filled automatically using Use My Location radio
	if(radioButtonCheck==='userinput'){
		if(checkRequired('Address Line 1',addr1.val())==false || checkSpecial('Address Line 1',addr1.val())==false) flag = true;
		else if(checkRequired('Address Line 2',addr2.val())==false || checkSpecial('Address Line 2',addr2.val())==false) flag = true;
		else if(checkAlphaSpaces('City',city.val())==false) flag = true;
		else if(checkAlphaSpaces('State',state.val())==false) flag = true;
		//check for pincode validity only if the pincode is filled since it's not required
		else if(pincode.val().length!==0 && checkPincode(pincode.val())==false) flag = true;
	}

	if(flag) event.preventDefault();
});