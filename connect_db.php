<?php 
    $server = "localhost"; //10.0.64.28
    $user = "root"; //laboratorio
    $password = ""; //DEVlaboratorio1234
    $database = "company"; //es_test_db
        
    try {
        $connection = mysqli_connect($server,$user,$password,$database);
        mysqli_set_charset($connection,'utf8');
    }
    catch(\Throwable $e) {
        echo 'Error'.$e->getMessage();
    }
?>