<?php
session_start();
?>
<head>
    <title>Panel Admin</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="../css/estilos.css">
    <link rel="stylesheet" href="../css/combo.css">
    <link rel="stylesheet" href="../css/admin.css">
    <style>
        .Juegos {
            display: grid;
            color: black;
            width: 100%;
            margin: 0;
            justify-content: center;
        }
        .tabla {
            display: grid;
            grid-template-columns: repeat(2, 1fr); /* 2 columnas de igual tamaño */
            grid-template-rows: repeat(3, auto); /* 3 filas de altura automática */
            gap: 20px; /* Espacio entre los elementos */
            margin: 20px 20px 0 20px; /* Margen alrededor de la tabla */
        }
        .collapse{
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .Juegos>div {
            background: white;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin: 5px 5px;
            width: 75vw;
            height: 100%;
            background: var(--color-detalles);
            border: 1px solid var(--color-primario);
        }
        #paises, #clubes {
            display: flex;
            flex-direction: column; /* Alinear etiquetas y entradas en columna */
            align-items: center;
        }
        label {
            margin-bottom: 5px; /* Espacio entre etiqueta y campo de entrada */
        }
        input{
            margin-bottom: 20px;
        }
        .card-header{
            border-bottom: none;
            width: 100%;
            background: none;
        }
        .card-header a {
            display: flex;                 /* Usa flexbox para alinear elementos */
            justify-content: space-between; /* Espacio entre el texto y el ícono */
            text-decoration: none;        /* Elimina el subrayado del enlace */
            color: inherit;               /* Mantiene el color del texto */
            padding: 10px;                /* Espacio interno para el enlace */
        }

        .card-header a i {
            margin-left: 10px;           /* Espacio entre el texto y el ícono */
        }

        i{
            align-self: end;
        }
    </style>
</head>
<body class="loading">
<div class="Juegos" id="accordion" role="tablist">
    <div id="juego-trayectoria" class="card">
        <div class="card-header">
            <a data-toggle="collapse" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Juego Trayectoria<i class="bi bi-chevron-down"></i></a>
        </div>
        <div id="collapseOne" class="collapse" role="tabpanel" aria-labelledby="headingOne">
            <label for="id-jugadora1">Id de Jugadora:</label>
            <input id="id-jugadora1">
            <div id="sugerencias-container">
                <ul id="sugerencias"></ul>
            </div>
            <button onclick="actualizarGuessTrayectoria()">Actualizar</button>
        </div>
    </div>

    <div id="juego-grid" class="card">
        <div class="card-header">
            <a data-toggle="collapse" href="#collapseGrid" aria-expanded="false" aria-controls="collapseGrid">Juego Grid<i class="bi bi-chevron-down"></i></a>
        </div>
        <div id="collapseGrid" class="collapse" role="tabpanel" aria-labelledby="headingGrid">
            <div class="tabla">
                <div id="paises">
                    <label for="id1">País 1:</label>
                    <input id="id1">
                    <label for="id2">País 2:</label>
                    <input id="id2">
                    <label for="id3">País 3:</label>
                    <input id="id3">
                </div>
                <div id="clubes">
                    <label for="idc1">Club 1:</label>
                    <input id="idc1">
                    <label for="idc2">Club 2:</label>
                    <input id="idc2">
                    <label for="idc3">Club 3:</label>
                    <input id="idc3">
                </div>
            </div>
            <button onclick="actualizarGrid()">Actualizar</button>
        </div>
    </div>

    <div id="juego-clubs" class="card">
        <div class="card-header">
            <a data-toggle="collapse" href="#collapseClubs" aria-expanded="false" aria-controls="collapseClubs">Juego Clubs<i class="bi bi-chevron-down"></i></a>
        </div>
        <div id="collapseClubs" class="collapse" role="tabpanel" aria-labelledby="headingClubs">
            <label for="id-club">Club:</label>
            <input id="id-club">
            <button onclick="">Actualizar</button>
        </div>
    </div>

    <div id="juego-bingo" class="card">
        <div class="card-header">
            <a data-toggle="collapse" href="#collapseBingo" aria-expanded="false" aria-controls="collapseBingo">Juego Bingo<i class="bi bi-chevron-down"></i></a>
        </div>
        <div id="collapseBingo" class="collapse" role="tabpanel" aria-labelledby="headingBingo">
            <label for="id-bingo">Bingo:</label>
            <input id="id-bingo">
            <button onclick="">Actualizar</button>
        </div>
    </div>

    <div id="juego-nations" class="card">
        <div class="card-header">
            <a data-toggle="collapse" href="#collapseNations" aria-expanded="false" aria-controls="collapseNations">Juego Nations<i class="bi bi-chevron-down"></i></a>
        </div>
        <div id="collapseNations" class="collapse" role="tabpanel" aria-labelledby="headingNations">
            <label for="id-nation">Nación:</label>
            <input id="id-nation">
            <button onclick="">Actualizar</button>
        </div>
    </div>

    <div id="juego-wordle" class="card">
        <div class="card-header">
            <a data-toggle="collapse" href="#collapseWordle" aria-expanded="false" aria-controls="collapseWordle">Juego Wordle<i class="bi bi-chevron-down"></i></a>
        </div>
        <div id="collapseWordle" class="collapse" role="tabpanel" aria-labelledby="headingWordle">
            <label for="id-jugadora2"></label>
            <input id="id-jugadora2">
            <button onclick="actualizarWordle()">Actualizar</button>
        </div>
    </div>

    <div id="juego-adivina" class="card">
        <div class="card-header">
            <a data-toggle="collapse" href="#collapseAdivina" aria-expanded="false" aria-controls="collapseAdivina">Juego Adivina<i class="bi bi-chevron-down"></i></a>
        </div>
        <div id="collapseAdivina" class="collapse" role="tabpanel" aria-labelledby="headingAdivina">
            <label for="id-jugadora3"></label>
            <input id="id-jugadora3">
            <div id="sugerencias-container">
                <ul id="sugerencias3"></ul>
            </div>
            <button onclick="actualizarAdivina()">Actualizar</button>
        </div>
    </div>

    <div id="juego-?" class="card">
        <div class="card-header">
            <a data-toggle="collapse" href="#collapseUnknown" aria-expanded="false" aria-controls="collapseUnknown">Juego Compañeras<i class="bi bi-chevron-down"></i></a>
        </div>
        <div id="collapseUnknown" class="collapse" role="tabpanel" aria-labelledby="headingUnknown">
            <label for="id-jugadora4">Jugadora:</label>
            <input id="id-jugadora4">
            <div id="sugerencias-container">
                <ul id="sugerencias4"></ul>
            </div>
            <button onclick="actualizarGuessCompanyeras()">Actualizar</button>
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
    Grid();
    Companyeras();

    // Añadir el evento de input al campo de texto
    const jugadora1 = document.getElementById("id-jugadora1");
    jugadora1.addEventListener('input', debounce((event) => handleAutocompleteJ(event, "sugerencias"), 1000));

    const jugadora7 = document.getElementById("id-jugadora3");
    jugadora7.addEventListener('input', debounce((event) => handleAutocompleteJ(event, "sugerencias3"), 1000));

    const jugadora4 = document.getElementById("id-jugadora4");
    jugadora4.addEventListener('input', debounce((event) => handleAutocompleteJ(event, "sugerencias4"), 1000));
</script>
</body>
