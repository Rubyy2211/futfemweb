<?php
require_once "includes/conexion-bbdd.php";

// Obtener el ID del país pasado por GET y convertirlo a entero
$id = isset($_GET['pais']) ? intval($_GET['pais']) : 0;
if(!isset($conn)) die();

if ($id > 0) {
    // Preparar la consulta SQL
    $query = "SELECT id_liga AS liga, nombre, logo, pais FROM ligas WHERE pais = ?";
    $stmt = $conn->prepare($query);
    if ($stmt) {
        // Asociar el parámetro de país
        $stmt->bind_param('i', $id);

        // Ejecutar la consulta
        $stmt->execute();
        $resultado = $stmt->get_result();
        $ligas = [];
        $salida = [];
        // Si hay resultados, almacenar las ligas encontradas
        if ($resultado->num_rows > 0) {
            while ($fila = $resultado->fetch_assoc()) {
                $ligas[] = [
                    'nombre' => $fila['nombre'],
                    'logo' => 'data:image/png;base64,' . base64_encode($fila['logo']), // Codificar la imagen en base64
                    'liga' => $fila['liga'],
                    'pais' => $fila['pais'],
                ];
            }
            // Devolver los resultados como JSON
            header('Content-Type: application/json');
            $salida['success'] = $ligas;
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
