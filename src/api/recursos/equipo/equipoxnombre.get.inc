<?php
require_once "includes/conexion-bbdd.php";

// Obtener los IDs pasados por GET como un array
if(!isset($conn)) die();

// Obtener el parámetro de búsqueda
$nombre = $_GET['nombre'] ?? '';

if (empty($nombre)) {
    echo json_encode(["error" => "Falta el nombre del equipo"]);
    exit;
}
    // Crear la cláusula IN para la consulta SQL
    $query = "SELECT id_equipo, nombre, escudo FROM equipos WHERE nombre LIKE CONCAT('%', ?, '%');
";

    // Preparar y ejecutar la consulta
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $nombre);
    $stmt->execute();
    $resultado = $stmt->get_result();

    $equipos = [];
        while ($fila = $resultado->fetch_assoc()) {
            $equipos[] = [
                'club' =>$fila['id_equipo'],
                'nombre' => $fila['nombre'],
                'escudo' => 'data:image/jpeg;base64,' . base64_encode($fila['escudo'])
            ];
        }


    $stmt->close();
    $conn->close();

    // Devolver los resultados como JSON
    header('Content-Type: application/json');
    $salida = $equipos;



?>
