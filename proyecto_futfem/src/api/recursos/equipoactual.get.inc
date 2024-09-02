<?php
require_once "includes/conexion-bbdd.php"; // Asegúrate de que esta ruta sea correcta

// Obtener el nombre de la jugadora desde la petición GET
$nombre = isset($_GET['nombre']) ? trim($_GET['nombre']) : '';

if (!$nombre) {
    $salida["error"]="Nombre de jugadora no proporcionado";
    exit;
}

// Preparar y ejecutar la consulta
$query = "
SELECT 
    'Equipo de Jugadora' AS Tipo,
    j.equipo AS Equipo,
    j.imagen AS JugadoraImagen
FROM 
    jugadoras j
WHERE 
    j.Nombre = ?

UNION ALL

SELECT 
    'Equipo de Trayectoria' AS Tipo,
    t.equipo AS Equipo,
    t.imagen AS JugadoraImagen
FROM 
    trayectoria t
JOIN 
    jugadoras j ON j.id_jugadora = t.jugadora
WHERE 
    j.Nombre = ?
";

$stmt = $conn->prepare($query);
$stmt->bind_param("ss", $nombre, $nombre); // Usar dos veces el parámetro para ambas partes del UNION ALL
$stmt->execute();
$result = $stmt->get_result();

$data = [];
while ($row = $result->fetch_assoc()) {
    // Convertir el BLOB de la imagen a base64
    if (!empty($row['JugadoraImagen'])) {
        $row['JugadoraImagen'] = 'data:image/jpeg;base64,' . base64_encode($row['JugadoraImagen']);
    }
    $data[] = $row;
}

$stmt->close();
$conn->close();

// Devolver los resultados como JSON
$salida=$data;

?>
