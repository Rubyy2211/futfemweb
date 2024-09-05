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
    SELECT id_jugadora, CONCAT(Nombre, ' ', apellidos) AS Completo, imagen
    FROM jugadoras
    WHERE CONCAT(Nombre, ' ', apellidos) REGEXP CONCAT('(^|[[:space:]])', ?, '([[:space:]]|$)');
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
            'Nombre_Completo' => $fila['Completo'],
            'imagen' => 'data:image/jpeg;base64,'.base64_encode($fila['imagen'])
        ];
    }
} else {
    $jugadoras['error'] = "No se encontraron jugadoras con ese nombre.";
}

$stmt->close();
$conn->close();
// Devolver los resultados como JSON
header('Content-Type: application/json');
// Devolver el resultado como JSON
$salida=$jugadoras;
?>
