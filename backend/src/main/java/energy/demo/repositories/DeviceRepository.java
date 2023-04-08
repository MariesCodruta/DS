package energy.demo.repositories;

import energy.demo.entities.DeviceEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface DeviceRepository extends CrudRepository<DeviceEntity, UUID> {
}
