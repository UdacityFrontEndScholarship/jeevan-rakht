// Particles JS Initialization
particlesJS.load("particles-js", "assets/js/particlesjs-config.json");

// Bootstrap Date-Picker
$(document).ready(function() {
    var selectDate = $('#when');
    var contain = $('.wrapper');
    var options = {
        format: 'dd/mm/yyyy',
        container: contain,
        todayHighlight: true,
        autoclose: false
      };

      selectDate.datepicker(options);
});