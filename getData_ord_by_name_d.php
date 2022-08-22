<?php 
    include('connect_db.php');

    if(isset($_GET['offset']) AND isset($_GET['count'])) {

        $offset = $_GET['offset'];
        $count = $_GET['count'];

        $query = "SELECT * FROM employees ORDER BY name DESC LIMIT $offset, $count";
        $result = mysqli_query($connection, $query);
        $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
        echo json_encode($data);
    }
?>