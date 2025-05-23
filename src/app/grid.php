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
    <link rel="stylesheet" href="../css/efectos/wave.css">
</head>
<body>
<div class="wave"></div>
<div class="wave"></div>
<div class="wave"></div>
<?php require_once 'header.html'?>
<h1>Futfem Grid</h1>
<table id="grid">
    <thead>
    <tr>
        <th class="oculto"></th>
        <th id="PaisA">Pais A</th>
        <th id="PaisB">Pais B</th>
        <th id="PaisC">Pais C</th>
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
<!-- Modal Structure -->
<div id="selectionModal" class="modal ocultar">
    <div class="modal-content">
        <h4>Selecciona una jugadora</h4>
        <ul id="jugadoraList"></ul>
    </div>
    <div class="modal-footer">
        <button id="modalClose" class="modal-close" onclick="closeModal()">Cancelar</button>
    </div>
</div>

<div class="cont">
<label for="input"><input type="text" id="input" placeholder="Escribe el nombre de la jugadora"></label>
<button onclick="obtenerJugadoras('grid')">Verificar</button>
</div>
<p id="resultado"></p>
<script src="../js/opciones_jugadora.js"></script>
<script src="../js/verificar.js"></script>
<script src="../js/funciones-tablas.js"></script>
<script src="../js/admin.js"></script>
<script src="../js/grid.js"></script>
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>
