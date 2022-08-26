<?php 
    include('connect_db.php');

    $query = "SELECT * FROM employees";
    $result = mysqli_query($connection, $query);
    $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
    echo json_encode($data);
?>