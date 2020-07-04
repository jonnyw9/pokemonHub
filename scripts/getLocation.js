

//Function to get the users distance
function getLocation() {

    //Return the JSON data of the users location
    return $.getJSON('https://geoip-db.com/json/')
        .done(function (location) {
            //console.log(location.country_name);
            //console.log(location.state);
           // console.log(location.city);
            //console.log(location.latitude);
           // console.log(location.longitude);
            //getWeather(location);
        });

}
/*

//This method only works with SSL and is therefore unusable in this assignment
function getLocation() {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
            showPosition,

            showError,

            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            });
    }else{
        console.log("Geo not available")
    }
}

function showPosition(position){
    console.log(position.coords.latitude + ", " + position.coords.longitude);
}

function showError(error){
    switch(error.code) {
        case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.");
            getGeoIp();
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.");
            getGeoIp();
            break;
        case error.TIMEOUT:
            console.log("The request to get user location timed out.");
            getGeoIp();
            break;
        case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.");
            getGeoIp();
            break;
    }
}

function getGeoIp(){
    if(google.loader.ClientLocation)
    {
        visitor_lat = google.loader.ClientLocation.latitude;
        visitor_lon = google.loader.ClientLocation.longitude;
        visitor_city = google.loader.ClientLocation.address.city;
        visitor_region = google.loader.ClientLocation.address.region;
        visitor_country = google.loader.ClientLocation.address.country;
        visitor_countrycode = google.loader.ClientLocation.address.country_code;
        console.log('Lat/Lon: ' + visitor_lat + ' / ' + visitor_lon + 'Location: ' + visitor_city + ', ' + visitor_region + ', ' + visitor_country + ' (' + visitor_countrycode + ')');
    }
    else
    {
        console.log('Whoops!');
    }
}
*/