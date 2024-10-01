<?php
require_once "includes/conexion-bbdd.php";

if(!isset($conn)) die();

$query = "SELECT idPosicion AS id, nombre FROM posiciones WHERE idPosicionPadre is null";
$stmt = $conn->prepare($query);

$stmt->execute();
$resultado = $stmt->get_result();

$posiciones = [];

if ($resultado->num_rows > 0) {
    while ($fila = $resultado->fetch_assoc()) {
        $posiciones[] = [
            'nombre' => $fila['nombre'],            
            'id' => $fila['id'],
        ];
    }
}

$stmt->close();
$conn->close();

// Devolver los resultados como JSON
header('Content-Type: application/json');
$salida["success"] = $posiciones;