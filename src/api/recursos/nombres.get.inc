<?php
require_once "includes/conexion-bbdd.php";

$query = "SELECT Apodo FROM jugadoras WHERE LENGTH(Apodo) = 5 ORDER BY RAND() LIMIT 1"; // Selecciona una palabra aleatoria
$stmt = $conn->prepare($query);
$stmt->execute();
$resultado = $stmt->get_result();

if ($resultado->num_rows > 0) {
    $fila = $resultado->fetch_assoc();
    $palabra = $fila['Apodo'];
} else {
    $palabra = ""; // En caso de que no haya resultados
}

$stmt->close();
$conn->close();

// Devolver la palabra como JSON
$salida=$palabra;
?>
