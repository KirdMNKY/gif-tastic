/*
    GIF-tastic
   - Mike Soto -
*/

$(document).ready(function(){
    var gifArray = ["star wars", "lord of the rings", "avengers", "drizzt", "doctor who", "anime", "batman", "spiderman", "fallout", "assassins creed", "destiny", "zelda"];

    for(var i = 0; i < gifArray.length; i++){
        var newButton = $("<button>");
        newButton.attr("topic", gifArray[i].replace(" ", "+"));
        newButton.attr("type", "button");
        newButton.attr("class", "btn btn-primary gifBtn");
        newButton.text(gifArray[i]);
        $("#buttons").append(newButton);
    }

    

    $(document).on("click", ".gifBtn", function(){
        
        var topic = $(this).attr("topic");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=zn07MC8JXzOzvPzy4mJL67Dlrl3DWp1m&q=" + topic + "&limit=10";
        console.log(queryURL);
        // ajax call
        $.ajax({
            url: queryURL,
            method: "GET",
        })
        .then(function(response){
            //console.log(response);
            var results = response.data;

            for(var g = 0; g < results.length; g++){
                var gifDiv = $("<div class='item' id='myGif'>");

                var rating = results[g].rating;

                var p = $("<p>");
                p.attr("class", "rated");
                p.html("Rating: " + rating + "<span id=addFavs></span>");
                

                var topicImage = $("<img class='gif' id='myGifchosen'>");
                topicImage.attr("src", results[g].images.fixed_height_still.url);

                topicImage.attr("rated", rating);

                topicImage.attr("animate-url", results[g].images.fixed_height.url);
                topicImage.attr("still-url", results[g].images.fixed_height_still.url);
                topicImage.attr("data-state", "still");
                topicImage.attr("alt", results[g].title);
                topicImage.attr("faved", "no");
                
                gifDiv.attr("draggable", "true");

                gifDiv.prepend(p);
                gifDiv.prepend(topicImage);

                $("#gifs").prepend(gifDiv);
            }
        });
    });

    $(document).on("click", ".gif", function(){
        var state = $(this).attr("data-state");
        var rated = $(this).attr("rating");

        if(state === "still"){
            $(this).attr("src", $(this).attr("animate-url"));
            $(this).attr("data-state", "animate");
            // $("#addFavs").text(" Add this GIF to Favorites?");
        }else if(state === "animate") {
            $(this).attr("src", $(this).attr("still-url"));
            $(this).attr("data-state", "still");
            // $("#addFavs").text(" ");
        }
    });

    $(document).on("click", "#searchBtn", function(){
        var searchValue = $(".form-control").val();
        var newButton = $("<button>");
        newButton.attr("topic", searchValue.replace(" ", "+"));
        newButton.attr("type", "button");
        newButton.attr("class", "btn btn-primary gifBtn");
        newButton.text(searchValue);
        $("#buttons").append(newButton);
        $(".form-control").val("");
    });

    // $(document).on("click", "#addFavs", function(){
    //     $(".gif").attr("faved", "yes");
        
    //     if($(".gif").attr("faved") === "yes"){
    //         $("#favs").prepend($(".gif"));
    //     }
            
              
    // });




});


