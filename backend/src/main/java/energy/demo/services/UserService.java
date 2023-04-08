package energy.demo.services;

import energy.demo.dtos.*;
import energy.demo.dtos.builder.DeviceBuilder;
import energy.demo.dtos.builder.UserBuilder;
import energy.demo.entities.DeviceEntity;
import energy.demo.entities.UserEntity;
import energy.demo.repositories.DeviceRepository;
import energy.demo.repositories.UserRepository;
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
public class UserService{
     @Autowired
    public UserRepository userRepository;
     @Autowired
     public DeviceRepository deviceRepository;

    private static final Logger LOGGER = LoggerFactory.getLogger(UserService.class);
    public UserDetailsDto insert(UserDetailsDto userDetailsDto) {
        UserEntity user = UserBuilder.entity(userDetailsDto);
        user = userRepository.save(user);
        LOGGER.debug("User with id {} was inserted in db", user.getIdUser());
        return userDetailsDto;
    }

    public UserDetailsDto update(UUID id,UserDetailsDto userDetailsDto){
       Optional<UserEntity> user = userRepository.findById(id);
       if(user.isPresent()){
           UserEntity user1 = userRepository.findById(id).get();
           user1.setName(userDetailsDto.getName());
           user1.setPassword(userDetailsDto.getPassword());
           user1.setUsername(userDetailsDto.getUsername());
           user1.setRole(userDetailsDto.getRole());
           userRepository.save(user1);
       }
       return userDetailsDto;
    }

    public List<UserDto> findAllPersons() {
        Iterable<UserEntity> userEntities = userRepository.findAll();
        List<UserDto> userDtos = new ArrayList<>();
        userEntities.forEach(user -> userDtos.add(UserBuilder.userDto(user)));
        return userDtos;
    }
    public UserDetailsDto findById(UUID id) {
        Optional<UserEntity> user = userRepository.findById(id);
        if (!user.isPresent()) {
            LOGGER.error("Person with id {} was not found in db", id);
            throw new ResourceNotFoundException(UserEntity.class.getSimpleName() + " with id: " + id);
        }
        return UserBuilder.userDetailsDto(user.get());
    }

    public UserEntity addDevice(AddDeviceDto addDeviceDto) {

        UserEntity user = userRepository.findById(addDeviceDto.getIdUser()).get();
//        System.out.println(user);
        DeviceEntity device1 = deviceRepository.findById(addDeviceDto.getDeviceDetailsDto().getIdDevice()).get();
        user.getDevices().add(device1);
        UserEntity user1 = userRepository.save(user);
        return user1;
    }
    public void delete(UUID id)
    {
        Optional<UserEntity> user = userRepository.findById(id);
        if(!user.isPresent())
        {
            LOGGER.error("User doesn't exist", id);
            throw new ResourceNotFoundException(DeviceEntity.class.getSimpleName() + " with id: " + id + " doesn't exist");
        }
        userRepository.deleteById(id);
    }

    public UserEntity loginUser(LogIn logIn)
    {
        try{
            UserEntity entity = userRepository.findByUsername(logIn.getUsername()).get();

            // System.out.println(logIn.getPassword() + " " + entity.getPassword());
            entity.getPassword();
            if (logIn.getPassword().equals(entity.getPassword())) {
                return entity;
            }
        }
        catch(Exception e){
            LOGGER.error("Login failed");
        }
        return null;
    }
}
