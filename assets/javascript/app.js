var superHeroes = ["Thor", "Ironman", "Black Panther", "Black Widow","Hulk", "Loki","Deadpool","Guardians of The Galaxy", "Captain America", "Nick Fury", "Gamora"];
var audio = new Audio("assets/images/intromusic.mp3");


setTimeout(timeUp, 1000 * 5);

function buttonCreator() {

    $("#linkSection").empty();

    var main = $("#topSection");

    var btns = main.find("#linkSection");

    for (i = 0; i < superHeroes.length; i++) {
        var heroesBtn = $("<button>");
        heroesBtn.addClass("btn btn-default heroesBtn").css("background-color", "#e3c67d");
        heroesBtn.attr("data-hero", superHeroes[i]);
        heroesBtn.text(superHeroes[i]);
        btns.append(heroesBtn);
    }
    clickMe();
}



function playPause() {
    $(".sImage").on("click", function () {

        var state = $(this).attr("state");

        if (state === "pause") {
            $(this).attr("src", $(this).attr("play"));
            $(this).attr("state", "play");
        }
        else {
            $(this).attr("src", $(this).attr("pause"));
            $(this).attr("state", "pause");
        }
    })
}


function clickMe() {
    $(".heroesBtn").on("click", function () {
        var hero = $(this).data("hero");
        var sLimit = "&limit=10"
        var apiKey = "&api_key=YWq0JeKUpCNYNzFC0ussbsqrj1wviR5a"
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + hero +
            apiKey + sLimit;

        $.ajax({
            url: queryURL,
            method: "GET",
        })
            .then(function (response) {
                for (j = 0; j < response.data.length; j++) {
                    
                    var heroDiv = $("<div class = 'col-xs-6'>");

                    var sRating = $("<p>").text("RATING: " + (response.data[j].rating).toUpperCase());

                    var heroImage = $("<img>").addClass("sImage").css({
                        "border":"10px solid",
                        "border-color": "black",
                        "border-radius": "15px",
                        "margin":"3px"
                      
                    });

                    var play = heroImage.attr({
                        "src": response.data[j].images.original.url,
                        "play" : response.data[j].images.original.url
                    });

                    var pause =heroImage.attr({
                        "src": response.data[j].images.original_still.url,
                        "pause": response.data[j].images.original_still.url,
                        "state" : "pause",
                        "height":"300",
                        "width": "300"
                    });

                    heroDiv.append(sRating, heroImage);
                    $("#imageSection").prepend(heroDiv);
                }

                playPause();
            })

        playPause();
        $("#imageSection").empty();
    })
}


function buttonAdder() {
    $("#add").on("click", function (event) {
        event.preventDefault();
        var hero = $("#addHero").val();
        superHeroes.push(hero);
        buttonCreator();
        $("#addHero").val("");
    });
};

    $(document).ready(function () {
        buttonCreator();
        buttonAdder();
    });




function timeUp() {
  console.log("Play intro music. It won't restart when you refresh tho.");
  audio.play();
}

