<?php
require ("3-step-oauth/config.php");
require "3-step-oauth/twitteroauth/autoload.php";
use Abraham\TwitterOAuth\TwitterOAuth;

    //Function to get and return the tweets. Returns the json of tweets
    function getPokemonTweets(){
        //Create a new instance of the twitter OAuth class using consumer keys and access tokens
        $connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET,
            ACCESS_TOKEN, ACCESS_SECRET);

        //query twitter for the latest 20 tweets with the hashtag '#Pokemon' that are inside a 300 mile
        // radius of the lat of 54.05, and the lon -2.39, which is the centre of the UK
        $content = $connection->get("search/tweets", array("q" => "#Pokemon", "count" => 20, "geocode" => "54.09,-2.89,300mi"));

        //Convert the returned data into something useful
        $tweet = json_decode(json_encode($content));

        //return it
        return $tweet;
    }

