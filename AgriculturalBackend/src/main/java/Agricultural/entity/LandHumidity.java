package Agricultural.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@Builder
@FieldDefaults(level =  AccessLevel.PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class LandHumidity {
    @GeneratedValue(strategy = GenerationType.UUID)
    @Id
    String idLandHumidity		;
    LocalDateTime time;
    String valueLandHumidity;
    
}
