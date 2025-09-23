<?php
require_once "includes/conexion-bbdd.php"; // Asegúrate de que esta ruta sea correcta
if (!isset($conn)) die();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'] ?? null;
    $username = $_POST['username'] ?? null;
    $name = $_POST['name'] ?? null;
    $lastname = $_POST['lastname'] ?? null;
    $email = $_POST['email'] ?? null;
    $rol = $_POST['rol'] ?? null;

    if (!$id || !$username || !$email) {
        echo json_encode(["error" => "Todos los campos son obligatorios"]);
        exit;
    }   

    // Construir la consulta dinámicamente
    $query = "UPDATE usuarios SET  Nombre = ?  ,Apellidos = ? ,Usuario = ? ,Correo = ? , Rol = ? WHERE Id= ?";
    $params = [$name, $lastname, $username, $email, $rol, $id];
    $types = "ssssii"; // i: int, s: string
    
    $salida = [];
  
    // Preparar y ejecutar la consulta
    if ($stmt = $conn->prepare($query)) {
        $stmt->bind_param($types, ...$params);
        if ($stmt->execute()) {
            $salida = ["success" => "Registro actualizado correctamente"];
        } else {
            $salida = ["error" => "Error al actualizar: " . $stmt->error];
        }
        $stmt->close();
    } else {
        $salida = ["error" => "Error en la preparación de la consulta"];
    }

    $conn->close();
} else {
    $salida = ["error" => "Método no permitido"];
}
?>

