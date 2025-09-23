<?php
require_once "includes/conexion-bbdd.php"; // Asegúrate de que esta ruta sea correcta
if(!isset($conn)) die();

$query = "
    SELECT roles.Id, roles.Nombre as Rol
    FROM roles;
";

$stmt = $conn->prepare($query);
$stmt->execute();
$result = $stmt->get_result();

$roles = [];
while ($row = $result->fetch_assoc()) {    
    $roles[] = $row;
}

$stmt->close();
$conn->close();

// Devolver los resultados como JSON
$salida=$roles;

