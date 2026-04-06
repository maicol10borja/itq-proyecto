package ec.itq.backend.controller;
import org.springframework.http.ResponseEntity; import org.springframework.web.bind.annotation.*;
import java.util.Map;
@RestController @RequestMapping("/api/validacion")
public class ValidacionController {
    @GetMapping("/isbn") public ResponseEntity<?> isbn(@RequestParam String codigo) {
        String c = codigo.replace("-","").replace(" ","");
        if(c.length()!=13 || !c.matches("\\d{13}")) return ResponseEntity.ok(Map.of("valido",false,"mensaje","ISBN debe tener 13 dígitos numéricos"));
        int sum=0; for(int i=0; i<12; i++) { sum += (c.charAt(i)-'0') * (i%2==0?1:3); }
        int check = 10 - (sum%10); if(check==10) check=0;
        boolean v = check == (c.charAt(12)-'0');
        return ResponseEntity.ok(Map.of("valido",v, "mensaje", v?"ISBN Válido":"Dígito de control inválido"));
    }
    @PostMapping("/apa") public ResponseEntity<?> apa(@RequestBody Map<String,String> b) {
        String apaStr = String.format("%s. (%s). %s. %s.", b.get("autor"), b.get("anio"), b.get("titulo"), b.get("editorial"));
        return ResponseEntity.ok(Map.of("valido",true, "mensaje","Cita estructurada correctamente", "cita", apaStr));
    }
}