<?php
require_once "includes/conexion-bbdd.php"; // Asegúrate de que esta ruta sea correcta
require "../app/prueba_imagen.php"; // Asegúrate de que esta ruta sea correcta
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
    $ruta_imagen = $_POST['ruta'] ?? null;
    $imagen_subida = false;

    // 🔍 Verificar si se recibió la imagen
    error_log("Datos recibidos: " . print_r($_POST, true));
    error_log("Archivos recibidos: " . print_r($_FILES, true));

    // 📸 Subir imagen solo si se ha enviado un archivo válido
    if (isset($_FILES['Imagen']) && $_FILES['Imagen']['error'] === UPLOAD_ERR_OK && !empty($ruta_imagen)) {
        if (subirOActualizarImagen($_FILES['Imagen'], $ruta_imagen)) {
            $imagen_subida = true;
            error_log("✅ Imagen actualizada correctamente: $ruta_imagen");
        } else {
            error_log("⚠️ Error al procesar la imagen");
        }
    }


    // Construir la consulta dinámicamente
    $query = "UPDATE jugadoras SET Nombre = ?, Apellidos = ?, Apodo = ?, Nacimiento = ?, Nacionalidad = ?, Posicion = ?, retiro = ?";
    $params = [$nombre, $apellidos, $apodo, $nacimiento, $nacionalidad, $posicion, $retiro];
    $types = "ssssiii"; // i: int, s: string

    // ✅ Actualizar ruta imagen si se ha subido una nueva o si se ha modificado manualmente
    if ($imagen_subida || (!empty($ruta_imagen) && !isset($_FILES['Imagen']))) {
        $query .= ", imagen = ?";
        $params[] = $ruta_imagen;
        $types .= "s";
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

