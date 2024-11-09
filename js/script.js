document.addEventListener('DOMContentLoaded', showMenuForWeek());

function showMenuForWeek(weekNumber) {
    // Oculta todos los menús
    document.querySelectorAll('.semana').forEach(menu => {
        menu.style.display = 'none';
    });

    // Selecciona todos los menús de la semana correspondiente usando la clase
    const menus = document.querySelectorAll(`.semana-${weekNumber}`);
    
    if (menus.length > 0) {
        menus.forEach(menu => {
            menu.style.display = 'flex'; // Muestra cada uno de los menús
        });

        // Desplaza suavemente al primer menú de la lista
        menus[0].scrollIntoView({ behavior: 'smooth' });
    }
}

// Logica del carrito
const productos = document.querySelectorAll('.producto');
const contadorProductos = document.getElementById('contador-productos'); //El contador que tiene el icono de la bolsa
const listaCarrito = document.getElementById('lista-carrito');

let cantidadProductos = 0; //Contador para llevar un registro de cuantos productos en total hay en el carrito
const cantidadesCarrito = {}; //Almacena la cantidad que hay de cada prodcuto
const elementosCarrito = {}; // Objeto para almacenar los elementos li del carrito

function agregarAlCarrito(producto) {
    // Incrementar la cantidad de productos
    cantidadProductos++;
    contadorProductos.textContent = cantidadProductos;

    // Obtener el título del producto para agregarlo a la lista del carrito
    const tituloProducto = producto.querySelector('.producto__titulo').textContent;

	if (!cantidadesCarrito[tituloProducto]) {
        cantidadesCarrito[tituloProducto] = 0; // Si no existe, inicializa la cantidad en 0
    } 

    cantidadesCarrito[tituloProducto]++;

	// Verifica si el producto ya está en la lista del carrito
	if (elementosCarrito[tituloProducto]) {
        // Si ya existe, actualiza el contenido del li existente
        elementosCarrito[tituloProducto].childNodes[0].textContent = cantidadesCarrito[tituloProducto] + '  ' + tituloProducto;

		// childNodes: Devuelve una colección (un objeto tipo NodeList) de todos los nodos hijos de un elemento. Por ejemplo, si un elemento tiene un texto y un elemento hijo, childNodes incluirá ambos. Si seleccionamos el li, su childNodes sería algo como: childNodes[0]: El nodo de texto que contiene "2 Carne".childNodes[1]: El nodo span que contiene ×.

	} else {
		  // Crear un elemento de lista para mostrar el producto en la ventana del carrito
        const itemCarrito = document.createElement('li');
        itemCarrito.textContent = cantidadesCarrito[tituloProducto] + '  ' + tituloProducto;

        // Agrego la x para eliminar el producto
        const btnEliminar = document.createElement('span');
        btnEliminar.innerHTML = '&times;';
        btnEliminar.classList.add('btn_eliminar'); // Agregar una clase para estilos

        // Añadir el evento de clic para eliminar el producto
        btnEliminar.addEventListener('click', () => {
            eliminarDelCarrito(tituloProducto);
        });

		// Agregar la x al (ul) itemCarrito
		itemCarrito.appendChild(btnEliminar);

		//appendChild Es un método en JavaScript que permite añadir un elemento (li en este caso) al final de la lista de hijos de otro elemento (ul).Simplemente agrega el elemento que tú le pases. Si le pasas un <li>, lo agrega como un <li> a lista del carrito. Solo toma un elemento que ya existe (uno que creaste o seleccionaste previamente) y lo añade dentro de otro elemento como su hijo.
		listaCarrito.appendChild(itemCarrito);
		elementosCarrito[tituloProducto] = itemCarrito; // Guarda el li en elementosCarrito
	}
}

function eliminarDelCarrito(tituloProducto) {
    // Reducir la cantidad total de productos
    cantidadProductos = cantidadProductos - cantidadesCarrito[tituloProducto];
    contadorProductos.textContent = cantidadProductos;

    // Si se eliminan todos los productos mostrar carrito vacio
    if(cantidadProductos === 0) {
        carritoVacio.style.display = 'flex';
		carrito.style.display = 'none';
    }

    // Eliminar el producto del carrito
    delete cantidadesCarrito[tituloProducto]; // Eliminar la cantidad del objeto
    listaCarrito.removeChild(elementosCarrito[tituloProducto]); // Eliminar el elemento de la lista

    // Eliminar la referencia del elemento del objeto
    delete elementosCarrito[tituloProducto];
}

const carrito = document.querySelector('.carrito')
const iconoCarrito = document.getElementById('carrito_icono')
const carritoVacio = document.querySelector('.carrito--vacio')

// Si se hace click en el icono de la bolsa se muestra el carrito
iconoCarrito.addEventListener('click', () => {

	// Si no hay productos muestra el aviso de que no hay productos en el carrito
	if(cantidadProductos === 0) {
        // Si ya esta mostrado el carrito vacio lo oculta
        if(carritoVacio.style.display === 'flex') {
            carritoVacio.style.display = 'none';
            return;
        }
		carritoVacio.style.display = 'flex';
		carrito.style.display = 'none';
		return;
	} else {
		carritoVacio.style.display = 'none';
	}

    // Verifica el estado actual del carrito y alterna su visibilidad
    if (carrito.style.display === 'flex') {
        carrito.style.display = 'none'; // Oculta el carrito
    } else {
        carrito.style.display = 'flex'; // Muestra el carrito
    }
});

productos.forEach((producto) => {
    const boton = producto.querySelector('.producto__btn');
    boton.addEventListener('click', () => {
		// Si ya pedimos mas de 3 productos se cancela la funcion
		if (cantidadProductos>=3) {
			return;
		};
		// Mostramos el carrito si se agrega un prodcuto
		carrito.style.display='flex';
        agregarAlCarrito(producto);
    });
});

// Obtenemos referencias a los elementos de la interfaz
const botonPedir = document.getElementById('btn--pedir');

// Función para obtener los días seleccionados
function obtenerDiasSeleccionados() {
    const diasSeleccionados = [];
    const checkboxes = document.querySelectorAll('.dias input[type="checkbox"]:checked');
    checkboxes.forEach(checkbox => diasSeleccionados.push(checkbox.value));
    return diasSeleccionados;
}

// Función para enviar el carrito a la API
async function guardarCarrito() {
    const dias = obtenerDiasSeleccionados();
    
    const carrito = {
        productos: Object.entries(cantidadesCarrito).map(([nombre, cantidad]) => ({
            nombre: nombre,
            cantidad: cantidad,
        })),
        totalCantidad: cantidadProductos,
        dias: dias,
    };

    try {
        const response = await fetch('http://localhost:8080/api/carrito/guardar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(carrito)
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Carrito guardado correctamente:", data);
            alert("¡Pedido realizado con éxito!");

            location.reload();
        } else {
            console.error("Error al guardar el carrito");
        }
    } catch (error) {
        console.error("Error de red:", error);
    }
}

// Evento para ejecutar el pedido al hacer clic en el botón "Pedir"
botonPedir.addEventListener('click', guardarCarrito);