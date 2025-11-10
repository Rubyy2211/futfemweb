async function cargarEquipos() {
    try {
        const respuesta = await fetch(`../api/equiposall`);
        const data = await respuesta.json();

        if (data.success && Array.isArray(data.success)) {
            // ✅ Ordenar por nombre (A → Z)
            const equiposOrdenados = data.success.sort((a, b) =>
                a.nombre.localeCompare(b.nombre)
            );

            // ✅ Tomar solo los primeros 20
            const primeros20 = equiposOrdenados.slice(0, 20);

            displayEquipo(primeros20);
        } else {
            console.error('Formato de respuesta inesperado:', data);
        }
    } catch (error) {
        console.error('Error al obtener equipos:', error);
    }
}

function displayEquipo(equipos) {
    const div = document.getElementById('equipos-lista');
    div.innerHTML = ''; // limpiar contenido previo

    equipos.forEach(equipo => {
        const item = document.createElement('div');
        item.classList.add('equipo-item');

        const img = document.createElement('img');
        img.src = equipo.escudo;
        img.alt = equipo.nombre;

        const nombre = document.createElement('span');
        nombre.textContent = equipo.nombre;

        item.appendChild(img);
        item.appendChild(nombre);
        div.appendChild(item);
    });
}

async function cargarPaises() {
    try {
        const respuesta = await fetch(`../api/paisesall`);
        const data = await respuesta.json();

        if (data.success && Array.isArray(data.success)) {
            // ✅ Ordenar por nombre (A → Z)
            const paisesOrdenados = data.success.sort((a, b) =>
                a.nombre.localeCompare(b.nombre)
            );

            // ✅ Tomar solo los primeros 20
            const primeros20 = paisesOrdenados.slice(0, 20);

            displayPaises(primeros20);
        } else {
            console.error('Formato de respuesta inesperado:', data);
        }
    } catch (error) {
        console.error('Error al obtener paises:', error);
    }
}

function displayPaises(paises) {
    const div = document.getElementById('paises-lista');
    div.innerHTML = ''; // limpiar contenido previo

    paises.forEach(pais => {
        const item = document.createElement('div');
        item.classList.add('equipo-item');

        const img = document.createElement('img');
        img.src = pais.bandera;
        img.alt = pais.nombre;

        const nombre = document.createElement('span');
        nombre.textContent = pais.nombre;

        item.appendChild(img);
        item.appendChild(nombre);
        div.appendChild(item);
    });
}

async function cargarJugadoras() {
    try {
        const respuesta = await fetch(`../../api/jugadorasall`);
        const data = await respuesta.json();
        console.log(data)
        if (data.success && Array.isArray(data.success)) {
            // ✅ Ordenar alfabéticamente por nombre
            /*const jugadorasOrdenadas = data.success.sort((a, b) =>
                a.nombre.localeCompare(b.nombre)
            );*/
            const datos = data.success;
            // ✅ Mostrar solo las primeras 20
            const primeras20 = datos.slice(0, 20);

            displayJugadoras(primeras20);
        } else {
            console.error('Formato de respuesta inesperado:', data);
        }
    } catch (error) {
        console.error('Error al obtener jugadoras:', error);
    }
}

function displayJugadoras(jugadoras) {
    const div = document.getElementById('jugadoras-lista');
    div.innerHTML = ''; // limpiar contenido previo

    jugadoras.forEach(jugadora => {
        const item = document.createElement('div');
        item.classList.add('equipo-item'); // puedes cambiarlo por 'jugadora-item' si prefieres

        // Imagen de la jugadora
        const img = document.createElement('img');
        img.src = jugadora.imagen || '../../img/predeterm.jpg'; // imagen por defecto si no hay foto
        img.alt = jugadora.nombre;
        img.style.borderRadius = '100%';

        // Nombre completo o apodo
        const nombre = document.createElement('span');
        nombre.textContent = jugadora.apodo
            ? `${jugadora.apodo} (${jugadora.nombre} ${jugadora.apellidos})`
            : `${jugadora.nombre} ${jugadora.apellidos}`;

        // Nombre completo o apodo
        const posicion = document.createElement('span');
        posicion.textContent = jugadora.posicion_abreviatura;
        posicion.className = 'posicion';
        posicion.style.textAlign = 'center';

        const bandera = document.createElement('img');
        bandera.id = 'bandera'+ jugadora.nacionalidad;
        bandera.src = jugadora.bandera;
        bandera.alt = jugadora.nacionalidad;


        const escudo = document.createElement('img');
        escudo.id = 'equipo' + jugadora.id;
        escudo.src = jugadora.escudo_equipo;
        escudo.alt = jugadora.equipo_nombre;

        item.appendChild(img);
        item.appendChild(nombre);
        item.appendChild(posicion);
        item.appendChild(bandera);
        item.appendChild(escudo);
        div.appendChild(item);
    });
}

// Llamar la función al cargar la página
//cargarEquipos();
//cargarPaises();
cargarJugadoras();