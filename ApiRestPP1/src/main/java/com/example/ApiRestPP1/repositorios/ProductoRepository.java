package com.example.ApiRestPP1.repositorios;


import com.example.ApiRestPP1.modelos.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepository extends JpaRepository <Producto, Long>{
}
