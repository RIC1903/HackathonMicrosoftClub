     
      var connection=require('../Connection/connection')
      var A=[];
      var B=[];
       var lata=0;
        var lnga=0;
      var a,b;
      var C=[];
    /* Note: This example requires that you consent to location sharing when
     * prompted by your browser. If you see the error "Geolocation permission
     * denied.", it means you probably did not give permission for the browser * to locate you. */
    let pos;
    let map;
    let bounds;
    let infoWindow;
    let currentInfoWindow;
    let service;
    let infoPane;
    function initMap() {
//          navigator.geolocation.getCurrentPosition(position => {
//          pos = {
//            lat: position.coords.latitude,
//            lng: position.coords.longitude
//            
//          };
//        console.log(pos.lat);
//        
//        
        
        
      // Initialize variables
      bounds = new google.maps.LatLngBounds();
      infoWindow = new google.maps.InfoWindow;
      currentInfoWindow = infoWindow;
      /* TODO: Step 4A3: Add a generic sidebar */
      infoPane = document.getElementById('panel');
      // Try HTML5 geolocation
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
            
          };
        
          map = new google.maps.Map(document.getElementById('map'), {
            center: pos,
            zoom: 15
          });
           
           lata=parseFloat(pos.lat);
           lnga=parseFloat(pos.lng);
          a=lata
        b=lnga
          bounds.extend(pos);
          infoWindow.setPosition(pos);
          infoWindow.setContent('Location found.');
          infoWindow.open(map);
          map.setCenter(pos);
          // Call Places Nearby Search on user's location
          getNearbyPlaces(pos);
        }, () => {
          // Browser supports geolocation, but user has denied permission
          handleLocationError(true, infoWindow);
        });
          
     
      } else {
        // Browser doesn't support geolocation
        handleLocationError(false, infoWindow);
      } 
    }
    
    // Handle a geolocation error
    function handleLocationError(browserHasGeolocation, infoWindow) {
      // Set default location to Sydney, Australia
      pos = { lat: -33.856, lng: 151.215 };
      map = new google.maps.Map(document.getElementById('map'), {
        center: pos,
        zoom: 15
      });
      // Display an InfoWindow at the map center
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
        'Geolocation permissions denied. Using default location.' :
        'Error: Your browser doesn\'t support geolocation.');
      infoWindow.open(map);
      currentInfoWindow = infoWindow;
      // Call Places Nearby Search on the default location
      getNearbyPlaces(pos);
    }
    // Perform a Places Nearby Search Request
   
    function getNearbyPlaces(position) {
      let request = {
        location: position,
        rankBy: google.maps.places.RankBy.DISTANCE,
        keyword: 'hospital'
      };
      service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, nearbyCallback);
    }
    // Handle the results (up to 20) of the Nearby Search
    function nearbyCallback(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        createMarkers(results,pos);
      }
    }
      
var rad = function(x) {
  return x * Math.PI / 180;
};
var getDistance = function(p1, p2) {
  
  return d; // returns the distance in meter
};
    // Set markers at the location of each place result
    function createMarkers(places,pos) {
      places.forEach(place => {
        let marker = new google.maps.Marker({
          position: place.geometry.location,
          map: map,
          title: place.name
        });
        
        var lat2 = marker.getPosition().lat();
        var lng2 = marker.getPosition().lng();
//        console.log(a);
//        console.log(lat1,lng1,'\n');
//        var distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(a, b), new google.maps.LatLng(lat1, lng1));
          var R = 6378137; // Earth’s mean radius in meter
        var dLat = rad(lat2 - a);
  var dLong = rad(lng2 - b);
  var x = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(a)) * Math.cos(rad(lat2)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
  var d = R * c;
  
          C.push(d);
        // db_push(d);
        var values={
                    "id":d
                }
        connection.query("insert into healthapp.random set ?",values,function(err,row1,fields){
            if(err)
                throw err;
            else
            console.log('pushed')
        })
        //   C.sort();

        console.log(d);
        
        /* TODO: Step 4B: Add click listeners to the markers */
        // Add click listener to each marker
        google.maps.event.addListener(marker, 'click', () => {
          let request = {
            placeId: place.place_id,
            fields: ['name', 'formatted_address', 'geometry', 'rating',
              'website', 'photos']
          };
          /* Only fetch the details of a place when the user clicks on a marker.
           * If we fetch the details for all place results as soon as we get
           * the search response, we will hit API rate limits. */
          service.getDetails(request, (placeResult, status) => {
            showDetails(placeResult, marker, status)
          });
        });
        // Adjust the map bounds to include the location of this marker
        bounds.extend(place.geometry.location);
      });
      /* Once all the markers have been placed, adjust the bounds of the map to
       * show all the markers within the visible area. */
      map.fitBounds(bounds);
        
    }
    /* TODO: Step 4C: Show place details in an info window */
    // Builds an InfoWindow to display details above the marker
    function showDetails(placeResult, marker, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        let placeInfowindow = new google.maps.InfoWindow();
        let rating = "None";
        if (placeResult.rating) rating = placeResult.rating;
        placeInfowindow.setContent('<div><strong>' + placeResult.name +
          '</strong><br>' + 'Rating: ' + rating + '</div>');
        placeInfowindow.open(marker.map, marker);
        currentInfoWindow.close();
        currentInfoWindow = placeInfowindow;
        showPanel(placeResult);
      } else {
        console.log('showDetails failed: ' + status);
      }
    }
    /* TODO: Step 4D: Load place details in a sidebar */
    // Displays place details in a sidebar
    function showPanel(placeResult) {
      // If infoPane is already open, close it
      if (infoPane.classList.contains("open")) {
        infoPane.classList.remove("open");
      }
      // Clear the previous details
      while (infoPane.lastChild) {
        infoPane.removeChild(infoPane.lastChild);
      }
      /* TODO: Step 4E: Display a Place Photo with the Place Details */
      // Add the primary photo, if there is one
      if (placeResult.photos) {
        let firstPhoto = placeResult.photos[0];
        let photo = document.createElement('img');
        photo.classList.add('hero');
        photo.src = firstPhoto.getUrl();
        infoPane.appendChild(photo);
      }
      // Add place details with text formatting
      let name = document.createElement('h1');
      name.classList.add('place');
      name.textContent = placeResult.name;
      infoPane.appendChild(name);
      if (placeResult.rating) {
        let rating = document.createElement('p');
        rating.classList.add('details');
        rating.textContent = `Rating: ${placeResult.rating} \u272e`;
        infoPane.appendChild(rating);
      }
      let address = document.createElement('p');
      address.classList.add('details');
      address.textContent = placeResult.formatted_address;
      infoPane.appendChild(address);
      if (placeResult.website) {
        let websitePara = document.createElement('p');
        let websiteLink = document.createElement('a');
        let websiteUrl = document.createTextNode(placeResult.website);
        websiteLink.appendChild(websiteUrl);
        websiteLink.title = placeResult.website;
        websiteLink.href = placeResult.website;
        websitePara.appendChild(websiteLink);
        infoPane.appendChild(websitePara);
      }
      // Open the infoPane
      infoPane.classList.add("open");
    }
    




    // Store old reference
const appendChild = Element.prototype.appendChild;
// All services to catch
const urlCatchers = [
  "/AuthenticationService.Authenticate?",
  "/QuotaService.RecordEvent?"
];
// Google Map is using JSONP.
// So we only need to detect the services removing access and disabling them by not
// inserting them inside the DOM
Element.prototype.appendChild = function (element) {
  const isGMapScript = element.tagName === 'SCRIPT' && /maps\.googleapis\.com/i.test(element.src);
  const isGMapAccessScript = isGMapScript && urlCatchers.some(url => element.src.includes(url));
  if (!isGMapAccessScript) {
      
    return appendChild.call(this, element);
  }
  // Extract the callback to call it with success data
  // Only needed if you actually want to use Autocomplete/SearchBox API
  //const callback = element.src.split(/.*callback=([^\&]+)/, 2).pop();
  //const [a, b] = callback.split('.');
  //window[a][b]([1, null, 0, null, null, [1]]);
  // Returns the element to be compliant with the appendChild API
  return element;
    
};

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDIJ9XX2ZvRKCJcFRrl-lRanEtFUow4piM&libraries=places&callback=initMap"
         async defer>
</script>