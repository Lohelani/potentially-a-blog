$(document).ready(function () {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  //var emailInput = $("input#registerEmail");
  var passwordInput = $("input#registerPassword");
  var usernameInput = $("input#registerUsername");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function (event) {
    event.preventDefault();
    var userData = {
      password: passwordInput.val().trim(),
      username: usernameInput.val().trim()
    };

    if (!userData.username || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.username, userData.password);
    usernameInput.val("");
    passwordInput.val("");
    //usernameInput("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(username, password) {
    $.post("/api/signup", {
      password: password,
      username: username
    })
      .then(function() {
        window.location.replace("/viewblogs");
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadaIn(500);
  }
});

// When the signup button is clicked, we validate the email and password are not blank
// signUpForm.on("submit", function(event) {
//   event.preventDefault();
//   var userData = {
//     username: usernameInput.val().trim(),
//     password: passwordInput.val().trim()
//   };

//   if (!userData.username || !userData.password) {
//     return;
//   }
//   // If we have an email and password, run the signUpUser function
//   signUpUser(userData.username, userData.password);
//   usernameInput.val("");
//   passwordInput.val("");
// });

// // Does a post to the signup route. If successful, we are redirected to the members page
// // Otherwise we log any errors
// function signUpUser(username, password) {
//   $.post("/api/signup", {
//     username: username,
//     password: password
//   }).then(function(data) {
//     window.location.replace("/viewblogs");
//     console.log(data);
//   }).catch(handleLoginErr);
// }
// function handleLoginErr(err) {
//   $("#alert .msg").text(err.responseJSON);
//   $("#alert").fadaIn(500);
// }
