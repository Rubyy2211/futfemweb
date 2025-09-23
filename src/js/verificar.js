async function obtenerIdPais(nombre) {
    try {
        // Realizar la solicitud fetch
        const response = await fetch(`../api/jugadora_pais?nombre=${encodeURIComponent(nombre)}`);

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

        // Comprobar si data es un array y contiene al menos un objeto
        if (Array.isArray(data) && data.length > 0 && data[0].Pais) {
            return parseInt(data[0].Pais, 10); // Convertir a entero
        } else {
            console.warn('ID del país no proporcionado en la respuesta:', data);
            return null;
        }
    } catch (error) {
        console.error('Error al obtener el ID del país:', error);
        return null;
    }
}

// Función que compara el ID del país con los ID de las imágenes en la tabla
const columnaContadores = {
    "Equipo4": 0,
    "Equipo5": 0,
    "Equipo6": 0
};
let ultimaJugadoraId = null; // Aquí guardamos la ID de la última jugadora verificada
function verificarNacionalidad(equipos, idJugadoraActual) {
    const columnas = ["Equipo4", "Equipo5", "Equipo6"];
    let columnaEncontrada = null;

    // Si es una jugadora nueva, reiniciar contadores
    if (ultimaJugadoraId !== idJugadoraActual) {
        columnas.forEach(id => columnaContadores[id] = 0);
        ultimaJugadoraId = idJugadoraActual;
    }

    // Limpiar resaltado previo
    columnas.forEach(id => {
        const th = document.getElementById(id);
        if (th) th.classList.remove("resaltado");
    });

    columnas.some((id, index) => {
        if (columnaContadores[id] >= 2) return false; // max 2 veces

        const th = document.getElementById(id);
        if (!th) return false;

        const imgs = th.querySelectorAll('img');
        const encontrada = equipos.some(equipo => {
            const idClub = equipo.equipo;
            return Array.from(imgs).some(img => {
                return img.className === "club" + idClub;
            });
        });

        if (encontrada) {
            columnaContadores[id]++;
            columnaEncontrada = index + 1;
            th.classList.add("resaltado");
            return true;
        }

        return false;
    });

    const resultado = document.getElementById("resultado");
    resultado.textContent = columnaEncontrada
        ? `Un equipo de la jugadora se encuentra en la columna ${columnaEncontrada}.`
        : `Nacionalidad no encontrada en las columnas.`;

    return columnaEncontrada;
}


async function obtenerEquipos(nombre) {
    try {
        // Realizar la solicitud fetch
        const response = await fetch(`../api/jugadora_trayectoria?id=${encodeURIComponent(nombre)}`);

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
// Función que compara el ID del país con los ID de las imágenes en la tabla
function verificarEquipo(equipos,columna) {
    console.log("Equipos para verificar:", equipos);
    const trayectoria=equipos.reverse();
    const columnas = ["Equipo1", "Equipo2", "Equipo3"];
    let resultadoEncontrado = null;

    for (let equipo of trayectoria) {
        for (let index = 0; index < columnas.length; index++) {
            const th = document.getElementById(columnas[index]);
            if (th) {
                const img = th.querySelector('img');
                if (img && img.className==='club'+equipo.equipo) {
                    //th.classList.add("resaltado");
                    resultadoEncontrado = index + 1;
                    const resultado = document.getElementById("resultado");
                    //resultado.textContent = `El equipo ${equipo.equipo} se encuentra en la fila número ${resultadoEncontrado}.`;
                    resultado.textContent = `La jugadora se encuentra en la casilla c${resultadoEncontrado},${columna}.`;
                    //console.log(`El equipo ${equipo.Equipo} se encuentra en la fila número ${resultadoEncontrado}.`);
                    const idCelda = `c${resultadoEncontrado}${columna}`;
                    const td = document.getElementById(idCelda);
                    if (td) {
                        // Verificar si la celda ya contiene una imagen
                        if (!td.querySelector('img')) {
                            if (equipo.imagen===''){
                                return  {'columna': resultadoEncontrado, 'foto' : equipo.ImagenJugadora};
                            }else{
                                return  {'columna': resultadoEncontrado, 'foto' : equipo.ImagenJugadora};
                            }
                        }else {
                            //Verificar().then(r => r)
                        }
                    }
                }
            }
        }
    }

    // Si no se encontró ningún equipo, mostrar mensaje
    if (!resultadoEncontrado) {
        const resultado = document.getElementById("resultado");
        resultado.textContent = `No se han encontrado coincidencias.`;
        return null;
    }
}