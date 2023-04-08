package energy.demo.services;

import energy.demo.dtos.AddMeasurementDto;
import energy.demo.dtos.MeasurementDetailsDto;
import energy.demo.dtos.MeasurementDto;
import energy.demo.dtos.builder.DeviceBuilder;
import energy.demo.dtos.builder.MeasurementBuilder;
import energy.demo.entities.DeviceEntity;
import energy.demo.entities.Measurement;
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
public class MeasurementService {
    @Autowired

    public MeasurementRepository measurementRepository;

    @Autowired
    public DeviceRepository deviceRepository;
    private static final Logger LOGGER = LoggerFactory.getLogger(MeasurementService.class);

    public MeasurementDetailsDto insert(MeasurementDetailsDto measurementDetailsDto) {
        Measurement measurement = MeasurementBuilder.entity(measurementDetailsDto);
        measurement = measurementRepository.save(measurement);
        LOGGER.debug("Measurement with id {} was inserted in db", measurement.getIdMeasurement());
        return measurementDetailsDto;
    }

    public Measurement addMeasurement(AddMeasurementDto addMeasurementDto) {
        DeviceEntity device = deviceRepository.findById(addMeasurementDto.getIdDevice()).get();
//        System.out.println("device " + device);
        MeasurementBuilder measurementBuilder = new MeasurementBuilder();
        Measurement measurement = measurementBuilder.entity(addMeasurementDto.getMeasurementDetailsDto());
        Measurement measurement1 = measurementRepository.save(measurement);
        device.getMeasurement().add(measurement1);
        deviceRepository.save(device);
        return measurement1;
    }

    public MeasurementDetailsDto update(UUID id, MeasurementDetailsDto measurementDetailsDto){
        Optional<Measurement> measurement = measurementRepository.findById(id);
        if(measurement.isPresent()){
            Measurement measurement1 = measurementRepository.findById(id).get();
            measurement1.setTimestamp(measurementDetailsDto.getTimestamp());
            measurement1.setEnergyConsumption(measurementDetailsDto.getEnergyConsumption());
            measurementRepository.save(measurement1);
        }
        return measurementDetailsDto;
    }

    public List<MeasurementDto> findAllMeasurements() {
        Iterable<Measurement> measurements = measurementRepository.findAll();
        List<MeasurementDto> measurementDtos = new ArrayList<>();
        measurements.forEach(measurement -> measurementDtos.add(MeasurementBuilder.measurementDto(measurement)));
        return measurementDtos;
    }

    public MeasurementDetailsDto findById(UUID id) {
        Optional<Measurement> measurement = measurementRepository.findById(id);
        if (!measurement.isPresent()) {
            LOGGER.error("Measurement with id {} was not found in db", id);
            throw new ResourceNotFoundException(DeviceEntity.class.getSimpleName() + " with id: " + id);
        }
        return MeasurementBuilder.measurementDetailsDto(measurement.get());
    }

    public void delete(UUID id){
        Optional<Measurement> measurement = measurementRepository.findById(id);
        if(!measurement.isPresent())
        {
            LOGGER.error("Measurement doesn't exist", id);
            throw new ResourceNotFoundException(DeviceEntity.class.getSimpleName() + " with id: " + id + " doesn't exist");
        }
        measurementRepository.deleteById(id);
    }
}
