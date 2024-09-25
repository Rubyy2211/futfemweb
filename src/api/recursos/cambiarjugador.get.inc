<?php
require_once "includes/conexion-bbdd.php";

// Obtener los parámetros como arrays
$nacionalidades = isset($_GET['nacionalidades']) ? $_GET['nacionalidades'] : [];
$equipos = isset($_GET['equipos']) ? $_GET['equipos'] : [];
$ligas = isset($_GET['ligas']) ? $_GET['ligas'] : [];
// Asegúrate de que estás recibiendo los arrays correctamente
// En vez de var_dump, usa error_log para registrar
error_log(print_r($nacionalidades, true));
error_log(print_r($equipos, true));
error_log(print_r($ligas, true));

$conditions = [];
$params = [];

// Si hay nacionalidades, sanitizar y crear placeholders
if (!empty($nacionalidades)) {
    $nacionalidades = array_map('intval', $nacionalidades); // Sanitizar
    $placeholders = implode(',', array_fill(0, count($nacionalidades), '?'));
    $conditions[] = "jugadoras.nacionalidad IN ($placeholders)";
    $params = array_merge($params, $nacionalidades);
}

// Si hay equipos, sanitizar y crear placeholders
if (!empty($equipos)) {
    $equipos = array_map('intval', $equipos); // Sanitizar
    $placeholders = implode(',', array_fill(0, count($equipos), '?'));
    $conditions[] = "trayectoria.equipo IN ($placeholders)";
    $params = array_merge($params, $equipos);
}

// Si hay ligas, sanitizar y crear placeholders
if (!empty($ligas)) {
    $ligas = array_map('intval', $ligas); // Sanitizar
    $placeholders = implode(',', array_fill(0, count($ligas), '?'));
    $conditions[] = "equipos.liga IN ($placeholders)";
    $params = array_merge($params, $ligas);
}

// Verificar si hay condiciones para filtrar
if (!empty($conditions)) {
    $query = "SELECT jugadoras.id_jugadora, 
                     CONCAT(jugadoras.Nombre, ' ', jugadoras.apellidos) AS nombre, 
                     jugadoras.imagen, 
                     jugadoras.nacionalidad, 
                     jugadoras.Nacimiento
              FROM jugadoras
              JOIN trayectoria ON trayectoria.jugadora = jugadoras.id_jugadora
              JOIN equipos ON trayectoria.equipo = equipos.id_equipo
              WHERE " . implode(' OR ', $conditions) . " 
              ORDER BY RAND() 
              LIMIT 1";

    // Preparar la consulta
    $stmt = $conn->prepare($query);

    // Ejecutar la consulta con los parámetros
    $stmt->execute($params);
    $resultado = $stmt->get_result();
    $salida=[];
    if ($resultado->num_rows > 0) {
        $fila = $resultado->fetch_assoc();
        $jugadora = array(
            'nombre' => $fila['nombre'],
            'imagen' => 'data:image/jpeg;base64,' . base64_encode($fila['imagen']), // Codificar la imagen en base64
            'pais' => $fila['nacionalidad'],
            'id' => $fila['id_jugadora'],
            'Nacimiento' => $fila['Nacimiento'],
        );
    } else {
        $jugadora = array(
            'nombre' => "",
            'imagen' => "",
            'pais' => '',
            'id' => '',
            'Nacimiento' => '',
        );
    }

    $stmt->close();
} else {
    // Si no hay condiciones, devolver respuesta vacía
    $jugadora = array(
        'nombre' => "",
        'imagen' => "",
        'pais' => '',
        'id' => '',
        'Nacimiento' => '',
    );
}

$conn->close();

// Devolver el jugador como JSON
header('Content-Type: application/json');
$salida=$jugadora;
?>
