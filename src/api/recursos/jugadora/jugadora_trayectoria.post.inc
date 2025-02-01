<?php
require_once "includes/conexion-bbdd.php"; // Asegúrate de que esta ruta sea correcta
if(!isset($conn)) die();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $jugadora_id = $_POST['jugadora_id'] ?? null;
    $equipo_id = $_POST['equipo_id'] ?? null;
    $años = $_POST['años'] ?? null;
    $equipo_actual = isset($_POST['equipo_actual']) ? 1 : 0;

    if (!$jugadora_id || !$equipo_id || !$años) {
        echo json_encode(["error" => "Todos los campos son obligatorios"]);
        exit;
    }

    $imagen = null;
    if (isset($_FILES['Imagen']) && $_FILES['Imagen']['error'] === UPLOAD_ERR_OK) {
        $imagen = file_get_contents($_FILES['Imagen']['tmp_name']);
    }

// Preparar y ejecutar la consulta
$query = "INSERT INTO trayectoria (jugadora, equipo, años, imagen, equipo_actual) VALUES (?, ?, ?, ?, ?)";
    $salida = [];
$stmt = $conn->prepare($query);

    if ($stmt = $conn->prepare($query)) {
        $stmt->bind_param("iissb", $jugadora_id, $equipo_id, $años, $imagen, $equipo_actual);

        if ($stmt->execute()) {
            $salida = [
                "success" => "Registro agregado correctamente",
                "id_insertado" => $conn->insert_id
            ];
        } else {
            $salida = [
                "error" => "Error al insertar datos: " . $stmt->error
            ];
        }

        $stmt->close();
    } else {
        echo json_encode(["error" => "Error en la preparación de la consulta"]);
    }

$conn->close();
} else {
    echo json_encode(["error" => "Método no permitido"]);
}


