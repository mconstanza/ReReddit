// Display article's comments when it is clicked
$(document).on('click', '.article', function(event) {
    $("#comments").empty();
    var articleId = $(this).attr("data-id");
    $("#commentSubmit").attr("data-article", articleId);
    $.get("/articles/" + articleId + "/comments", function(comments) {
        for (var i = 0; i < comments.length; i++) {
            var p = $("<p>");
            p.append(comments[i].text);
            $("#comments").append(p);
        }
    });
});

$("#commentSubmit").on('click', function(event) {
    var comment = {};
    var articleId = $(this).attr("data-article");
    comment.text = $("#commentText").val().trim();
    comment.article = articleId;

    if (comment.article == "none") {
        console.log("not commenting on an article!");
    } else {
      $.post("/articles/" + articleId, comment);
    }
});
