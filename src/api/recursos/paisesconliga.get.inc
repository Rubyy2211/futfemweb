<?php
require_once "includes/conexion-bbdd.php";

// Preparar la consulta SQL
$query = "SELECT DISTINCT ligas.pais, paises.nombre, paises.bandera
          FROM ligas 
          JOIN paises ON paises.id_pais = ligas.pais 
          ORDER BY paises.nombre";
$stmt = $conn->prepare($query);

if ($stmt) {
    // Ejecutar la consulta
    $stmt->execute();
    $resultado = $stmt->get_result();
    $ligas = [];
    $salida = [];

    // Si hay resultados, almacenar las ligas encontradas
    if ($resultado->num_rows > 0) {
        while ($fila = $resultado->fetch_assoc()) {
            $ligas[] = [
                'nombre' => $fila['nombre'], // Cambiado a nombre_pais para que coincida con el alias
                'bandera' => 'data:image/svg+xml;base64,' . base64_encode($fila['bandera']), // Codificar la imagen en base64
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
?>
