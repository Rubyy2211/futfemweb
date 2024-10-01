<?php
require_once "includes/conexion-bbdd.php";

// Obtener el ID del país pasado por GET y convertirlo a entero
$id = isset($_GET['liga']) ? intval($_GET['liga']) : 0;
if(!isset($conn)) die();

if ($id > 0) {
    // Preparar la consulta SQL
    $query = "SELECT * FROM equipos WHERE liga = ? ORDER BY nombre";
    $stmt = $conn->prepare($query);
    if ($stmt) {
        // Asociar el parámetro de país
        $stmt->bind_param('i', $id);

        // Ejecutar la consulta
        $stmt->execute();
        $resultado = $stmt->get_result();
        $equipos = [];
        $salida = [];
        // Si hay resultados, almacenar las ligas encontradas
        if ($resultado->num_rows > 0) {
            while ($fila = $resultado->fetch_assoc()) {
                $equipos[] = [
                    'equipo' => $fila['id_equipo'],
                    'nombre' => $fila['nombre'],
                    'escudo' => 'data:image/png;base64,' . base64_encode($fila['escudo']), // Codificar la imagen en base64
                    'liga' => $fila['liga'],
                ];
            }
            // Devolver los resultados como JSON
            header('Content-Type: application/json');
            $salida['success'] = $equipos;
        } else {
            // Si no se encontraron ligas, devolver un mensaje de error
            header('Content-Type: application/json');
            $salida['error'] = 'No se encontraron ligas para el país proporcionado.';
        }

        // Cerrar la declaración
        $stmt->close();
    } else {
        // Si hay un error al preparar la consulta
        header('Content-Type: application/json');
        $salida['error'] = 'Error al preparar la consulta.';
    }

    // Cerrar la conexión
    $conn->close();
} else {
    // Si no se proporcionó un ID válido de país
    header('Content-Type: application/json');
    $salida['error'] = 'ID de país no válido o faltante.';
}
