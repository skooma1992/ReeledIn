$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  var profilePicDiv = document.querySelectorAll("#small-blank-avatar");
  var postInput = $("#post-input");
  var postDiv = $("#post-div");
  var posts;
  var id;


  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
    console.log(data.email);

    id = data.id;

    $.get("/api/users/" + id).then(function(data) {
      if (data.profile_pic != null) {
        profilePicDiv.forEach((element) => (element.src = data.profile_pic));

        console.log("this is your profile_pic url:" + data.profile_pic);
      }
      // Adding all fish names to the modal
      $.get("/api/checkFish").then(function(res) {
        console.log(res);
        res.forEach(function(fish) {
          $("#fishNameSelect").append(`<option>${fish.species}</option>`);
        });
      });

      // working on post function
      //////////////////////////////////////////////////////////////////////////////

      $("#post-button").click(function() {
        let body = postInput.val().trim();
        var location = $("#locationSelect").val().trim();
        var length = $("#inputLength").val().trim();
        var weight = $("#inputWeight").val().trim();
        console.log(body + id);
        postInput.val("");

        $.post("/api/post", {
          message: body,
          user_id: id,
          length: length,
          weight: weight,
          location: location,
          UserId: id,
        })
          .then(function(data) {
            console.log(data);

            // If there's an error, handle it by throwing up a bootstrap alert
          })
          .catch(function(err) {
            console.error(err);
          });
      });

      // working on page load posts 

      $.get("/api/post").then(function(data){
        console.log(data)

      })






      //////////////////////////////////////////////////////////////////////////////
    });
  });


  $("#test1").hover(
    function() {
      $(".modal").modal({
        show: true,
      });
    },
    function() {
      $(".modal").modal("hide");
    }
  );

});

