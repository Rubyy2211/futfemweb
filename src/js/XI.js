function CrearAlineacion(formacion){
    let celdas=[];
    if(formacion==='433'){
      celdas=['c53','c41','c42','c44','c45','c32','c34','c22','c11','c13','c15'];
    }
    if(formacion==='433(4)'){
        celdas=['c53','c41','c42','c44','c45','c32','c34','c23','c11','c13','c15'];
    }
    if(formacion==='433(3)'){
        celdas=['c53','c41','c42','c44','c45','c33','c24','c22','c11','c13','c15'];
    }
    if(formacion==='442'){
        celdas=['c53','c41','c42','c44','c45','c21','c22','c24','c25','c12','c14'];
    }
    activarCeldas(celdas);
}

function activarCeldas(celdas) {
    // Iterar sobre el array de ids proporcionado
    celdas.forEach(id => {
        // Seleccionar la celda (td) con el id actual
        let celda = document.getElementById(id);

        // Crear un contenedor div para la imagen y el contenido de la celda
        let contenedor = document.createElement("div");

        // Crear la imagen
        let img = document.createElement("img");
        img.src = '../img/predeterm.jpg';

        // Crear el párrafo que contendrá el contenido original de la celda
        let parrafo = document.createElement("p");
        parrafo.innerHTML = celda.innerHTML; // Insertar el contenido original de la celda en el párrafo

        // Vaciar el contenido de la celda
        celda.innerHTML = '';

        // Añadir la imagen y el párrafo al contenedor
        contenedor.appendChild(img); // Primero la imagen
        contenedor.appendChild(parrafo); // Luego el párrafo

        // Insertar el contenedor en la celda
        celda.appendChild(contenedor);

        // Mostrar la celda si estaba oculta
        celda.classList.add('activado');
    });
}
async function introducirJugadora(id) {
    let imagen = await sacarJugadora();
    console.log(id)
    const res = await comprobarPaisEquipo(id);
    console.log(res)
    if (res) {
        let pos = await obtenerPosicion(id);
        console.log(pos)
        let respos = verificarPosicion(pos);
        console.log(respos)
        if (respos) {
            console.log("Encontrado");
            colocarImagen(respos,imagen);
        } else {
            console.log("NO Encontrado");
        }
    }
}
function verificarPosicion(posicion) {
    let res=null;
    console.log(posicion)
    // Seleccionar todos los td de la página
    let celdas = document.querySelectorAll('td');

    // Convertir el número en una cadena para compararlo con la clase
    let clasePosicion = posicion.toString();

    // Iterar sobre todas las celdas
    celdas.forEach(celda => {
        // Comprobar si la clase de la celda coincide con el número
        if (celda.classList.contains(clasePosicion) && celda.classList.contains('activado')) {
            console.log(`La celda con la clase '${clasePosicion}' fue encontrada.`);
            res = celda.id;
            console.log(res)
        }
    }); return res;
}

async function obtenerPosicion(id) {
    try {
        // Realizar la solicitud fetch
        const response = await fetch(`../api/posicionxjugadora?id=${encodeURIComponent(id)}`);

        // Verificar que la solicitud fue exitosa
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        // Convertir la respuesta a JSON
        const data = await response.json();
        console.log("Respuesta del servidor:", data); // Ver el array completo

        // Asegurarse de que el dato devuelto es un array y contiene el campo 'Posicion'
        if (Array.isArray(data) && data.length > 0 && data[0].Posicion !== undefined) {
            const posicion = parseInt(data[0].Posicion); // Acceder al valor 'Posicion' del primer objeto
            if (isNaN(posicion)) {
                console.error('Error: la posición obtenida no es un número válido.');
                return null;
            }

            return posicion; // Devolver la posición como número
        } else {
            console.error('Error: La estructura de los datos recibidos no es la esperada.');
            return null;
        }

    } catch (error) {
        console.error('Error al obtener la posición de la jugadora:', error);
        return null; // En caso de error, devolver null
    }
}

async function comprobarPaisEquipo(id) {
    let res = false; // Inicializar res como false por defecto
    const pais = await obtenerIdPais(id);
    const club = await obtenerEquipos(id);
    const clubes = club.reverse();
    const requisito = document.getElementById('requisito');

    // Verifica si existe el elemento 'requisito'
    if (!requisito) {
        console.error('El elemento con ID "requisito" no fue encontrado.');
        return res;
    }

    const img = requisito.querySelector('img'); // Selecciona la primera imagen dentro del elemento

    // Verifica si la imagen fue encontrada
    if (!img) {
        console.error('No se encontró ninguna imagen en el elemento "requisito".');
        return res;
    }

    console.log('Atributos de la imagen:', { alt: img.alt, className: img.className });

    // Comprobar el atributo 'alt' de la imagen
    if (img.alt === 'Pais') {
        console.log('Verificando país:', pais, 'con la clase:', img.className);
        if (img.className === 'pais' + pais) {
            res = true;
        } else {
            console.log('Clase de país no coincide.');
        }
    } else if (img.alt === 'Club') {
        console.log('Verificando equipo:', clubes[0]?.equipo, 'con la clase:', img.className);
        if (img.className === 'club' + clubes[0].equipo) {
            res = true;
        } else {
            console.log('Clase de equipo no coincide.');
        }
    } else {
        console.log('El alt de la imagen no es "Pais" ni "Equipo".');
    }

    return res; // Devolver res (true o false)
}
async function obtenerJugadora() {
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
                handleSelectedJugadora(data[0].id_jugadora, data[0].Nombre_Completo,'XI');
            } else {
                // Múltiples resultados, mostrar el modal
                showModalForSelection(data,'XI');
            }
        } else {
            throw new Error("La respuesta no contiene los datos esperados.");
        }
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
}

async function colocarImagen(celda, data) {
    console.log("Lugar a colocar", celda);

    // Construir el ID de la celda basado en la fila y columna
    const td = document.getElementById(celda);

    if (td) {
        // Verificar si la celda ya contiene una imagen
            let img = td.querySelector('img');
            let p = td.querySelector('p');
            img = td.querySelector('img')
            img.src = data[0].imagen; // Usar la URL de la imagen de la jugadora
            img.alt = `Jugador en fila ${celda}`;
            img.style.background = 'white';
            p.textContent=data[0].Apodo;



        console.log(`Imagen colocada en la celda con id ${celda}`);
    } else {
        console.log(`No se encontró la celda con id ${celda}.`);
    }
}







CrearAlineacion('433(4)');
ponerBanderas([7],['requisito']);
