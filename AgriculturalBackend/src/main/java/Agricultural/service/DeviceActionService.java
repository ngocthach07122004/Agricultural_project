package Agricultural.service;

import Agricultural.entity.DeviceAction;
import Agricultural.mapper.DeviceActionMapper;
import Agricultural.repository.DeviceActionRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)

public class DeviceActionService {
    DeviceActionMapper deviceActionMapper;
    DeviceActionRepository deviceActionRepository;
      public DeviceAction createDeviceAction(DeviceAction deviceAction){
            DeviceAction newDeviceAction = deviceActionMapper.toDeviceAction(deviceAction);

            return deviceActionRepository.save(newDeviceAction);
      }
      public List<DeviceAction> getAllDeviceAction(){
            return deviceActionRepository.findAll();
      }
      public String deleteDeviceAction(String idDeviceAction){
            deviceActionRepository.deleteById(idDeviceAction);
            return "success";
      }
      public List<DeviceAction> getDeviceActionByDeviceId(String idDeviceAction){
            return deviceActionRepository.findByIdDeviceAction(idDeviceAction);
      }
      public List<DeviceAction> getDeviceActionsByDate( LocalDate date){
            return deviceActionRepository.findByDate(date);
      }
      
}
