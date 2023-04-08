package energy.demo.dtos;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter

public class AddMeasurementDto {

    private MeasurementDetailsDto measurementDetailsDto;

    private UUID idDevice;


    public AddMeasurementDto(MeasurementDetailsDto measurementDetailsDto, UUID idDevice) {
        this.measurementDetailsDto = measurementDetailsDto;
        this.idDevice = idDevice;
    }
}
