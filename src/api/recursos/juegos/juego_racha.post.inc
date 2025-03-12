<?php
require_once "includes/conexion-bbdd.php"; // Asegúrate de que esta ruta sea correcta
if (!isset($conn)) die();

// Obtener el ID de la jugadora desde la petición GET
$juego = $_POST['juego'] ?? null;
$usuario = $_POST['user'] ?? null;
$racha = $_POST['racha'] ?? null;

// Verifica si se recibieron correctamente los parámetros
if (!isset($racha) || !isset($juego) || !isset($usuario)) {
    echo json_encode(["error" => "Datos incompletos", $juego, $racha, $usuario]);
    exit;
}

// Preparar y ejecutar la consulta
$query = "
UPDATE rachas
SET racha = ?
WHERE id_usuario = ?
AND id_juego = ?;
";

$stmt = $conn->prepare($query);

// Asignar el parámetro
$stmt->bind_param("iii", $racha, $usuario, $juego);

$stmt->execute();

// Verificar si la actualización fue exitosa
if ($stmt->affected_rows > 0) {
    // Si la actualización fue exitosa, devolver un mensaje de éxito
    $response = [
        'success' => true,
        'message' => 'Racha actualizada correctamente',
        'racha' => $racha,
        'usuario' => $usuario,
        'juego' => $juego
    ];
} else {
    // Si no se actualizó ninguna fila, devolver un error
    $response = [
        'error' => 'No se encontraron registros para actualizar o no hubo cambios.'
    ];
}

$stmt->close();
$conn->close();

// Devolver el resultado como JSON
header('Content-Type: application/json');
$salida=$response;
?>
