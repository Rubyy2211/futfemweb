<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Trayectoria de Jugadora</title>
    <link rel="stylesheet" href="../css/estilos.css">
</head>
<body>

<h2>Buscar y Editar Trayectoria de Jugadora</h2>

<form id="buscarForm">
    <label for="nombre">Nombre de la Jugadora:</label>
    <input type="text" id="nombre" name="nombre" required>
    <button type="submit">Buscar</button>
</form>

<h3>Trayectoria</h3>
<table border="1" id="trayectoriaTable">
    <thead>
    <tr>
        <th>Jugadora</th>
        <th>Equipo</th>
        <th>Años</th>
        <th>Imágenes</th>
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
    <input type="number" id="equipo" name="equipo" required>

    <label for="años">Años:</label>
    <input type="text" id="años" name="años" required>

    <label for="equipo_actual">Equipo Actual:</label>
    <input type="checkbox" id="equipo_actual">

    <button type="submit">Añadir</button>
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
<script src="../js/admin.js"></script>
</body>
</html>
