package Agricultural.service;

import Agricultural.entity.Light;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import Agricultural.repository.LightRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)

public class LightDataService {
    LightRepository lightRepository; 
    public Light createLight(Light light){
        return lightRepository.save(light);
    }
    public List<Light> getAllLight(){
        return lightRepository.findAll();
    }
}
