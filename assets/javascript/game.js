$(document).ready(function () {

    var animals = ["dog", "cat", "whale", "hawk"];

    function renderButtons() {
        $("#buttons-view").empty();
        for (var i = 0; i < animals.length; i++) {
            var a = $("<button>");
            a.addClass("animals-btn");
            a.attr("data-name", animals[i]);
            a.text(animals[i]);
            $("#buttons-view").append(a);
        }
    };

    $("#add-animal").on("click", function (event) {
        event.preventDefault();
        var animal = $("#animal-input").val().trim();
        animals.push(animal);
        $("#animal-input").val("");
        renderButtons();
    });

    function displayAnimalsGif() {

        var name = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=k18J8WsAogUXHfMrNROAFGP7ZnL3OL5x";

        var xhr = $.get(queryURL);
        xhr.done(function (data) {
            // console.log(data.data);
            for (var i = 0; i < 10; i++) {
                var imageUrlAnimate = data.data[i].images.fixed_width.url;
                var imageUrlStill = data.data[i].images.fixed_width_still.url;
                var imageRating = data.data[i].rating;
                var animalImage = $("<img>");
                animalImage.attr("src", imageUrlStill);
                animalImage.attr("data-still", imageUrlStill);
                animalImage.attr("data-animate", imageUrlAnimate);
                animalImage.attr("data-state", "still");
                animalImage.addClass("gif");
                var animalP = $("<p>");
                animalP.text = imageRating;
                animalImage.append(animalP);
                $("#animals-view").prepend(animalImage);
            }
        });
    };

    function switchState() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }

    $(document).on("click", ".animals-btn", displayAnimalsGif);

    $(document).on("click", ".gif", switchState);

    renderButtons();

});