<?php
require_once "includes/conexion-bbdd.php";

// Obtener los IDs pasados por GET como un array
$ids = $_GET['id'] ?? [];
if(!isset($conn)) die();

// Validar que se ha pasado al menos un ID
if (!empty($ids)) {
    // Sanitizar y validar los IDs
    $ids = array_map('intval', $ids);

    // Crear la cláusula IN para la consulta SQL
    $placeholders = implode(',', array_fill(0, count($ids), '?'));
    $query = "SELECT nombre, bandera, id_pais FROM paises WHERE id_pais IN ($placeholders)";

    // Preparar y ejecutar la consulta
    $stmt = $conn->prepare($query);
    $stmt->bind_param(str_repeat('i', count($ids)), ...$ids);

    $stmt->execute();
    $resultado = $stmt->get_result();

    $paises = [];

    if ($resultado->num_rows > 0) {
        while ($fila = $resultado->fetch_assoc()) {
            $paises[] = [
                'nombre' => $fila['nombre'],
                'bandera' => base64_encode($fila['bandera']), // Codificar la imagen en base64
                'pais' => $fila['id_pais'],
            ];
        }
    }

    $stmt->close();
    $conn->close();

    // Devolver los resultados como JSON
    header('Content-Type: application/json');
    $salida['success'] = $paises;

} else {
    // Si no se encontraron IDs, devolver un mensaje de error
    header('Content-Type: application/json');
    $salida['error'] = "No se han proporcionado IDs de países";
}
