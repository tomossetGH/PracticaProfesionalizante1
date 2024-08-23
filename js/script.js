const botonesSemana = document.querySelectorAll('.boton--semana');
const menusSemanas = document.querySelectorAll('.semana');

botonesSemana.forEach(boton => {
  boton.addEventListener('click', (event) => {
    event.preventDefault(); // Evita el comportamiento por defecto del enlace (si es un enlace)

    // Oculta todos los menús
    menusSemanas.forEach(semana => {
      semana.style.display = 'none';
    });

    // Obtiene el ID de la semana seleccionada
    const idSemana = event.target.dataset.semana;

    // Obtiene la sección de la semana seleccionada y la muestra
    const semanaSeleccionada = document.getElementById(idSemana);
    semanaSeleccionada.style.display = 'block';

    // Desplaza suavemente a la sección seleccionada
    semanaSeleccionada.scrollIntoView({ behavior: 'smooth' });
  });
});