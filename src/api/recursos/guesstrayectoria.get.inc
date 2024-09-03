<?php
require_once "includes/conexion-bbdd.php"; // Asegúrate de que esta ruta sea correcta

// Obtener el ID de la jugadora desde la petición GET
$idJugadora = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($idJugadora <= 0) {
    echo json_encode(["error" => "ID de jugadora no proporcionado o inválido"]);
    exit;
}

// Preparar y ejecutar la consulta para obtener la información de la jugadora y su trayectoria
$query = "
SELECT 
        'Equipo de Jugadora' AS Tipo,
        j.id_jugadora AS IdJugadora,
        j.equipo AS Equipo,
        e.escudo AS EscudoImagen,
        j.imagen AS JugadoraImagen
    FROM 
        jugadoras j
    JOIN 
        equipos e ON j.equipo = e.id_equipo
    WHERE 
        j.id_jugadora = ?

UNION ALL

SELECT 
        'Equipo de Trayectoria' AS Tipo,
        j.id_jugadora AS IdJugadora,
        t.equipo AS Equipo,
        e.escudo AS EscudoImagen,
        t.imagen AS JugadoraImagen
    FROM 
        trayectoria t
    JOIN 
        jugadoras j ON j.id_jugadora = t.jugadora
    JOIN 
        equipos e ON t.equipo = e.id_equipo
    WHERE 
        j.id_jugadora = ?
ORDER BY Tipo DESC, Equipo DESC; 

";

$stmt = $conn->prepare($query);
$stmt->bind_param("ii", $idJugadora, $idJugadora); // Usar el ID de la jugadora
$stmt->execute();
$result = $stmt->get_result();

$data = [];
while ($row = $result->fetch_assoc()) {
    // Verifica si la imagen se está convirtiendo correctamente
    if (!empty($row['JugadoraImagen'])) {
        $row['JugadoraImagen'] = 'data:image/jpeg;base64,' . base64_encode($row['JugadoraImagen']);
    }
    $data[] = $row;
}

$stmt->close();
$conn->close();

// Establecer el tipo de contenido a JSON
header('Content-Type: application/json');

// Devolver los resultados como JSON
$salida=$data;
?>
