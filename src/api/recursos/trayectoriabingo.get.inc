<?php
require_once "includes/conexion-bbdd.php"; // Asegúrate de que esta ruta sea correcta

// Obtener el nombre de la jugadora desde la petición GET
$nombre = isset($_GET['nombre']) ? trim($_GET['nombre']) : '';

if (!$nombre) {
    $salida["error"] = "Nombre de jugadora no proporcionado";
    echo json_encode($salida);
    exit;
}

// Preparar y ejecutar la consulta
$query = "
SELECT 
    'Equipo de Trayectoria' AS Tipo,
    t.equipo AS Equipo,
    t.imagen AS JugadoraImagen,
    e.liga
FROM 
    trayectoria t
JOIN 
    jugadoras j ON j.id_jugadora = t.jugadora
JOIN 
    equipos e ON t.equipo = e.id_equipo
WHERE 
    CONCAT(j.Nombre, ' ', j.apellidos) = ?
ORDER BY 
    t.años DESC;
";

$stmt = $conn->prepare($query);
$searchTerm = "%$nombre%"; // Modificar el término de búsqueda
$stmt->bind_param("s", $nombre); // Usar el término de búsqueda modificado
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

$salida=$data;
?>

