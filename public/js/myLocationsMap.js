    var pos;
    var map, infoWindow;
    var markers = [];
    var locations = []
    let id;
  
    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    }
    
    function fuckAmarker() {
        $.get("/api/user_data").then(function(data) {
      
            console.log(data.id);
            id = data.id;
       
    
        $.get("/api/location/" + id).then(function (data) {
            console.log(data, "this is API res")
            data.forEach(function (location) {
                let newLocation = { lat: Number(location.lat), lng: Number(location.lng) }
                //console.log(location.lat + location.lng + 'trying it out')
                locations.push(newLocation);
                addMarker(newLocation)
                addLocationToTable(location.name, location.info, location.id);
            });
            console.log(locations, "this locations array")
            
        });
    })
    }
    // Adds a marker to the map and push to the array.
    function addMarker(location) {
        var marker = new google.maps.Marker({
            position: location,
            map: map,
            animation: google.maps.Animation.DROP
        });
        markers.push(marker);
       
    }
 
    
    function addLocationToTable(name, info, locationId) {
        

    let locationRow = 
        `<tr>
        <td>${name}</td>
        <td>${info}</td>
        <td id="td${locationId}"><td>
        </tr>
        ` 
    $("#locations-table").append(locationRow);

    let deleteButton = `<td><button id="deleteButton" data-id="${locationId}">Delete</button></td>`;
        console.log("location to table function, checking id: " + locationId);
    let newDeleteButton = $(deleteButton)
    .on("click", function() {

        // var id = $(this).data("id");
        
        console.log("this button's been clicked");   
        console.log("clicked and id is:" + locationId)
    
        deleteLocation(locationId);

       location.reload();

        
      });;

      $(`#td${locationId}`).append(newDeleteButton);

        
        
        

       
    
       
       
    
    }
    
    
    
    
    function deleteLocation(id) {
        $.ajax({
          method: "DELETE",
          url: "/api/location/" + id
        })
          .then(function() {
            console.log("Location ID: " + id + " has successfully been deleted.");
          });
      }
    

   
     
    //   $("#deleteButton").on("click", function() {
    
    //     var id = $(this).data("id");
        
    //     console.log("clicked and id is:" + id)
    
    
    //   });
    
    
      $(".thisButton").on("click", function() {
    
        // var id = $(this).data("id");
        
        console.log("this button's been clicked");
        var id = $(this).data("id");
        
        console.log("clicked and id is:" + id)
    
    
      });
    
    
    


    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 37.5407, lng: -77.4360 },
            zoom: 6
        });
        fuckAmarker()
        
        
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
                console.log(pos);
            }, function () {
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
    }

    function deleteLocation(id) {
        $.ajax({
          method: "DELETE",
          url: "/api/location/" + id
        })
          .then(function() {
            console.log("Location ID: " + id + " has successfully been deleted.");
          });
      }