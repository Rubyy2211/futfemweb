<?php
// Conexión a la base de datos
require_once "includes/conexion-bbdd.php"; // Asegúrate de tener tu archivo de conexión aquí

// Verificar que el parámetro id_juego ha sido pasado correctamente (puede venir de un formulario o URL)
if (isset($_GET['id_juego']) && isset($_POST['valor'])) {
    $id_juego = intval($_GET['id_juego']); // Sanitizar la entrada
    $nuevoValor = $_POST['valor']; // Obtener el nuevo valor de la solicitud POST (asegúrate de que esto sea un JSON válido)

    // Verificar que el JSON sea válido
    json_decode($nuevoValor);
    if (json_last_error() !== JSON_ERROR_NONE) {
        $salida['error']='El valor proporcionado no es un JSON válido.';
        exit;
    }

    if (!isset($conn)) die();

    // Preparar la consulta de actualización
    $query = "UPDATE pistas SET valor = ? WHERE id_juego = ?";

    if ($stmt = $conn->prepare($query)) {
        // Bind del parámetro
        $stmt->bind_param("si", $nuevoValor, $id_juego); // 's' para string, 'i' para integer

        // Ejecutar la consulta
        if ($stmt->execute()) {
            // Si la actualización fue exitosa
            $salida['success'] = 'El valor ha sido actualizado correctamente.';
        } else {
            $salida['error'] = 'Error al actualizar el valor.';
        }

        // Cerrar la consulta
        $stmt->close();
    } else {
        echo json_encode(['error' => 'Error al preparar la consulta de actualización.']);
    }

    // Cerrar la conexión
    $conn->close();
} else {
    echo json_encode(['error' => 'No se proporcionaron id_juego o valor.']);
}
