<?php
require_once "includes/conexion-bbdd.php"; // Asegúrate de que esta ruta sea correcta
if (!isset($conn)) die();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $trayectoria_id = $_POST['trayectoria_id'] ?? null;
    $equipo_id = $_POST['equipo'] ?? null;
    $años = $_POST['años'] ?? null;
    $equipo_actual = isset($_POST['equipo_actual']) ? 1 : 0;

    if (!$trayectoria_id || !$equipo_id || !$años) {
        echo json_encode(["error" => "Todos los campos son obligatorios"]);
        exit;
    }

    // 🔍 Verificar si se recibió la imagen
    error_log("Datos recibidos: " . print_r($_POST, true));
    error_log("Archivos recibidos: " . print_r($_FILES, true));

    $imagen = null;
    if (isset($_FILES['Imagen']) && $_FILES['Imagen']['error'] === UPLOAD_ERR_OK) {
        $imagen = file_get_contents($_FILES['Imagen']['tmp_name']);
    }

    // Construir la consulta dinámicamente
    $query = "UPDATE trayectoria SET equipo = ?, años = ?, equipo_actual = ?";
    $params = [$equipo_id, $años, $equipo_actual];
    $types = "isi"; // i: int, s: string

    if ($imagen !== null) {
        $query .= ", imagen = ?";
        $params[] = $imagen;
        $types .= "s"; // Tipo "b" para datos binarios
    }
    $salida = [];
    $query .= " WHERE id = ?";
    $params[] = $trayectoria_id;
    $types .= "i";

    // Preparar y ejecutar la consulta
    if ($stmt = $conn->prepare($query)) {
        $stmt->bind_param($types, ...$params);
        if ($stmt->execute()) {
            $salida = ["success" => "Registro actualizado correctamente"];
        } else {
            $salida = ["error" => "Error al actualizar: " . $stmt->error];
        }
        $stmt->close();
    } else {
        $salida = ["error" => "Error en la preparación de la consulta"];
    }

    $conn->close();
} else {
    $salida = ["error" => "Método no permitido"];
}
?>

