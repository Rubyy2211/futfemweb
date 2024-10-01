<?php
require_once "includes/conexion-bbdd.php";

if(!isset($conn)) die();

$query = "SELECT id_liga AS id, nombre FROM ligas ORDER BY nombre";
$stmt = $conn->prepare($query);

$stmt->execute();
$resultado = $stmt->get_result();

$ligas = [];

if ($resultado->num_rows > 0) {
    while ($fila = $resultado->fetch_assoc()) {
        $ligas[] = [
            'nombre' => $fila['nombre'],            
            'id' => $fila['id'],
        ];
    }
}

$stmt->close();
$conn->close();

// Devolver los resultados como JSON
header('Content-Type: application/json');
$salida["success"] = $ligas;