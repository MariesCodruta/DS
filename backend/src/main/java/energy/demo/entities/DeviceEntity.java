package energy.demo.entities;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.lang.module.ModuleReference;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Entity(name="devices")
@Getter
@Setter
public class DeviceEntity {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Type(type = "uuid-binary")
    private UUID idDevice;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private long maximEnergyConsumption;

    @OneToMany(fetch = FetchType.EAGER)
    @JoinColumn(name = "idDevice")
    private List<Measurement> measurement;

    public DeviceEntity() {

    }

    public DeviceEntity(String location, String description, long maximEnergyConsumption) {
        this.location = location;
        this.description = description;
        this.maximEnergyConsumption = maximEnergyConsumption;
        this.measurement=new ArrayList<Measurement>();
    }
}