var map;

//Init the map centred around Newcastle Upon Tyne
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 54.977775, lng: -1.604488},
        zoom: 8
    });

   // geocoder = new google.maps.Geocoder();
}




