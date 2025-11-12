<?php
function subirOActualizarImagen($imagen_origen, $destino)
{
        $archivo = $imagen_origen;
        $ruta_input = $destino;

        if ($archivo && $archivo['error'] === UPLOAD_ERR_OK && $ruta_input) {
            // Normalizar barras
            $ruta_normalizada = str_replace('\\', '/', $ruta_input);

            // Eliminar barra inicial si existe
            $ruta_normalizada = ltrim($ruta_normalizada, '/');

            // Determinar la ruta absoluta desde htdocs
            $htdocs_path = realpath($_SERVER['DOCUMENT_ROOT']); // C:\xampp\htdocs
            $ruta_destino = $htdocs_path . '/' . $ruta_normalizada;

            // Crear carpeta si no existe
            $carpeta = dirname($ruta_destino);
            if (!is_dir($carpeta)) mkdir($carpeta, 0777, true);

            // Validar imagen
            if (getimagesize($archivo['tmp_name']) === false) {
                die("No es una imagen válida.");
            }

            // Borrar imagen existente si hay
            /*if (file_exists($ruta_destino)) {
                unlink($ruta_destino);
            }*/

            // Mover nueva imagen
            if (move_uploaded_file($archivo['tmp_name'], $ruta_destino)) {
                //echo "Imagen eliminada y nueva creada correctamente en: $ruta_destino";
            } else {
                //echo "Error al guardar la imagen.";
            }
        } else {
            //echo "Ruta o archivo no válido.";
        }

}
?>