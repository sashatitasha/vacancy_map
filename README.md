# Карта активных вакансий
Реализована карта, на которую наносятся геометки из базы данных AZS (azs_id, latitude, longitude, address). База данных заполняется автоматически с помощью запуска скрипта parse_soap.php из файла wsdl. Этот скрипт выгружает из xml результата soap запроса данные в базу данных, а также производит обратное геокодирование координат в текстовый адресс при помощи Yandex API maps. На карте реализована кастомная кластеризация меток, выделение метки/кластера при наведении курсора. Также реализованы кастомные элементы управления картой: фильтр по отображению вакасий на карте (какие вакансие хотим, те выбираем и они вырисовываются на карте), собственный zoom control. 


![Image alt](https://github.com/sashatitasha/vacancy_map/raw/develop/illustraitions/il1.png)

## Технологии
- Backend: php
- Frontend: JavaScript, HTML, CSS
- Базы данных: MySQL и MsSQL
- Yandex maps API

## Использование
С помощью локального MySQL сервера (например в OpenServer phpMyAdmin) создаете базу данных AZS_VACANCIES и выполняете SQL запросы из папки sql для заполнения и создания всех необходимых таблиц. Далее открываете папку с проектом через OSpanel (Open Server panel) в браузере, где автоматически запустится index.html - яндекс карта с геометками из базы данных.

![Image alt](https://github.com/sashatitasha/vacancy_map/raw/develop/illustraitions/il2.png)
![Image alt](https://github.com/sashatitasha/vacancy_map/raw/develop/illustraitions/il3.png)
