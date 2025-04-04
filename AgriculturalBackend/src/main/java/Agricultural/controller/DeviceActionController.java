package Agricultural.controller;

import Agricultural.entity.DeviceAction;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

import org.springframework.web.bind.annotation.*;

import Agricultural.service.DeviceActionService;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/deviceAction")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DeviceActionController {
    DeviceActionService deviceActionService; 
    @PostMapping("/create")
    public DeviceAction createDeviceAction (@RequestBody DeviceAction deviceAction) {
        return deviceActionService.createDeviceAction(deviceAction);
    }
    @GetMapping("/all/{idDeviceAction}")
    public List<DeviceAction> getDeviceActionByIdDevice(@PathVariable String idDeviceAction){
        return deviceActionService.getDeviceActionByDeviceId(idDeviceAction);
    }
    @GetMapping("/all/{date}")
    public List<DeviceAction> getDeviceActionsByDate(@PathVariable String date){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate localDate = LocalDate.parse(date, formatter);
        return deviceActionService.getDeviceActionsByDate(localDate);
    }
    @GetMapping("/all")
    public List<DeviceAction> getAllDeviceAction(){
        return deviceActionService.getAllDeviceAction();
    }
    @DeleteMapping("/delete/{idDeviceAction}")
    public String deleteDeviceAction(@PathVariable String idDeviceAction){
        return deviceActionService.deleteDeviceAction(idDeviceAction);
    }
    
}
