(function ($) {
    "use strict";
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Date and time picker
    $('.date').datetimepicker({
        format: 'L'
    });
    $('.time').datetimepicker({
        format: 'LT'
    });

    /*Regular tour pack carousel*/
    $('.tour-pack-carousel').owlCarousel({
        loop: false,
        margin:30,
        nav: true,
        dots: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        },
        navText: [
            '<div class="btn"><span class="fa fa-chevron-left display-4"></span></div>',
            '<div class="btn"><span class="fa fa-chevron-right display-4"></span></div>'        
        ],
        navContainer: '.pack-custom-nav',
    });


    $('.tour-pack-carousel-promo').owlCarousel({
      loop: false,
      margin:30,
      nav: true,
      dots: false,
      responsive: {
          0: {
              items: 1
          },
          600: {
              items: 2
          },
          1000: {
              items: 3
          }
      },
      navText: [
          '<div class="btn"><span class="fa fa-chevron-left display-4"></span></div>',
          '<div class="btn"><span class="fa fa-chevron-right display-4"></span></div>'        
      ],
      navContainer: '.pack-custom-nav-promo',
  });

    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        margin: 30,
        dots: true,
        loop: true,
        center: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }    
        }
});


////////////////////////////Tour Detail calculate price/////////////////////////
    //travelers signing that add and subtract numbers of traveler
const minusButtons = document.querySelectorAll('.button-minus');
const plusButtons = document.querySelectorAll('.button-plus');
const quantities = document.querySelectorAll('.travelers-number');

minusButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    const quantity = quantities[index];
    quantity.value = Math.max(parseInt(quantity.value) - 1, 1);
  });
});

plusButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    const quantity = quantities[index];
    quantity.value = parseInt(quantity.value) + 1;
  });
});

//calculating price
function calprice() {
  var priceog = $('#price-og').text(); // get the text content of the element
  var priceognumber = parseFloat(priceog); // parse the text as a float
  var travelers = $('#travelers-number').val(); // get the value of the element
  var n1 = parseFloat(priceognumber);
  var n2 = parseFloat(travelers);
  $('#price-total').html("Total price: "+n1*n2); // set the HTML content of the element
  console.log(priceog);
  console.log(n1*n2);
}
$('.button-minus').click(calprice);
$('.button-plus').click(calprice);

})(jQuery);

////////////////////////////Loading and filtering the data into Tour-List/////////////////////////
var app = angular.module("packages", []); 
app.controller("myController", function($scope,$http)
    {
  $scope.package = [];

// load the data
$http.get('data/packages.json')
.then(function(response) {
  $scope.package = response.data;});

$scope.filterData = function(filterType, filterValue) {
  if ($scope[filterValue + 'Checked']) {
    $scope.filters[filterType] = filterValue;
  } else {
    $scope.filters[filterType] = '';
  }
};
$scope.filters = {
  destination: '',
  theme: ''
};
});

////////////////////////////Loading the data and Itinerary into Tour-Detail page/////////////////////////
var app = angular.module("tourdetail", []); 
app.controller("myController", function($scope,$http)
    {
  $scope.package = {};

// load the general info and itinerary
$http.get('data/tour-1.json')
.then(function(response) {
  // general info
  $scope.package = {
    "name": response.data["general-info"][0]["name"],
    "itishort": response.data["general-info"][0]["itishort"],
    "duration": response.data["general-info"][0]["duration"],
    "theme": response.data["general-info"][0]["theme"],
    "descriptionlong": response.data["general-info"][0]["description-long"],
    "price": response.data["general-info"][0]["price"]
    };  
  // load the Itinerary info
  $scope.itinerary = response.data["itinerary"];
  console.log($scope.itinerary);
});
});


////////////////////////////Payment page form check/////////////////////////
//select country
//***************GUIDE: RUN WITH LIVE SERVER******************//
$.getJSON('data/country-list.json', function(countries) {
// Generate the options for the select element
const select = $('#nationality');
$.each(countries, function(index, country) {
  const option = $('<option>', {
    value: country.code,
    text: country.name
  });
  select.append(option);
});
});

//select dial code
$.getJSON('data/dial-code.json', function(dialcodelist) {
    // Generate the options for the select element
    const select = $('#dial-code');
    $.each(dialcodelist, function(index, dialCode) {
      const option = $('<option>', {
        value: dialCode['dial-code'],
        text: `+${dialCode['dial-code']}`
      });
      select.append(option);
    });
});

/////////////////// first name & last name check
function checkfirstname() {
       var input = $('#first-name').val();
        if (input == ''){
            $('#error-first-name').html('Please enter your first name');
            return false;
        }
        else{
          $('#error-first-name').html('');
          $('button[type=submit]').prop('disabled', false); //enable submit button when value is validate
          return input; //return 1st name for later use
        }
};
$('#first-name').focusout(checkfirstname);

function checklastname(){
       input = $('#last-name').val();
        if (input == ''){
            $('#error-last-name').html('Please enter your last name');
        }
        else{
          $('#error-last-name').html('');
          $('button[type=submit]').prop('disabled', false); //enable submit button when value is validate
          return input; //return last name for later use
        }
};
$('#last-name').focusout(checklastname);

/////////////////// Email check
emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
function checkEmail() {
  email = $('#email').val();
  errorElement = $('#error-email');
  if (email === '') {
    errorElement.html('Please enter your email');
    return false;
  } else if (!emailReg.test(email)) {
    errorElement.html('Invalid email address');
    return false;
  } else {
    errorElement.html('');
    $('button[type=submit]').prop('disabled', false); //enable submit button when value is validate
    return true;
  }
};

//valid email check
$('#email').focusout(function() {
  var check = checkEmail();
  if (check == true){
    $('#confirm-email').focus()
  }
});

//confirm email check
function confirmemail(){
  var confirmEmail = $('#confirm-email').val();
  var email = $('#email').val();
  if (checkEmail(email, $('#error-email'))==true) {
    if (email !== confirmEmail) {
      $('#error-confirm-email').html('Email addresses do not match');
      return false;
    }
    else
    {
      $('#error-confirm-email').html('');
      $('button[type=submit]').prop('disabled', false); //enable submit button when value is validate
      return email; //return email for later use
    }
  }
};
$('#confirm-email').focusout(confirmemail);

/////////////////// Check age
function checkage(){
  var inputdob = $('#dob').val();
    var dob = new Date(inputdob);
    var today = new Date();
    var age = parseInt(today.getFullYear()) - parseInt(dob.getFullYear());
    var m = today.getMonth() - dob.getMonth();
    if (inputdob==''){
      $('#error-dob').html('Please provide your date of birth');
      return false;
    }
    if (Date.parse(dob) > Date.parse(today)){
      $('#error-dob').html('Invalid date');
      return false;
    }
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    if (parseInt(age) < 18) {
        $('#error-dob').html('Lead traveler must be 18 years old or above');
        return false;
    }
    else {
      $('#error-dob').html('');
      $('button[type=submit]').prop('disabled', false); //enable submit button when value is validate
      return age; //return age for later use
    }
};
$('#dob').on('input', checkage);

/////////////////// check nationality
function checknationality() {
  var input = $('#nationality').val();
   if (input == null){
       $('#error-nationality').html('Please enter your nationality');
       return false;
   }
   else{
     $('#error-nationality').html('');
     $('button[type=submit]').prop('disabled', false); //enable submit button when value is validate
     return input; //return 1st name for later use
   }
};
$('#nationality').focusout(checknationality);

/////////////////// check phone number
function checknumber(){
  var inputnumber = $('#contact-number').val();
  if (inputnumber=='') {
    $('#error-contact-number').html('Please enter your contact number');
    return false;
  }
  if (isNaN(inputnumber)==true) {
      $('#error-contact-number').html('Invalid number format');
      return false;
  }
  else {
    $('#error-contact-number').html('');
    $('button[type=submit]').prop('disabled', false); //enable submit button when value is validate
    return inputnumber; //return phone number for later use
  }
};
$('#contact-number').focusout(checknumber);

/////////////////// check card name
function checkcardname() {
  var cardname = $('#card-name').val();
  if (cardname =='') {
      $('#error-card-name').html('Please fill in your card name');
      return false;
  }
  else {
    $('#error-card-name').html('');
    $('button[type=submit]').prop('disabled', false); //enable submit button when value is validate
    return cardname; //return card name for later use
  }
};
$('#card-name').focusout(checkcardname);

/////////////////// check card number
function checkcardnumber(){
  var cardnumber = $('#card-number').val();
  if (cardnumber =='') {
      $('#error-card-number').html('Please fill in your card number');
      return false;
  }
  else {
    $('#error-card-number').html('');
    $('button[type=submit]').prop('disabled', false); //enable submit button when value is validate
    return cardnumber; //return cardnumber for later use
  }
};
$('#card-number').focusout(checkcardnumber);

/////////////////// check card expiry
function checkexpdate(){
  var expdate = $('#exp-date').val();
  if (expdate == '') {
      $('#error-card-exp').html('Please fill in your card expiry date');
      return false;
  }
  else {
    $('#error-card-exp').html('');
    $('button[type=submit]').prop('disabled', false); //enable submit button when value is validate
    return expdate; //return expdate for later use
  }
};
$('#exp-date').focusout(checkexpdate);

/////////////////// promo code check
// promo code activate-deactivate
$(document).ready(function () {
  var checkbox = $('#promo-check');
  var promo = $('#promo-code');
  var applybtn = $('#apply-code');
  promo.prop('disabled', true);
  applybtn.prop('disabled', true);
  $(checkbox).click(function(){
      promo.val('');//clear the input whenever the checkbox is checked
      if(checkbox.prop('checked') === false){
        $('#error-promo').html('');
        promo.prop('disabled', true);
        applybtn.prop('disabled', true);
        $('#promo-price').html('');
        $('#og-price-text').css('text-decoration', 'none');
      }
      else if (checkbox.prop('checked') === true){
        promo.prop('disabled', false);
        applybtn.prop('disabled', false); 
        $('#promo-code').focus();
      } 
  })
});

//code check
function codecheck(){
  var codeinput = $('#promo-code').val();
  if (codeinput == ''){
    $('#error-promo').html('Please enter your promotion code');
    return false;
  }
  else if (isNaN(codeinput)==true) {
    $('#error-promo').html('Code invalid');
    return false;
  }
  else{
    $('#error-promo').html('');
    return codeinput; //return code input to calculate price
  }
};

//code apply
function promopricecalc(){
  codecheck();
  var downrate = codecheck();
  var priceog = parseFloat($('#og-price').text());
  var promoprice;
  if (codecheck() !== false){ //if codecheck not false (return the codeinput value)
    promoprice = priceog - priceog*(parseFloat(downrate)*1/100);
    return promoprice;
  }
};

function changeprice(){
  var checkbox = $('#promo-check');
  var promoprice = promopricecalc()
  if(checkbox.prop('checked') === true){
  $('#promo-price').html('US$'+promoprice);
  $('#og-price-text').css('text-decoration', 'line-through');
  }
}

$('#apply-code').click(function() {
  promopricecalc();
  changeprice();
});

//Terms and conditions check
function checktermscond(){
  if($('#termscond').prop('checked') === true){
    $('button[type=submit]').prop('disabled', false); //enable submit button when value is validate
    return true;
    }
    else{
      $('#error-termscond').html('Terms & conditions must be accepted for payment to proceed');
    return false;
    }
};
$('#termscond').click(checktermscond)


/////////////////// Check all form when click pay now
$('#paynow').click(function () {
  if (checkfirstname()==false) {
    $('#first-name').focus();
    $('#paynow').prop('disabled', true);
    return;
  }
  if (checklastname()==false) {
    $('#last-name').focus();
    $('#paynow').prop('disabled', true);
    return;
  }
  if (checkEmail()==false) {
    $('#email').focus();
    $('#paynow').prop('disabled', true);
    return;
  }
  if (confirmemail()==false) {
    $('#confirm-emai').focus();
    $('#paynow').prop('disabled', true);
    return;
  }
  if (checkage()==false) {
    $('#dob').focus();
    $('#paynow').prop('disabled', true);
    return;
  }
  if (checknationality()==false) {
    $('#nationality').focus();
    $('#paynow').prop('disabled', true);
    return;
  }
  if (checknumber()==false) {
    $('#contact-number').focus();
    $('#paynow').prop('disabled', true);
    return;
  }
  if (checkcardname()==false) {
    $('#card-name').focus();
    $('#paynow').prop('disabled', true);
    return;
  }
  if (checkcardnumber()==false) {
    $('#card-number').focus();
    $('#paynow').prop('disabled', true);
    return;
  }
  if (checkexpdate()==false) {
    $('#exp-date').focus();
    $('#paynow').prop('disabled', true);
    return;
  }
  if(checktermscond() === false){
    $('#termscond').focus();
    $('#paynow').prop('disabled', true);
    return;
  }
});


////////////////////////////Form personalisation page form check/////////////////////////

// First + last name, Email, Date of birth, Nationality check function taken from Payment form

/////////////////// Number of travelers check
function checktravelers() {
  var input = $('#travelers').val();
   if (input == ''){
       $('#error-travelers').html('Please enter number of travelers in the trip');
       return false;
   }
   else{
     $('#error-travelers').html('');
     $('button[type=submit]').prop('disabled', false); //enable submit button when value is validated
     return input; //return 1st name for later use
   }
};
$('#travelers').focusout(checktravelers);

/////////////////// Number of children check
function checkchildren() {
  var input = $('#children').val();
   if (input == ''){
       $('#error-children').html('Please indicate the number of children in the trip');
       return false;
   }
   else{
     $('#error-children').html('');
     $('button[type=submit]').prop('disabled', false); //enable submit button when value is validated
     return input; //return 1st name for later use
   }
};
$('#children').focusout(checkchildren);


/////////////////// Check Start & End date
function checkdate(dateID,errorID){ //check function that takes IDs as arguments
  var inputdate = $(dateID).val();
  var error = $(errorID);
  var errordate = dateID.replace(/-/g, " ").substring(1);
  var date = new Date(inputdate);
  var today = new Date();
  if (inputdate==''){
    error.html('Please pick a desired '+errordate);
    return false;
  }
  if (Date.parse(date) < Date.parse(today)){
    error.html('Can\'t pick date from the past or at the day of registration');
    return false;
  }
  else {
    error.html('');
    $('button[type=submit]').prop('disabled', false); //enable submit button when value is validated
    return date; //return date to compare 
  }
};

function comparedate() {
  start = checkdate('#start-date','#error-start')
  end = checkdate('#end-date','#error-end')
  if (end == '' || start ==''){
    return false; //if one of two dates haven't set => Not compare and check the date instead
  }
  else if (Date.parse(end) < Date.parse(start)){
    $('#error-end').html('End date must be set behind start date');
    return false; //once it's set => run comparison 
  }
}

$('#start-date').on('input', function(){checkdate('#start-date','#error-start');});
$('#end-date').on('input', function(){checkdate('#end-date','#error-end');});
$('#end-date').on('input', comparedate); //compare when end date is set

/////////////////// Check Travel Style
function checktravelstyle() {
  var input = $('#travel-style').val();
  var error = $('#error-travel-style')
   if (input == null){
    error.html('Please select your travel style');
    return false;
   }
   else{
    error.html('');
    $('button[type=submit]').prop('disabled', false); //enable submit button when value is validated
    return input; //return value
   }
};
$('#travel-style').focusout(checktravelstyle);

/////////////////// Check Accomodation
function checkaccomodation() {
  var input = $('#accomodation').val();
  var error = $('#error-accomodation')
   if (input == null){
    error.html('Please select your accomodation');
    return false;
   }
   else{
    error.html('');
    $('button[type=submit]').prop('disabled', false); //enable submit button when value is validated
    return input; //return value
   }
};
$('#accomodation').focusout(checkaccomodation);

/////////////////// Check country of destination
function checkdestination() {
  var input = $('#destination').val();
  var error = $('#error-destination')
   if (input == null){
    error.html('Please select your country of attration');
    return false;
   }
   else{
    error.html('');
    $('button[type=submit]').prop('disabled', false); //enable submit button when value is validated
    return input; //return value
   }
};
$('#destination').focusout(checkdestination);

/////////////////// Check tourist guide
function checkguide() {
  var input = $('input[name="guide"]:checked').val();
  var error = $('#error-guide')
   if (input == undefined){
    error.html('Please indicate your option');
    return false;
   }
   else{
    error.html('');
    $('button[type=submit]').prop('disabled', false); //enable submit button when value is validated
    return input; //return value
   }
};
$('#guide').on('change',checkguide);

$('#submit-perso').click(function () {
  // These functions below were reused from payment page
  if (checkfirstname()==false) {
    $('#first-name').focus();
    $('#submit-perso').prop('disabled', true);
    return;
  }
  if (checklastname()==false) {
    $('#last-name').focus();
    $('#submit-perso').prop('disabled', true);
    return;
  }
  if (checkEmail()==false) {
    $('#email').focus();
    $('#submit-perso').prop('disabled', true);
    return;
  }

  if (confirmemail()==false) {
    $('#confirm-emai').focus();
    $('#submit-perso').prop('disabled', true);
    return;
  }
  if (checkage()==false) {
    $('#dob').focus();
    $('#submit-perso').prop('disabled', true);
    return;
  }
  if (checknationality()==false) {
    $('#nationality').focus();
    $('#submit-perso').prop('disabled', true);
    return;
  }
  if (checknumber()==false) {
    $('#contact-number').focus();
    $('#submit-perso').prop('disabled', true);
    return;
  }
  // New functions
  if (comparedate()==false) {
    $('#end-date').focus();
    $('#submit-perso').prop('disabled', true);
    return;
  }
  if (checktravelers()==false) {
    $('#travelers').focus();
    $('#submit-perso').prop('disabled', true);
    return;
  }
  if (checkchildren()==false) {
    $('#children').focus();
    $('#submit-perso').prop('disabled', true);
    return;
  }
  if (checktravelstyle()==false) {
    $('#travel-style').focus();
    $('#submit-perso').prop('disabled', true);
    return;
  }
  if (checkaccomodation()==false) {
    $('#accomodation').focus();
    $('#submit-perso').prop('disabled', true);
    return;
  }
  if (checkaccomodation()==false) {
    $('#accomodation').focus();
    $('#submit-perso').prop('disabled', true);
    return;
  }
  if (checkdestination()==false) {
    $('#destination').focus();
    $('#submit-perso').prop('disabled', true);
    return;
  }
  if (checkguide()==false) {
    $('#submit-perso').prop('disabled', true);
    return;
  }
});

////////////////////////////Contact page form check/////////////////////////
function checkmessagecontent() {
  var input = $('#message-content').val();
        if (input == ''){
            $('#error-message-content').html('Your message needs content');
            return false;
        }
        else{
          $('#error-message-content').html('');
          $('button[type=submit]').prop('disabled', false); //enable submit button when value is validate
          return input; //return 1st name for later use
        }
}
$('#message-content').focusout(checkmessagecontent);

$('#submit-message').click(function () {
  // These functions below were reused from payment page
  if (checkfirstname()==false) {
    $('#first-name').focus();
    $('#submit-message').prop('disabled', true);
    return;
  }
  if (checklastname()==false) {
    $('#last-name').focus();
    $('#submit-message').prop('disabled', true);
    return;
  }
  if (checkEmail()==false) {
    $('#email').focus();
    $('#submit-message').prop('disabled', true);
    return;
  }
  if (checkmessagecontent()==false) {
    $('#message-content').focus();
    $('#submit-message').prop('disabled', true);
    return;
  }
});





