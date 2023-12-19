<?php  
$server = "127.0.0.1";
$login = "root";
$password = "";
$name_db = "AZS_VACANCIES";

$connectionOptions = array(
    "Database" => $name_db,
    "Uid" => $login,
    "PWD" => $password
);

$conn = sqlsrv_connect($server, $connectionOptions);

if ($conn === false) {
  die(print_r(sqlsrv_errors(), true));
}

$sql =  "SELECT DISTINCT(`vacancy_name`) FROM `all_active_vacancies` 
JOIN `vacancies` USING(`vacancy_id`) ORDER BY `vacancy_name`";

$result = sqlsrv_query($conn, $sql);

if ($result === false) {
  die( print_r( sqlsrv_errors(), true));
}

$data = array();

while($row = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC)) {
    $data[] = $row;
}

echo json_encode($data);

sqlsrv_free_stmt($result);
sqlsrv_close($conn);
?>
