
function getWeather(location){
    //Check whether it is the default location or not
    if(location !== "default"){
        //It is so get the weather for the tweet location
        //console.log(location);
        // http://api.openweathermap.org/data/2.5/weather?id=2641673&APPID=60db4842baac21129822edc026987511

        //Generate the URL
        var jsonAddress = "http://api.openweathermap.org/data/2.5/weather?lat="+
            location.lat+"&lon="+location.lng+"&APPID=60db4842baac21129822edc026987511";

        //console.log(jsonAddress);


        //Get the weather data and set it on the page
        $.getJSON(jsonAddress, function(result){
            console.log( JSON.stringify(result));
            var clouds = result.weather;
            var weather = result.main;

            $("#clouds").text(clouds[0].description);

            $('#temp').text(Math.round(weather.temp-273.15)  + "°C");
            $("#humidity").text(weather.humidity + "%");
            $("#wind").text(result.wind.speed + "m/s");
            $("#location").text(result.name);
        });
    }else{
        //It is the default location, Get the weather for Newcastle Upon Tyne
        var jsonAddress = "http://api.openweathermap.org/data/2.5/weather?id=2641673&APPID=60db4842baac21129822edc026987511";

        $.getJSON(jsonAddress, function(result){
            console.log( JSON.stringify(result));
            var clouds = result.weather;
            var weather = result.main;

            $("#clouds").text(clouds[0].description);

            $('#temp').text(Math.round(weather.temp-273.15)  + "°C");
            $("#humidity").text(weather.humidity + "%");
            $("#wind").text(result.wind.speed + "m/s");
            $("#location").text(result.name);
        });
    }
}