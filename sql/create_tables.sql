CREATE TABLE IF NOT EXISTS vacancies
(
    vacancy_id INT PRIMARY KEY,
    vacancy_name VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS GAS_STATIONS
(
    azs_id INT PRIMARY KEY,
    latitude DOUBLE,
    longitude DOUBLE,
    adress text
);

CREATE TABLE IF NOT EXISTS all_active_vacancies
(
    azs_id INT,
    vacancy_id
);