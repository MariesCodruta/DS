package energy.demo.dtos;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter

public class DeviceDetailsDto {

    private UUID idDevice;

    private String location;

    private String description;

    private long maximEnergyConsumption;

    public DeviceDetailsDto(UUID idDevice, String location, String description, long maximEnergyConsumption) {
        this.idDevice = idDevice;
        this.location = location;
        this.description = description;
        this.maximEnergyConsumption = maximEnergyConsumption;
    }
}
