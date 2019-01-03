// jQuery snippet for changing HTML from into JSON
(function ($) {
    $.fn.serializeFormJSON = function () {

        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
})(jQuery);


function updateBalance() {
  // Data from Google Spreadsheets for Events
  $(".js-number-loading").show();
  $(".js-number").hide();

  $.get("https://sheetsu.com/apis/33ede6bf", function(data) {
    var dataArray = data.result;
    var balance = dataArray[0].bal;
    console.log(balance);
    $(".js-number").html(balance);
    $(".js-number").show();
    $(".js-number-loading").hide();
  });
}


$(document).ready(function(){

  // Focus on vendor input
  $('.form__field--vendor input').focus();

  // Date
  var today = new Date();
  var formattedToday = (today.getMonth()+1) + '/' + today.getDate() + '/' + today.getFullYear();
  console.log(formattedToday);
  $(".js-date").prop('value', formattedToday);


  updateBalance();


  $('.js-form').submit(function(e) {
    // prevent default submiting form
    e.preventDefault();

    // disable submit button
    $(".js-submit").prop({
      disabled: true,
      value: 'Adding...'
    });

    $(".js-number-loading").show();
    $(".js-number").hide();

    // serialize data to JSON
	  var data = $('.js-form').serializeFormJSON();

    $.ajax({
       	url: 'https://sheetsu.com/apis/33ede6bf',
       	data: data,
        dataType: 'json',
        type: 'POST',

        // place for handling successful response
        // showing (redirecting to) something like /thanks.html
        //page could be a good idea
        success: function(data) {
    	   	console.log(data);
          updateBalance();
          $(".js-vendor").prop({
            value: ''
          });
          $(".js-amount").prop({
            value: ''
          });
          $(".js-submit").prop({
            disabled: false,
            value: 'Add Receipt'
          });
          $('.form__field--vendor input').focus();
        },

        // handling error response
        error: function(data) {
        	console.log(data);
        }
    });

    return false;
  });

});
