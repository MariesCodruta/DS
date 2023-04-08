package energy.demo.controllers;

import energy.demo.dtos.*;

import energy.demo.dtos.builder.UserBuilder;
import energy.demo.entities.UserEntity;
import energy.demo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@Controller
@RequestMapping("/user")
@CrossOrigin
public class UserController {

    @Autowired
    public UserService userService;

    @GetMapping
   public ResponseEntity<List<UserDto>> findAllPersons() {
       return new ResponseEntity<>(userService.findAllPersons(),HttpStatus.OK);
   }
    @GetMapping(value = "/{id}")
    public ResponseEntity<UserDetailsDto> getPerson(@PathVariable("id") UUID userId) {
        UserDetailsDto dto = userService.findById(userId);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping()
    public ResponseEntity<UserDetailsDto> insert(@Valid @RequestBody UserDetailsDto userDetailsDto) {
        userService.insert(userDetailsDto);
        return new ResponseEntity<>(userDetailsDto, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDetailsDto> update(@PathVariable UUID id, @RequestBody UserDetailsDto user) {
        return new ResponseEntity<>(userService.update(id, user),HttpStatus.OK);
    }
    @PostMapping("/addDevice")
    public ResponseEntity<UserDetailsDto> addDevice(@Valid @RequestBody AddDeviceDto addDeviceDto) {
        UserEntity user = userService.addDevice(addDeviceDto);
        UserDetailsDto userDetailsDto = UserBuilder.userDetailsDto(user);
       return new ResponseEntity<>(userDetailsDto, HttpStatus.CREATED);
    }
}