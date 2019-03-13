// This grabs the articles as a json:
$.get("/scrape", function (data) {
    console.log(data)
    // This loops through each item in the data array:
    for (var i = 0; i < data.length; i++) {
        // This appends the relevant information to the page:
        $("#articles").append("<p data-id='" + data[i]._id + "'><a href='http://www.israelnationalnews.com" + data[i].link + "'>LINK</a> " + data[i].title + "<br /></p>");
    }
});


// Whenever a p tag is clicked...
$(document).on("click", "p", function () {
    // this empties the notes from the note section:
    $("#notes").empty();
    // This saves the id from the p tag:
    var thisId = $(this).attr("data-id");

    // This makes an ajax call for the Article:
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })
        // This adds the note information to the page:
        .then(function (data) {
            console.log(data);
            // This appends the title of the article as an h2:
            $("#notes").append("<h2>" + data.title + "</h2>");
            // This appends an input id to enter a new title:
            $("#notes").append("<input id='titleinput' name='title' >");
            // This appends a text area to add a new note body:
            $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
            // This appends a Save Note button to submit a new note with the id of the article saved to it:
            $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

            // If there's a note in the article...
            if (data.note) {
                // this places the title of the note in the title input:
                $("#titleinput").val(data.note.title);
                // this places the body of the note in the body text area:
                $("#bodyinput").val(data.note.body);
            }
        });
});

// When the Save Note button is clicked:
$(document).on("click", "#savenote", function () {
    // This grabs the id associated with the article from the Submit button:
    var thisId = $(this).attr("data-id");

    // This runs a POST request to change the note using what's entered in the inputs:
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            // This value is taken from the title input:
            title: $("#titleinput").val(),
            // This value is taken from the note text area:
            body: $("#bodyinput").val()
        }
    })
        // Having done that...
        .then(function (data) {
            // This logs the response data to the console:
            console.log(data);
            // This empties the notes section:
            $("#notes").empty();
        });

    // This removes the values entered in the input and text area for the note entry:
    $("#titleinput").val("");
    $("#bodyinput").val("");
});
