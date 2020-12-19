$(document).ready(function () {

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
  });

  loginUser(userData);
  userInput.val("");
  passwordInput.val("");

  function loginUser(userData) {
    $.post("/api/login", {
      username: userData.username,
      password: userData.password
    })
      .then(function() {
        console.log("done");
        window.location.replace("/viewblogs");
      });
  }
});
