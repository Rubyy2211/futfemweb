<?php

// FIXME: Validar que el usuario esté identificado


require_once 'includes/PeticionREST.php';
$peticion = new PeticionREST('api');

$recurso = $peticion->recurso();

$metodo = strtolower($peticion->metodo());

$salida = [];
if(str_starts_with($recurso,'liga')){

    $file = "recursos/liga/$recurso.$metodo.inc";

}else if(str_starts_with($recurso,'equipo')){

    $file = "recursos/equipo/$recurso.$metodo.inc";

}else if(str_starts_with($recurso,'pais')){

    $file = "recursos/pais/$recurso.$metodo.inc";

}else if(str_starts_with($recurso,'jugadora')){

    $file = "recursos/jugadora/$recurso.$metodo.inc";

}else if(str_starts_with($recurso,'posicion')){

    $file = "recursos/posicion/$recurso.$metodo.inc";

}else if(str_starts_with($recurso,'juego')){

    $file = "recursos/juegos/$recurso.$metodo.inc";

}else{
// archivo a importar según el recurso solicitado
$file = "recursos/$recurso.$metodo.inc";
}
// comprobar que existe, si no, devolver error 400
if(!file_exists($file)) {
	http_response_code(400);
	die();
}
// importar el archivo
require_once $file;

header('Content-Type: application/json; charset=utf-8');
echo json_encode($salida);
