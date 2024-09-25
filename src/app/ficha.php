<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ficha de Jugadora</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/estilos.css">
    <style>

        h1, h2 {
            color: var(--color-detalles);
        }
        .profile {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
        }
        .profile img {
            border-radius: 50%;
            width: 150px;
            height: 150px;
            margin-right: 20px;
        }
        .details {
            flex-grow: 1;
        }
        .details p {
            margin: 5px 0;
        }
        .details p span {
            font-weight: bold;
        }
        .trajectory {
            margin-top: 20px;
        }
        .trajectory table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        .trajectory table th, .trajectory table td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: center;
        }
        .trajectory table th {
            background-color: #2980b9;
            color: white;
        }
        .trajectory table tr:nth-child(even) {
            background-color: var(--color-texto);
        }
        .footer {
            text-align: center;
            padding: 20px;
            background-color: #ecf0f1;
            margin-top: 20px;
        }
    </style>
</head>
<body>
<?php require_once 'header.html'?>
<div class="container">
    <!-- Título principal -->
    <h1>Ficha de Jugadora</h1>

    <!-- Información básica de la jugadora -->
    <div class="profile">
        <img src="https://via.placeholder.com/150" alt="Foto de la jugadora" id="player-image">
        <div class="details">
            <h2>María Gómez</h2>
            <p><span>Edad:</span> 25 años</p>
            <p><span>Posición:</span> Delantera</p>
            <p><span>País:</span> España</p>
        </div>
    </div>

    <!-- Sección de trayectoria -->
    <div class="trajectory">
        <h2>Trayectoria Profesional</h2>
        <table>
            <thead>
            <tr>
                <th>Temporada</th>
                <th>Equipo</th>
                <th>Liga</th>
                <th>Partidos Jugados</th>
                <th>Goles</th>
            </tr>
            </thead>
            <tbody id="tabla-equipos">
            <!-- Las filas se generarán dinámicamente -->
            </tbody>
        </table>
    </div>

    <!-- Pie de página -->
    <div class="footer">
        <p>&copy; 2024 Fútbol Femenino. Todos los derechos reservados.</p>
    </div>
</div>

<script>
    const idJugadora=1;
    async function getEquipoXId(ids) {
        const url = `../api/equipos?id[]=${ids.join('&id[]=')}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Verificar si la respuesta contiene un array en data.success
            if (!Array.isArray(data.success)) {
                console.error('Error: La respuesta de la API no contiene un array en "success":', data);
                return [];
            }

            // Retornar el array dentro de "success"
            return data.success;
        } catch (error) {
            console.error('Error al obtener los equipos:', error);
            return [];
        }
    }
    async function getJugadoraXId(id) {
        const url = `../api/jugadoraxid?id=${id}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Datos recibidos:", data); // Ver los datos recibidos

            // Retornar el array dentro de "success"
            return data;
        } catch (error) {
            console.error('Error al obtener los equipos:', error);
            return [];
        }
    }

    async function getLigaXId(ids) {
        const url = `../api/ligas?id[]=${ids.join('&id[]=')}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Verificar si la respuesta contiene un array en data.success
            if (!Array.isArray(data.success)) {
                console.error('Error: La respuesta de la API no contiene un array en "success":', data);
                return [];
            }

            // Retornar el array dentro de "success"
            return data.success;
        } catch (error) {
            console.error('Error al obtener los equipos:', error);
            return [];
        }
    }


    // Función para obtener equipos y trayectorias de la jugadora
    async function sacarEquipos(nombre) {
        try {
            const response = await fetch(`../api/guesstrayectoria?id=${encodeURIComponent(nombre)}`);

            // Verifica que la solicitud fue exitosa
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }

            // Convertir la respuesta a JSON
            const data = await response.json();

            // Si el JSON contiene un error
            if (data.error) {
                throw new Error(data.error);
            }

            // Verifica si es una lista de objetos
            if (Array.isArray(data)) {
                return data; // Devuelve la lista de trayectorias
            } else {
                console.warn('La respuesta no es una lista válida de objetos:', data);
                return null;
            }
        } catch (error) {
            console.error('Error al obtener los equipos:', error);
            return null;
        }
    }

    // Función para agregar los equipos a la tabla
    function agregarEquiposTabla(equipos) {
        const tablaEquipos = document.getElementById("tabla-equipos");
        const jugadoraImg = document.getElementById("player-image");
        jugadoraImg.src=equipos[0].ImagenJugadora;
        equipos.forEach(equipo => {

                const fila = document.createElement("tr");

                fila.innerHTML = `
                <td>${equipo.años}</td>
                <td id='${equipo.equipo}'>${equipo.equipo}</td>
                <td>${equipo.liga}</td>
                <td>${equipo.partidosJugados}</td>
                <td>${equipo.goles}</td>
            `;

                tablaEquipos.appendChild(fila);
            });
    }

    // Función para agregar infoJugadora
    function agregarJugadoraInfo(jugadora) {
        const nombre = document.querySelector('h2');
        if (nombre) {
            nombre.textContent = jugadora[0].Nombre_Completo; // Asigna el nombre completo
        } else {
            console.error('Elemento h2 no encontrado.');
        }
    }

    // Llamada a la función para cargar equipos y añadir a la tabla
    (async function () {
        const equipos = await sacarEquipos(idJugadora); // Aquí pones el nombre de la jugadora
        if (equipos) {
            // Obtener IDs únicos de las ligas y equipos
            const ligaIdsUnicos = [...new Set(equipos.map(equipo => equipo.liga))];
            const equipoIdsUnicos = [...new Set(equipos.map(equipo => equipo.equipo))];

            // Obtener información de los equipos y ligas
            const equiposInfo = await getEquipoXId(equipoIdsUnicos);
            const ligasInfo = await getLigaXId(ligaIdsUnicos); // Aquí debería ser getLigaXId, no getEquipoXId

            // Asignar el nombre del equipo y la liga desde equiposInfo y ligasInfo a cada equipo en equipos
            equipos.forEach(equipo => {
                const equipoInfo = equiposInfo.find(info => info.club === equipo.equipo); // Asegúrate de que "club" es el campo correcto
                const ligaInfo = ligasInfo.find(info => info.liga === equipo.liga); // Asegúrate de que "liga" es el campo correcto

                console.log("Liga encontrada:", ligaInfo); // Para verificar la liga encontrada
                if (equipoInfo) {
                    equipo.equipo = equipoInfo.nombre; // Asigna el nombre del equipo
                } else {
                    equipo.equipo = 'Información no disponible'; // Por si no se encuentra el equipo
                }

                if (ligaInfo) {
                    equipo.liga = ligaInfo.nombre; // Asigna el nombre de la liga, si es necesario
                } else {
                    equipo.liga = 'Información de liga no disponible'; // Por si no se encuentra la liga
                }
            });
            const jugadora = await getJugadoraXId(idJugadora);
            console.log(jugadora)
            // Agregar los equipos a la tabla
            agregarEquiposTabla(equipos);
            agregarJugadoraInfo(jugadora);
        }
    })();




</script>
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>
