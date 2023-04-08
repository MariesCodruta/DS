package energy.demo.services;

import energy.demo.dtos.AddDeviceDto;
import energy.demo.dtos.AddMeasurementDto;
import energy.demo.dtos.DeviceDetailsDto;
import energy.demo.dtos.DeviceDto;
import energy.demo.dtos.builder.DeviceBuilder;
import energy.demo.dtos.builder.MeasurementBuilder;
import energy.demo.entities.DeviceEntity;
import energy.demo.entities.Measurement;
import energy.demo.entities.UserEntity;
import energy.demo.repositories.DeviceRepository;
import energy.demo.repositories.MeasurementRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class DeviceService {
    @Autowired
    public DeviceRepository deviceRepository;
    @Autowired
    public MeasurementRepository measurementRepository;

    private static final Logger LOGGER = LoggerFactory.getLogger(DeviceService.class);


    public DeviceDetailsDto insert(DeviceDetailsDto deviceDetailsDto) {
        DeviceEntity device = DeviceBuilder.entity(deviceDetailsDto);
        device = deviceRepository.save(device);
        LOGGER.debug("Device with id {} was inserted in db", device.getIdDevice());
        return deviceDetailsDto;
    }

//    public Measurement addMeasurement(AddMeasurementDto addMeasurementDto) {
//        DeviceEntity device = deviceRepository.findById(addMeasurementDto.getIdDevice()).get();
////        System.out.println("device " + device);
//        MeasurementBuilder measurementBuilder = new MeasurementBuilder();
//        Measurement measurement = measurementBuilder.entity(addMeasurementDto.getMeasurementDetailsDto());
//        Measurement measurement1 = measurementRepository.save(measurement);
//        device.getMeasurement().add(measurement1);
//        deviceRepository.save(device);
//        return measurement1;
//    }
    public DeviceDetailsDto update(UUID id,DeviceDetailsDto deviceDetailsDto){
        Optional<DeviceEntity> device = deviceRepository.findById(id);
        if(device.isPresent()){
            DeviceEntity device1 = deviceRepository.findById(id).get();
            device1.setDescription(deviceDetailsDto.getDescription());
            device1.setLocation(deviceDetailsDto.getLocation());
            device1.setMaximEnergyConsumption(deviceDetailsDto.getMaximEnergyConsumption());
            deviceRepository.save(device1);
        }
        return deviceDetailsDto;
    }

    public List<DeviceDto> findAllDevices() {
        Iterable<DeviceEntity> deviceEntities = deviceRepository.findAll();
        List<DeviceDto> deviceDtos = new ArrayList<>();
        deviceEntities.forEach(device -> deviceDtos.add(DeviceBuilder.deviceDto(device)));
        return deviceDtos;
    }

    public DeviceDetailsDto findById(UUID id) {
        Optional<DeviceEntity> device = deviceRepository.findById(id);
     if (!device.isPresent()) {
            LOGGER.error("Device with id {} was not found in db", id);
          throw new ResourceNotFoundException(DeviceEntity.class.getSimpleName() + " with id: " + id);
        }
        return DeviceBuilder.deviceDetailsDto(device.get());
    }

    public void delete(UUID id){
        Optional<DeviceEntity> device = deviceRepository.findById(id);
        if(!device.isPresent())
        {
            LOGGER.error("Device doesn't exist", id);
            throw new ResourceNotFoundException(DeviceEntity.class.getSimpleName() + " with id: " + id + " doesn't exist");
        }
        deviceRepository.deleteById(id);
    }
}
