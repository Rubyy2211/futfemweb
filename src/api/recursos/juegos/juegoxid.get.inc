<?php
// Conexión a la base de datos
require_once "includes/conexion-bbdd.php"; // Asegúrate de tener tu archivo de conexión aquí

// Verificar que el parámetro id_juego ha sido pasado correctamente (puede venir de un formulario o URL)
if (isset($_GET['id_juego'])) {
    $id_juego = intval($_GET['id_juego']); // Sanitizar la entrada
    if(!isset($conn)) die();

    // Preparar la consulta
    $query = "SELECT valor FROM pistas WHERE id_juego = ?";

    if ($stmt = $conn->prepare($query)) {
        // Bind del parámetro
        $stmt->bind_param("i", $id_juego);

        // Ejecutar la consulta
        $stmt->execute();

        // Obtener el resultado
        $resultado = $stmt->get_result();

        if ($resultado->num_rows > 0) {
            // Extraer los datos del campo valor (en formato JSON)
            $fila = $resultado->fetch_assoc();
            $valor = $fila['valor'];
            // Decodificar el JSON
            $valorDecodificado = json_decode($valor, true); // true convierte a un array asociativo
            // Devolver el resultado
            header('Content-Type: application/json');
            $salida['success']=$valorDecodificado; // Asegúrate de que el valor sea un JSON válido
        } else {
            // Si no se encuentra el id_juego
            echo json_encode(['error' => 'No se encontraron datos para el id_juego proporcionado.']);
        }

        // Cerrar la consulta
        $stmt->close();
    } else {
        echo json_encode(['error' => 'Error al preparar la consulta.']);
    }

    // Cerrar la conexión
    $conn->close();
} else {
    echo json_encode(['error' => 'No se proporcionó id_juego.']);
}

