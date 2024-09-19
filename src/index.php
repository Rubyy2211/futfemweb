<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FUTFEM</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="css/index.css">
    <link rel="stylesheet" href="css/estilos.css">
</head>
<body>
<header>
    <div class="container flex-row">

        <!-- Logo de GTI -->
        <a href="index.php" class="navbar-brand"><img src="img/bKi_2So-_400x400.jpg" alt="logo futfem"></a>
        <!-- Barra de navegación -->
        <!-- Botones de inicio de sesión y registro -->
        <div class="botones">
            <a href="#">Iniciar Sesión</a> <!-- Enlace a la página de inicio de sesión -->
            <a href="#">Registrarse</a> <!-- Enlace a la página de registro -->
        </div>

    </div>
</header>
<div class="container mt-5">
    <div class="row">
        <div class="col-md-3">
            <div class="game-button" onclick="redireccionarA('trayectoria.php')">
                <img src="img/trayectoria.jpg" alt="Game 1">
                <h4>Futfem Trajectory</h4>
                <button class="btn btn-primary btn-block" onclick="window.location.href='app/trayectoria.php'">PLAY</button>
            </div>
        </div>
        <div class="col-md-3">
            <div class="game-button" onclick="redireccionarA('grid.php')">
                <img src="img/Captura de pantalla 2024-09-01 192457.png" alt="Game 2">
                <h4>Futfem Grid</h4>
                <button class="btn btn-primary btn-block" onclick="window.location.href='app/grid.php'">PLAY</button>
            </div>
        </div>
        <div class="col-md-3">
            <div class="game-button" onclick="redireccionarA('XI_Clubs.php')">
                <img src="img/XI_Clubs.png" alt="Game 3">
                <h4>Futfem Clubs</h4>
                <button class="btn btn-primary btn-block" onclick="window.location.href='app/XI_Clubs.php'">PLAY</button>
            </div>
        </div>
        <div class="col-md-3">
            <div class="game-button" onclick="redireccionarA('bingo.php')">
                <img src="img/Bingo.png" alt="Game 4">
                <h4>Futfem Bingo</h4>
                <button class="btn btn-primary btn-block" onclick="window.location.href='app/bingo.php'">PLAY</button>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-3">
            <div class="game-button outline-out" onclick="redireccionarA('XI_Nations.php')">
                <img src="img/XI_Clubs.png" alt="Game 3">
                <h4>Futfem Nations</h4>
                <button class="btn btn-primary btn-block" onclick="window.location.href='app/XI_Nations.php'">PLAY</button>
            </div>
        </div>
        <div class="col-md-3">
            <div class="game-button" onclick="redireccionarA('wordle.php')">
                <img src="img/Captura de pantalla 2024-09-01 201329.png" alt="Game 6">
                <h4>Futfem Wordle</h4>
                <button class="btn btn-primary btn-block" onclick="window.location.href='app/wordle.php'">PLAY</button>
            </div>
        </div>
        <div class="col-md-3">
            <div class="game-button">
                <img src="#" alt="Game 5">
                <h4>Futbol11 Top10</h4>
                <button class="btn btn-primary btn-block">PLAY</button>
            </div>
        </div>
        <div class="col-md-3">
            <div class="game-button">
                <img src="#" alt="Game 6">
                <h4>Futbol11 Wordle</h4>
                <button class="btn btn-primary btn-block">PLAY</button>
            </div>
        </div>
    </div>
</div>
<script src="js/redireccion.js"></script>
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>
