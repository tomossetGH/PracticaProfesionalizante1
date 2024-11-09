package com.example.ApiRestPP1.servicio;

import com.example.ApiRestPP1.modelos.Carrito;
import com.example.ApiRestPP1.modelos.Producto;
import com.example.ApiRestPP1.repositorios.CarritoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CarritoService {
    @Autowired
    private CarritoRepository carritoRepository;

    public Carrito guardarCarrito(Carrito carrito) {
        return carritoRepository.save(carrito);
    }

    public Carrito agregarProducto(Long carritoId, Producto producto) {
        Carrito carrito = carritoRepository.findById(carritoId).orElse(new Carrito());
        carrito.getProductos().add(producto);
        carrito.setTotalCantidad(carrito.getTotalCantidad() + producto.getCantidad());
        return carritoRepository.save(carrito);
    }
}
