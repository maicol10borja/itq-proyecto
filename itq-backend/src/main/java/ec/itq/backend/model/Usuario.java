package ec.itq.backend.model;
import jakarta.persistence.*;
@Entity @Table(name="usuarios")
public class Usuario {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) @Column(name="id_usuario") private Long idUsuario;
    private String nombre; private String email; private String password; private String rol;
    public Long getIdUsuario() { return idUsuario; } public void setIdUsuario(Long idUsuario) { this.idUsuario = idUsuario; }
    public String getNombre() { return nombre; } public void setNombre(String nombre) { this.nombre = nombre; }
    public String getEmail() { return email; } public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; } public void setPassword(String password) { this.password = password; }
    public String getRol() { return rol; } public void setRol(String rol) { this.rol = rol; }
}