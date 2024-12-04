<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Futfem Relations</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/compañeras.css">
    <link rel="stylesheet" href="../css/trayectoria.css">
    <link rel="stylesheet" href="../css/estilos.css">
</head>
<body>
<?php require_once 'header.html'?>
<h1>Compañeras</h1>
<div class="flip-container" id="foto-jug" style="height: 150px">
    <div class="flipper">
        <div class="front">
            <img src="../img/mystery.jpg" class="mystery" alt="mystery player">
        </div>
        <div class="back">
            <img src="#" class="mystery" alt="mystery player" id="jugadora">
        </div>
    </div>
</div>
<p id="result"></p>

<div class="juego">
    <div class="compañeras" id="compañeras">
        <div id="jugadora-1"></div>
        <div id="jugadora-2"></div>
        <div id="jugadora-3"></div>
        <div id="jugadora-4"></div>
        <div id="jugadora-5"></div>
    </div>

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

    <div id="respuesta" class="cont">
        <label for="jugadoraInput"><input type="text" id="jugadoraInput" placeholder="Escribe el nombre de la jugadora"></label>
        <button onclick="checkJugadora()" id="botonVerificar">Verificar</button>
    </div>
</div>
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
<script src="../js/admin.js"></script>
<script src="../js/opciones_jugadora.js"></script>
<script src="../js/funciones-tablas.js"></script>
<script src="../js/compañeras.js"></script>
</body>
</html>
