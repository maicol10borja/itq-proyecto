import os

base_path = "c:/Users/Usuario/OneDrive/Desktop/Gestion/itq-backend/src/main/java/ec/itq/backend/model"

autor_java = """package ec.itq.backend.model;
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
"""

carrera_java = """package ec.itq.backend.model;
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
"""

estado_java = """package ec.itq.backend.model;
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
"""

obra_java = """package ec.itq.backend.model;
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
"""

with open(os.path.join(base_path, "Autor.java"), "w") as f: f.write(autor_java)
with open(os.path.join(base_path, "Carrera.java"), "w") as f: f.write(carrera_java)
with open(os.path.join(base_path, "EstadoObra.java"), "w") as f: f.write(estado_java)
with open(os.path.join(base_path, "Obra.java"), "w") as f: f.write(obra_java)

print("Entities created successfully!")
