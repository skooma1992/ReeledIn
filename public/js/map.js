//////////////////////////////////////////////////////////////////////////
  // map.js
  var pos;
  var map, infoWindow;
  const markerBtn = document.getElementById("markerBtn");
  let markers = [];
  var $submitBtn = $("#submit");
  let pickedPosition = false;
  let lat;
  let long;
    

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 6,
    disableDefaultUI: true,
    

  });
  infoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent("Your location.");
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

  function createMarker() {
    newMarker = new google.maps.Marker({
        position: pos,
        map: map,
        title: "Test Marker",
        animation: google.maps.Animation.DROP,
        draggable: true,
        icon: 'img/icon.png'
    });
    
}

markerBtn.addEventListener("click", function() {
  createMarker();
})

}


function imageSubmit(e) {
  e.preventDefault();
      var form = $("#file")[0];
      var data = new FormData(form);
      data.append("lat", lat); //adds the lat and long to the form
      data.append("long", long);

      $.ajax({
          type: "POST",
          url: "/api/upload",
          data: data,
          processData: false,
          contentType: false,
          cache: false,
          timeout: 600000,
          success: function(data) {
            console.log(data)
          },
        
      });
  }

$submitBtn.on("click", imageSubmit);
