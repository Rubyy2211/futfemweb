<?php
require_once "includes/conexion-bbdd.php"; // Asegúrate de que esta ruta sea correcta
if (!isset($conn)) die();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $jugadora_id = $_POST['jugadora_id'] ?? null;
    $nombre = $_POST['nombre'] ?? null;
    $apellidos = $_POST['apellidos'] ?? null;
    $apodo = $_POST['apodo'] ?? null;
    $nacimiento = $_POST['nacimiento'] ?? null;
    $nacionalidad = $_POST['nacionalidad'] ?? null;
    $posicion = $_POST['posicion'] ?? null;
    $retiro = $_POST['retiro'] ?? null;

    // 🔍 Verificar si se recibió la imagen
    error_log("Datos recibidos: " . print_r($_POST, true));
    error_log("Archivos recibidos: " . print_r($_FILES, true));

    $imagen = null;
    if (isset($_FILES['Imagen']) && $_FILES['Imagen']['error'] === UPLOAD_ERR_OK) {
        $imagen = file_get_contents($_FILES['Imagen']['tmp_name']);
    }

    // Construir la consulta dinámicamente
    $query = "UPDATE jugadoras SET Nombre = ?, Apellidos = ?, Apodo = ?, Nacimiento = ?, Nacionalidad = ?, Posicion = ?, retiro = ?";
    $params = [$nombre, $apellidos, $apodo, $nacimiento, $nacionalidad, $posicion, $retiro];
    $types = "ssssiii"; // i: int, s: string

    if ($imagen !== null) {
        $query .= ", imagen = ?";
        $params[] = $imagen;
        $types .= "s"; // Tipo "b" para datos binarios
    }
    $salida = [];
    $query .= " WHERE id_jugadora = ?";
    $params[] = $jugadora_id;
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

