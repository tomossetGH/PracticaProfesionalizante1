document.getElementById("loginForm").addEventListener("submit", async (evento) => {
    evento.preventDefault(); 

    let usuario = {
        nombre: document.getElementById("nombre").value,
        contraseña: document.getElementById("contraseña").value
    };

    try {
        const respuesta = await fetch("http://localhost:8080/api/login", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });

        if (respuesta.ok) {
            alert("Inicio de sesión exitoso");
            window.location.href = "index.html"; // Redirige a otra página si el inicio es exitoso
        } else {
            alert("Credenciales incorrectas");
        }
    } catch (error) {
        console.error("Error de conexión:", error);
        alert("Hubo un error al conectar con el servidor.");
    }
});