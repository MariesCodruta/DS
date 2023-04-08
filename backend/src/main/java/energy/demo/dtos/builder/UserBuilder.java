package energy.demo.dtos.builder;

import energy.demo.dtos.UserDetailsDto;
import energy.demo.dtos.UserDto;
import energy.demo.entities.DeviceEntity;
import energy.demo.entities.UserEntity;

public class UserBuilder {

    public static UserDto userDto(UserEntity user)
    {
        return new UserDto(user.getIdUser(), user.getName(), user.getRole(),user.getPassword(), user.getUsername());
    }

    public static UserDetailsDto userDetailsDto(UserEntity user)
    {
        return new UserDetailsDto(user.getIdUser(), user.getName(), user.getRole(),user.getPassword(), user.getUsername());
    }

    public static UserEntity entity(UserDetailsDto user){
        return new UserEntity( user.getName(), user.getRole(),user.getPassword(), user.getUsername());
    }
}
