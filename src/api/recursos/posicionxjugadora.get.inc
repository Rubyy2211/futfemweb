<?php
require_once "includes/conexion-bbdd.php"; // Asegúrate de que esta ruta sea correcta

// Obtener el nombre de la jugadora desde la petición GET
$id = isset($_GET['id']) ? trim($_GET['id']) : '';

if (!$id) {
    echo json_encode(["error" => "Nombre de jugadora no proporcionado"]);
    exit;
}

// Preparar y ejecutar la consulta usando REGEXP para buscar coincidencias de palabras completas
$query = "
    SELECT posiciones.idPosicion FROM posiciones INNER JOIN jugadoras j where j.id_jugadora=? and posiciones.idPosicion=j.Posicion;;
";

$stmt = $conn->prepare($query);
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

$idPais = [];

if ($result->num_rows > 0) {
    while ($fila = $result->fetch_assoc()) {
        $idPais[] = [
            'Posicion' => $fila['idPosicion']
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

