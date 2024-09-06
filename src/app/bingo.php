<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz de Fútbol</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="../../css/bingo.css">
    <link rel="stylesheet" href="../../css/estilos.css">
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
    <button class="skip-button" onclick="skipPlayer()">SKIP</button>

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
</div>

<script>
    function handleCellClick(event, jugador) {
        const cell = event.currentTarget;
        //console.log(cell.id);

        // Obtener la imagen dentro de la celda clicada
        const img = event.currentTarget.querySelector('img');
        if (!img) {
            console.log("No hay imagen en esta celda.");
            return false;
        }

        const imgClass = img.className; // Obtener la clase de la imagen
        //console.log("Clase de la imagen:", imgClass);

        let hasMatch = false;

        // Verificar si es un país o un club según el atributo alt de la imagen
        if (img.alt === "Pais") {
            if (imgClass === `pais${jugador.pais}`) { // Compara con el campo de país del jugador
                console.log("¡Coincidencia de país encontrada!");
                bloquearCeldaEstilo(cell, jugador.foto); // Usar la imagen correcta
                hasMatch = true;
            } else {
                console.log("No hay coincidencia de país.");
            }
        }
        if (img.alt === "Liga") {
            if (Array.isArray(jugador.liga)) { // Verificar que trayectoria sea un array
                const ligaMatch = jugador.liga.some(liga => `liga${liga}` === imgClass);

                if (ligaMatch) {
                    console.log("¡Coincidencia de liga encontrada!");
                    bloquearCeldaEstilo(cell, jugador.foto); // Usar la imagen correcta
                    hasMatch = true;
                } else {
                    console.log("No hay coincidencia de liga.");
                }
            } else {
                console.log("La trayectoria no es un array o está vacía.");
            }
        }


        if (img.alt === "Club") {
            if (Array.isArray(jugador.trayectoria)) { // Verificar que trayectoria sea un array
                const clubMatch = jugador.trayectoria.some(club => `club${club}` === imgClass);

                if (clubMatch) {
                    console.log("¡Coincidencia de club encontrada!");
                    bloquearCeldaEstilo(cell, jugador.foto); // Usar la imagen correcta
                    hasMatch = true;
                } else {
                    console.log("No hay coincidencia de club.");
                }
            } else {
                console.log("La trayectoria no es un array o está vacía.");
            }
        }

        return hasMatch;
    }

    // Función para realizar el fetch y obtener los datos del jugador
    function skipPlayer() {
        // Realizar una solicitud fetch para cambiar el jugador
        fetch('../api/cambiarjugador')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta del servidor');
                }
                return response.json(); // Parsear la respuesta JSON
            })
            .then(async jugador => {
                //console.log(jugador);

                // Actualizar el nombre y la imagen del jugador
                document.getElementById("player-name").textContent = jugador.nombre;
                document.getElementById("player-image").src = jugador.imagen;

                // Obtener el país y equipos asociados al jugador
                const pais = await obtenerIdPais(jugador.nombre);
                const equipos = await sacarEquipos(jugador.nombre);

                if (equipos && equipos.length > 0) {
                    const nombresEquipos = equipos.map(e => e.Equipo); // Extraer los nombres de los equipos
                    const ligasEquipos = equipos.map(e => e.liga); // Extraer las ligas de los equipos
                    let data = { 'pais': pais, 'trayectoria': nombresEquipos, 'foto': jugador.imagen, 'liga': ligasEquipos};

       /*             console.log('Paises:', pais);
                    console.log('Equipos:', data);
                    console.log('Ligas:', data.liga);*/

                    // Remover event listeners anteriores
                    const cells = document.querySelectorAll('td');
                    cells.forEach(cell => {
                        let newCell = cell.cloneNode(true); // Clonar la celda para eliminar event listeners antiguos
                        cell.parentNode.replaceChild(newCell, cell); // Reemplazar la celda antigua con la nueva

                        // Añadir un nuevo event listener
                        newCell.addEventListener('click', function (event) {
                            let click = handleCellClick(event, data); // Pasar la data actualizada
                            if (click) {
                                newCell.removeEventListener('click', handleCellClick);
                                skipPlayer();
                            }else{
                                newCell.classList.add('tremble');
                                setTimeout(() => {
                                    newCell.classList.remove('tremble');
                                }, 500); // Duración de la animación
                            }
                        });
                    });
                } else {
                    console.error('No se encontraron equipos para el jugador:', jugador.nombre);
                }
            })
            .catch(error => {
                console.error('Hubo un problema con la solicitud fetch:', error);
            });
    }

    function bloquearCeldaEstilo(celda, jugadoraImagen) {
        // Añadir la clase 'blocked' para aplicar los estilos CSS definidos
        celda.classList.add('blocked');

        // Seleccionar la imagen existente (de fondo) dentro de la celda y añadir la clase 'background-img'
        const backgroundImg = celda.querySelector('img');
        if (backgroundImg) {
            backgroundImg.classList.add('background-img'); // Añadir clase para imagen de fondo
            //backgroundImg.style.opacity = 0.3;  // Hacer la imagen de fondo semi-transparente
        } else {
            console.error('No se encontró una imagen de fondo en la celda.');
            return;
        }

        // Crear una nueva imagen para el jugador
        const playerImg = document.createElement('img');
        playerImg.src = jugadoraImagen; // Cambia por la ruta real de la imagen del jugador
        playerImg.alt = 'Jugador';
        playerImg.classList.add('player-imagen'); // Añadir la clase player-img

        // Aplicar estilos a la imagen del jugador
        playerImg.style.zIndex = 3;         // Colocar la imagen del jugador al frente
        playerImg.style.position = 'absolute'; // Asegurarse de que la imagen del jugador esté posicionada correctamente
        playerImg.style.opacity = 1;        // Mostrar la imagen completamente visible

        // Insertar la nueva imagen del jugador en la celda
        celda.style.position = 'relative'; // Asegurar que la celda sea un contenedor posicionado
        celda.appendChild(playerImg);      // Añadir la imagen del jugador como un hijo de la celda
    }

</script>


<script>
    // Seleccionar todas las celdas de la tabla
    const cells = document.querySelectorAll('td');

    // Añadir un event listener a cada celda
    cells.forEach(cell => {
        cell.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevenir la propagación del evento de clic
            // Remover la clase 'selected' de cualquier otra celda
            cells.forEach(c => c.classList.remove('selected'));

            // Añadir la clase 'selected' a la celda que se hizo clic
            this.classList.add('selected');
        });
    });
</script>

<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
<script src="../js/verificar.js"></script>
<script src="../js/bingo.js"></script>
</body>
</html>
