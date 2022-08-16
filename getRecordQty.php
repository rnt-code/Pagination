<?php 
    include('connect_db.php');

    $query = "SELECT count(id) as n FROM employees ";
    $result = mysqli_query($connection, $query);
    $qty = mysqli_fetch_assoc($result);
    echo json_encode($qty);

?>