$(document).ready(function() {
// My pre-selected array of artists, all added artists will be pushed into this array
var musician = ['Tupac','Michael Jackson','Elvis Presley', 'Red Hot Chili Peppers', 'Linkin Park', 'Logic', 'Childish Gambino','Pink Floyd', 'Metallica','Bob Marley'];

// Displays all gif buttons
function displayGifButtons(){
    $("#gifButtonsView").empty(); 
// this erases whatever is in this div id so that it doesnt reproduce the results
    for (var i = 0; i < musician.length; i++){
        var gifButton = $("<button>");
        gifButton.addClass("artist");
        gifButton.addClass("btn btn-primary")
        gifButton.attr("data-name", musician[i]);
        gifButton.text(musician[i]);
        $("#gifButtonsView").append(gifButton);
    }
}
// Add a new artist button
function addNewButton(){
    $("#addGif").on("click", function(){
    var artist = $("#artist-input").val().trim();
    if (artist == ""){
      return false; 
// this is so the user can't add an empty button
    }
    musician.push(artist);

    displayGifButtons();
    return false;
    });
}
// currently removes all of the added artist buttons
function removeLastButton(){
    $("removeGif").on("click", function(){
    musician.pop(artist);
    displayGifButtons();
    return false;
    });
}
// Displays all of the gifs
function displayGifs(){
    var artist = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + artist + "&api_key=dc6zaTOxFJmzC&limit=10";
    console.log(queryURL); 
// displays the url with the added artist in the console
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .done(function(response) {
        //console.log(response);
        $("#gifsView").empty(); 
// erases gifs in the div id so that it can display the new ones
        var results = response.data; 
//shows results of gifs
        if (results == ""){
          alert("No GIFs Available");
        }
        for (var i=0; i<results.length; i++){

            var gifDiv = $("<div>"); 
//gifs go in this div
            gifDiv.addClass("gifDiv");
// gif rating
            var gifRating = $("<p>").text("Rating: " + results[i].rating);
            gifDiv.append(gifRating);
// getting gif
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_small_still.url); 
// still image stored into src of image
            gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); 
// still image
            gifImage.attr("data-animate",results[i].images.fixed_height_small.url); 
// animated image
            gifImage.attr("data-state", "still"); 
// set the image state
            gifImage.addClass("image");
            gifDiv.append(gifImage);
// getting still image
// adding gifs to gifsView div
            $("#gifsView").prepend(gifDiv);
        }
    });
}
// calls functions and methods
displayGifButtons(); 
// displayed artist list
addNewButton();
removeLastButton();

// document event listeners (To start and stop the images)
$(document).on("click", ".artist", displayGifs);
$(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
});