$(document).ready(function(){
    //Get the weather for the default location, Newcastle Upon Tyne
    getWeather('default');

    //Define the variables to be used
    var markers = [];
    var geocoder;
    //Get the user location
    var userLocation = getLocation();
    //console.log("Document Ready");
    geocoder = new google.maps.Geocoder();
    //console.log(tweets);

    //Traverse the tweets
    $.each(tweets, function (index, item) {

        $.each(item, function(inde, ite){
            //Check if the tweet has any Geo Location to work with
            if(ite.place != null || ite.geo != null || ite.user.location != null || ite.coordinates != null){

                //Get a random number between 1 and 802
                //802 is the max number for a which a pokemon can be returned with a sprite
                let pokemonNumber = Math.floor((Math.random()*802) + 1);
                //var pokemon;
                var dataJSON = "https://pokeapi.co/api/v2/pokemon/"+pokemonNumber+"/";
                //console.log(dataJSON);
                //Get a random pokemon sprite
                $.getJSON(dataJSON, {
                    format: "json"
                }).done(function(data){
                    //console.log(data.sprites.front_default);
                    //Get the address
                    geocodeAddress(geocoder, map, ite, data);
                    //Extend the zoom to fit
                    //extendZoom();
                }).fail(function (jqxhr, textStatus, errorThrown) {
                    console.log(textStatus + ':' + errorThrown);
                });
                //console.log(ite);
            }
        });
    });



    function extendZoom(){
        var bounds = new google.maps.LatLngBounds();
        if(markers.length > 0){
            $.each(markers, function (index, item) {
                //Extend the zoom to fit all the markers
               bounds.extend(item.getPosition());
            });
            map.fitBounds(bounds);
        }
    }

    //console.log(tweetsWithLoc);


    function geocodeAddress(geocoder, resultsMap, tweet, pokemon){
        var location = "";
        console.log(tweet);
        //Check which piece of location is enabled
        if(tweet.geo !== null){
            location = tweet.geo.bounding_box.coordinates[0];
        }else if(tweet.place !== null){
            location = tweet.place.full_name + ", " + tweet.place.country;
        }else if(tweet.coordinates !== null){
            location = tweet.coordinates;
        }else if(tweet.user.location !== null){
            location = tweet.user.location;
        }



        if(location !== ""){
            //Use geocoder to get address. Only will display those in the UK.
            //Some tweets return other countries like US even though it was restricted to UK in the tweet search
            geocoder.geocode({'address': location, componentRestrictions: { country: 'UK'}}, function(results, status){

                //console.log(location);
                var sprite = pokemon.sprites.front_default;
                //console.log(sprite);
                var title = "@"+tweet.user.screen_name;
                var contentString = "\t" + title + "\n" + tweet.text;
                var infowindow = new google.maps.InfoWindow({
                    content: contentString
                });
                if (status === 'OK') {
                    //console.log(results[0].geometry.location.toJSON());
                    //resultsMap.setCenter(results[0].geometry.location);

                    //Create the marker
                    var marker = new google.maps.Marker({
                        optimized: false,
                        icon: sprite,
                        map: resultsMap,
                        label: title,
                        title: title,
                        position: results[0].geometry.location
                    });
                    //Add the listeners to the markers
                    marker.addListener("mouseover", function () {
                        infowindow.open(map, marker);
                    });
                    marker.addListener("mouseout", function(){
                       infowindow.close(map, marker);
                    });

                    marker.addListener("click", function () {
                        var tweetLocation = results[0].geometry.location.toJSON();
                        var distanceMatrix = new google.maps.DistanceMatrixService();
                        console.log(userLocation.responseJSON);
                        getDistance(userLocation.responseJSON, tweetLocation, distanceMatrix);
                        getWeather(tweetLocation);
                    });
                    markers.push(marker);
                    extendZoom();
                } else {
                    console.log('Geocode was not successful for the following reason: ' + status);
                }

             })
        }
    }


    function getDistance(userLocation, tweetLocation, distanceMatrix){
        //console.log(userLocation.responseJSON.latitude + " : " + userLocation.responseJSON.longitude);
        //Make the origin the users location
        var origin = new google.maps.LatLng(userLocation.latitude, userLocation.longitude);
        //Make the destination the tweet location
        var dest = new google.maps.LatLng(tweetLocation.lat, tweetLocation.lng);
        //console.log(origin.toJSON());
        //console.log(dest.toJSON());
        //Get the distance and display it
        distanceMatrix.getDistanceMatrix(
            {
                origins: [origin],
                destinations: [dest],
                travelMode: google.maps.TravelMode.DRIVING,
                unitSystem: google.maps.UnitSystem.IMPERIAL
            }, function (response, status) {
                if(status !== google.maps.DistanceMatrixStatus.OK){
                    console.log('Error: ' + status);
                }else{
                    console.log(response);//+ ' ==> ' + response.rows[0].elements[0].distance.text);
                    //$("#clouds").text(clouds[0].description);
                    $("#distance").text(response.rows[0].elements[0].distance.text + "les to the tweet! That's a "
                        +response.rows[0].elements[0].duration.text + " drive!");
                }
            }
        )
    }

});
