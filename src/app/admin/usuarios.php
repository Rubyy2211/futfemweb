<!doctype html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Insertar Jugadora</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
    <link rel="stylesheet" href="../css/estilos.css">
    <link rel="stylesheet" href="../css/variables.css">
    <style>
        #users thead {
            background: var(--bg-table);
        }
    </style>
</head>

<body>
    <?php require_once '../header.html' ?>
    <div class="form-container">
        <div style="margin-bottom: 10px;">
            <span style="font-size: 30px;">Usuarios</span>
            <button onclick="createUser()"><i class="bi bi-plus-circle"></i></button>
        </div>
        <table id="users">
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>Correo</th>
                    <th>Rol</th>
                    <th></th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
    <script src="control-acceso.js" data-roles-restringidos="2"></script>
    <script src="\futfemweb\src\js\admin-usuarios.js"></script>
    <!-- <script src="../js/admin.js"></script>
<script src="../js/admin-jugadora.js"></script> -->
    <script>
        // // Llamar a la función para cargar los países al inicializar la página
        // paisesAll();
        // // Llamar a la función para cargar las posiciones al inicializar la página
        // posicionesAll();
    </script>
</body>

</html>