<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz de Fútbol</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">


    <link rel="stylesheet" href="../css/adivina.css">
    <link rel="stylesheet" href="../css/estilos.css">
</head>

<body>
    <?php require_once 'header.html' ?>


    <div class="container-fluid">
        <div id="vidas">
            <img id="vida1" src="../img/vida.png" alt="Vida 1">
            <img id="vida2" src="../img/vida.png" alt="Vida 2">
            <img id="vida3" src="../img/vida.png" alt="Vida 3">
        </div>

        <!-- Imagen y nombre del jugador -->
        <div class="player">
            <img id="player-image" src="../img/predeterm.jpg" alt="Jugador">
            <div id="player-name" class="player-name"></div>
            <span id="msgResultado"></span>
        </div>

        <!-- Preguntas -->
        <label for="pregunta"></label><select name="pregunta" id="pregunta">
            <option value="">Selecciona una pregunta</option>
            <option value="1">¿ Juega actualmente en ___ ?</option>
            <option value="2">¿ Ha jugado alguna vez en ___ ?</option>
            <option value="3">¿ Ella es de ___ ?</option>
            <option value="4">¿ Juega como ___ ?</option>
            <option value="5">¿ Tiene ___ años de edad ?</option>
            <option value="6">¿ Es mayor que ___ ?</option>
            <option value="7">¿ Es más joven que ___ ?</option>
            <option value="8">¿ Juega en la liga ___ ?</option>
            <option value="9">¿ Ha jugado alguna vez en la liga ___ ?</option>
        </select>

        <!--Pais, Liga y Equipo -->
        <label for="opciones"></label><select class="oculto" name="opciones" id="opciones">
            <option value=""> Selecciona ... </option>
        </select>

        <div class="oculto">
            <span id="showAgeText"></span>
            <label for="edad"></label><input type="range" name="edad" id="edad" min="16" max="40">
        </div>

        <button id="askQuestion" class="skip-button" onclick="askQuestion()">Preguntar</button>
        <h4 id="questionsLeft"> Te quedan 10 preguntas: </h4>

        <div id="preguntas">

        </div>

        <div class="container">
            <label for="input"><input type="text" id="nombre" placeholder="Escribe el nombre de la jugadora"></label>
            <button onclick="validarJugadora()">Verificar</button>
            <button>Rendirse</button>
            <span id="lifeLeft"></span>
            <!-- <div class="contenedor">
                <h1 id="lifeLeft">Efecto de máquina de escribir.<span>&#160;</span></h1>
            </div> -->
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
<script src="../js/admin.js"></script>

    <script src="../js/adivinajugadora.js"></script>
</body>

</html>