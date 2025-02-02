
async function loadJugadoraById(id) {
    try {
        // Hacer la solicitud a la API con el ID de la jugadora
        const response = await fetch(`../api/jugadora_trayectoria?id=${id}`);

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        // Parsear la respuesta JSON
        const data = await response.json();
        console.log('Datos recibidos:', data);

        // Verificar si los datos contienen información de la trayectoria
        if (Array.isArray(data) && data.length > 0) {
            displayTrayectoria(data);
        } else {
            console.warn('No hay datos de la jugadora disponibles.');
            document.getElementById('result').textContent = 'No se encontraron trayectorias para esta jugadora.';
        }
    } catch (error) {
        // Manejo de errores
        console.error('Error al cargar la jugadora:', error);
        document.getElementById('result').textContent = 'Error al cargar los datos.';
    }
}

// Función para mostrar la trayectoria de la jugadora

// Mostrar la trayectoria en la tabla
function displayTrayectoria(trayectoria) {
    const tableBody = document.querySelector('#trayectoriaTable tbody');
    tableBody.innerHTML = ''; // Limpiar contenido previo de la tabla

    trayectoria.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.jugadora}</td>
            <td><img src="${item.escudo}" alt="Escudo del equipo" id="${item.equipo}" width="50"></td>
            <td>${item.años}</td>
            <td><img src="${item.imagen}" alt="Imagen de la jugadora" width="50"></td>
            <td>${item.equipo_actual ? 'Sí' : 'No'}</td>
            <td>
                <button onclick="editTrayectoria(${item.id})">Editar</button>
                <button onclick="deleteTrayectoria(${item.id})">Eliminar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Función debounce para limitar las solicitudes
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

async function handleAutocomplete(event) {
    const input = event.target;
    const texto = input.value.trim();
    const suggestionsList = document.getElementById("sugerencias");

    // Limpiar sugerencias previas
    suggestionsList.innerHTML = '';

    if (texto.length > 2) { // Solo si hay más de 2 caracteres
        const url = `../api/jugadoraxnombre?nombre=${encodeURIComponent(texto)}`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const results = await response.json();

            // Evitar duplicados
            const idsMostrados = new Set();

            results.forEach(jugadora => {
                const { id_jugadora, Nombre_Completo, imagen, Nacimiento } = jugadora;

                if (!idsMostrados.has(id_jugadora)) { // Verificar que no se haya mostrado este ID
                    idsMostrados.add(id_jugadora);

                    const listItem = document.createElement('li');
                    listItem.classList.add('suggestion-item');

                    listItem.innerHTML = `
                        <img src="${imagen}" alt="${Nombre_Completo}" class="jugadora-img">
                        <div class="jugadora-info">
                            <strong>${Nombre_Completo}</strong>
                            <p>Nacimiento: ${Nacimiento}</p>
                        </div>
                    `;

                    listItem.addEventListener('click', () => {
                        // Insertar el nombre en el input al hacer clic
                        input.value = Nombre_Completo;
                        input.setAttribute('data-id', id_jugadora);
                        suggestionsList.innerHTML = '';  // Limpiar las sugerencias
                        document.getElementById("jugadora_id").value = id_jugadora;
                        loadJugadoraById(id_jugadora);  // Cargar los detalles de la jugadora
                    });

                    suggestionsList.appendChild(listItem);
                }
            });
        } catch (error) {
            console.error('Error al buscar la jugadora:', error);
        }
    }
}

async function handleAutocompleteEquipo(event) {
    const input = event.target;
    const texto = input.value.trim();
    const suggestionsList = document.getElementById("sugerenciasEquipo");

    // Limpiar sugerencias previas
    suggestionsList.innerHTML = '';

    if (texto.length > 2) { // Solo si hay más de 2 caracteres
        const url = `../api/equipoxnombre?nombre=${encodeURIComponent(texto)}`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const results = await response.json();
            console.log(results);
            // Evitar duplicados

            results.forEach(equipo => {
                const { club, nombre, escudo } = equipo;



                const listItem = document.createElement('li');
                listItem.classList.add('suggestion-item');

                listItem.innerHTML = `
                        <img src="${escudo}" alt="${nombre}" class="equipo-img">
                        <div class="equipo-info">
                            <strong>${nombre}</strong>
                        </div>
                    `;

                listItem.addEventListener('click', () => {
                    // Insertar el nombre del equipo en el input al hacer clic
                    input.value = nombre;
                    input.setAttribute('data-id', club); // Guardar el ID del equipo
                    suggestionsList.innerHTML = '';  // Limpiar las sugerencias
                    document.getElementById("equipo_id").value = club; // Suponiendo que haya un campo para el ID del equipo
                    //loadEquipoById(id_equipo);  // Cargar los detalles del equipo
                });

                suggestionsList.appendChild(listItem);

            });
        } catch (error) {
            console.error('Error al buscar el equipo:', error);
        }
    }
}

async function anyadirTrayectoria(event) {
    event.preventDefault(); // Evita el envío tradicional del formulario

    let formData = new FormData();
    formData.append("jugadora_id", document.getElementById("jugadora_id").value);
    formData.append("equipo_id", document.getElementById("equipo_id").value);
    formData.append("años", document.getElementById("años").value);
    formData.append("Imagen", document.getElementById("Imagen").files[0]);
    formData.append("equipo_actual", document.getElementById("equipo_actual").checked ? 1 : 0);

    try {
        let response = await fetch("../api/jugadora_trayectoria", {
            method: "POST",
            body: formData
        });

        let result = await response.json();

        if (result.success) {
            alert("Registro agregado correctamente. ID: " + result.id_insertado);
            document.getElementById("agregarForm").reset(); // Limpiar formulario
        } else {
            alert("Error: " + result.error);
        }
    } catch (error) {
        console.error("Error al enviar el formulario:", error);
        alert("Hubo un problema con el envío de datos.");
    }
}