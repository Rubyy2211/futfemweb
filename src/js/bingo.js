// Ejemplo de uso
ponerBanderas([7, 16, 1], ["c21", "c32", "c33"]); // Llama a la función con los IDs de los países que quieras
ponerLigas(1, 4, 5, "c13","c34"); // Llama a la función con los IDs de los países que quieras
// Llama a la función con los IDs de los equipos que quieras
ponerClubes([1,2, 44], ["c12", "c14", "c31"]);
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


