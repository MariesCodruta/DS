package energy.demo.entities;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity(name = "users")
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Getter
@Setter

public class UserEntity {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Type(type = "uuid-binary")
    private UUID idUser;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String username;

    @OneToMany(fetch = FetchType.EAGER)
    @JoinColumn(name = "idUser")
    private List<DeviceEntity> devices;

    public UserEntity(String name, Role role, String password, String username) {
        this.name = name;
        this.role = role;
        this.password = password;
        this.username = username;
        this.devices = new ArrayList<DeviceEntity>();
    }

    public UserEntity() {

    }

//    public UserEntity(UUID idUser, String name, Role role, String password, String username, List<DeviceEntity> devices) {
//        this.idUser = idUser;
//        this.name = name;
//        this.role = role;
//        this.password = password;
//        this.username = username;
//        this.devices = devices;
//    }
}
