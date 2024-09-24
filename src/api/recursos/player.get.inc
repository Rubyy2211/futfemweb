<?php
require_once "includes/conexion-bbdd.php";

// Obtener el ID de la jugadora desde la petición GET
$idJugadora = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($idJugadora <= 0) {
    echo json_encode(["error" => "ID de jugadora no proporcionado o inválido"]);
    exit;
}

// Preparar y ejecutar la consulta para obtener la información de la jugadora y su trayectoria
$query = "
SELECT DISTINCT
    jugadoras.id_jugadora as id,
    concat(jugadoras.Nombre,' ',jugadoras.Apellidos) nombre,
    jugadoras.apodo,
    jugadoras.Nacimiento,
    jugadoras.Nacionalidad as pais,    
    jugadoras.imagen AS ImagenJugadora, 
    COALESCE(posiciones.idPosicionPadre,jugadoras.posicion) posicion,
    trayectoria.equipo,
    trayectoria.equipo_actual actual, 
    equipos.liga
FROM  jugadoras
JOIN  trayectoria ON trayectoria.jugadora = jugadoras.id_jugadora 
JOIN  equipos ON trayectoria.equipo = equipos.id_equipo 
JOIN  posiciones ON posiciones.idPosicion = jugadoras.posicion

WHERE jugadoras.id_jugadora = ?";


$stmt = $conn->prepare($query);
$stmt->bind_param("i", $idJugadora); // Usar el ID de la jugadora
$stmt->execute();
$result = $stmt->get_result();

$jugadora = [
    'id'=>0,
    'nombre'=>'',
    'apodo' =>'',
    'imagen'=>'',
    'pais'=>'',
    'liga' =>0,
    'ligas'=>[],
    'equipo'=>0,
    'equipos'=>[],
    'edad' =>0,
    'posicion'=>0,            
    ];
    
    
if ($result->num_rows > 0) {
    while ($fila = $result->fetch_assoc()) {                      
        if($jugadora['nombre']==''){
            $jugadora['id']=$fila['id'];
            $jugadora['nombre']=$fila['nombre'];
            $jugadora['apodo']=$fila['apodo'];                        
            $jugadora['pais']=$fila['pais'];           

            // Codificar la imagen de la jugadora en base64 si está disponible
            if (!empty($fila['ImagenJugadora'])) {
                $jugadora['imagen'] = 'data:image/jpeg;base64,' . base64_encode($fila['ImagenJugadora']);
            }


            $hoy = new DateTime(); // Fecha actual
            $nacimiento = new DateTime($fila['Nacimiento']); // Convertir la fecha de nacimiento a un objeto DateTime
            $edad = $hoy->format('Y') - $nacimiento->format('Y'); // Calcular la diferencia de años
            $mes = $hoy->format('m') - $nacimiento->format('m'); // Calcular la diferencia de meses
            
            // Ajustar la edad si el cumpleaños de este año aún no ha ocurrido
            if ($mes < 0 || ($mes === 0 && $hoy->format('d') < $nacimiento->format('d'))) {
                $edad--;
            }
            $jugadora['edad']=$edad; 
            $jugadora['posicion']=$fila['posicion'];                                      
        }

        if ($fila['actual'] == 1) {
            $jugadora['equipo']=  $fila['equipo'];
            $jugadora['liga']=  $fila['liga'];
        }else{
            //si no esta en el array se agrega
            if (!in_array($fila['equipo'], $jugadora['equipos'])) {
                array_push($jugadora['equipos'] ,$fila['equipo']);
            }
            
            if (!in_array($fila['liga'], $jugadora['ligas'])) {
                array_push($jugadora['ligas'] ,$fila['liga']);
            }
        }                
    }
}

$stmt->close();
$conn->close();

// Devolver los resultados como JSON
header('Content-Type: application/json');
$salida["success"] = $jugadora;