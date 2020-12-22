$(document).ready(function () {

    var userId;

    $.get("/api/userdata").then(function (data) {
        $(".member-name").text(data.username);
        userId = data.id;
    }).then(function () {
        console.log(userId)
        $.get("/api/posts/" + userId, function (data) {
            console.log(data)
            data.forEach(function(e) {
                $("#blogContainer").append(`
            <div class="container">
            <div class="row">
                <div class="col-md">
                <p>${e.title}</p>
                </div>
                <div class="col-md">
                <p>${e.Author.username}</p>
                </div>
            </div>

            <div class="row">
                <p>${e.body}</p>
            </div>

            </div>
        `)
            });
        });
    });
});