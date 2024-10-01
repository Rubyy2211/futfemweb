<?php session_start(); // Inicia la sesión?>
<!doctype html>
<html lang="es">
<head>
  <!-- Inicio de la sección de encabezado -->
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Futfem | Inicio Sesión</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="css/estilos.css">
  <link rel="stylesheet" href="css/efectos/wave.css">
  <link rel="stylesheet" href="css/login.css">

    <!-- Fin de la sección de encabezado -->
</head>
<body>
<!-- Inicio de la sección de encabezado -->
<?php
// Validar el rol del usuario
$rol = $_SESSION['user']['idRol'] ?? null;

// Incluir el header correspondiente según el rol del usuario
if($rol === null || $rol === "") {
    require_once 'header.html';
} /*elseif($rol == 2) {
    require_once 'header-tecnico.html';
} elseif($rol == 3) {
    require_once 'header-usuario.html';
} elseif($rol == 1) {
    require_once 'header-admin.html';
}*/
?>
<div class="wave"></div>
<div class="wave"></div>
<div class="wave"></div>
<section class="Inicio-Sesion">
  <div class="container">
    <form id="login-form">
      <h2>Iniciar Sesión</h2>
      <!-- Inicio del formulario -->
      <div class="form-group">
        <label for="username">Correo:</label> <!-- Campo de usuario -->
        <input type="text" id="username" name="username" placeholder="Introduzca su correo" required>
      </div>
      <div class="form-group">
        <label for="password">Contraseña:</label> <!-- Campo de contraseña -->
        <input type="password" id="password" name="password" placeholder="Introduzca su contraseña" required>
      </div>
      <!-- Fin del formulario -->
      <div class="form-group">
        <a href="#" class="resetear">¿Has olvidado tu contraseña?</a> <!-- Enlace a la página de restablecimiento de contraseña -->
        <button type="submit">Iniciar Sesión</button> <!-- Botón de envío del formulario -->
      </div>
        <div id="output">
            Area de mensajes
        </div>
    </form>
  </div>
</section>
<script src="js/login.js"></script>

<script>
    async function logout() {
        const respuesta = await fetch('api/sesion/', {
            method: 'delete'
        });
        if(respuesta.ok) {
            location.href = 'index.php';
        }
    }
    document.getElementById('cerrarSesionBtn').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('pop-up').style.display = 'flex';
    });

    document.getElementById('confirmarBtn').addEventListener('click', function() {
        logout();
    });

    document.getElementById('cancelarBtn').addEventListener('click', function() {
        document.getElementById('pop-up').style.display = 'none';
    });
</script>
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>
