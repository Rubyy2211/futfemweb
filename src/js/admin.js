function fetchData(idJuego) {
    // URL del archivo PHP al que se hace la solicitud
    const url = `../api/juegoxid?id_juego=${idJuego}`; // Cambia 'ruta/al/archivo.php' según tu estructura de archivos

    // Realizar la solicitud
    return fetch(url)  // Retorna la promesa de fetch
        .then(response => {
            // Verificar si la respuesta es correcta
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
            // Convertir la respuesta en JSON
            return response.json();
        })
        .then(data => {
            // Manejar los datos recibidos
            console.log(data);
            // Devolver los datos obtenidos para su uso posterior
            return data.success;
        })
        .catch(error => {
            // Manejar errores
            console.error('Hubo un problema con la solicitud fetch:', error);
            return { error: error.message };  // Retornar un objeto de error
        });
}
function Wordle() {
    const input = document.getElementById('id-jugadora1');

    // Llamar a fetchData y manejar la promesa
    fetchData(2).then(datos => {
        console.log(datos)
        if (datos.error) {
            // Manejar el error
            input.textContent = datos.error; // Mostrar mensaje de error en el input
        } else {
            // Suponiendo que "idJugadora" es una propiedad de la respuesta JSON
            input.value = datos.idJugadora // Usar .value para actualizar un input
        }
    });
}
function Adivina() {
    const input = document.getElementById('id-jugadora3');

    // Llamar a fetchData y manejar la promesa
    fetchData(3).then(datos => {
        console.log(datos)
        if (datos.error) {
            // Manejar el error
            input.textContent = datos.error; // Mostrar mensaje de error en el input
        } else {
            // Suponiendo que "idJugadora" es una propiedad de la respuesta JSON
            input.value = datos.idJugadora // Usar .value para actualizar un input
        }
    });
}

function GTrayectoria() {
    const input = document.getElementById('id-jugadora2');

    // Llamar a fetchData y manejar la promesa
    fetchData(1).then(datos => {
        console.log(datos)
        if (datos.error) {
            // Manejar el error
            input.textContent = datos.error; // Mostrar mensaje de error en el input
        } else {
            // Suponiendo que "idJugadora" es una propiedad de la respuesta JSON
            input.value = datos.idJugadora // Usar .value para actualizar un input
        }
    });
}
function actualizarGuessTrayectoria() {
    // Obtener el valor del input
    const inputValue = document.getElementById('id-jugadora1').value;

    // Crear un objeto con el valor
    const jsonData = {
        idJugadora: inputValue // Clave: valor del input
    };

    // Convertir a JSON
    const jsonString = JSON.stringify(jsonData);

    // Mostrar el JSON en la consola
    console.log(jsonString);

    // Aquí puedes hacer lo que quieras con el JSON, como enviarlo a un servidor
    // Por ejemplo, llamar a la función para enviar a una API
    sendToAPI(jsonString, 1);
}
function actualizarAdivina() {
    // Obtener el valor del input
    const inputValue = document.getElementById('id-jugadora3').value;

    // Crear un objeto con el valor
    const jsonData = {
        idJugadora: inputValue // Clave: valor del input
    };

    // Convertir a JSON
    const jsonString = JSON.stringify(jsonData);

    // Mostrar el JSON en la consola
    console.log(jsonString);

    // Aquí puedes hacer lo que quieras con el JSON, como enviarlo a un servidor
    // Por ejemplo, llamar a la función para enviar a una API
    sendToAPI(jsonString, 3);
}
function actualizarWordle() {
    // Obtener el valor del input
    const inputValue = document.getElementById('id-jugadora2').value;

    // Crear un objeto con el valor
    const jsonData = {
        idJugadora: inputValue // Clave: valor del input
    };

    // Convertir a JSON
    const jsonString = JSON.stringify(jsonData);

    // Mostrar el JSON en la consola
    console.log(jsonString);

    // Aquí puedes hacer lo que quieras con el JSON, como enviarlo a un servidor
    // Por ejemplo, llamar a la función para enviar a una API
    sendToAPI(jsonString, 2);
}
// Función para enviar el JSON a un servidor
function sendToAPI(jsonString, id) {
    console.log('Enviando JSON:', jsonString); // Log del JSON que se enviará
    fetch(`../api/juego_actualizar?id_juego=${id}`, { // Cambia esta URL por la tuya
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            valor:jsonString})  // Envía el JSON tal como está
    })
        .then(response => {
            console.log(response)
            // Verifica si la respuesta es correcta
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
            return response.json(); // Convertir la respuesta en JSON
        })
        .then(data => {
            console.log('Respuesta del servidor:', data);
            if (data.error) {
                // Manejar error del servidor
                console.error('Error del servidor:', data.error);
            } else {
                console.log('Actualización exitosa:', data.message);
            }
        })
        .catch(error => {
            console.error('Error al enviar el JSON:', error);
        });
}

