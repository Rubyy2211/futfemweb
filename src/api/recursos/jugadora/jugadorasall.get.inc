<?php
require_once "includes/conexion-bbdd.php";

if (!isset($conn)) die();

// Consulta principal
$query = "
    SELECT 
        id_jugadora AS id,
        Nombre AS nombre,
        Apellidos AS apellidos,
        Apodo AS apodo,
        Nacimiento AS nacimiento,
        Nacionalidad AS nacionalidad,
        Posicion AS posicion,
        imagen,
        retiro
    FROM jugadoras
    ORDER BY nombre
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
            'nacimiento' => $fila['nacimiento'],
            'nacionalidad' => $fila['nacionalidad'],
            'posicion' => $fila['posicion'],
            'retiro' => $fila['retiro'],
            // Si hay imagen, se codifica en base64, si no, null
            'imagen' => !empty($fila['imagen'])
                ? 'data:image/jpeg;base64,' . base64_encode($fila['imagen'])
                : null
        ];
    }
}

$stmt->close();
$conn->close();

// Devolver los resultados como JSON
header('Content-Type: application/json');
$salida["success"] = $jugadoras;
