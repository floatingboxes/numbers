$(document).ready(function(){

  // Focus on vendor input
  $('.form__field--vendor input').focus();

  // Date
  var today = new Date();
  var formattedToday = (today.getMonth()+1) + '/' + today.getDate() + '/' + today.getFullYear();
  console.log(formattedToday);
  $(".js-date").prop('value', formattedToday);


  // Data from Google Spreadsheets for Events
  $.get("https://gridspree.io/ss/AxznvuNqkuT4it53fVoGRP", function(data) {
    console.log(data.rows[0].bal);
    $(".js-number").append(data.rows[0].bal);
    $(".js-number-loading").remove();
  });


  // Lock form submit
  $('.js-form').submit(function() {
    $(this).find("input[type='submit']").prop({
      disabled: true,
      value: 'Adding...'
    });
  });
});