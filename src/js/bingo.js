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
}


// Ejemplo de uso
ponerBanderas(7, 16, 1, "c21", "c32", "c33"); // Llama a la función con los IDs de los países que quieras
ponerLigas(1, 4, 5, "c13","c34"); // Llama a la función con los IDs de los países que quieras
// Llama a la función con los IDs de los equipos que quieras
ponerClubes(1,2, 44, "c12", "c14", "c31");
ponerEdades( "c11", "c24", "c22", '../img/edades/menor20.png','../img/edades/mayor30.png', '../img/edades/igual25.png');

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
function calcularEdad(fechaNacimiento) {
    const hoy = new Date(); // Fecha actual
    const nacimiento = new Date(fechaNacimiento); // Convertir la fecha de nacimiento a un objeto Date
    let edad = hoy.getFullYear() - nacimiento.getFullYear(); // Calcular la diferencia de años
    const mes = hoy.getMonth() - nacimiento.getMonth(); // Calcular la diferencia de meses

    // Ajustar la edad si el cumpleaños de este año aún no ha ocurrido
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }

    return edad;
}


