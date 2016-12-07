// Display article's comments when it is clicked
$(document).on('click', '.article', function(event) {
    // remove 'selected' class from other articles
    removeSelected();
    // apply 'selected' class to highlight article
    $(this).addClass("selected");

    // clear any comment from other articles
    $("#comments").empty();

    // pull the comments for the selected article from the database
    var articleId = $(this).attr("data-id");
    $("#commentSubmit").attr("data-article", articleId);
    $.get("/articles/" + articleId + "/comments", function(comments) {

        // once received, append those comments to the DOM
        for (var i = 0; i < comments.length; i++) {
            var p = $("<p>");
            p.append(comments[i].text);
            $("#comments").append(p);
        }
    });
});

// When a user submits a comment
$("#commentSubmit").on('click', function(event) {
    var comment = {};
    // get the article ID
    var articleId = $(this).attr("data-article");
    // get the comment text
    comment.text = $("#commentText").val().trim();
    // connect the comment to the article in the database
    comment.article = articleId;

    // make sure the user isn't somehow submitting a comment without an article selected
    if (comment.article == "none") {
        console.log("not commenting on an article!");
    } else {
        // add the comment to the database via post request
        $.post("/articles/" + articleId, comment);
    }
});



function removeSelected() {
    $(".selected").each(function(i) {
        $(this).removeClass("selected");
    });
}
