package com.example.ApiRestPP1.controladores;

//import java.net.ResponseCache;
import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.ApiRestPP1.modelos.Usuario;
import com.example.ApiRestPP1.repositorios.UsuarioRepository;

@RestController
public class UsuarioController {
	
	UsuarioRepository repositorio;
	
	public UsuarioController(UsuarioRepository repositorio) {
		this.repositorio = repositorio;
	}

	@GetMapping("/api/crearUsuarios")
	public void crearUsuarios() {
		Usuario usuario1 = new Usuario("Emanuel", "1234");
		Usuario usuario2 = new Usuario("Tobias", "contraseña");
		
		repositorio.save(usuario1);
		repositorio.save(usuario2);
		
	}
	
	@GetMapping("/api/usuarios")
	public List<Usuario> obtenerUsuarios () {
		return repositorio.findAll();
	}
	
	@GetMapping("/api/usuario/{id}")
	public ResponseEntity <Usuario> obtenerUsuario(@PathVariable Long id) {
		Optional <Usuario> opt = repositorio.findById(id);
		
		if (opt.isEmpty()) {
			return ResponseEntity.badRequest().build();
		}
		else  {
			return ResponseEntity.ok(opt.get());
		}
	}
	
	@CrossOrigin("http://127.0.0.1:5500")
	@PostMapping("/api/usuarios")
	public ResponseEntity<Usuario> guardarUsuario(@RequestBody Usuario usuario) {
	    if (usuario.getNombre() == null || usuario.getContraseña() == null) { 
	        return ResponseEntity.badRequest().build();
	    }

	    repositorio.save(usuario);
	    return ResponseEntity.ok(usuario);
	}
	
	@CrossOrigin("http://127.0.0.1:5500")
	@PostMapping("/api/login")
	public ResponseEntity<String> verificarCredenciales(@RequestBody Usuario usuario) {
	    System.out.println("Nombre recibido: " + usuario.getNombre());
	    System.out.println("Contraseña recibida: " + usuario.getContraseña());

	    Optional<Usuario> opt = repositorio.findByNombreAndContraseña(usuario.getNombre(), usuario.getContraseña());

	    if (opt.isPresent()) {
	        System.out.println("Usuario encontrado: " + opt.get().getNombre());
	        return ResponseEntity.ok("Inicio de sesión exitoso");
	    } else {
	        System.out.println("Credenciales incorrectas");
	        return ResponseEntity.status(401).body("Credenciales incorrectas");
	    }
	}
}
