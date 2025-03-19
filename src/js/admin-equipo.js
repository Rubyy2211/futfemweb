async function handleAutocompleteTeam(event) {
    const input = event.target;
    const texto = input.value.trim();
    const suggestionsList = document.getElementById("sugerencias");

    // Limpiar sugerencias previas
    suggestionsList.innerHTML = '';

    if (texto.length > 2) { // Solo si hay más de 2 caracteres
        const url = `../api/equipoxnombre?nombre=${encodeURIComponent(texto)}`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const results = await response.json();

            // Evitar duplicados
            const idsMostrados = new Set();

            results.forEach(equipo => {
                const { club, nombre, escudo, liga } = equipo;
                console.log(equipo)
                if (!idsMostrados.has(club)) { // Verificar que no se haya mostrado este ID
                    idsMostrados.add(club);

                    const listItem = document.createElement('li');
                    listItem.classList.add('suggestion-item');

                    listItem.innerHTML = `
                        <img src="${escudo}" alt="${escudo}" class="jugadora-img">
                        <div class="jugadora-info">
                            <strong>${nombre}</strong>
                            <p>liga: ${liga}</p>
                        </div>
                    `;

                    listItem.addEventListener('click', () => {
                        // Insertar el nombre en el input al hacer clic
                        input.value = nombre;
                        input.setAttribute('data-id', club);
                        suggestionsList.innerHTML = '';  // Limpiar las sugerencias
                        document.getElementById("equipo_id").value = club;
                        loadEquipoById(club);  // Cargar los detalles de la jugadora
                    });

                    suggestionsList.appendChild(listItem);
                }
            });
        } catch (error) {
            console.error('Error al buscar la jugadora:', error);
        }
    }
}


async function loadEquipoById(id) {
    try {
        // Hacer la solicitud a la API con el ID de la jugadora
        const response = await fetch(`../api/equipoxid?id=${id}`);

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        // Parsear la respuesta JSON
        const data = await response.json();
        console.log('Datos recibidos:', data);

        // Verificar si los datos contienen información de la trayectoria
        if (Array.isArray(data) && data.length > 0) {
            displayEquipo(data);
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


function displayEquipo(equipo) {
    console.log(equipo)
    document.getElementById('nombre').value = equipo[0].Nombre;
    document.getElementById('liga').value = equipo[0].Liga;
    document.getElementById('preview').src = equipo[0].Escudo;
}


function actualizarEquipo(){
    const nombreInput = document.getElementById('nombre');
    const ligaInput = document.getElementById('liga');
    const imagenInput = document.getElementById("imagen");
    const formData = new FormData();

    const equipo = document.getElementById('equipo_id').value;
    const nombre = nombreInput.value;
    const liga = ligaInput.value;

    formData.append("equipo_id", equipo);
    formData.append("nombre", nombre);
    formData.append("liga", liga);

    let tiposPermitidos = ["image/jpeg", "image/png", "image/gif", "image/webp"];

    if (imagenInput.files.length > 0  && tiposPermitidos.includes(imagenInput.files[0].type)) {
        formData.append("Imagen", imagenInput.files[0]);
    }
    // Depuración: Mostrar el contenido del FormData
    for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
    }
    console.log(formData);
    fetch("../api/equipo_edit", {
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


async function insertarEquipo() {
    const formData = new FormData();
    formData.append("nombre", document.getElementById('nombre').value);
    formData.append("liga", document.getElementById('liga').value);

    const imagenInput = document.getElementById("imagen");
    if (imagenInput.files.length > 0) {
        formData.append("imagen", imagenInput.files[0]);
    }

    // Depuración: Mostrar el contenido del FormData
    for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
    }
    try {
        const response = await fetch('../api/equipo', {
            method: 'POST',
            body: formData, // No se debe usar headers `Content-Type`, se maneja automáticamente
        });

        const result = await response.json();
        console.log("Respuesta del servidor:", result);

        if (result.success) {
            console.log("Equipo insertado con éxito.");
        } else {
            console.log("Error al insertar equipo:", result.message || "Error desconocido");
        }
    } catch (error) {
        console.error("Error durante el fetch:", error);
    }
}



