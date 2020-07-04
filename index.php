<?php
    include "functions/GetTweets.php";

    session_start();

    echo "<!doctype html>\n<head>\n";
    echo "<meta charset='utf-8'/>\n\t<title>PokemonHub</title>\n".
        "\t<link rel='stylesheet' href='style/style.css'/>\n<script src='http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>\n\t<script type='text/javascript' src='scripts/weatherScript.js'></script>\n\t<script type='text/javascript' src='scripts/getLocation.js'></script></head>\n<body>\n\t";
    echo "<header>\n\t\t<h1>PokemonHub</h1>\n\t</header>\n";
    echo "\t<main id='mainPage'>\n";

    echo "\t\t<div id='map'>\n\t\t</div>\n\n\n\t\t<script type='text/javascript' src='scripts/script.js'>\n\t\t</script>\n\t\t<script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyAavgIzrvkH-7NM7fZTjg4gVKLAUa8nhd8&callback=initMap' async defer></script>\n";



    echo "\t\t<section id='other'>";

    echo "\n\t\t\t<section id='weather'>\n\t\t\t\t<h3>The Current Weather in <span id='location'></span>!</h3>";
    echo "\n\t\t\t\t<p>Clouds: <span id='clouds'></span></p>";
    echo "\n\t\t\t\t<p>Temperature: <span id='temp'></span></p>";
    echo "\n\t\t\t\t<p>Humidity: <span id='humidity'></span></p>";
    echo "\n\t\t\t\t<p>Wind Speed: <span id='wind'></span></p>";

    echo "\n\t\t\t</section>";

    //Form to tweet
    echo "\n\t\t\t<aside id='tweetPokemon'>\n\t\t\t\t<h2>Tweet about Pokemon!</h2>\n\t\t\t\t<form action='3-step-oauth/postTweet.php' method='get'
    id='tweetForm'>\n\t\t\t\t\tTweet: <textarea name='text' form='tweetForm' maxlength='264' required></textarea>";

    echo "\n\t\t\t\t\t<input type='submit' value='Submit'>\n\t\t\t\t</form>\n\t\t\t</aside>";

    echo "\n\t\t\t<aside id='distanceContainer'>\n\t\t\t\t<p><span id='distance'>Click the markers to see your distance to the tweet!</span></p>\n\t\t\t</aside>";

    echo "\n\t\t</section>";

    echo "\n\t\t<article id='latestTweets'>\n\t\t\t<h2>Latest Tweets about Pokemon!</h2>";



    //Get the latest tweets with the hashtag '#Pokemon'
    $tweets = getPokemonTweets();

    //Save them to a javascript variable so that they can be used in further scripts, e.g. display on map
    echo "\n\t\t\t<script type='application/javascript'>let tweets=".json_encode($tweets)."</script>";

    //Loop through the tweets
    for($i = 0; $i < count($tweets->statuses); $i++){
        //Echo out the user name, status and time of tweet
        echo "\n\t\t\t<p><span class='tweet'>@".$tweets->statuses[$i]->user->screen_name."\n".$tweets->statuses[$i]->text."\n".$tweets->statuses[$i]->created_at."</span></p>";
    }

    echo "\n\t\t</article>";


    echo "\n\t\t<script type='text/javascript' src='scripts/geocoder.js'></script>";
    echo "\n\t</main>\n\t<footer>&copy; Jonathan Watt 2019. KF6013 Cloud Assignment</footer>";
    echo "\n</body>\n</html>";


