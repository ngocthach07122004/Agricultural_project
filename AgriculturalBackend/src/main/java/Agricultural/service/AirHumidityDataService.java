package Agricultural.service;

import Agricultural.entity.AirHumidity;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import Agricultural.repository.AirHumidityRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)

public class AirHumidityDataService {

    AirHumidityRepository airHumidityRepository; 
    public AirHumidity createAirHumidity(AirHumidity airHumidity){
        return airHumidityRepository.save(airHumidity);
    }
    public List<AirHumidity> getAllAirHumidity(){
        return airHumidityRepository.findAll();
    }
}
