<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Trayectoria de Jugadora</title>
    <link rel="stylesheet" href="../css/estilos.css">
    <link rel="stylesheet" href="../css/combo.css?v1.0">
    <link rel="stylesheet" href="../css/admin/admin-trayectoria.css">
</head>
<body>

<h2>Buscar y Editar Trayectoria de Jugadora</h2>

<form id="buscarForm">
    <label for="buscador">Nombre de la Jugadora:</label>
    <input type="text" id="buscador" name="nombre" required>
    <div id="sugerencias-container">
        <ul id="sugerencias"></ul>
    </div>
    <!--<button type="button" id="boton-nombre">Buscar</button>-->
</form>

<h3>Trayectoria</h3>
<div class="table-container">

<table border="1" id="trayectoriaTable">
    <thead>
    <tr>
        <th>Jugadora</th>
        <th>Equipo</th>
        <th>Años</th>
        <th>Imagen</th>
        <th>Equipo Actual</th>
        <th>Acción</th>
    </tr>
    </thead>
    <tbody>
    <!-- Aquí se insertarán los datos dinámicamente -->
    </tbody>
</table>
</div>
<h3>Añadir Nueva Trayectoria</h3>
<form id="agregarForm">
    <input type="hidden" id="jugadora_id">

    <label for="equipo">Equipo:</label>
    <input type="text" id="equipo" name="equipo" required>
    <input type="hidden" id="equipo_id">
    <ul id="sugerenciasEquipo"></ul>

    <label for="años">Años:</label>
    <input type="text" id="años" name="años" required>

    <label for="Imagen">Imagen:</label>
    <input type="file" id="Imagen" name="Imagen" required>

    <label for="equipo_actual">Equipo Actual:</label>
    <input type="checkbox" id="equipo_actual">

    <button type="button" id="añadirTrayectoria">Añadir</button>
</form>
<div id="result"></div>

<script src="control-acceso.js" data-roles-restringidos="2"></script>
<script src="../js/opciones_jugadora.js"></script>
<script src="../js/admin-trayectoria.js"></script>
<script>
    let lista = document.getElementById('sugerencias');
    //boton.addEventListener("click", validarNombre);

    // Añadir el evento de input al campo de texto
    const textoInput = document.getElementById("buscador");
    textoInput.addEventListener('input', debounce(handleAutocomplete, 1000)); // Debounce de 300ms
    // Agregar el evento al input del nombre del equipo
    const textoInputEquipo = document.getElementById("equipo");
    textoInputEquipo.addEventListener('input', debounce(handleAutocompleteEquipo, 1000)); // Debounce de 300ms

    const btnAnyadir = document.getElementById("añadirTrayectoria");
    btnAnyadir.addEventListener('click', anyadirTrayectoria); // Debounce de 300ms
</script>
</body>
</html>
