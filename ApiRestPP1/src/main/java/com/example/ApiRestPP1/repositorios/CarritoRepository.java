package com.example.pp1carrito.repositorio;

import com.example.pp1carrito.modelo.Carrito;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarritoRepository extends JpaRepository<Carrito, Long> {
}
