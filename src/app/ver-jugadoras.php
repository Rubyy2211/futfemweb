<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="../css/estilos.css">
    <style>
        body {
            font-family: Arial, sans-serif;
            max-height: 100vh;
            width: 100%;
        }

        /* Contenedor principal */
        .table-container {
            display: flex;
            flex-wrap: wrap; /* Hace que los elementos se adapten al ancho */
            gap: 20px; /* Espacio entre elementos */
            justify-content: center; /* Centra los elementos */
            max-height: 100%;
            overflow-y: auto; /* Habilita el scroll vertical */
        }

        /* Tarjetas individuales */
        .player-card {
            background-color: rgba(128,0,128,0.45);
            border: 1px solid #ddd;
            border-radius: 10px;
            width: 250px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            transition: transform 0.2s ease;
        }

        .player-card:hover {
            transform: translateY(-5px); /* Efecto flotante */
        }

        .player-image {
            width: 100%;
            height: 250px;
            object-fit: cover; /* Asegura que la imagen se recorte y no se distorsione */
        }

        .player-info {
            padding: 15px;
            text-align: center;
        }

        .player-info h3 {
            margin: 5px 0;
            font-size: 18px;
            color: var(--color-detalles);
        }

        .player-info p {
            margin: 0;
            font-size: 14px;
            color: var(--color-detalles);
        }

        /* Añadir scroll visual */
        .table-container::-webkit-scrollbar {
            width: 8px;
        }

        .table-container::-webkit-scrollbar-thumb {
            background-color: #888;
            border-radius: 4px;
        }

        .table-container::-webkit-scrollbar-thumb:hover {
            background-color: #555;
        }
        /* Botones de paginación */
        .pagination {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
            margin: 15px 0;
        }

        .pagination button {
            background-color: #333;
            color: white;
            border: none;
            border-radius: 5px;
            padding: 10px 15px;
            font-size: 14px;
            cursor: pointer;
            transition: background-color 0.2s ease;
        }

        .pagination button:hover {
            background-color: #555;
        }

        .pagination button:disabled {
            background-color: #bbb;
            cursor: not-allowed;
        }
    </style>
</head>
<body>
<div class="table-container">
    <!-- Las tarjetas dinámicas se generan aquí -->
</div>
<div class="pagination">
    <button id="prevButton" disabled>Anterior</button>
    <button id="nextButton">Siguiente</button>
</div>
<script>
    const container = document.querySelector('.table-container');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');

    let currentPage = 1; // Página actual
    const itemsPerPage = 50; // Número de jugadoras por página
    let totalPages = 1; // Total de páginas (se calculará dinámicamente)
    let allJugadoras = []; // Almacena todos los datos de las jugadoras

    // Función para obtener los datos del endpoint
    async function fetchJugadoras() {
        try {
            const response = await fetch('../api/jugadorasall'); // URL del endpoint PHP
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json(); // Parsear la respuesta JSON
            allJugadoras = data; // Guardar todos los datos
            totalPages = Math.ceil(allJugadoras.length / itemsPerPage); // Calcular total de páginas
            renderPage(currentPage); // Renderizar la primera página
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    }

    // Función para renderizar una página específica
    function renderPage(page) {
        container.innerHTML = ''; // Limpiar el contenedor

        // Calcular índice inicial y final
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, allJugadoras.length);

        // Generar tarjetas para las jugadoras en la página actual
        for (let i = startIndex; i < endIndex; i++) {
            const jugadora = allJugadoras[i];
            const card = document.createElement('div');
            card.classList.add('player-card');

            // Generar el HTML de la tarjeta
            card.innerHTML = `
                <img class="player-image" src="${jugadora.imagen}" alt="Foto de ${jugadora.Nombre}">
                <div class="player-info">
                    <h3>${jugadora.Nombre} ${jugadora.Apellidos}</h3>
                    <p>Apodo: ${jugadora.Apodo}</p>
                </div>
            `;

            container.appendChild(card);
        }

        // Actualizar estado de los botones
        prevButton.disabled = page === 1;
        nextButton.disabled = page === totalPages;
    }

    // Eventos de los botones de paginación
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderPage(currentPage);
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderPage(currentPage);
        }
    });

    // Llamar a la función para obtener y mostrar las jugadoras
    fetchJugadoras();
</script>
</body>
</html>
