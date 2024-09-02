<?php
require_once "includes/conexion-bbdd.php";

// Obtener los IDs pasados por GET
$id1 = isset($_GET['id1']) ? intval($_GET['id1']) : null;
$id2 = isset($_GET['id2']) ? intval($_GET['id2']) : null;
$id3 = isset($_GET['id3']) ? intval($_GET['id3']) : null;

if ($id1 !== null && $id2 !== null && $id3 !== null) {
    $query = "SELECT nombre, escudo, id_equipo FROM equipos WHERE id_equipo IN (?, ?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("iii", $id1, $id2, $id3);

    $stmt->execute();
    $resultado = $stmt->get_result();

    $paises = [];

    if ($resultado->num_rows > 0) {
        while ($fila = $resultado->fetch_assoc()) {
            $equipos[] = [
                'club' =>$fila['id_equipo'],
                'nombre' => $fila['nombre'],
                'escudo' => $fila['escudo'] // Usar directamente la URL del escudo
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
