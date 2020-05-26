var urlArray = window.location.href.split('/');  
var user_id = urlArray[urlArray.length-1];

$.get("/api/users/" + user_id, function(res){
   console.log(res)
   user_id = res.id
  $("#user_id").val(res.id)
  $("#profile_pic").val(res.profile_pic)
  $("#user_name").val(res.user_name)
  $("#city").val(res.city)
  $("#bio").val(res.bio)
})