<?php
require_once "includes/conexion-bbdd.php"; // Asegúrate de que esta ruta sea correcta
if (!isset($conn)) die();

// Obtener el ID del equipo desde la petición GET
$idEquipo = isset($_GET['equipo']) ? intval($_GET['equipo']) : 0;

if ($idEquipo <= 0) {
    echo json_encode(["error" => "ID del equipo no proporcionado o inválido"]);
    exit;
}

// Preparar y ejecutar la consulta para obtener la información de la jugadora y su trayectoria
$query = "
SELECT 
    jugadoras.*,
    trayectoria.jugadora,
    trayectoria.equipo_actual,
    trayectoria.equipo,
    equipos.escudo  -- Añadimos el escudo del equipo
FROM 
    jugadoras
JOIN 
    trayectoria 
ON 
    jugadoras.id_jugadora = trayectoria.jugadora
JOIN
    equipos  -- Unimos la tabla equipos
ON
    trayectoria.equipo = equipos.id_equipo  -- Relacionamos trayectoria con equipos
WHERE 
    trayectoria.equipo_actual = 1 
    AND trayectoria.equipo = ?
ORDER BY 
    jugadoras.Posicion;
";

$stmt = $conn->prepare($query);
$stmt->bind_param("i", $idEquipo); // Usar el ID del equipo
$stmt->execute();
$result = $stmt->get_result();

$data = [];
while ($row = $result->fetch_assoc()) {
    // Codificar la imagen de la jugadora en base64 si está disponible
    if (!empty($row['imagen'])) {
        $row['imagen'] = 'data:image/jpeg;base64,' . base64_encode($row['imagen']);
    }
    if (!empty($row['equipo'])) {
        $row['equipo'] = 'data:image/jpeg;base64,' . base64_encode($row['equipo']);
    }
    if (!empty($row['escudo'])) {
        $row['escudo'] = 'data:image/jpeg;base64,' . base64_encode($row['escudo']);
    }
    // Codificar otros datos si es necesario
    $data[] = $row;
}

$stmt->close();
$conn->close();

// Devolver los resultados como JSON
header('Content-Type: application/json');
$salida=$data;
?>
