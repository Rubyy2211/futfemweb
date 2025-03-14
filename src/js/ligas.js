let ligas = [];  // Almacenar todas las ligas
let equipos = [];  // Lista de equipos (vacía al principio)
let currentIndex = 0;  // Índice de la liga actualmente mostrada
let currentEquipoIndex = 0;
let currentPaisIndex = 0;
let paises = [];

// Función para mostrar una liga específica basada en el índice
function mostrarLiga(index) {
    const liga = ligas[index];
    //const leagueInfo = document.getElementById('league-info');
    const logo = document.getElementById('logo');
    logo.src = liga.logo;
    logo.className = liga.liga;  // Usar el ID de la liga en el className para luego buscar equipos
    buscarEquipoPorLiga(liga.liga);
}
// Función para mostrar un equipo específico basado en el índice
function mostrarEquipo(index) {
    const equipoName = document.getElementById('team-name');
    const equipoLogo = document.getElementById('team');
    const equipo = equipos[index];  // Suponemos que equipos tiene {nombre, logo}

    equipoName.textContent = equipo.nombre;
    equipoLogo.src = equipo.escudo;
    equipoLogo.className = equipo.equipo;
}
function mostrarPais(index) {
    const paisName = document.getElementById('paisNombre');
    const paisLogo = document.getElementById('country');
    const pais = paises[index];  // Suponemos que equipos tiene {nombre, logo}

    paisName.textContent = pais.nombre;
    paisLogo.src = pais.bandera;
    paisLogo.className = pais.pais;
    buscarLigaPorPais(pais.pais);
}
// Función para buscar ligas basadas en el país
function buscarLigaPorPais(paisId) {
    fetch(`../api/ligaxpais?pais=${paisId}`)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            if (data.success.length > 0) {
                ligas = data.success;  // Guardar todas las ligas
                currentIndex = 0;  // Empezar desde la primera liga
                mostrarLiga(currentIndex);  // Mostrar la primera liga
            } else {
                console.error('No se encontraron ligas para este país');
            }
        })
        .catch(error => console.error('Error al buscar la liga:', error));
}

// Función para buscar equipos basados en la liga
function buscarEquipoPorLiga(ligaId) {
    fetch(`../api/equiposxliga?liga=${ligaId}`)
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            if (data.success.length > 0) {
                // Aquí puedes manejar la lista de equipos devueltos
                equipos = data.success;
                //console.log('Equipos:', equipos);  // Imprimir los equipos devueltos
                // Aquí podrías añadir lógica para mostrar los equipos en la UI
                currentEquipoIndex = 0;
                mostrarEquipo(currentEquipoIndex);  // Mostrar la primera liga
            } else {
                console.error('No se encontraron equipos para esta liga');
            }
        })
        .catch(error => console.error('Error al buscar los equipos:', error));
}
// Función para buscar equipos basados en la liga
function buscarPaisesConLiga() {
    fetch(`../api/paisesconliga`)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            if (data.success.length > 0) {
                // Aquí puedes manejar la lista de equipos devueltos
                paises = data.success;
                //console.log('Equipos:', paises);  // Imprimir los equipos devueltos
                // Aquí podrías añadir lógica para mostrar los equipos en la UI
                currentPaisIndex = 0;
                mostrarPais(currentPaisIndex);  // Mostrar la primera liga
            } else {
                console.error('No se encontraron equipos para esta liga');
            }
        })
        .catch(error => console.error('Error al buscar los equipos:', error));
}
// Función para mover a la liga anterior
function ligaAnterior() {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = ligas.length - 1;  // Ir a la última liga si estamos en la primera
    }
    mostrarLiga(currentIndex);
}

// Función para mover a la siguiente liga
function ligaSiguiente() {
    if (currentIndex < ligas.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;  // Volver a la primera liga si estamos en la última
    }
    mostrarLiga(currentIndex);
}

// Función para cambiar al equipo anterior
function equipoAnterior() {
    if (currentEquipoIndex > 0) {
        currentEquipoIndex--;
    } else {
        currentEquipoIndex = equipos.length - 1;
    }
    mostrarEquipo(currentEquipoIndex);
}

// Función para cambiar al siguiente equipo
function equipoSiguiente() {
    if (currentEquipoIndex < equipos.length - 1) {
        currentEquipoIndex++;
    } else {
        currentEquipoIndex = 0;
    }
    mostrarEquipo(currentEquipoIndex);
}
// Función para cambiar al equipo anterior
function PaisAnterior() {
    if (currentPaisIndex > 0) {
        currentPaisIndex--;
    } else {
        currentPaisIndex = paises.length - 1;
    }
    mostrarPais(currentPaisIndex);
}

// Función para cambiar al siguiente equipo
function PaisSiguiente() {
    if (currentPaisIndex < paises.length - 1) {
        currentPaisIndex++;
    } else {
        currentPaisIndex = 0;
    }
    mostrarPais(currentPaisIndex);
}

// Obtener el ID de la liga actual para buscar equipos
const logo = document.getElementById('logo');
//const ligaId = 2;  // Obtenemos el ID de la liga actual desde el className

// Llamar a la función con el ID del país (ejemplo: 1 para Inglaterra)

buscarPaisesConLiga();
// Llamar a la función para buscar equipos de la liga actual
