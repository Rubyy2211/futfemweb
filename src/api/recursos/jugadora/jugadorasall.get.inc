<?php
require_once "includes/conexion-bbdd.php";

if (!isset($conn)) die();

// Consulta principal
$query = "
    SELECT 
        j.id_jugadora AS id,
        j.Nombre AS nombre,
        j.Apellidos AS apellidos,
        j.Apodo AS apodo,
        j.Nacimiento AS nacimiento,
        j.Nacionalidad AS nacionalidad,
        p.Nombre AS pais_nombre,
        p.bandera AS bandera,
        pos.Nombre AS posicion_nombre,
        pos.abreviatura AS posicion_abreviatura,
        j.Posicion AS posicion,
        j.imagen AS imagen,
        j.retiro AS retiro,
        e.id_equipo AS equipo_id,
        e.nombre AS equipo_nombre,
        e.escudo AS escudo_equipo
    FROM jugadoras j
    LEFT JOIN paises p 
        ON j.Nacionalidad = p.id_pais
    LEFT JOIN trayectoria t 
        ON j.id_jugadora = t.jugadora AND t.equipo_actual = 1
    LEFT JOIN equipos e 
        ON t.equipo = e.id_equipo
    LEFT JOIN posiciones pos
        ON j.Posicion = pos.idPosicion
";




$stmt = $conn->prepare($query);
$stmt->execute();
$resultado = $stmt->get_result();

$jugadoras = [];

if ($resultado->num_rows > 0) {
    while ($fila = $resultado->fetch_assoc()) {
        $jugadoras[] = [
            'id' => $fila['id'],
            'nombre' => $fila['nombre'],
            'apellidos' => $fila['apellidos'],
            'apodo' => $fila['apodo'],
            'imagen' => $fila['imagen'],
            'nacimiento' => $fila['nacimiento'],
            'nacionalidad' => $fila['nacionalidad'],
            'pais_nombre' => $fila['pais_nombre'],
            'posicion' => $fila['posicion'],
            'posicion_abreviatura' => $fila['posicion_abreviatura'],
            'retiro' => $fila['retiro'],

            // Bandera (formato SVG)
            'bandera' => !empty($fila['bandera'])
                ? 'data:image/svg+xml;base64,' . base64_encode($fila['bandera'])
                : null,

            // Imagen de la jugadora (formato JPEG)
            /*'imagen' => !empty($fila['imagen'])
                ? 'data:image/jpeg;base64,' . base64_encode($fila['imagen'])
                : null,*/

            // Equipo actual (nombre + escudo)
            'equipo_nombre' => $fila['equipo_nombre'],
            'escudo_equipo' => !empty($fila['escudo_equipo'])
                ? 'data:image/png;base64,' . base64_encode($fila['escudo_equipo'])
                : null
        ];
    }
}

$stmt->close();
$conn->close();

// Devolver los resultados como JSON
header('Content-Type: application/json');
$salida["success"] = $jugadoras;
