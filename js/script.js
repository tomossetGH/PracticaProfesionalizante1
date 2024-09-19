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
            menu.style.display = 'block'; // Muestra cada uno de los menús
        });

        // Desplaza suavemente al primer menú de la lista
        menus[0].scrollIntoView({ behavior: 'smooth' });
    }
}

const shoppingCartIcon = document.querySelector('.carrito');
const productListContainer = document.querySelector('.listaCarrito');

shoppingCartIcon.addEventListener('click', () => {
  productListContainer.style.display = productListContainer.style.display === 'none' ? 'block' :'none';
});


//===================================
const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');

// Lista de todos los contenedores de productos
const productsList = document.querySelector('.container-items');

// Variable de arreglos de Productos
let allProducts = [];

const valorTotal = document.querySelector('.total-pagar');

const countProducts = document.querySelector('#contador-productos');

const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');

var contadorComida=0;

//e representa el evento que se dispara cuando hacemos click sobre porductsList
productsList.addEventListener('click', e => {

	//e.target: Representa el elemento HTML exacto en el que se hizo clic. Es decir, es el origen del evento.
	//classList.contains('btn-add-cart') Verifica si el elemento en el que se hizo clic (e.target) contiene la clase CSS llamada btn-add-cart
	if (e.target.classList.contains('btn-add-cart')) {
		//parentElement: Este método obtiene el elemento padre inmediato del e.target que vendria a ser el div con la clase (col-md-3  card)
		const product = e.target.parentElement;

		const infoProduct = {
			quantity: 1,
			title: product.querySelector('h1').textContent,
			price: product.querySelector('p').textContent,
		};

		contadorComida++;

		//Si hay mas de dos platos de comida se cancela la funcion
		if(contadorComida>2) {
			return;
		}

		// .some(): Es un método de los arrays en JavaScript que recorre todos los elementos del array y verifica si al menos uno de ellos cumple con una condición. Retorna true si encuentra un elemento que cumpla la condición, y false si no encuentra ninguno.
		const existe = allProducts.some(function(product) {
			return product.title === infoProduct.title;
		});

		if (existe) {
			// .map() crea un nuevo array products basado en el array original allProducts. La función que se pasa a .map() se ejecuta para cada elemento en allProducts
			const products = allProducts.map(function(product) {
				if (product.title === infoProduct.title) {
					product.quantity++;
					return product;
				} else {
					return product;
				}
			});
			allProducts = [...products];
		} else {

			// allProducts = [...allProducts, infoProduct]: Utiliza el operador de propagación (...) para crear un nuevo array que incluye todos los elementos del array original allProducts más el nuevo infoProduct. Esto añade el nuevo producto al final del array.
			allProducts = [...allProducts, infoProduct];
		}
		
		// showHTML(): Se llama a esta función para actualizar la interfaz de usuario con los cambios en el array allProducts
		showHTML();
}});

rowProduct.addEventListener('click', e => {
	if (e.target.classList.contains('icon-close')) {
		const product = e.target.parentElement;
		const title = product.querySelector('p').textContent;

		allProducts = allProducts.filter(
			product => product.title !== title
		);

		console.log(allProducts);

		showHTML();
	}
});

// Funcion para mostrar  HTML
const showHTML = () => {
	if (!allProducts.length) {
		cartEmpty.classList.remove('hidden');
		rowProduct.classList.add('hidden');
		cartTotal.classList.add('hidden');
	} else {
		cartEmpty.classList.add('hidden');
		rowProduct.classList.remove('hidden');
		cartTotal.classList.remove('hidden');
	}

	// Limpiar HTML
	rowProduct.innerHTML = '';

	let total = 0;
	let totalOfProducts = 0;

	allProducts.forEach(product => {
		const containerProduct = document.createElement('div');
		containerProduct.classList.add('cart-product');

		containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="icon-close"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        `;

		rowProduct.append(containerProduct);

		total =
			total + parseInt(product.quantity * product.price.slice(1));
		totalOfProducts = totalOfProducts + product.quantity;
	});

	valorTotal.innerText = `$${total}`;
	countProducts.innerText = totalOfProducts;
};
