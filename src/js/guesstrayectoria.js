const jugadoraId = 1;

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

    const escudosDiv = document.createElement('div');
    const fotosJugadorasDiv = document.createElement('div');
    fotosJugadorasDiv.id = 'fotos'; // Mover id a fuera del loop

    data.forEach(item => {
        if (item.escudo) {
            const equipoInfo = document.createElement('div');
            const escudoImg = document.createElement('img');
            escudoImg.src = item.escudo;
            escudoImg.alt = 'Escudo';
            escudoImg.style.width = '100px';
            escudoImg.style.height = '100px';
            escudosDiv.id='equipos';
            // Crear y añadir el texto de los años
            const anyos = document.createElement('p');
            anyos.textContent = item.años;
            anyos.style.textAlign = 'center'; // Centrar el texto debajo del escudo
            equipoInfo.appendChild(escudoImg);
            equipoInfo.appendChild(anyos);
            escudosDiv.appendChild(equipoInfo);
        }

        if (item.imagen) {
            const jugadoraImg = document.createElement('img');
            jugadoraImg.src = item.imagen;
            jugadoraImg.alt = 'Imagen de la Jugadora';
            jugadoraImg.style.width = '100px';
            jugadoraImg.style.height = '100px';
            jugadoraImg.classList.add('ocultar');
            fotosJugadorasDiv.appendChild(jugadoraImg);
            fotosJugadorasDiv.classList.add(`id-${item.jugadora}`); // Usar prefijo para evitar conflictos de clase
        }
    });

    trayectoriaDiv.appendChild(escudosDiv);
    trayectoriaDiv.appendChild(fotosJugadorasDiv);
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
                handleSelectedJugadora(data[0].id_jugadora, data[0].Nombre_Completo, data[0].imagen, 'trayectoria');
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

function removeOcultarFromChildren() {
    const div = document.getElementById('fotos');

    if (div) {
        Array.from(div.children).forEach(child => {
            child.classList.remove('ocultar');
        });
    } else {
        console.error("No se encontró el div con el ID 'fotos'.");
    }
}

function cambiarImagenConFlip(nuevaImagenBase64) {
    const flipContainer = document.getElementById('flip-container');
    const imagenTrasera = document.getElementById('trasera');

    // Cambiar la imagen trasera antes de iniciar la animación
    imagenTrasera.src = nuevaImagenBase64;

    // Añadir la clase para empezar el volteo
    flipContainer.querySelector('.flipper').classList.add('flipping');

    // Opcional: Si deseas cambiar la imagen frontal a la misma que la trasera después del volteo
    setTimeout(() => {
        const imagenFrontal = document.getElementById('frontal');
        imagenFrontal.src = nuevaImagenBase64;
    }, 1200); // Tiempo de la animación
}




