package energy.demo.dtos;

import lombok.Getter;
import lombok.Setter;
import org.springframework.hateoas.RepresentationModel;

import java.util.Date;
import java.util.UUID;

@Getter
@Setter
public class MeasurementDto extends RepresentationModel<MeasurementDto> {

    private UUID id;
    private Date timestamp;
    private long energyConsumption;

    public MeasurementDto(UUID id, Date timestamp, long energyConsumption) {
        this.id = id;
        this.timestamp = timestamp;
        this.energyConsumption = energyConsumption;
    }
}
