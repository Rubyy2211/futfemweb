<?php
require_once "includes/conexion-bbdd.php";
if (!isset($conn)) die();

// Manejo de errores para salida JSON
header("Content-Type: application/json");

// Variables del formulario
$nombre = $_POST['nombre'] ?? null;
$apellidos = $_POST['apellidos'] ?? null;
$apodo = $_POST['apodo'] ?? null;
$nacimiento = $_POST['nacimiento'] ?? null;
$nacionalidad = $_POST['nacionalidad'] ?? null;
$posicion = $_POST['posicion'] ?? null;
$retiro = isset($_POST['retiro']) ? $_POST['retiro'] : null;

// Validar campos obligatorios
if (!$nombre || !$apellidos || !$nacimiento || !$nacionalidad || !$posicion) {
    echo json_encode(["error" => "Faltan campos obligatorios"]);
    exit;
}

// Manejo de imagen (opcional)
$imagenBinaria = null;
if (!empty($_FILES['imagen']['tmp_name']) && $_FILES['imagen']['error'] === UPLOAD_ERR_OK) {
    $imagenBinaria = file_get_contents($_FILES['imagen']['tmp_name']);
}

try {
    // Preparar la consulta

    // Si no hay imagen, pasamos NULL
    if ($imagenBinaria) {
        $query = "INSERT INTO jugadoras (Nombre, Apellidos, Apodo, Nacimiento, Nacionalidad, Posicion, imagen, Retiro) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("ssssiiss", $nombre, $apellidos, $apodo, $nacimiento, $nacionalidad, $posicion, $imagenBinaria, $retiro);
    } else {
        $query = "INSERT INTO jugadoras (Nombre, Apellidos, Apodo, Nacimiento, Nacionalidad, Posicion, Retiro) 
              VALUES (?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("ssssiis", $nombre, $apellidos, $apodo, $nacimiento, $nacionalidad, $posicion, $retiro);
    }

    // Ejecutar la consulta
    $stmt->execute();

    // Confirmar inserción
    if ($stmt->affected_rows > 0) {
        $salida = ["success" => "Jugadora insertada correctamente"];
    } else {
        $salida = ["error" => "No se pudo insertar la jugadora"];
    }

    $stmt->close();
} catch (Exception $e) {
    $salida = ["error" => "Error al insertar jugadora: " . $e->getMessage()];
}

// Cerrar conexión
$conn->close();
?>
