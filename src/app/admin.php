<?php
session_start();
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Panel Admin</title>
  <link rel="stylesheet" href="../css/estilos.css">
  <link rel="stylesheet" href="../css/admin.css">
    <style>
    body {
      margin: 0;
      font-family: Arial, sans-serif;
    }

    /* Contenedor principal */
    .contenedor-admin {
      display: flex;
      min-height: 100vh;
      width: 100%;
      padding-inline: unset;
      min-width: 100%;
        padding: unset;
    }

    /* Menú lateral */
    .sidebar {
      width: 250px;
      background-color: var(--color-primario);
      color: white;
      padding: 20px 0;
      position: fixed;
      height: 100%;
      transition: transform 0.3s ease-in-out;
      transform: translateX(0); /* Visible por defecto */
    }

    .sidebar.hidden {
      transform: translateX(-250px); /* Oculto fuera de la vista */
    }

    .sidebar h2 {
      text-align: center;
      margin-bottom: 30px;
      font-size: 20px;
      color: #ECF0F1;
    }

    .sidebar ul {
      list-style: none;
      padding: 0;
    }

    .sidebar ul li {
      padding: 15px 0;
    }

    .sidebar ul li a {
      color: #ECF0F1;
      text-decoration: none;
      display: block;
      padding: 10px 20px;
      border-radius: 5px;
      transition: background-color 0.3s;
    }

    .sidebar ul li a:hover {
      background-color: var(--color-secundario);
    }

    /* Botón para plegar/mostrar */
    .toggle-btn {
      position: fixed;
      top: 20px;
      left: 20px;
      background-color: #34495E;
      color: white;
      border: none;
      padding: 10px 15px;
      cursor: pointer;
      border-radius: 5px;
      z-index: 1000;
      transition: background-color 0.3s;
    }

    /* Ocultar el botón por defecto */
    .toggle-btn.hidden {
        display: none;
    }

    .toggle-btn:hover {
      background-color: #2C3E50;
    }

    /* Contenido principal */
    .main-content {
      margin-left: 250px;
      padding: 20px;
      width: calc(100% - 250px);
      transition: margin-left 0.3s ease-in-out;
    }

    .main-content.full-width {
      margin-left: 0;
      width: 100%; /* Ocupa todo el ancho cuando el menú está oculto */
    }
    .submenu{
        background: var(--color-secundario);
    }
  </style>
</head>
<body>
<div class="contenedor-admin">
  <!-- Botón para mostrar/ocultar el menú -->
  <button class="toggle-btn hidden" id="toggle-btn">☰ Menú</button>

  <!-- Menú lateral -->
  <nav class="sidebar" id="sidebar">
    <h2>Admin Panel</h2>
    <ul>
      <li><a href="#">Dashboard</a></li>
      <li><a href="#">Usuarios</a></li>
      <li><a href="#" onclick="loadPage('juegos-admin.php')">Administrar Juegos</a></li>
        <li>
            <a href="#" class="index-submenu" onclick="toggleSubmenu('jugadoras-submenu')">Jugadoras</a>
            <ul class="submenu" id="jugadoras-submenu" style="display: none;">
                <li><a href="#">Ver Todas</a></li>
                <li><a onclick="loadPage('insertar-jugadora.php')">Agregar Nueva</a></li>
                <li><a href="#">Estadísticas</a></li>
            </ul>
        </li>
      <li><a href="#">Medios</a></li>
      <li><a href="#">Configuración</a></li>
      <li><a href="#">Extensiones</a></li>
      <li><a href="#">Salir</a></li>
    </ul>
  </nav>

  <!-- Contenido principal -->
  <main class="main-content" id="main-content">
      <h2>Bienvenido, <?php echo $_SESSION['user']['nombre']?></h2>
      <h1>Bienvenido al Panel de Administración</h1>
    <p>Aquí puedes gestionar el contenido, usuarios y configuración de tu sitio web.</p>
  </main>
</div>

<script>
    // Referencias a los elementos HTML
    const toggleBtn = document.getElementById('toggle-btn');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');

    // Evento para mostrar/ocultar el menú lateral
    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('hidden'); // Oculta o muestra el menú
        mainContent.classList.toggle('full-width'); // Ajusta el ancho del contenido

        // Mostrar/ocultar el botón basado en el estado del menú
        toggleBtn.classList.add('hidden'); // Oculta el botón
    });

    // Detectar cambios en el estado del menú lateral y ajustar visibilidad del botón
    sidebar.addEventListener('transitionend', () => {
        if (sidebar.classList.contains('hidden')) {
            toggleBtn.classList.remove('hidden'); // Muestra el botón si el menú está oculto
        } else {
            toggleBtn.classList.add('hidden'); // Oculta el botón si el menú está visible
        }
    });

    // Ocultar el menú al hacer clic en el contenido principal
    mainContent.addEventListener('click', () => {
        if (!sidebar.classList.contains('hidden')) { // Si el menú está visible
            sidebar.classList.add('hidden'); // Oculta el menú
            mainContent.classList.add('full-width'); // Ajusta el ancho del contenido
            toggleBtn.classList.remove('hidden'); // Muestra el botón
        }
    });



  function loadPage(pageUrl) {
      const mainContent = document.getElementById('main-content');
      mainContent.classList.add('loading'); // Muestra el indicador de carga

      fetch(pageUrl)
          .then(response => {
              if (!response.ok) {
                  throw new Error(`Error al cargar la página: ${response.statusText}`);
              }
              return response.text(); // Convierte la respuesta a texto
          })
          .then(html => {
              mainContent.classList.remove('loading'); // Oculta el indicador de carga
              mainContent.innerHTML = html; // Inserta el contenido en el contenedor principal
              executeScripts(mainContent); // Ejecuta los scripts de la página cargada
          })
          .catch(error => {
              mainContent.classList.remove('loading');
              console.error(error);
              mainContent.innerHTML = `<p>Error al cargar la página.</p>`;
          });
  }

  // Función para extraer y ejecutar scripts dentro de un contenedor
  function executeScripts(container) {
      // Encuentra todos los elementos <script> en el contenido cargado
      const scripts = container.querySelectorAll('script');

      scripts.forEach(script => {
          const newScript = document.createElement('script');
          // Copia el contenido del script
          if (script.src) {
              // Si el script tiene un atributo "src", lo carga de forma externa
              newScript.src = script.src;
          } else {
              // Si el script tiene contenido inline, lo copia
              newScript.textContent = script.textContent;
          }
          // Asegúrate de que los nuevos scripts estén en el DOM
          document.body.appendChild(newScript);
          // Opcional: Elimina el script después de ejecutarlo (para evitar duplicados)
          newScript.onload = () => newScript.remove();
      });
  }

        // Función para mostrar/ocultar el submenú
        function toggleSubmenu(id) {
        const submenu = document.getElementById(id);
        if (submenu.style.display === "none" || submenu.style.display === "") {
        submenu.style.display = "block";
        } else {
        submenu.style.display = "none";
        }
    }
</script>
<script src="../js/funciones-tablas.js"></script>
<script src="../js/admin.js"></script>
</body>
</html>
