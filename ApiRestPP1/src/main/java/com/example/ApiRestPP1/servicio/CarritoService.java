package com.example.pp1carrito.servicio;

import com.example.pp1carrito.modelo.Carrito;
import com.example.pp1carrito.modelo.Producto;
import com.example.pp1carrito.repositorio.CarritoRepository;
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
