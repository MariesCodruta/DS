package energy.demo.controllers;

import energy.demo.dtos.DeviceDetailsDto;
import energy.demo.dtos.DeviceDto;
import energy.demo.services.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@Controller
@RequestMapping("/device")
@CrossOrigin
public class DeviceController {

    @Autowired
    public DeviceService deviceService;

    @GetMapping
    public ResponseEntity<List<DeviceDto>> findAllDevices() {
        return new ResponseEntity<>(deviceService.findAllDevices(),HttpStatus.OK);
    }
    @GetMapping(value = "/{id}")
    public ResponseEntity<DeviceDetailsDto> getDevice(@PathVariable("id") UUID deviceId) {
        DeviceDetailsDto dto = deviceService.findById(deviceId);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        deviceService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping()
    public ResponseEntity<DeviceDetailsDto> insert(@Valid @RequestBody DeviceDetailsDto deviceDetailsDto) {
        deviceService.insert(deviceDetailsDto);
        return new ResponseEntity<>(deviceDetailsDto, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DeviceDetailsDto> update(@PathVariable UUID id, @RequestBody DeviceDetailsDto dto) {
        return new ResponseEntity<>(deviceService.update(id, dto),HttpStatus.NO_CONTENT);
    }

}
