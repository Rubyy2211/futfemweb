<?php
session_start()?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Adivina la Jugadora</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/estilos.css">
    <link rel="stylesheet" href="../css/trayectoria.css">
    <link rel="stylesheet" href="../css/efectos/fade.css">
    <link rel="stylesheet" href="../css/combo.css">
</head>
<body>
<?php require_once 'header.html'?>
<div>
<h1>Adivina la Jugadora</h1>
    <div id="racha-1" class="fire" style="display: none"></div>

</div>
<div id="game">
    <div id="reloj"></div>
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
  <div id="trayectoria" class="sibling-fade">
    <!-- Aquí se mostrarán los escudos de los equipos -->
  </div>
    <div id="respuesta" class="cont">
  <label for="jugadoraInput">
      <input type="text" id="jugadoraInput" placeholder="Escribe el nombre de la jugadora">
      <div id="sugerencias-container">
          <ul id="sugerencias"></ul>
      </div>
  </label>
  <button onclick="checkAnswer()" id="botonVerificar">Verificar</button>
  </div>
</div>
<script src="../js/funciones-tablas.js"></script>
<script src="../js/admin.js"></script>
<script src="../js/guesstrayectoria.js"></script>
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
<script>
    // Añadir el evento de input al campo de texto
    const textoInput = document.getElementById("jugadoraInput");
    textoInput.addEventListener('input', debounce(handleAutocompletePlayer, 1000)); // Debounce de 300ms
</script>
</body>
</html>
