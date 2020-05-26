var pos;
var map, infoWindow;
var markers = [];
var locations = []
let id;

function fuckAmarker() {
    $.get("/api/location").then(function (data) {
        console.log(data, "this is API res")
        data.forEach(function (location) {
            let newLocation = { lat: Number(location.lat), lng: Number(location.lng) }
            //console.log(location.lat + location.lng + 'trying it out')
            locations.push(newLocation)
            addMarker(newLocation, location.name, location.info)
        });
    });
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 37.5407, lng: -77.4360 },
        zoom: 6
    });
    fuckAmarker();

    infoWindow = new google.maps.InfoWindow;
  
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            map.setCenter(pos);
            console.log(pos);
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

//addMarker(locations[0]);
// Adds a marker to the map and push to the array.
function addMarker(location, name, info) {
    let contentString = '<div id="content">'+
'<div id="siteNotice">'+
'</div>'+
'<h4 id="firstHeading" class="firstHeading">' + name + '</h4>'+
'<div id="bodyContent">'+
'<p>' + info + '</p>'+
'</div>'+
'</div>';

const infowindow = new google.maps.InfoWindow({
    content: contentString
    });

    var marker = new google.maps.Marker({
        position: location,
        map: map,
        animation: google.maps.Animation.DROP,
        icon: "img/icon.png"
    });
    marker.addListener("click", function() {
        infowindow.open(map, marker)
    });
    markers.push(marker);
   
}


$.get("/api/user_data").then(function(res){
    user_id = res.id;
    $.get("/api/users/" + user_id).then(function(data) {
      $("#small-blank-avatar").attr("src", data.profile_pic) 
    })
  })
  
  

