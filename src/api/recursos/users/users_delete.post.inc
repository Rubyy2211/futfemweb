<?php
require_once "includes/conexion-bbdd.php"; // Asegúrate de que esta ruta sea correcta
if (!isset($conn)) die();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'] ?? null;
    

    if (!$id) {
        echo json_encode(["error" => "Todos los campos son obligatorios"]);
        exit;
    }   

    // Construir la consulta dinámicamente
    $query = "DELETE FROM usuarios WHERE Id= ?";
    $params = [$id];
    $types = "i"; // i: int, s: string
    
    $salida = [];
  
    // Preparar y ejecutar la consulta
    if ($stmt = $conn->prepare($query)) {
        $stmt->bind_param($types, ...$params);
        if ($stmt->execute()) {
            $salida = ["success" => "Registro eliminado correctamente"];
        } else {
            $salida = ["error" => "Error al eliminar: " . $stmt->error];
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

