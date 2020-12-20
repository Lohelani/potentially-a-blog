$(document).ready(function () {
  var titleInput = $("#titleInput");
  var bodyInput = $("#textInput");

  // When the post button is clicked, validate that the title and body are not blank
  $("#postBtn").on("click", function (event) {
    event.preventDefault();
    var blogData = {
      title: titleInput.val().trim(),
      body: bodyInput.val().trim()
    };
    console.log("Blog Data : " + blogData);

    if (!blogData.body || !blogData.title) { return;
    }
    // If we have a title and body, run the signUpUser function
    blogCreate(blogData);
    bodyInput.val("");
    titleInput.val("");
  });


  function blogCreate(blogData) {
    $.post("/api/createblog", { title: blogData.title, body: blogData.body
    }).then(function () { window.location.replace("/viewblogs");});}
});