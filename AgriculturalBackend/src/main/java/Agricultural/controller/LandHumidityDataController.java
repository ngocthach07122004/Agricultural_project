package Agricultural.controller;

import Agricultural.entity.LandHumidity;
import Agricultural.service.LandHumidityDataService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/landHumidity")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class LandHumidityDataController {
    LandHumidityDataService landHumidityService;
    @GetMapping("/all")
    public List<LandHumidity> getAllLandHumidity(){
        return landHumidityService.getAllLandHumidity();
    }
}
