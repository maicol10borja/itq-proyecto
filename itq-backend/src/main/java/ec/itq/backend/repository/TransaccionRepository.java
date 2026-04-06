package ec.itq.backend.repository;
import ec.itq.backend.model.Transaccion;
import org.springframework.data.jpa.repository.JpaRepository;
public interface TransaccionRepository extends JpaRepository<Transaccion, Long> {}