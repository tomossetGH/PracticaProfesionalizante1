const info = document.getElementById('info');
const btn_mispedidos = document.getElementById('info__mispedidos');
const mis_pedidos = document.getElementById('mis_pedidos');

btn_mispedidos.addEventListener('click', mostrarPedidos)

function mostrarPedidos() {
    info.style.display = 'none';
    mis_pedidos.style.display = 'block';
};

const btn_volver = document.getElementById('btn__volver');

btn_volver.addEventListener('click', volverAInfo);

function volverAInfo() {
    mis_pedidos.style.display = 'none';
    info.style.display = 'block';
}