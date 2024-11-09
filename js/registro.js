let boton = document.getElementById("btnRegistrar");

boton.addEventListener("click", evento => {
    evento.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
    registrarUsuario();
});

let registrarUsuario = async () => {
    let usuarios = {};

    usuarios.nombre = document.getElementById("nombre").value;
    usuarios.contraseña = document.getElementById("contraseña").value;

    try {
        const peticion = await fetch("http://localhost:8080/api/usuarios", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuarios)
        });

        if (peticion.ok) {
            // Redirige a la página de inicio de sesión si la respuesta es exitosa
            window.location.href = "inicioDeSesion.html";
        } else {
            // Maneja los errores de la petición
            console.error('Error en el registro:', peticion.statusText);
            alert('Error en el registro. Verifica los datos.');
        }
    } catch (error) {
        console.error('Error de conexión:', error);
        alert('Hubo un error al conectar con el servidor.');
    }
};
