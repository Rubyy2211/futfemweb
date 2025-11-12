<?php
require_once "includes/conexion-bbdd.php";

if(!isset($conn)) die();

$query = "SELECT id_equipo AS id, nombre, escudo FROM equipos ORDER BY nombre";
$stmt = $conn->prepare($query);

$stmt->execute();
$resultado = $stmt->get_result();

$equipos = [];

if ($resultado->num_rows > 0) {
    while ($fila = $resultado->fetch_assoc()) {
        $equipos[] = [
            'nombre' => $fila['nombre'],
            'id' => $fila['id'],
            'escudo' => 'data:image/jpeg;base64,' . base64_encode($fila['escudo']),
        ];
    }
}

$stmt->close();
$conn->close();

// Devolver los resultados como JSON
header('Content-Type: application/json');
$salida["success"] = $equipos;