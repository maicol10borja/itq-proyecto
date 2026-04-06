package ec.itq.backend.model;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "estados_obra")
public class EstadoObra {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idEstado;
    private String descripcion;
    private LocalDateTime fecha;

    @ManyToOne
    @JoinColumn(name = "id_obra")
    @JsonIgnore
    private Obra obra;

    public Long getIdEstado() { return idEstado; }
    public void setIdEstado(Long idEstado) { this.idEstado = idEstado; }
    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
    public LocalDateTime getFecha() { return fecha; }
    public void setFecha(LocalDateTime fecha) { this.fecha = fecha; }
    public Obra getObra() { return obra; }
    public void setObra(Obra obra) { this.obra = obra; }
}
