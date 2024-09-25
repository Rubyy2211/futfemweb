<?php
require_once "includes/conexion-bbdd.php";

// Obtener los IDs pasados por GET como un array
$ids = isset($_GET['id']) ? $_GET['id'] : [];

if (!empty($ids)) {
    // Sanitizar y validar los IDs
    $ids = array_map('intval', $ids);

    // Crear la cláusula IN para la consulta SQL
    $placeholders = implode(',', array_fill(0, count($ids), '?'));
    $query = "SELECT id_liga AS liga, nombre, logo FROM ligas WHERE id_liga IN ($placeholders)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param(str_repeat('i', count($ids)), ...$ids);

    $stmt->execute();
    $resultado = $stmt->get_result();
    $paises = [];

    if ($resultado->num_rows > 0) {
        while ($fila = $resultado->fetch_assoc()) {
            $paises[] = [
                'nombre' => $fila['nombre'],
                'bandera' => base64_encode($fila['logo']), // Codificar la imagen en base64
                'liga' => $fila['liga'],
            ];
        }
    }

    $stmt->close();
    $conn->close();

    // Devolver los resultados como JSON
    header('Content-Type: application/json');
    $salida["success"] = $paises;

} else {
    // Si no se proporcionaron todos los IDs necesarios
    $salida["error"] = "Faltan parámetros o no se encontraron resultados.";
}

