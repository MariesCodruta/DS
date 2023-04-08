package energy.demo.dtos;

import lombok.Getter;
import lombok.Setter;
import org.springframework.hateoas.RepresentationModel;

import java.util.UUID;
@Getter
@Setter

public class DeviceDto extends RepresentationModel<DeviceDto> {

    private UUID idDevice;
    private String location;
    private String description;
    private long maximEnergyConsumption;

    public DeviceDto(UUID idDevice, String location, String description, long maximEnergyConsumption) {
        this.idDevice = idDevice;
        this.location = location;
        this.description = description;
        this.maximEnergyConsumption = maximEnergyConsumption;
    }
}
