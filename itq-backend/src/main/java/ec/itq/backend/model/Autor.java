package ec.itq.backend.model;
import jakarta.persistence.*;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "autores")
public class Autor {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAutor;
    private String nombre;
    private String nacionalidad;

    @ManyToMany(mappedBy = "autores")
    @JsonIgnore
    private List<Obra> obras;

    public Long getIdAutor() { return idAutor; }
    public void setIdAutor(Long idAutor) { this.idAutor = idAutor; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getNacionalidad() { return nacionalidad; }
    public void setNacionalidad(String nacionalidad) { this.nacionalidad = nacionalidad; }
    public List<Obra> getObras() { return obras; }
    public void setObras(List<Obra> obras) { this.obras = obras; }
}
