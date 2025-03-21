//Codigo que se ejecuta al cargar
cargarUsuarios();

//Funciones
async function cargarUsuarios() {
    let usuarios = document.getElementById('lUsers');


    fetch('../api/usersall')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data && Array.isArray(data)) {
                displayUsers(data);
            } else {
                console.error("Error: Respuesta no contiene un array válido:", data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function displayUsers(usuarios) {
    // Mostrar los usuarios en la tabla
    const tableBody = document.querySelector('#users tbody');
    tableBody.innerHTML = ''; // Limpiar contenido previo de la tabla

    usuarios.forEach(item => {
        const row = document.createElement('tr');
        row.id = `row-${item.Id}`;
        row.innerHTML = `
            <td>${item.Usuario}</td>
            <td>${item.Nombre}</td>
            <td>${item.Apellidos}</td>
            <td>${item.Correo}</td>
            <td>${item.Rol}</td>
            <td>               
                <button onclick="editUser(${item.Id})"><i class="bi bi-pencil-fill"></i></button>
                <button onclick="deleteUser(${item.Id})"><i class="bi bi-trash-fill"></i></button>
                <button onclick="changePwd(${item.Id})"><i class="bi bi-key"></i></button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function editUser(id) {
    const row = document.getElementById(`row-${id}`);

    if (!row) {
        alert("No se encontró la fila a editar.");
        return;
    }

    // Obtener las celdas de la fila
    const cells = row.getElementsByTagName("td");

    // Convertir las celdas en campos editables
    cells[0].innerHTML = `<input type="text" value="${cells[0].innerText}" id="edit-username-${id}">`;
    cells[1].innerHTML = `<input type="text" value="${cells[1].innerText}" id="edit-name-${id}">`;
    cells[2].innerHTML = `<input type="text" value="${cells[2].innerText}" id="edit-lastname-${id}">`;
    cells[3].innerHTML = `<input type="text" value="${cells[3].innerText}" id="edit-email-${id}">`;

    //Recuperar el valor 
    let valorActual = cells[4].innerText;
    cells[4].innerHTML = `<select id="edit-rol-${id}"></select>`;
    roles(document.getElementById(`edit-rol-${id}`), valorActual);

    // Cambiar los botones por "Guardar" y "Cancelar"
    cells[5].innerHTML = `
        <button onclick="saveEditUser(${id})">Guardar</button>
        <button onclick="cancelUser()">Cancelar</button>
    `;
}


async function roles(selectElement, valorActual = "") {
    fetch('../api/usersrols')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data && Array.isArray(data)) {
                selectElement.innerHTML = "";; // Limpiar el contenido previo
                const option = document.createElement('option');

                data.forEach((rol, index) => {
                    const option = document.createElement('option');
                    option.value = rol.Id;
                    option.text = rol.Rol;

                    // Verificar si esta opción es la que estaba seleccionada antes
                    if (rol.Rol.trim().toLowerCase() === valorActual.trim().toLowerCase()) {
                        option.selected = true;
                    }

                    selectElement.appendChild(option);
                });


            } else {
                console.error("Error: Respuesta no contiene un array válido:", data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


function createSelect(options, id = "") {
    const select = document.createElement("select");
    if (id) select.id = id;

    options.forEach(option => {
        const optionElement = document.createElement("option");
        optionElement.value = option.Id;
        optionElement.textContent = option.Rol;
        select.appendChild(optionElement);
    });

    return select;
}


async function createUser() {
    fetch('../api/usersrols')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data && Array.isArray(data)) {
                let selectRol = createSelect(data, "new-rol");
                const tableBody = document.querySelector('#users tbody');

                const row = document.createElement('tr');
                //row.id = `row-${item.Id}`;
                row.innerHTML = `
                    <td><input type="text" id="new-username"></td>
                    <td><input type="text" id="new-name"></td>
                    <td><input type="text" id="new-lastname"></td>
                    <td><input type="text" id="new-email"></td>
                    <td>${selectRol.outerHTML}</td>
                    <td>               
                        <button onclick="saveNewUser()">Guardar</button>
                    <button onclick="cancelUser()">Cancelar</button>
                    </td>
                `;

                tableBody.appendChild(row);
            } else {
                console.error("Error: Respuesta no contiene un array válido:", data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });

}


function saveEditUser(id) {
    const formData = new FormData();

    formData.append("id", id);
    formData.append("username", document.getElementById(`edit-username-${id}`).value);
    formData.append("name", document.getElementById(`edit-name-${id}`).value);
    formData.append("lastname", document.getElementById(`edit-lastname-${id}`).value);
    formData.append("email", document.getElementById(`edit-email-${id}`).value);
    formData.append("rol", document.getElementById(`edit-rol-${id}`).value);

    fetch("../api/users_edit", {
        method: "POST",
        body: formData
    })
        .then(response => response.json())
        .then(data => {

            if (data.success) {
                alert("Registro actualizado correctamente");
                location.reload(); // Recargar la tabla
            } else {
                alert("Error al actualizar: " + data.error);
            }
        })
        .catch(error => console.error("Error al actualizar:", error));
}

function cancelUser() {
    location.reload(); // Recargar la tabla para restablecer los datos originales
}

function saveNewUser(id) {
    const formData = new FormData();

    formData.append("username", document.getElementById(`new-username`).value);
    formData.append("name", document.getElementById(`new-name`).value);
    formData.append("lastname", document.getElementById(`new-lastname`).value);
    formData.append("email", document.getElementById(`new-email`).value);
    formData.append("rol", document.getElementById(`new-rol`).value);

    fetch("../api/users_insert", {
        method: "POST",
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Registro insertado correctamente");
                location.reload(); // Recargar la tabla
            } else {
                alert("Error al insertar: " + data.error);
            }
        })
        .catch(error => console.error("Error al insertar:", error));
}

function deleteUser(id) {
    const formData = new FormData();

    formData.append("id", id);

    fetch("../api/users_delete", {
        method: "POST",
        body: formData
    })
        .then(response => response.json())
        .then(data => {

            if (data.success) {
                alert("Registro eliminado correctamente");
                location.reload(); // Recargar la tabla
            } else {
                alert("Error al eliminar: " + data.error);
            }
        })
        .catch(error => console.error("Error al eliminar:", error));
}