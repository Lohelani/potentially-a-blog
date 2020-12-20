$(document).ready(function () {
  var titleInput = $("#titleInput");
  var bodyInput = $("#textInput");
  function getUser() {
    $.get("/api/userdata").then(function (data) {
      console.log(data);
    });
  }
  getUser();
  // When the post button is clicked, validate that the title and body are not blank
  $("#postBtn").on("click", function (event) {
    event.preventDefault();
    var blogData = {
      title: titleInput.val().trim(),
      body: bodyInput.val().trim()
    };
    console.log(blogData);

    if (!blogData.body || !blogData.title) {
      return;
    }
    // If we have a title and body, run the signUpUser function
    blogCreate(blogData);
    bodyInput.val("");
    titleInput.val("");
  });


  function blogCreate(blogData) {
    $.post("/api/createblog", blogData, function () {
      window.location.href = "/viewblogs";
    });
  }


});