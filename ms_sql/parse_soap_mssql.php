<?php

function getAddress($latitude, $longitude) {
    $api_key = '48766b69-aad7-4921-a07d-afd8f8277bbf';
    $url = 'https://geocode-maps.yandex.ru/1.x/?apikey=' . $api_key . '&geocode=' . $longitude . ',' . $latitude . '&format=json';

    $response = file_get_contents($url);
    $data = json_decode($response, true);

    if ($data && isset($data['response']['GeoObjectCollection']['featureMember'][0]['GeoObject']['metaDataProperty']['GeocoderMetaData']['text'])) {
        $address = $data['response']['GeoObjectCollection']['featureMember'][0]['GeoObject']['metaDataProperty']['GeocoderMetaData']['text'];
        return $address;
    } else {
        return "Address not found for the given coordinates";
    }
}

 //Загрузка данных в БД из wsdl

$client = new SoapClient('http://pc.tatais.ru:24513/tazazs/ws/General?wsdl', array(
    'login' => 'SOAP',
    'password' => 'qwerty'
   ));

$result = $client->GetCoordinates();
$array = json_decode(json_encode($result->return->GetCoordinatesTable->Line), true);

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

foreach ($array as $data) {
    $azs_id = $data['AZSCode'];
    $longitude = $data['Long'];
    $latitude = $data['Lat'];

    if ($latitude !=0 && $longitude != 0) {
        $address = getAddress($latitude, $longitude);
        $sql =  "INSERT INTO `GAS_STATIONS` (`azs_id`, `latitude`, `longitude`, `adress`) VALUES ('{$azs_id}','{$latitude}','{$longitude}', '{$address}') ";

        if (sqlsrv_query($conn, $sql) === false) {
            echo "Error";
        }
    }
}

sqlsrv_close($conn);
?>