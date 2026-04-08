package ec.itq.backend.controller;
import ec.itq.backend.model.Transaccion; import ec.itq.backend.repository.TransaccionRepository; import ec.itq.backend.repository.ObraRepository;
import org.springframework.beans.factory.annotation.Autowired; import org.springframework.http.ResponseEntity; import org.springframework.web.bind.annotation.*;
import java.util.Date; import java.util.List; import java.util.Map;
@RestController @RequestMapping("/api/inventario")
public class InventarioController {
    @Autowired private TransaccionRepository repo; @Autowired private ObraRepository obraRepo;
    @GetMapping("/transacciones") public List<Transaccion> list() { return repo.findAll(); }
    @PostMapping("/compra") public ResponseEntity<?> compra(@RequestBody Map<String,Object> body) { return processTransaccion(body, "Compra"); }
    @PostMapping("/venta") public ResponseEntity<?> venta(@RequestBody Map<String,Object> body) { return processTransaccion(body, "Venta"); }
    private ResponseEntity<?> processTransaccion(Map<String,Object> body, String tipo) {
        try {
            if(!body.containsKey("idObra") || body.get("idObra")==null) throw new Exception("Falta idObra");
            if(!body.containsKey("cantidad") || body.get("cantidad")==null) throw new Exception("Falta cantidad");
            if(!body.containsKey("idUsuario") || body.get("idUsuario")==null) throw new Exception("Fidelidad de sesión perdida (Falta idUsuario). Por favor, cierre sesión y vuelva a entrar.");
            
            String reqCosto = tipo.equals("Compra") ? "costo" : "pvp";
            if(!body.containsKey(reqCosto) || body.get(reqCosto)==null) throw new Exception("Falta monto (" + reqCosto + ")");

            Long idObra = Long.parseLong(body.get("idObra").toString());
            var obraOpt = obraRepo.findById(idObra);
            if(!obraOpt.isPresent()) throw new Exception("Obra no encontrada");
            var obra = obraOpt.get();
            
            int cant = Integer.parseInt(body.get("cantidad").toString());
            if(tipo.equals("Venta") && obra.getStock() < cant) return ResponseEntity.status(400).body(Map.of("error","Stock insuficiente"));
            obra.setStock(tipo.equals("Compra") ? obra.getStock()+cant : obra.getStock()-cant);
            obraRepo.save(obra);
            var t = new Transaccion(); t.setIdObra(idObra); t.setIdUsuario(Long.parseLong(body.get("idUsuario").toString()));
            t.setTipo(tipo); t.setCantidad(cant); t.setPrecioUnitario(Double.parseDouble(body.get(reqCosto).toString()));
            t.setFecha(new Date()); repo.save(t); return ResponseEntity.ok(Map.of("msg", "Ok"));
        } catch(Exception e) { return ResponseEntity.status(400).body(Map.of("error", e.getMessage())); }
    }
}