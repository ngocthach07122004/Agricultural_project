package Agricultural.controller;

import Agricultural.entity.AirHumidity;
import Agricultural.service.AirHumidityDataService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/airHumidity")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AirHumidityDataController {
    AirHumidityDataService airHumidityService;
    @GetMapping("/all")
    public List<AirHumidity> getAllAirHumidity(){
        return airHumidityService.getAllAirHumidity();
    }
}
