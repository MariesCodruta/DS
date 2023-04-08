package energy.demo.dtos.builder;

import energy.demo.dtos.DeviceDetailsDto;
import energy.demo.dtos.DeviceDto;
import energy.demo.entities.DeviceEntity;
import energy.demo.entities.UserEntity;

public class DeviceBuilder {
    public static DeviceDto deviceDto(DeviceEntity device)
    {
        return new DeviceDto(device.getIdDevice(),device.getLocation(),device.getDescription(),device.getMaximEnergyConsumption());
    }

    public static DeviceDetailsDto deviceDetailsDto(DeviceEntity device)
    {
            return new DeviceDetailsDto(device.getIdDevice(),device.getLocation(),device.getDescription(),device.getMaximEnergyConsumption());
    }

    public static DeviceEntity entity(DeviceDetailsDto deviceDetailsDto){
        return new DeviceEntity(deviceDetailsDto.getLocation(),deviceDetailsDto.getDescription(),deviceDetailsDto.getMaximEnergyConsumption());
    }
}
