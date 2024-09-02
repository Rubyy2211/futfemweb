function obtenerBanderas(id1, id2, id3) {
    const url = `../api/banderas?id1=${id1}&id2=${id2}&id3=${id3}`;
    console.log(`URL generada: ${url}`);

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Respuesta recibida:", data);

            if (data.success && Array.isArray(data.success)) {
                const thIds = ["PaisA", "PaisB", "PaisC"];

                data.success.forEach((pais, index) => {
                    const th = document.getElementById(thIds[index]);

                    if (th) {
                        th.innerHTML = ''; // Limpiar el contenido previo

                        // Crear y configurar la imagen
                        const img = document.createElement('img');
                        img.src = `data:image/svg+xml;base64,${pais.bandera}`;
                        img.alt = pais.nombre;
                        img.style.width = "50px";
                        img.style.height = "auto";
                        img.classList.add(`${pais.pais}`); // ID basado en id_pais

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

// Ejemplo de uso
obtenerBanderas(1, 7, 2); // Llama a la función con los IDs de los países que quieras
