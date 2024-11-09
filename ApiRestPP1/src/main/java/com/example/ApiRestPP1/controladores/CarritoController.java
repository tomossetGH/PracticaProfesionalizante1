package com.example.pp1carrito.controlador;

import com.example.pp1carrito.modelo.Carrito;
import com.example.pp1carrito.modelo.Producto;
import com.example.pp1carrito.servicio.CarritoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/carrito")
public class CarritoController {
    @Autowired
    private CarritoService carritoService;

    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @PostMapping("/guardar")
    public ResponseEntity<Carrito> guardarCarrito(@RequestBody Carrito carrito) {
        Carrito carritoGuardado = carritoService.guardarCarrito(carrito);
        return ResponseEntity.ok(carritoGuardado);
    }

    @PostMapping("/{carritoId}/agregar")
    public ResponseEntity<Carrito> agregarProducto(@PathVariable Long carritoId, @RequestBody Producto producto) {
        Carrito carritoActualizado = carritoService.agregarProducto(carritoId, producto);
        return ResponseEntity.ok(carritoActualizado);
    }
}
