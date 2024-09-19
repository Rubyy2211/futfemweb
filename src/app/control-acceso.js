(async (script) => {
    const respuesta = await fetch('../api/sesion/');
    if (respuesta.ok) {
        const data = await respuesta.json();
        if (script.dataset && script.dataset.rolesRestringidos) {
            const rolesRestringidos = script.dataset.rolesRestringidos.split(',');
            if (rolesRestringidos.includes(data.idRol)) {
                //alert('Permisos insuficientes para acceder a la página');
                location.href = '../login.php';
                return;
            }
        }
        // Actualizar el nombre del usuario si es necesario
        // document.getElementById('user-name').innerText = data.Usuario;
        document.body.classList.remove("loading");

        // Comprobar si existe una función init y si es así, ejecutarla
        if (window.init) window.init();
    } else {
        location.href = '../';
    }
})(document.currentScript);

async function logout() {
    const respuesta = await fetch('../api/sesion/', {
        method: 'DELETE'
    });
    if (respuesta.ok) {
        location.href = '../';
    }
}
