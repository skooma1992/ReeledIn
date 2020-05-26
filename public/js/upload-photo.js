var CLOUDINARY_URL = "	https://api.cloudinary.com/v1_1/dxrhczeo9/upload/";
var CLOUDINARY_UPLOAD_PRESET = "fzl0siot";
var user_id;
var imgPreview = document.getElementById("img-preview");
var fileUpload = document.getElementById("file-upload");

fileUpload.addEventListener("change", function(event) {
  var file = event.target.files[0];

  var formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  axios({
    url: CLOUDINARY_URL,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: formData,
  })
    .then(function(res) {
      console.log(res);
      imgPreview.src = res.data.secure_url;
    })
    .catch(function(err) {
      console.error(err);
    });

  /*******************************************************************/
  /*******************************************************************/
  /*******************************************************************/

  // Here I'm trying to save input the picURL into the User db with a hard-coded ID 

  $("#save-pic-button").on("click", function(event) {
    window.location.href = "/members";
    const data = {
      url: imgPreview.src,
      id: user_id,
    };

    console.log(imgPreview.src);

    $.ajax({
      url: "/api/user_data",
      method: "PUT",
      data: data,
    }).then(function(res) {
      console.log(res.user);
    });
  });
});

// grabbing info from update profile html for profile html
$.get("/api/user_data").then(function(res){
  user_id = res.id;
  $.get("/api/users/" + user_id).then(function(data) {
    console.log(data)
    $("#user_id").val(data.id)
    $("#user_name").val(data.user_name)
    $("#city").val(data.city)
    $("#bio").val(data.bio)
    $("#small-blank-avatar").attr("src", data.profile_pic) 
  })
})

