<?php

require_once(__DIR__ . "/config.php");

function Conectar()
{
    $dsn = 'pgsql:host=' . HOST . ';port=5432;dbname=' . DB;
    $user = USER;
    $pass = PASS;
    try {
        $pdo = new PDO($dsn, $user, $pass);
        //echo 'Conectado com sucesso!';
        return $pdo;
    } catch (PDOException $ex) {
        echo 'Erro: ' . $ex->getMessage();
    }
}
