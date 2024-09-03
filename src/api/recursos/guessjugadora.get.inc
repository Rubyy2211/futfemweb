<?php
require_once "includes/conexion-bbdd.php";

// Obtener el parámetro pasado por GET
$nombre = isset($_GET['nombre']) ? $_GET['nombre'] : '';

if (!empty($nombre)) {
    // Preparar la consulta SQL para buscar el ID de la jugadora
    $query = "SELECT id_jugadora , CONCAT(Nombre, ' ', apellidos) AS Completo FROM jugadoras WHERE CONCAT(Nombre, ' ', apellidos) LIKE ?";
    $stmt = $conn->prepare($query);

    // Agregar los caracteres comodín (%) para la búsqueda
    $nombreBusqueda = "%$nombre%";

    // Asignar el parámetro
    $stmt->bind_param("s", $nombreBusqueda);

    // Ejecutar la consulta
    $stmt->execute();
    $resultado = $stmt->get_result();

    $jugadoras = [];

    if ($resultado->num_rows > 0) {
        while ($fila = $resultado->fetch_assoc()) {
            $jugadoras[] = [
                'id_jugadora' => $fila['id_jugadora'],
                'Nombre_Completo'=> $fila['Completo']
            ];
        }
    } else {
        $jugadoras['error'] = "No se encontraron jugadoras con ese nombre.";
    }

    $stmt->close();
    $conn->close();

    // Devolver los resultados como JSON
    $salida=$jugadoras;
} else {
    // Si no se proporciona el nombre o está vacío
    $salida["error"] = "No se proporcionó un nombre válido.";
}
?>
