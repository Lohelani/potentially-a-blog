$(document).ready(function () {
  var titleInput = $("#titleInput");
  var bodyInput = $("#textInput");
  //grabbing username to display

  function getUser() {
    $.get("/api/userdata").then(function (data) {
      console.log(data);
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
      //author: //use userid here
    };
    console.log(blogData);

    if (!blogData.body || !blogData.title) {
      return;
    }

    $.post("/api/createblog", blogData).then(function(){
      bodyInput.val("");
      titleInput.val("");
      window.location.replace("/viewblogs");
    });

  });
});