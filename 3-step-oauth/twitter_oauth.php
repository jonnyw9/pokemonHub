<?php
require ('config.php');
require "twitteroauth/autoload.php";
use Abraham\TwitterOAuth\TwitterOAuth;

session_start();
//Get the tokens from the SESSION
$request_token = [];
$request_token['oauth_token'] = $_SESSION['oauth_token'];
$request_token['oauth_token_secret'] = $_SESSION['oauth_token_secret'];


//Check to see if everything is right
if (isset($_REQUEST['oauth_token']) &&
    $request_token['oauth_token'] !== $_REQUEST['oauth_token']) {
    // Abort! Something is wrong.
    // Something's missing, go back to square 1
    header('Location: ec2-3-85-114-180.compute-1.amazonaws.com/twitter_login.php');
}

//Create new instance of the Twitter OAUTH class using the twitter apps consumer keys and the tokens from the session
$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET,
    $request_token['oauth_token'],$request_token['oauth_token_secret']);

//Request an access token
$access_token = $connection->oauth("oauth/access_token", array("oauth_verifier" => $_REQUEST['oauth_verifier']));

//Create an new instacne of twitterOAuth class using twitter app consumer keys and the access token
$twitter = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, $access_token['oauth_token'],
    $access_token['oauth_token_secret']);

//Get the tweet to be sent from the session and post it to twitter
if(isset($_SESSION['text'])){
    $status = $twitter->post(
        "statuses/update", [
            "status" => "#KF6013_Pokemon ".$_SESSION['text']
        ]
    );

    //Clear the tweet session variable
    $_SESSION['text'] = "";
    unset($_SESSION['text']);
}

//Redirect to homepage
header('Location: http://ec2-3-85-114-180.compute-1.amazonaws.com');
die();

