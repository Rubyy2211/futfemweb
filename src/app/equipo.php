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
    <link rel="stylesheet" href="../css/equipos.css">
    <link rel="stylesheet" href="../css/estilos.css">
    <style>
        body{
            text-align: center;
        }
        .contenedor{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100vw;
            overflow-x: hidden;
            min-width: 98vw;
        }
        #jugadoras-container{
            text-align: center;
            width: 100vw;
            display: flex;
            justify-content: center;
        }
        .col-md-4{
            /*background-color: rgba(128,0,128,0.45); /* Color de fondo primario */
            /*color: white; /* Color del texto */
            margin-bottom: 20px; /* Espaciado inferior entre botones */
            transition: transform 0.2s; /* Suavizar el efecto de transformación */
           /* border: 0.5px solid rgb(255, 255, 255);*/
            box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.25);

            backdrop-filter: blur(10px);
        }
        @media (min-width: 768px) {
            #jugadoras-container #nombre {
                position: absolute;
                font-size: 2vw;
                padding: 2px 5px;
                left: 5%;
                right: 5%;
                bottom: 7%;
                z-index: 2;
            }
            #jugadoras-container #apellido {
                position: absolute;
                right: 5%;
                left: 5%;
                bottom: 0;
                font-size: 1.7vw;
                padding: 2px 5px;
                font-weight: 700;
                z-index: 2;
                margin-bottom: 0;
            }

            .col-md-4 {
                max-width: fit-content;
                margin: 5px;
                display: flex;
                justify-content: end;
            }
        }
        @media (max-width: 768px) {
            #jugadoras-container p{
                z-index: 5;
            }
            .col-md-4 {
                max-width: 30%;
                margin: 5px;
                display: flex;
                justify-content: center;
                align-items: end;
                text-align: center;
            }
            #jugadoras-container #nombre {
                position: absolute;
                font-size: 2vw;
                padding: 2px 5px;
                left: 5%;
                right: 5%;
                bottom: 10%;
            }
            #jugadoras-container #apellido {
                position: absolute;
                right: 5%;
                left: 5%;
                bottom: 0;
                font-size: 2.5vw;
                padding: 2px 5px;
                font-weight: 700;
            }
            #jugadoras-container p{
                margin: 0;
            }
        }
    </style>
</head>
<body>
<?php require_once 'header.html'?>

<div class="contenedor">
    <h1>Jugadoras del Equipo</h1>
    <div id="jugadoras-container" class="row"></div>
</div>
<script>
    async function cargarJugadoras(equipoId) {
        try {
            const response = await fetch(`../api/jugadoraxequipo?equipo=${equipoId}`);

            // Verificar si la respuesta fue exitosa
            if (!response.ok) {
                throw new Error('Error en la red');
            }

            const jugadoras = await response.json(); // Parsear directamente a JSON

            const container = document.getElementById('jugadoras-container');
            container.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevas imágenes

            // Crear imágenes para cada jugadora
            jugadoras.forEach(jugadora => {
                const col = document.createElement('div');
                col.classList.add('col-md-4'); // Cambia el tamaño según lo necesites
                col.style.height = 'auto'; // Deja que la altura se ajuste automáticamente o usa un valor específico
                col.style.position = 'relative'; // Necesario para la imagen con posición absoluta
                col.style.borderRadius = '20px';
                col.classList.add('equipo'+equipoId);

                // Establecer imagen de fondo para el escudo, en la esquina superior izquierda
                col.style.backgroundImage = `linear-gradient(rgba(128,0,128,0.45),rgba(128,0,128,0.45)), url(${jugadora.escudo})`;
                col.style.backgroundSize = 'auto'; // Ajustar el tamaño del escudo (cambiar según lo necesites)
                col.style.backgroundPosition = 'center center'; // Colocar el fondo en la esquina superior izquierda
                col.style.backgroundRepeat = 'no-repeat'; // No repetir la imagen de fondo*/
                col.style.position = 'relative'; // Para posicionar el texto debajo del escudo
                col.style.padding = '0';


                const img = document.createElement('img');
                img.src = jugadora.imagen; // Usar el campo correcto
                img.className = `jugadora-${jugadora.id_jugadora}`;
                img.alt = `Imagen de ${jugadora.id_jugadora}`;
                img.style.width = '100%';
                img.style.zIndex = '+1';
                img.style.borderRadius = '20px';


                // Crear un nuevo elemento para el nombre de la jugadora
                const nombre = document.createElement('p');
                nombre.textContent = jugadora.Nombre.split(' ')[0]; // Solo toma la primera palabra del nombre
                nombre.id = 'nombre';

                // Crear un nuevo elemento para el nombre de la jugadora
                const apellidos = document.createElement('p');
                apellidos.textContent = jugadora.Apellidos.split(' ')[0].toUpperCase(); // Solo toma la primera palabra del nombre
                apellidos.id = 'apellido';


                // Agregar la imagen y el nombre al contenedor
                col.appendChild(nombre); // Agregar el nombre de la jugadora debajo del escudo
                col.appendChild(apellidos); // Agregar el nombre de la jugadora debajo del escudo
                col.appendChild(img);
                container.appendChild(col);
            });
        } catch (error) {
            console.error('Error al cargar las jugadoras:', error);
        }
    }

    // Obtener el ID del equipo de la URL y cargar las jugadoras
    const urlParams = new URLSearchParams(window.location.search);
    const equipoId = urlParams.get('equipo');

    if (equipoId) {
        cargarJugadoras(equipoId);
    } else {
        console.error('ID de equipo no encontrado en la URL');
    }

</script>
<script rel="script" src="../js/funciones-tablas.js"></script>
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>