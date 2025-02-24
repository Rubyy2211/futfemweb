async function init() {
    let valor = await fetchData(4);
    let paises = [valor.pais1, valor.pais2, valor.pais3];
    let clubes = [valor.club1, valor.club2, valor.club3];
    ponerClubes(paises, ["Equipo4", "Equipo5", "Equipo6"]);
    ponerClubes(clubes, ["Equipo1", "Equipo2", "Equipo3"]);
    await colocarAciertos();
}
init()
async function Verificar(){
    const input = document.getElementById('input');
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
            const columna = verificarNacionalidad(equipos);

            if (columna !== null) {

                if (equipos) {
                    // Comparar los equipos con las imágenes en la tabla y obtener la fila
                    const fila = verificarEquipo(equipos,columna);
                    if (fila !== null) {
                            // Colocar la imagen en la celda correcta usando la fila y columna
                            await colocarImagenEnTabla(fila.columna, columna, fila.foto);
                            const idCelda = `c${fila.columna}${columna}`;
                            gestionarAciertos(idCelda,fila.foto);
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
    let grid = localStorage.getItem('Attr2');

    // Asegurarse de que retrievedGrid es un array
    let retrievedGrid = grid ? JSON.parse(grid) : [];

    // Verificar si retrievedGrid es un array (puede haber errores en la conversión)
    if (!Array.isArray(retrievedGrid)) {
        retrievedGrid = []; // Reiniciar como array vacío si no es un array válido
        localStorage.setItem('Attr2', JSON.stringify(retrievedGrid));
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
    let grid = localStorage.getItem('Attr2');

    // Asegurarse de que retrievedGrid es un array
    let retrievedGrid = grid ? JSON.parse(grid) : [];

    let item = { celda, foto };
    retrievedGrid.push(item); // Agregar el nuevo objeto

    // Guardar de nuevo en localStorage
    localStorage.setItem('Attr2', JSON.stringify(retrievedGrid));
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



