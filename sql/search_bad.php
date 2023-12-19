<?php

$client = new SoapClient('http://pc.tatais.ru:24513/tazazs/ws/General?wsdl', array(
    'login' => 'SOAP',
    'password' => 'qwerty'
   ));

$result = $client->GetCoordinates();
$array = json_decode(json_encode($result->return->GetCoordinatesTable->Line), true);

foreach ($array as $data) {
    $azs_id = $data['AZSCode'];
    $longitude = $data['Long'];
    $latitude = $data['Lat'];

    $k = 0;

    foreach ($array as $data2) {
        if ($data2['Lat'] == $latitude && $data2['Long'] == $longitude) {
            $k += 1;
        }
    }

    if ($k > 1 || ($latitude == 0 && $longitude == 0)) {
        echo 'AZS_Code: '.$azs_id.' latitude: '.$latitude.' longitude: '.$longitude;
        echo '<br>';
    } 
}
?>
