package Agricultural.service;

import Agricultural.entity.Temperature;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import Agricultural.repository.TemperatureRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)

public class TemperatureDataService {
    TemperatureRepository temperatureRepository; 
    public Temperature createTemperature(Temperature temperature){
        return temperatureRepository.save(temperature);
    }
    public List<Temperature> getAllTemperature(){
        return temperatureRepository.findAll();
    }
}
