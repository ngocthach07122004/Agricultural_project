package Agricultural.repository;

import Agricultural.entity.LandHumidity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LandHumidityRepository extends JpaRepository<LandHumidity,String > {
}
