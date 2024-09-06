<?php
require_once "includes/conexion-bbdd.php";

// Selecciona un jugador aleatorio
$query = "SELECT jugadoras.id_jugadora, CONCAT(jugadoras.Nombre, ' ', jugadoras.apellidos) AS nombre, imagen, jugadoras.nacionalidad, Nacimiento FROM jugadoras ORDER BY RAND() LIMIT 1";
$stmt = $conn->prepare($query);
$stmt->execute();
$resultado = $stmt->get_result();

if ($resultado->num_rows > 0) {
    $fila = $resultado->fetch_assoc();
    $jugadora = array(
        'nombre' => $fila['nombre'],
        'imagen' => 'data:image/jpeg;base64,'.base64_encode($fila['imagen']), // Codificar la imagen en base64
        'pais' => $fila['nacionalidad'],
        'id' => $fila['id_jugadora'],
        'Nacimiento' => $fila['Nacimiento'],
    );
} else {
    $jugadora = array(
        'nombre' => "",
        'image_url' => "",
        'pais' =>'',
        'id' =>'',
        'Nacimiento' => '',
    );
}

$stmt->close();
$conn->close();

// Devolver el jugador como JSON
header('Content-Type: application/json');
$salida=$jugadora
?>

