<?php 
    include('connect_db copy.php');

    $query = "SELECT * FROM employees_73_12col";
    $result = mysqli_query($connection, $query);
    $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
    echo json_encode($data);
?>