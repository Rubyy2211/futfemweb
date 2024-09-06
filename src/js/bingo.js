function ponerClubes(id1, id2, id3, posicion1, posicion2, posicion3) {
    const url = `../api/equipos?id1=${id1}&id2=${id2}&id3=${id3}`;
    //console.log(`URL generada: ${url}`);

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            //console.log("Respuesta recibida:", data);

            if (data.success && Array.isArray(data.success)) {
                const thIds = [posicion1, posicion2, posicion3];

                data.success.forEach((pais, index) => {
                    const th = document.getElementById(thIds[index]);

                    th.innerHTML = ''; // Limpiar el contenido previo

                    const img = document.createElement('img');
                    img.src = pais.escudo; // Usar la URL directamente
                    img.alt = "Club";
                    img.classList.add('club'+pais.club)
                    img.style.width = "50px";
                    img.style.height = "auto";
                    //img.classList.add(`${pais.club}`); // ID basado en id_pais

                    /*    const text = document.createElement('p');
                        text.textContent = pais.nombre;
                        text.style.margin = "0";*/

                    th.appendChild(img);
                    //    th.appendChild(text);
                });
            } else {
                console.error("Error: Respuesta no contiene un array válido:", data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
function ponerLigas(id1, id2, id3, posicion1, posicion2) {
    const url = `../api/ligas?id1=${id1}&id2=${id2}&id3=${id3}`;
    //console.log(`URL generada: ${url}`);

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            //console.log("Respuesta recibida:", data);

            if (data.success && Array.isArray(data.success)) {
                const thIds = [posicion1, posicion2];

                data.success.forEach((pais, index) => {
                    const th = document.getElementById(thIds[index]);

                    th.innerHTML = ''; // Limpiar el contenido previo

                    const img = document.createElement('img');
                    img.src = `data:image/svg+xml;base64,${pais.bandera}`;
                    img.alt = "Liga";
                    img.style.width = "50px";
                    img.style.height = "auto";
                    // Verificar y asignar la clase de la imagen
                    //console.log(data)
                    if (pais.liga) {
                        img.classList.add('liga'+pais.liga);
                    } else {
                        console.error(`Error: 'liga' no está definido para el país: ${pais.nombre}`);
                    }

                    th.appendChild(img);
                });
            } else {
                console.error("Error: Respuesta no contiene un array válido:", data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
function ponerBanderas(id1, id2, id3, posicion1, posicion2, posicion3) {
    const url = `../api/banderas?id1=${id1}&id2=${id2}&id3=${id3}`;
    //console.log(`URL generada: ${url}`);

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            //console.log("Respuesta recibida:", data);

            if (data.success && Array.isArray(data.success)) {
                const thIds = [posicion1, posicion2, posicion3];

                data.success.forEach((pais, index) => {
                    const th = document.getElementById(thIds[index]);

                    if (th) {
                        th.innerHTML = ''; // Limpiar el contenido previo

                        // Crear y configurar la imagen
                        const img = document.createElement('img');
                        img.src = `data:image/svg+xml;base64,${pais.bandera}`;
                        img.alt = "Pais";
                        img.style.width = "50px";
                        img.style.height = "auto";
                        img.classList.add('pais'+pais.pais)


                        // Crear y configurar el texto
                        /*    const text = document.createElement('p');
                            text.textContent = pais.nombre;
                            text.style.margin = "0";*/

                        // Añadir imagen y texto al elemento th
                        th.appendChild(img);
                        //th.appendChild(text);
                    } else {
                        console.error(`Elemento con id ${thIds[index]} no encontrado.`);
                    }
                });
            } else {
                console.error("Error: Respuesta no contiene un array válido:", data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Ejemplo de uso
ponerBanderas(7, 16, 1, "c21", "c32", "c33"); // Llama a la función con los IDs de los países que quieras
ponerLigas(1, 4, 5, "c13","c34"); // Llama a la función con los IDs de los países que quieras


// Llama a la función con los IDs de los equipos que quieras
ponerClubes(1,2, 44, "c12", "c14", "c31");
async function sacarEquipos(nombre) {
    try {
        // Realizar la solicitud fetch
        const response = await fetch(`../api/trayectoriabingo?nombre=${encodeURIComponent(nombre)}`);

        // Verificar que la solicitud fue exitosa
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        // Convertir la respuesta a JSON
        const data = await response.json();
        //console.log("Respuesta del servidor:", data);

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

