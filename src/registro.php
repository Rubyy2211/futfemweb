<?php
if(!session_start()) {
    session_start(); // Inicia la sesión
}
?>
<!doctype html>
<html lang="es">
<head>
  <!-- Inicio de la sección de encabezado -->
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Futfem | Registro</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="css/estilos.css">
    <link rel="stylesheet" href="css/registro.css">
    <link rel="stylesheet" href="css/efectos/wave.css">
</head>
<body>
<?php
$rol = $_SESSION['user']['idRol'] ?? null;

if($rol == null || $rol == "") { // Comprueba si 'rol' es nulo o vacío
    require_once 'header.html';
} elseif($rol == 2) {
    require_once 'header-tecnico.html';
} elseif($rol == 3) {
    require_once 'header-usuario.html';
} else {
    require_once 'header-admin.html';
}
?>
<div class="wave"></div>
<div class="wave"></div>
<div class="wave"></div>
<section class="Registro">
  <div class="container">
    <form id="registro-form" novalidate>
      <h2>Registro</h2>
      <!-- Inicio del formulario -->
        <div class="form-inputs">
        <div class="form-item1">
        <label for="nombre">Nombre:*</label> <!-- Campo de usuario -->
        <input type="text" id="nombre" name="nombre" placeholder="Introduzca su nombre" required>
            <div class="output" id="name-error">
                Area de mensajes
            </div>
        </div>
        <div class="form-item2">
        <label for="username">Usuario:*</label> <!-- Campo de usuario -->
        <input type="text" id="username" name="username" placeholder="Introduzca su usuario" required>
            <div class="output" id="username-error">
                Area de mensajes
            </div>
        </div>
      <div class="form-item3">
        <label for="apellidos">Apellidos<span>*</span>:</label> <!-- Campo de usuario -->
        <input type="text" id="apellidos" name="apellidos" placeholder="Introduzca sus apellidos" required>
          <div class="output" id="apellidos-error">
              Area de mensajes
          </div>
      </div>
      <div class="form-item4">
        <div>
        <label for="correo">Correo electrónico:*</label> <!-- Campo de usuario -->
        <input type="email" id="correo" name="correo" placeholder="ejemplo@gmail.com" required>
            <div class="output" id="correo-error">
                Area de mensajes
            </div>
        </div>
      </div>
        <div class="form-item5">
        <label for="password">Contraseña:*</label> <!-- Campo de contraseña -->
        <input type="password" id="password" name="password" placeholder="Introduzca una contraseña" required>
            <div class="output" id="password-error">
                Area de mensajes
            </div>
        </div>
        </div>
      <!-- Fin del formulario -->
      <div class="form-group">
        <button type="submit">Registrarme</button> <!-- Botón de envío del formulario -->
      </div>
        <div class="output" id="output">
            Area de mensajes
        </div>
    </form>
  </div>
</section>
<script>
        function limpiarMensajes(id) {
            const outputElement = document.getElementById(id);
            outputElement.display = 'none';
            outputElement.classList.remove('error', 'success');
        }
        function mostrarMensaje(mensaje, esExitoso,id) {
            const outputElement = document.getElementById(id);
            outputElement.textContent = mensaje;
            outputElement.classList.add(esExitoso ? 'success' : 'error');
        }

        function validarFormato() {
            const nombre = document.getElementById('nombre').value;
            const apellidos = document.getElementById('apellidos').value;
            const correo = document.getElementById('correo').value;
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Validación del nombre (solo letras y espacios)
            const nombrePattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
            if (!nombrePattern.test(nombre)) {
                mostrarMensaje('El nombre contiene caracteres no permitidos.', false, 'name-error');
                return false;
            }else{
                limpiarMensajes('name-error');
            }

            // Validación del nombre de usuario (letras, números y guiones bajos)
            const usernamePattern = /^[a-zA-Z0-9_]+$/;
            if (!usernamePattern.test(username)) {
                mostrarMensaje('El nombre de usuario solo puede contener letras, números y guiones bajos.', false, 'username-error');
                return false;
            }else{
            limpiarMensajes('username-error');
        }

            // Validación de apellidos (solo letras y espacios)
            if (!nombrePattern.test(apellidos)) {
                mostrarMensaje('Los apellidos contienen caracteres no permitidos.', false, 'apellidos-error');
                return false;
            }else{
            limpiarMensajes('apellidos-error');
        }

            // Validación de correo electrónico
            const correoPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!correoPattern.test(correo)) {
                mostrarMensaje('El formato del correo electrónico no es válido.', false, 'correo-error');
                return false;
            }else{
            limpiarMensajes('correo-error');
        }

            // Validación de la contraseña (mínimo 6 caracteres)
            if (password.length < 6) {
                mostrarMensaje('La contraseña debe tener al menos 6 caracteres.', false, 'password-error');
                return false;
            }else{
            limpiarMensajes('password-error');
        }
            return true;
        }

        async function registro() {
            if (!validarFormato()) return;

            // Obtener los valores del formulario
            const nombre = document.getElementById('nombre').value;
            const apellidos = document.getElementById('apellidos').value;
            const correo = document.getElementById('correo').value;
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Configuración de la solicitud
            const opciones = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    nombre: nombre,
                    apellidos: apellidos,
                    correo: correo,
                    username: username,
                    password: password,
                })
            };

            try {
                // Realizar la solicitud fetch
                const respuesta = await fetch('api/registro', opciones);
                const data = await respuesta.json();
                // Verificar si la actualización fue exitosa
                if (data && data.message) {
                    mostrarMensaje(data.message, data.success,'output');
                } else {
                    mostrarMensaje('Error al actualizar datos', false, 'output');
                }
            } catch (error) {
                mostrarMensaje('Error de red: ' + error, false, 'output');
            }
        }

        // Agrega un manejador de eventos al formulario
        document.getElementById('registro-form').addEventListener('submit', function(event) {
            // Evita que el formulario se envíe automáticamente
            event.preventDefault();

            // Llama a tu función de validación antes de enviar los datos
            if (validarFormato()) {
                registro();
            }
        });


</script>
<script src="./js/menu-hamburguesa.js?v2.0"></script>

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