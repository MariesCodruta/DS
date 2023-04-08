package energy.demo.dtos;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.UUID;

@Getter
@Setter

public class MeasurementDetailsDto {

    private UUID id;
    private Date timestamp;
    private long energyConsumption;

    public MeasurementDetailsDto(UUID id, Date timestamp, long energyConsumption) {
        this.id = id;
        this.timestamp = timestamp;
        this.energyConsumption = energyConsumption;
    }
}
