$(document).ready(function () {
//might want to add signup redirect button
  var userInput = $("#userInput");
  var passwordInput = $("#passwordInput");

  $("#loginButton").on("click", function (event) {
    event.preventDefault();
    var userData = {
      username: userInput.val().trim(),
      password: passwordInput.val().trim()
    };
    console.log(userData);

    if (!userData.username || !userData.password) {
      return;
    }
    loginUser(userData);
    userInput.val("");
    passwordInput.val("");

  });


  function loginUser(userData) {
    $.post("/api/login", {
      username: userData.username,
      password: userData.password,
      authorId: req.body.author
    })
      .then(function() {
        window.location.replace("/viewblogs");
      })
      .catch(function(err){
        console.log(err);
      }
    }
});
