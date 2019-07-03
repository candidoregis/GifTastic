$(document).ready(function () {

    var topics = ["dog", "rambo", "thunder", "goku"];

    var offsetMore = 0;
    var currentSelection = "";

    // FUNCTION THAT RENDERS BUTTONS ON THE PAGE
    function renderButtons() {
        $("#buttons-view").empty();
        for (var i = 0; i < topics.length; i++) {
            var a = $("<button>");
            a.addClass("topics-btn");
            a.attr("data-name", topics[i]);
            a.text(topics[i]);
            $("#buttons-view").append(a);
        }
    };

    // FUNCTION TO ADD A NEW TOPIC TO THE LIST
    $("#add-topic").on("click", function (event) {
        event.preventDefault();
        var topic = $("#topic-input").val().trim();
        topics.push(topic);
        $("#topic-input").val("");
        renderButtons();
    });

    // FUNCTION THAT ADDs 10 MORE GIFs OF THE SAME TOPIC TO THE PAGE
    $("#add-more").on("click", function (event) {
        event.preventDefault();
        displayTopicsQueryMore();
    });

    // FUNCTION THAT CREATES THE FIRST QUERY FROM CHOSEN TOPIC
    function displayTopicsQuery() {
        var name = $(this).attr("data-name");
        var offset = 0;
        offsetMore = offset;
        currentSelection = name;
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&limit=10&offset=" + offset + "&api_key=k18J8WsAogUXHfMrNROAFGP7ZnL3OL5x";
        displayTopicsGif(queryURL);
    }

    // FUNCTION THAT CREATES THE SECOND AND ON QUERY FROM SAME TOPIC
    function displayTopicsQueryMore() {
        offsetMore += 10;
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + currentSelection + "&limit=10&offset=" + offsetMore + "&api_key=k18J8WsAogUXHfMrNROAFGP7ZnL3OL5x";
        displayTopicsGif(queryURL);
    }

    // FUNCTION THAT RETRIEVES DATA FROM GIPHY API BASED ON PREVIOUS QUERY FUNCTIONs
    function displayTopicsGif(queryURL) {

        var xhr = $.get(queryURL);
        xhr.done(function (data) {

            for (var i = 0; i < 10; i++) {
                var imageUrlAnimate = data.data[i].images.fixed_width.url;
                var imageUrlStill = data.data[i].images.fixed_width_still.url;
                var imageRating = data.data[i].rating;

                var topicImage = $("<img>");
                topicImage.attr("src", imageUrlStill);
                topicImage.attr("data-still", imageUrlStill);
                topicImage.attr("data-animate", imageUrlAnimate);
                topicImage.attr("data-state", "still");
                topicImage.addClass("gif");

                var topicCard = "<div class=\"card\">" +
                    "<img src=\"" + imageUrlStill + "\" " +
                    "data-still=\" " + imageUrlStill + "\" " +
                    "data-animate=\" " + imageUrlAnimate + "\" " +
                    "data-state=\"still\"" +
                    "class=\"gif\">" +
                    "<div class=\"cardContainer\">" +
                    "<h4>Rating: " + imageRating.toUpperCase() + "</h4>" +
                    "</div>" +
                    "</div>";

                $("#topics-view").prepend(topicCard);
            }
        });
        document.getElementById("add-more").disabled = false;
    };

    // FUNTION THAT CHANGE GIFs ANIMATE STATUS
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

    // FUNCTION THAT TRIGGERS THE DISPLAY OF GIFs
    $(document).on("click", ".topics-btn", displayTopicsQuery);

    // FUNCTION THAT SWITCH STATES
    $(document).on("click", ".gif", switchState);

    // FUNCTION THAT RENDERS THE BUTTONS FOR THE FIRST TIME
    renderButtons();

});