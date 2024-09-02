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
    SELECT p.id_pais, CONCAT(jugadoras.Nombre, ' ', jugadoras.apellidos) AS Completo
    FROM jugadoras 
    JOIN paises p ON jugadoras.nacionalidad = p.id_pais
    WHERE CONCAT(jugadoras.Nombre, ' ', jugadoras.apellidos) LIKE ?;
";

$stmt = $conn->prepare($query);
$nombreLike = '%' . $nombre . '%';
$stmt->bind_param("s", $nombreLike);
$stmt->execute();
$result = $stmt->get_result();

$idPais = [];

if ($result->num_rows > 0) {
    while ($fila = $result->fetch_assoc()) {
        $idPais[] = [
            'Pais' => $fila['id_pais'],
            'NCompleto' => $fila['Completo']
        ];
    }
} else {
    $idPais = ["error" => "No se encontró ninguna jugadora con ese nombre"];
}

$stmt->close();
$conn->close();

// Devolver el resultado como JSON
$salida=$idPais;
?>
