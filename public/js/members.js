$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  var profilePicDiv = document.querySelectorAll('#small-blank-avatar');
  var postInput = $("#post-input");


  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
    console.log(data.email)

    let id = data.id;

    $.get("/api/users/" + id).then(function(data) {
  
      if (data.profile_pic != null) {
      

        profilePicDiv.forEach(element => element.src = data.profile_pic);
        
        console.log("this is your profile_pic url:" + data.profile_pic)
      }
// working on post function
//////////////////////////////////////////////////////////////////////////////

      $("#post-button").click(function() {

        
        let body = postInput.val().trim();
       
        console.log(body + id);
        postInput.val("");

        $.post("/api/post", {
          body: body,
          author_id: id
        })
          .then(function(data) {
            console.log(data);

            
            // If there's an error, handle it by throwing up a bootstrap alert
          })
          .catch(function(err){
            console.error(err);
        });


      })

// working on post function
//////////////////////////////////////////////////////////////////////////////
  
    });



  });

  

  
});








