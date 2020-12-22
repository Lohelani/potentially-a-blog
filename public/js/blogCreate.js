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
    // get userid from localstorage
    var blogData = {
      title: titleInput.val().trim(),
      body: bodyInput.val().trim(),
      //author: //use userid here
    };
<<<<<<< HEAD
    console.log(blogData);

=======
    console.log("Blog Data : " +blogData);
>>>>>>> 23a6094c5a5cdddb2e5afa37fcaced0c2718f387
    if (!blogData.body || !blogData.title) {
      return;
    }

    $.post("/api/createblog", blogData).then(function(){
      bodyInput.val("");
      titleInput.val("");
      window.location.replace("/viewblogs");
    });

<<<<<<< HEAD
  function blogCreate(blogData) {
    $.post("/api/createblog", blogData, function () {
      window.location.href = "/viewblogs";
    });
  }


=======
  });
>>>>>>> 23a6094c5a5cdddb2e5afa37fcaced0c2718f387
});