//----------------------------------------------------------------------------------
//---------------Funciones para colocar banderas, clubes, edades--------------------
//----------------------------------------------------------------------------------
//------------------Poner Banderas--------------------------------------------------
function ponerBanderas(ids, posiciones) {
    // Generar la URL para obtener las banderas con IDs como parámetros de consulta
    const url = `../api/banderas?id[]=${ids.join('&id[]=')}`;
    console.log(`URL generada: ${url}`);

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Respuesta recibida:", data);

            if (data.success && Array.isArray(data.success)) {
                // Comprobar que las posiciones proporcionadas son las correctas
                if (data.success.length !== posiciones.length) {
                    console.error("Error: La cantidad de posiciones no coincide con la cantidad de países recibidos.");
                    return;
                }

                data.success.forEach((pais, index) => {
                    const th = document.getElementById(posiciones[index]);

                    if (th) {

                        th.innerHTML = ''; // Limpiar el contenido previo

                        // Crear y configurar la imagen
                        const img = document.createElement('img');
                        img.alt = "Pais";
                        img.src = `data:image/svg+xml;base64,${pais.bandera}`;
                        img.style.width = "50px";
                        img.style.height = "auto";
                        img.classList.add('pais'+pais.pais);

                        // Crear y configurar el texto (si se desea incluir)
                        /*
                        const text = document.createElement('p');
                        text.textContent = pais.nombre;
                        text.style.margin = "0";
                        */

                        // Añadir imagen y texto al elemento th
                        th.appendChild(img);
                        //th.appendChild(text);
                    } else {
                        console.error(`Elemento con id ${posiciones[index]} no encontrado.`);
                    }
                });
            } else {
                console.error("Error: Respuesta no contiene un array válido:", data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}//f()
//--------------------Poner Clubes--------------------------------------------------
function ponerClubes(ids, posiciones) {
    const url = `../api/equipos?id[]=${ids.join('&id[]=')}`;
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

                data.success.forEach((pais, index) => {
                    const th = document.getElementById(posiciones[index]);

                    th.innerHTML = ''; // Limpiar el contenido previo

                    const img = document.createElement('img');
                    img.src = pais.escudo; // Usar la URL directamente
                    img.alt = "Club";
                    img.classList.add('club'+pais.club)
                    img.style.width = "50px";
                    img.style.height = "auto";

                    th.appendChild(img);
                });
            } else {
                console.error("Error: Respuesta no contiene un array válido:", data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}//f()
//--------------------Poner Ligas---------------------------------------------------
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
}//f()
//--------------------Poner Edades--------------------------------------------------
function ponerEdades(id1, id2, id3, rutaImagen1, rutaImagen2, rutaImagen3) {
    // Obtener las celdas por sus IDs
    const cell1 = document.getElementById(id1);
    const cell2 = document.getElementById(id2);
    const cell3 = document.getElementById(id3);

    // Limpiar el contenido previo en cada celda
    cell1.innerHTML = '';
    cell2.innerHTML = '';
    cell3.innerHTML = '';

    // Crear imágenes y asignarles la ruta, clase y alt correspondiente
    const img1 = document.createElement('img');
    img1.src = rutaImagen1;
    img1.classList.add('EdadMenor20');  // Clase para edad menor de 20
    img1.alt = 'Edad';  // Asignar atributo alt
    img1.style.width = '50px';

    const img2 = document.createElement('img');
    img2.src = rutaImagen2;
    img2.classList.add('EdadMayor30');  // Clase para edad 25
    img2.alt = 'Edad';  // Asignar atributo alt
    img2.style.width = '50px';

    const img3 = document.createElement('img');
    img3.src = rutaImagen3;
    img3.classList.add('EdadIgual25');  // Clase para edad 30
    img3.alt = 'Edad';  // Asignar atributo alt
    img3.style.width = '50px';

    // Insertar las imágenes en las celdas correspondientes
    cell1.appendChild(img1);
    cell2.appendChild(img2);
    cell3.appendChild(img3);
}//f()
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
//---------------Funciones para verificar banderas, clubes, edades------------------
//----------------------------------------------------------------------------------
async function sacarJugadora() {
    try {
        const jugInput = document.getElementById('input');
        const texto = jugInput.value.trim();
        const urlj = `../api/guessjugadora?nombre=${encodeURIComponent(texto)}`;

        const response = await fetch(urlj);
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Datos recibidos:', data);

        if (Array.isArray(data) && data.length > 0) {
            if (data.length === 1) {
                // Solo un resultado, no es necesario mostrar el modal
                return data;
            } else {
                // Múltiples resultados, mostrar el modal
                return null;
            }
        } else {
            throw new Error("La respuesta no contiene los datos esperados.");
        }
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
}
