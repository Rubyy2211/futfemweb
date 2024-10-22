<?php
require_once "includes/conexion-bbdd.php"; // Asegúrate de que esta ruta sea correcta
if(!isset($conn)) die();

// Obtener el ID de la jugadora desde la petición GET
$idJugadora = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($idJugadora <= 0) {
    echo json_encode(["error" => "ID de jugadora no proporcionado o inválido"]);
    exit;
}

// Preparar y ejecutar la consulta para obtener la información de la jugadora y su trayectoria
$query = "
    SELECT 
    trayectoria.jugadora, 
    trayectoria.equipo, 
    trayectoria.años, 
    trayectoria.imagen, 
    equipos.escudo, 
    equipos.liga, 
    equipos.nombre,
    jugadoras.imagen AS ImagenJugadora 
FROM 
    trayectoria 
JOIN 
    equipos ON trayectoria.equipo = equipos.id_equipo 
JOIN 
    jugadoras ON trayectoria.jugadora = jugadoras.id_jugadora 
WHERE 
    trayectoria.jugadora = ?
AND equipos.liga != 17
ORDER BY 
    trayectoria.años;
";

$stmt = $conn->prepare($query);
$stmt->bind_param("i", $idJugadora); // Usar el ID de la jugadora
$stmt->execute();
$result = $stmt->get_result();

$data = [];
while ($row = $result->fetch_assoc()) {
    // Codificar la imagen de la jugadora en base64 si está disponible
    if (!empty($row['imagen'])) {
        $row['imagen'] = 'data:image/jpeg;base64,' . base64_encode($row['imagen']);
    }
    if (!empty($row['ImagenJugadora'])) {
        $row['ImagenJugadora'] = 'data:image/jpeg;base64,' . base64_encode($row['ImagenJugadora']);
    }
    // Codificar el escudo del equipo en base64 si está disponible
    if (!empty($row['escudo'])) {
        $row['escudo'] = 'data:image/jpeg;base64,' . base64_encode($row['escudo']);
    }
    $data[] = $row;
}

$stmt->close();
$conn->close();

// Devolver los resultados como JSON
$salida=$data;

