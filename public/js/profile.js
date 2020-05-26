var urlArray = window.location.href.split('/');  
var user_id = urlArray[urlArray.length-1];

$.get("/api/users/" + user_id, function(data){
  console.log(data)
  user_id = data.id
 $("#user_id").val(data.id)
 $("#profile_pic").attr("src", data.profile_pic)
 $("#user_name").text(data.user_name)
 $("#user_name2").text(data.user_name)
 $("#city").text(data.city)
 $("#bio").text(data.bio)
 $("#email").text(data.email)

})