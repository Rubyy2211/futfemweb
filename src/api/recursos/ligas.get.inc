<?php
require_once "includes/conexion-bbdd.php";

// Obtener los IDs pasados por GET
$id1 = isset($_GET['id1']) ? intval($_GET['id1']) : null;
$id2 = isset($_GET['id2']) ? intval($_GET['id2']) : null;
$id3 = isset($_GET['id3']) ? intval($_GET['id3']) : null;

if ($id1 !== null && $id2 !== null && $id3 !== null) {
    $query = "SELECT nombre, logo FROM ligas WHERE id_liga IN (?, ?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("iii", $id1, $id2, $id3);

    $stmt->execute();
    $resultado = $stmt->get_result();

    $paises = [];

    if ($resultado->num_rows > 0) {
        while ($fila = $resultado->fetch_assoc()) {
            $paises[] = [
                'nombre' => $fila['nombre'],
                'bandera' => base64_encode($fila['logo']) // Codificar la imagen en base64
            ];
        }
    }

    $stmt->close();
    $conn->close();

    // Devolver los resultados como JSON
    header('Content-Type: application/json');
    $salida["success"] = $paises;

} else {
    // Si no se encontraron huertos disponibles, agregar un mensaje de error
    $salida["error"] = "No hay huertos pais";
}

