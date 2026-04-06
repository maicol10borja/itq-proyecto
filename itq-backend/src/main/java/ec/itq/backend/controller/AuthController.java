package ec.itq.backend.controller;
import ec.itq.backend.dto.*; import ec.itq.backend.model.Usuario; import ec.itq.backend.repository.UsuarioRepository; import ec.itq.backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired; import org.springframework.http.ResponseEntity; import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder; import org.springframework.web.bind.annotation.*;
import java.util.Map;
@RestController @RequestMapping("/api/auth")
public class AuthController {
    @Autowired private UsuarioRepository repo; @Autowired private JwtUtil jwt; @Autowired private BCryptPasswordEncoder encoder;
    @PostMapping("/login") public ResponseEntity<?> login(@RequestBody AuthRequest req) {
        var user = repo.findByEmail(req.email);
        if(user.isPresent() && (encoder.matches(req.password, user.get().getPassword()) || req.password.equals(user.get().getPassword()))) {
            var res = new AuthResponse(); res.id = user.get().getIdUsuario(); res.nombre = user.get().getNombre();
            res.rol = user.get().getRol(); res.token = jwt.generateToken(req.email, res.rol); return ResponseEntity.ok(res);
        }
        return ResponseEntity.status(401).body(Map.of("error", "Credenciales incorrectas"));
    }
    
    @GetMapping("/usuarios") public java.util.List<Usuario> listar() {
        return repo.findAll();
    }
    
    @PostMapping("/usuarios") public Usuario crearUsuario(@RequestBody Usuario u) {
        u.setPassword(encoder.encode(u.getPassword())); // Encriptar
        return repo.save(u);
    }
}