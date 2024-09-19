<?php
// Archivo: procesar_registro.php
// Configurar la conexión a la base de datos
require_once 'includes/conexion-bbdd.php';
if (!isset($conn)) die();

// Obtener los datos del formulario
$nombre = $_POST['nombre'];
$apellidos = $_POST['apellidos'];
$correo = $_POST['correo'];
$username = $_POST['username'];
$password = $_POST['password'];

$salida=[];
session_start();
// Consulta SQL para insertar el nuevo usuario en la tabla "usuarios"
$sql_insertar_usuario = "INSERT INTO usuarios (Nombre, Apellidos, Usuario, rol, Correo, Contrasena, token) 
                         VALUES ('$nombre', '$apellidos', '$username', 2, '$correo', SHA1('$password'), '')";

// Ejecutar la consulta de inserción del usuario
if ($conn->query($sql_insertar_usuario) === TRUE) {
    // Obtener el ID del usuario recién insertado
    $id_usuario = $conn->insert_id;

    // En este punto, el usuario ha sido insertado con éxito. Puedes continuar con otras operaciones si es necesario.
    $salida['success'] = true;
    $salida['message'] = 'Usuario registrado exitosamente';
} else {
    $salida['success'] = false;
    $salida['message'] = 'Error al registrar el usuario';
}
?>
