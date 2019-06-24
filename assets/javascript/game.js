var animals = ["dog", "cat", "whale", "hawk"];

function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < animals.length; i++) {
        var a = $("<button>");
        a.addClass("animals");
        a.attr("data-name", animals[i]);
        a.text(animals[i]);
        $("#buttons-view").append(a);
    }
}

$("#add-animal").on("click", function (event) {
    event.preventDefault();
    var animal = $("#animal-input").val().trim();
    animals.push(animal);
    $("#animal-input").val("");
    renderButtons();
});

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
