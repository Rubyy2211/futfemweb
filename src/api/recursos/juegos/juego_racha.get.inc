<?php
require_once "includes/conexion-bbdd.php"; // Asegúrate de que esta ruta sea correcta
if(!isset($conn)) die();

// Obtener el ID de la jugadora desde la petición GET
$juego = isset($_GET['juego']) ? intval($_GET['juego']) : 0;
$usuario = isset($_GET['user']) ? intval($_GET['user']) : 0;

if ($juego === 0 ||$usuario === 0) {
    echo json_encode(["error" => "ID de jugadora no proporcionado"]);
    exit;
}

// Preparar y ejecutar la consulta
$query = "
SELECT 
    *
FROM 
    rachas
WHERE 
    id_usuario = ?
AND 
    id_juego = ?;
";

$stmt = $conn->prepare($query);

// Asignar el parámetro
$stmt->bind_param("ii", $usuario, $juego);

$stmt->execute();
$result = $stmt->get_result();

$jugadora = [];

if ($result->num_rows > 0) {
    while ($fila = $result->fetch_assoc()) {
        $jugadora[] = [
            'Racha' => $fila['racha'],
            'Juego' => $fila['id_juego'],
            'Usuario' => $fila['id_usuario'],
        ];
    }
} else {
    $jugadora['error'] = "No se encontraron registros de ese juego.";
    // Preparar y ejecutar la consulta
}

$stmt->close();
$conn->close();

// Devolver el resultado como JSON
header('Content-Type: application/json');
$salida=$jugadora;

