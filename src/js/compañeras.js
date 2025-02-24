let jugadoraId;

// Función principal que controla el flujo de carga
async function init() {
    let jugadora = await fetchData(5);
    jugadoraId = jugadora.idJugadora;

    const player = await getJugadora(jugadoraId);

    console.log(player)

    const div = document.getElementById('compañeras');
    div.classList.add(`id-${jugadoraId}`);
    div.setAttribute('Attr8', jugadoraId);

    // Obtener el valor de localStorage
    const answer2 = localStorage.getItem('hasWon8');
    const nombre = localStorage.getItem('nombre');
    const answer = localStorage.getItem('Attr8');
    // Convertir el valor a booleano, ya que localStorage almacena todo como cadenas
    const isAnswerTrue = (answer === jugadoraId);
    console.log('Has won:', isAnswerTrue);
    if (isAnswerTrue) {
        // Luego, cargar la trayectoria
        await loadCompanyerasJugadoraById(jugadoraId);
        Ganaste('compañeras')
        const resultDiv = document.getElementById('result');
        resultDiv.textContent = nombre;
    } else {
        localStorage.removeItem('Attr8');
        localStorage.removeItem('nombre');
        // Luego, cargar la trayectoria
        await loadCompanyerasJugadoraById(jugadoraId);
        cambiarImagenFlipRonda(div);
    }
}

async function loadCompanyerasJugadoraById(id) {
    try {
        const response = await fetch(`../api/jugadora_compañeras?id_jugadora=${id}`);
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Datos recibidos:', data);

        if (Array.isArray(data) && data.length > 0) {
            displayCompanyeras(data);
        } else {
            console.warn('No hay datos de la jugadora disponibles.');
        }
    } catch (error) {
        console.error('Error al cargar la jugadora:', error);
        document.getElementById('result').textContent = 'Error al cargar los datos.';
    }
}
async function getJugadora(id) {
    try {
        const response = await fetch(`../api/jugadora_datos?id=${id}`);
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Datos recibidos:', data);

        if (data) {
            const mystery = document.getElementById('jugadora');
            mystery.src = data['success'].imagen;
            return data;
        } else {
            console.warn('No hay datos de la jugadora disponibles.');
        }
    } catch (error) {
        console.error('Error al cargar la jugadora:', error);
        document.getElementById('result').textContent = 'Error al cargar los datos.';
    }
}
function displayCompanyeras(data) {
    const compisDiv = document.getElementById('compañeras');
    compisDiv.innerHTML = ''; // Limpiar contenido previo

    data.forEach((item, index) => {
            // Crear el contenedor del flip
            const flipContainer = document.createElement('div');
            flipContainer.classList.add('flip-container');

            const flipper = document.createElement('div');
            flipper.classList.add('flipper');

            // Crear y añadir el lado frontal
            const front = document.createElement('div');
            front.classList.add('front');

            /*if (item.escudo) {
                const escudoImg = document.createElement('img');
                escudoImg.src = item.escudo;
                escudoImg.alt = item.nombre;
                front.appendChild(escudoImg);

                // Crear y añadir el texto de los años
                const anyos = document.createElement('p');
                anyos.textContent = item.años;
                anyos.style.textAlign = 'center'; // Centrar el texto debajo del escudo
                front.appendChild(anyos);
            }*/

            // Crear y añadir el lado trasero
            const back = document.createElement('div');
            back.classList.add('back');

            if (item.imagen) {
                const jugadoraImg = document.createElement('img');
                jugadoraImg.src = item.imagen;
                jugadoraImg.alt = 'Imagen de la Jugadora';
                back.appendChild(jugadoraImg);
            }

            flipper.appendChild(front);
            flipper.appendChild(back);
            flipContainer.appendChild(flipper);

            // Añadir el flipContainer al div hijo correspondiente
            compisDiv.appendChild(flipContainer);

    });
}

init();




async function checkJugadora() {
        const textoInput = document.getElementById('jugadoraInput');
        const texto = textoInput.value.trim();
        const idJugadora = textoInput.getAttribute('data-id');
        const div = document.getElementById('compañeras');
        const idClass = `id-${idJugadora}`;
        const found = div.classList.contains(idClass);
        const resultDiv = document.getElementById('result');
        if (found) {
            resultDiv.textContent = `${texto}`;
            //cambiarImagenConFlip();
            Ganaste('compañeras');
        }else {
            cambiarImagenFlipRonda(div);
        }
}

let currentIndex = 0;

function cambiarImagenFlipRonda(div) {
    if(currentIndex>4){
        cambiarImagenConFlip();
        localStorage.setItem('Attr8', jugadoraId);
        localStorage.setItem('hasWon8', false);
        return;
    }
    // Seleccionar todos los contenedores de flip dentro del div pasado como parámetro
    const flipContainers = div.querySelectorAll('.flip-container');
    console.log(flipContainers.length);
    if (flipContainers.length === 0) return;

    // Obtener el contenedor actual basado en el índice
    const container = flipContainers[currentIndex];

    const imagenTrasera = container.querySelector('.back img');
    const imagenFrontal = container.querySelector('.front img');

    // Añadir la clase para empezar el volteo
    container.querySelector('.flipper').classList.add('flipping');


    // Opcional: Si deseas cambiar la imagen frontal a la misma que la trasera después del volteo
    setTimeout(() => {


    }, 600); // Ajusta el tiempo según la duración de tu animación
     console.log(currentIndex)
    // Incrementar el índice para la próxima llamada
    currentIndex = currentIndex + 1;
}




