<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ficha de Jugadora</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f9;
            color: #333;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: white;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1, h2 {
            color: #2c3e50;
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
            background-color: #f2f2f2;
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

<div class="container">
    <!-- Título principal -->
    <h1>Ficha de Jugadora</h1>

    <!-- Información básica de la jugadora -->
    <div class="profile">
        <img src="https://via.placeholder.com/150" alt="Foto de la jugadora">
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
                <th>País</th>
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

        equipos.forEach(equipo => {
            const fila = document.createElement("tr");

            fila.innerHTML = `
                <td>${equipo.años}</td>
                <td>${equipo.nombre}</td>
                <td>${equipo.pais}</td>
                <td>${equipo.partidosJugados}</td>
                <td>${equipo.goles}</td>
            `;

            tablaEquipos.appendChild(fila);
        });
    }

    // Llamada a la función para cargar equipos y añadir a la tabla
    (async function () {
        const equipos = await sacarEquipos(1); // Aquí pones el nombre de la jugadora
        if (equipos) {
            agregarEquiposTabla(equipos);
        }
    })();

</script>

</body>
</html>
