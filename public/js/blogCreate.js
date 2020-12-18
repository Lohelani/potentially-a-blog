$(document).ready(function () {
  // Getting jQuery references to the post body, title, form, and author select
  var bodyInput = $("#textInput");
  var titleInput = $("#titleInput");
  var cmsForm = $("#cms");
  // var authorSelect = $("#author");


  // Adding an event listener for when the form is submitted
  $(cmsForm).on("submit", handleFormSubmit);

  // A function for handling what happens when the form to create a new post is submitted
  function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the post if we are missing a body, title, or author
    if (!titleInput.val().trim() || !bodyInput.val().trim()) {
      return;
    }
    // Constructing a newPost object to hand to the database
    var newPost = { //missing username
      title: titleInput
        .val()
        .trim(),
      body: bodyInput
        .val()
        .trim(),
    };
    submitPost(newPost);
  }

  // Submits a new post and brings user to blog page upon completion
  function submitPost(post) {
    $.post("/api/viewblogs", post, function () {
      window.location.href = "/viewblogs";
    });
  }

  // Gets post data for the current post if we're editing, or if we're adding to an author's existing posts
});
