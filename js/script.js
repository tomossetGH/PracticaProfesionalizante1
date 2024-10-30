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



//===================================
// const cartInfo = document.querySelector('.cart-product');
// const rowProduct = document.querySelector('.row-product');

// // Lista de todos los contenedores de productos
// const productsList = document.querySelector('.container-items');

// // Variable de arreglos de Productos
// let allProducts = [];

// const countProducts = document.querySelector('#contador-productos');

// const cartEmpty = document.querySelector('.cart-empty');

// var contadorComida=0;

// //e representa el evento que se dispara cuando hacemos click sobre porductsList
// productsList.addEventListener('click', e => {

// 	//e.target: Representa el elemento HTML exacto en el que se hizo clic. Es decir, es el origen del evento.
// 	//classList.contains('producto__btn') Verifica si el elemento en el que se hizo clic (e.target) contiene la clase CSS llamada producto__btn
// 	if (e.target.classList.contains('producto__btn')) {
// 		//parentElement: Este método obtiene el elemento padre inmediato del e.target que vendria a ser el div con la clase (col-md-3  card)
// 		const product = e.target.parentElement;

// 		const infoProduct = {
// 			quantity: 1,
// 			title: product.querySelector('h1').textContent,
// 		};

// 		contadorComida++;

// 		//Si hay mas de dos platos de comida se cancela la funcion
// 		if(contadorComida>2) {
// 			return;
// 		}

// 		// .some(): Es un método de los arrays en JavaScript que recorre todos los elementos del array y verifica si al menos uno de ellos cumple con una condición. Retorna true si encuentra un elemento que cumpla la condición, y false si no encuentra ninguno.
// 		const existe = allProducts.some(function(product) {
// 			return product.title === infoProduct.title;
// 		});

// 		if (existe) {
// 			// .map() crea un nuevo array products basado en el array original allProducts. La función que se pasa a .map() se ejecuta para cada elemento en allProducts
// 			const products = allProducts.map(function(product) {
// 				if (product.title === infoProduct.title) {
// 					product.quantity++;
// 					return product;
// 				} else {
// 					return product;
// 				}
// 			});
// 			allProducts = [...products];
// 		} else {

// 			// allProducts = [...allProducts, infoProduct]: Utiliza el operador de propagación (...) para crear un nuevo array que incluye todos los elementos del array original allProducts más el nuevo infoProduct. Esto añade el nuevo producto al final del array.
// 			allProducts = [...allProducts, infoProduct];
// 		}
		
// 		// showHTML(): Se llama a esta función para actualizar la interfaz de usuario con los cambios en el array allProducts
// 		showHTML();
// }});

// rowProduct.addEventListener('click', e => {
// 	if (e.target.classList.contains('icon-close')) {
// 		contadorComida=0;
// 		const product = e.target.parentElement;
// 		const title = product.querySelector('p').textContent;

// 		allProducts = allProducts.filter(
// 			product => product.title !== title
// 		);

// 		console.log(allProducts);

// 		showHTML();
// 	}
// });

// // Funcion para mostrar  HTML
// const showHTML = () => {
// 	if (!allProducts.length) {
// 		cartEmpty.classList.remove('hidden');
// 		rowProduct.classList.add('hidden');
// 	} else {
// 		cartEmpty.classList.add('hidden');
// 		rowProduct.classList.remove('hidden');
// 	}

// 	// Limpiar HTML
// 	rowProduct.innerHTML = '';

// 	let totalOfProducts = 0;

// 	allProducts.forEach(product => {
// 		const containerProduct = document.createElement('div');
// 		containerProduct.classList.add('cart-product');

// 		containerProduct.innerHTML = `
//             <div class="info-cart-product">
//                 <span class="cantidad-producto-carrito">${product.quantity}</span>
//                 <p class="titulo-producto-carrito">${product.title}</p>
//             </div>
//             <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke-width="1.5"
//                 stroke="currentColor"
//                 class="icon-close"
//             >
//                 <path
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                     d="M6 18L18 6M6 6l12 12"
//                 />
//             </svg>
//         `;

// 		rowProduct.append(containerProduct);

// 		totalOfProducts = totalOfProducts + product.quantity;
// 	});

// 	countProducts.innerText = totalOfProducts;
// };
