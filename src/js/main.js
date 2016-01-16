$(document).ready(function(){

  // Focus on vendor input
  $('.form__field--vendor input').focus();

  // Date
  var today = new Date();
  var formattedToday = (today.getMonth()+1) + '/' + today.getDate() + '/' + today.getFullYear();
  console.log(formattedToday);
  $(".js-date").prop('value', formattedToday);


  // Data from Google Spreadsheets for Events
  $.get("https://sheetsu.com/apis/33ede6bf", function(data) {
    var dataArray = data.result;
    var balance = dataArray[0].bal;
    console.log(balance);
    $(".js-number").append(balance);
    $(".js-number-loading").remove();
  });


  $('.js-form').submit(function(e) {
    // Lock form submit
    $(this).find("input[type='submit']").prop({
      disabled: true,
      value: 'Adding...'
    });
  });

});
