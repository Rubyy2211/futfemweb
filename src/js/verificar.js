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
function verificarNacionalidad(idPais) {
    console.log(`ID del país para verificar: ${idPais}`);

    // Buscar el ID de la nacionalidad en las imágenes de las columnas
    const columnas = ["PaisA", "PaisB", "PaisC"];
    let columnaEncontrada = null;

    columnas.forEach((id, index) => {
        const th = document.getElementById(id);
        if (th) {
            const img = th.querySelector('img');
            if (img && img.className==="pais"+idPais){
                columnaEncontrada = index + 1; // Las columnas comienzan en 1
            }
        }
    });

    const resultado = document.getElementById("resultado");
    if (columnaEncontrada !== null) {
        resultado.textContent = `La nacionalidad de la jugadora se encuentra en la columna número ${columnaEncontrada}.`;
        console.log(`La nacionalidad de la jugadora se encuentra en la columna número ${columnaEncontrada}.`)
        return columnaEncontrada;
    } else {
        resultado.textContent = `Nacionalidad no encontrada en las columnas.`;
        return null;
    }
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
                    resultadoEncontrado = index + 1;
                    const resultado = document.getElementById("resultado");
                    resultado.textContent = `El equipo ${equipo.equipo} se encuentra en la fila número ${resultadoEncontrado}.`;
                    //console.log(`El equipo ${equipo.Equipo} se encuentra en la fila número ${resultadoEncontrado}.`);
                    const idCelda = `c${resultadoEncontrado}${columna}`;
                    const td = document.getElementById(idCelda);
                    if (td) {
                        // Verificar si la celda ya contiene una imagen
                        if (!td.querySelector('img')) {
                            if (equipo.imagen===''){
                                return  {'columna': resultadoEncontrado, 'foto' : equipo.ImagenJugadora};
                            }else{
                                return  {'columna': resultadoEncontrado, 'foto' : equipo.imagen};
                            }
                        }
                    }
                }
            }
        }
    }

    // Si no se encontró ningún equipo, mostrar mensaje
    if (!resultadoEncontrado) {
        const resultado = document.getElementById("resultado");
        resultado.textContent = `Ningún equipo encontrado en las columnas.`;
        return null;
    }
}

async function obtenerJugadoras(modo) {
    try {
        const jugInput = document.getElementById('input');
        const texto = jugInput.value.trim();
        const urlj = `../api/jugadoraxnombre?nombre=${encodeURIComponent(texto)}`;

        const response = await fetch(urlj);
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Datos recibidos:', data);

        if (Array.isArray(data) && data.length > 0) {
            if (data.length === 1) {
                // Solo un resultado, no es necesario mostrar el modal
                handleSelectedJugadora(data[0].id_jugadora, data[0].Nombre_Completo,modo);
            } else {
                // Múltiples resultados, mostrar el modal
                showModalForSelection(data,modo);
            }
        } else {
            throw new Error("La respuesta no contiene los datos esperados.");
        }
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        document.getElementById('result').textContent = "Ocurrió un error al realizar la solicitud.";
    }
}










