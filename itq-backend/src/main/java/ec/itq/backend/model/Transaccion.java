package ec.itq.backend.model;
import jakarta.persistence.*;
import java.util.Date;
@Entity @Table(name="transacciones_inventario")
public class Transaccion {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) @Column(name="id_transaccion") private Long idTransaccion;
    @Column(name="id_obra") private Long idObra; @Column(name="id_usuario") private Long idUsuario;
    private String tipo; private Integer cantidad; private Double precioUnitario; private Date fecha;
    public Long getIdTransaccion() { return idTransaccion; } public void setIdTransaccion(Long id) { this.idTransaccion = id; }
    public Long getIdObra() { return idObra; } public void setIdObra(Long id) { this.idObra = id; }
    public Long getIdUsuario() { return idUsuario; } public void setIdUsuario(Long id) { this.idUsuario = id; }
    public String getTipo() { return tipo; } public void setTipo(String tipo) { this.tipo = tipo; }
    public Integer getCantidad() { return cantidad; } public void setCantidad(Integer c) { this.cantidad = c; }
    public Double getPrecioUnitario() { return precioUnitario; } public void setPrecioUnitario(Double p) { this.precioUnitario = p; }
    public Date getFecha() { return fecha; } public void setFecha(Date f) { this.fecha = f; }
}