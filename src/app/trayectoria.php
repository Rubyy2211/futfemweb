<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Adivina la Jugadora</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
  <link rel="stylesheet" href="../css/estilos.css">
    <link rel="stylesheet" href="../css/trayectoria.css">

</head>
<body>
<?php require_once 'header.html'?>
<h1>Adivina la Jugadora</h1>
<div id="game">
    <img src="../img/mystery.jpg" class="mystery" alt="mystery player">
  <div id="trayectoria">
    <!-- Aquí se mostrarán los escudos de los equipos -->
  </div>
    <!-- Modal Structure -->
    <div id="selectionModal" class="modal">
        <div class="modal-content">
            <h4>Selecciona una jugadora</h4>
            <ul id="jugadoraList"></ul>
        </div>
        <div class="modal-footer">
            <button id="modalClose" class="modal-close">Cancelar</button>
        </div>
    </div>

    <div id="respuesta" class="cont">
  <label for="jugadoraInput"><input type="text" id="jugadoraInput" placeholder="Escribe el nombre de la jugadora"></label>
  <button onclick="checkAnswer()">Verificar</button>
  </div>
    <p id="result"></p>
</div>
<script src="../js/opciones_jugadora.js"></script>
<script src="../js/guesstrayectoria.js"></script>
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>
