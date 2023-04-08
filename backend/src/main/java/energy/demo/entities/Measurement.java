package energy.demo.entities;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Entity(name="measurement")
@Getter
@Setter

public class Measurement {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Type(type = "uuid-binary")
    private UUID idMeasurement;

    @Column(nullable = false)
    private Date timestamp;

    @Column(nullable = false)
    private long energyConsumption;

    public Measurement(UUID idMeasurement, Date timestamp, long energyConsumption) {
        this.idMeasurement = idMeasurement;
        this.timestamp = timestamp;
        this.energyConsumption = energyConsumption;
    }

    public Measurement() {
    }

    public Measurement(Date timestamp, long energyConsumption) {
        this.timestamp = timestamp;
        this.energyConsumption = energyConsumption;
    }
}



