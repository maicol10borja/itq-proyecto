package ec.itq.backend.model;
import jakarta.persistence.*;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "carreras")
public class Carrera {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCarrera;
    private String nombre;
    private String facultad;

    @OneToMany(mappedBy = "carrera")
    @JsonIgnore
    private List<Obra> obras;

    public Long getIdCarrera() { return idCarrera; }
    public void setIdCarrera(Long idCarrera) { this.idCarrera = idCarrera; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getFacultad() { return facultad; }
    public void setFacultad(String facultad) { this.facultad = facultad; }
    public List<Obra> getObras() { return obras; }
    public void setObras(List<Obra> obras) { this.obras = obras; }
}
