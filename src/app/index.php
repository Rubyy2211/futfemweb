<?php
session_start()?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FUTFEM</title>
    <link rel="icon" href="../img/prueba%20logo.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/index.css">
    <link rel="stylesheet" href="../css/estilos.css?v1.0">
    <link rel="stylesheet" href="../css/efectos/fade.css">
    <link rel="stylesheet" href="../css/efectos/glow-border.css">
</head>
<body>
<?php require_once 'header.html' ?>
<section class="juegos">
<div class="container mt-5 sibling-fade">
    <div class="row sibling-fade">
        <div class="col-md-3">
            <div id="racha-1" class="fire"></div>
            <div class="game-button glow" onclick="redireccionarA('trayectoria.php')">
                <img src="../img/trayectoria.jpg" alt="Game 1">
                <h4>Futfem Trajectory</h4>
                <button class="btn btn-primary btn-block" onclick="window.location.href='trayectoria.php'">PLAY</button>
            </div>
        </div>
        <div class="col-md-3">
            <div class="game-button glow" onclick="redireccionarA('grid.php')">
                <img src="../img/Captura%20de%20pantalla%202024-09-01%20192457.png" alt="Game 2">
                <h4>Futfem Grid</h4>
                <button class="btn btn-primary btn-block" onclick="window.location.href='grid.php'">PLAY</button>
            </div>
        </div>
        <div class="col-md-3">
            <div class="game-button glow" onclick="redireccionarA('XI_Clubs.php')">
                <img src="../img/XI_Clubs.png" alt="Game 3">
                <h4>Futfem Clubs</h4>
                <button class="btn btn-primary btn-block" onclick="window.location.href='XI_Clubs.php'">PLAY</button>
            </div>
        </div>
        <div class="col-md-3">
            <div class="game-button glow" onclick="redireccionarA('bingo.php')">
                <img src="../img/Bingo.png" alt="Game 4">
                <h4>Futfem Bingo</h4>
                <button class="btn btn-primary btn-block" onclick="window.location.href='bingo.php'">PLAY</button>
            </div>
        </div>
    </div>
    <div class="row sibling-fade">
        <div class="col-md-3">
            <div class="game-button glow" onclick="redireccionarA('XI_Nations.php')">
                <img src="../img/XI_Nations.png" alt="Game 3">
                <h4>Futfem Nations</h4>
                <button class="btn btn-primary btn-block" onclick="window.location.href='XI_Nations.php'">PLAY</button>
            </div>
        </div>
        <div class="col-md-3">
            <div class="game-button glow" onclick="redireccionarA('wordle.php')">
                <img src="../img/Captura%20de%20pantalla%202024-09-01%20201329.png" alt="Game 6">
                <h4>Futfem Wordle</h4>
                <button class="btn btn-primary btn-block" onclick="window.location.href='wordle.php'">PLAY</button>
            </div>
        </div>
        <div class="col-md-3">
            <div class="game-button glow" onclick="redireccionarA('adivina.php')">
                <img src="../img/ComingSoon.png" alt="Game 5">
                <h4>Futfem Guess</h4>
                <button class="btn btn-primary btn-block">PLAY</button>
            </div>
        </div>
        <div class="col-md-3">
            <div class="game-button glow" onclick="redireccionarA('compañeras.php')">
                <img src="../img/ComingSoon.png" alt="Game 6">
                <h4>Futfem Compañeras</h4>
                <button class="btn btn-primary btn-block">PLAY</button>
            </div>
        </div>
    </div>
</div>
</section>
<?php include './widgets/language.html'; ?>
<link rel="" href="widgets/language.html">
<script src="../js/redireccion.js"></script>
<script src="../js/funciones-tablas.js"></script>
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
<script>
    obtenerRacha(1)
</script>
</body>
</html>
