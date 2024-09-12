// Ejemplo de uso
ponerBanderas([7, 16, 1], ["PaisA", "PaisB", "PaisC"]); // Llama a la función con los IDs de los países que quieras

// Ejemplo de uso
ponerClubes([1, 3, 44], ["Equipo1", "Equipo2", "Equipo3"]); // Llama a la función con los IDs de los países que quieras

async function Verificar(nombreJugadora){
    console.log('Procesando jugadora:', nombreJugadora);
    if (!nombreJugadora) {
        alert("Por favor, introduce el nombre de la jugadora.");
        return;
    }

    try {
        // Obtener el ID del país
        const idPais = await obtenerIdPais(nombreJugadora);

        if (idPais !== null) {
            console.log('ID del país:', idPais);

            // Verificar la nacionalidad y obtener la columna
            const columna = verificarNacionalidad(idPais);

            if (columna !== null) {
                // Obtener los equipos
                const equipos = await obtenerEquipos(nombreJugadora);
                if (equipos) {
                    // Comparar los equipos con las imágenes en la tabla y obtener la fila
                    const fila = verificarEquipo(equipos,columna);
                    if (fila !== null) {
                        // Colocar la imagen en la celda correcta usando la fila y columna
                        colocarImagenEnTabla(fila.columna, columna, fila.foto);
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

    if (td) {
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
        td.appendChild(img);

        console.log(`Imagen colocada en la celda con id ${idCelda}`);
    } else {
        console.log(`No se encontró la celda con id ${idCelda}.`);
    }
}

