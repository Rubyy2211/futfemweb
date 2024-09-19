
function showModalForSelection(jugadoras,modo) {
    const modal = document.getElementById('selectionModal');
    const jugadoraList = document.getElementById('jugadoraList');
    jugadoraList.innerHTML = ''; // Limpiar la lista anterior

    jugadoras.forEach(jugadora => {
        const li = document.createElement('li');
        li.textContent = jugadora.Nombre_Completo;
        li.classList.add('jugadora-option');
        li.dataset.id = jugadora.id_jugadora;

        li.addEventListener('click', () => {
            handleSelectedJugadora(jugadora.id_jugadora, jugadora.Nombre_Completo,modo);
            closeModal();
        });

        jugadoraList.appendChild(li);
    });

    // Mostrar el modal
    modal.classList.remove('ocultar');
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('selectionModal');
    modal.classList.add('ocultar');
    modal.style.display = 'none';
}

function handleSelectedJugadora(idJugadora, nombreCompleto, modo) {
    if(modo==='trayectoria') {
        const div = document.getElementById('trayectoria');
        const idClass = `id-${idJugadora}`;
        const found = div.classList.contains(idClass);

        const resultDiv = document.getElementById('result');
        if (found) {
            resultDiv.textContent = `${nombreCompleto}`;
            //cambiarImagenConFlip();
            Ganaste(modo);
        } else {
            resultDiv.textContent = `No se encontró ninguna jugadora con los criterios proporcionados.`;
        }
    }else if(modo==='grid'){
        console.log(`Jugadora seleccionada: ${nombreCompleto} (ID: ${idJugadora})`);
        Verificar(idJugadora);
    }else  if(modo==='XI'){
        console.log(`Jugadora seleccionada: ${nombreCompleto} (ID: ${idJugadora})`);
            introducirJugadora(idJugadora);
    }
}

