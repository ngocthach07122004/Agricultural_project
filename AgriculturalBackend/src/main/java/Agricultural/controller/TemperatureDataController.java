package Agricultural.controller;

import Agricultural.entity.Temperature;
import Agricultural.service.TemperatureDataService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/temperature")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TemperatureDataController {
    TemperatureDataService temperatureService;
    @GetMapping("/all")
    public List<Temperature> getAllTemperature(){
        return temperatureService.getAllTemperature();
    }
}
