<?php
require_once "includes/conexion-bbdd.php";


$query = "SELECT id_equipo AS id, nombre FROM equipos ORDER BY nombre";
$stmt = $conn->prepare($query);

$stmt->execute();
$resultado = $stmt->get_result();

$equipos = [];

if ($resultado->num_rows > 0) {
    while ($fila = $resultado->fetch_assoc()) {
        $equipos[] = [
            'nombre' => $fila['nombre'],            
            'id' => $fila['id'],
        ];
    }
}

$stmt->close();
$conn->close();

// Devolver los resultados como JSON
header('Content-Type: application/json');
$salida["success"] = $equipos;