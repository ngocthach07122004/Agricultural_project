package Agricultural.mapper;

import Agricultural.entity.DeviceAction ;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface DeviceActionMapper {

    
    @Mapping(target = "idDeviceAction " , ignore = true)
    DeviceAction  toDeviceAction  (DeviceAction  deviceAction );
}
