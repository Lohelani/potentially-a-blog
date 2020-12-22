$(document).ready(function () {
  var titleInput = $("#titleInput");
  var bodyInput = $("#textInput");

  var userId;

  function getUser() {
    $.get("/api/userdata").then(function (data) {
      console.log(data);
      userId = data.id;
    });
  }
  getUser();
  // When the post button is clicked, validate that the title and body are not blank
  $("#postBtn").on("click", function (event) {
    event.preventDefault();
    // get userid from localstorage

    var blogData = {
      title: titleInput.val().trim(),
      body: bodyInput.val().trim(),
      AuthorId: "" + userId
    };
    console.log("Blog Data : " +blogData);
    if (!blogData.body || !blogData.title) {
      return;
    }

    $.post("/api/createblog", blogData, function(){
      // bodyInput.val("");
      // titleInput.val("");
      window.location.replace("/viewblogs");
    });

  });
});