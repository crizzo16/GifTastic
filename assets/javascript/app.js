function addTopic() {
    event.preventDefault();
    let newButton = $("<button>");
    newButton.addClass("topic-button");
    //get text submitted and add it to button
    let buttonValue = $("#topic-here").val();
    $("#topic-here").val("");
    if (!(buttonValue === "")) {
        console.log("buttonValue: " + buttonValue);
        newButton.attr("data-topic", buttonValue);
        newButton.text(buttonValue);
        $("#buttons-zone").append(newButton);
    }
};

function basicButtons() {
    const basic = ["Star Wars", "Han Solo", "Leia Organa", "Luke Skywalker", "Darth Vader", "Boba Fett"];

    for (let i = 0; i < basic.length; i++) {
        let newButton = $("<button>");
        newButton.addClass("topic-button");
        //get text submitted and add it to button
        let buttonValue = basic[i];
        if (!(buttonValue === "")) {
            newButton.attr("data-topic", buttonValue);
            newButton.text(buttonValue);
            $("#buttons-zone").append(newButton);
        }
    }
}

function fixTitle(title) {
    return title.substring(0, title.length - 4);
}

function displayTopic() {
    resetImages();
    let topic = $(this).attr("data-topic");
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        let images = response.data;
        let flip = true;
        //let colors = ["#FFCCFF", "#CCCCFF", "#CCFFFF", "#CCFFCC", "#FFFFB3", "#FFD94D", "#FFB3B3"];
        let colors = ["red", "orange", "yellow", "lime", "cyan", "blue", "purple"];
        let index = 0;

        for (let i = 0; i < images.length; i++) {
            if (images[i].rating === "pg" || images[i].rating === "g") {
                let main = $("<div>").addClass("image-group").css("background", colors[index]);

                let image = $("<img>").addClass("image gif").attr("src", images[i].images.original_still.url).attr("data-state", "still").attr("data-still", images[i].images.original_still.url).attr("data-animate", images[i].images.original.url);

                let imageTitle = $("<h3>").addClass("image-title image-desc").text(fixTitle(images[i].title));

                let imageRating = $("<h5>").addClass("image-rating image-desc").text("Rating: " + images[i].rating.toUpperCase());

                //Add all the pieces to the image group
                main.append(imageTitle, imageRating, image);

                //Add image group to the webpage
                //$("#place-pics-here").prepend(main);
                if (flip) {
                    $("#place-left").prepend(main);
                    flip = false;
                } else {
                    $("#place-right").prepend(main);
                    flip = true;
                }
                
                console.log("index: " + index);
                index++;
                if (index === colors.length) {
                    index = 0;
                }
            }
        }
    });
};

function changeState() {
    let state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("data-state", "animate");
        $(this).attr("src", $(this).attr("data-animate"));
    } else if (state === "animate") {
        $(this).attr("data-state", "still");
        $(this).attr("src", $(this).attr("data-still"));
    } else {
        console.log("Something is very wrong");
    }
};


function reset() {
    $("#buttons-zone").empty();
    basicButtons();
};

function resetImages() {
    $("#place-left").empty();
    $("#place-right").empty();
};

window.onload = basicButtons();
$(document).on("click", "#submit", addTopic);
$(document).on("click", ".topic-button", displayTopic);
$(document).on("click", "#reset", reset);
$(document).on("click", "#reset-images", resetImages);
$(document).on("click", ".gif", changeState);