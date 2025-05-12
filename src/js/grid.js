let idres;
async function iniciar(dificultad) {
    const popup = document.getElementById('popup-ex'); // Selecciona el primer elemento con la clase 'popup-ex'
    const answer = localStorage.getItem('Attr4');
    if (popup) {
        popup.style.display = 'none'; // Cambia el estilo para ocultarlo
    }
    let valor = await fetchData(4);
    let paises = [valor.pais1, valor.pais2, valor.pais3];
    let clubes = [valor.club1, valor.club2, valor.club3];
    idres = paises.map(String).concat(clubes.map(String)).join('');;

    // Definir los segundos según la dificultad
    let segundos;
    switch (dificultad) {
        case "facil":
            segundos = 180;
            break;
        case "medio":
            segundos = 120;
            break;
        case "dificil":
            segundos = 60;
            break;
        default:
            segundos = localStorage.getItem('grid'); // Valor por defecto si la dificultad no es válida
    }
    ponerClubes(paises, ["Equipo4", "Equipo5", "Equipo6"]);
    ponerClubes(clubes, ["Equipo1", "Equipo2", "Equipo3"]);
    localStorage.setItem('res4', idres);
    await colocarAciertos();
    //startCounter(segundos, 'grid')
    const celdas = comprobarFotosEnCeldas();
    if (celdas) {
        console.log("Deteniendo contador..."); // Verificar si llega aquí
        //await loadJugadoraById(jugadoraId, true);
        stopCounter("grid");  // ⬅️ Detenemos el temporizador si el usuario gana
        Ganaste('grid');
        //document.getElementById('result').textContent = nombre;
    } else {
        //await loadJugadoraById(jugadoraId, false);
        if (!answer || answer.trim() === '') {
            startCounter(segundos, "grid", async () => {
                console.log("El contador llegó a 0. Ejecutando acción...");
                await gridPerder();
            });
        } else if (answer === 'loss') {
            await gridPerder();
        } else {
            startCounter(segundos, "grid", async () => {
                console.log("El contador llegó a 0. Ejecutando acción...");
                await gridPerder();
            });
        }
    }
}

async function Verificar(){
    const input = document.getElementById('jugadoraInput');
    input.value = "";
    const nombreJugadora = input.getAttribute('data-id');
    console.log('Procesando jugadora:', nombreJugadora);
    if (!nombreJugadora) {
        alert("Por favor, introduce el nombre de la jugadora.");
        return;
    }

    try {
            // Obtener los equipos
            const equipos = await obtenerEquipos(nombreJugadora);
            // Verificar la nacionalidad y obtener la columna
            const columna = verificarNacionalidad(equipos, nombreJugadora);

            if (columna !== null) {

                if (equipos) {
                    // Comparar los equipos con las imágenes en la tabla y obtener la fila
                    const fila = verificarEquipo(equipos,columna);
                    if (fila !== null) {
                            // Colocar la imagen en la celda correcta usando la fila y columna
                            await colocarImagenEnTabla(fila.columna, columna, fila.foto);
                            const idCelda = `c${fila.columna}${columna}`;
                            gestionarAciertos(idCelda,fila.foto);
                            const celdas = comprobarFotosEnCeldas();
                            if (celdas) {
                                console.log("Deteniendo contador..."); // Verificar si llega aquí
                                //await loadJugadoraById(jugadoraId, true);
                                stopCounter("grid");  // ⬅️ Detenemos el temporizador si el usuario gana
                                Ganaste('grid');
                            }
                    }
                }
        } else {
            console.log('No se encontró el ID del país.');
        }
    } catch (error) {
        console.error('Error en el proceso de verificación:', error);
    }
}
// Función que coloca la imagen en la celda correcta de la tabla
async function colocarImagenEnTabla(equipo, columna, player) {
    console.log("Lugar a colocar", equipo, columna);
    // Construir el ID de la celda basado en la fila y columna
    const idCelda = `c${equipo}${columna}`;
    const td = document.getElementById(idCelda);
    let res = comprobarFotosEnCeldas();

    if (td) {
        if(res===true){
            Ganaste('grid');
        }
        // Verificar si la celda ya contiene una imagen
        if (td.querySelector('img')) {
            console.log(`La celda con id ${idCelda} ya tiene una imagen. No se colocará una nueva imagen.`);
            return; // Salir de la función si la celda ya tiene una imagen
        }

        // Si no tiene imagen, crear la imagen y agregarla a la celda
        const img = document.createElement('img');
        img.src = player; // Usar la URL de la imagen de la jugadora
        img.alt = `Jugador en fila ${equipo}, columna ${columna}`;
        img.style.width = '100%'; // Ajustar tamaño según sea necesario
        img.style.height = '100%';
        img.style.background = 'white';
        td.appendChild(img);

        console.log(`Imagen colocada en la celda con id ${idCelda}`);
    } else {
        console.log(`No se encontró la celda con id ${idCelda}.`);
    }
}

async function colocarAciertos() {
    let grid = localStorage.getItem('Attr4');

    // Asegurarse de que retrievedGrid es un array
    let retrievedGrid = grid ? JSON.parse(grid) : [];
    const celdas = comprobarFotosEnCeldas();
    if(celdas){
        stopCounter('grid');
        Ganaste('grid');
    }

    // Verificar si retrievedGrid es un array (puede haber errores en la conversión)
    if (!Array.isArray(retrievedGrid)) {
        retrievedGrid = []; // Reiniciar como array vacío si no es un array válido
        localStorage.setItem('Attr4', JSON.stringify(retrievedGrid));
    } else {
        for (let i = 0; i < retrievedGrid.length; i++) {
            let celda = retrievedGrid[i].celda;
            let equipo = celda.replace("c", "").split("")[0];
            let pais = celda.replace("c", "").split("")[1];
            await colocarImagenEnTabla(equipo, pais, retrievedGrid[i].foto);
        }
    }
}

function gestionarAciertos(celda, foto) {
    let grid = localStorage.getItem('Attr4');

    // Asegurarse de que retrievedGrid es un array
    let retrievedGrid = grid ? JSON.parse(grid) : [];

    let item = { celda, foto };
    retrievedGrid.push(item); // Agregar el nuevo objeto

    // Guardar de nuevo en localStorage
    localStorage.setItem('Attr4', JSON.stringify(retrievedGrid));
}


function comprobarFotosEnCeldas() {
    // Selecciona todas las celdas que tienen id que empiece con 'c' y son números (ejemplo: c11, c12, c13, etc.)
    const celdas = document.querySelectorAll('td[id^="c"]');

    let todasConFoto = true; // Variable para verificar si todas las celdas tienen una foto

    celdas.forEach(celda => {
        // Comprueba si la celda tiene una imagen
        const img = celda.querySelector('img');

        // Si la celda no tiene una imagen, cambiamos todasConFoto a false
        if (!img) {
            todasConFoto = false;
        }
    });

    // Devuelve si todas las celdas tienen una imagen
    return todasConFoto;
}
document.addEventListener('DOMContentLoaded', () => {
    function aplicarImagenes() {
        // Obtener todos los encabezados (th) con ID que comienza con "Pais"
        const headers = document.querySelectorAll('#grid thead th[id^="Pais"]');

        // Aplicar la imagen de los encabezados a las celdas correspondientes
        headers.forEach(header => {
            const columna = header.cellIndex;
            const img = header.querySelector('img');
            if (img) {
                const imagenSrc = img.src; // Base64 string for the image

                // Seleccionar todas las celdas de esa columna
                const filas = document.querySelectorAll('#grid tbody tr');
                filas.forEach(fila => {
                    const celda = fila.cells[columna];
                    if (celda) {
                        // Aplicar la imagen de fondo a la celda
                        celda.style.backgroundImage = `url('${imagenSrc}')`;
                        celda.style.backgroundSize = 'cover'; // Ajustar la imagen para cubrir el área
                        celda.style.backgroundPosition = 'center'; // Centrar la imagen en la celda
                        celda.style.backgroundRepeat = 'no-repeat'; // Evitar que la imagen se repita
                    }
                });
            } else {
                console.log(`No se encontró una imagen en el encabezado con ID ${header.id}.`);
            }
        });

        // Obtener todas las filas (tr) con ID que comienza con "Equipo"
        const filas = document.querySelectorAll('#grid tbody tr[id^="club"]');

        // Aplicar la imagen de las filas a las celdas correspondientes
        filas.forEach(fila => {
            const th = fila.querySelector('th');
            if (th) {
                const img = th.querySelector('img');
                if (img) {
                    const imagenSrc = img.src; // Base64 string for the image

                    // Aplicar la imagen de fondo a todas las celdas en esta fila
                    const celdas = fila.querySelectorAll('td');
                    celdas.forEach(celda => {
                        if (celda) {
                            // Añadir la imagen de fondo encima de la ya existente
                            const existingBackgroundImage = celda.style.backgroundImage;
                            celda.style.backgroundImage = `linear-gradient(var(--color-secundario), var(--color-secundario)), ${existingBackgroundImage}, url('${imagenSrc}')`;
                            celda.style.backgroundSize = 'cover'; // Ajustar la imagen para cubrir el área
                            celda.style.backgroundPosition = 'center'; // Centrar la imagen en la celda
                            celda.style.backgroundRepeat = 'no-repeat'; // Evitar que la imagen se repita
                            celda.style.backgroundBlendMode = 'color'; // Ajustar el modo de fusión para la superposición
                        }
                    });
                } else {
                    console.log(`No se encontró una imagen en la celda de encabezado de la fila con ID ${fila.id}.`);
                }
            } else {
                console.log(`No se encontró un encabezado en la fila con ID ${fila.id}.`);
            }
        });
    }

    // Usar window.onload y setTimeout para esperar 1 segundo antes de aplicar las imágenes
    window.onload = () => {
        setTimeout(aplicarImagenes, 500); // Esperar 1 segundo (1000 milisegundos)
    };
});


async function gridPerder() {
    // Bloquear el botón y el input
    const boton = document.getElementById('botonVerificar');
    const input = document.getElementById('jugadoraInput');
    const resultDiv = document.getElementById('resultado');
    //const jugadora = await sacarJugadora(jugadoraId);

    boton.disabled = true;
    input.disabled = true;

    resultDiv.textContent = 'Has perdido';//+jugadora[0].Nombre_Completo;
    const div = document.getElementById('trayectoria');
    const jugadora_id = 'loss';
    localStorage.setItem('Attr4', jugadora_id);
    //await loadJugadoraById(jugadoraId, true);
    // Agregar un delay de 2 segundos (2000 ms)
    if(localStorage.length>0){
        await updateRacha(1, 0);
    }
}


const texto = '¡Demuestra tu conocimiento sobre fútbol femenino! En "Futfem Grid", los jugadores se enfrentan a una cuadrícula llena de escudos de equipos de fútbol. El objetivo del juego es rellenar correctamente las casillas de la tabla con los nombres de las jugadoras que coinciden con los equipos de las filas y columnas. ' +
    'El tablero es una rejilla (Grid) con filas y columnas. Cada celda contiene el escudo de un equipo de fútbol.\n' +
    'Tu misión es rellenar cada celda con el nombre de una jugadora que haya jugado en ese equipo, tanto en la fila como en la columna correspondiente.\n' +
    'Los jugadores deben completar el tablero lo más rápido posible, identificando correctamente las jugadoras que han jugado en esos equipos.\n';
const imagen = '../img/Captura de pantalla 2024-09-01 192457.png';

play().then(r => r);
async function play() {
    let jugadora = await fetchData(4);
    let paises = [jugadora.pais1, jugadora.pais2, jugadora.pais3];
    let clubes = [jugadora.club1, jugadora.club2, jugadora.club3];
    idres = paises.map(String).concat(clubes.map(String)).join('');;
    const res = localStorage.getItem('res4');
    if(res !== idres || !res){
        localStorage.removeItem('Attr4');
        crearPopupInicialJuego('Futfem Grid', texto, imagen);
    } else {
        await iniciar('');
    }
}



