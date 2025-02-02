<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Trayectoria de Jugadora</title>
    <link rel="stylesheet" href="../css/estilos.css">
    <style>
        .suggestion-item {
            display: flex;
            align-items: center;
            padding: 5px;
            border-bottom: 1px solid #ddd;
            cursor: pointer;
        }

        .suggestion-item:hover {
            background-color: #f0f0f0;
            color: var(--color-primario);
        }

        .jugadora-img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin-right: 10px;
        }

        .jugadora-info {
            display: flex;
            flex-direction: column;
        }

        .equipo-img {
            width: 50px;
            height: 50px;
            margin-right: 10px;
        }

        .equipo-info {
            display: flex;
            flex-direction: column;
        }

        #agregarForm{
            display: flex;
            flex-direction: column;
        }

        #sugerenciasEquipo{
            padding: unset;
        }
        button:hover{
            background: var(--color-detalles);
            color: var(--color-secundario);
        }
    </style>
</head>
<body>

<h2>Buscar y Editar Trayectoria de Jugadora</h2>

<form id="buscarForm">
    <label for="nombre">Nombre de la Jugadora:</label>
    <input type="text" id="nombre" name="nombre" required>
    <ul id="sugerencias"></ul>
    <!--<button type="button" id="boton-nombre">Buscar</button>-->
</form>

<h3>Trayectoria</h3>
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

<!-- Modal Structure -->
<div id="selectionModal" class="modal">
    <div class="modal-content">
        <h4>Selecciona una jugadora</h4>
        <ul id="jugadoraList"></ul>
    </div>
    <div class="modal-footer">
        <button id="modalClose" class="modal-close" onclick="closeModal()">Cancelar</button>
    </div>
</div>

<script src="../js/opciones_jugadora.js"></script>
<script src="../js/admin-trayectoria.js"></script>
<script>
    let lista = document.getElementById('sugerencias');
    //boton.addEventListener("click", validarNombre);

    // Añadir el evento de input al campo de texto
    const textoInput = document.getElementById("nombre");
    textoInput.addEventListener('input', debounce(handleAutocomplete, 300)); // Debounce de 300ms
    // Agregar el evento al input del nombre del equipo
    const textoInputEquipo = document.getElementById("equipo");
    textoInputEquipo.addEventListener('input', debounce(handleAutocompleteEquipo, 300)); // Debounce de 300ms

    const btnAnyadir = document.getElementById("añadirTrayectoria");
    btnAnyadir.addEventListener('click', anyadirTrayectoria); // Debounce de 300ms
</script>
</body>
</html>
