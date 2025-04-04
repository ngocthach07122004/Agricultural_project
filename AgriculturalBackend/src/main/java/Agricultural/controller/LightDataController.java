package Agricultural.controller;

import Agricultural.entity.Light;
import Agricultural.service.LightDataService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/light")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class LightDataController {
    LightDataService lightService;
    @GetMapping("/all")
    public List<Light> getAllLight(){
        return lightService.getAllLight();
    }
}
