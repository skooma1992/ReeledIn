
var pos;
var map, infoWindow;
var markers = [];
var locations = []
let id;
var locations = [];
const infowindows = [];

const markerBtn = document.getElementById("markerBtn");



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
    // This event listener will call addMarker() when the map is clicked.
    map.addListener('click', function (mapsMouseEvent) {
        // set pos to mapsMouseEvent
        pos = mapsMouseEvent.latLng;
        // add marker to pos position
        addMarker(pos);
        // set pos object to string eg (38.00000, 36.234545)
        let posString = pos.toString();
        // set posString to array eg [38.00000, 36.234545]
        // let posArray = posString.replace(/\(/g, "[").replace(/\)/g, "]");
        let posArray = posString.replace(/\(/g, "").replace(/\)/g, "");
        let finalPosArray = posArray.split(',');
        console.log(posString);
        console.log(posArray);
        console.log(finalPosArray);
        let latLngObject = {
            lat: Number(finalPosArray[0]),
            lng: Number(finalPosArray[1])
        }
        console.log(latLngObject);
        console.log(markers);

    });
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

