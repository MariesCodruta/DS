package energy.demo.dtos;

import energy.demo.entities.Role;
import lombok.Getter;
import lombok.Setter;
import org.springframework.hateoas.RepresentationModel;

import java.util.UUID;

@Getter
@Setter
public class UserDto extends RepresentationModel<UserDto> {
    private UUID idUser;
    private String name;
    private Role role;
    private String password;
    private String username;

    public UserDto(UUID idUser, String name, Role role, String password, String username) {
        this.idUser = idUser;
        this.name = name;
        this.role = role;
        this.password = password;
        this.username = username;
    }
}
