<?php
require_once "includes/conexion-bbdd.php";

// Obtener los IDs pasados por GET como un array
$ids = isset($_GET['id']) ? $_GET['id'] : [];

if (!empty($ids)) {
    // Sanitizar y validar los IDs
    $ids = array_map('intval', $ids);

    // Crear la cláusula IN para la consulta SQL
    $placeholders = implode(',', array_fill(0, count($ids), '?'));
    $query = "SELECT nombre, escudo, id_equipo FROM equipos WHERE id_equipo IN ($placeholders)";

    // Preparar y ejecutar la consulta
    $stmt = $conn->prepare($query);
    $stmt->bind_param(str_repeat('i', count($ids)), ...$ids);

    $stmt->execute();
    $resultado = $stmt->get_result();

    $equipos = [];

    if ($resultado->num_rows > 0) {
        while ($fila = $resultado->fetch_assoc()) {
            $equipos[] = [
                'club' =>$fila['id_equipo'],
                'nombre' => $fila['nombre'],
                'escudo' => 'data:image/jpeg;base64,' . base64_encode($fila['escudo'])
            ];
        }
    }


    $stmt->close();
    $conn->close();

    // Devolver los resultados como JSON
    header('Content-Type: application/json');
    $salida["success"] = $equipos;

} else {
    // Si no se proporcionaron todos los IDs necesarios
    $salida["error"] = "Faltan parámetros o no se encontraron resultados.";
}

?>
