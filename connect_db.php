<?php 
    $server = "10.0.64.28"; //10.0.64.28
    $user = "laboratorio"; //laboratorio
    $password = "DEVlaboratorio1234"; //DEVlaboratorio1234
    $database = "es_test_db"; //es_test_db //company
        
    try {
        $connection = mysqli_connect($server,$user,$password,$database);
        mysqli_set_charset($connection,'utf8');
    }
    catch(\Throwable $e) {
        echo 'Error'.$e->getMessage();
    }
?>