package com.example.ApiRestPP1.controladores;

import com.example.ApiRestPP1.modelos.Carrito;
import com.example.ApiRestPP1.modelos.Producto;
import com.example.ApiRestPP1.servicio.CarritoService;
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
