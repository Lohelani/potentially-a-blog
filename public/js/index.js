$(document).ready(function () {
    // STILL NEED TO DO:
    //1. delete function should only appear if the user is the owner of the blog 
    //2. work on the search input field in nav

    // blogContainer holds all of our blogs
    var blogContainer = $(".containerBlog");
    var blogCategory = $("#category");
    //input value where user searches for a keyword of a blog if exists in database
    var searchBlogs = $("#searchBlogs");
    //submit button to search
    var searchBtn = $("#searchblogsBtn");
    // dynamically creating click events for the edit and delete buttons
    $(document).on("click", "button.delete", handlePostDelete);
    $(document).on("click", "button.edit", handlePostEdit);
    // Variable to hold our blogs
    var blogs;

    // The code below handles the case where we want to get blogs for a specific author
    // Looks for a query param in the url for author_id
    var url = window.location.search;
    var authorId;
    if (url.indexOf("?author_id=") !== -1) {
        authorId = url.split("=")[1];
        getblogs(authorId);
    }
    // If there's no authorId we just get all blogs as usual
    else {
        getblogs();
    }

    // This function grabs blogs from the database and updates the view
    function getblogs(author) {
        authorId = author || "";
        if (authorId) {
            authorId = "/?author_id=" + authorId;
        }
        $.get("/api/blogs" + authorId, function (data) {
            console.log("blogs", data);
            blogs = data;
            if (!blogs || !blogs.length) {
                displayEmpty(author);
            }
            else {
                initializeRows();
            }
        });
    }

    // This function does an API call to delete blogs
    function deletePost(id) {
        $.ajax({
            method: "DELETE",
            url: "/api/blogs/" + id
        })
            .then(function () {
                getblogs(blogCategory.val());
            });
    }

    // InitializeRows handles appending all of our constructed post HTML inside blogContainer
    function initializeRows() {
        blogContainer.empty();
        var blogsToAdd = [];
        for (var i = 0; i < blogs.length; i++) {
            blogsToAdd.push(createNewRow(blogs[i]));
        }
        blogContainer.append(blogsToAdd);
    }

    // This function constructs a post's HTML
    function createNewRow(post) {
        var formattedDate = new Date(post.createdAt).toLocaleDateString();
        var newPostCard = $("<div>");
        newPostCard.addClass("card");
        var newPostCardHeading = $("<div>");
        newPostCardHeading.addClass("card-header");
        var deleteBtn = $("<button>");
        deleteBtn.text("Delete");
        deleteBtn.addClass("deleteBtn");
        var editBtn = $("<button>");
        editBtn.text("Edit");
        editBtn.addClass("editBtn");
        var newPostTitle = $("<h2>");
        var newPostDate = $("<small>");
        var newPostAuthor = $("<h5>");
        newPostAuthor.text("Blogger: " + post.Author.name);
        newPostAuthor.css({
            float: "right",
            "margin-top":
                "-10px"
        });
        var newPostCardBody = $("<div>");
        newPostCardBody.addClass("card-body");
        var newPostBody = $("<p>");
        newPostTitle.text(post.title + " ");
        newPostBody.text(post.body);
        newPostDate.text(formattedDate);
        newPostTitle.append(newPostDate);
        newPostCardHeading.append(deleteBtn);
        newPostCardHeading.append(editBtn);
        newPostCardHeading.append(newPostTitle);
        newPostCardHeading.append(newPostAuthor);
        newPostCardBody.append(newPostBody);
        newPostCard.append(newPostCardHeading);
        newPostCard.append(newPostCardBody);
        newPostCard.data("post", post);
        return newPostCard;
    }

    // This function figures out which post we want to delete and then calls deletePost
    function handlePostDelete() {
        var currentPost = $(this)
            .parent()
            .parent()
            .data("post");
        deletePost(currentPost.id);
    }

    // This function figures out which post we want to edit and takes it to the appropriate url
    function handlePostEdit() {
        var currentPost = $(this)
            .parent()
            .parent()
            .data("post");
        window.location.href = "/cms?post_id=" + currentPost.id;
    }

    // This function displays a message when there are no blogs
    function displayEmpty(id) {
        var query = window.location.search;
        var partial = "";
        if (id) {
            partial = " for Author #" + id;
        }
        blogContainer.empty();
        var messageH2 = $("<h2>");
        messageH2.css({ "text-align": "center", "margin-top": "50px" });
        messageH2.html("No blogs have been created yet");
        blogContainer.append(messageH2);
    }

});
