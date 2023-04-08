package energy.demo.dtos;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class AddDeviceDto {
    private DeviceDetailsDto deviceDetailsDto;
    private UUID idUser;

    public AddDeviceDto(DeviceDetailsDto deviceDetailsDto, UUID idUser) {
        this.deviceDetailsDto = deviceDetailsDto;
        this.idUser = idUser;
    }
}
