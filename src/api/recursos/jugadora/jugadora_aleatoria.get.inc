<?php
require_once "includes/conexion-bbdd.php";

$nacionalidades = $_GET['nacionalidades'] ?? [];
$equipos = $_GET['equipos'] ?? [];
$ligas = $_GET['ligas'] ?? [];

if(!isset($conn)) die();

function obtenerJugadoras($conn, $filtro, $valores): array
{
if (empty($valores)) return [];

$valores = array_map('intval', $valores);
$placeholders = implode(',', array_fill(0, count($valores), '?'));

$condiciones = [
'pais' => "jugadoras.nacionalidad IN ($placeholders)",
'equipo' => "trayectoria.equipo IN ($placeholders)",
'liga' => "equipos.liga IN ($placeholders)"
];

$query = "SELECT DISTINCT jugadoras.id_jugadora,
CONCAT(jugadoras.Nombre, ' ', jugadoras.apellidos) AS nombre,
jugadoras.imagen,
jugadoras.nacionalidad,
jugadoras.Nacimiento
FROM jugadoras
JOIN trayectoria ON trayectoria.jugadora = jugadoras.id_jugadora
JOIN equipos ON trayectoria.equipo = equipos.id_equipo
WHERE {$condiciones[$filtro]}
ORDER BY RAND()
LIMIT 10"; // hasta 10 por grupo

$stmt = $conn->prepare($query);
$stmt->execute($valores);
$res = $stmt->get_result();
$jugadoras = [];
while ($fila = $res->fetch_assoc()) {
$jugadoras[$fila['id_jugadora']] = [
'nombre' => $fila['nombre'],
'imagen' => 'data:image/jpeg;base64,' . base64_encode($fila['imagen']),
'pais' => $fila['nacionalidad'],
'id' => $fila['id_jugadora'],
'Nacimiento' => $fila['Nacimiento'],
];
}
$stmt->close();
return $jugadoras;
}

// Obtener jugadoras de cada grupo
$jugadoras_pais = obtenerJugadoras($conn, 'pais', $nacionalidades);
$jugadoras_equipo = obtenerJugadoras($conn, 'equipo', $equipos);
$jugadoras_liga = obtenerJugadoras($conn, 'liga', $ligas);

// Unir todas, asegurando unicidad por ID
$jugadoras = array_merge($jugadoras_pais, $jugadoras_equipo, $jugadoras_liga);
$jugadoras = array_values($jugadoras); // Reindexar

// Si hay más de 30, tomar aleatoriamente 30
if (count($jugadoras) > 30) {
shuffle($jugadoras);
$jugadoras = array_slice($jugadoras, 0, 30);
}

// Devolver resultado
header('Content-Type: application/json');
$salida = $jugadoras;
$conn->close();
