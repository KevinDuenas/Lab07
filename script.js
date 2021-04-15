$(document).ready(function() {


$(document).on("click", ".btn", showGif);

var topics = ["car", "airplane", "bus", "helicopter", "train", "boat", "vessel boat"];

$("#add-animal").on("click", function(event) {
    event.preventDefault();

    var giphy = $("#animal-input").val().trim();
    topics.push(giphy);
    createButtons();
});

function createButtons() {

    $("#animal-buttons").empty();

    for (var i = 0; i < topics.length; i++) {
        var btn = $("<button>");
        btn.addClass("btn");
        btn.attr("gif", topics[i]);
        btn.text(topics[i]);
        $("#animal-buttons").append(btn);
    }

}

function showGif() {

    var gif = $(this).attr("gif");
    var apiURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=KG97UBmobcAUI8xqAiPGF5LVH6YeBCYU";

    $.ajax({
        url: apiURL,
        method: "GET"
    }).then(function(response) {

        var list = response.data;
        $("#animals").empty();

        for (var i = 0; i < list.length; i++) {
            var items = $("<div class ='animal-item'>");

            var p = $("<p>").text("Rating-> " + list[i].rating);

            var img = $("<img>");

            img.attr("src", list[i].images.fixed_height_still.url);
            img.attr("yes",list[i].images.fixed_height.url);
            img.attr("no", list[i].images.fixed_height_still.url);
            img.attr("movement", "no");
            img.on("click", function() {
                // validamos si ya esta en movimiento o no.
                if ($(this).attr("movement") === "yes") {
                    $(this).attr("src", $(this).attr("no"));
                    $(this).attr("movement", "no");
                } else {
                    $(this).attr("src", $(this).attr("yes"));
                    $(this).attr("movement", "yes");
                }

            });

            
            items.append(img);
            items.append(p);
            $("#animals").append(items);
        }
    });

}
createButtonss();


});
