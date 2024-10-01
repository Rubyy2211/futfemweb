<?php
require_once "includes/conexion-bbdd.php"; // Asegúrate de que la conexión se haya establecido correctamente
if (!isset($conn)) die(); // Termina si la conexión no está establecida

// Verificar que el parámetro id_jugadora ha sido pasado
if (isset($_GET['id_jugadora'])) {
    $id_jugadora = intval($_GET['id_jugadora']); // Sanitizar la entrada

    // Preparar la consulta
    $query = "SELECT Apodo FROM jugadoras WHERE id_jugadora = ?"; // Selecciona el apodo
    $stmt = $conn->prepare($query);

    // Verificar si la preparación fue exitosa
    if ($stmt) {
        // Bind del parámetro
        $stmt->bind_param("i", $id_jugadora);

        // Ejecutar la consulta
        $stmt->execute();

        // Obtener el resultado
        $resultado = $stmt->get_result();

        if ($resultado->num_rows > 0) {
            $fila = $resultado->fetch_assoc();
            $palabra = $fila['Apodo'];
        } else {
            $palabra = ""; // En caso de que no haya resultados
        }

        // Cerrar la consulta
        $stmt->close();
    } else {
        echo json_encode(['error' => 'Error al preparar la consulta.']);
        exit();
    }

    // Cerrar la conexión
    $conn->close();

    // Devolver la palabra como JSON
    header('Content-Type: application/json'); // Asegúrate de que el contenido sea JSON
    $salida=$palabra; // Envía el apodo en un objeto JSON
} else {
    $salida['error'] = 'No se proporcionó id_jugadora.';
}
