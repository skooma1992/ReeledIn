let pos;
let map, infoWindow;
let markers = [];
let finalPosArray = []
let user_id;

const markerBtn = document.getElementById("markerBtn");
$.get("/api/user_data").then(function(data) {
  
  console.log(data.id);
  user_id = data.id;

})
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 6
  });
  infoWindow = new google.maps.InfoWindow;
  // This event listener will call addMarker() when the map is clicked.
  map.addListener('click', function (mapsMouseEvent) {
    // fist delete all markers in markers array
    deleteMarkers();
    // set pos to mapsMouseEvent
    pos = mapsMouseEvent.latLng;
    // add marker to pos position
    addMarker(pos);
    // set pos object to string eg (38.00000, 36.234545)
    let posString = pos.toString();
    // set posString to array eg [38.00000, 36.234545]
    let posArray = posString.replace(/\(/g, "").replace(/\)/g, "");
    finalPosArray = posArray.split(',');
    console.log(posString);
    console.log(posArray);
    console.log(finalPosArray);
    let latLngObject = {
      lat: Number(finalPosArray[0]),
      lng: Number(finalPosArray[1])
    }
    console.log(latLngObject)

  });
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      infoWindow.setPosition(pos);
      infoWindow.setContent("Your location.");
      infoWindow.open(map);
      map.setCenter(pos);
    }, function () {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}
// Adds a marker to the map and push to the array.
function addMarker(location) {
  var marker = new google.maps.Marker({
    position: location,
    map: map,
    animation: google.maps.Animation.DROP,
    icon: "img/icon.png"
  });
  markers.push(marker);
  showMarkers();
}
function logmarker(name, info, lat, lng, user_id) {
  $.post("/api/location", {
    name: name,
    info: info,
    lat: lat,
    lng: lng,
    user_id: user_id
  })
}
// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}
function clearMarkers() {
  setMapOnAll(null);
}
// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}
function deleteMarkers() {
  clearMarkers();
  markers = [];
}
//logmarker('myname', 'myinfo', 38.146716881423664,  -82.13486232499999)
$('#catchButton').click(function (d) {
  d.preventDefault();
  let name = $('#locationName').val().trim();
  let info = $('#locationInfo').val().trim();
  let lat = Number(finalPosArray[0]);
  let lng = Number(finalPosArray[1]);
  console.log(name + info + lat + lng)
  logmarker(name, info, lat, lng, user_id)
  $('#locationName').val("");
  $('#locationInfo').val("");
})


