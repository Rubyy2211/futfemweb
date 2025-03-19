<?php
require_once "includes/conexion-bbdd.php";
if (!isset($conn)) die();

// Manejo de errores para salida JSON
header("Content-Type: application/json");

// Variables del formulario
$liga = $_POST['liga'] ?? null;
$nombre = $_POST['nombre'] ?? null;

// Validar campos obligatorios
if (!$nombre || !$liga) {
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
        $query = "INSERT INTO equipos (liga, nombre, escudo) 
              VALUES (?, ?, ?)";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("iss", $liga,$nombre, $imagenBinaria);
    } else {
        $query = "INSERT INTO equipos (liga, nombre) 
              VALUES (?, ?)";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("is", $liga,$nombre);
    }

    // Ejecutar la consulta
    $stmt->execute();

    // Confirmar inserción
    if ($stmt->affected_rows > 0) {
        $salida = ["success" => "Equipo insertado correctamente"];
    } else {
        $salida = ["error" => "No se pudo insertar el equipo"];
    }

    $stmt->close();
} catch (Exception $e) {
    $salida = ["error" => "Error al insertar equipo: " . $e->getMessage()];
}

// Cerrar conexión
$conn->close();
?>
