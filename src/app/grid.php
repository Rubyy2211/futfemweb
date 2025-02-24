<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Futfem Grid</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/grid.css">
    <link rel="stylesheet" href="../css/estilos.css">
    <link rel="stylesheet" href="../css/combo.css">
</head>
<body>
<?php require_once 'header.html'?>
<h1>Futfem Grid</h1>
<table id="grid">
    <thead>
    <tr id="columnas">
        <th class="oculto"></th>
        <th id="Equipo4">Pais A</th>
        <th id="Equipo5">Pais B</th>
        <th id="Equipo6">Pais C</th>
    </tr>
    </thead>
    <tbody>
    <tr id="club1">
        <th id="Equipo1">Equipo 1</th>
        <td data-answer="jugadora1" id="c11"></td>
        <td data-answer="jugadora2" id="c12"></td>
        <td data-answer="jugadora3" id="c13"></td>
    </tr>
    <tr id="club2">
        <th id="Equipo2">Equipo 2</th>
        <td data-answer="jugadora4" id="c21"></td>
        <td data-answer="jugadora5" id="c22"></td>
        <td data-answer="jugadora6" id="c23"></td>
    </tr>
    <tr id="club3">
        <th id="Equipo3">Equipo 3</th>
        <td data-answer="jugadora7" id="c31"></td>
        <td data-answer="jugadora8" id="c32"></td>
        <td data-answer="jugadora9" id="c33"></td>
    </tr>
    </tbody>
</table>
<div class="cont">
<label for="input">
    <input type="text" id="input" placeholder="Escribe el nombre de la jugadora">
    <div id="sugerencias-container">
        <ul id="sugerencias"></ul>
    </div>
</label>
<button onclick="Verificar()">Verificar</button>
</div>
<p id="resultado"></p>
<script src="../js/verificar.js"></script>
<script src="../js/funciones-tablas.js"></script>
<script src="../js/admin.js"></script>
<script src="../js/grid.js"></script>
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
<script>
    // Añadir el evento de input al campo de texto
    const textoInput = document.getElementById("input");
    textoInput.addEventListener('input', debounce(handleAutocompletePlayer, 1000)); // Debounce de 300ms
</script>
</body>
</html>
