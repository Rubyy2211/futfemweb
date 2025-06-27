<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Futfem Bingo</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/bingo.css">
    <link rel="stylesheet" href="../css/estilos.css">
</head>
<body>
<?php require_once 'header.html'?>
<div class="contenedor">
    <!-- Imagen y nombre del jugador -->
    <div class="player">
        <img id="player-image" src="../img/predeterm.jpg" alt="Jugador">
        <div id="player-name" class="player-name">Jugadora</div>
        <!-- Botón de Skip -->
    </div>
    <button class="skip-button" onclick="skipPlayer(paises,equipos,ligas)">SKIP</button>
    <div id="reloj"></div>
<table id="grid">
    <tbody>
        <tr>
            <td id="c11"></td>
            <td id="c12"></td>
            <td id="c13"></td>
            <td id="c14"></td>
        </tr>
        <tr>
            <td id="c21"></td>
            <td data-answer="jugadora1" id="c22"></td>
            <td data-answer="jugadora2" id="c23"></td>
            <td data-answer="jugadora3" id="c24"></td>
        </tr>
        <tr>
            <td id="c31"></td>
            <td data-answer="jugadora4" id="c32"></td>
            <td data-answer="jugadora5" id="c33"></td>
            <td data-answer="jugadora6" id="c34"></td>
        </tr>
        </tbody>
    </table>
<div id="resultado"></div>
</div>
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
<script src="../js/funciones-tablas.js"></script>
<script src="../js/verificar.js"></script>
<script src="../js/admin.js"></script>
<script src="../js/bingo.js"></script>
</body>
</html>
