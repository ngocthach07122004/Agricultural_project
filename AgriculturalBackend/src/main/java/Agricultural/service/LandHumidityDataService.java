package Agricultural.service;

import Agricultural.entity.LandHumidity;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import Agricultural.repository.LandHumidityRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)

public class LandHumidityDataService {
    LandHumidityRepository landHumidityRepository; 
    public LandHumidity createLandHumidity(LandHumidity landHumidity){
        return landHumidityRepository.save(landHumidity);
    }
    public List<LandHumidity> getAllLandHumidity(){
        return landHumidityRepository.findAll();
    }
}
