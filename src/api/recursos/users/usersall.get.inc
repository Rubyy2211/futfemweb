<?php
require_once "includes/conexion-bbdd.php"; // Asegúrate de que esta ruta sea correcta
if(!isset($conn)) die();

$query = "
    SELECT usuarios.Id, usuarios.Nombre ,usuarios.Apellidos,usuarios.Usuario,usuarios.Correo,roles.Nombre as Rol
    FROM usuarios INNER JOIN roles ON Usuarios.rol=roles.id;
";

$stmt = $conn->prepare($query);
$stmt->execute();
$result = $stmt->get_result();

$usuarios = [];
while ($row = $result->fetch_assoc()) {    
    $usuarios[] = $row;
}

$stmt->close();
$conn->close();

// Devolver los resultados como JSON
$salida=$usuarios;

