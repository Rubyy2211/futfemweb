cambiarPista('club');
CrearAlineacion('433(4)');
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
    let jugadora = await sacarJugadora(id);
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
            colocarImagen(respos,jugadora);
        } else {
            console.log("NO Encontrado");
        }
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
function verificarPosicion(posicion) {
    let res = null;
    console.log(posicion);

    // Seleccionar todos los td de la página
    let celdas = document.querySelectorAll('td');

    // Convertir el número en una cadena para compararlo con la clase
    let clasePosicion = posicion.toString();

    // Iterar sobre todas las celdas
    celdas.forEach(celda => {
        // Comprobar si la clase de la celda coincide con el número y si tiene la clase 'activado'
        if (celda.classList.contains(clasePosicion) && celda.classList.contains('activado')) {
            // Verificar si ya hay una imagen en la celda
            let img = celda.querySelector('img');

            // Verificar si el 'src' contiene 'data:image/jpeg;base64'
            if (!img || !img.src.startsWith('data:image/jpeg;base64')) {
                console.log(`La celda con la clase '${clasePosicion}' sin imagen base64 y activada fue encontrada.`);
                res = celda.id; // Guardar el id de la celda sin imagen base64
                console.log(res);
            }
        }
    });

    return res;
}
async function colocarImagen(celda, data) {
    console.log("Lugar a colocar", celda);

    // Buscar la celda por su ID
    const td = document.getElementById(celda);

    if (td) {
        // Verificar si la celda ya contiene una imagen
        let img = td.querySelector('img');
        let p = td.querySelector('p');

        // Si no hay imagen o la imagen no es base64, crearla y colocarla
        if (!img || !img.src.startsWith('data:image/jpeg;base64')) {
            if (!img) {
                img = document.createElement('img');
                td.appendChild(img); // Agregar la imagen a la celda si no existe
            }
            img.src = data[0].Imagen; // Usar la URL de la imagen (que puede ser base64)
            console.log(data);
            img.alt = `Jugador en fila ${celda}`;
            img.style.background = 'white';
            cambiarPista('club')
        } else {
            console.log(`La celda con id ${celda} ya tiene una imagen base64.`);
        }

        // Actualizar el texto del párrafo o crearlo si no existe
        if (!p) {
            p = document.createElement('p');
            td.appendChild(p);
        }
        p.textContent = data[0].Apodo;

        console.log(`Imagen colocada en la celda con id ${celda}`);
    } else {
        console.log(`No se encontró la celda con id ${celda}.`);
    }
}
function cambiarPista(modo){
    if(modo==='club'){
        let res = numeroAleatorio(1,82);
        ponerClubes([res],['requisito']);
    }
    if(modo==='paises'){
        let res = numeroAleatorio(1,49);
        ponerBanderas([res],['requisito']);
    }
}
