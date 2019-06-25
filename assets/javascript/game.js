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
            console.log(data.data);
            for (var i = 0; i < 10; i++) {
                var imageUrlAnimate = data.data[i].images.fixed_width.url;
                var imageUrlStill = data.data[i].images.fixed_width_still.url;
                // var btnWrapper = $("<button>");

                var animalImage = $("<img>");
                animalImage.attr("src", imageUrlStill);
                animalImage.attr("data-still", imageUrlStill);
                animalImage.attr("data-animate", imageUrlAnimate);
                animalImage.attr("data-state", "still");
                animalImage.addClass("gif");
                // btnWrapper.append(animalImage);
                $("#animals-view").prepend(animalImage);
                // console.log(animalImage)
            }
        });
    };

    
    // $(".gif").on("click", function () {
    function switchState() {
        console.log("entrei");
        var state = $(this).attr("data-state");
        console.log(state);
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }

    $(document).on("click", ".animals-btn", displayAnimalsGif);
    $(".gif").each(function(event){
        event.stopPropagation();
        $
    });
    $(document).on("click", ".gif", switchState);  

    renderButtons();
    // jQuery.get({
    //     url: "https://api.giphy.com/v1/gifs/search?q=cat+funny&api_key=dc6zaTOxFJmzC&rating=pg",
    //     success: function (result) {
    //         console.log(result)
    //     },
    //     error: function (error) {
    //         console.log(error);
    //     }
    // });

});