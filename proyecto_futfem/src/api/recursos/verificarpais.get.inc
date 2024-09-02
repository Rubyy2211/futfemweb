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
    SELECT p.id_pais
    FROM jugadoras j
    JOIN paises p ON j.nacionalidad = p.id_pais
    WHERE j.Nombre = ?
";

$stmt = $conn->prepare($query);
$stmt->bind_param("s", $nombre);
$stmt->execute();
$result = $stmt->get_result();

$idPais = null;

if ($result->num_rows > 0) {
    $fila = $result->fetch_assoc();
    $idPais = $fila['id_pais'];
}

$stmt->close();
$conn->close();

// Devolver el ID del país como JSON
$salida=$idPais;
?>
