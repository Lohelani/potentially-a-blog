$(document).ready(function () {
// This file just does a GET request to figure out which user is logged in
// and updates the HTML on the page to say hello username, start blogging!
  $.get("/api/userdata").then(function (data) {
    $(".member-name").text(data.username);
  });
});