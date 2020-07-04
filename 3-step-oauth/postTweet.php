<?php

//Start a session
session_start();


//Check if the variable 'text'(the textarea from the form on index.php) is set
if(isset($_GET['text'])){
    //If it is save it to the session
    $_SESSION['text'] = $_GET['text'];
    //Redirect to the twitter login script
    header('Location: http://localhost/cloudAssignmentCompleted/3-step-oauth/twitter_login.php');
    die();
}else{
    //If it is not set, send it back to the homepage
    header('Location: http://localhost/cloudAssignmentCompleted/');
    die();
}






