<?php  
$server = "127.0.0.1";
$login = "root";
$password = "";
$name_db = "AZS_VACANCIES";

$conn = new mysqli($server, $login, $password, $name_db);

if ($conn->connect_error) {
    die("Ошибка соединения: " . $conn->connect_error);
}

$sql =  "SELECT DISTINCT `longitude`, `latitude`, `adress`, `vacancy_name` FROM `all_active_vacancies` JOIN `GAS_STATIONS` USING(`azs_id`)
JOIN `vacancies` USING(`vacancy_id`)";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $data = array();

    while($row = $result->fetch_assoc()) {
      $data[] = $row;
    }

    echo json_encode($data);
  } else {
    echo "Нет результатов";
  }

  $conn->close();
?>
