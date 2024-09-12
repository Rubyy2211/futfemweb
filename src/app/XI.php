<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Futfem XI</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="../../css/estilos.css">
    <link rel="stylesheet" href="../../css/XI.css">
</head>
<style>
    body{
        color: white;
    }
</style>
<body>
<?php require_once 'header.html'?>
<h1>Futfem XI</h1>
<table id="grid">
    <tbody>
    <tr>
        <td id="c11" class="11">EI</td>
        <td id="c12" class="10">DC</td>
        <td id="c13" class="10">DC</td>
        <td id="c14" class="10">DC</td>
        <td id="c15" class="12">ED</td>
    </tr>
    <tr>
        <td id="c21" class="8">MI</td>
        <td id="c22" class="5">MC</td>
        <td id="c23" class="7">MCO</td>
        <td id="c24" class="5">MC</td>
        <td id="c25" class="9">MD</td>
    </tr>
    <tr>
        <td id="c31"></td>
        <td id="c32" class="5">MC</td>
        <td id="c33" class="6">MCD</td>
        <td id="c34" class="5">MC</td>
        <td id="c35"></td>
    </tr>
    <tr>
        <td id="c41" class="4">LI</td>
        <td id="c42" class="3">DFC</td>
        <td id="c43" class="3">DFC</td>
        <td id="c44" class="3">DFC</td>
        <td id="c45" class="2">LD</td>
    </tr>
    <tr>
        <td id="c51"></td>
        <td id="c52"></td>
        <td id="c53" class="1">POR</td>
        <td id="c54"></td>
        <td id="c55"></td>
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
<div id="selectionModal" class="modal">
    <div class="modal-content">
        <h4>Selecciona una jugadora</h4>
        <ul id="jugadoraList"></ul>
    </div>
    <div class="modal-footer">
        <button id="modalClose" class="modal-close">Cancelar</button>
    </div>
</div>
<div class="pista">
    <div id="requisito"></div>
    <p>Esto es un texo</p>
</div>
<div class="cont">
    <label for="input"><input type="text" id="input" placeholder="Escribe el nombre de la jugadora"></label>
    <button onclick="obtenerJugadora()">Verificar</button>
</div>
<p id="resultado"></p>
<script src="../js/opciones_jugadora.js"></script>
<script src="../js/funciones-tablas.js"></script>
<script src="../js/verificar.js"></script>
<script src="../js/XI.js"></script>
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>

