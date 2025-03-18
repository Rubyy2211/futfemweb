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
        if (!isset($conn)) die();

        // Obtener los datos del formulario
        $nombre_usuario = $_POST['username'];
        $contraseña = $_POST['password'];

        // Consulta SQL con placeholders para evitar inyección SQL
        $sql = "SELECT usuarios.id, 
                   usuarios.nombre, 
                   usuarios.Correo, 
                   roles.id as idRol, 
                   roles.Nombre 
            FROM usuarios 
            INNER JOIN roles ON usuarios.rol = roles.id 
            WHERE usuarios.Correo = ? AND usuarios.Contrasena = SHA1(?)";

        if ($stmt = mysqli_prepare($conn, $sql)) {
            // Vincular parámetros
            mysqli_stmt_bind_param($stmt, "ss", $nombre_usuario, $contraseña);
            mysqli_stmt_execute($stmt);
            $resultado = mysqli_stmt_get_result($stmt);

            if (mysqli_num_rows($resultado) === 1) {
                $registro = mysqli_fetch_assoc($resultado);
                session_start();
                $_SESSION['user'] = $registro;

                $salida = [
                    'id' => $registro['id'],
                    'nombre' => $registro['nombre'],
                    'Correo' => $registro['Correo'],
                    'idRol' => $registro['idRol']
                ];

                http_response_code(200);
                header('Access-Control-Allow-Origin: *');
                header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE');
                header('Content-Type: application/json; charset=utf-8');
                echo json_encode($salida);
            } else {
                http_response_code(401);
            }
            mysqli_stmt_close($stmt);
        } else {
            http_response_code(500); // Error en la preparación de la consulta
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

