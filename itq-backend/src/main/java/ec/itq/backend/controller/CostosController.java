package ec.itq.backend.controller;
import org.springframework.http.ResponseEntity; import org.springframework.web.bind.annotation.*;
import java.util.Map;
@RestController @RequestMapping("/api/costos")
public class CostosController {
    @PostMapping("/calcular-pvp") public ResponseEntity<?> calc(@RequestBody Map<String,Object> body) {
        int stockActual = Integer.parseInt(body.get("stockActual").toString());
        double costoAnterior = Double.parseDouble(body.get("costoAnterior").toString());
        double nuevoCosto = Double.parseDouble(body.get("nuevoCosto").toString());
        int cant = Integer.parseInt(body.get("cantidadNueva").toString());
        double mrgn = Double.parseDouble(body.get("margen").toString());
        
        double invTotal = (stockActual * costoAnterior) + (cant * nuevoCosto);
        int totalUds = stockActual + cant;
        double costoPromedio = invTotal / totalUds;
        double pvp = costoPromedio * (1 + (mrgn / 100));
        return ResponseEntity.ok(Map.of("pvp", pvp, "detalle", String.format("CP: %.2f | Stock final: %d", costoPromedio, totalUds)));
    }
}