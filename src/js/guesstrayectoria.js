const jugadoraId = 19;

async function loadJugadoraById(id) {
    try {
        const response = await fetch(`../api/guesstrayectoria?id=${id}`);
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Datos recibidos:', data);

        if (Array.isArray(data) && data.length > 0) {
            displayTrayectoria(data);
        } else {
            console.warn('No hay datos de la jugadora disponibles.');
        }
    } catch (error) {
        console.error('Error al cargar la jugadora:', error);
        document.getElementById('result').textContent = 'Error al cargar los datos.';
    }
}

function displayTrayectoria(data) {
    const trayectoriaDiv = document.getElementById('trayectoria');
    trayectoriaDiv.innerHTML = ''; // Limpiar contenido previo

    data.forEach(item => {
        // Crear el contenedor del flip
        const flipContainer = document.createElement('div');
        flipContainer.classList.add('flip-container');

        const flipper = document.createElement('div');
        flipper.classList.add('flipper');

        // Crear y añadir el lado frontal
        const front = document.createElement('div');
        front.classList.add('front');

        if (item.escudo) {
            const escudoImg = document.createElement('img');
            escudoImg.src = item.escudo;
            escudoImg.alt = 'Escudo';
            escudoImg.style.width = '100px';
            escudoImg.style.height = '100px';
            front.appendChild(escudoImg);

            // Crear y añadir el texto de los años
            const anyos = document.createElement('p');
            anyos.textContent = item.años;
            anyos.style.textAlign = 'center'; // Centrar el texto debajo del escudo
            front.appendChild(anyos);
        }

        // Crear y añadir el lado trasero
        const back = document.createElement('div');
        back.classList.add('back');

        if (item.imagen) {
            const jugadoraImg = document.createElement('img');
            jugadoraImg.src = item.imagen;
            jugadoraImg.alt = 'Imagen de la Jugadora';
            jugadoraImg.style.width = '100px';
            jugadoraImg.style.height = '100px';
            trayectoriaDiv.classList.add(`id-${item.jugadora}`); // Usar prefijo para evitar conflictos de clase
            back.appendChild(jugadoraImg);

            // Crear y añadir el texto de los años
            const anyos = document.createElement('p');
            anyos.textContent = item.años;
            anyos.style.textAlign = 'center'; // Centrar el texto debajo del escudo
            back.appendChild(anyos);
        }

        flipper.appendChild(front);
        flipper.appendChild(back);
        flipContainer.appendChild(flipper);
        trayectoriaDiv.appendChild(flipContainer);
    });
}

loadJugadoraById(jugadoraId);


async function checkAnswer() {
    try {
        const textoInput = document.getElementById('jugadoraInput');
        const texto = textoInput.value.trim();
        const url = `../api/guessjugadora?nombre=${encodeURIComponent(texto)}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Datos recibidos:', data);

        if (Array.isArray(data) && data.length > 0) {
            if (data.length === 1) {
                // Solo un resultado, no es necesario mostrar el modal
                handleSelectedJugadora(data[0].id_jugadora, data[0].Nombre_Completo,'trayectoria');
            } else {
                // Múltiples resultados, mostrar el modal
                showModalForSelection(data,'trayectoria');
            }
        } else {
            throw new Error("La respuesta no contiene los datos esperados.");
        }
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        document.getElementById('result').textContent = "Ocurrió un error al realizar la solicitud.";
    }
}

function cambiarImagenConFlip() {
    // Seleccionar todos los contenedores de flip
    const flipContainers = document.querySelectorAll('.flip-container');

    flipContainers.forEach(container => {
        const imagenTrasera = container.querySelector('.back img');
        const imagenFrontal = container.querySelector('.front img');



        // Añadir la clase para empezar el volteo
        container.querySelector('.flipper').classList.add('flipping');

        // Opcional: Si deseas cambiar la imagen frontal a la misma que la trasera después del volteo
        setTimeout(() => {


        }, 600); // Ajusta el tiempo según la duración de tu animación
    });
}




