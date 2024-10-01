<?php
session_start()
?>
<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Panel Admin</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/estilos.css">
    <link rel="stylesheet" href="../css/efectos/wave.css">
</head>
<style>
    .Juegos{
        display: grid;
        color: black;
        max-width: 100vw;
        margin: 0;
        justify-content: center;
    }
    .Juegos .row{
        width: 100vw;
        height: 25vh;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin: 0;
    }
    .Juegos div div{
        border-radius: 20px;
        background: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 5px 5px;
        width: 20%;
        height: 95%;
    }
</style>
<body class="loading">
<div class="wave"></div>
<div class="wave"></div>
<div class="wave"></div>
<?php require_once 'header-admin.html';?>

<h2>Bienvenido, <?php echo $_SESSION['user']['nombre']?></h2>
<div class="Juegos container mt-5">
    <div class="row">
    <div id="juego-trayectoria">
        <h3>Juego Trayectoria</h3>
        <label for="id-jugadora1"></label><input id="id-jugadora1">
        <button onclick="actualizarGuessTrayectoria()">Actualizar</button>
    </div>
    <div id="juego-grid">
        <h3>Juego Grid</h3>
        <label for=""></label><input id="">
        <button onclick="">Actualizar</button>
    </div>
    <div id="juego-clubs">
        <h3>Juego Clubs</h3>
        <label for=""></label><input id="">
        <button onclick="">Actualizar</button>
    </div>
    <div id="juego-bingo">
        <h3>Juego Bingo</h3>
        <label for=""></label><input id="">
        <button onclick="">Actualizar</button>
    </div>
    </div>
    <div class="row">
    <div id="juego-nations">
        <h3>Juego Nations</h3>
        <label for=""></label><input id="">
        <button onclick="">Actualizar</button>
    </div>
    <div id="juego-wordle">
        <h3>Juego Wordle</h3>
        <label for="id-jugadora2"></label><input id="id-jugadora2"> <!--$numeros = [1, 2, 4, 5, 6, 12, 14, 15, 16, 17, 19, 21, 24, 33, 37, 38, 52, 56, 57, 63, 66, 67, 68, 72, 87, 93, 117, 155, 171, 195, 197, 204, 215, 219, 220, 225, 226, 227, 233, 234, 237, 240, 242, 246, 250, 254, 257, 258, 262, 263, 264, 266, 271, 294, 297, 298, 300, 302, 303, 308, 310, 311, 314, 318, 326, 327, 330, 331, 342, 350, 355, 359, 371, 382, 383];
-->
        <button onclick="actualizarWordle()">Actualizar</button>
    </div>
    <div id="juego-adivina">
        <h3>Juego Adivina</h3>
        <label for="id-jugadora3"></label><input id="id-jugadora3">
        <button onclick="actualizarAdivina()">Actualizar</button>
    </div>
    <div id="juego-?">
        <h3>Juego ?</h3>
        <label for=""></label><input id="">
        <button onclick="">Actualizar</button>
    </div>
    </div>
</div>
<script src="control-acceso.js" data-roles-restringidos="2"></script>

<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
<script src="../js/admin.js"></script>
<script>
    GTrayectoria();
    Wordle();
    Adivina();
</script>
</body>
</html>
