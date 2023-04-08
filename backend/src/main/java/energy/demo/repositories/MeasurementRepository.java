package energy.demo.repositories;

import energy.demo.entities.Measurement;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface MeasurementRepository extends CrudRepository<Measurement, UUID> {
}
