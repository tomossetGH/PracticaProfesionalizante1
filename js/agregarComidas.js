document.getElementById('foodForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    const quantity = document.getElementById('quantity').value;
    const availability = document.getElementById('availability').value;
    const imageUrl = document.getElementById('image').value;

    // Crear la tarjeta de comida
    const foodCard = document.createElement('div');
    foodCard.classList.add('card');
    
    // Añadir la imagen
    const foodImage = document.createElement('img');
    foodImage.src = imageUrl;
    foodImage.alt = title;

    // Añadir el título
    const foodTitle = document.createElement('h3');
    foodTitle.textContent = title;

    // Añadir el precio
    const foodPrice = document.createElement('p');
    foodPrice.textContent = `Precio: $${price}`;

    // Añadir la cantidad
    const foodQuantity = document.createElement('p');
    foodQuantity.textContent = `Cantidad Disponible: ${quantity}`;

    // Añadir la disponibilidad en semanas
    const foodAvailability = document.createElement('p');
    foodAvailability.textContent = `Disponible en: ${availability} semanas`;

    // Agregar los elementos a la tarjeta
    foodCard.appendChild(foodImage);
    foodCard.appendChild(foodTitle);
    foodCard.appendChild(foodPrice);
    foodCard.appendChild(foodQuantity);
    foodCard.appendChild(foodAvailability);

    // Limpiar el formulario
    document.getElementById('foodForm').reset();
});