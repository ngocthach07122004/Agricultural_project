package Agricultural.repository;

import Agricultural.entity.AirHumidity;
import Agricultural.entity.LandHumidity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AirHumidityRepository extends JpaRepository<AirHumidity, String> {
    // List<LandHumidity> findByIdLandHumidity(String idLandHumidity);
    // List<LandHumidity> findByDate(LocalDate date);
}
