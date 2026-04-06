package ec.itq.backend.controller;
import ec.itq.backend.model.Obra; import ec.itq.backend.repository.ObraRepository;
import org.springframework.beans.factory.annotation.Autowired; import org.springframework.web.bind.annotation.*;
import java.util.List; import java.util.Map;
@RestController @RequestMapping("/api/obras")
public class ObraController {
    @Autowired private ObraRepository repo;
    @GetMapping public List<Obra> list(@RequestParam(required=false) String carrera) {
        if(carrera!=null && !carrera.isEmpty()) return repo.findByCarrera_Nombre(carrera);
        return repo.findAll();
    }
    @PatchMapping("/{id}/estado") public Obra cambiarEstado(@PathVariable Long id, @RequestBody Map<String,String> body) {
        var o = repo.findById(id).get(); 
        o.setEstadoActual(body.get("estado")); 
        
        // Registrar historial
        var estado = new ec.itq.backend.model.EstadoObra();
        estado.setDescripcion(body.get("estado"));
        estado.setFecha(java.time.LocalDateTime.now());
        estado.setObra(o);
        o.getHistorialEstados().add(estado);
        
        return repo.save(o);
    }
    @GetMapping("/isbn/{isbn}") public org.springframework.http.ResponseEntity<?> findByIsbn(@PathVariable String isbn) {
        var o = repo.findByIsbn(isbn);
        return o.isPresent() ? org.springframework.http.ResponseEntity.ok(o.get()) : org.springframework.http.ResponseEntity.notFound().build();
    }
}