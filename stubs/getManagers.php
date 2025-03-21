<?php
header('Content-Type: application/json');

$managers = [
    [
        'ID' => 1,
        'NAME' => 'Иван',
        'LAST_NAME' => 'Иванов',
        'SECOND_NAME' => 'Иванович',
        'WORK_COMPANY' => 'Компания',
        'WORK_POSITION' => 'Менеджер',
        'PERSONAL_PHONE' => '+79999999999',
        'EMAIL' => 'ivanov@example.com',
        'UF_DEPARTMENT' => [30],
    ],
    [
        'ID' => 2,
        'NAME' => 'Дарья',
        'LAST_NAME' => 'Иванова',
        'SECOND_NAME' => 'Ивановна',
        'WORK_COMPANY' => 'Компания',
        'WORK_POSITION' => 'Координатор',
        'PERSONAL_PHONE' => '+79999999991',
        'EMAIL' => 'ivanova@example.com',
        'UF_DEPARTMENT' => [242],
    ],
];

echo json_encode(['managers' => $managers]);