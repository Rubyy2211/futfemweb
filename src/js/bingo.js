// Ejemplo de uso
ponerBanderas([7, 16, 1], ["c21", "c32", "c33"]); // Llama a la función con los IDs de los países que quieras
ponerLigas(1, 4, 5, "c13","c34"); // Llama a la función con los IDs de los países que quieras
// Llama a la función con los IDs de los equipos que quieras
ponerClubes([1,2, 44], ["c12", "c14", "c31"]);
ponerEdades( "c11", "c24", "c22", '../img/edades/menor20.png','../img/edades/mayor30.png', '../img/edades/igual25.png');

async function sacarEquipos(nombre) {
    try {
        // Realizar la solicitud fetch
        const response = await fetch(`../api/guesstrayectoria?id=${encodeURIComponent(nombre)}`);

        // Verificar que la solicitud fue exitosa
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        // Convertir la respuesta a JSON
        const data = await response.json();
        console.log("Respuesta del servidor:", data);

        // Verificar si hubo un error en el JSON recibido
        if (data.error) {
            throw new Error(data.error);
        }

        // Comprobar si data es una lista de objetos
        if (Array.isArray(data)) {
            return data; // Devuelve la lista de objetos
        } else {
            console.warn('La respuesta no es una lista válida de objetos:', data);
            return null;
        }
    } catch (error) {
        console.error('Error al obtener los equipos:', error);
        return null;
    }
}
function calcularEdad(fechaNacimiento) {
    const hoy = new Date(); // Fecha actual
    const nacimiento = new Date(fechaNacimiento); // Convertir la fecha de nacimiento a un objeto Date
    let edad = hoy.getFullYear() - nacimiento.getFullYear(); // Calcular la diferencia de años
    const mes = hoy.getMonth() - nacimiento.getMonth(); // Calcular la diferencia de meses

    // Ajustar la edad si el cumpleaños de este año aún no ha ocurrido
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }

    return edad;
}
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
            //console.log("¡Coincidencia de país encontrada!");
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
    if (img.alt.includes("Edad")) {
        // Verificar si la clase contiene 'EdadMenor'
        const claseEdadMenor = Array.from(img.classList).find(cls => cls.startsWith('EdadMenor'));
        const claseEdadMayor = Array.from(img.classList).find(cls => cls.startsWith('EdadMayor'));
        const claseEdad = Array.from(img.classList).find(cls => cls.startsWith('EdadIgual'));
        if (claseEdadMenor) {
            // Extraer el número después de 'EdadMenor'
            const edadLimite = parseInt(claseEdadMenor.replace('EdadMenor', ''), 10);

            if (jugador.edad < edadLimite) {
                console.log(`¡Coincidencia de edad menor de ${edadLimite}!`);
                bloquearCeldaEstilo(cell, jugador.foto); // Usar la imagen correcta
                hasMatch = true;
            } else {
                console.log(`No hay coincidencia de edad menor de ${edadLimite}.`);
                hasMatch = false;
            }
        }
        if (claseEdadMayor) {
            // Extraer el número después de 'EdadMayor'
            const edadLimite = parseInt(claseEdadMayor.replace('EdadMayor', ''), 10);

            if (jugador.edad > edadLimite) {
                console.log(`¡Coincidencia de edad mayor de ${edadLimite}!`);
                bloquearCeldaEstilo(cell, jugador.foto); // Usar la imagen correcta
                hasMatch = true;
            } else {
                console.log(`No hay coincidencia de edad mayor de ${edadLimite}.`);
                hasMatch = false;
            }
        }
        // Si no es 'EdadMenor', verificar las otras clases de edad
        if (claseEdad) {
            // Extraer el número después de 'EdadMenor'
            const edadLimite = parseInt(claseEdad.replace('EdadIgual', ''), 10);

            if (jugador.edad === edadLimite) {
                console.log(`¡Coincidencia de edad igual a ${edadLimite}!`);
                bloquearCeldaEstilo(cell, jugador.foto); // Usar la imagen correcta
                hasMatch = true;
            } else {
                console.log(`No hay coincidencia de edad igual a ${edadLimite}.`);
                hasMatch = false;
            }
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
            const img=document.getElementById("player-image");
            img.src = jugador.imagen;
            img.className=jugador.id;

            // Obtener la edad, país y equipos asociados al jugador
            const edad = calcularEdad(jugador.Nacimiento);
            const pais = await obtenerIdPais(jugador.id);
            const equipos = await sacarEquipos(jugador.id);

            if (equipos && equipos.length > 0) {
                const nombresEquipos = equipos.map(e => e.equipo); // Extraer los nombres de los equipos
                const ligasEquipos = equipos.map(e => e.liga); // Extraer las ligas de los equipos
                let data = { 'pais': pais, 'edad': edad, 'trayectoria': nombresEquipos, 'foto': jugador.imagen, 'liga': ligasEquipos};

                /*console.log('Paises:', pais);
                console.log('Equipos:', data);
                console.log('Ligas:', data.liga);
                console.log('Edad:', data.edad);*/

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

