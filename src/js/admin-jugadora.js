async function insertarJugadora() {
    const formData = new FormData();
    formData.append("nombre", document.getElementById('nombre').value);
    formData.append("apellidos", document.getElementById('apellidos').value);
    formData.append("apodo", document.getElementById('apodo').value);
    formData.append("nacimiento", document.getElementById('nacimiento').value);
    formData.append("nacionalidad", document.getElementById('nacionalidad').value);
    formData.append("posicion", document.getElementById('posicion').value);
    formData.append("retiro", document.getElementById('retiro').value || null);

    const imagenInput = document.getElementById("imagen");
    if (imagenInput.files.length > 0) {
        formData.append("imagen", imagenInput.files[0]);
    }

    // Depuración: Mostrar el contenido del FormData
    for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
    }
    try {
        const response = await fetch('../api/jugadora', {
            method: 'POST',
            body: formData, // No se debe usar headers `Content-Type`, se maneja automáticamente
        });

        const result = await response.json();
        console.log("Respuesta del servidor:", result);

        if (result.success) {
            console.log("Jugadora insertada con éxito.");
        } else {
            console.log("Error al insertar jugadora:", result.message || "Error desconocido");
        }
    } catch (error) {
        console.error("Error durante el fetch:", error);
    }
}


async function handleAutocompleteJugadora(event) {
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
                        loadPlayerById(id_jugadora);  // Cargar los detalles de la jugadora
                    });

                    suggestionsList.appendChild(listItem);
                }
            });
        } catch (error) {
            console.error('Error al buscar la jugadora:', error);
        }
    }
}

async function loadPlayerById(id) {
    try {
        // Hacer la solicitud a la API con el ID de la jugadora
        const response = await fetch(`../api/jugadoraxid?id=${id}`);

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        // Parsear la respuesta JSON
        const data = await response.json();
        console.log('Datos recibidos:', data);

        // Verificar si los datos contienen información de la trayectoria
        if (Array.isArray(data) && data.length > 0) {
            displayJugadora(data);
        } else {
            console.warn('No hay datos de la jugadora disponibles.');
            //document.getElementById('result').textContent = 'No se encontraron trayectorias para esta jugadora.';
        }
    } catch (error) {
        // Manejo de errores
        console.error('Error al cargar la jugadora:', error);
        //document.getElementById('result').textContent = 'Error al cargar los datos.';
    }
}

function displayJugadora(jugadora) {
    document.getElementById('nombre').value = jugadora[0].Nombre;
    document.getElementById('apellidos').value = jugadora[0].Apellidos;
    document.getElementById('apodo').value = jugadora[0].Apodo;
    document.getElementById('nacimiento').value = jugadora[0].Nacimiento;
    document.getElementById('nacionalidad').value = jugadora[0].Nacionalidad;
    document.getElementById('posicion').value = jugadora[0].Posicion;
    document.getElementById('preview').src = jugadora[0].Imagen;
    document.getElementById('retiro').value = jugadora[0].Retiro;
}

// Función debounce para limitar las solicitudes
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}


function actualizarJugadora(){
    const nombreInput = document.getElementById('nombre');
    const apellidosInput = document.getElementById('apellidos');
    const apodoInput = document.getElementById('apodo');
    const nacimientoInput = document.getElementById('nacimiento');
    const nacionalidadInput = document.getElementById('nacionalidad');
    const posicionInput = document.getElementById('posicion');
    const retiroInput = document.getElementById('retiro');
    const imagenInput = document.getElementById("imagen");
    const formData = new FormData();

    const jugadora = document.getElementById('jugadora_id').value;
    const nombre = nombreInput.value;
    const apellidos = apellidosInput.value;
    const apodo = apodoInput.value;
    const nacimiento = nacimientoInput.value;
    const posicion = posicionInput.value;
    const nacionalidad = nacionalidadInput.value;
    let retiro = retiroInput.value;

    formData.append("jugadora_id", jugadora);
    formData.append("nombre", nombre);
    formData.append("apellidos", apellidos);
    formData.append("apodo", apodo);
    formData.append("nacimiento", nacimiento);
    formData.append("posicion", posicion);
    formData.append("nacionalidad", nacionalidad);
    formData.append("retiro", retiro);

    let tiposPermitidos = ["image/jpeg", "image/png", "image/gif", "image/webp"];

    if (imagenInput.files.length > 0  && tiposPermitidos.includes(imagenInput.files[0].type)) {
        formData.append("Imagen", imagenInput.files[0]);
    }
    // Depuración: Mostrar el contenido del FormData
    for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
    }
    console.log(formData);
    fetch("../api/jugadora_edit", {
        method: "POST",
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                //alert("Registro actualizado correctamente");
                //location.reload(); // Recargar la tabla
            } else {
                alert("Error al actualizar: " + data.error);
            }
        })
        .catch(error => console.error("Error al actualizar:", error));
}


