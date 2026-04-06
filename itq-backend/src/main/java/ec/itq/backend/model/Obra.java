package ec.itq.backend.model;
import jakarta.persistence.*;
import java.util.List;
import java.util.ArrayList;

@Entity
@Table(name = "obras")
public class Obra {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idObra;
    private String titulo;
    private String genero;
    private Integer anioPublicacion;
    private String isbn;
    private Double precio;
    private Integer stock;
    
    // Virtual attribute for frontend backwards compatibility
    private String estadoActual;

    @ManyToOne
    @JoinColumn(name = "id_carrera")
    private Carrera carrera;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "obras_autores",
        joinColumns = @JoinColumn(name = "id_obra"),
        inverseJoinColumns = @JoinColumn(name = "id_autor")
    )
    private List<Autor> autores = new ArrayList<>();

    @OneToMany(mappedBy = "obra", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<EstadoObra> historialEstados = new ArrayList<>();

    // GETTERS & SETTERS
    public Long getIdObra() { return idObra; }
    public void setIdObra(Long idObra) { this.idObra = idObra; }
    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }
    public String getGenero() { return genero; }
    public void setGenero(String genero) { this.genero = genero; }
    public Integer getAnioPublicacion() { return anioPublicacion; }
    public void setAnioPublicacion(Integer anioPublicacion) { this.anioPublicacion = anioPublicacion; }
    public String getIsbn() { return isbn; }
    public void setIsbn(String isbn) { this.isbn = isbn; }
    public Double getPrecio() { return precio; }
    public void setPrecio(Double precio) { this.precio = precio; }
    public Integer getStock() { return stock; }
    public void setStock(Integer stock) { this.stock = stock; }
    
    public Carrera getCarrera() { return carrera; }
    public void setCarrera(Carrera carrera) { this.carrera = carrera; }
    public List<Autor> getAutores() { return autores; }
    public void setAutores(List<Autor> autores) { this.autores = autores; }
    public List<EstadoObra> getHistorialEstados() { return historialEstados; }
    public void setHistorialEstados(List<EstadoObra> historialEstados) { this.historialEstados = historialEstados; }

    public String getEstadoActual() { return estadoActual; }
    public void setEstadoActual(String estadoActual) { this.estadoActual = estadoActual; }
    
    // For backwards compatibility and API formatting
    public String getCarreraRelacionada() {
        return carrera != null ? carrera.getNombre() : "Desconocida";
    }
    public String getAutor() {
        if(autores == null || autores.isEmpty()) return "Anonimo";
        return autores.get(0).getNombre();
    }
}
