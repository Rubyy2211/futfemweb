<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Editar Jugadora</title>
    <link rel="stylesheet" href="../css/estilos.css">
    <link rel="stylesheet" href="../css/combo.css">
    <link rel="stylesheet" href="../css/admin.css">
    <script>
        function previewImage() {
            const file = document.getElementById("imagen").files[0];
            const preview = document.getElementById("preview");

            const reader = new FileReader();
            reader.onloadend = function () {
                preview.src = reader.result;
            }

            if (file) {
                reader.readAsDataURL(file);
            } else {
                preview.src = "";
            }
        }
    </script>
</head>
<body>
<div class="form-container">
<form>
    <input type="hidden" id="equipo_id">
    <img id="preview" src="../img/predeterm.jpg" alt="Vista previa de la imagen" style="max-width: 200px; max-height: 200px;">
    <div class="form-item">
    <label for="nombre">Nombre:</label>
    <input type="text" name="nombre" id="nombre">
    </div>

    <div class="form-item">
    <label for="liga">Liga:</label>
    <input type="text" name="liga" id="liga">
    </div>

    <div class="form-item">
    <label for="imagen">Imagen:</label>
    <input type="file" name="imagen" id="imagen" accept="image/*" onchange="previewImage()">
    </div>
    <button type="button" onclick="insertarEquipo()" value="Consultar">Enviar</button>
</form>
</div>
<script src="control-acceso.js" data-roles-restringidos="2"></script>
<script src="../js/admin.js"></script>
<script src="../js/admin-equipo.js"></script>
</body>
</html>

