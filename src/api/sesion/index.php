<?php
switch ($_SERVER['REQUEST_METHOD']) {
// Archivo: procesar_login.php
    case 'GET':
        session_start();
        if(!isset($_SESSION['user'])) {
            http_response_code(401);
        } else {
            http_response_code(200);
            header('Access-Control-Allow-Origin: *');
            header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE');
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode($_SESSION ['user']);
        }
        break;
    case 'POST':
        require_once '../includes/conexion-bbdd.php';
        if(!isset($conn)) die();
        // Obtener los datos del formulario
        $nombre_usuario = $_POST['username'];
        $contraseña = $_POST['password'];

        // Consulta SQL para obtener el hash de la contraseña del usuario
        $sql = "SELECT `usuarios`.`id`, 
       `usuarios`.`nombre`, 
        usuarios.Correo,
       `roles`.`id` as `idRol`, 
       `roles`.`Nombre` 
	FROM `usuarios` 
		INNER JOIN `roles` ON `usuarios`.`rol` = `roles`.`id`
	WHERE `usuarios`.`Correo` = '$nombre_usuario' AND `usuarios`.`Contrasena` = SHA1('$contraseña')";
        $resultado = mysqli_query($conn, $sql);

        if (mysqli_affected_rows($conn) === 1) {
            $registro = mysqli_fetch_assoc($resultado);

            session_start();
            $_SESSION['user'] = $registro;

            //var_dump($_SESSION['user']);
            $salida = [];
            $salida['id'] = $registro['id'];
            $salida['nombre'] = $registro['nombre'];
            $salida['Correo'] = $registro['Correo'];
            $salida['idRol'] = $registro['idRol'];

            http_response_code(200);

            header('Access-Control-Allow-Origin: *');
            header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE');
            header('Content-Type: application/json; charset=utf-8');

            echo json_encode($salida);
        } else {
            http_response_code(401);
        }
        break;
    case 'DELETE':
        // Inicializar la sesión.
        session_start();

        // Destruir todas las variables de sesión.
        $_SESSION = array();

        // Si se desea destruir la sesión completamente, borre también la cookie de sesión.
        if (ini_get("session.use_cookies")) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000,
                $params["path"], $params["domain"],
                $params["secure"], $params["httponly"]
            );
        }

        // Finalmente, destruir la sesión.
        session_destroy();
        break;
    default:
        http_response_code(405);
}
?>
