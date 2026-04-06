package ec.itq.backend.repository;
import ec.itq.backend.model.Obra;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
public interface ObraRepository extends JpaRepository<Obra, Long> { 
    List<Obra> findByCarrera_Nombre(String nombre); 
    Optional<Obra> findByIsbn(String isbn);
}