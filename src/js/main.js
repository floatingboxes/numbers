$(document).ready(function(){

  // Data from Google Spreadsheets for Events
  $.get("https://gridspree.io/ss/AxznvuNqkuT4it53fVoGRP", function(data) {
    console.log(data.rows[0].Bal);
    $(".js-number").append(data.rows[0].Bal);
  });
});


