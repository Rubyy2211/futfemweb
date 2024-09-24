<?php
require_once "includes/conexion-bbdd.php";


$query = "SELECT id_pais AS id, nombre FROM paises ORDER BY nombre";
$stmt = $conn->prepare($query);

$stmt->execute();
$resultado = $stmt->get_result();

$paises = [];

if ($resultado->num_rows > 0) {
    while ($fila = $resultado->fetch_assoc()) {
        $paises[] = [
            'nombre' => $fila['nombre'],            
            'id' => $fila['id'],
        ];
    }
}

$stmt->close();
$conn->close();

// Devolver los resultados como JSON
header('Content-Type: application/json');
$salida["success"] = $paises;