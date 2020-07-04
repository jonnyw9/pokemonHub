<?php
require ('config.php');
require "twitteroauth/autoload.php";
use Abraham\TwitterOAuth\TwitterOAuth;

session_start();

//Create an instance of the Twitter OAuth Class
$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET);


//Request the token. Also, pass the callback URL
$request_token = $connection->oauth('oauth/request_token', array('oauth_callback' => OAUTH_CALLBACK));

//Save the  token to the session
$_SESSION['oauth_token'] = $request_token['oauth_token'];

//Save the secret token to the session
$_SESSION['oauth_token_secret'] = $request_token['oauth_token_secret'];

//If it works
if ($connection->getLastHttpCode()==200){
    //Generate a URL for redirect
    $url = $connection->url('oauth/authorize', array('oauth_token' => $request_token['oauth_token']));
    header('Location: '. $url) ;
    die();
}else{
    //If it fails, kill
    die('Something wrong happened.' . " HTTP Error Code " . $connection->getLastHttpCode());
}

?>