let jugadoraId;
let nombreCompleto;
// Función principal que controla el flujo de carga
async function init() {
    let jugadora = await fetchData(1);
    jugadoraId = jugadora.idJugadora.toString(); // Convertir a string para comparación segura

    console.log(jugadora.idJugadora);
    let segundos = 60;
    // Obtener valores de localStorage
    const nombre = localStorage.getItem('nombre');
    const answer = localStorage.getItem('Attr1');

    // Verificar si el usuario ha ganado
    const isAnswerTrue = (answer === jugadoraId);
    console.log('Has won:', isAnswerTrue);

    if (isAnswerTrue) {
        await loadJugadoraById(jugadoraId, true);
        Ganaste('trayectoria');
        document.getElementById('result').textContent = nombre;
    } else {
        await loadJugadoraById(jugadoraId, false);
        if(!answer || answer.trim() === ''){
            startCounter(segundos, 'trayectoria');
            if(segundos===0){
                cambiarImagenConFlip();
            }
        }else{
            startCounter(segundos, 'trayectoria');
        }
        /*localStorage.removeItem('Attr1');
        localStorage.removeItem('nombre');*/
    }
}

async function loadJugadoraById(id, ganaste) {
    try {
        const response = await fetch(`../api/jugadora_trayectoria?id=${id}`);
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Datos recibidos:', data);

        if (Array.isArray(data) && data.length > 0) {
            displayTrayectoria(data, ganaste);
        } else {
            console.warn('No hay datos de la jugadora disponibles.');
        }
    } catch (error) {
        console.error('Error al cargar la jugadora:', error);
        document.getElementById('result').textContent = 'Error al cargar los datos.';
    }
}

function displayTrayectoria(data, acertaste) {
    const trayectoriaDiv = document.getElementById('trayectoria');
    trayectoriaDiv.setAttribute('Attr1', data[0].jugadora)
    trayectoriaDiv.innerHTML = ''; // Limpiar contenido previo
    const myst = document.getElementById('jugadora');

    const maxPerRow = 5;
    let currentRow;

    data.forEach((item, index) => {
        if (index % maxPerRow === 0) {
            currentRow = document.createElement('div');
            currentRow.classList.add('trayectoria-row');
            trayectoriaDiv.appendChild(currentRow);
        }

        const flipContainer = document.createElement('div');
        flipContainer.classList.add('flip-container');

        const flipper = document.createElement('div');
        flipper.classList.add('flipper');

        // Lado frontal
        const front = document.createElement('div');
        front.classList.add('front');

        if (item.escudo) {
            const escudoImg = document.createElement('img');
            escudoImg.src = item.escudo;
            escudoImg.alt = item.nombre;
            front.appendChild(escudoImg);

            const anyos = document.createElement('p');
            anyos.textContent = item.años;
            anyos.style.textAlign = 'center';
            front.appendChild(anyos);
        }

        flipper.appendChild(front);

        // Solo mostrar la parte trasera si el usuario ha ganado
        if (acertaste) {
            if (data.length > 0) {
                myst.src = data[0].ImagenJugadora; // Asignar imagen de jugadora
            }
            const back = document.createElement('div');
            back.classList.add('back');

            if (item.imagen) {
                const jugadoraImg = document.createElement('img');
                jugadoraImg.src = item.imagen;
                jugadoraImg.alt = 'Imagen de la Jugadora';
                back.appendChild(jugadoraImg);

                const anyos = document.createElement('p');
                anyos.textContent = item.años;
                anyos.style.textAlign = 'center';
                back.appendChild(anyos);

                flipper.appendChild(back);
            }
        }

        flipContainer.appendChild(flipper);
        currentRow.appendChild(flipContainer);
    });
}

async function checkAnswer() {
    const textoInput = document.getElementById('jugadoraInput');
    const nombreCompleto = textoInput.value.trim();
    const idJugadora = textoInput.getAttribute('data-id');

    if (!idJugadora) {
        console.warn('No se encontró data-id en el input.');
        return;
    }else{
        if(localStorage.length===0){
            await updateRacha(1, 2);
        }else{
            await updateRacha(1, 1);
            document.getElementById('result').textContent = nombreCompleto;
        }
        localStorage.setItem('Attr1', idJugadora);
        localStorage.setItem('nombre', nombreCompleto);

        await loadJugadoraById(idJugadora, true);
        Ganaste('trayectoria');
    }
}

init();
