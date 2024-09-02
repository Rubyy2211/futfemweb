function obtenerLigas(id1, id2, id3) {
    const url = `../api/ligas?id1=${id1}&id2=${id2}&id3=${id3}`;
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
                const thIds = ["Equipo1", "Equipo2", "Equipo3"];

                data.success.forEach((pais, index) => {
                    const th = document.getElementById(thIds[index]);

                    th.innerHTML = ''; // Limpiar el contenido previo

                    const img = document.createElement('img');
                    img.src = `data:image/svg+xml;base64,${pais.bandera}`;
                    img.alt = pais.nombre;
                    img.style.width = "50px";
                    img.style.height = "auto";

                    const text = document.createElement('p');
                    text.textContent = pais.nombre;
                    text.style.margin = "0";

                    th.appendChild(img);
                    th.appendChild(text);
                });
            } else {
                console.error("Error: Respuesta no contiene un array válido:", data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
obtenerLigas(1, 4, 5); // Llama a la función con los IDs de los países que quieras

