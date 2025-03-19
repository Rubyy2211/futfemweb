<?php
require_once "includes/conexion-bbdd.php"; // Asegúrate de que esta ruta sea correcta
if (!isset($conn)) die();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $equipo_id = $_POST['equipo_id'] ?? null;
    $liga = $_POST['liga'] ?? null;
    $nombre = $_POST['nombre'] ?? null;

    // 🔍 Verificar si se recibió la imagen
    error_log("Datos recibidos: " . print_r($_POST, true));
    error_log("Archivos recibidos: " . print_r($_FILES, true));

    $imagen = null;
    if (isset($_FILES['Imagen']) && $_FILES['Imagen']['error'] === UPLOAD_ERR_OK) {
        $imagen = file_get_contents($_FILES['Imagen']['tmp_name']);
    }

    // Construir la consulta dinámicamente
    $query = "UPDATE equipos SET nombre = ?, liga = ?";
    $params = [$nombre, $liga];
    $types = "si"; // i: int, s: string

    if ($imagen !== null) {
        $query .= ", escudo = ?";
        $params[] = $imagen;
        $types .= "s"; // Tipo "b" para datos binarios
    }
    $salida = [];
    $query .= " WHERE id_equipo = ?";
    $params[] = $equipo_id;
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

