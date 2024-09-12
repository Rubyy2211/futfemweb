<?php
require_once "includes/conexion-bbdd.php"; // Asegúrate de que esta ruta sea correcta

// Obtener el nombre de la jugadora desde la petición GET
$nombre = isset($_GET['nombre']) ? trim($_GET['nombre']) : '';

if (!$nombre) {
    echo json_encode(["error" => "Nombre de jugadora no proporcionado"]);
    exit;
}

// Preparar y ejecutar la consulta
$query = "
SELECT 
    id_jugadora, 
    CONCAT(Nombre, ' ', Apellidos) AS Completo
FROM 
    jugadoras
WHERE 
    CONCAT(Nombre, ' ', Apodo, ' ', Apellidos) REGEXP CONCAT('(^|[[:space:]])', ?, '([[:space:]]|$)');

";

$stmt = $conn->prepare($query);

// Asignar el parámetro
$stmt->bind_param("s", $nombre);

$stmt->execute();
$result = $stmt->get_result();

$jugadoras = [];

if ($result->num_rows > 0) {
    while ($fila = $result->fetch_assoc()) {
        $jugadoras[] = [
            'id_jugadora' => $fila['id_jugadora'],
            'Nombre_Completo' => $fila['Completo']
        ];
    }
} else {
    $jugadoras['error'] = "No se encontraron jugadoras con ese nombre.";
}

$stmt->close();
$conn->close();

// Devolver el resultado como JSON
$salida=$jugadoras;
?>
