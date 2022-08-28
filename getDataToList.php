<?php
    include('connect_db.php');

    if(isset($_GET['idqry']) AND isset($_GET['inidate']) AND isset($_GET['enddate']) AND isset($_GET['turno']) AND isset($_GET['linesd'])) {
        
        $idqry = $_GET['idqry'];
        $ini_date = $_GET['inidate']; //formato yyyy-mm-dd
        $end_date = $_GET['enddate']; //formato yyyy-mm-dd, enddate no se usa en esta versión de la App
        $turno = $_GET['turno'];
        $inih = $endh = '';

        //obtengo el id_production_line
        $line_short_description = $_GET['linesd'];
        $query = "SELECT id_production_line FROM production_line WHERE short_description = '$line_short_description'";
        $result = mysqli_query($connection, $query);
        $raw = mysqli_fetch_row($result);
        $id_prod_line = $raw[0];

        if($turno == 'mañana') {
            $inih = '06:00:00';
            $endh = '15:00:00';
        }

        if($turno == 'tarde') {
            $inih = '15:00:00';
            $endh = '23:36:00';
        }

        if($turno == 'noche') {
            $inih = '23:36:00';
            $endh = '00:00:00';
            $inih2 = '00:00:00';
            $endh2 = '06:00:00';
        }

        /**-----------------------------RTS-UNITS-LIST-----------------------------*/
        if($idqry == '2004rts-l') {
            $query1 = "SELECT * FROM es_test_report WHERE test_date = '$ini_date' AND (start_time >= '$inih' AND start_time < '$endh') AND id_production_line = $id_prod_line AND serial_number IN (SELECT serial_number FROM es_test_report WHERE serial_number NOT LIKE '%-BGH' AND test_date = '$ini_date' AND (start_time >= '$inih' AND start_time < '$endh') AND id_production_line = $id_prod_line GROUP BY serial_number HAVING COUNT(*) >1)";
            $result1 = mysqli_query($connection, $query1);
            $data1 = mysqli_fetch_all($result1, MYSQLI_ASSOC);
            
            $data2 = [];

            if($turno == 'noche') {
                $aux = new DateTime($ini_date);
                date_add($aux, date_interval_create_from_date_string('1 day'));
                $ini_date = $aux -> format('Y-m-d');

                $query2 = "SELECT * FROM es_test_report WHERE test_date = '$ini_date' AND (start_time >= '$inih2' AND start_time < '$endh2') AND id_production_line = $id_prod_line AND serial_number IN (SELECT serial_number FROM es_test_report WHERE serial_number NOT LIKE '%-BGH' AND test_date = '$ini_date' AND (start_time >= '$inih2' AND start_time < '$endh2') AND id_production_line = $id_prod_line GROUP BY serial_number HAVING COUNT(*) >1)";
                $result2 = mysqli_query($connection, $query2);
                $data2 = mysqli_fetch_all($result2, MYSQLI_ASSOC);
            }

            $data = array_merge($data1, $data2);
        }
        //PASS
        if($idqry == '2005rtspass-l') {
            $query1 = "SELECT * FROM es_test_report WHERE test_date = '$ini_date' AND (start_time >= '$inih' AND start_time < '$endh') AND test_result = 'PASS' AND id_production_line = $id_prod_line AND serial_number IN (SELECT serial_number FROM es_test_report WHERE serial_number NOT LIKE '%-BGH' AND test_date = '$ini_date' AND (start_time >= '$inih' AND start_time < '$endh') AND test_result = 'PASS' AND id_production_line = $id_prod_line GROUP BY serial_number HAVING COUNT(*) >1)";
            $result1 = mysqli_query($connection, $query1);
            $data1 = mysqli_fetch_all($result1, MYSQLI_ASSOC);

            $data2 = [];

            if($turno == 'noche') {
                $aux = new DateTime($ini_date);
                date_add($aux, date_interval_create_from_date_string('1 day'));
                $ini_date = $aux -> format('Y-m-d');

                $query2 = "SELECT * FROM es_test_report WHERE test_date = '$ini_date' AND (start_time >= '$inih2' AND start_time < '$endh2') AND test_result = 'PASS' AND id_production_line = $id_prod_line AND serial_number IN (SELECT serial_number FROM es_test_report WHERE serial_number NOT LIKE '%-BGH' AND test_date = '$ini_date' AND (start_time >= '$inih2' AND start_time < '$endh2') AND test_result = 'PASS' AND id_production_line = $id_prod_line GROUP BY serial_number HAVING COUNT(*) >1)";
                $result2 = mysqli_query($connectionn, $query2);
                $data2 = mysqli_fetch_all($result2, MYSQLI_ASSOC);
            }

            $data = array_merge($data1, $data2);
        }
        //FAIL
        if($idqry == '2006rtsfail-l') {
            $query1 = "SELECT * FROM es_test_report WHERE test_date = '$ini_date' AND (start_time >= '$inih' AND start_time < '$endh') AND test_result = 'FAIL' AND id_production_line = $id_prod_line AND serial_number IN (SELECT serial_number FROM es_test_report WHERE serial_number NOT LIKE '%-BGH' AND test_date = '$ini_date' AND (start_time >= '$inih' AND start_time < '$endh') AND test_result = 'FAIL' AND id_production_line = $id_prod_line GROUP BY serial_number HAVING COUNT(*) >1)";
            $result1 = mysqli_query($connection, $query1);
            $data1 = mysqli_fetch_all($result1, MYSQLI_ASSOC);

            $data2 = [];

            if($turno == 'noche') {
                $aux = new DateTime($ini_date);
                date_add($aux, date_interval_create_from_date_string('1 day'));
                $ini_date = $aux -> format('Y-m-d');

                $query2 = "SELECT * FROM es_test_report WHERE test_date = '$ini_date' AND (start_time >= '$inih2' AND start_time < '$endh2') AND test_result = 'FAIL' AND id_production_line = $id_prod_line AND serial_number IN (SELECT serial_number FROM es_test_report WHERE serial_number NOT LIKE '%-BGH' AND test_date = '$ini_date' AND (start_time >= '$inih2' AND start_time < '$endh2') AND test_result = 'FAIL' AND id_production_line = $id_prod_line GROUP BY serial_number HAVING COUNT(*) >1)";
                $result2 = mysqli_query($connection, $query2);
                $data2 = mysqli_fetch_all($result2, MYSQLI_ASSOC);
            }

            $data = array_merge($data1, $data2);
        }
        /**----------------------------------END-----------------------------------*/

        /**-------------------------------GRAL-LIST--------------------------------*/
        if($idqry == '2007grl-l') {

            $query1 = "SELECT * FROM es_test_report WHERE serial_number NOT LIKE '%-BGH' AND test_date = '$ini_date' AND (start_time >= '$inih' AND start_time < '$endh') AND id_production_line = $id_prod_line";
            $result1 = mysqli_query($connection, $query1);
            $data1 = mysqli_fetch_all($result1, MYSQLI_ASSOC);

            $data2 = [];

            if($turno == 'noche') {
                $aux = new DateTime($ini_date);
                date_add($aux, date_interval_create_from_date_string('1 day'));
                $ini_date = $aux -> format('Y-m-d');

                $query2 = "SELECT * FROM es_test_report WHERE serial_number NOT LIKE '%-BGH' AND test_date = '$ini_date' AND (start_time >= '$inih2' AND start_time < '$endh2') AND id_production_line = $id_prod_line";
                $result2 = mysqli_query($connection, $query2);
                $data2 = mysqli_fetch_all($result2, MYSQLI_ASSOC);
            }
            
            $data = array_merge($data1, $data2);
        }
        //PASS
        if($idqry == '2008grlpass-l') {
            $query1 = "SELECT * FROM es_test_report WHERE serial_number NOT LIKE '%-BGH' AND test_date = '$ini_date' AND (start_time >= '$inih' AND start_time < '$endh') AND test_result = 'PASS' AND id_production_line = $id_prod_line";
            $result1 = mysqli_query($connection, $query1);
            $data1 = mysqli_fetch_all($result1, MYSQLI_ASSOC);

            $data2 = [];

            if($turno == 'noche') {
                $aux = new DateTime($ini_date);
                date_add($aux, date_interval_create_from_date_string('1 day'));
                $ini_date = $aux -> format('Y-m-d');

                $query2 = "SELECT * FROM es_test_report WHERE serial_number NOT LIKE '%-BGH' AND test_date = '$ini_date' AND (start_time >= '$inih2' AND start_time < '$endh2') AND test_result = 'PASS' AND id_production_line = $id_prod_line";
                $result2 = mysqli_query($connection, $query2);
                $data2 = mysqli_fetch_all($result2, MYSQLI_ASSOC);
            }

            $data = array_merge($data1, $data2);
        }
        //FAIL
        if($idqry == '2009grlfail-l') {
            $query1 = "SELECT * FROM es_test_report WHERE serial_number NOT LIKE '%-BGH' AND test_date = '$ini_date' AND (start_time >= '$inih' AND start_time < '$endh') AND test_result = 'FAIL' AND id_production_line = $id_prod_line";
            $result1 = mysqli_query($connection, $query1);
            $data1 = mysqli_fetch_all($result1, MYSQLI_ASSOC);

            $data2 = [];
            
            if($turno == 'noche') {
                $aux = new DateTime($ini_date);
                date_add($aux, date_interval_create_from_date_string('1 day'));
                $ini_date = $aux -> format('Y-m-d');
            
                $query2 = "SELECT * FROM es_test_report WHERE serial_number NOT LIKE '%-BGH' AND test_date = '$ini_date' AND (start_time >= '$inih2' AND start_time < '$endh2') AND test_result = 'FAIL' AND id_production_line = $id_prod_line";
                $result2 = mysqli_query($connection, $query2);
                $data2 = mysqli_fetch_all($result2, MYSQLI_ASSOC);
            }

            $data = array_merge($data1, $data2);
        }
        /**----------------------------------END-----------------------------------*/

        /**--------------------------------BOX-TEST--------------------------------*/
        if($idqry == '3001box-l') {
            $query = "SELECT * FROM es_test_report WHERE serial_number LIKE '%-BGH' AND test_date = '$ini_date' AND id_production_line = $id_prod_line";
            $result = mysqli_query($connection, $query);
            $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
        }
        /**----------------------------------END-----------------------------------*/

        echo json_encode($data);
    }
?>