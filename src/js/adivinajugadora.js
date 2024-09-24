const jugadora = 1;
let preguntas = 10;
let vidas = 3;
let player;

// Llamada a la API para obtener la jugadora
const url = `../api/player?id=${jugadora}`;
fetch(url)
    .then(response => response.json())
    .then(data => {
        player = data.success; // Asigna los datos de la jugadora obtenida a la variable 'player'        
    })
    .catch(error => {
        console.error('Error fetching word:', error);
        // displayMessage('Error loading word.');
    });

let namePlayer = document.getElementById('player-name');
namePlayer.style.display = "none";
// let lifeLeft = document.getElementById('lifeLeft');
// lifeLeft.style.display = "none";

let tipoAsk = document.getElementById('pregunta');
let opciones = document.getElementById('opciones');

let inputEdad = document.getElementById('edad');
let resultEdad = document.getElementById('showAgeText');

resultEdad.textContent = `${inputEdad.value}`;

// Añade un event listener para detectar cambios en el input
inputEdad.addEventListener("input", (event) => {
    resultEdad.textContent = `${event.target.value}`;
});

// Añade un event listener para detectar cambios en el select
tipoAsk.addEventListener("change", (event) => {
    let tipo = parseInt(event.target.value);

    if (tipo == 5 || tipo == 6 || tipo == 7) {
        opciones.classList.add('oculto');
        inputEdad.parentElement.classList.remove('oculto');
    } else {
        cargarCombo(tipo);

        inputEdad.parentElement.classList.add('oculto');
        opciones.classList.remove('oculto');
    }
});

function cargarCombo(tipo) {
    switch (tipo) {
        case 1:
        case 2:
            equipos();
            break;

        case 3:
            paises();
            break;

        case 4:
            posiciones();
            break;

        case 8:
        case 9:
            ligas();
            break;

        default:
            break;
    }
}

async function equipos() {
    fetch('../api/allequipos')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.success && Array.isArray(data.success)) {
                empty(opciones); // Limpiar el contenido previo
                const option = document.createElement('option');
                option.text = "Seleccionar equipo";
                opciones.appendChild(option);

                data.success.forEach((equipo, index) => {
                    const option = document.createElement('option');
                    option.value = equipo.id;
                    option.text = equipo.nombre;

                    opciones.appendChild(option);
                });
            } else {
                console.error("Error: Respuesta no contiene un array válido:", data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

async function ligas() {
    fetch('../api/allligas')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.success && Array.isArray(data.success)) {
                empty(opciones); // Limpiar el contenido previo
                const option = document.createElement('option');
                option.text = "Seleccionar liga";
                opciones.appendChild(option);

                data.success.forEach((liga, index) => {
                    const option = document.createElement('option');
                    option.value = liga.id;
                    option.text = liga.nombre;

                    opciones.appendChild(option);
                });
            } else {
                console.error("Error: Respuesta no contiene un array válido:", data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

async function paises() {
    fetch('../api/allpaises')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.success && Array.isArray(data.success)) {
                empty(opciones); // Limpiar el contenido previo
                const option = document.createElement('option');
                option.text = "Seleccionar país";
                opciones.appendChild(option);

                data.success.forEach((pais, index) => {
                    const option = document.createElement('option');
                    option.value = pais.id;
                    option.text = pais.nombre;

                    opciones.appendChild(option);
                });
            } else {
                console.error("Error: Respuesta no contiene un array válido:", data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

async function posiciones() {
    fetch('../api/posiciones')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.success && Array.isArray(data.success)) {
                empty(opciones); // Limpiar el contenido previo
                const option = document.createElement('option');
                option.text = "Seleccionar posicion";
                opciones.appendChild(option);

                data.success.forEach((posicion, index) => {
                    const option = document.createElement('option');
                    option.value = posicion.id;
                    option.text = posicion.nombre;

                    opciones.appendChild(option);
                });
            } else {
                console.error("Error: Respuesta no contiene un array válido:", data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


function askQuestion() {
    if (preguntas > 0) {
        let tipo = parseInt(tipoAsk.value);

        //Comprobar que haya una pregunta
        if (tipo > 0) {
            let valor = "";
            if (tipo == 5 || tipo == 6 || tipo == 7) {
                valor = parseInt(inputEdad.value);
                id = valor;
            } else {
                let i = opciones.options.selectedIndex;
                valor = opciones.options[i].text;
                id = parseInt(opciones.value);
            }

            if (id > 0) {
                let itipo = tipoAsk.options.selectedIndex;
                let tipotxt = tipoAsk.options[itipo].text;
                let question = tipotxt.replace('___', valor);

                let answer = obtenerRespuesta(tipo, id);

                //Agregar la pregunta al panel con la respuesta
                let panel = document.getElementById('preguntas');
                panel.innerHTML += `<p> ${question} ${answer}</p>`;

                preguntas -= 1;

                //Actualizar el contador
                let questionsLeft = document.getElementById('questionsLeft');
                questionsLeft.innerHTML = `Te quedan ${preguntas} preguntas`;

                if (preguntas == 0) {
                    let askQuestion = document.getElementById('askQuestion');

                    tipoAsk.classList.add('oculto');
                    opciones.classList.add('oculto');
                    inputEdad.parentElement.classList.add('oculto');
                    askQuestion.classList.add('oculto');

                    let msgResultado = document.getElementById('msgResultado');
                    msgResultado.innerHTML = 'Debes escribir el nombre de la jugadora';
                }
            }
        }
    }
}

function obtenerRespuesta(tipo, valor) {
    let correct = '<span class="correct">Si</span>';
    let error = '<span class="error">No</span>';
    let respuesta = "";

    switch (tipo) {
        case 1:
            if (player.equipo == valor) {
                respuesta = correct;
            } else {
                respuesta = error;
            }
            break;

        case 2:
            if (player.equipos.includes(valor)) {
                respuesta = correct;
            } else {
                respuesta = error;
            }
            break;

        case 3:
            if (player.pais == valor) {
                respuesta = correct;
            } else {
                respuesta = error;
            }
            break;

        case 4:
            if (player.posicion == valor) {
                respuesta = correct;
            } else {
                respuesta = error;
            }
            break;

        case 5:
            if (player.edad == valor) {
                respuesta = correct;
            } else {
                respuesta = error;
            }
            break;

        case 6:
            if (player.edad >= valor) {
                respuesta = correct;
            } else {
                respuesta = error;
            }
            break;

        case 7:
            if (player.edad < valor) {
                respuesta = correct;
            } else {
                respuesta = error;
            }
            break;

        case 8:
            if (player.liga == valor) {
                respuesta = correct;
            } else {
                respuesta = error;
            }
            break;

        case 9:
            if (player.ligas.includes(valor)) {
                respuesta = correct;
            } else {
                respuesta = error;
            }
            break;
        default:
            break;
    }


    return respuesta;
}

function validarJugadora() {
    if (vidas > 1) {
        let inombre = document.getElementById('nombre');
        let nombre = inombre.value;
        if (nombre.length > 0) {
            if (player.nombre == nombre || player.apodo == nombre) {
                let imgPlayer = document.getElementById('player-image');
                imgPlayer.src = player.imagen;

                namePlayer.innerHTML = player.nombre;

                lifeLeft.innerHTML = "Ehorabuena";
                lifeLeft.style.display = "block";
            } else {
                let idVida = "#vida" + vidas;
                let img = document.querySelector(idVida);
                img.classList.add('oculto');

                vidas -= 1;

                lifeLeft.innerHTML = `¡Respuesta equivocada! Te quedan ${vidas} intentos`;
                lifeLeft.style.display = "block";
            }

            empty(inombre);
        }
    } else {
        let idVida = "#vida" + vidas;
        let img = document.querySelector(idVida);
        img.classList.add('oculto');

        let imgPlayer = document.getElementById('player-image');
        imgPlayer.src = player.imagen;
        let namePlayer = document.getElementById('player-name');
        namePlayer.innerHTML = `Has perdido la jugadora era ${player.nombre}`;
        namePlayer.style.display = 'block';

        lifeLeft.innerHTML = "Te has quedado sin vidas";
        lifeLeft.style.display = "block";
    }
}


function empty(element) {
    element.innerHTML = "";
}