package energy.demo.controllers;

import energy.demo.dtos.AddMeasurementDto;
import energy.demo.dtos.MeasurementDetailsDto;
import energy.demo.dtos.MeasurementDto;
import energy.demo.dtos.builder.MeasurementBuilder;
import energy.demo.entities.Measurement;
import energy.demo.services.MeasurementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@Controller
@RequestMapping("/measurement")
@CrossOrigin
public class MeasurementController {

    @Autowired
    public MeasurementService measurementService;

    @GetMapping
    public ResponseEntity<List<MeasurementDto>> findAllPersons() {
        return new ResponseEntity<>(measurementService.findAllMeasurements(), HttpStatus.OK);
    }
    @GetMapping(value = "/{id}")
    public ResponseEntity<MeasurementDetailsDto> getMeasure(@PathVariable("id") UUID userId) {
        MeasurementDetailsDto dto = measurementService.findById(userId);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        measurementService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/addMeasurement")
    public ResponseEntity<MeasurementDetailsDto> addMeasurement(@Valid @RequestBody AddMeasurementDto addMeasurementDto) {
        Measurement measurement = measurementService.addMeasurement(addMeasurementDto);
        MeasurementDetailsDto measurementDetailsDto = MeasurementBuilder.measurementDetailsDto(measurement);
        return new ResponseEntity<>(measurementDetailsDto, HttpStatus.CREATED);
    }

    @PostMapping()
    public ResponseEntity<MeasurementDetailsDto> insert(@Valid @RequestBody MeasurementDetailsDto measure) {
        measurementService.insert(measure);
        return new ResponseEntity<>(measure, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MeasurementDetailsDto> update(@PathVariable UUID id, @RequestBody MeasurementDetailsDto measure) {
        return new ResponseEntity<>(measurementService.update(id, measure),HttpStatus.OK);
    }
}
