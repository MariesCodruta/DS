package energy.demo.dtos.builder;

import energy.demo.dtos.DeviceDetailsDto;
import energy.demo.dtos.DeviceDto;
import energy.demo.dtos.MeasurementDetailsDto;
import energy.demo.dtos.MeasurementDto;
import energy.demo.entities.DeviceEntity;
import energy.demo.entities.Measurement;

public class MeasurementBuilder {

    static DeviceBuilder deviceBuilder = new DeviceBuilder();
    public static MeasurementDto measurementDto(Measurement measurementDetailsDto)
    {
        return new MeasurementDto(measurementDetailsDto.getIdMeasurement(),measurementDetailsDto.getTimestamp(),measurementDetailsDto.getEnergyConsumption());
    }

    public static MeasurementDetailsDto measurementDetailsDto(Measurement measurement)
    {
        return new MeasurementDetailsDto(measurement.getIdMeasurement(),measurement.getTimestamp(),measurement.getEnergyConsumption());
    }

    public static Measurement entity(MeasurementDetailsDto measurement){

        return new Measurement(measurement.getTimestamp(),measurement.getEnergyConsumption());
    }
}
