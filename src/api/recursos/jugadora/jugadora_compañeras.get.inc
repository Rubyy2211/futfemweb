<?php
require_once "includes/conexion-bbdd.php"; // Asegúrate de que la conexión se haya establecido correctamente
if (!isset($conn)) die(); // Termina si la conexión no está establecida

// Obtener el ID de la jugadora desde la petición GET
$idJugadora = isset($_GET['id_jugadora']) ? intval($_GET['id_jugadora']) : 0;

if ($idJugadora <= 0) {
    echo json_encode(["error" => "ID de jugadora no proporcionado o inválido"]);
    exit;
}

$query = "
WITH distinct_teams AS (
    SELECT j2.*, ROW_NUMBER() OVER (PARTITION BY j2.equipo ORDER BY j2.jugadora) as rn
    FROM trayectoria j1
    JOIN trayectoria j2
    ON j1.equipo = j2.equipo
    AND j1.jugadora != j2.jugadora
    AND (SUBSTRING_INDEX(j1.años, '-', 1) <= SUBSTRING_INDEX(REPLACE(j2.años, 'act', '2024'), '-', -1)
    AND SUBSTRING_INDEX(REPLACE(j1.años, 'act', '2024'), '-', -1) >= SUBSTRING_INDEX(j2.años, '-', 1))
    WHERE j1.jugadora = ?
),
additional_jugadoras AS (
    SELECT j2.*, 0 as rn
    FROM trayectoria j1
    JOIN trayectoria j2
    ON j1.equipo = j2.equipo
    AND j1.jugadora != j2.jugadora
    AND (SUBSTRING_INDEX(j1.años, '-', 1) <= SUBSTRING_INDEX(REPLACE(j2.años, 'act', '2024'), '-', -1)
    AND SUBSTRING_INDEX(REPLACE(j1.años, 'act', '2024'), '-', -1) >= SUBSTRING_INDEX(j2.años, '-', 1))
    WHERE j1.jugadora = ?
    AND j2.jugadora NOT IN (SELECT jugadora FROM distinct_teams WHERE rn = 1)
),
combined_results AS (
    SELECT jugadora, equipo, años, imagen, rn 
    FROM distinct_teams
    WHERE rn = 1
    UNION ALL
    SELECT jugadora, equipo, años, imagen, rn
    FROM additional_jugadoras
)
SELECT jugadora, equipo, años, imagen
FROM combined_results
ORDER BY rn DESC, jugadora
LIMIT 5";

$stmt = $conn->prepare($query);

// Verificar si la preparación fue exitosa
if ($stmt) {
    $stmt->bind_param("ii", $idJugadora, $idJugadora); // Asegúrate de pasar los parámetros correctos
    $stmt->execute();
    // Obtener el resultado
    $resultado = $stmt->get_result();
    $data = [];
    while ($row = $resultado->fetch_assoc()) {
        // Codificar la imagen de la jugadora en base64 si está disponible
        if (!empty($row['imagen'])) {
            $row['imagen'] = 'data:image/jpeg;base64,' . base64_encode($row['imagen']);
        }
        $data[] = $row;
    }

    $stmt->close();
    $conn->close();
}

// Devolver los resultados como JSON
$salida=$data;
?>
