<?php
require_once "includes/conexion-bbdd.php"; // Asegúrate de que esta ruta sea correcta
if (!isset($conn)) die();

// Obtener los datos de la solicitud POST
$input = json_decode(file_get_contents('php://input'), true);

$nombre = $input['nombre'] ?? null;
$apellidos = $input['apellidos'] ?? null;
$apodo = $input['apodo'] ?? null;
$nacimiento = $input['nacimiento'] ?? null;
$nacionalidad = $input['nacionalidad'] ?? null;
$posicion = $input['posicion'] ?? null;
$imagen = $input['imagen'] ?? null; // Suponiendo que la imagen es un base64
$retiro = $input['retiro'] ?? null;

// Validar campos obligatorios
if (!$nombre || !$apellidos || !$nacimiento || !$nacionalidad || !$posicion) {
    echo json_encode(["error" => "Faltan campos obligatorios"]);
    exit;
}

try {
    // Preparar la consulta
    $query = "
        INSERT INTO jugadoras (Nombre, Apellidos, Apodo, Nacimiento, Nacionalidad, Posicion, imagen, Retiro)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ";
    $stmt = $conn->prepare($query);

    // Convertir la imagen de base64 a binario, si es necesario
    $imagenBinaria = $imagen ? base64_decode($imagen) : null;

    $stmt->bind_param(
        "ssssiiss",
        $nombre,
        $apellidos,
        $apodo,
        $nacimiento,
        $nacionalidad,
        $posicion,
        $imagenBinaria,
        $retiro
    );

    // Ejecutar la consulta
    $stmt->execute();

    // Confirmar inserción
    if ($stmt->affected_rows > 0) {
        $salida["success"] = "Jugadora insertada correctamente";
    } else {
        $salida["success"] = "No se pudo insertar la jugadora";
    }

    $stmt->close();
} catch (Exception $e) {

    echo $salida["error"] = "Error al insertar jugadora: " . $e->getMessage();
}

$conn->close();
?>

