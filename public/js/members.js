$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  var profilePicDiv = document.querySelectorAll("#small-blank-avatar");
  var postInput = $("#post-input");
  // var postDiv = $("#post-div");
  // var posts;
  var id;
  let profile_pic;
  var allFish;
  $.get("/api/user_data").then(function (data) {
    console.log(data);
    id = data.id;
    // where memeber name appears, either display username or user's email
    $.get("/api/users/" + id).then(function (data) {
      $(".member-name").text(data.user_name ? data.user_name : data.email);
      if (data.profile_pic != null) {
        profilePicDiv.forEach((element) => (element.src = data.profile_pic));
        console.log("this is your profile_pic url:" + data.profile_pic);
      }
      // Adding all fish names to the modal
      $.get("/api/checkFish").then(function (res) {
        allFish = res;
        console.log(res);
        res.forEach(function (fish) {
          $("#fishNameSelect").append(`<option>${fish.species}</option>`);
        });
      });
      // working on post function
      //////////////////////////////////////////////////////////////////////////////
      $("#post-button").click(function () {
        let body = postInput.val().trim();
        var location = $("#locationSelect")
          .val()
          .trim();
        var length = $("#inputLength")
          .val()
          .trim();
        var weight = $("#inputWeight")
          .val()
          .trim();
        var species = $("#fishNameSelect")
          .val()
          .trim();
        var profile_pic = $("#small-blank-avatar")
          .val()
          .trim();
        console.log(body + id);
        postInput.val("");
        $.post("/api/post", {
          message: body,
          user_id: id,
          length: length,
          weight: weight,
          location: location,
          UserId: id,
          species: species,
          profile_pic: profile_pic,
        })
          .then(function (data) {
            console.log(data);
            reloadPage();
            // If there's an error, handle it by throwing up a bootstrap alert
          })
          .catch(function (err) {
            console.error(err);
          });
      });
      // working on page load posts
      $.get("/api/post/").then(function (data) {
        console.log(data.length);
        // if (data.length === 0) {
        //   $("#post-div").hide();
        // }
        // else {
          data.forEach(function (fish) {
            var thisFish = allFish.filter(
              (currentFish) => currentFish.species === fish.species
            );
            // work for the timestamp of the post from the time created in the database
            var time = fish.createdAt;
            var postDate = fish.createdAt.slice(0, 10).split("-");
            var postTime = fish.createdAt.slice(11, 16).split(":");
            var postYear = postDate[0];
            postTime[0] = parseInt(postTime[0]) - 4;
            if (parseInt(postTime[0]) < 0) {
              postTime[0] = parseInt(postTime[0]) + 24
              postDate[1] = parseInt(postDate[1]) - 1
            }
            postTime = postTime.join(":");
            postDate.shift();
            postDate.push(postYear);
            postDate = postDate.join("/");
            time = postDate + " at " + postTime;
            console.log(postDate);
            console.log(postTime);
            // prepending the post to the post-div
            // if the user id matches the user id of the post then that user has the ability to delete post
            // the post will consist of user's profile pic, username or email (if they haven't changed their username), fish caught, location, length, weight, time, and link to map of location.  
            $(
              "#post-div"
            ).prepend(`      <div id="this-post" class="card post-card text-dark my-4" style="width: 90%; margin:auto;">
          ${fish.User.id === id ? `<button type="button" data-id="${fish.id}"class="close float-right d-block position-absolute" style="top:5px; right:10px" aria-label="Close"><span aria-hidden="true">&times;</span></button>` : ''}
          <div class="card-body">
            <a href="/user_id/${fish.User.id}"><img class="post-avatar reel-pic ml-3" src=${fish.User.profile_pic ? fish.User.profile_pic : "./img/blank-profile.png"} alt="Profile Pic"></a>
            <p class="card-text"><strong><a href="/user_id/${fish.User.id}">${fish.User.user_name ? fish.User.user_name : fish.User.email}</a></strong> caught a <span class="postion-relative"><span class="fish-span" data-target="post-${fish.id}">${fish.species}</span> at ${fish.location} <div class="card d-none fish-post-card position-absolute" id="post-${fish.id}" style="width: 18rem;">
            <!-- <img src="..." class="card-img-top" alt="..."> -->
            <div class="card-body shadow-lg">
              <h5 class="card-title text-light">${fish.species}</h5>
              <p class="card-text text-light"><img src=${thisFish[0].photo} style="width:80%"> 
              <br>
              <br>
              ${thisFish[0].quote}
              </p>
            </div>
          </div> </span></p>
            <p class="card-text">It was ${fish.length} inches long and weighed ${fish.weight} lbs.</p>
            <p class="card-text">${fish.message}</p>
            <p class="card-tex time-stamp">${time}</p>
          </div>
        </div>`);
          });
        // }
      });
      //////////////////////////////////////////////////////////////////////////////
    });
  });
  // mouseover keywaord in post to display fish data card
  $("#post-div").on("mouseover", ".fish-span", function () {
    var target = $(this).attr("data-target");
    $("#" + target).removeClass("d-none");
  });
  // mouseleave displayed post to hide fish card data
  $("#post-div").on("mouseleave", ".fish-span", function () {
    var target = $(this).attr("data-target");
    $("#" + target).addClass("d-none");
  });
});
function reloadPage() {
  location.reload();
}
// deletes post from page and database
$("#post-div").on("click", ".close", function () {
  $.ajax({
    url: '/api/post',
    type: 'DELETE',
    data: { id: $(this).attr("data-id") },
    success: function (result) {
      location.reload();
    }
  });
})

