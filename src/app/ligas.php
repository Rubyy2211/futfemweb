<!doctype html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
    <link rel="stylesheet" href="../css/estilos.css">
    <link rel="stylesheet" href="../css/efectos/wave.css">
    <style>
        .team-card {
            /* background-color: #222;*/
            border-radius: 15px;
            padding: 20px;
            width: 350px;
            height: 80vh;
            text-align: center;
            /*box-shadow: 0 0 15px rgba(0, 0, 0, 0.8);*/
            align-content: center;
        }

        .team-card>div {

            border: 1px solid rgba(255, 255, 255, .25);
            border-radius: 20px;
            background-color: rgba(128, 0, 128, 0.45);
            box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.25);

            backdrop-filter: blur(10px);
        }

        .team-card #team {
            width: 100px;
            margin-bottom: 10px;
        }

        .team-name {
            font-size: 24px;
            font-weight: bold;
        }

        .team-country {
            font-size: 18px;
            margin: 5px 0;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            background: var(--color-primario);
            height: 75px;
        }

        .team-country div {
            width: 100%;
        }

        .team-stats {
            margin: 20px 0;
        }

        .stat {
            font-size: 18px;
            margin: 5px 0;
        }

        .league {
            font-size: 16px;
            margin-top: 10px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 70px;
            background: var(--color-primario);
        }

        .league div {
            width: 100%;
        }

        #logo {
            width: 50px;
            max-height: 60px;
            margin-top: 5px;
        }

        .team {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            background: var(--color-primario);
            height: 50%;
        }

        .team div {
            width: 100%;
        }
    </style>
</head>

<body>
    <?php require_once 'header.html' ?>
    <div class="wave"></div>
    <div class="wave"></div>
    <div class="wave"></div>
    <div class="team-card">
        <div class="team-country">
            <i class="bi bi-chevron-compact-left" onclick="PaisAnterior()"></i> <!-- Para cambiar país -->
            <div onclick="redireccionarLigas()">
                <span id="paisNombre">England</span> <!-- Nombre del país -->
                <img src="#" alt="England Flag" width="30" id="country" class="pais1">
            </div>
            <i class="bi bi-chevron-compact-right" onclick="PaisSiguiente()"></i> <!-- Para cambiar país -->
        </div>

        <div class="team">
            <i class="bi bi-chevron-compact-left" onclick="equipoAnterior()"></i> <!-- Para cambiar equipo -->
            <div onclick="redireccionarEquipo()">
                <p class="team-name" id="team-name">Liverpool</p>
                <img src="https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg" alt="Liverpool Logo" id="team">
            </div>
            <i class="bi bi-chevron-compact-right" onclick="equipoSiguiente()"></i> <!-- Para cambiar equipo -->
        </div>

        <div class="league">
            <i class="bi bi-chevron-compact-left" onclick="ligaAnterior()"></i> <!-- Para cambiar liga -->
            <div onclick="redireccionarEquipos()">
                <img class="league-logo" src="https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg" alt="Premier League Logo" id="logo">
            </div>
            <i class="bi bi-chevron-compact-right" onclick="ligaSiguiente()"></i> <!-- Para cambiar liga -->
        </div>
    </div>
    <script rel="script" src="../js/funciones-tablas.js"></script>
    <script rel="script" src="../js/ligas.js"></script>
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script>
        function redireccionarEquipo() {
            // Obtén la clase del logo del equipo
            const equipoLogo = document.getElementById("team").classList[0];

            // Redirigir a equipo.php con la clase del equipo como parámetro en la URL
            window.location.href = `equipo.php?equipo=${equipoLogo}`;
        }

        function redireccionarLigas() {
            // Obtén la clase del logo del pais
            const paisLogo = document.getElementById("country").classList[0];

            // Redirigir a ligas-pais.php con la clase del pais como parámetro en la URL            
            window.location.href = `admin\\ligas-pais.php?pais=${paisLogo}`;
        }

        function redireccionarEquipos() {
            // Obtén la clase del logo del liga
            const ligaLogo = document.getElementById("logo").classList[0];

            // Redirigir a equipos-liga.php con la clase de la liga como parámetro en la URL
            window.location.href = `admin\\equipos-liga.php?liga=${ligaLogo}`;
        }
    </script>
</body>

</html>