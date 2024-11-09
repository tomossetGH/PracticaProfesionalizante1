package com.example.pp1carrito.repositorio;


import com.example.pp1carrito.modelo.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepository extends JpaRepository <Producto, Long>{
}
