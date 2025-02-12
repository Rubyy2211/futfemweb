<?php
require_once "includes/conexion-bbdd.php"; // Asegúrate de que esta ruta sea correcta
if(!isset($conn)) die();

// Obtener el ID de la jugadora desde la petición GET
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id === 0) {
    echo json_encode(["error" => "ID de jugadora no proporcionado"]);
    exit;
}

// Preparar y ejecutar la consulta
$query = "
SELECT 
    id_jugadora, Nombre, Apellidos, imagen, apodo, Nacimiento, Nacionalidad, Posicion, retiro
FROM 
    jugadoras
WHERE 
    id_jugadora = ?;
";

$stmt = $conn->prepare($query);

// Asignar el parámetro
$stmt->bind_param("i", $id);

$stmt->execute();
$result = $stmt->get_result();

$jugadora = [];

if ($result->num_rows > 0) {
    while ($fila = $result->fetch_assoc()) {
        $jugadora[] = [
            'id_jugadora' => $fila['id_jugadora'],
            'Nombre_Completo' => $fila['Nombre'] . ' ' . $fila['Apellidos'], // Concatenación correcta
            'Imagen' => 'data:image/jpeg;base64,' . base64_encode($fila['imagen']), // Codificar la imagen en base64
            'Apodo' => $fila['apodo'],
            'Nombre' => $fila['Nombre'],
            'Apellidos' => $fila['Apellidos'],
            'Nacimiento' => $fila['Nacimiento'],
            'Nacionalidad' => $fila['Nacionalidad'],
            'Posicion' => $fila['Posicion'],
            'Retiro' => $fila['retiro'],
        ];
    }
} else {
    $jugadora['error'] = "No se encontraron jugadoras con ese ID.";
}

$stmt->close();
$conn->close();

// Devolver el resultado como JSON
header('Content-Type: application/json');
$salida=$jugadora;

