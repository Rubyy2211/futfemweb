<?php
require_once "includes/conexion-bbdd.php"; // Asegúrate de que esta ruta sea correcta
if(!isset($conn)) die();

// Obtener el ID de la jugadora desde la petición GET
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id === 0) {
    echo json_encode(["error" => "ID de jugadora no proporcionado"]);
    exit;
}

// Preparar y ejecutar la consulta
$query = "
SELECT 
    id_equipo, liga, nombre, escudo
FROM 
    equipos
WHERE 
    id_equipo = ?;
";

$stmt = $conn->prepare($query);

// Asignar el parámetro
$stmt->bind_param("i", $id);

$stmt->execute();
$result = $stmt->get_result();

$jugadora = [];

if ($result->num_rows > 0) {
    while ($fila = $result->fetch_assoc()) {
        if(empty($fila['escudo'])){
            $imagen = '\futfemweb\src\img\predeterm.jpg';
        }else{
            $imagen = 'data:image/jpeg;base64,' . base64_encode($fila['escudo']);// Codificar la imagen en base64
        }
        $jugadora[] = [
            'Club' => $fila['id_equipo'],
            'Nombre' => $fila['nombre'],
            'Escudo' => $imagen,
            'Liga' => $fila['liga'],
        ];
    }
} else {
    $jugadora['error'] = "No se encontraron equipos con ese ID.";
}

$stmt->close();
$conn->close();

// Devolver el resultado como JSON
header('Content-Type: application/json');
$salida=$jugadora;

