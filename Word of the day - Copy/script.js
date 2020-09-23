"use strict"

//Resize to fit screen

function placeImage(w,h) {
  w = window.screen.availWidth;
  h = window.screen.availHeight;

  document.body.innerHTML +='<img src=' + '"https://images.unsplash.com/photo-1468971050039-be99497410af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2440&h=1440&q=100' + w + 'x' + h + '"' + ' id="bg" alt="">';

}


//Get date and place at the top  auto=format&fit=crop&w=1275&q=80

function getDate() {
  var monthNames = ['january', 'Februari', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'];
  var date = new Date();
  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

document.getElementById('date').innerHTML = monthNames[monthIndex] + ' '+ day + ' ' + year;
}

// Api Callback

function theWord(callback) {
  var baseUrl = "https://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=";
  var apiKey = "1380d58b8b5c33325130c0e8f340be6bc6fba6f7bb65bfc6f";
  var apiUrl = baseUrl + apiKey;

//A promise is needed here, as without it the second API call would return
//before pronounceIt() can execute the callback, and we would get, well, nothing, instead of the actual word.

    return new Promise(function(resolve, reject) {

      $.ajax({
          type: "GET",
          url: apiUrl,
          datatype: "json",
          success: function(data) {
            $("#word").append(data.word);
            $("#defin").append(data.definitions[0].text);
            resolve();
          }
      });
    });
}

// Api get pronounciatio

function pronounceIt() {
    var baseUrl = "https://api.wordnik.com/v4/word.json/"
    var apiKey = "1380d58b8b5c33325130c0e8f340be6bc6fba6f7bb65bfc6f";
    var word = $("#word").text();
    //var word = "test";
    var apiUrl = baseUrl + word + "/pronunciations?useCanonical=false&typeFormat=ahd&limit=50&api_key=" + apiKey;
    $("#link").attr("href", "http://www.dictionary.com/browse/" + word + "?s=t"); //link to dictionary.com page

    $.ajax({
        type: "GET",
        url: apiUrl,
        dataType: "json",
        success: function(data) {
            if (data.length > 0) {
              var input = data[0].raw;
              var output = "[" + input.slice(1,-1) + "]";
              $("#pronun").append(output);
              console.log(input);
            }
        }
    });
}

/****************************
* Fade in the image and text
*****************************/

$(document).ready(function(){
  placeImage();
  getDate();
  theWord().then(pronounceIt);
  $('img').css('opacity', 1);
  $('body').css('opacity', 1);
});

$('#favorites').click(function() {
  $('#fave-panel').addClass('hide');
})
